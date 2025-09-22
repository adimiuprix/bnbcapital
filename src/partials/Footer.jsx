import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faMapMarkerAlt, faCertificate, faCalendar, faFileContract, faShieldAlt, faHeadset, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    return (
        <footer 
            className="footer" 
            style={{ 
                background: "linear-gradient(135deg, #0a0f0a 0%, #000 100%)", 
                borderTop: "2px solid var(--primary)", 
                padding: "30px 16px 0px", 
            }}
        >
            {/* Company Authority Section */}
            <div 
                style={{ 
                    background: "linear-gradient(135deg, rgba(0, 255, 136, 0.08) 0%, rgba(0, 204, 102, 0.08) 100%)", 
                    border: "2px solid rgba(0, 255, 136, 0.3)", 
                    borderRadius: "16px", 
                    padding: "24px 16px", 
                    margin: "0 auto 20px", 
                    textAlign: "center", 
                    maxWidth: "500px", 
                    boxShadow: "0 0 30px rgba(0, 255, 136, 0.1)" 
                }}
            >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
                    <div 
                        style={{ 
                            width: "48px", 
                            height: "48px", 
                            background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)", 
                            borderRadius: "12px", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center" 
                        }}
                    >
                        <FontAwesomeIcon icon={faBuilding} style={{ color: "white", fontSize: "24px" }} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--primary)", margin: 0, textTransform: "uppercase", letterSpacing: "1px" }}>
                            BNB CAPITAL LIMITED
                        </h3>
                        <p style={{ fontSize: "11px", color: "var(--text-secondary)", margin: "4px 0 0 0", fontWeight: 600 }}>
                            OFFICIAL REGISTERED ENTITY
                        </p>
                    </div>
                </div>

                <div style={{ display: "grid", gap: "12px", textAlign: "left", background: "rgba(0, 0, 0, 0.4)", padding: "16px", borderRadius: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "32px", height: "32px", background: "rgba(0, 255, 136, 0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "var(--primary)", fontSize: "14px" }} />
                        </div>
                        <div style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: 1.5 }}>
                            Bourne House 2nd Floor, Francis Street<br />
                            St Helier, Jersey, JE2 4QE
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "32px", height: "32px", background: "rgba(0, 255, 136, 0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <FontAwesomeIcon icon={faCertificate} style={{ color: "var(--primary)", fontSize: "14px" }} />
                        </div>
                        <div style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
                            <a 
                                href="https://find-and-update.company-information.service.gov.uk/company/OE003377"
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: "var(--primary)", textDecoration: "none", display: "flex", alignItems: "center", gap: "6px" }}
                            >
                                <span style={{ fontWeight: 600 }}>Company #OE003377</span>
                                <FontAwesomeIcon icon={faExternalLinkAlt} style={{ fontSize: "10px" }} />
                            </a>
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "32px", height: "32px", background: "rgba(0, 255, 136, 0.1)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <FontAwesomeIcon icon={faCalendar} style={{ color: "var(--primary)", fontSize: "14px" }} />
                        </div>
                        <div style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
                            <span style={{ color: "var(--primary)", fontWeight: 600 }}>Established:</span> 8 November 2022
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "20px", maxWidth: "500px", marginLeft: "auto", marginRight: "auto" }}>
                <a href="https://bscscan.com/address/0x8447592F16b45c7E84cC301f82Dc516A1bD645cA" target="_blank" rel="noreferrer"
                   style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--border)", borderRadius: "12px", padding: "16px", textDecoration: "none", color: "var(--text-primary)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", transition: "all 0.3s" }}>
                    <FontAwesomeIcon icon={faFileContract} style={{ color: "var(--primary)", fontSize: "24px" }} />
                    <span style={{ fontSize: "12px", fontWeight: 600 }}>Smart Contract V7</span>
                </a>
                <a href="https://bscscan.com/address/0x8447592F16b45c7E84cC301f82Dc516A1bD645cA#code" target="_blank" rel="noreferrer"
                   style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--border)", borderRadius: "12px", padding: "16px", textDecoration: "none", color: "var(--text-primary)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", transition: "all 0.3s" }}>
                    <FontAwesomeIcon icon={faShieldAlt} style={{ color: "var(--primary)", fontSize: "24px" }} />
                    <span style={{ fontSize: "12px", fontWeight: 600 }}>Verified Code</span>
                </a>
                <a href="https://t.me/bnbcapitalorg" target="_blank" rel="noreferrer"
                   style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--border)", borderRadius: "12px", padding: "16px", textDecoration: "none", color: "var(--text-primary)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", transition: "all 0.3s" }}>
                    <FontAwesomeIcon icon={faTelegram} style={{ color: "var(--primary)", fontSize: "24px" }} />
                    <span style={{ fontSize: "12px", fontWeight: 600 }}>Community</span>
                </a>
                <a href="https://t.me/bnbcapitaldev" target="_blank" rel="noreferrer"
                   style={{ background: "rgba(255, 255, 255, 0.03)", border: "1px solid var(--border)", borderRadius: "12px", padding: "16px", textDecoration: "none", color: "var(--text-primary)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", transition: "all 0.3s" }}>
                    <FontAwesomeIcon icon={faHeadset} style={{ color: "var(--primary)", fontSize: "24px" }} />
                    <span style={{ fontSize: "12px", fontWeight: 600 }}>24/7 Support</span>
                </a>
            </div>

            {/* Footer Bottom */}
            <div style={{ textAlign: "center", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "12px" }}>
                    <a href="#terms" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "12px", transition: "color 0.3s" }}>Terms</a>
                    <a href="#privacy" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "12px", transition: "color 0.3s" }}>Privacy</a>
                    <a href="#disclaimer" style={{ color: "var(--text-secondary)", textDecoration: "none", fontSize: "12px", transition: "color 0.3s" }}>Disclaimer</a>
                </div>
                <div style={{ fontSize: "11px", color: "rgba(255, 255, 255, 0.3)" }}>
                    © 2025 BNBCapital. All rights reserved. | Powered by Binance Smart Chain
                </div>
            </div>
        </footer>
    );
}
