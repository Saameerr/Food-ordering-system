import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { generateUniqueId } from 'esewajs';
import './paymentForm.css'

const PaymentForm = () => {
  const location = useLocation();
  const [amount, setAmount] = useState(location.state.totalAmount); // Use the passed totalAmount
  const [paymentMethod, setPaymentMethod] = useState('eSewa');

  useEffect(() => {
    setAmount(location.state.totalAmount); // Ensure the amount is updated if changed
  }, [location.state.totalAmount]);

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/initiate-payment",
        {
          amount: amount,
          productId: generateUniqueId(),
        }
      );

      window.location.href = response.data.url; // Redirect to eSewa page
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  return (
    <div className="payment-container">
  <h1 className="payment-title">eSewa Payment Integration</h1>

  <form className="payment-form" onSubmit={handlePayment}>
    <div className="form-group">
      <label htmlFor="amount" className="form-label"><b>Amount:</b></label>
      <input
        type="number"
        value={amount}
        className="form-input"
        readOnly
        required
      />
    </div>

    <button type="submit" className="payment-button">Proceed to Pay with eSewa</button>
  </form>
</div>
  )
}

export default PaymentForm;
