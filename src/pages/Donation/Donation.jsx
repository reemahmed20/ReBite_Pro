import "./Donation.css";
import { useState } from "react";

function Donation() {

    const [selectedAmount, setSelectedAmount] = useState(100);

    const [paymentMethod, setPaymentMethod] = useState("card");
    const [showModal, setShowModal] = useState(false);
    const amounts = [50, 100, 200, 500];


    return (
        <div className="donation-page">

            <div className="donation-container">

                {/* Header */}
                <div className="donation-header">
                    <h1>Make a Donation 💚</h1>

                    <p>
                        Help us reduce food waste and support
                        families in need.
                    </p>
                </div>

                {/* Amount Section */}
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
                                onClick={() => setSelectedAmount(amount)}
                            >
                                {amount} EGP
                            </button>
                        ))}

                    </div>

                    {/* Custom Amount */}
                    <input
                        type="number"
                        placeholder="Custom Amount"
                        className="custom-input"
                    />

                </div>

                {/* Payment Method */}
                <div className="donation-card">

                    <h2>Payment Method</h2>

                    <div className="payment-options">

                        <div
                            className={
                                paymentMethod === "card"
                                    ? "payment-card active"
                                    : "payment-card"
                            }
                            onClick={() => setPaymentMethod("card")}
                        >
                            💳 Credit / Debit Card
                        </div>

                        <div
                            className={
                                paymentMethod === "vodafone"
                                    ? "payment-card active"
                                    : "payment-card"
                            }
                            onClick={() => setPaymentMethod("vodafone")}
                        >
                            📱 Vodafone Cash
                        </div>

                        <div
                            className={
                                paymentMethod === "instapay"
                                    ? "payment-card active"
                                    : "payment-card"
                            }
                            onClick={() => setPaymentMethod("instapay")}
                        >
                            🏦 InstaPay
                        </div>

                    </div>

                </div>









                {/* Summary */}
                <div className="summary-card">

                    <h2>Donation Summary</h2>

                    <div className="summary-row">
                        <span>Donation Amount</span>
                        <strong>{selectedAmount} EGP</strong>
                    </div>

                    <div className="summary-row">
                        <span>Estimated Meals</span>
                        <strong>{selectedAmount / 5} meals 🍽️</strong>
                    </div>

                    <div className="summary-row">
                        <span>People Helped</span>
                        <strong>{Math.floor(selectedAmount / 10)} people 👤</strong>
                    </div>

                </div>

                {/* Donate Button */}
                <button
                    className="donate-submit"
                    onClick={() => setShowModal(true)}
                >
                    Donate Now
                </button>
                {/* Payment Modal */}

                {showModal && (

                    <div className="modal-overlay">

                        <div className="payment-modal">

                            <button
                                className="close-btn"
                                onClick={() => setShowModal(false)}
                            >
                                ✕
                            </button>

                            {/* Card */}
                            {paymentMethod === "card" && (
                                <>
                                    <h2>Card Payment 💳</h2>

                                    <p>
                                        Enter your card details securely
                                        to complete the donation.
                                    </p>

                                    <input
                                        type="text"
                                        placeholder="Card Number"
                                        className="custom-input"
                                    />

                                    <div className="card-row">

                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            className="custom-input"
                                        />

                                        <input
                                            type="text"
                                            placeholder="CVV"
                                            className="custom-input"
                                        />

                                    </div>

                                    <button className="confirm-btn">
                                        Confirm Payment
                                    </button>
                                </>
                            )}

                            {/* Vodafone */}
                            {paymentMethod === "vodafone" && (
                                <>
                                    <h2>Vodafone Cash 📱</h2>

                                    <p>
                                        Please transfer the amount to:
                                    </p>

                                    <div className="payment-info">
                                        01012345678
                                    </div>

                                    <button className="confirm-btn">
                                        I Have Transferred
                                    </button>
                                </>
                            )}

                            {/* InstaPay */}
                            {paymentMethod === "instapay" && (
                                <>
                                    <h2>InstaPay 🏦</h2>

                                    <p>
                                        Send your donation to:
                                    </p>

                                    <div className="payment-info">
                                        rebite@instapay
                                    </div>

                                    <button className="confirm-btn">
                                        I Have Paid
                                    </button>
                                </>
                            )}

                        </div>

                    </div>

                )}

            </div>

        </div >
    );
}

export default Donation;