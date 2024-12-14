import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./Login.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const Login = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currentState, setCurrentstate] = useState("Login");
  const [forgotPasswordState, setForgotPasswordState] = useState(false);
  const [step, setStep] = useState(1); // Step for forgot password process
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    newUrl += currentState === "Login" ? "/api/user/login" : "/api/user/register";

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      if (currentState === "Sign in") {
        // Registration successful, show message and redirect to login page
        // Clear the form fields before switching to the login form
    setData({
      email: "",
      password: "",
    });
        alert("Registration successful. Please log in.");
        setCurrentstate("Login"); // Switch to login page
      } else {
        // Login successful, set token and proceed to home
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      }
    } else {
      alert(response.data.message);
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    if (step === 1) {
      // Request OTP
      try {
        const response = await axios.post(`${url}/api/user/requestPasswordReset`, { email });
        if (response.data.success) {
          alert(response.data.message); // OTP sent successfully
          setStep(2); // Proceed to the next step for OTP verification
        } else {
          alert(response.data.message); // Show error message
        }
      } catch (error) {
        console.error("Error requesting OTP:", error.message);
        alert("Error occurred while requesting OTP.");
      }
    } else if (step === 2) {
      // Verify OTP and reset password
      try {
        const response = await axios.post(`${url}/api/user/verifyOTPAndResetPassword`, {
          email,
          otp,
          newPassword,
        });
        if (response.data.success) {
          alert(response.data.message); // Password reset successfully
          setForgotPasswordState(false); // Return to login screen
          setStep(1); // Reset steps
        } else {
          alert(response.data.message); // Show error message
        }
      } catch (error) {
        console.error("Error resetting password:", error.message);
        alert("Error occurred while resetting password.");
      }
    }
  };

  return (
    <div className="login-overlay">
      <div className="login">
        {!forgotPasswordState ? (
          <form onSubmit={onLogin} className="login-container">
            <div className="login-title">
              <h2>{currentState}</h2>
              <span>
                <RxCross2 onClick={() => setShowLogin(false)} className="close-icon" />
              </span>
            </div>

            <div className="login-inputs">
              {currentState === "Sign in" && (
                <input
                  name="name"
                  onChange={onChangeHandler}
                  value={data.name}
                  type="text"
                  placeholder="Your Name"
                  required
                />
              )}
              <input
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                type="email"
                placeholder="Your e-mail"
                required
              />
              <input
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type="password"
                placeholder="Password"
                required
              />
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
              <span onClick={() => setForgotPasswordState(true)}>Forgot Password?</span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="login-container">
            <div className="login-title">
              <h2>Forgot Password</h2>
              <span>
                <RxCross2 onClick={() => setShowLogin(false)} className="close-icon" />
              </span>
            </div>

            <div className="login-inputs">
  {step === 1 && (
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your registered email"
      required
    />
  )}

  {step === 2 && (
    <>
      <label>Enter 6-digit OTP</label>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        required
      />
    </>
  )}

  {step === 3 && (
    <>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
        required
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm new password"
        required
      />
    </>
  )}
</div>


            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
