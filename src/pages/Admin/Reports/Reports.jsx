import { useState } from "react";
import "./Reports.css";

function Reports() {
  const [reportType, setReportType] = useState("Donations Report");
  const [dateFrom, setDateFrom] = useState("2025-05-12");
  const [dateTo, setDateTo] = useState("2025-05-18");
  const [generated, setGenerated] = useState(false);

  const reportData = {
    totalDonations: 250,
    totalQuantity: "1,850 kg",
    beneficiaries: 1120,
    co2Saved: "540 kg",
    summary: [
      { label: "Collected", value: 198, color: "#27ae60" },
      { label: "Pending", value: 32, color: "#f39c12" },
      { label: "Expired", value: 20, color: "#e74c3c" },
    ],
  };

  return (
    <div className="reports">

      <div className="rp-header">
        <div>
          <h1 className="rp-title">Reports</h1>
          <p className="rp-sub">Dashboard / Reports</p>
        </div>
      </div>

      {/* Report Config */}
      <div className="rp-config-card">
        <h2 className="rp-card-title">Generate Report</h2>
        <div className="rp-config-grid">
          <div className="rp-field">
            <label className="rp-label">Report Type</label>
            <select className="rp-input" value={reportType} onChange={(e) => setReportType(e.target.value)}>
              <option>Donations Report</option>
              <option>Food Waste Report</option>
              <option>Users Report</option>
              <option>Impact Report</option>
            </select>
          </div>
          <div className="rp-field">
            <label className="rp-label">Date Range</label>
            <div className="rp-date-range">
              <input className="rp-input" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
              <span className="rp-date-sep">→</span>
              <input className="rp-input" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>
          </div>
        </div>
        <button className="rp-generate-btn" onClick={() => setGenerated(true)}>
          Generate Report
        </button>
      </div>

      {/* Generated Report */}
      {generated && (
        <div className="rp-result-card">
          <div className="rp-result-header">
            <div>
              <h2 className="rp-result-title">{reportType}</h2>
              <p className="rp-result-dates">{dateFrom} – {dateTo}</p>
            </div>
            <div className="rp-export-btns">
              <button className="rp-export-btn">
                📄 Download PDF
              </button>
              <button className="rp-export-btn">
                📊 Download Excel
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="rp-stats">
            <div className="rp-stat">
              <div className="rp-stat-num">{reportData.totalDonations}</div>
              <div className="rp-stat-lbl">Total Donations</div>
            </div>
            <div className="rp-stat">
              <div className="rp-stat-num">{reportData.totalQuantity}</div>
              <div className="rp-stat-lbl">Total Quantity</div>
            </div>
            <div className="rp-stat">
              <div className="rp-stat-num">{reportData.beneficiaries.toLocaleString()}</div>
              <div className="rp-stat-lbl">Beneficiaries</div>
            </div>
            <div className="rp-stat">
              <div className="rp-stat-num">{reportData.co2Saved}</div>
              <div className="rp-stat-lbl">CO₂ Saved</div>
            </div>
          </div>

          {/* Summary */}
          <div className="rp-summary">
            <h3 className="rp-summary-title">Report Summary</h3>
            <div className="rp-summary-bars">
              {reportData.summary.map((item) => (
                <div key={item.label} className="rp-summary-row">
                  <span className="rp-summary-label">{item.label}</span>
                  <div className="rp-bar-wrapper">
                    <div
                      className="rp-bar"
                      style={{
                        width: `${(item.value / reportData.totalDonations) * 100}%`,
                        background: item.color,
                      }}
                    />
                  </div>
                  <span className="rp-summary-val">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Reports;