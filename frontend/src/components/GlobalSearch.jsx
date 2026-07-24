import { useState, useMemo, useRef, useEffect } from "react";
import { localSearchEngine } from "../utils/LocalSearchEngine";

const ClearIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

function GlobalSearch({ curriculum, navigateToTopic }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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
      if ((e.key === "/" && document.activeElement !== inputRef.current) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k")) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    }
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Async query for online Supabase & local IndexedDB records
  useEffect(() => {
    if (!query.trim() || query.length < 2) {
      setOnlineDbResults([]);
      return;
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

  // Hybrid Search: In-Browser Knowledge Base + Curriculum Matching
  const { conceptResults, curriculumResults } = useMemo(() => {
    if (!query.trim()) return { conceptResults: [], curriculumResults: [] };
    const q = query.toLowerCase().trim();

    // 1. In-Browser Instant Knowledge Search & Live Value Calculations (<5ms)
    const concepts = localSearchEngine.search(q);

    // 2. Curriculum Topic Matching
    const topicMatches = [];
    curriculum.forEach((subj) => {
      const subjMatch = subj.label.toLowerCase().includes(q);
      subj.chapters.forEach((chap) => {
        const chapMatch = chap.label.toLowerCase().includes(q);
        chap.topics.forEach((t) => {
          const tLower = t.toLowerCase();
          const topicMatch = tLower.includes(q);
          if (topicMatch || subjMatch || chapMatch) {
            let score = 0;
            if (tLower.startsWith(q)) {
              score += 100;
            } else if (topicMatch) {
              score += 50;
            } else if (chapMatch) {
              score += 25;
            } else if (subjMatch) {
              score += 10;
            }
            topicMatches.push({ subject: subj, chapter: chap, topic: t, score });
          }
        });
      });
    });

    return {
      conceptResults: concepts,
      curriculumResults: topicMatches.sort((a, b) => b.score - a.score).slice(0, 5)
    };
  }, [query, curriculum]);

  const allConceptResults = useMemo(() => {
    return [...conceptResults, ...onlineDbResults];
  }, [conceptResults, onlineDbResults]);

  // Filter items by active tab
  const filteredConceptResults = useMemo(() => {
    if (activeTab === "calc") return allConceptResults.filter(c => c.isLiveCalculated || c.formula);
    if (activeTab === "concepts") return allConceptResults.filter(c => !c.isLiveCalculated && !c.isOnlineDatabaseRecord);
    if (activeTab === "db") return allConceptResults.filter(c => c.isOnlineDatabaseRecord);
    return allConceptResults;
  }, [allConceptResults, activeTab]);

  const filteredCurriculumResults = useMemo(() => {
    if (activeTab === "calc" || activeTab === "db") return [];
    return curriculumResults;
  }, [curriculumResults, activeTab]);

  const totalResultsCount = filteredConceptResults.length + filteredCurriculumResults.length;

  // Reset selection when query changes
  if (query !== prevQuery) {
    setPrevQuery(query);
    setSelectedIndex(-1);
  }

  const handleSelectTopic = (match) => {
    navigateToTopic(match.subject.id, match.chapter.id, match.topic);
    setQuery("");
    setIsOpen(false);
    setSelectedIndex(-1);
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
    if (!isOpen || totalResultsCount === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < totalResultsCount - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < filteredConceptResults.length) {
        // Concept / DB item selected
        const item = filteredConceptResults[selectedIndex];
        const subj = curriculum.find(s => s.label.toLowerCase().includes(String(item.subject).toLowerCase())) || curriculum[0];
        if (subj && subj.chapters.length > 0) {
          const chap = subj.chapters[0];
          navigateToTopic(subj.id, chap.id, chap.topics[0] || item.topic);
        }
        setIsOpen(false);
      } else if (selectedIndex >= filteredConceptResults.length) {
        // Curriculum item selected
        const currItem = filteredCurriculumResults[selectedIndex - filteredConceptResults.length];
        if (currItem) handleSelectTopic(currItem);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="global-search" ref={containerRef}>
      <div className="gs-input-wrap">
        <svg className="gs-search-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          placeholder="Search formulas, live values & topics... (Press '/' to focus)"
          value={query}
          autoFocus
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

      {isOpen && query && (
        <div
          className="search-dropdown"
          id="search-dropdown-list"
          role="listbox"
        >
          {/* Filter Bar */}
          <div className="search-filter-bar">
            <button
              className={`sfb-btn ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              All
            </button>
            <button
              className={`sfb-btn ${activeTab === "calc" ? "active" : ""}`}
              onClick={() => setActiveTab("calc")}
            >
              🧮 Calculations
            </button>
            <button
              className={`sfb-btn ${activeTab === "concepts" ? "active" : ""}`}
              onClick={() => setActiveTab("concepts")}
            >
              ⚡ Concepts
            </button>
            {onlineDbResults.length > 0 && (
              <button
                className={`sfb-btn ${activeTab === "db" ? "active" : ""}`}
                onClick={() => setActiveTab("db")}
              >
                ☁️ DB ({onlineDbResults.length})
              </button>
            )}
          </div>

          {/* Section 1: In-Browser Instant Answers, Live Calculations & DB Records */}
          {filteredConceptResults.length > 0 && (
            <div className="search-section">
              <div className="search-section-header">⚡ Instant Concepts, Live Values & DB Records</div>
              {filteredConceptResults.map((item, i) => {
                const isSelected = i === selectedIndex;
                return (
                  <div
                    key={`concept_${item.id}`}
                    className={`search-concept-card ${isSelected ? "selected" : ""} ${item.isLiveCalculated ? "live-calc-card" : ""}`}
                    onClick={() => {
                      const subj = curriculum.find(s => s.label.toLowerCase().includes(String(item.subject).toLowerCase())) || curriculum[0];
                      if (subj && subj.chapters.length > 0) {
                        const chap = subj.chapters[0];
                        navigateToTopic(subj.id, chap.id, chap.topics[0] || item.topic);
                      }
                      setIsOpen(false);
                    }}
                  >
                    <div className="scc-header">
                      <span className="scc-title">{item.title}</span>
                      <span className="scc-badge">{item.subject}</span>
                    </div>

                    {item.formula && (
                      <div className="scc-formula-wrap">
                        <div className="scc-formula">
                          📐 <code>{item.formula}</code>
                        </div>
                        <button
                          className="scc-copy-btn"
                          onClick={(e) => handleCopyFormula(e, item.formula, item.id)}
                          title="Copy formula"
                        >
                          {copiedId === item.id ? "✓ Copied" : "📋 Copy"}
                        </button>
                      </div>
                    )}

                    <div className="scc-explanation">{item.explanation}</div>

                    {item.steps && (
                       <div className="scc-steps">
                         {(Array.isArray(item.steps) ? item.steps : item.steps.split('.')).filter(Boolean).map((st, sIdx) => (
                           <div key={sIdx} className="scc-step-item">{st.trim()}</div>
                         ))}
                       </div>
                     )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Section 2: Curriculum Topics */}
          {filteredCurriculumResults.length > 0 && (
            <div className="search-section">
              <div className="search-section-header">📚 Curriculum Topics</div>
              {filteredCurriculumResults.map((r, idx) => {
                const globalIdx = filteredConceptResults.length + idx;
                const isSelected = globalIdx === selectedIndex;
                return (
                  <div
                    key={`topic_${idx}`}
                    className={`search-item ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSelectTopic(r)}
                  >
                    <div className="si-title">{r.topic}</div>
                    <div className="si-path">
                      {r.subject.label} › {r.chapter.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {totalResultsCount === 0 && (
            <div className="search-empty">
              No answers, calculated values, or DB records found for &ldquo;{query}&rdquo;.
              <br />
              <small style={{ opacity: 0.75, display: "block", marginTop: "4px" }}>
                Try searching for values ("12V 3A"), formulas ("V = I * R"), or topics ("algebra").
              </small>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GlobalSearch;
