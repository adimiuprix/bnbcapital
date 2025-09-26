import { useState } from "react";
import { FaMinus, FaPlus, FaRocket, FaUserFriends } from "react-icons/fa";

export default function Calculator() {
  const [days, setDays] = useState(18);
  const [amount, setAmount] = useState(1);
  const minAmount = 0.01;
  const balance = "--"; // bisa diisi dari API user

  // Hitung profit langsung (clean version)
  const totalROI = days === 30 ? 234 : 119 + (days - 7) * 5;
  const dailyROI = (totalROI / days).toFixed(1);
  const earnings = (amount * totalROI / 100).toFixed(3);

  const incrementAmount = () => setAmount((prev) => prev + 0.01);
  const decrementAmount = () =>
    setAmount((prev) => Math.max(prev - 0.01, minAmount));
  const setMaxAmount = () => setAmount(100);

  return (
    <div className="calculator-mobile" id="calculator">
      <h2 className="section-title">Calculate Profit</h2>

      <div className="calc-card">
        <div className="input-group">
          <label className="input-label">Deposit Period (days):</label>
          <input
            type="range"
            className="slider"
            min={7}
            max={30}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
          />
          <div className="days-display">{days} days</div>
        </div>

        <div className="input-group">
          <label className="input-label">Deposit Amount:</label>
          <div className="input-controls">
            <input
              type="number"
              className="input-field"
              placeholder="Enter BNB amount"
              value={amount}
              step={0.01}
              min={minAmount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <div className="input-buttons">
              <button className="input-btn" onClick={decrementAmount}>
                <FaMinus />
              </button>
              <button className="input-btn" onClick={incrementAmount}>
                <FaPlus />
              </button>
              <button className="input-btn max-btn" onClick={setMaxAmount}>
                MAX
              </button>
            </div>
          </div>
          <div className="input-helper">
            <span>Min: {minAmount} BNB</span>
            <span className="balance-info">Balance: {balance}</span>
          </div>
        </div>

        <div className="profit-display">
          <div className="profit-grid">
            <div className="profit-item">
              <div className="profit-label">Daily ROI</div>
              <div className="profit-value">{dailyROI}%</div>
            </div>
            <div className="profit-item">
              <div className="profit-label">Total Profit</div>
              <div className="profit-value">{totalROI}%</div>
            </div>
            <div className="profit-item">
              <div className="profit-label">You'll Earn</div>
              <div className="profit-value">{earnings} BNB</div>
            </div>
          </div>
        </div>

        {/* Referrer Debug Display */}
        <div
          style={{
            display: "none",
            background: "rgba(0, 255, 136, 0.1)",
            border: "1px solid rgba(0, 255, 136, 0.3)",
            borderRadius: "10px",
            padding: "12px",
            marginTop: "16px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "var(--text-secondary)",
              marginBottom: "6px",
            }}
          >
            <FaUserFriends /> REFERRER DETECTED
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "12px",
              color: "var(--primary)",
              wordBreak: "break-all",
            }}
          >
            {/* Referrer address */}
          </div>
          <div
            style={{
              fontSize: "10px",
              color: "var(--text-secondary)",
              marginTop: "6px",
            }}
          >
            Your referrer will receive 5% commission from your investment
          </div>
        </div>

        <button className="btn-primary" onClick={() => alert("Invest action!")}>
          <FaRocket /> INVEST NOW
        </button>
      </div>
    </div>
  );
}
