import { useState } from "react"
import { FaHandHoldingUsd } from "react-icons/fa"

export default function Dashboard() {
    const [withdrawable, setWithdrawable] = useState(0)
    const [invested, setInvested] = useState(0)
    const [withdrawn, setWithdrawn] = useState(0)
    const [referralReward, setReferralReward] = useState(0)

    const handleWithdraw = () => {
        alert("Withdraw action!")
    };

    return (
        <div className="dashboard-mobile" id="dashboard">
            <h2 className="section-title">Dashboard</h2>
            <div className="dashboard-card">
                <div className="dashboard-grid">
                    <div className="dashboard-item">
                        <div className="dashboard-value">{withdrawable}</div>
                        <div className="dashboard-label">Withdrawable</div>
                    </div>
                    <div className="dashboard-item">
                        <div className="dashboard-value">{invested}</div>
                        <div className="dashboard-label">Total Investment</div>
                    </div>
                    <div className="dashboard-item">
                        <div className="dashboard-value">{withdrawn}</div>
                        <div className="dashboard-label">Total Withdrawal</div>
                    </div>
                    <div className="dashboard-item">
                        <div className="dashboard-value">{referralReward}</div>
                        <div className="dashboard-label">Total Referral Reward</div>
                    </div>
                </div>

                <button className="btn-primary" onClick={handleWithdraw}>
                    <FaHandHoldingUsd /> WITHDRAW
                </button>
            </div>
        </div>
    );
}
