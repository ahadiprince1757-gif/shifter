import React, { Suspense, useState } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import LandingPage from "../pages/LandingPage";
import VerificationPage from "../pages/VerificationPage";
import LoadingScreen from "../components/LoadingScreen";
import SkeletonLoader from "../components/SkeletonLoader";
import { useCurriculum } from "../hooks/useCurriculum";
import { useMasteredTopics } from "../hooks/useMasteredTopics";
import { useAuth } from "../hooks/useAuth";

const SubjectGrid = React.lazy(() => import("../components/SubjectGrid"));
const ChapterList = React.lazy(() => import("../components/ChapterList"));
const TopicList = React.lazy(() => import("../components/TopicList"));
const LearnFlow = React.lazy(() => import("../components/LearnFlow"));
const AnalyticsDashboard = React.lazy(() => import("../components/AnalyticsDashboard"));
const MistakeJournal = React.lazy(() => import("../components/MistakeJournal"));

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

  const topic = decodeURIComponent(topicId);
  const subject = subjectMap.get(subjectId);
  const chapter = chapterMap.get(`${subjectId}|${chapterId}`);
  if (!chapter) return <div style={{ padding: "2rem" }}>Topic not found</div>;
  return (
    <LearnFlow
      key={`${subjectId}|${chapterId}|${topicId}`}
      subject={subject}
      chapter={chapter}
      topic={topic}
      goBack={() => navigate(`/subjects/${subjectId}/chapters/${chapterId}`)}
      markMastered={markMastered}
      mastered={mastered}
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

export default function AppRoutes() {
  const { loading: curriculumLoading } = useCurriculum();
  const { sessionLoading } = useAuth();
  const { loading: masteredLoading } = useMasteredTopics();
  const [loaderDismissed, setLoaderDismissed] = useState(false);

  const dataReady = !sessionLoading && !curriculumLoading && !masteredLoading;

  // Show the asymptotic loading bar until data arrives AND the animation completes
  if (!loaderDismissed) {
    return (
      <LoadingScreen
        fullScreen={true}
        isReady={dataReady}
        sessionLoading={sessionLoading}
        curriculumLoading={curriculumLoading}
        masteredLoading={masteredLoading}
        onComplete={() => setLoaderDismissed(true)}
      />
    );
  }

  return (
    <Suspense fallback={
      <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <SkeletonLoader type="list" count={4} />
      </div>
    }>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        <Route element={<AppLayout />}>
          <Route path="/subjects" element={<SubjectsView />} />
          <Route path="/subjects/:subjectId" element={<ChapterListWrapper />} />
          <Route path="/subjects/:subjectId/chapters/:chapterId" element={<TopicListWrapper />} />
          <Route path="/learn/:subjectId/:chapterId/:topicId" element={<LearnFlowWrapper />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/mistakes" element={<MistakeJournal />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
