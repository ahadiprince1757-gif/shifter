import { useAuth } from "../hooks/useAuth";

export default function VerificationPage() {
  const { session, setShowAuthModal } = useAuth();

  if (!session) {
    return (
      <div className="verification-card" style={{ maxWidth: "600px", margin: "2rem auto", textAlign: "center" }}>
        <h2 className="verification-title">Not Logged In</h2>
        <p style={{ margin: "1rem 0", color: "var(--t2)", fontSize: "0.85rem" }}>
          Please log in to verify your session metadata.
        </p>
        <button className="btn-hero primary" onClick={() => setShowAuthModal(true)}>
          Sign In
        </button>
      </div>
    );
  }

  const user = session.user;
  const fullName = user.user_metadata?.full_name || user.email?.split("@")[0] || "Google User";
  const email = user.email;
  const provider = user.app_metadata?.provider || "Google";
  const createdAt = new Date(user.created_at).toLocaleString();

  return (
    <div className="verification-card" style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <div className="verification-header">
        <h2 className="verification-title">Supabase Session Verification</h2>
        <span className="verification-status-badge verified">Session Active</span>
      </div>

      <div style={{ display: "flex", gap: "1.2rem", marginBottom: "2rem", alignItems: "center" }}>
        <img
          src={user.user_metadata?.avatar_url || "/Tixar.jpeg"}
          alt="Avatar"
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            border: "2px solid var(--v)",
            objectFit: "cover"
          }}
        />
        <div>
          <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: "700" }}>{fullName}</h3>
          <p style={{ color: "var(--t3)", fontSize: "0.85rem", margin: "0.1rem 0 0 0" }}>{email}</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div className="verification-detail-row">
          <div className="verification-detail-label">Name:</div>
          <div className="verification-detail-val">{fullName}</div>
        </div>
        <div className="verification-detail-row">
          <div className="verification-detail-label">Email:</div>
          <div className="verification-detail-val">{email}</div>
        </div>
        <div className="verification-detail-row">
          <div className="verification-detail-label">Provider:</div>
          <div className="verification-detail-val" style={{ textTransform: "capitalize" }}>
            {provider}
          </div>
        </div>
        <div className="verification-detail-row">
          <div className="verification-detail-label">Created At:</div>
          <div className="verification-detail-val">{createdAt}</div>
        </div>
      </div>
    </div>
  );
}
