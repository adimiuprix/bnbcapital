import { useTvl } from "../hooks/contract"
import { formatEther } from "viem"

export default function ContractInfo() {
  const { data } = useTvl()

  // kalau data masih undefined/null → fallback kosong
  const contractInfo = data
    ? {
        invested: data[0],
        withdrawn: data[1],
        referralPaid: data[2],
        userCount: data[3],
        balance: data[4],
        feesPaid: data[5],
      }
    : {}

  return (
    <div className="tvl-card">
      <div className="tvl-label">Total Value Locked</div>
      <div className="tvl-value">
        {contractInfo.balance
          ? `${parseFloat(formatEther(contractInfo.balance)).toFixed(4)} BNB`
          : "0 BNB"}
      </div>
      <div className="tvl-usd">547546</div>
    </div>
  )
}
