import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddListing.css";
import useListings from "../../../hooks/useListings";

function AddListing() {
  const navigate = useNavigate();
  const { addListing } = useListings();

  const [form, setForm] = useState({
    title: "",
    category: "",
    portions: "",
    pickupFrom: "",
    pickupUntil: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    let newErrors = {};
    if (!form.title) newErrors.title = "Title is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.portions) newErrors.portions = "Portions is required";
    else if (form.portions <= 0) newErrors.portions = "Must be more than 0";
    if (!form.pickupFrom) newErrors.pickupFrom = "Pickup time is required";
    if (!form.pickupUntil) newErrors.pickupUntil = "Pickup end time is required";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const newListing = {
        id: Date.now(),
        title: form.title,
        status: "active",
        portions: `${form.portions} portions`,
        time: `${form.pickupFrom} – ${form.pickupUntil}`,
        postedAgo: "Just now",
        claimedBy: null,
        category: form.category,
        notes: form.notes,
      };
      addListing(newListing);
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="add-listing">
        <div className="success-screen">
          <div className="success-icon">🎉</div>
          <h2 className="success-title">Listing Added!</h2>
          <p className="success-sub">
            Your food listing has been posted. Nearby charities will be notified shortly.
          </p>
          <button
            className="al-btn-primary"
            onClick={() => navigate("/restaurant")}
          >
            Back to Home
          </button>
          <button
            className="al-btn-secondary"
            onClick={() => {
              setForm({
                title: "",
                category: "",
                portions: "",
                pickupFrom: "",
                pickupUntil: "",
                notes: "",
              });
              setSubmitted(false);
            }}
          >
            Add Another Listing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="add-listing">
      <div className="al-header">
        <h1 className="al-title">Add Listing</h1>
        <p className="al-sub">Post your surplus food for nearby charities</p>
      </div>

      <div className="al-form-wrapper">
        <form onSubmit={handleSubmit} className="al-form">

          <div className="al-grid">
            <div className="al-col">
              <div className="al-section-title">🍽️ Food Details</div>

              <div className="al-field">
                <label className="al-label">Food Title</label>
                <input
                  className="al-input"
                  type="text"
                  name="title"
                  placeholder="e.g. Grilled Chicken & Rice"
                  value={form.title}
                  onChange={handleChange}
                />
                {errors.title && <p className="al-error">{errors.title}</p>}
              </div>

              <div className="al-field">
                <label className="al-label">Category</label>
                <select
                  className="al-input"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  <option value="meals">🍽️ Cooked Meals</option>
                  <option value="bakery">🥖 Bread & Bakery</option>
                  <option value="vegetables">🥦 Vegetables & Fruits</option>
                  <option value="dairy">🥛 Dairy Products</option>
                  <option value="other">📦 Other</option>
                </select>
                {errors.category && <p className="al-error">{errors.category}</p>}
              </div>

              <div className="al-field">
                <label className="al-label">Number of Portions</label>
                <input
                  className="al-input"
                  type="number"
                  name="portions"
                  placeholder="e.g. 25"
                  value={form.portions}
                  onChange={handleChange}
                  min="1"
                />
                {errors.portions && <p className="al-error">{errors.portions}</p>}
              </div>
            </div>

            <div className="al-col">
              <div className="al-section-title">🕐 Pickup Info</div>

              <div className="al-field">
                <label className="al-label">Pickup From</label>
                <input
                  className="al-input"
                  type="time"
                  name="pickupFrom"
                  value={form.pickupFrom}
                  onChange={handleChange}
                />
                {errors.pickupFrom && <p className="al-error">{errors.pickupFrom}</p>}
              </div>

              <div className="al-field">
                <label className="al-label">Pickup Until</label>
                <input
                  className="al-input"
                  type="time"
                  name="pickupUntil"
                  value={form.pickupUntil}
                  onChange={handleChange}
                />
                {errors.pickupUntil && <p className="al-error">{errors.pickupUntil}</p>}
              </div>

              <div className="al-field">
                <label className="al-label">
                  Notes <span className="al-optional">(optional)</span>
                </label>
                <textarea
                  className="al-input al-textarea"
                  name="notes"
                  placeholder="Any special instructions or details..."
                  value={form.notes}
                  onChange={handleChange}
                  rows={4}
                />
              </div>
            </div>
          </div>

          <div className="al-divider" />

          <div className="al-actions">
            <button
              type="button"
              className="al-btn-secondary"
              onClick={() => navigate("/restaurant")}
            >
              Cancel
            </button>
            <button type="submit" className="al-btn-primary">
              Post Listing
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AddListing;