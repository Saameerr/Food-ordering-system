import React from 'react'
import { useNavigate } from "react-router-dom";
import './failure.css'

const Failure = () => {
  const navigate = useNavigate();
  return (
    <div className='failure'>
      <img src="fail_icon.png" alt="" />
    <h1>Payment Failed!</h1>
    <p>There was an issue with your payment. Please try again.</p>
    <button onClick={() => navigate("/")} className="go-home-button">
      Go to Homepage
    </button>
  </div>
  )
}

export default Failure