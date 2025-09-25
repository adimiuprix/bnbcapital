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
                <div className="stat-value">{totalUsers}</div>
                <div className="stat-label">Total Users</div>
            </div>
            <div className="stat-card">
                <div className="stat-value">{totalInvested}</div>
                <div className="stat-label">Total Invested</div>
            </div>
            <div className="stat-card">
                <div className="stat-value">{totalWithdrawn.toString()}</div>
                <div className="stat-label">Total Withdrawn</div>
            </div>
            <div className="stat-card">
                <div className="stat-value">{totalReferral}</div>
                <div className="stat-label">Referral Rewards</div>
            </div>
        </div>
    );
}
