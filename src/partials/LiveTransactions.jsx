import { FaChartLine, FaArrowDown, FaArrowUp } from "react-icons/fa";

const liveActivities = [
    {
        type: "deposit",
        color: "#00ff88",
        label: "New Deposit",
        amount: "1.25 BNB",
        address: "0x5d1a...8b3c",
        time: "18 mins ago",
    },
    {
        type: "withdraw",
        color: "#ffa500",
        label: "Withdraw",
        amount: "3.75 BNB",
        address: "0x8e2f...4d5a",
        time: "25 mins ago",
    },
];

export default function LiveTransactions() {
    return (
        <section className="section" style={{ paddingTop: 0 }}>
            <h2 className="section-title">
                <FaChartLine style={{ color: "var(--primary)" }} /> Live Activity
            </h2>
            <div
                className="section-card"
                style={{
                    background: "linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(0, 204, 102, 0.05) 100%)",
                }}
            >
                <div id="live-activity-feed" style={{ maxHeight: "400px", overflowY: "auto" }}>
                    {liveActivities.map((activity, index) => (
                        <div
                            key={index}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "12px",
                                borderBottom: index === 0 ? "1px solid var(--border)" : "none",
                                gap: "12px",
                                animation: `fadeIn 0.5s ${0.6 + index * 0.2}s both`,
                            }}
                        >
                            <div style={{ fontSize: "20px" }}>
                                {activity.type === "deposit" ? (
                                    <FaArrowDown style={{ color: activity.color }} />
                                ) : (
                                    <FaArrowUp style={{ color: activity.color }} />
                                )}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: "4px",
                                    }}
                                >
                                    <span style={{ fontWeight: 600, color: activity.color }}>{activity.label}</span>
                                    <span style={{ color: "var(--primary)", fontWeight: 600 }}>{activity.amount}</span>
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "11px",
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    <span>{activity.address}</span>
                                    <span>{activity.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <style>{`
                        @keyframes fadeIn {
                            from { opacity: 0; transform: translateY(10px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                    `}</style>
                </div>
            </div>
        </section>
    );
}
