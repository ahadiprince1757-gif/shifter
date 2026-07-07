import { useEffect, useRef } from 'react';
import { drawG, getImgQ } from '../../utils/graphs';

function Visuals({ subject, chapter, topic, phase, loading }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (phase === 0 && !loading && canvasRef.current) {
      drawG(canvasRef.current, topic, chapter.id);
    }
  }, [phase, loading, topic, chapter]);

  const imgSubs = ["biology", "geography", "chemistry", "physics"];
  let images = [];
  if (imgSubs.includes(subject.id) || (subject.id === "math" && chapter.id === "geometry")) {
    images = getImgQ(subject.id, chapter.id, topic);
  }

  const gMap = {
    "math|trig": 1,
    "math|calculus": 1,
    "math|stats": 1,
    "physics|motion": 1,
    "physics|energy": 1,
    "biology|ecology": 1,
    "geography|mapwork": 1,
  };

  return (
    <div id="notesVis">
      {images.length > 0 && (
        <div className="img-grid">
          {images.map(img => (
            <div className="img-item" key={img}>
              <img src={`https://source.unsplash.com/400x158/?${encodeURIComponent(img)}`} alt={img} loading="lazy" onError={(e) => e.target.closest('.img-item').style.display='none'} />
              <div className="img-cap">{img}</div>
            </div>
          ))}
        </div>
      )}
      {gMap[`${subject.id}|${chapter.id}`] && (
        <div className="graph-wrap">
          <canvas ref={canvasRef} height="235"></canvas>
          <div className="graph-lbl">{topic}</div>
        </div>
      )}
    </div>
  );
}

export default Visuals;
