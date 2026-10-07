import { useState, useMemo, useRef, useEffect } from "react";
import { localSearchEngine } from "../utils/LocalSearchEngine";

const ClearIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

const SUGGESTED_SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Computer Studies",
];

const POPULAR_SEARCHES = [
  "BODMAS",
  "Ohm's Law",
  "What is a Cell",
  "Meaning of Chemistry",
  "Kinetic Energy",
  "Linear Motion",
];

function GlobalSearch({
  curriculum = [],
  navigateToTopic,
  autoFocus = false,
  onClose,
  placeholder = "Search topics, subtopics, formulas & notes... (Press '/' to focus)",
  isModal = false,
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(isModal);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [prevQuery, setPrevQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [copiedId, setCopiedId] = useState(null);
  const [onlineDbResults, setOnlineDbResults] = useState([]);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Global Keyboard Shortcut: '/' or 'Ctrl+K' to focus search
  useEffect(() => {
    function handleGlobalKeyDown(e) {
      if (
        (e.key === "/" && document.activeElement !== inputRef.current) ||
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    }
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Close when clicking outside (unless inside a managed modal)
  useEffect(() => {
    if (isModal) return;
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isModal]);

  // Async query for online Supabase & local IndexedDB records
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      const resetTimer = setTimeout(() => setOnlineDbResults([]), 0);
      return () => clearTimeout(resetTimer);
    }

    let isMounted = true;
    const timer = setTimeout(async () => {
      try {
        const results = await localSearchEngine.searchOnlineDatabase(query);
        if (isMounted) {
          setOnlineDbResults(results);
        }
      } catch (err) {
        console.warn("Online DB search error:", err);
      }
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [query]);

  // Hybrid Search: In-Browser Knowledge Base + Curriculum Matching (Topics & Subtopics)
  const { conceptResults, curriculumResults } = useMemo(() => {
    if (!query.trim()) return { conceptResults: [], curriculumResults: [] };
    const q = query.toLowerCase().trim();

    // 1. In-Browser Instant Knowledge Search & Live Value Calculations (<5ms)
    const concepts = localSearchEngine.search(q);

    // 2. Curriculum Topic & Subtopic Matching (handles object and string topics)
    const topicMatches = [];
    const seenTopicKeys = new Set();

    if (Array.isArray(curriculum)) {
      curriculum.forEach((subj) => {
        if (!subj || !Array.isArray(subj.chapters)) return;
        const subjLabel = subj.label || subj.name || "";
        const subjMatch = subjLabel.toLowerCase().includes(q);

        subj.chapters.forEach((chap) => {
          if (!chap || !Array.isArray(chap.topics)) return;
          const chapLabel = chap.label || "";
          const chapMatch = chapLabel.toLowerCase().includes(q);

          chap.topics.forEach((t, tIdx) => {
            const topicGroupName =
              typeof t === "object" && t !== null
                ? t.name || `Topic ${tIdx + 1}`
                : String(t || "");
            const tGroupLower = topicGroupName.toLowerCase();
            const groupMatch = tGroupLower.includes(q);

            const subtopics =
              typeof t === "object" && t !== null && Array.isArray(t.subtopics) && t.subtopics.length > 0
                ? t.subtopics
                : [topicGroupName];

            subtopics.forEach((sub) => {
              const subStr = String(sub || "");
              const subLower = subStr.toLowerCase();
              const subMatch = subLower.includes(q);

              if (subMatch || groupMatch || chapMatch || subjMatch) {
                const uniqueKey = `${subj.id}|${chap.id}|${subStr}`;
                if (seenTopicKeys.has(uniqueKey)) return;
                seenTopicKeys.add(uniqueKey);

                let score = 0;
                if (subLower === q) {
                  score += 200;
                } else if (subLower.startsWith(q)) {
                  score += 120;
                } else if (subMatch) {
                  score += 70;
                }

                if (tGroupLower === q) {
                  score += 100;
                } else if (tGroupLower.startsWith(q)) {
                  score += 50;
                } else if (groupMatch) {
                  score += 30;
                }

                if (chapMatch) score += 20;
                if (subjMatch) score += 10;

                topicMatches.push({
                  subject: subj,
                  chapter: chap,
                  topicGroup: topicGroupName,
                  topic: subStr,
                  isSubtopic: subStr !== topicGroupName,
                  score,
                });
              }
            });
          });
        });
      });
    }

    return {
      conceptResults: concepts,
      curriculumResults: topicMatches.sort((a, b) => b.score - a.score).slice(0, 20),
    };
  }, [query, curriculum]);

  const allConceptResults = useMemo(() => {
    return [...conceptResults, ...onlineDbResults];
  }, [conceptResults, onlineDbResults]);

  // Filter items by active tab
  const filteredConceptResults = useMemo(() => {
    if (activeTab === "topics") return [];
    if (activeTab === "calc") return allConceptResults.filter((c) => c.isLiveCalculated || c.formula);
    if (activeTab === "concepts") return allConceptResults.filter((c) => !c.isLiveCalculated && !c.isOnlineDatabaseRecord);
    if (activeTab === "db") return allConceptResults.filter((c) => c.isOnlineDatabaseRecord);
    return allConceptResults;
  }, [allConceptResults, activeTab]);

  const filteredCurriculumResults = useMemo(() => {
    if (activeTab === "calc" || activeTab === "db" || activeTab === "concepts") return [];
    return curriculumResults;
  }, [curriculumResults, activeTab]);

  const totalResultsCount = filteredConceptResults.length + filteredCurriculumResults.length;

  // Reset selection when query changes
  if (query !== prevQuery) {
    setPrevQuery(query);
    setSelectedIndex(-1);
  }

  const getFirstTopicStr = (chap) => {
    if (!chap || !Array.isArray(chap.topics) || chap.topics.length === 0) return "";
    const first = chap.topics[0];
    if (typeof first === "object" && first !== null) {
      if (Array.isArray(first.subtopics) && first.subtopics.length > 0) {
        return String(first.subtopics[0]);
      }
      return String(first.name || "");
    }
    return String(first);
  };

  const handleSelectTopic = (match) => {
    if (navigateToTopic) {
      navigateToTopic(match.subject.id, match.chapter.id, match.topic);
    }
    setQuery("");
    setIsOpen(isModal);
    setSelectedIndex(-1);
    if (onClose) onClose();
  };

  const handleSelectConcept = (item) => {
    const subj =
      (curriculum || []).find(
        (s) =>
          s.label?.toLowerCase().includes(String(item.subject).toLowerCase()) ||
          s.id?.toLowerCase() === String(item.subject).toLowerCase()
      ) || curriculum[0];

    if (subj && Array.isArray(subj.chapters) && subj.chapters.length > 0) {
      let targetChap = subj.chapters[0];
      let targetTopic = getFirstTopicStr(targetChap);

      for (const c of subj.chapters) {
        if (Array.isArray(c.topics)) {
          for (const t of c.topics) {
            const tName = typeof t === "object" && t !== null ? t.name : String(t);
            const subs =
              typeof t === "object" && t !== null && Array.isArray(t.subtopics)
                ? t.subtopics
                : [tName];
            const matchedSub = subs.find(
              (s) =>
                String(s).toLowerCase().includes(String(item.topic || "").toLowerCase()) ||
                String(item.topic || "").toLowerCase().includes(String(s).toLowerCase())
            );
            if (matchedSub) {
              targetChap = c;
              targetTopic = matchedSub;
              break;
            }
          }
        }
      }

      if (navigateToTopic) {
        navigateToTopic(subj.id, targetChap.id, targetTopic);
      }
    }

    setQuery("");
    setIsOpen(isModal);
    setSelectedIndex(-1);
    if (onClose) onClose();
  };

  const handleCopyFormula = (e, formula, id) => {
    e.stopPropagation();
    if (navigator.clipboard && formula) {
      navigator.clipboard.writeText(formula);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < totalResultsCount - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < filteredConceptResults.length) {
        const item = filteredConceptResults[selectedIndex];
        handleSelectConcept(item);
      } else if (selectedIndex >= filteredConceptResults.length) {
        const currItem = filteredCurriculumResults[selectedIndex - filteredConceptResults.length];
        if (currItem) handleSelectTopic(currItem);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      if (onClose) onClose();
    }
  };

  const handleClear = () => {
    setQuery("");
    if (!isModal) setIsOpen(false);
    inputRef.current?.focus();
  };

  const showDropdown = isModal || (isOpen && query);

  return (
    <div className="global-search" ref={containerRef}>
      <div className="gs-input-wrap">
        <svg className="gs-search-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          placeholder={placeholder}
          value={query}
          autoFocus={autoFocus}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          inputMode="search"
          enterKeyHint="search"
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls="search-dropdown-list"
        />
        {query && (
          <button
            className="gs-clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
            type="button"
          >
            <ClearIcon />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="search-dropdown" id="search-dropdown-list" role="listbox">
          {query ? (
            <>
              {/* Filter Bar */}
              <div className="search-filter-bar">
                <button
                  className={`sfb-btn ${activeTab === "all" ? "active" : ""}`}
                  onClick={() => setActiveTab("all")}
                >
                  All ({totalResultsCount})
                </button>
                <button
                  className={`sfb-btn ${activeTab === "topics" ? "active" : ""}`}
                  onClick={() => setActiveTab("topics")}
                >
                  Topics & Notes ({curriculumResults.length})
                </button>
                <button
                  className={`sfb-btn ${activeTab === "concepts" ? "active" : ""}`}
                  onClick={() => setActiveTab("concepts")}
                >
                  Concepts
                </button>
                <button
                  className={`sfb-btn ${activeTab === "calc" ? "active" : ""}`}
                  onClick={() => setActiveTab("calc")}
                >
                  Calculations
                </button>
                {onlineDbResults.length > 0 && (
                  <button
                    className={`sfb-btn ${activeTab === "db" ? "active" : ""}`}
                    onClick={() => setActiveTab("db")}
                  >
                    Database ({onlineDbResults.length})
                  </button>
                )}
              </div>

              {/* Section 1: Instant Answers, Live Calculations & DB Records */}
              {filteredConceptResults.length > 0 && (
                <div className="search-section">
                  <div className="search-section-header">Instant Concepts & Live Calculations</div>
                  {filteredConceptResults.map((item, i) => {
                    const isSelected = i === selectedIndex;
                    return (
                      <div
                        key={`concept_${item.id}`}
                        className={`search-concept-card ${isSelected ? "selected" : ""} ${
                          item.isLiveCalculated ? "live-calc-card" : ""
                        }`}
                        onClick={() => handleSelectConcept(item)}
                      >
                        <div className="scc-header">
                          <span className="scc-title">{item.title}</span>
                          <span className="scc-badge">{item.subject}</span>
                        </div>

                        {item.formula && (
                          <div className="scc-formula-wrap">
                            <div className="scc-formula">
                              <code>{item.formula}</code>
                            </div>
                            <button
                              className="scc-copy-btn"
                              onClick={(e) => handleCopyFormula(e, item.formula, item.id)}
                              title="Copy formula"
                            >
                              {copiedId === item.id ? "✓ Copied" : "Copy"}
                            </button>
                          </div>
                        )}

                        <div className="scc-explanation">{item.explanation}</div>

                        {item.steps && (
                          <div className="scc-steps">
                            {(Array.isArray(item.steps) ? item.steps : item.steps.split("."))
                              .filter(Boolean)
                              .map((st, sIdx) => (
                                <div key={sIdx} className="scc-step-item">
                                  {st.trim()}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Section 2: Curriculum Topics & Subtopics */}
              {filteredCurriculumResults.length > 0 && (
                <div className="search-section">
                  <div className="search-section-header">Curriculum Topics, Subtopics & Notes</div>
                  {filteredCurriculumResults.map((r, idx) => {
                    const globalIdx = filteredConceptResults.length + idx;
                    const isSelected = globalIdx === selectedIndex;
                    return (
                      <div
                        key={`topic_${r.subject.id}_${r.chapter.id}_${r.topic}`}
                        className={`search-item ${isSelected ? "selected" : ""}`}
                        onClick={() => handleSelectTopic(r)}
                      >
                        <div className="si-title-row">
                          <span className="si-title">{r.topic}</span>
                          {r.isSubtopic ? (
                            <span className="si-badge si-badge--subtopic">Subtopic</span>
                          ) : (
                            <span className="si-badge si-badge--topic">Topic</span>
                          )}
                        </div>
                        <div className="si-path">
                          {r.subject.label} › {r.chapter.label}
                          {r.topicGroup && r.topicGroup !== r.topic ? ` › ${r.topicGroup}` : ""}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {totalResultsCount === 0 && (
                <div className="search-empty">
                  No matching topics, notes, or calculations found for &ldquo;{query}&rdquo;.
                  <br />
                  <small style={{ opacity: 0.75, display: "block", marginTop: "4px" }}>
                    Try searching for a topic (e.g. &ldquo;Distance&rdquo;), a subject (e.g. &ldquo;Biology&rdquo;), or a formula (&ldquo;V = I * R&rdquo;).
                  </small>
                </div>
              )}
            </>
          ) : (
            /* Quick Browsing & Suggested Tags when search is opened without query */
            <div className="search-quick-tags">
              <div className="search-quick-label">Browse by Subject</div>
              <div className="search-quick-chips">
                {SUGGESTED_SUBJECTS.map((subj) => (
                  <button
                    key={subj}
                    type="button"
                    className="search-quick-chip"
                    onClick={() => {
                      setQuery(subj);
                      setIsOpen(true);
                      inputRef.current?.focus();
                    }}
                  >
                    {subj}
                  </button>
                ))}
              </div>

              <div className="search-quick-label" style={{ marginTop: "0.85rem" }}>
                Popular Topics & Notes
              </div>
              <div className="search-quick-chips">
                {POPULAR_SEARCHES.map((pop) => (
                  <button
                    key={pop}
                    type="button"
                    className="search-quick-chip search-quick-chip--popular"
                    onClick={() => {
                      setQuery(pop);
                      setIsOpen(true);
                      inputRef.current?.focus();
                    }}
                  >
                    ⚡ {pop}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GlobalSearch;
