import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./Login.css";

const Login = ({ setShowLogin }) => {
  const [currentState, setCurrentstate] = useState("Login");
  return (
    <div className="Login">
      <form className="login-container">
        <div className="login-title">
          <h2>{currentState}</h2>
          <span><RxCross2 onClick={() => setShowLogin(false)} style={{height:"25px", width:"25px", cursor:"pointer"}}/></span>
        </div>

        <div className="login-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input type="text" placeholder="Your Name " required />
          )}
          <input type="email" placeholder="Your e-mail" required />
          <input type="password" placeholder="Password" required />
        </div>
        <button>
          {currentState === "Sign in" ? "Create account" : "Login"}
        </button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>I agree to continue...</p>
        </div>
        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrentstate("Sign in")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrentstate("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
