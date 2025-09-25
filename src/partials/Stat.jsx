import { useTotUser, useTotRefPaid, useTotWithdraw, useTotInvested } from '../hooks/contract'
import { formatEther } from 'viem'

export default function StatsGrid({ stats = {} }) {
  const { data: totalUsersData, isLoading: isLoadingUsers, error: errorUsers } = useTotUser()
  const { data: totalReferralData, isLoading: isLoadingRef, error: errorRef } = useTotRefPaid()
  const { data: totalWithdrawnData, isLoading: isLoadingWithdraw, error: errorWithdraw } = useTotWithdraw()
  const { data: totalInvestedData, isLoading: isLoadingInvest, error: errorInvest } = useTotInvested()

  if (isLoadingUsers || isLoadingRef || isLoadingWithdraw || isLoadingInvest) {
    return <div>Loading...</div>
  }
  if (errorUsers || errorRef || errorWithdraw || errorInvest) {
    return <div>Error loading stats</div>
  }

  const totalUsers = totalUsersData ?? stats.totalUsers ?? 0
  const totalReferral = totalReferralData ?? stats.totalReferral ?? 0

  const totalWithdrawn = totalWithdrawnData
    ? parseFloat(formatEther(totalWithdrawnData)).toFixed(8)
    : parseFloat(stats.totalWithdrawn ?? 0).toFixed(8)

  const totalInvestedValue = totalInvestedData
    ? parseFloat(formatEther(totalInvestedData)).toFixed(8)
    : parseFloat(stats.totalInvested ?? 0).toFixed(8)

  return (
    <div className="stats-grid grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="stat-card bg-card border border-border rounded-xl p-4 text-center">
        <div className="stat-value text-xl font-bold">{totalUsers}</div>
        <div className="stat-label text-sm text-muted-foreground">Total Users</div>
      </div>
      <div className="stat-card bg-card border border-border rounded-xl p-4 text-center">
        <div className="stat-value text-xl font-bold">{totalInvestedValue} BNB</div>
        <div className="stat-label text-sm text-muted-foreground">Total Invested</div>
      </div>
      <div className="stat-card bg-card border border-border rounded-xl p-4 text-center">
        <div className="stat-value text-xl font-bold">{totalWithdrawn} BNB</div>
        <div className="stat-label text-sm text-muted-foreground">Total Withdrawn</div>
      </div>
      <div className="stat-card bg-card border border-border rounded-xl p-4 text-center">
        <div className="stat-value text-xl font-bold">{totalReferral}</div>
        <div className="stat-label text-sm text-muted-foreground">Referral Rewards</div>
      </div>
    </div>
  )
}
