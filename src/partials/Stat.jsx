export default function StatsGrid({ stats = {} }) {
    const {
        totalUsers = 0,
        totalInvested = 0,
        totalWithdrawn = 0,
        totalReferral = 0
    } = stats;

    return (
        <div className="stats-grid">
            <div className="stat-card">
                <div className="stat-value" id="totalUsersDisplay">{totalUsers}</div>
                <div className="stat-label" data-i18n="totalUsers">Total Users</div>
            </div>
            <div className="stat-card">
                <div className="stat-value" id="totalInvestedDisplay">{totalInvested}</div>
                <div className="stat-label" data-i18n="totalInvested">Total Invested</div>
            </div>
            <div className="stat-card">
                <div className="stat-value" id="totalWithdrawnDisplay">{totalWithdrawn}</div>
                <div className="stat-label" data-i18n="totalWithdrawn">Total Withdrawn</div>
            </div>
            <div className="stat-card">
                <div className="stat-value" id="totalReferralDisplay">{totalReferral}</div>
                <div className="stat-label" data-i18n="referralRewards">Referral Rewards</div>
            </div>
        </div>
    );
}
