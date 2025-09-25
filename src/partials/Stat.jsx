import { useTotalWithdrawn } from '../hooks/useBnbCapital'

export default function StatsGrid({ stats = {} }) {
    // ambil data dari hook
    const { data: totalWithdrawnData, isLoading, error } = useTotalWithdrawn()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    // ambil data dari props stats
    const {
        totalUsers = 0,
        totalInvested = 0,
        totalWithdrawn: statsTotalWithdrawn = '0',
        totalReferral = 0
    } = stats

    // tentukan sumber totalWithdrawn (hook > stats)
    const totalWithdrawn = totalWithdrawnData ? totalWithdrawnData.toString(): statsTotalWithdrawn

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
