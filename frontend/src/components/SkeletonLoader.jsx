
export default function SkeletonLoader({ type = "list", count = 4 }) {
  const items = Array.from({ length: count });

  const shimmerStyle = `
    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }
    .skeleton-item {
      background: linear-gradient(90deg, var(--bg2) 25%, var(--bd) 37%, var(--bg2) 63%);
      background-size: 200% 100%;
      animation: shimmer 1.6s infinite linear;
      border-radius: 8px;
    }
    .skeleton-card {
      background: var(--sur);
      border: 1.5px solid var(--bd);
      border-radius: 16px;
      padding: 1.45rem;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    }
    .skeleton-row {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: var(--sur);
      border: 1.5px solid var(--bd);
      border-radius: 12px;
      margin-bottom: 0.8rem;
    }
  `;

  if (type === "grid") {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.15rem", width: "100%", padding: "1rem 0" }}>
        <style>{shimmerStyle}</style>
        {items.map((_, idx) => (
          <div key={idx} className="skeleton-card">
            <div className="skeleton-item" style={{ width: "44px", height: "44px", borderRadius: "11px" }} ></div>
            <div className="skeleton-item" style={{ width: "60%", height: "20px", marginTop: "0.5rem" }} ></div>
            <div className="skeleton-item" style={{ width: "80%", height: "14px" }} ></div>
            <div className="skeleton-item" style={{ width: "100%", height: "6px", borderRadius: "99px", marginTop: "0.8rem" }} ></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "list") {
    return (
      <div style={{ width: "100%", padding: "1rem 0" }}>
        <style>{shimmerStyle}</style>
        {items.map((_, idx) => (
          <div key={idx} className="skeleton-row">
            <div className="skeleton-item" style={{ width: "24px", height: "24px", borderRadius: "50%" }} ></div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <div className="skeleton-item" style={{ width: "40%", height: "16px" }} ></div>
              <div className="skeleton-item" style={{ width: "20%", height: "12px" }} ></div>
            </div>
            <div className="skeleton-item" style={{ width: "60px", height: "20px", borderRadius: "99px" }} ></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "quiz") {
    return (
      <div style={{ width: "100%", padding: "1rem 0", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <style>{shimmerStyle}</style>
        {/* Question Text */}
        <div className="skeleton-item" style={{ width: "80%", height: "24px" }} ></div>
        <div className="skeleton-item" style={{ width: "95%", height: "16px" }} ></div>
        <div className="skeleton-item" style={{ width: "60%", height: "16px", marginBottom: "1.5rem" }} ></div>

        {/* Textarea Placeholder (for working/answers) */}
        <div className="skeleton-item" style={{ width: "100%", height: "120px", borderRadius: "12px", marginBottom: "0.5rem" }} ></div>

        {/* Input Field Placeholder */}
        <div className="skeleton-item" style={{ width: "100%", height: "48px", borderRadius: "12px", marginBottom: "1.5rem" }} ></div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <div className="skeleton-item" style={{ width: "100px", height: "38px", borderRadius: "8px" }} ></div>
          <div className="skeleton-item" style={{ width: "130px", height: "38px", borderRadius: "8px", marginLeft: "auto" }} ></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", padding: "1rem 0", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
      <style>{shimmerStyle}</style>
      {/* Title */}
      <div className="skeleton-item" style={{ width: "60%", height: "32px", marginBottom: "0.5rem" }} ></div>
      
      {/* Paragraph 1 */}
      <div className="skeleton-item" style={{ width: "100%", height: "18px" }} ></div>
      <div className="skeleton-item" style={{ width: "96%", height: "18px" }} ></div>
      <div className="skeleton-item" style={{ width: "98%", height: "18px" }} ></div>
      <div className="skeleton-item" style={{ width: "80%", height: "18px" }} ></div>

      {/* Subheading */}
      <div className="skeleton-item" style={{ width: "40%", height: "24px", marginTop: "1.5rem" }} ></div>
      
      {/* Paragraph 2 */}
      <div className="skeleton-item" style={{ width: "95%", height: "18px" }} ></div>
      <div className="skeleton-item" style={{ width: "100%", height: "18px" }} ></div>
      <div className="skeleton-item" style={{ width: "85%", height: "18px" }} ></div>

      {/* Image / Block placeholder */}
      <div className="skeleton-item" style={{ width: "100%", height: "180px", borderRadius: "12px", marginTop: "1rem", marginBottom: "1rem" }} ></div>

      {/* Paragraph 3 */}
      <div className="skeleton-item" style={{ width: "92%", height: "18px" }} ></div>
      <div className="skeleton-item" style={{ width: "97%", height: "18px" }} ></div>
      <div className="skeleton-item" style={{ width: "60%", height: "18px" }} ></div>
    </div>
  );
}
