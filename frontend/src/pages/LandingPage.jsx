import { Navigate, useNavigate } from "react-router-dom";
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

  // If already authenticated, skip landing entirely — immediate redirect, no flash
  if (session) {
    return <Navigate to="/subjects" replace />;
  }

  const handleEnterApp = () => {
    setShowAuthModal(true);
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
