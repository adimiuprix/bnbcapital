import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function Faq() {
    const toggleFaq = (e) => {
        const item = e.currentTarget.parentElement;
        item.classList.toggle("active");
    };

    return (
        <section className="section" id="faq">
            <h2 className="section-title" data-i18n="faq">FAQ</h2>
            <div className="section-card">
                <div className="faq-container">
                    
                    <div className="faq-item">
                        <div className="faq-question" onClick={toggleFaq}>
                            <span>What is the minimum investment?</span>
                            <FontAwesomeIcon icon={faChevronDown} className="faq-icon" />
                        </div>
                        <div className="faq-answer">
                            <p>The minimum investment is 0.01 BNB. There is no maximum limit - you can invest as much as you want.</p>
                        </div>
                    </div>

                    <div className="faq-item">
                        <div className="faq-question" onClick={toggleFaq}>
                            <span>Can I withdraw anytime?</span>
                            <FontAwesomeIcon icon={faChevronDown} className="faq-icon" />
                        </div>
                        <div className="faq-answer">
                            <p>Yes, you can withdraw your accumulated earnings anytime. There is a 1-hour cooldown between withdrawals for security purposes.</p>
                        </div>
                    </div>

                    <div className="faq-item">
                        <div className="faq-question" onClick={toggleFaq}>
                            <span>How does the referral program work?</span>
                            <FontAwesomeIcon icon={faChevronDown} className="faq-icon" />
                        </div>
                        <div className="faq-answer">
                            <p>You earn commissions from 5 levels of referrals: Level 1 (5%), Level 2 (3%), Level 3 (2%), Level 4 (1%), and Level 5 (0.5%). Share your referral link and earn automatically when your referrals invest.</p>
                        </div>
                    </div>

                    {/* ... lanjutkan pola yg sama untuk semua FAQ lainnya ... */}

                </div>
            </div>
        </section>
    );
}
