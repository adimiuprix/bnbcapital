const steps = [
    {
        number: 1,
        title: "Connect Wallet",
        desc: "Connect your MetaMask or any Web3 wallet to BSC network. Make sure you have BNB for investment.",
        i18nTitle: "connectWalletStep",
        i18nDesc: "connectWalletDesc"
    },
    {
        number: 2,
        title: "Choose Investment Plan",
        desc: "Select your investment duration from 7 to 30 days. Longer plans offer higher total ROI (119% to 239%).",
        i18nTitle: "chooseInvestmentStep",
        i18nDesc: "chooseInvestmentDesc"
    },
    {
        number: 3,
        title: "Make Your Deposit",
        desc: "Enter amount (min 0.01 BNB) and click INVEST. Your earnings start accumulating immediately per second.",
        i18nTitle: "makeDepositStep",
        i18nDesc: "makeDepositDesc"
    },
    {
        number: 4,
        title: "Earn Daily Returns",
        desc: "Your investment generates returns every second. Watch your balance grow in real-time on the dashboard.",
        i18nTitle: "earnReturnsStep",
        i18nDesc: "earnReturnsDesc"
    },
    {
        number: 5,
        title: "Withdraw Anytime",
        desc: "Click WITHDRAW to claim your earnings. 1 hour cooldown between withdrawals for security.",
        i18nTitle: "withdrawAnytimeStep",
        i18nDesc: "withdrawAnytimeDesc"
    },
    {
        number: 6,
        title: "Earn Referral Bonuses",
        desc: "Share your referral link and earn 5% from direct referrals + bonuses from 5 levels deep.",
        i18nTitle: "earnReferralStep",
        i18nDesc: "earnReferralDesc"
    },
];

export default function HowItWorks() {
    return (
        <section className="section" id="howitworks">
            <h2 className="section-title" data-i18n="howItWorks">How It Works</h2>
            <div className="section-card">
                <div className="steps-container">
                    {steps.map((step) => (
                        <div key={step.number} className="step-card">
                            <div className="step-number">{step.number}</div>
                            <div className="step-content">
                                <h3 data-i18n={step.i18nTitle}>{step.title}</h3>
                                <p data-i18n={step.i18nDesc}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
