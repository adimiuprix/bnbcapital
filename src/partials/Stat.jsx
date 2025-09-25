import { Statistics } from '../hooks/contract'
import { formatEther } from 'viem'

export default function StatsGrid({ stats = {} }) {
  // ambil data dari hook
  const { data: totalWithdrawnData, isLoading, error } = Statistics()

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
    const totalWithdrawn = totalWithdrawnData
  ? parseFloat(formatEther(totalWithdrawnData)).toFixed(8)
  : parseFloat(statsTotalWithdrawn).toFixed(8)

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
                <div className="stat-value">{totalWithdrawn}</div>
                <div className="stat-label">Total Withdrawn</div>
            </div>
            <div className="stat-card">
                <div className="stat-value">{totalReferral}</div>
                <div className="stat-label">Referral Rewards</div>
            </div>
        </div>
    );
}
