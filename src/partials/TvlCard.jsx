import { useTvl } from "../hooks/contract"
import { formatEther } from "viem"

export default function ContractInfo() {
    const { data, isLoading, error } = useTvl()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    if (!data) return <div>No data</div>

    // mapping array ke object
    const contractInfo = {
        invested: data[0],
        withdrawn: data[1],
        referralPaid: data[2],
        userCount: data[3],
        balance: data[4],
        feesPaid: data[5],
    }

    return (
        <div className="tvl-card">
            <div className="tvl-label">
                Total Value Locked
            </div>
            <div className="tvl-value">
                {parseFloat(formatEther(contractInfo.balance)).toFixed(4)} BNB
            </div>
            <div className="tvl-usd">
                547546
            </div>
        </div>
    );
}
