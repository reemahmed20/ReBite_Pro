import { useState } from "react";
import "./RegistrationRequests.css";

const initialRequests = [
  {
    id: 1,
    name: "Green Shelter",
    type: "Charity",
    email: "greenshelter@example.com",
    phone: "+92 311 9876543",
    address: "45 Park Avenue, Lahore, Pakistan",
    submitted: "May 16, 2025",
    status: "pending",
    about: "Green Shelter is working for homeless and needy people. We collect and distribute food to reduce hunger and food waste.",
  },
  {
    id: 2,
    name: "Helping Hands",
    type: "NGO",
    email: "helpinghands@example.com",
    phone: "+92 300 1234567",
    address: "12 Main Blvd, Karachi, Pakistan",
    submitted: "May 15, 2025",
    status: "pending",
    about: "Helping Hands NGO provides food and shelter to underprivileged communities across Pakistan.",
  },
  {
    id: 3,
    name: "Care Foundation",
    type: "Charity",
    email: "carefoundation@example.com",
    phone: "+92 321 9876543",
    address: "78 Blue Street, Islamabad, Pakistan",
    submitted: "May 14, 2025",
    status: "pending",
    about: "Care Foundation focuses on food security and nutrition for children in need.",
  },
  {
    id: 4,
    name: "FoodAid",
    type: "Organization",
    email: "foodaid@example.com",
    phone: "+92 333 1234567",
    address: "34 Green Ave, Rawalpindi, Pakistan",
    submitted: "May 13, 2025",
    status: "approved",
    about: "FoodAid is a registered organization dedicated to reducing food waste.",
  },
  {
    id: 5,
    name: "Hope Hearts",
    type: "NGO",
    email: "hopehearts@example.com",
    phone: "+92 345 9876543",
    address: "56 Red Road, Faisalabad, Pakistan",
    submitted: "May 12, 2025",
    status: "rejected",
    about: "Hope Hearts works with local communities to distribute surplus food.",
  },
];

function RegistrationRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const filtered = requests.filter((r) =>
    activeTab === "all" ? true : r.status === activeTab
  );

  function handleApprove(id) {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: "approved" } : r))
    );
    setSelectedRequest(null);
  }

  function handleReject(id) {
    setRequests(
      requests.map((r) => (r.id === id ? { ...r, status: "rejected" } : r))
    );
    setSelectedRequest(null);
  }

  const tabs = [
    { key: "pending", label: "Pending", count: requests.filter((r) => r.status === "pending").length },
    { key: "approved", label: "Approved", count: requests.filter((r) => r.status === "approved").length },
    { key: "rejected", label: "Rejected", count: requests.filter((r) => r.status === "rejected").length },
  ];

  return (
    <div className="registration-requests">

      {/* Header */}
      <div className="rr-header">
        <div>
          <h1 className="rr-title">Registration Requests</h1>
          <p className="rr-sub">Dashboard / Registration Requests</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="rr-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`rr-tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            <span className={`rr-tab-cnt ${activeTab === tab.key ? "active" : ""}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rr-table-wrapper">
        <div className="rr-table">
          <div className="rr-table-head">
            <span>Name</span>
            <span>Organization Type</span>
            <span>Email</span>
            <span>Submitted On</span>
            <span>Actions</span>
          </div>

          {filtered.length === 0 ? (
            <div className="rr-empty">No requests found</div>
          ) : (
            filtered.map((req) => (
              <div key={req.id} className="rr-table-row">
                <span className="rr-org-name">{req.name}</span>
                <span className="rr-org-type">{req.type}</span>
                <span className="rr-org-email">{req.email}</span>
                <span className="rr-org-date">{req.submitted}</span>
                <span className="rr-actions">
                  <button
                    className="rr-view-btn"
                    onClick={() => setSelectedRequest(req)}
                  >
                    👁 View
                  </button>
                  {req.status === "pending" && (
                    <>
                      <button
                        className="rr-approve-btn"
                        onClick={() => handleApprove(req.id)}
                      >
                        ✓
                      </button>
                      <button
                        className="rr-reject-btn"
                        onClick={() => handleReject(req.id)}
                      >
                        ✕
                      </button>
                    </>
                  )}
                  {req.status === "approved" && (
                    <span className="rr-status approved">Approved</span>
                  )}
                  {req.status === "rejected" && (
                    <span className="rr-status rejected">Rejected</span>
                  )}
                </span>
              </div>
            ))
          )}
        </div>
        <div className="rr-table-footer">
          Showing 1 to {filtered.length} of {filtered.length} requests
        </div>
      </div>

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="rr-overlay" onClick={() => setSelectedRequest(null)}>
          <div className="rr-modal" onClick={(e) => e.stopPropagation()}>
            <div className="rr-modal-header">
              <div>
                <h2 className="rr-modal-title">Request Details</h2>
                <p className="rr-modal-sub">Dashboard / Registration Requests / Request Details</p>
              </div>
            </div>

            <div className="rr-modal-body">
              <div className="rr-modal-left">
                <div className="rr-detail-row">
                  <span className="rr-detail-icon">🏢</span>
                  <div>
                    <div className="rr-detail-label">Organization Name</div>
                    <div className="rr-detail-val">{selectedRequest.name}</div>
                  </div>
                </div>
                <div className="rr-detail-row">
                  <span className="rr-detail-icon">📋</span>
                  <div>
                    <div className="rr-detail-label">Organization Type</div>
                    <div className="rr-detail-val">{selectedRequest.type}</div>
                  </div>
                </div>
                <div className="rr-detail-row">
                  <span className="rr-detail-icon">📧</span>
                  <div>
                    <div className="rr-detail-label">Email</div>
                    <div className="rr-detail-val">{selectedRequest.email}</div>
                  </div>
                </div>
                <div className="rr-detail-row">
                  <span className="rr-detail-icon">📞</span>
                  <div>
                    <div className="rr-detail-label">Phone</div>
                    <div className="rr-detail-val">{selectedRequest.phone}</div>
                  </div>
                </div>
                <div className="rr-detail-row">
                  <span className="rr-detail-icon">📍</span>
                  <div>
                    <div className="rr-detail-label">Address</div>
                    <div className="rr-detail-val">{selectedRequest.address}</div>
                  </div>
                </div>
                <div className="rr-detail-row">
                  <span className="rr-detail-icon">📅</span>
                  <div>
                    <div className="rr-detail-label">Submitted On</div>
                    <div className="rr-detail-val">{selectedRequest.submitted}</div>
                  </div>
                </div>
                <div className="rr-detail-row">
                  <span className="rr-detail-icon">🔖</span>
                  <div>
                    <div className="rr-detail-label">Status</div>
                    <div className={`rr-status ${selectedRequest.status}`}>
                      {selectedRequest.status}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rr-modal-right">
                <div className="rr-about-card">
                  <h3 className="rr-about-title">About Organization</h3>
                  <p className="rr-about-txt">{selectedRequest.about}</p>
                </div>
              </div>
            </div>

            {selectedRequest.status === "pending" && (
              <div className="rr-modal-actions">
                <button
                  className="rr-modal-reject-btn"
                  onClick={() => handleReject(selectedRequest.id)}
                >
                  Reject Request
                </button>
                <button
                  className="rr-modal-approve-btn"
                  onClick={() => handleApprove(selectedRequest.id)}
                >
                  Approve Request
                </button>
              </div>
            )}

            {selectedRequest.status !== "pending" && (
              <div className="rr-modal-actions">
                <button
                  className="rr-modal-close-btn"
                  onClick={() => setSelectedRequest(null)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default RegistrationRequests;