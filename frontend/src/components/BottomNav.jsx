import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Simple debounce to avoid duplicate rapid clicks
function debounce(fn, delay = 150) {
  let timeout;
  return (...args) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const GapsIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </svg>
);

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show nav when close to the top of the page
      if (currentScrollY <= 15) {
        setIsVisible(true);
      } else if (Math.abs(currentScrollY - lastScrollY) > 8) {
        // Hide if scrolling down, show if scrolling up
        if (currentScrollY > lastScrollY) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
      setLastScrollY(currentScrollY);
    };

    const handleTap = () => {
      setIsVisible(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("click", handleTap, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleTap);
    };
  }, [lastScrollY]);

  const path = location.pathname;
  const isHome = path === "/subjects" || path === "/";
  const isGaps = path === "/gaps" || path === "/mistakes";

  return (
    <nav
      className={`bottom-nav ${isVisible ? "" : "bn-hidden"}`}
      role="navigation"
      aria-label="Mobile navigation"
      style={{ justifyContent: "space-around" }}
    >
      <button
        className={`bn-item ${isHome ? "active" : ""}`}
        onClick={debounce(() => navigate("/subjects"))}
        aria-label="Subjects"
      >
        <span className="bn-icon"><HomeIcon /></span>
        <span className="bn-label">Subjects</span>
      </button>

      <button
        className={`bn-item ${isGaps ? "active" : ""}`}
        onClick={debounce(() => navigate("/gaps"))}
        aria-label="Gaps"
      >
        <span className="bn-icon"><GapsIcon /></span>
        <span className="bn-label">Gaps</span>
      </button>
    </nav>
  );
}
