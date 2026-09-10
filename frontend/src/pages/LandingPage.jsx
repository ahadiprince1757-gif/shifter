import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Landing from "../components/Landing";
import AuthModal from "../components/AuthModal";
import { useAuth } from "../hooks/useAuth";
import { useCurriculum } from "../hooks/useCurriculum";
import { useDarkMode } from "../hooks/useDarkMode";

export default function LandingPage() {
  const { session, showAuthModal, setShowAuthModal } = useAuth();
  const { curriculum } = useCurriculum();
  const [isDark, toggleDark] = useDarkMode();
  const navigate = useNavigate();

  // If already authenticated, proceed directly to subjects
  useEffect(() => {
    if (session) {
      navigate("/subjects", { replace: true });
    }
  }, [session, navigate]);

  const handleEnterApp = () => {
    if (session) {
      navigate("/subjects");
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <Landing
        curriculum={curriculum}
        enterApp={handleEnterApp}
        isDark={isDark}
        toggleDark={toggleDark}
        session={session}
        openAuth={() => setShowAuthModal(true)}
      />
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}

