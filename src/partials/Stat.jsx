import { useReadContract } from 'wagmi'
import { formatEther } from 'viem'
import ContractABI from '../constant/BnbCapital.json'

export default function StatsGrid() {
  const contractAddress = '0x8447592F16b45c7E84cC301f82Dc516A1bD645cA'

  const { data } = useReadContract({
    address: contractAddress,
    abi: ContractABI.abi,
    functionName: 'contractInfo',
  })

  const invested = data?.[0] ? parseFloat(formatEther(data[0])).toFixed(4) : '0.0000'
  const withdrawn = data?.[1] ? parseFloat(formatEther(data[1])).toFixed(4) : '0.0000'
  const referralPaid = data?.[2] ? parseFloat(formatEther(data[2])).toFixed(4) : '0.0000'
  const userCount = data?.[3] ? Number(data[3]) : 0

  return (
    <div className="stats-grid grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="stat-card bg-card border border-border rounded-xl p-4 text-center">
        <div className="stat-value text-xl font-bold">{userCount}</div>
        <div className="stat-label text-sm text-muted-foreground">Total Users</div>
      </div>
      <div className="stat-card bg-card border border-border rounded-xl p-4 text-center">
        <div className="stat-value text-xl font-bold">{invested} BNB</div>
        <div className="stat-label text-sm text-muted-foreground">Total Invested</div>
      </div>
      <div className="stat-card bg-card border border-border rounded-xl p-4 text-center">
        <div className="stat-value text-xl font-bold">{withdrawn} BNB</div>
        <div className="stat-label text-sm text-muted-foreground">Total Withdrawn</div>
      </div>
      <div className="stat-card bg-card border border-border rounded-xl p-4 text-center">
        <div className="stat-value text-xl font-bold">{referralPaid} BNB</div>
        <div className="stat-label text-sm text-muted-foreground">Referral Rewards</div>
      </div>
    </div>
  )
}
