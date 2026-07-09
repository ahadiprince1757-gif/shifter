import { useState, useMemo, useRef, useEffect } from "react";

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

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const matches = [];
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
            matches.push({ subject: subj, chapter: chap, topic: t, score });
          }
        });
      });
    });
    return matches.sort((a, b) => b.score - a.score).slice(0, 8);
  }, [query, curriculum]);

  // Reset selection when query changes (during render to prevent cascading renders)
  if (query !== prevQuery) {
    setPrevQuery(query);
    setSelectedIndex(-1);
  }

  const handleSelect = (match) => {
    navigateToTopic(match.subject.id, match.chapter.id, match.topic);
    setQuery("");
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!isOpen || results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        handleSelect(results[selectedIndex]);
      } else if (results.length > 0) {
        handleSelect(results[0]);
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
          placeholder="Search topics..."
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
          aria-activedescendant={
            selectedIndex >= 0 ? `search-item-${selectedIndex}` : undefined
          }
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
          {results.length > 0 ? (
            results.map((r, i) => (
              <div
                key={i}
                id={`search-item-${i}`}
                className={`search-item ${i === selectedIndex ? "selected" : ""}`}
                onClick={() => handleSelect(r)}
                onTouchEnd={(e) => { e.preventDefault(); handleSelect(r); }}
                role="option"
                aria-selected={i === selectedIndex}
                style={i === selectedIndex ? { background: "var(--bg2)" } : {}}
              >
                <div className="si-title">{r.topic}</div>
                <div className="si-path">
                  {r.subject.label} › {r.chapter.label}
                </div>
              </div>
            ))
          ) : (
            <div className="search-empty">No results found for &ldquo;{query}&rdquo;</div>
          )}
        </div>
      )}
    </div>
  );
}

export default GlobalSearch;
