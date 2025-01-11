import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { generateUniqueId } from 'esewajs';

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
    <div>
      <h1>eSewa Payment Integration</h1>

      <form onSubmit={handlePayment}>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            value={amount}
            readOnly
            required
          />
        </div>

        <button type="submit">Proceed to Pay with eSewa</button>
      </form>
    </div>
  );
};

export default PaymentForm;
