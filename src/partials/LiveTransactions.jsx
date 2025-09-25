import { FaHistory } from "react-icons/fa"

export default function LiveTransactions() {
    return (
        <section className="section" id="lastDeposits" style={{ marginTop: '24px' }}>
            <h2 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaHistory style={{ color: 'var(--primary)' }} />
                <span>Recent Deposits</span>
                <span
                    style={{
                        background: 'var(--primary)',
                        color: 'black',
                        fontSize: '10px',
                        padding: '2px 8px',
                        borderRadius: '12px',
                        fontWeight: 600,
                        marginLeft: 'auto',
                    }}>
                    LIVE
                </span>
            </h2>
            <div className="section-card">
                <div id="lastDepositsContainer">
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <table style={{ width: '100%', fontSize: '13px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border)' }}>
                            <th
                                style={{
                                textAlign: 'left',
                                padding: '10px',
                                color: 'var(--text-secondary)',
                                }}
                            >
                                Investor
                            </th>
                            <th
                                style={{
                                textAlign: 'right',
                                padding: '10px',
                                color: 'var(--text-secondary)',
                                }}
                            >
                                Amount
                            </th>
                            <th
                                style={{
                                textAlign: 'right',
                                padding: '10px',
                                color: 'var(--text-secondary)',
                                }}
                            >
                                USD Value
                            </th>
                            <th
                                style={{
                                textAlign: 'right',
                                padding: '10px',
                                color: 'var(--text-secondary)',
                                }}
                            >
                                Time
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                style={{
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                    animation: 'highlightNew 2s ease',
                                }}
                            >
                            <td style={{ padding: '12px 10px' }}>
                                <a
                                    href="https://bscscan.com/address/0xe28b4352a9f1d87061165121c425cf2bf1e88008"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{ color: 'var(--primary)', textDecoration: 'none' }}
                                >
                                0xe28b...8008
                                </a>
                            </td>
                            <td
                                style={{
                                    padding: '12px 10px',
                                    textAlign: 'right',
                                    color: 'var(--primary)',
                                    fontWeight: 600,
                                }}
                            >
                                0.5000 BNB
                            </td>
                            <td
                                style={{
                                    padding: '12px 10px',
                                    textAlign: 'right',
                                    color: 'var(--text-secondary)',
                                }}
                            >
                                $499.14
                            </td>
                            <td
                                style={{
                                    padding: '12px 10px',
                                    textAlign: 'right',
                                    color: 'var(--text-secondary)',
                                    fontSize: '12px',
                                }}
                            >
                                2m ago
                            </td>
                            </tr>
                            <tr
                            style={{
                                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            }}
                            >
                            <td style={{ padding: '12px 10px' }}>
                                <a
                                href="https://bscscan.com/address/0x892add7ba1cd172f08de1c2aec6b3d5bfea464f1"
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: 'var(--primary)', textDecoration: 'none' }}
                                >
                                0x892a...64f1
                                </a>
                            </td>
                            <td
                                style={{
                                padding: '12px 10px',
                                textAlign: 'right',
                                color: 'var(--primary)',
                                fontWeight: 600,
                                }}
                            >
                                0.0100 BNB
                            </td>
                            <td
                                style={{
                                padding: '12px 10px',
                                textAlign: 'right',
                                color: 'var(--text-secondary)',
                                }}
                            >
                                $9.98
                            </td>
                            <td
                                style={{
                                padding: '12px 10px',
                                textAlign: 'right',
                                color: 'var(--text-secondary)',
                                fontSize: '12px',
                                }}
                            >
                                2m ago
                            </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <style>{`
                    @keyframes highlightNew {
                    0% { background: rgba(0, 255, 136, 0.2); }
                    100% { background: transparent; }
                    }
                `}</style>
                </div>
            </div>
        </section>
    );
}
