import { useState, useEffect } from "react";

const INSTALL_DISMISSED_KEY = "tixar_install_dismissed";

/**
 * InstallBanner
 *
 * Shows a "Install the Tixar App" banner on the welcome/sign-in screen.
 *
 * Rules:
 *  - Never shown if the app is already running in PWA standalone mode
 *    (i.e. user has already installed it and opened it from home screen).
 *  - Never shown if the user has previously tapped "Install" or dismissed it
 *    (stored in localStorage under INSTALL_DISMISSED_KEY).
 *  - When the user taps "Install", we fire the browser native
 *    beforeinstallprompt event (if available) or guide them to use
 *    the browser "Add to Home Screen" option, then mark as dismissed.
 */
export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 1. Already running as installed PWA — never show
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone === true; // iOS Safari
    if (isStandalone) return;

    // 2. Already dismissed/installed previously — never show
    try {
      if (localStorage.getItem(INSTALL_DISMISSED_KEY) === "true") return;
    } catch {
      // localStorage unavailable (private mode) — show banner anyway
    }

    // 3. Listen for the browser's install prompt
    const handler = (e) => {
      e.preventDefault(); // prevent auto-mini-infobar
      setDeferredPrompt(e);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // 4. On browsers that don't fire beforeinstallprompt (e.g. iOS Safari),
    //    still show the banner so we can manually guide the user.
    //    We delay slightly so page renders first.
    const timer = setTimeout(() => {
      setShow(true);
    }, 800);

    // 5. Hide banner if the app gets installed through any other means
    const onInstalled = () => {
      try {
        localStorage.setItem(INSTALL_DISMISSED_KEY, "true");
      } catch {}
      setShow(false);
    };
    window.addEventListener("appinstalled", onInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("appinstalled", onInstalled);
      clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Chrome / Android — trigger native install prompt
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      // Whether accepted or rejected, hide our banner
      markDone();
    } else {
      // iOS Safari / other — no native prompt; banner already told them how
      markDone();
    }
  };

  const markDone = () => {
    try {
      localStorage.setItem(INSTALL_DISMISSED_KEY, "true");
    } catch {}
    setDeferredPrompt(null);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="install-banner" role="region" aria-label="Install Tixar App">
      <div className="install-banner-icon">
        <picture>
          <source srcSet="/tixar-logo.webp?v=4" type="image/webp" />
          <img
            src="/tixar-logo.png?v=4"
            alt="Tixar"
            width="36"
            height="36"
            style={{ borderRadius: "10px", background: "#fff", padding: "3px" }}
          />
        </picture>
      </div>

      <div className="install-banner-text">
        <div className="install-banner-title">Install the Tixar App</div>
        <div className="install-banner-subtitle">
          {deferredPrompt
            ? "Add to your home screen for the best experience."
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
  );
}
