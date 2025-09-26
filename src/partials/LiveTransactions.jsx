import { FaHistory } from "react-icons/fa"
import { formatEther } from "viem"
import { useState } from "react"
import { useWatchContractEvent } from "wagmi"
import ContractABI from "../constant/BnbCapital.json"

const contractAddress = "0x8447592F16b45c7E84cC301f82Dc516A1bD645cA"

export default function LiveTransactions() {
  const [events, setEvents] = useState([])

  useWatchContractEvent({
    address: contractAddress,
    abi: ContractABI.abi,
    eventName: "DepositFinished",
    onLogs(logs) {
      console.log("📥 New Deposit:", logs)
      const parsed = logs.map((log) => ({
        investor: log.args?.user ?? null,
        slot: log.args?.slot ?? null,
        amount: log.args?.amount ?? 0n,
        timestamp: Date.now(),
      }))
      setEvents((prev) => [...parsed, ...prev])
    },
  })

  return (
    <section className="section" id="lastDeposits" style={{ marginTop: "24px" }}>
      <h2 className="section-title" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <FaHistory style={{ color: "var(--primary)" }} />
        <span>Recent Deposits</span>
        <span
          style={{
            background: "var(--primary)",
            color: "black",
            fontSize: "10px",
            padding: "2px 8px",
            borderRadius: "12px",
            fontWeight: 600,
            marginLeft: "auto",
          }}
        >
          LIVE
        </span>
      </h2>

      <div className="section-card">
        <div id="lastDepositsContainer">
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <table style={{ width: "100%", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)" }}>
                  <th style={{ textAlign: "left", padding: "10px", color: "var(--text-secondary)" }}>Investor</th>
                  <th style={{ textAlign: "right", padding: "10px", color: "var(--text-secondary)" }}>Amount</th>
                  <th style={{ textAlign: "right", padding: "10px", color: "var(--text-secondary)" }}>USD Value</th>
                  <th style={{ textAlign: "right", padding: "10px", color: "var(--text-secondary)" }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {events.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ padding: "12px 10px", textAlign: "center", color: "var(--text-secondary)" }}>
                      No deposits yet
                    </td>
                  </tr>
                )}

                {events.map((ev, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                      animation: "highlightNew 2s ease-out",
                    }}
                  >
                    <td style={{ padding: "12px 10px" }}>
                      {ev.investor ? (
                        <a
                          href={`https://bscscan.com/address/${ev.investor}`}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "var(--primary)", textDecoration: "none" }}
                        >
                          {ev.investor.slice(0, 6)}...{ev.investor.slice(-4)}
                        </a>
                      ) : (
                        "Unknown"
                      )}
                    </td>
                    <td style={{ padding: "12px 10px", textAlign: "right", color: "var(--primary)", fontWeight: 600 }}>
                      {ev.amount ? `${formatEther(ev.amount)} BNB` : "0 BNB"}
                    </td>
                    <td style={{ padding: "12px 10px", textAlign: "right", color: "var(--text-secondary)" }}>
                      {ev.amount ? `$${(Number(formatEther(ev.amount)) * 350).toFixed(2)}` : "$0.00"}
                    </td>
                    <td style={{ padding: "12px 10px", textAlign: "right", color: "var(--text-secondary)", fontSize: "12px" }}>
                      {ev.timestamp ? new Date(ev.timestamp).toLocaleTimeString() : "-"}
                    </td>
                  </tr>
                ))}
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
  )
}
