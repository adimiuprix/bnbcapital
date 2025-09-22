import { FaShieldAlt, FaLock, FaCertificate } from "react-icons/fa";

export default function Features() {
    const features = [
        {
            icon: <FaShieldAlt size={24} />,
            title: "100% Immutable",
            desc: "Smart contract cannot be modified or paused. It runs autonomously forever on the blockchain.",
        },
        {
            icon: <FaLock size={24} />,
            title: "No Owner Control",
            desc: "Fully decentralized with no admin functions. Nobody can change the rules or stop the contract.",
        },
        {
            icon: <FaCertificate size={24} />,
            title: "BSCScan Verified",
            desc: "Contract source code is verified and transparent. Anyone can audit the code on BSCScan.",
        },
    ];

    return (
        <section className="section" id="features">
            <h2 className="section-title">Why Choose BNBCapital?</h2>
            <div className="section-card">
                <div className="features-grid">
                    {features.map((feature, idx) => (
                        <div className="feature-card" key={idx}>
                            <div className="feature-icon">{feature.icon}</div>
                            <div className="feature-content">
                                <h3>{feature.title}</h3>
                                <p>{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
