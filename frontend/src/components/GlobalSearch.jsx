import { useState, useMemo, useRef, useEffect } from "react";
function GlobalSearch({ curriculum, navigateToTopic }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [prevQuery, setPrevQuery] = useState("");
  const containerRef = useRef(null);

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
      subj.chapters.forEach((chap) => {
        chap.topics.forEach((t) => {
          if (t.toLowerCase().includes(q)) {
            matches.push({ subject: subj, chapter: chap, topic: t });
          }
        });
      });
    });
    return matches.slice(0, 8); // limit to 8 results
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

  return (
    <div className="global-search" ref={containerRef}>
      <input
        type="text"
        placeholder="Search topics..."
        value={query}
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
            <div className="search-empty">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}

export default GlobalSearch;
