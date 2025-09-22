import { FaShieldAlt, FaCertificate, FaClock, FaCode } from "react-icons/fa";

export default function SecurityAudit() {
    const audits = [
        {
            name: "HazeCrypto",
            status: "Audit completed",
            icon: <FaCertificate color="white" />,
            bgColor: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
            borderColor: "var(--primary)",
            link: "https://hazecrypto.net/audit/BNBCapitalv7",
            linkText: "View",
        },
        {
            name: "CertiK",
            status: "Coming Soon",
            icon: <FaClock color="white" />,
            bgColor: "#666",
            borderColor: "rgba(255, 255, 255, 0.03)",
            opacity: 0.6,
            linkText: "Soon",
        },
        {
            name: "BSCScan",
            status: "Code verified",
            icon: <FaCode color="white" />,
            bgColor: "#f0b90b",
            borderColor: "#f0b90b",
            link: "https://bscscan.com/address/0x8447592F16b45c7E84cC301f82Dc516A1bD645cA#code",
            linkText: "View",
        },
    ];

    return (
        <section className="section" id="security">
            <h2 className="section-title" style={{ textAlign: "center", marginBottom: "20px" }}>
                <FaShieldAlt color="var(--primary)" /> Security & Audits
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
                {audits.map((audit, idx) => (
                    <div
                        key={idx}
                        style={{
                            background: audit.bgColor,
                            border: `2px solid ${audit.borderColor}`,
                            borderRadius: "12px",
                            padding: "16px",
                            opacity: audit.opacity ?? 1,
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <div
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        background: audit.bgColor,
                                        borderRadius: "50%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    {audit.icon}
                                </div>
                                <div>
                                    <div style={{ fontSize: "14px", fontWeight: 700, color: audit.borderColor }}>
                                        {audit.name}
                                    </div>
                                    <div style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{audit.status}</div>
                                </div>
                            </div>
                            {audit.link ? (
                                <a
                                    href={audit.link}
                                    target="_blank"
                                    style={{
                                        background: audit.borderColor,
                                        color: "black",
                                        borderRadius: "20px",
                                        padding: "8px 16px",
                                        textDecoration: "none",
                                        fontSize: "11px",
                                        fontWeight: 700,
                                    }}
                                >
                                    {audit.linkText}
                                </a>
                            ) : (
                                <div
                                    style={{
                                        background: "rgba(255, 255, 255, 0.1)",
                                        color: "#999",
                                        borderRadius: "20px",
                                        padding: "8px 16px",
                                        fontSize: "11px",
                                        fontWeight: 700,
                                    }}
                                >
                                    {audit.linkText}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
