export default function TvlCard({ tvlBNB = "0.00 BNB", tvlUSD = "≈ $0.00 USD" }) {
    return (
        <div className="tvl-card">
            <div className="tvl-label" data-i18n="tvlLabel">
                Total Value Locked
            </div>
            <div className="tvl-value" id="tvlDisplay">
                {tvlBNB}
            </div>
            <div className="tvl-usd" id="tvlUsd">
                {tvlUSD}
            </div>
        </div>
    );
}
