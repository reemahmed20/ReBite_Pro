import { useState } from "react";
import "./Donation.css";

function Donation() {

  const [selectedAmount, setSelectedAmount] = useState(100);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const [cardForm, setCardForm] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [walletForm, setWalletForm] = useState({
    phone: "",
    reference: "",
  });

  const [instapayForm, setInstapayForm] = useState({
    account: "",
    reference: "",
  });

  const [errors, setErrors] = useState({});

  const amounts = [50, 100, 200, 500];

  const meals = Math.floor((selectedAmount || 0) / 5);
  const people = Math.floor((selectedAmount || 0) / 10);

  function handleAmount(amount) {
    setSelectedAmount(amount);
    setErrors({});
  }

  function handleCustomAmount(e) {
    setSelectedAmount(Number(e.target.value));
    setErrors({});
  }

  function openPayment(method) {

    if (!selectedAmount || selectedAmount <= 0) {
      setErrors({
        amount: "Please enter a valid donation amount",
      });
      return;
    }

    setPaymentMethod(method);
    setErrors({});
    setShowModal(true);
  }

  function validatePayment() {

    const newErrors = {};

    if (paymentMethod === "card") {

      if (!cardForm.name.trim()) {
        newErrors.name = "Cardholder name is required";
      }

      if (!/^\d{16}$/.test(cardForm.cardNumber)) {
        newErrors.cardNumber = "Card number must be 16 digits";
      }

      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardForm.expiry)) {
        newErrors.expiry = "Expiry must be MM/YY";
      }

      if (!/^\d{3,4}$/.test(cardForm.cvv)) {
        newErrors.cvv = "CVV must be 3 or 4 digits";
      }
    }

    if (paymentMethod === "vodafone") {

      if (!/^01[0125]\d{8}$/.test(walletForm.phone)) {
        newErrors.phone = "Enter a valid Egyptian mobile number";
      }

      if (!walletForm.reference.trim()) {
        newErrors.reference = "Transaction reference is required";
      }
    }

    if (paymentMethod === "instapay") {

      if (!instapayForm.account.trim()) {
        newErrors.account = "InstaPay account or phone is required";
      }

      if (!instapayForm.reference.trim()) {
        newErrors.reference = "Transaction reference is required";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function confirmPayment() {

    if (!validatePayment()) return;

    const isSuccess = Math.random() > 0.3;

    if (isSuccess) {

      const donationResponse = {
        status: "success",
        amount: selectedAmount,
        method: paymentMethod,
        id: 2,
      };

      setShowModal(false);
      setSuccessData(donationResponse);

    } else {

      setShowModal(false);

      setSuccessData({
        status: "failed",
      });

    }
  }

  return (
    <div className="donation-page">

      <div className="donation-container">

        <div className="donation-header">
          <h1>Make a Donation</h1>
          <p>
            Choose an amount and payment method to support ReBite.
          </p>
        </div>

        <div className="donation-layout">

          <div className="donation-main">

            <div className="donation-card">

              <h2>Select Amount</h2>

              <div className="amount-grid">

                {amounts.map((amount) => (
                  <button
                    key={amount}
                    className={
                      selectedAmount === amount
                        ? "amount-btn active"
                        : "amount-btn"
                    }
                    onClick={() => handleAmount(amount)}
                  >
                    {amount} EGP
                  </button>
                ))}

              </div>

              <input
                type="number"
                className="custom-amount"
                placeholder="Custom amount"
                value={selectedAmount || ""}
                onChange={handleCustomAmount}
              />

              {errors.amount && (
                <p className="donation-error">
                  {errors.amount}
                </p>
              )}

            </div>

            <div className="donation-card">

              <h2>Payment Method</h2>

              <div className="payment-grid">

                <button
                  className={
                    paymentMethod === "card"
                      ? "payment-option active"
                      : "payment-option"
                  }
                  onClick={() => openPayment("card")}
                >
                  💳 Credit / Debit Card
                </button>

                <button
                  className={
                    paymentMethod === "vodafone"
                      ? "payment-option active"
                      : "payment-option"
                  }
                  onClick={() => openPayment("vodafone")}
                >
                  📱 Vodafone Cash
                </button>

                <button
                  className={
                    paymentMethod === "instapay"
                      ? "payment-option active"
                      : "payment-option"
                  }
                  onClick={() => openPayment("instapay")}
                >
                  🏦 InstaPay
                </button>

              </div>

              {errors.paymentMethod && (
                <p className="donation-error">
                  {errors.paymentMethod}
                </p>
              )}

            </div>

          </div>

          <div className="donation-summary">

            <h2>Summary</h2>

            <div className="summary-row">
              <span>Amount</span>
              <strong>{selectedAmount || 0} EGP</strong>
            </div>

            <div className="summary-row">
              <span>Estimated meals</span>
              <strong>{meals}</strong>
            </div>

            <div className="summary-row">
              <span>People helped</span>
              <strong>{people}</strong>
            </div>

            <button
              className="donate-submit"
              onClick={() => {
                if (!paymentMethod) {
                  setErrors({
                    paymentMethod:
                      "Please select a payment method",
                  });
                  return;
                }

                setShowModal(true);
              }}
            >
              Continue Payment
            </button>

          </div>

        </div>

      </div>

      {showModal && (
        <div className="donation-modal-overlay">

          <div className="donation-modal">

            <button
              className="modal-close"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            {paymentMethod === "card" && (
              <>

                <h2>Card Payment</h2>

                <p className="modal-subtitle">
                  Enter your card details.
                </p>

                <input
                  className="modal-input"
                  placeholder="Cardholder name"
                  value={cardForm.name}
                  onChange={(e) =>
                    setCardForm({
                      ...cardForm,
                      name: e.target.value,
                    })
                  }
                />

                {errors.name && (
                  <p className="donation-error">
                    {errors.name}
                  </p>
                )}

                <input
                  className="modal-input"
                  placeholder="Card number"
                  maxLength="16"
                  value={cardForm.cardNumber}
                  onChange={(e) =>
                    setCardForm({
                      ...cardForm,
                      cardNumber: e.target.value.replace(/\D/g, ""),
                    })
                  }
                />

                {errors.cardNumber && (
                  <p className="donation-error">
                    {errors.cardNumber}
                  </p>
                )}

                <div className="modal-row">

                  <div>

                    <input
                      className="modal-input"
                      placeholder="MM/YY"
                      value={cardForm.expiry}
                      onChange={(e) =>
                        setCardForm({
                          ...cardForm,
                          expiry: e.target.value,
                        })
                      }
                    />

                    {errors.expiry && (
                      <p className="donation-error">
                        {errors.expiry}
                      </p>
                    )}

                  </div>

                  <div>

                    <input
                      className="modal-input"
                      placeholder="CVV"
                      maxLength="4"
                      value={cardForm.cvv}
                      onChange={(e) =>
                        setCardForm({
                          ...cardForm,
                          cvv: e.target.value.replace(/\D/g, ""),
                        })
                      }
                    />

                    {errors.cvv && (
                      <p className="donation-error">
                        {errors.cvv}
                      </p>
                    )}

                  </div>

                </div>

              </>
            )}

            {paymentMethod === "vodafone" && (
              <>

                <h2>Vodafone Cash</h2>

                <p className="modal-subtitle">
                  Transfer {selectedAmount} EGP to:
                </p>

                <div className="payment-info">
                  01012345678
                </div>

                <input
                  className="modal-input"
                  placeholder="Your Vodafone number"
                  value={walletForm.phone}
                  onChange={(e) =>
                    setWalletForm({
                      ...walletForm,
                      phone: e.target.value.replace(/\D/g, ""),
                    })
                  }
                />

                {errors.phone && (
                  <p className="donation-error">
                    {errors.phone}
                  </p>
                )}

                <input
                  className="modal-input"
                  placeholder="Transaction reference"
                  value={walletForm.reference}
                  onChange={(e) =>
                    setWalletForm({
                      ...walletForm,
                      reference: e.target.value,
                    })
                  }
                />

                {errors.reference && (
                  <p className="donation-error">
                    {errors.reference}
                  </p>
                )}

              </>
            )}

            {paymentMethod === "instapay" && (
              <>

                <h2>InstaPay</h2>

                <p className="modal-subtitle">
                  Send {selectedAmount} EGP to:
                </p>

                <div className="payment-info">
                  rebite@instapay
                </div>

                <input
                  className="modal-input"
                  placeholder="Your InstaPay account"
                  value={instapayForm.account}
                  onChange={(e) =>
                    setInstapayForm({
                      ...instapayForm,
                      account: e.target.value,
                    })
                  }
                />

                {errors.account && (
                  <p className="donation-error">
                    {errors.account}
                  </p>
                )}

                <input
                  className="modal-input"
                  placeholder="Transaction reference"
                  value={instapayForm.reference}
                  onChange={(e) =>
                    setInstapayForm({
                      ...instapayForm,
                      reference: e.target.value,
                    })
                  }
                />

                {errors.reference && (
                  <p className="donation-error">
                    {errors.reference}
                  </p>
                )}

              </>
            )}

            <button
              className="confirm-payment"
              onClick={confirmPayment}
            >
              Confirm Payment
            </button>

          </div>

        </div>
      )}

      {successData && (
        <div className="donation-modal-overlay">

          <div className="donation-modal success-modal">

            {successData.status === "success" ? (
              <>

                <div className="success-icon">
                  💚
                </div>

                <h2>Donation Successful</h2>

                <p className="success-text">
                  Thank you for supporting ReBite.
                </p>

                <div className="success-details">

                  <div className="success-row">
                    <span>Amount</span>
                    <strong>
                      {successData.amount} EGP
                    </strong>
                  </div>

                  <div className="success-row">
                    <span>Payment method</span>
                    <strong>
                      {successData.method}
                    </strong>
                  </div>

                  <div className="success-row">
                    <span>ID</span>
                    <strong>
                      #RB-{successData.id}
                    </strong>
                  </div>

                </div>

                <button
                  className="confirm-payment"
                  onClick={() => setSuccessData(null)}
                >
                  Done
                </button>

              </>
            ) : (
              <>

                <div className="failed-icon">
                  ✕
                </div>

                <h2 className="failed-title">
                  Payment Failed
                </h2>

                <p className="success-text">
                  We couldn’t confirm your payment.
                  Please try again.
                </p>

                <div className="failed-box">

                  <div className="success-row">
                    <span>Amount</span>
                    <strong>
                      {selectedAmount} EGP
                    </strong>
                  </div>

                  <div className="success-row">
                    <span>Method</span>
                    <strong>
                      {paymentMethod}
                    </strong>
                  </div>

                </div>

                <button
                  className="confirm-payment"
                  onClick={() => {
                    setSuccessData(null);
                    setShowModal(true);
                  }}
                >
                  Try Again
                </button>

              </>
            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default Donation;