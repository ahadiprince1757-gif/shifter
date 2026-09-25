import React, { Suspense } from "react";
import { Routes, Route, useNavigate, useParams, useLocation } from "react-router-dom";
import { LEARNING_MODES } from "../utils/learningNavigation";
import { SESSION_PHASES } from "../hooks/useSessionLoop";
import AppLayout from "../components/AppLayout";
import VerificationPage from "../pages/VerificationPage";
import SkeletonLoader from "../components/SkeletonLoader";
import { useCurriculum } from "../hooks/useCurriculum";
import { useMasteredTopics } from "../hooks/useMasteredTopics";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const SubjectGrid = React.lazy(() => import("../components/SubjectGrid"));
const ChapterList = React.lazy(() => import("../components/ChapterList"));
const TopicList = React.lazy(() => import("../components/TopicList"));
const LearnFlow = React.lazy(() => import("../components/LearnFlow"));
const Gaps = React.lazy(() => import("../components/Gaps"));
const WelcomeAuthScreen = React.lazy(() => import("../components/WelcomeAuthScreen"));

const ChapterListWrapper = () => {
  const { subjectId } = useParams();
  const { subjectMap } = useCurriculum();
  const navigate = useNavigate();

  const subject = subjectMap.get(subjectId);
  if (!subject) return <div style={{ padding: "2rem" }}>Subject not found</div>;
  return (
    <ChapterList
      subject={subject}
      openChapter={(id) => navigate(`/subjects/${subjectId}/chapters/${id}`)}
      goBack={() => navigate("/subjects")}
    />
  );
};

const TopicListWrapper = () => {
  const { subjectId, chapterId } = useParams();
  const { subjectMap, chapterMap } = useCurriculum();
  const { mastered } = useMasteredTopics();
  const navigate = useNavigate();

  const subject = subjectMap.get(subjectId);
  const chapter = chapterMap.get(`${subjectId}|${chapterId}`);
  if (!chapter) return <div style={{ padding: "2rem" }}>Chapter not found</div>;
  return (
    <TopicList
      subject={subject}
      chapter={chapter}
      openTopic={(topic) =>
        navigate(`/learn/${subjectId}/${chapterId}/${encodeURIComponent(topic)}`)
      }
      goBack={() => navigate(`/subjects/${subjectId}`)}
      mastered={mastered}
    />
  );
};

const LearnFlowWrapper = () => {
  const { subjectId, chapterId, topicId } = useParams();
  const { subjectMap, chapterMap } = useCurriculum();
  const { mastered, markMastered } = useMasteredTopics();
  const navigate = useNavigate();
  const location = useLocation();

  const topic = decodeURIComponent(topicId);
  const subject = subjectMap.get(subjectId);
  const chapter = chapterMap.get(`${subjectId}|${chapterId}`);

  // Read repair context injected by learningNavigation.navigateToTopic()
  const navState = location.state || {};
  const isMistakeRepair = navState.mode === LEARNING_MODES.MISTAKE_REPAIR;
  const isSpacedReview  = navState.mode === LEARNING_MODES.SPACED_REVIEW;
  const initialPhase =
    isMistakeRepair || isSpacedReview
      ? SESSION_PHASES.QUIZ
      : SESSION_PHASES.NOTES;

  const goBack =
    isMistakeRepair || isSpacedReview
      ? () => navigate("/gaps")
      : () => navigate(`/subjects/${subjectId}/chapters/${chapterId}`);

  const repairContext = (isMistakeRepair || isSpacedReview)
    ? {
        mode: navState.mode,
        source: navState.source,
        mistakeId: navState.mistakeId,
        questionId: navState.questionId,
      }
    : null;

  if (!chapter) return <div style={{ padding: "2rem" }}>Topic not found</div>;
  return (
    <LearnFlow
      key={`${subjectId}|${chapterId}|${topicId}`}
      subject={subject}
      chapter={chapter}
      topic={topic}
      goBack={goBack}
      markMastered={markMastered}
      mastered={mastered}
      initialPhase={initialPhase}
      repairContext={repairContext}
      goToTopic={(nextTopic, nextChapterId) =>
        navigate(`/learn/${subjectId}/${nextChapterId}/${encodeURIComponent(nextTopic)}`)
      }
    />
  );
};

const SubjectsView = () => {
  const { curriculum } = useCurriculum();
  const { mastered } = useMasteredTopics();
  const navigate = useNavigate();
  return (
    <SubjectGrid
      curriculum={curriculum}
      openSubject={(id) => navigate(`/subjects/${id}`)}
      mastered={mastered}
      onResume={(subjectId, chapterId, topic) =>
        navigate(`/learn/${subjectId}/${chapterId}/${encodeURIComponent(topic)}`)
      }
    />
  );
};

/**
 * HomeRoute — Serves as the entrance to Tixar.
 * If user has no active session, redirects to /welcome.
 * If user is authenticated, redirects to /subjects.
 */
const HomeRoute = () => {
  const { session, sessionLoading } = useAuth();

  if (sessionLoading) {
    return (
      <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <SkeletonLoader type="list" count={4} />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/welcome" replace />;
  }

  return <Navigate to="/subjects" replace />;
};

/**
 * WelcomeRoute — Entrance & Authentication Screen.
 * If already authenticated, redirect straight to /subjects.
 */
const WelcomeRoute = () => {
  const { session, sessionLoading } = useAuth();

  if (sessionLoading) {
    return (
      <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <SkeletonLoader type="list" count={4} />
      </div>
    );
  }

  if (session) {
    return <Navigate to="/subjects" replace />;
  }

  return <WelcomeAuthScreen />;
};

/**
 * Route guard that ensures users authenticate first before accessing learning & curriculum views.
 * If no session, redirects them to /welcome.
 */
const RequireAuth = ({ children }) => {
  const { session, sessionLoading } = useAuth();

  if (sessionLoading) {
    return (
      <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <SkeletonLoader type="list" count={4} />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/welcome" replace />;
  }

  return children;
};

export default function AppRoutes() {
  return (
    <Suspense fallback={
      <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <SkeletonLoader type="list" count={4} />
      </div>
    }>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/welcome" element={<WelcomeRoute />} />
          <Route path="/subjects" element={<RequireAuth><SubjectsView /></RequireAuth>} />
          <Route path="/subjects/:subjectId" element={<RequireAuth><ChapterListWrapper /></RequireAuth>} />
          <Route path="/subjects/:subjectId/chapters/:chapterId" element={<RequireAuth><TopicListWrapper /></RequireAuth>} />
          <Route path="/learn/:subjectId/:chapterId/:topicId" element={<RequireAuth><LearnFlowWrapper /></RequireAuth>} />
          <Route path="/verification" element={<RequireAuth><VerificationPage /></RequireAuth>} />
          <Route path="/gaps" element={<RequireAuth><Gaps /></RequireAuth>} />
          <Route path="/mistakes" element={<Navigate to="/gaps" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

