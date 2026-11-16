import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const INSTALL_DISMISSED_KEY = "tixar_install_dismissed";

/**
 * InstallBanner
 *
 * A fixed bottom-sheet install prompt that floats above ALL page content —
 * including the auth card — without pushing anything up or conflicting with
 * the welcome screen layout.
 *
 * Rules:
 *  - Never shown if the app is already running in PWA standalone mode.
 *  - Never shown if the user has previously tapped "Install" or dismissed it.
 *  - Slides up from bottom after a short delay so the auth card renders first.
 *  - Rendered via React portal directly into document.body so it is completely
 *    outside the welcome-auth-container's flex flow.
 */
export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false); // controls CSS animation

  useEffect(() => {
    // 1. Already running as installed PWA — never show
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true;
    if (isStandalone) return;

    // 2. Already dismissed previously — never show
    try {
      if (localStorage.getItem(INSTALL_DISMISSED_KEY) === "true") return;
    } catch {
      // localStorage unavailable (private mode) — show banner anyway
    }

    // 3. Listen for Chrome/Android native install prompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
      // slight delay so animation triggers after mount
      requestAnimationFrame(() => setTimeout(() => setVisible(true), 20));
    };
    window.addEventListener("beforeinstallprompt", handler);

    // 4. iOS Safari / browsers without beforeinstallprompt — show after delay
    //    so the auth card is fully visible first.
    const timer = setTimeout(() => {
      setShow(true);
      requestAnimationFrame(() => setTimeout(() => setVisible(true), 20));
    }, 1800);

    // 5. Hide if installed through any other path
    const onInstalled = () => {
      try {
        localStorage.setItem(INSTALL_DISMISSED_KEY, "true");
      } catch {}
      dismissWithAnimation();
    };
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", onInstalled);
      clearTimeout(timer);
    };
  }, []);

  const dismissWithAnimation = () => {
    setVisible(false);
    // wait for slide-out animation before unmounting
    setTimeout(() => setShow(false), 320);
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      markDone();
    } else {
      markDone();
    }
  };

  const markDone = () => {
    try {
      localStorage.setItem(INSTALL_DISMISSED_KEY, "true");
    } catch {}
    setDeferredPrompt(null);
    dismissWithAnimation();
  };

  if (!show) return null;

  // Render outside the auth card via portal — no layout conflict
  return createPortal(
    <div
      className={`install-banner${visible ? " install-banner--visible" : ""}`}
      role="region"
      aria-label="Install Tixar App"
    >
      <div className="install-banner-inner">
        <div className="install-banner-icon">
          <picture>
            <source srcSet="/tixar-logo.webp?v=4" type="image/webp" />
            <img
              src="/tixar-logo.png?v=4"
              alt="Tixar"
              width="40"
              height="40"
              style={{ borderRadius: "11px", background: "#fff", padding: "3px", display: "block" }}
            />
          </picture>
        </div>

        <div className="install-banner-text">
          <div className="install-banner-title">Install Tixar</div>
          <div className="install-banner-subtitle">
            {deferredPrompt
              ? "Add to home screen for the best experience."
              : 'Tap Share → "Add to Home Screen" in your browser.'}
          </div>
        </div>

        <div className="install-banner-actions">
          <button
            className="install-banner-btn install-banner-btn--primary"
            onClick={handleInstall}
            aria-label="Install Tixar app"
          >
            {deferredPrompt ? "Install" : "Got it"}
          </button>
          <button
            className="install-banner-btn install-banner-btn--dismiss"
            onClick={markDone}
            aria-label="Dismiss install prompt"
            title="Dismiss"
          >
            ✕
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
