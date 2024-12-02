import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./Login.css";

const Login = ({ setShowLogin }) => {
  const [currentState, setCurrentstate] = useState("Login");

  return (
    <div className="login-overlay">
      <div className="login">
        <form className="login-container">
          <div className="login-title">
            <h2>{currentState}</h2>
            <span>
              <RxCross2
                onClick={() => setShowLogin(false)}
                className="close-icon"
              />
            </span>
          </div>

          <div className="login-inputs">
            {currentState === "Sign in" && (
              <input type="text" placeholder="Your Name" required />
            )}
            <input type="email" placeholder="Your e-mail" required />
            <input type="password" placeholder="Password" required />
          </div>

          <button type="submit">
            {currentState === "Sign in" ? "Create account" : "Login"}
          </button>

          <div className="login-condition">
            {currentState === "Login" ? (
              <p>
                Don't have an account?{" "}
                <span onClick={() => setCurrentstate("Sign in")}>Sign up here</span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span onClick={() => setCurrentstate("Login")}>Login here</span>
              </p>
            )}
          </div>

          <p className="forgot-password">
            <span onClick={() => alert("Redirect to Forgot Password")}>
              Forgot Password?
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
