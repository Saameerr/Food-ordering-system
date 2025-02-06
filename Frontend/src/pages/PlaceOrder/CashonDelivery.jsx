import React from 'react'
import { useNavigate } from "react-router-dom";
const CashonDelivery = () => {
      const navigate = useNavigate();
  return (
    <div className="success">
      <img src="success_icon.png" alt="" />
      <h1>Order Placed Successfully!</h1>
      <p>Thank you for your order. We'll contact you soon.</p>
      <button onClick={() => navigate("/")} className="go-home-button">
        Go to Homepage
      </button>
    </div>
  )
}

export default CashonDelivery