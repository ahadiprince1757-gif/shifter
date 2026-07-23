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
  const [onlineDbResults, setOnlineDbResults] = useState([]);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

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

  const totalResultsCount = allConceptResults.length + curriculumResults.length;

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
      if (selectedIndex >= 0 && selectedIndex < allConceptResults.length) {
        // Concept / DB item selected
        const item = allConceptResults[selectedIndex];
        const subj = curriculum.find(s => s.label.toLowerCase().includes(String(item.subject).toLowerCase())) || curriculum[0];
        if (subj && subj.chapters.length > 0) {
          const chap = subj.chapters[0];
          navigateToTopic(subj.id, chap.id, chap.topics[0] || item.topic);
        }
        setIsOpen(false);
      } else if (selectedIndex >= allConceptResults.length) {
        // Curriculum item selected
        const currItem = curriculumResults[selectedIndex - allConceptResults.length];
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
          placeholder="Search formulas, concepts, live values & DB records..."
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
          {/* Section 1: In-Browser Instant Answers, Live Calculations & DB Records */}
          {allConceptResults.length > 0 && (
            <div className="search-section">
              <div className="search-section-header">⚡ Instant Concepts, Live Values & DB Records</div>
              {allConceptResults.map((item, i) => {
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
                      <div className="scc-formula">
                        📐 <code>{item.formula}</code>
                      </div>
                    )}

                    <div className="scc-explanation">{item.explanation}</div>

                    {item.steps && (
                      <div className="scc-steps">
                        {item.steps.map((st, sIdx) => (
                          <div key={sIdx} className="scc-step-item">{st}</div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Section 2: Curriculum Topics */}
          {curriculumResults.length > 0 && (
            <div className="search-section">
              <div className="search-section-header">📚 Curriculum Topics</div>
              {curriculumResults.map((r, idx) => {
                const globalIdx = allConceptResults.length + idx;
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
