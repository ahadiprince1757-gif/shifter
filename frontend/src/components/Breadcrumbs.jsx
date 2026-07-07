import { useLocation, useNavigate } from "react-router-dom";
import { useCurriculum } from "../hooks/useCurriculum";

export default function Breadcrumbs() {
  const { curriculum, subjectMap, chapterMap } = useCurriculum();
  const location = useLocation();
  const navigate = useNavigate();

  if (!curriculum) return null;

  const parts = location.pathname.split("/").filter(Boolean);
  if (parts.length === 0 || parts[0] === "landing") return null;

  let subj = null;
  let chap = null;
  let top = null;

  const subjectId = parts[1];
  if (subjectId) {
    subj = subjectMap.get(subjectId) || null;
  }

  // Handle learn flow path or standard lists path
  if (parts[0] === "learn" && parts[2]) {
    const chapterId = parts[2];
    chap = chapterMap.get(`${subjectId}|${chapterId}`) || null;
    top = decodeURIComponent(parts[3] || "");
  } else if (parts[3]) {
    const chapterId = parts[3];
    chap = chapterMap.get(`${subjectId}|${chapterId}`) || null;
  }

  return (
    <div className="bc" id="bcBar">
      <span className="bi" onClick={() => navigate("/subjects")}>All Subjects</span>
      {subj && (
        <>
          <span className="bsep">›</span>
          <span className={chap ? "bi" : "bcur"} onClick={() => navigate(`/subjects/${subj.id}`)}>
            {subj.label}
          </span>
        </>
      )}
      {chap && (
        <>
          <span className="bsep">›</span>
          <span className={top ? "bi" : "bcur"} onClick={() => navigate(`/subjects/${subj.id}/chapters/${chap.id}`)}>
            {chap.label}
          </span>
        </>
      )}
      {top && (
        <>
          <span className="bsep">›</span>
          <span className="bcur">{top}</span>
        </>
      )}
    </div>
  );
}
