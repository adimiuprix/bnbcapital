import './App.css'
import Header from './partials/Header'
import { FaHeadset, FaShieldAlt, FaCheckCircle } from "react-icons/fa"
import Hero from './partials/Hero'
import TvlCard from './partials/TvlCard'
import Stat from './partials/Stat'
import LiveTransactions from './partials/LiveTransactions'
import HowItWorks from './partials/HowItWorks'
import Investment from './partials/Investment'
import Calculator from './partials/Calculator'
import Dashboard from './partials/Dashboard'
import Referral from './partials/Referral'
import SecurityAudit from './partials/SecurityAudit'
import Features from './partials/Features'
import MediaCoverage from './partials/MediaCoverage'
import Faqs from './partials/Faqs'
import Footer from './partials/Footer'

function App() {

  return (
    <>
        <Header />

        <div class="app-container">
            {/* Admin Contact Banner */}
            <div
              style={{
                background: "linear-gradient(135deg, #00ff88 0%, #00cc66 100%)",
                padding: "12px 16px",
                textAlign: "center",
                fontWeight: 600,
                color: "#000",
                overflowWrap: "break-word",
                wordWrap: "break-word",
                fontSize: "14px",
              }}
            >
              <FaHeadset /> Support:{" "}
              <a
                href="https://t.me/bnbcapitaldev"
                target="_blank"
                style={{ color: "#000", textDecoration: "underline" }}
              >
                @bnbcapitaldev
              </a>
              <br />
              Channel:{" "}
              <a
                href="https://t.me/bnbcapitalorg"
                target="_blank"
                style={{ color: "#000", textDecoration: "underline" }}
              >
                @bnbcapitalorg
              </a>
            </div>

            {/* Security Audit Banner */}
            <div
              style={{
                background: "linear-gradient(135deg, #1a4d2e 0%, #0f2818 100%)",
                padding: "12px 16px",
                borderBottom: "2px solid var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <FaShieldAlt style={{ color: "white", fontSize: "18px" }} />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "var(--primary)",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    <FaCheckCircle style={{ marginRight: "4px" }} />
                    SECURITY AUDITED
                  </div>
                  <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.7)", marginTop: "2px" }}>
                    Professional audit completed • No critical issues
                  </div>
                </div>
              </div>
              <a
                href="#security"
                style={{
                  background: "rgba(0, 255, 136, 0.2)",
                  border: "1px solid var(--primary)",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  color: "var(--primary)",
                  textDecoration: "none",
                  fontSize: "11px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                View Report →
              </a>
            </div>

            <Hero />
            <TvlCard />
            <Stat />
            <LiveTransactions />
            <HowItWorks />
            <Investment />
            <Calculator />
            <Dashboard />
            <Referral />
            <SecurityAudit />
            <Features />
            <MediaCoverage />
            <Faqs />
            <Footer />
        </div>
    </>
  )
}

export default App
