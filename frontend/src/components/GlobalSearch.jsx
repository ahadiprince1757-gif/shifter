import { useState, useMemo, useRef, useEffect } from "react";
import { localSearchEngine } from "../utils/LocalSearchEngine";

const ClearIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

function GlobalSearch({
  curriculum = [],
  navigateToTopic,
  autoFocus = false,
  onClose,
  placeholder = "Search topics and subtopics...",
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [prevQuery, setPrevQuery] = useState("");
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

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Hybrid Search: Matching Topics & Subtopics
  const { curriculumResults, conceptResults } = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { curriculumResults: [], conceptResults: [] };

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

    const concepts = localSearchEngine.search(q);

    return {
      curriculumResults: topicMatches.sort((a, b) => b.score - a.score).slice(0, 25),
      conceptResults: concepts.slice(0, 3),
    };
  }, [query, curriculum]);

  const totalResultsCount = curriculumResults.length + conceptResults.length;

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
    setIsOpen(false);
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
    setIsOpen(false);
    setSelectedIndex(-1);
    if (onClose) onClose();
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
      const effectiveIndex = selectedIndex >= 0 ? selectedIndex : 0;
      if (effectiveIndex < curriculumResults.length) {
        handleSelectTopic(curriculumResults[effectiveIndex]);
      } else {
        const conceptIdx = effectiveIndex - curriculumResults.length;
        if (conceptResults[conceptIdx]) {
          handleSelectConcept(conceptResults[conceptIdx]);
        }
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      if (onClose) onClose();
    }
  };

  const handleClear = () => {
    setQuery("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  // Only show results when the user has actually started typing
  const showResults = Boolean(isOpen && query.trim().length > 0);

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
          aria-expanded={showResults}
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

      {showResults && (
        <div className="search-dropdown" id="search-dropdown-list" role="listbox">
          {/* Matching Topics and Subtopics */}
          {curriculumResults.length > 0 ? (
            <div className="search-section">
              {curriculumResults.map((r, idx) => {
                const isSelected = idx === selectedIndex;
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
          ) : (
            <div className="search-empty">
              No topics found matching &ldquo;{query}&rdquo;.
            </div>
          )}

          {/* Key Notes / Formulas (if any matched) */}
          {conceptResults.length > 0 && (
            <div className="search-section">
              <div className="search-section-header">Formulas & Definitions</div>
              {conceptResults.map((item, i) => {
                const globalIdx = curriculumResults.length + i;
                const isSelected = globalIdx === selectedIndex;
                return (
                  <div
                    key={`concept_${item.id}`}
                    className="search-concept-card"
                    style={{ background: isSelected ? "var(--bg2)" : "transparent" }}
                    onClick={() => handleSelectConcept(item)}
                  >
                    <div className="scc-header">
                      <span className="scc-title">{item.title}</span>
                      <span className="scc-badge">{item.subject}</span>
                    </div>
                    {item.formula && (
                      <div className="scc-formula-wrap" style={{ margin: "0.2rem 0" }}>
                        <div className="scc-formula">
                          <code>{item.formula}</code>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default GlobalSearch;
