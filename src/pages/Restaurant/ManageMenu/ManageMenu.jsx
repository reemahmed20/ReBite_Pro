import { useState } from "react";
import "./ManageMenu.css";
import useListings from "../../../hooks/useListings";

function ManageMenu() {
  const { listings, editListing, deleteListing } = useListings();
  const activeListings = listings.filter((l) => l.status === "active");

  const [editItem, setEditItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    portions: "",
    pickupFrom: "",
    pickupUntil: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});

  function openEditForm(item) {
    setEditItem(item);
    const parts = item.time.split(" – ");
    setForm({
      title: item.title,
      portions: parseInt(item.portions) || "",
      pickupFrom: parts[0] || "",
      pickupUntil: parts[1] || "",
      notes: item.notes || "",
    });
    setErrors({});
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    let newErrors = {};
    if (!form.title) newErrors.title = "Title is required";
    if (!form.portions) newErrors.portions = "Portions is required";
    if (!form.pickupFrom) newErrors.pickupFrom = "Required";
    if (!form.pickupUntil) newErrors.pickupUntil = "Required";
    return newErrors;
  }

  function handleSave(e) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      editListing(editItem.id, {
        title: form.title,
        portions: `${form.portions} portions`,
        time: `${form.pickupFrom} – ${form.pickupUntil}`,
        notes: form.notes,
      });
      setEditItem(null);
    }
  }

  function handleDelete(id) {
    deleteListing(id);
    setDeleteId(null);
  }

  return (
    <div className="manage-menu">
      <div className="mm-header">
        <div>
          <h1 className="mm-title">Manage Active Listings</h1>
          <p className="mm-sub">Edit or remove your active food listings</p>
        </div>
      </div>

      <div className="mm-stats">
        <div className="mm-stat">
          <span className="mm-stat-num">{activeListings.length}</span>
          <span className="mm-stat-lbl">Active Listings</span>
        </div>
        <div className="mm-stat">
          <span className="mm-stat-num" style={{ color: "#27ae60" }}>
            {activeListings.reduce((acc, l) => {
              const num = parseInt(l.portions);
              return acc + (isNaN(num) ? 0 : num);
            }, 0)}
          </span>
          <span className="mm-stat-lbl">Total Portions</span>
        </div>
      </div>

      {activeListings.length === 0 ? (
        <div className="mm-empty">
          <div className="mm-empty-icon">📭</div>
          <div className="mm-empty-title">No active listings</div>
          <div className="mm-empty-sub">Add a listing from the Add Listing page.</div>
        </div>
      ) : (
        <div className="mm-table">
          <div className="mm-table-header">
            <span>Food Title</span>
            <span>Portions</span>
            <span>Pickup Time</span>
            <span>Notes</span>
            <span>Actions</span>
          </div>
          {activeListings.map((item) => (
            <div key={item.id} className="mm-row">
              <span className="mm-item-name">{item.title}</span>
              <span className="mm-portions">{item.portions}</span>
              <span className="mm-time">🕐 {item.time}</span>
              <span className="mm-notes">{item.notes || "—"}</span>
              <span className="mm-actions">
                <button
                  className="mm-edit-btn"
                  onClick={() => openEditForm(item)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="mm-delete-btn"
                  onClick={() => setDeleteId(item.id)}
                >
                  🗑️ Delete
                </button>
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editItem && (
        <div className="mm-overlay" onClick={() => setEditItem(null)}>
          <div className="mm-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="mm-modal-title">Edit Listing</h2>
            <form onSubmit={handleSave} className="mm-form">

              <div className="mm-field">
                <label className="mm-label">Food Title</label>
                <input
                  className="mm-input"
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Grilled Chicken & Rice"
                />
                {errors.title && <p className="mm-error">{errors.title}</p>}
              </div>

              <div className="mm-field">
                <label className="mm-label">Number of Portions</label>
                <input
                  className="mm-input"
                  type="number"
                  name="portions"
                  value={form.portions}
                  onChange={handleChange}
                  min="1"
                  placeholder="e.g. 25"
                />
                {errors.portions && <p className="mm-error">{errors.portions}</p>}
              </div>

              <div className="mm-row-fields">
                <div className="mm-field">
                  <label className="mm-label">Pickup From</label>
                  <input
                    className="mm-input"
                    type="time"
                    name="pickupFrom"
                    value={form.pickupFrom}
                    onChange={handleChange}
                  />
                  {errors.pickupFrom && <p className="mm-error">{errors.pickupFrom}</p>}
                </div>
                <div className="mm-field">
                  <label className="mm-label">Pickup Until</label>
                  <input
                    className="mm-input"
                    type="time"
                    name="pickupUntil"
                    value={form.pickupUntil}
                    onChange={handleChange}
                  />
                  {errors.pickupUntil && <p className="mm-error">{errors.pickupUntil}</p>}
                </div>
              </div>

              <div className="mm-field">
                <label className="mm-label">
                  Notes <span style={{ color: "#9ca3af", fontWeight: 400 }}>(optional)</span>
                </label>
                <textarea
                  className="mm-input mm-textarea"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Any special instructions..."
                  rows={3}
                />
              </div>

              <div className="mm-modal-actions">
                <button
                  type="button"
                  className="mm-btn-secondary"
                  onClick={() => setEditItem(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="mm-btn-primary">
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="mm-overlay" onClick={() => setDeleteId(null)}>
          <div className="mm-modal mm-confirm" onClick={(e) => e.stopPropagation()}>
            <div className="mm-confirm-icon">🗑️</div>
            <h2 className="mm-modal-title">Delete Listing?</h2>
            <p className="mm-confirm-sub">
              Are you sure? This listing will be removed and charities won't be able to claim it.
            </p>
            <div className="mm-modal-actions">
              <button
                className="mm-btn-secondary"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="mm-btn-danger"
                onClick={() => handleDelete(deleteId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageMenu;