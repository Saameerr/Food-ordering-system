import React, { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./Login.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        if (currentState === "Sign in") {
          setData({
            email: "",
            password: "",
          });
          toast.success("Registration successful. Please log in.");
          setCurrentstate("Login");
        } else {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          setShowLogin(false);
          toast.success("Login successful!");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();

    // Step 1: Request OTP
    if (step === 1) {
      try {
        const response = await axios.post(`${url}/api/user/requestPasswordReset`, { email });
        if (response.data.success) {
          toast.success(response.data.message); // OTP sent successfully
          setStep(2); // Move to Step 2: OTP Verification
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error occurred while requesting OTP.");
      }
    }
    // Step 2: Verify OTP
    else if (step === 2) {
      try {
        const response = await axios.post(`${url}/api/user/verifyOTP`, { email, otp });
        if (response.data.success) {
          toast.success(response.data.message); // OTP verified successfully
          setStep(3); // Move to Step 3: Reset Password
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error occurred while verifying OTP.");
      }
    }
    // Step 3: Reset Password
    else if (step === 3) {
      try {
        const response = await axios.post(`${url}/api/user/resetPassword`, {
          email,
          otp,
          newPassword,
        });
        if (response.data.success) {
          toast.success(response.data.message); // Password reset successfully
          setForgotPasswordState(false); // Return to login screen
          setStep(1); // Reset steps
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error occurred while resetting password.");
      }
    }
  };

  return (
    <div className="login-overlay">
      <div className="login">
        <ToastContainer /> {/* Add ToastContainer to render toasts */}
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
             <div className="password-requirement">
                   
                        <ul>
                            <li>At least 8 characters</li>
                            <li>One uppercase letter</li>
                            <li>One lowercase letter</li>
                            <li>One number</li>
                            <li>One special symbol (e.g., @, #, $, %, etc.)</li>
                        </ul>
                   
                    </div>
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
                  <label>New Password:</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
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
