export default function MediaCoverage() {
    return (
        <section className="section" id="media">
            <h2 className="section-title">
                <i className="fas fa-newspaper" style={{ color: "var(--primary)" }}></i> Featured In
            </h2>
            <div
                className="section-card"
                style={{
                    background:
                        "linear-gradient(135deg, rgba(0, 255, 136, 0.05) 0%, rgba(0, 204, 102, 0.05) 100%)",
                }}
            >
                <p
                    style={{
                        textAlign: "center",
                        color: "var(--text-secondary)",
                        marginBottom: "24px",
                        fontSize: "14px",
                    }}
                >
                    BNBCapital has been featured in leading crypto news outlets worldwide
                </p>

                {/* Media Grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                        gap: "12px",
                    }}
                >
                    {/* CoinWorldStory */}
                    <a
                        href="https://coinworldstory.com/from-mlm-to-defi-how-bnbcapitals-protocol-revolutionizes-network-marketing/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="media-item"
                        style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            border: "1px solid var(--border)",
                            borderRadius: "10px",
                            padding: "16px",
                            textAlign: "center",
                            textDecoration: "none",
                            color: "var(--text-primary)",
                            transition: "all 0.3s",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            minHeight: "80px",
                        }}
                    >
                        <div
                            style={{
                                fontSize: "14px",
                                fontWeight: 600,
                                color: "var(--primary)",
                            }}
                        >
                            CoinWorldStory
                        </div>
                        <div
                            style={{
                                fontSize: "10px",
                                color: "var(--text-secondary)",
                                marginTop: "4px",
                            }}
                        >
                            Read Article →
                        </div>
                    </a>

                    {/* ...lanjut semua item media lain sama persis */}
                </div>

                {/* Media Stats */}
                <div
                    style={{
                        marginTop: "24px",
                        paddingTop: "20px",
                        borderTop: "1px solid var(--border)",
                        textAlign: "center",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            flexWrap: "wrap",
                            gap: "16px",
                        }}
                    >
                        <div>
                            <div
                                style={{
                                    fontSize: "24px",
                                    fontWeight: 700,
                                    color: "var(--primary)",
                                }}
                            >
                                18+
                            </div>
                            <div
                                style={{
                                    fontSize: "11px",
                                    color: "var(--text-secondary)",
                                    textTransform: "uppercase",
                                }}
                            >
                                Media Partners
                            </div>
                        </div>
                        <div>
                            <div
                                style={{
                                    fontSize: "24px",
                                    fontWeight: 700,
                                    color: "var(--primary)",
                                }}
                            >
                                50M+
                            </div>
                            <div
                                style={{
                                    fontSize: "11px",
                                    color: "var(--text-secondary)",
                                    textTransform: "uppercase",
                                }}
                            >
                                Readers Reached
                            </div>
                        </div>
                        <div>
                            <div
                                style={{
                                    fontSize: "24px",
                                    fontWeight: 700,
                                    color: "var(--primary)",
                                }}
                            >
                                Global
                            </div>
                            <div
                                style={{
                                    fontSize: "11px",
                                    color: "var(--text-secondary)",
                                    textTransform: "uppercase",
                                }}
                            >
                                Coverage
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .media-item:hover {
                    background: rgba(0, 255, 136, 0.1) !important;
                    border-color: var(--primary) !important;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 255, 136, 0.2);
                }
                
                @media (max-width: 480px) {
                    .media-item {
                        font-size: 12px !important;
                    }
                }
            `}</style>
        </section>
    );
}
