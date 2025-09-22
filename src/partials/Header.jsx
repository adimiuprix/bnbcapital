import { useState } from "react";
import { FaBars, FaWallet, FaTimes, FaHome, FaInfoCircle, FaChartPie, FaCalculator, FaChartLine, FaUsers, FaStar, FaQuestionCircle, FaBroom, FaFileContract, FaCode, FaHeadset } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa6"; // telegram icon modern

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    const connectWallet = () => {
        console.log("Connect wallet clicked");
    };

    const clearCacheFromMenu = () => {
        console.log("Cache cleared");
        // logika clear cache
    };

    return (
        <>
            <header className="app-header">
                <div className="header-content">
                    <button className="hamburger-btn" onClick={toggleMenu}>
                        <FaBars />
                    </button>

                    <div className="app-logo">
                        <div className="logo-icon">B</div>
                        <span className="logo-text">BNBCapital</span>
                    </div>

                    <div className="header-actions">
                        <button className="wallet-btn" onClick={connectWallet}>
                            <FaWallet />
                            <span>Connect Wallet</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Menu Overlay */}
            {menuOpen && (
                <div className="menu-overlay active" onClick={toggleMenu}></div>
            )}

            {/* Side Menu */}
            <div className={`side-menu ${menuOpen ? "active" : ""}`}>
                <div className="menu-header">
                    <div className="menu-logo">
                        <div className="logo-icon">B</div>
                        <span className="logo-text">BNBCapital</span>
                    </div>
                    <button className="menu-close" onClick={toggleMenu}>
                        <FaTimes />
                    </button>
                </div>

                {/* Navigation Section */}
                <div className="menu-section">
                    <div className="menu-section-title">Navigation</div>
                    <a href="#" className="menu-item" onClick={toggleMenu}>
                        <div className="menu-item-icon"><FaHome /></div>
                        <div className="menu-item-text">Home</div>
                    </a>
                    <a href="#howitworks" className="menu-item" onClick={toggleMenu}>
                        <div className="menu-item-icon"><FaInfoCircle /></div>
                        <div className="menu-item-text">How It Works</div>
                    </a>
                    <a href="#plans" className="menu-item" onClick={toggleMenu}>
                        <div className="menu-item-icon"><FaChartPie /></div>
                        <div className="menu-item-text">Investment Plans & Returns</div>
                    </a>
                    <a href="#calculator" className="menu-item" onClick={toggleMenu}>
                        <div className="menu-item-icon"><FaCalculator /></div>
                        <div className="menu-item-text">Calculator</div>
                    </a>
                    <a href="#dashboard" className="menu-item" onClick={toggleMenu}>
                        <div className="menu-item-icon"><FaChartLine /></div>
                        <div className="menu-item-text">Dashboard</div>
                    </a>
                    <a href="#referral" className="menu-item" onClick={toggleMenu}>
                        <div className="menu-item-icon"><FaUsers /></div>
                        <div className="menu-item-text">Referral Program</div>
                        <div className="menu-item-badge">11.5%</div>
                    </a>
                    <a href="#features" className="menu-item" onClick={toggleMenu}>
                        <div className="menu-item-icon"><FaStar /></div>
                        <div className="menu-item-text">Features</div>
                    </a>
                    <a href="#faq" className="menu-item" onClick={toggleMenu}>
                        <div className="menu-item-icon"><FaQuestionCircle /></div>
                        <div className="menu-item-text">FAQ</div>
                    </a>
                </div>

                {/* Quick Stats */}
                <div className="menu-section">
                    <div className="menu-section-title">Quick Stats</div>
                    <div className="menu-stats">
                        <div className="menu-stat">
                            <div className="menu-stat-value" id="menuTVL">0.00 BNB</div>
                            <div className="menu-stat-label">TVL</div>
                        </div>
                        <div className="menu-stat">
                            <div className="menu-stat-value" id="menuUsers">0</div>
                            <div className="menu-stat-label">Users</div>
                        </div>
                        <div className="menu-stat">
                            <div className="menu-stat-value" id="menuInvested">0 BNB</div>
                            <div className="menu-stat-label">Invested</div>
                        </div>
                        <div className="menu-stat">
                            <div className="menu-stat-value" id="menuWithdrawn">0 BNB</div>
                            <div className="menu-stat-label">Withdrawn</div>
                        </div>
                    </div>
                </div>

                {/* Resources */}
                <div className="menu-section">
                    <div className="menu-section-title">Resources</div>
                    <a href="#" onClick={clearCacheFromMenu} className="menu-item" style={{ background: "rgba(255,0,0,0.1)", border: "1px solid rgba(255,0,0,0.3)" }}>
                        <div className="menu-item-icon" style={{ color: "#ff4444" }}><FaBroom /></div>
                        <div className="menu-item-text">Clear Cache (Fix Issues)</div>
                        <div className="menu-item-badge" style={{ background: "#ff4444" }}>NEW</div>
                    </a>
                    <a href="https://bscscan.com/address/0x8447592F16b45c7E84cC301f82Dc516A1bD645cA" target="_blank" className="menu-item">
                        <div className="menu-item-icon"><FaFileContract /></div>
                        <div className="menu-item-text">Smart Contract</div>
                    </a>
                    <a href="https://bscscan.com/address/0x8447592F16b45c7E84cC301f82Dc516A1bD645cA#code" target="_blank" className="menu-item">
                        <div className="menu-item-icon"><FaCode /></div>
                        <div className="menu-item-text">Source Code</div>
                    </a>
                    <a href="https://t.me/bnbcapitalorg" target="_blank" className="menu-item">
                        <div className="menu-item-icon"><FaTelegram /></div>
                        <div className="menu-item-text">Telegram Channel</div>
                    </a>
                    <a href="https://t.me/bnbcapitaldev" target="_blank" className="menu-item">
                        <div className="menu-item-icon"><FaHeadset /></div>
                        <div className="menu-item-text">Support Admin</div>
                    </a>
                </div>

                <div className="menu-footer">
                    <div className="menu-footer-text">© 2025 BNBCapital</div>
                    <div className="menu-version">Version 1.0.0</div>
                </div>
            </div>
        </>
    );
}
