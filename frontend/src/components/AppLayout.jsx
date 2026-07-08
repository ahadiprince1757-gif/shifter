import { Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import AuthModal from "./AuthModal";
import { useAuth } from "../hooks/useAuth";
import { useCurriculum } from "../hooks/useCurriculum";
import { useDarkMode } from "../hooks/useDarkMode";
import SkeletonLoader from "./SkeletonLoader";

export default function AppLayout() {
  const { session, showAuthModal, setShowAuthModal } = useAuth();
  const { curriculum } = useCurriculum();
  const [isDark, toggleDark] = useDarkMode();
  const navigate = useNavigate();

  const navigateToTopic = (subjectId, chapterId, topic) => {
    navigate(`/learn/${subjectId}/${chapterId}/${encodeURIComponent(topic)}`);
  };

  return (
    <div id="app-screen" className="screen active">
      <Navbar
        isDark={isDark}
        toggleDark={toggleDark}
        session={session}
        curriculum={curriculum}
        onNavigateToTopic={navigateToTopic}
        setShowAuthModal={setShowAuthModal}
      />

      <div id="app-content">
        <Suspense fallback={<SkeletonLoader type="list" count={4} />}>
          <Outlet />
        </Suspense>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onGuestAccess={() => navigate("/subjects")}
      />
    </div>
  );
}
