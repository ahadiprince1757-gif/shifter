import { useState } from "react";
import Navbar from "./Navbar";

function Landing({ curriculum, enterApp, isDark, toggleDark, session, openAuth }) {
  const [legalModal, setLegalModal] = useState(null);
  const [activeFeature, setActiveFeature] = useState(null);

  const totalTopics =
    curriculum?.reduce(
      (acc, s) => acc + s.chapters.reduce((a, c) => a + c.topics.length, 0),
      0,
    ) ?? 0;

  const legalContent = {
    policy: {
      title: "TIXAR LEGAL FRAMEWORK - Privacy Policy",
      icon: "🔒",
      body: (
        <>
          <p style={{ marginBottom: "1rem" }}>
            <strong>Effective Date:</strong> 1 January 2026
          </p>
          <p style={{ marginBottom: "1.5rem" }}>
            <em>Terms of Service • Privacy Policy • AI Use Policy • Child Safety Framework • Developer Terms</em>
          </p>

          <h3>3. LEGAL BASIS & APPLICABLE LAW</h3>
          <p>
            Tixar is primarily governed by the laws of the Republic of Kenya and seeks to align with recognized international privacy and educational standards where applicable.
          </p>
          <p>Tixar is designed with consideration for:</p>
          <ul>
            <li>The Constitution of Kenya, 2010 (Article 31 – Right to Privacy)</li>
            <li>Kenya Data Protection Act, 2019</li>
            <li>Computer Misuse and Cybercrimes Act, 2018</li>
            <li>Kenya Consumer Protection principles</li>
            <li>Kenya Children Act (as amended)</li>
            <li>Google Play and Apple App Store requirements</li>
            <li>International privacy principles including GDPR-aligned protections where applicable</li>
          </ul>
          <p>Where local mandatory law applies, such law shall prevail.</p>

          <h3>8. PRIVACY & DATA PROTECTION</h3>
          <p>Tixar is committed to privacy-first educational technology.</p>
          <p>
            Personal Data may include: account information, learning progress, submitted educational materials, device and technical information, and platform usage analytics.
          </p>
          <p>Tixar follows these principles:</p>
          <ul>
            <li><strong>Data Minimization:</strong> Only necessary information is collected.</li>
            <li><strong>Purpose Limitation:</strong> Data is used solely for educational functionality, platform improvement, security, and lawful operational purposes.</li>
            <li><strong>Security Measures:</strong> Tixar implements commercially reasonable technical and organizational safeguards to protect user information.</li>
            <li><strong>No Sale of Personal Data:</strong> Tixar does not sell user personal data.</li>
            <li><strong>Child Privacy:</strong> Additional protections apply to minors. Behavioral advertising targeting minors is prohibited.</li>
          </ul>

          <h3>9. USER RIGHTS</h3>
          <p>Where applicable under law, users may request:</p>
          <ul>
            <li>access to their personal data;</li>
            <li>correction of inaccurate information;</li>
            <li>deletion of eligible data;</li>
            <li>restriction of processing;</li>
            <li>objection to certain forms of processing;</li>
            <li>data portability where technically feasible.</li>
          </ul>
          <p>Requests may be subject to identity verification and lawful retention obligations.</p>

          <h3>10. DATA RETENTION</h3>
          <p>Tixar retains information only as reasonably necessary for educational purposes, account management, security, and legal compliance.</p>
          <p>Information may be anonymized or deleted when no longer necessary. Users may request account deletion subject to lawful obligations.</p>

          <h3>15. SECURITY & INCIDENT RESPONSE</h3>
          <p>Tixar takes reasonable measures to maintain platform security. In the event of a material security incident or data breach, Tixar may:</p>
          <ul>
            <li>investigate the issue;</li>
            <li>contain unauthorized activity;</li>
            <li>notify affected users where legally required;</li>
            <li>cooperate with relevant authorities when necessary.</li>
          </ul>

          <h3>22. CONTACT INFORMATION</h3>
          <p>Questions regarding these Terms may be directed to Tixar support. Official legal, privacy, and support contact details may be published within the application or website.</p>

          <p style={{ marginTop: "1.5rem" }}>
            <strong>© 2026 Tixar. All Rights Reserved.</strong>
          </p>
        </>
      ),
    },
    terms: {
      title: "TIXAR LEGAL FRAMEWORK - Terms of Service",
      icon: "⚖️",
      body: (
        <>
          <p style={{ marginBottom: "1rem" }}>
            <strong>Effective Date:</strong> 1 January 2026
          </p>
          <p style={{ marginBottom: "1.5rem" }}>
            <em>Terms of Service • Privacy Policy • AI Use Policy • Child Safety Framework • Developer Terms</em>
          </p>

          <h3>1. INTRODUCTION</h3>
          <p>Welcome to Tixar.</p>
          <p>
            Tixar is an educational technology platform that provides AI-assisted learning tools, tutoring systems, note summarization, essay assistance, adaptive learning tools, and digital educational support services (“Services”).
          </p>
          <p>
            By accessing or using Tixar, users agree to comply with this Legal Framework. If you do not agree to these Terms, you must discontinue use of the Services.
          </p>
          <p>
            Tixar is currently an independently developed educational platform and may evolve over time through updates, new features, institutional partnerships, and technological improvements.
          </p>

          <h3>2. DEFINITIONS</h3>
          <p>For purposes of these Terms:</p>
          <ul>
            <li><strong>“Tixar”</strong> means the Tixar website, mobile applications, software, APIs, AI systems, educational tools, and related services.</li>
            <li><strong>“Services”</strong> means educational, tutoring, summarization, essay assistance, learning analytics, and AI-powered functionality offered through Tixar.</li>
            <li><strong>“User”</strong> means any individual accessing or using Tixar.</li>
            <li><strong>“Minor”</strong> means a person below eighteen (18) years of age.</li>
            <li><strong>“Parent or Guardian”</strong> means a person legally responsible for a Minor.</li>
            <li><strong>“Educational Institution”</strong> means schools, universities, tutoring organizations, or approved learning institutions using Tixar.</li>
            <li><strong>“Personal Data”</strong> means information relating to an identified or identifiable person.</li>
            <li><strong>“User Content”</strong> means documents, notes, essays, prompts, educational materials, or files submitted by users.</li>
            <li><strong>“AI Outputs”</strong> means responses, recommendations, explanations, summaries, or generated educational assistance provided by Tixar systems.</li>
          </ul>

          <h3>4. ELIGIBILITY & ACCOUNT REQUIREMENTS</h3>
          <h4>4.1 General Eligibility</h4>
          <p>Tixar is available to all learners. Users must have legal capacity to accept these Terms.</p>
          <h4>4.2 Minors</h4>
          <p>Users under eighteen (18) may access Tixar only:</p>
          <ul>
            <li>with parental or guardian consent; or</li>
            <li>through authorization by an educational institution where permitted by law.</li>
          </ul>
          <p>Parents, guardians, or schools may supervise and manage educational use by minors.</p>
          <h4>4.3 Account Responsibility</h4>
          <p>Users agree to:</p>
          <ul>
            <li>provide accurate information;</li>
            <li>maintain confidentiality of login credentials;</li>
            <li>protect account security;</li>
            <li>notify Tixar of suspected unauthorized access.</li>
          </ul>
          <p>Users remain responsible for activities conducted through their accounts.</p>

          <h3>5. ACCEPTABLE USE POLICY</h3>
          <p>Users agree not to misuse Tixar. Users shall NOT:</p>
          <ul>
            <li>use Tixar for unlawful purposes;</li>
            <li>upload malicious software, viruses, or harmful code;</li>
            <li>impersonate another person;</li>
            <li>interfere with platform security;</li>
            <li>reverse engineer or attempt unauthorized access;</li>
            <li>scrape, extract, or exploit platform data without authorization;</li>
            <li>misuse AI systems for fraud, cheating, misinformation, harassment, or harmful conduct;</li>
            <li>submit content that violates intellectual property rights;</li>
            <li>use Tixar to generate harmful, illegal, discriminatory, or abusive material.</li>
          </ul>
          <p>
            Educational assistance must be used responsibly. Users remain responsible for verifying academic submissions and ensuring compliance with institutional academic integrity policies.
          </p>

          <h3>12. INTELLECTUAL PROPERTY</h3>
          <p>All Tixar intellectual property remains owned by Tixar, including:</p>
          <ul>
            <li>software;</li>
            <li>trademarks;</li>
            <li>logos;</li>
            <li>educational systems;</li>
            <li>AI systems;</li>
            <li>designs;</li>
            <li>proprietary educational technology.</li>
          </ul>
          <p>Nothing in these Terms transfers ownership to users. Users may not reproduce, distribute, copy, sell, or exploit Tixar systems without permission.</p>

          <h3>13. FUTURE SUBSCRIPTIONS & PAYMENTS</h3>
          <p>Some Services may later become paid or subscription-based. Where payment services are introduced, Tixar may provide:</p>
          <ul>
            <li>pricing;</li>
            <li>subscription terms;</li>
            <li>renewal policies;</li>
            <li>cancellation rights;</li>
            <li>refund rules.</li>
          </ul>
          <p>Mobile purchases may be governed by Apple App Store or Google Play billing policies. No payment obligations exist unless expressly stated.</p>

          <h3>14. THIRD-PARTY SERVICES</h3>
          <p>
            Tixar may integrate third-party tools, cloud providers, analytics, or educational services. Tixar is not responsible for third-party systems outside its control. Users remain subject to applicable third-party terms where integration occurs.
          </p>

          <h3>16. DISCLAIMERS & LIMITATION OF LIABILITY</h3>
          <p>Tixar is provided on an “as is” and “as available” basis.</p>
          <p>To the maximum extent permitted under Kenyan law, Tixar does not guarantee:</p>
          <ul>
            <li>uninterrupted availability;</li>
            <li>error-free performance;</li>
            <li>perfect accuracy of AI outputs;</li>
            <li>compatibility with every device.</li>
          </ul>
          <p>Users assume responsibility for independently verifying educational information.</p>
          <p>Tixar shall not be liable for:</p>
          <ul>
            <li>indirect damages;</li>
            <li>lost opportunities;</li>
            <li>academic losses;</li>
            <li>reputational harm;</li>
            <li>incidental or consequential damages arising from platform use.</li>
          </ul>
          <p>Nothing in these Terms excludes liability for: fraud, gross negligence, unlawful misconduct, or liability that cannot legally be excluded.</p>

          <h3>17. SUSPENSION & TERMINATION</h3>
          <p>Tixar may suspend or terminate access where:</p>
          <ul>
            <li>these Terms are violated;</li>
            <li>misuse or abuse is suspected;</li>
            <li>unlawful activity occurs;</li>
            <li>platform security is threatened;</li>
            <li>required by law.</li>
          </ul>
          <p>Users may stop using Tixar at any time. Termination may result in deletion of certain platform access rights.</p>

          <h3>18. DEVELOPER TERMS</h3>
          <h4>18.1 Developer Access</h4>
          <p>Tixar may provide APIs, SDKs, integrations, or developer tools. Access remains discretionary.</p>
          <h4>18.2 Developer Obligations</h4>
          <p>Developers must:</p>
          <ul>
            <li>comply with applicable law;</li>
            <li>maintain secure credentials;</li>
            <li>process data responsibly;</li>
            <li>avoid misuse of user information.</li>
          </ul>
          <h4>18.3 Prohibited Conduct</h4>
          <p>Developers may not:</p>
          <ul>
            <li>reverse engineer systems;</li>
            <li>exploit platform vulnerabilities;</li>
            <li>misuse educational data;</li>
            <li>bypass security restrictions;</li>
            <li>create deceptive or harmful integrations.</li>
          </ul>
          <h4>18.4 Data Protection</h4>
          <p>Developers must maintain appropriate safeguards for user data and may not sell or improperly transfer information.</p>
          <h4>18.5 Suspension</h4>
          <p>Tixar may suspend developer access for abuse, legal risk, or policy violations.</p>

          <h3>19. DISPUTE RESOLUTION</h3>
          <p>Tixar encourages informal resolution of disputes.</p>
          <p><strong>Step 1 – Good Faith Resolution:</strong> Parties shall first attempt good-faith negotiation.</p>
          <p><strong>Step 2 – Mediation:</strong> Where disputes remain unresolved, parties agree to attempt mediation in Kenya.</p>
          <p><strong>Step 3 – Arbitration:</strong> If mediation fails, disputes may be referred to arbitration in accordance with Kenyan law.</p>
          <p><strong>Step 4 – Courts:</strong> Where arbitration is unavailable or legally insufficient, disputes shall be resolved by courts of competent jurisdiction in Nairobi, Kenya.</p>
          <p>These Terms shall be governed by the laws of Kenya.</p>

          <h3>20. FORCE MAJEURE</h3>
          <p>Tixar shall not be liable for failures caused by circumstances beyond reasonable control, including:</p>
          <ul>
            <li>internet outages;</li>
            <li>cyberattacks;</li>
            <li>governmental actions;</li>
            <li>natural disasters;</li>
            <li>infrastructure failures;</li>
            <li>power interruptions.</li>
          </ul>

          <h3>21. CHANGES TO TERMS</h3>
          <p>Tixar may update these Terms from time to time to reflect: legal requirements, platform improvements, operational changes, or educational or safety updates. Continued use after updates constitutes acceptance of revised Terms.</p>

          <h3>22. CONTACT INFORMATION</h3>
          <p>Questions regarding these Terms may be directed to Tixar support. Official legal, privacy, and support contact details may be published within the application or website.</p>

          <p style={{ marginTop: "1.5rem" }}>
            <strong>© 2026 Tixar. All Rights Reserved.</strong>
          </p>
        </>
      ),
    },
    consent: {
      title: "TIXAR LEGAL FRAMEWORK - AI Use & Child Safety",
      icon: "🛡️",
      body: (
        <>
          <p style={{ marginBottom: "1rem" }}>
            <strong>Effective Date:</strong> 1 January 2026
          </p>
          <p style={{ marginBottom: "1.5rem" }}>
            <em>Terms of Service • Privacy Policy • AI Use Policy • Child Safety Framework • Developer Terms</em>
          </p>

          <h3>6. EDUCATIONAL PURPOSE & AI LIMITATIONS</h3>
          <p>Tixar is designed as an educational support system. The platform provides: AI tutoring, note summarization, essay assistance, and learning support tools.</p>
          <h4>6.1 AI Transparency</h4>
          <p>Users acknowledge that:</p>
          <ul>
            <li>AI systems generate probabilistic outputs;</li>
            <li>outputs may contain factual inaccuracies;</li>
            <li>explanations may be incomplete or outdated;</li>
            <li>AI-generated responses should be independently verified.</li>
          </ul>
          <h4>6.2 No Guaranteed Outcomes</h4>
          <p>Tixar does not guarantee: examination success, grades, academic admission, scholarships, certification, or professional qualification. Educational success remains dependent on individual effort and institutional standards.</p>
          <h4>6.3 No Professional Advice</h4>
          <p>Tixar does not provide: legal advice, medical diagnosis, financial advice, or psychological or professional counselling. AI outputs are informational and educational only.</p>

          <h3>7. USER CONTENT</h3>
          <p>
            Users retain ownership of content uploaded to Tixar. By uploading content, users grant Tixar a limited, non-exclusive license to process content, generate summaries, provide tutoring responses, improve educational functionality, and maintain service operations.
          </p>
          <p>
            Tixar does not claim ownership of user-created educational materials. Users must ensure uploaded content does not infringe copyright, is lawful, and does not violate rights of others. Tixar reserves the right to remove content that violates these Terms.
          </p>

          <h3>11. CHILD & EDUCATIONAL SAFETY FRAMEWORK</h3>
          <p>Tixar supports safe digital learning. For minors:</p>
          <ul>
            <li>parental or school consent may be required;</li>
            <li>collection of unnecessary personal information is minimized;</li>
            <li>harmful profiling is restricted;</li>
            <li>educational information is used solely for learning support.</li>
          </ul>
          <p>Where educational institutions deploy Tixar:</p>
          <ul>
            <li>institutions may manage student access;</li>
            <li>schools may act as responsible educational administrators;</li>
            <li>access to student information shall remain education-focused.</li>
          </ul>

          <h3>22. CONTACT INFORMATION</h3>
          <p>Questions regarding these Terms may be directed to Tixar support. Official legal, privacy, and support contact details may be published within the application or website.</p>

          <p style={{ marginTop: "1.5rem" }}>
            <strong>© 2026 Tixar. All Rights Reserved.</strong>
          </p>
        </>
      ),
    },
  };

  return (
    <div id="landing" className="screen active">
      {/* Legal Modal */}
      {legalModal && (
        <div className="legal-overlay" onClick={() => setLegalModal(null)}>
          <div
            className="legal-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <div className="legal-modal-header">
              <span className="legal-modal-icon">
                {legalContent[legalModal].icon}
              </span>
              <h2 id="modal-title" className="legal-modal-title">
                {legalContent[legalModal].title}
              </h2>
              <button
                className="legal-modal-close"
                onClick={() => setLegalModal(null)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="legal-modal-body">
              {legalContent[legalModal].body}
            </div>
            <div className="legal-modal-footer">
              <button
                className="btn-hero primary"
                onClick={() => setLegalModal(null)}
                style={{ fontSize: "0.8rem", padding: "0.5rem 1.4rem" }}
              >
                I Agree and continue
              </button>
            </div>
          </div>
        </div>
      )}

      <Navbar
        isDark={isDark}
        toggleDark={toggleDark}
        session={session}
        onOpenAuth={openAuth}
      />
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              ✨ Where curiosity and knowledge connect
            </div>
            <div className="hero-title">
              Master Any Subject, <span className="gt">Anywhere.</span>
            </div>
            <div className="hero-sub" style={{ marginBottom: "1rem" }}>
              Tixar is an offline-first learning platform designed to provide a
              seamless, interactive educational experience. Dive into
              high-quality curriculum content, track your progress, and master
              subjects at your own pace without needing an internet connection.
            </div>
            <div className="hero-actions">
              <button className="btn-hero primary" onClick={enterApp}>
                Start Learning →
              </button>
            </div>
            <div className="hero-stats">
              <div>
                <div className="sn">{curriculum?.length ?? 0}+</div>
                <div className="sl">Subjects</div>
              </div>
              <div>
                <div className="sn">
                  {totalTopics > 0 ? totalTopics + "+" : "500+"}
                </div>
                <div className="sl">Topics</div>
              </div>
              <div>
                <div className="sn">Explore</div>
                <div className="sl">Offline</div>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="logo-mega">
              <div className="ring"></div>
              <div className="ring2"></div>
              <img
                src="/Tixar.jpeg"
                alt="Tichar Logo Mega"
                className="logo-img-mega"
              />
            </div>
          </div>
        </div>
      </section>


      <section className="sec" id="subjs" style={{ background: "var(--bg)" }}>
        <div className="sec-head">
          <div className="sec-lbl">Our Subjects</div>
          <h2 className="sec-title">Explore and Master</h2>
          <p className="sec-sub">
            Dive into any subject below. Track your completion rate and master each chapter topic-by-topic.
          </p>
        </div>
        <div className="subj-grid-land">
          {curriculum?.map((s) => (
            <button
              className="sc-land"
              key={s.id}
              onClick={enterApp}
              aria-label={`View ${s.label} subject`}
            >
              <div className="si">{s.icon}</div>
              <div className="sn2">{s.label}</div>
              <div className="sc2">
                {s.chapters?.reduce((a, c) => a + (c.topics?.length ?? 0), 0) ??
                  0}{" "}
                topics
              </div>
            </button>
          )) ?? null}
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "1.65rem",
            position: "relative",
            zIndex: 10,
          }}
        >
          <button
            className="btn-hero primary"
            onClick={enterApp}
            style={{ fontSize: "0.84rem" }}
          >
            Explore All Subjects →
          </button>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-links-grid">
            <div className="footer-column brand-col">
              <div className="footer-brand">
                <img src="/Tixar.jpeg" alt="Tixar Logo" className="footer-logo" />
                <span className="footer-name">Tixar</span>
              </div>
              <p className="footer-tagline">Connecting ideas. Empowering minds.</p>

              <div className="footer-socials">
                <span className="socials-text">Follow us on:</span>
                <div className="socials-icons">
                  <a
                    href="https://facebook.com/nesis"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/Tixarapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a
                    href="https://x.com/nesis"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X (Twitter)"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="https://tiktok.com/@Tixar"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.28 6.28 0 005.4 15.63a6.28 6.28 0 004.5 1.87A6.29 6.29 0 0015.8 11.8V5.3a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                    </svg>
                  </a>
                  <a
                    href="https://youtube.com/@nesis"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 00-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.016 3.016 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="footer-column links-col">
              <h4 className="footer-heading">Features</h4>
              <div className="footer-accordion">
                <div className={`footer-accordion-item ${activeFeature === "feedback" ? "active" : ""}`}>
                  <button
                    className="footer-accordion-trigger"
                    onClick={() => setActiveFeature(activeFeature === "feedback" ? null : "feedback")}
                  >
                    <span>Immediate Feedback</span>
                    <span className="accordion-arrow">▾</span>
                  </button>
                  <div className="footer-accordion-content">
                    <p>Receive instant feedback, clear explanations, and step-by-step insights immediately after every answer.</p>
                  </div>
                </div>

                <div className={`footer-accordion-item ${activeFeature === "content" ? "active" : ""}`}>
                  <button
                    className="footer-accordion-trigger"
                    onClick={() => setActiveFeature(activeFeature === "content" ? null : "content")}
                  >
                    <span>Rich Content</span>
                    <span className="accordion-arrow">▾</span>
                  </button>
                  <div className="footer-accordion-content">
                    <p>Comprehensive curriculum materials across 12 distinct subjects.</p>
                  </div>
                </div>

                <div className={`footer-accordion-item ${activeFeature === "tracking" ? "active" : ""}`}>
                  <button
                    className="footer-accordion-trigger"
                    onClick={() => setActiveFeature(activeFeature === "tracking" ? null : "tracking")}
                  >
                    <span>Progress Tracking</span>
                    <span className="accordion-arrow">▾</span>
                  </button>
                  <div className="footer-accordion-content">
                    <p>Visualize your learning journey and keep track of mastered concepts.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-column links-col">
              <h4 className="footer-heading">Legal Requirements</h4>
              <div className="footer-links">
                <button onClick={() => setLegalModal("policy")} className="footer-link-btn">
                  Privacy Policy
                </button>
                <button onClick={() => setLegalModal("terms")} className="footer-link-btn">
                  Terms of Service
                </button>
                <button onClick={() => setLegalModal("consent")} className="footer-link-btn">
                  AI Use & Child Safety
                </button>
              </div>
            </div>
          </div>

          <p className="footer-copyright">
            © Copyright 2026. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
