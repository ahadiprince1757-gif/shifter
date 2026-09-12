import { Suspense, lazy } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";
import { useAuth } from "../hooks/useAuth";
import { useCurriculum } from "../hooks/useCurriculum";
import { useDarkMode } from "../hooks/useDarkMode";
import SkeletonLoader from "./SkeletonLoader";

const AuthModal = lazy(() => import("./AuthModal"));

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

      {/* Mobile bottom navigation — hidden on desktop via CSS */}
      <BottomNav
        session={session}
        curriculum={curriculum}
        onNavigateToTopic={navigateToTopic}
        setShowAuthModal={setShowAuthModal}
      />

      {showAuthModal && (
        <Suspense fallback={null}>
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            onGuestAccess={() => navigate("/subjects")}
          />
        </Suspense>
      )}
    </div>
  );
}
