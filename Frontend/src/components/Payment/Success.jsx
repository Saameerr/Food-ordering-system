import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { base64Decode } from "esewajs";
import axios from "axios";
import './success.css'

const Success = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Create a new URLSearchParams object using the search string from location
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("data");

  // Guard clause for null or invalid token
  if (!token) {
    return (
      <div className="success">
           <img src="invalid.png" alt="" />
        <h1>Invalid Request</h1>
        <p>No payment information was provided.</p>
        <button onClick={() => navigate("/")} className="go-home-button">
          Go to Homepage
        </button>
      </div>
    );
  }

  // Decode the JWT without verifying the signature
  let decoded;
  try {
    decoded = base64Decode(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return (
      <div>
        <h1>Error</h1>
        <p>Invalid token format.</p>
        <button onClick={() => navigate("/")} className="go-home-button">
          Go to Homepage
        </button>
      </div>
    );
  }

  const verifyPaymentAndUpdateStatus = async () => {
    try {
      const response = await axios.post("http://localhost:4000/payment-status", {
        product_id: decoded.transaction_uuid,
      });
      if (response.status === 200) {
        setIsLoading(false);
        setIsSuccess(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error initiating payment:", error);
    }
  };

  useEffect(() => {
    verifyPaymentAndUpdateStatus();
  }, []);

  if (isLoading && !isSuccess) return <>Loading...</>;

  if (!isLoading && !isSuccess)
    return (
      <div className="success">
           <img src="fail_icon.png" alt="" />
        <h1>Oops!..Error occurred on confirming payment</h1>
        <h2>We will resolve it soon.</h2>
        <button onClick={() => navigate("/")} className="go-home-button">
          Go to Homepage
        </button>
      </div>
    );

  return (
    <div className="success">
      <img src="success_icon.png" alt="" />
      <h1>Payment Successful!</h1>
      <p>Thank you for your payment. Your transaction was successful.</p>
      <button onClick={() => navigate("/")} className="go-home-button">
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;
