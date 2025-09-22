import { FaShieldAlt, FaCheckCircle, FaLock, FaInfinity, FaFileContract, FaExternalLinkAlt, FaRocket, FaPlayCircle } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="hero-mobile">
      {/* Animated Particles */}
      <div className="particles">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="particle"></div>
        ))}
      </div>

      {/* Trust Badge */}
      <div className="hero-badge">
        <FaShieldAlt /> 100% Decentralized
      </div>

      <h1 className="hero-title">
        <span data-i18n="heroTitle1">Stable & Profitable</span><br />
        <span className="gradient" data-i18n="heroTitle2">Yield Farming</span><br />
        <span data-i18n="heroTitle3">DApp on BSC</span>
      </h1>

      <p className="hero-subtitle" data-i18n="heroDescription">
        Fully decentralized, immutable smart contract. No owner, no admin control. Earn 7.8% to 17% daily ROI with 5 levels of referral rewards.
      </p>

      {/* Trust Indicators */}
      <div className="trust-badges">
        <div className="trust-badge">
          <FaCheckCircle />
          <span>Verified Contract</span>
        </div>
        <div className="trust-badge">
          <FaLock />
          <span>No Admin Keys</span>
        </div>
        <div className="trust-badge">
          <FaInfinity />
          <span>Immutable</span>
        </div>
      </div>

      {/* Smart Contract Address Display */}
      <div style={{
        background: "rgba(0, 255, 136, 0.1)",
        border: "1px solid var(--primary)",
        borderRadius: "12px",
        padding: "12px",
        margin: "16px 0",
        textAlign: "center",
        overflowWrap: "break-word"
      }}>
        <div style={{
          fontSize: "11px",
          color: "var(--text-secondary)",
          marginBottom: "6px",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}>
          <FaFileContract /> Smart Contract V7 (LATEST)
        </div>
        <div style={{
          fontFamily: "monospace",
          fontSize: "11px",
          color: "var(--primary)",
          wordBreak: "break-all",
          marginBottom: "8px",
          overflowWrap: "break-word"
        }}>
          0x8447592F16b45c7E84cC301f82Dc516A1bD645cA
        </div>
        <a
          href="https://bscscan.com/address/0x8447592F16b45c7E84cC301f82Dc516A1bD645cA#code"
          target="_blank"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
            color: "white",
            padding: "6px 12px",
            borderRadius: "20px",
            textDecoration: "none",
            fontSize: "11px",
            fontWeight: 600
          }}
        >
          <FaExternalLinkAlt />
          View on BSCScan
        </a>
      </div>

      {/* Quick Stats */}
      <div className="hero-quick-stats">
        <div className="hero-quick-stat">
          <span className="hero-quick-stat-value">7-30</span>
          <span className="hero-quick-stat-label">Days Plans</span>
        </div>
        <div className="hero-quick-stat">
          <span className="hero-quick-stat-value">234%</span>
          <span className="hero-quick-stat-label">Max ROI</span>
        </div>
        <div className="hero-quick-stat">
          <span className="hero-quick-stat-value">11.5%</span>
          <span className="hero-quick-stat-label">Referral</span>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="hero-cta">
        <a href="#calculator" className="hero-cta-primary">
          <FaRocket />
          Start Earning
        </a>
        <a href="#howitworks" className="hero-cta-secondary">
          <FaPlayCircle />
          How It Works
        </a>
      </div>
    </section>
  );
}
