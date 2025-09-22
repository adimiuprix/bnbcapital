import { useState } from "react";
import { FaCopy } from "react-icons/fa";
import { FaTwitter, FaTelegram, FaFacebook, FaWhatsapp } from "react-icons/fa";

export default function Referral() {
    const [referralLink, setReferralLink] = useState("Connect wallet to get referral link");
    const [levels, setLevels] = useState({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    });

    const copyReferralLink = () => {
        navigator.clipboard.writeText(referralLink);
        alert("Referral link copied!");
    };

    const share = (platform) => {
        alert(`Share on ${platform}!`); // nanti bisa diganti dengan actual share link
    };

    return (
        <div className="referral-mobile" id="referral">
            <h2 className="section-title">Referral Program</h2>
            <div className="referral-card">
                <div className="referral-link-container">
                    <input
                        type="text"
                        className="referral-link"
                        value={referralLink}
                        readOnly
                    />
                    <button className="copy-btn" onClick={copyReferralLink}>
                        <FaCopy /> COPY
                    </button>
                </div>

                <div className="referral-levels">
                    {Object.entries(levels).map(([level, count]) => {
                        const percentages = { 1: 5, 2: 3, 3: 2, 4: 1, 5: 0.5 };
                        return (
                            <div className="level-card" key={level}>
                                <div className="level-percentage">{percentages[level]}%</div>
                                <div className="level-number">LEVEL {level}</div>
                                <div className="level-referrals">{count} referrals</div>
                            </div>
                        );
                    })}
                </div>

                <p style={{ textAlign: "center", fontSize: "12px", color: "var(--text-secondary)", marginTop: "16px" }}>
                    Total potential: <span style={{ color: "var(--primary)", fontWeight: 600 }}>11.5%</span> from your network's investments
                </p>

                <div className="share-buttons">
                    <div className="share-btn" onClick={() => share("Twitter")}>
                        <FaTwitter />
                    </div>
                    <div className="share-btn" onClick={() => share("Telegram")}>
                        <FaTelegram />
                    </div>
                    <div className="share-btn" onClick={() => share("Facebook")}>
                        <FaFacebook />
                    </div>
                    <div className="share-btn" onClick={() => share("Whatsapp")}>
                        <FaWhatsapp />
                    </div>
                </div>
            </div>
        </div>
    );
}
