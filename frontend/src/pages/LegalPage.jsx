import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReadingContainer from "../components/layout/ReadingContainer";
import { LEGAL_DOCS } from "../components/LegalModal";

/**
 * LegalPage
 *
 * Dedicated full-screen document view for Terms of Service, Privacy Policy,
 * and AI & Child Safety. Follows Tixar Global Layout Rules:
 * - Continuous document surface inside ReadingContainer (no floating modal/cards)
 * - Underline navigation tabs in Tixar blue (#287ce0)
 * - Clear typography hierarchy and single primary action at the end
 */
export default function LegalPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(
    tabParam && LEGAL_DOCS[tabParam] ? tabParam : "terms"
  );

  useEffect(() => {
    if (tabParam && LEGAL_DOCS[tabParam]) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeTab]);

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/subjects");
    }
  };

  const handleSelectTab = (key) => {
    setActiveTab(key);
    setSearchParams({ tab: key }, { replace: true });
  };

  const currentDoc = LEGAL_DOCS[activeTab] || LEGAL_DOCS.terms;

  return (
    <div id="v-legal" className="view active" style={{ paddingTop: "0.5rem", paddingBottom: "4rem" }}>
      <ReadingContainer>
        {/* Back Navigation */}
        <div style={{ marginBottom: "var(--space-4)" }}>
          <button
            type="button"
            className="secondary-action-btn"
            style={{
              width: "auto",
              padding: "0",
              minHeight: "auto",
              color: "var(--tixar-blue-core, #287ce0)",
              fontWeight: 500,
            }}
            onClick={handleBack}
          >
            ← Back
          </button>
        </div>

        {/* Document Header */}
        <div style={{ marginBottom: "var(--space-4)" }}>
          <div
            className="type-meta"
            style={{
              color: "var(--tixar-blue-core, #287ce0)",
              textTransform: "uppercase",
              marginBottom: "4px",
            }}
          >
            Tixar Legal Framework
          </div>
          <h1 className="type-page-heading" style={{ fontSize: "26px", marginBottom: "4px" }}>
            {currentDoc.label}
          </h1>
        </div>

        {/* Underline Tabs */}
        <div
          role="tablist"
          aria-label="Legal documents"
          style={{
            display: "flex",
            gap: "24px",
            overflowX: "auto",
            borderBottom: "1px solid var(--border-subtle, #e2e8f0)",
            marginBottom: "var(--space-6)",
            scrollbarWidth: "none",
          }}
        >
          {Object.values(LEGAL_DOCS).map((doc) => {
            const isActive = activeTab === doc.key;
            return (
              <button
                key={doc.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelectTab(doc.key)}
                style={{
                  background: "transparent",
                  border: "none",
                  borderBottom: isActive
                    ? "2px solid var(--tixar-blue-core, #287ce0)"
                    : "2px solid transparent",
                  padding: "10px 0",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive
                    ? "var(--tixar-blue-core, #287ce0)"
                    : "var(--text-secondary)",
                  marginBottom: "-1px",
                  transition: "color 0.15s ease",
                }}
              >
                {doc.label}
              </button>
            );
          })}
        </div>

        {/* Continuous Document Body */}
        <div
          className="type-body legal-document-body"
          style={{
            color: "var(--text-primary)",
            lineHeight: 1.7,
          }}
        >
          {currentDoc.content}
        </div>

        {/* Primary Action */}
        <div
          style={{
            marginTop: "var(--space-8, 32px)",
            paddingTop: "var(--space-5, 20px)",
            borderTop: "1px solid var(--border-subtle, #e2e8f0)",
          }}
        >
          <button
            type="button"
            className="primary-action-btn"
            style={{ width: "auto", padding: "10px 22px", minHeight: "42px" }}
            onClick={handleBack}
          >
            I agree &amp; continue →
          </button>
        </div>
      </ReadingContainer>
    </div>
  );
}
