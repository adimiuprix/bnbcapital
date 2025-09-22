export default function Investment() {
    const plans = [
        { days: 7, totalROI: 119, daily: 17, oneBNB: 1.19 },
        { days: 10, totalROI: 134, daily: 13.4, oneBNB: 1.34 },
        { days: 15, totalROI: 159, daily: 10.6, oneBNB: 1.59 },
        { days: 20, totalROI: 184, daily: 9.2, oneBNB: 1.84 },
        { days: 25, totalROI: 209, daily: 8.36, oneBNB: 2.09 },
        { days: 30, totalROI: 234, daily: 7.8, oneBNB: 2.34 },
    ];

    return (
        <section id="plans" className="section">
            <h2 className="section-title">Investment Plans & Returns</h2>
            <div className="section-card">
                <div className="plans-table">
                    <div className="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>Duration</th>
                                    <th>Total ROI</th>
                                    <th>Daily</th>
                                    <th>1 BNB</th>
                                </tr>
                            </thead>
                            <tbody>
                                {plans.map((plan) => (
                                    <tr key={plan.days}>
                                        <td>{plan.days} days</td>
                                        <td style={{ color: "#00ff88" }}>{plan.totalROI}%</td>
                                        <td>{plan.daily}%</td>
                                        <td style={{ color: "#00ffaa" }}>{plan.oneBNB} BNB</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
}
