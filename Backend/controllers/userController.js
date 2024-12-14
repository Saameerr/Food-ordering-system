import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import crypto from "crypto";  // To generate OTP

// Function to create a token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET); 
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist." });
        }

        // Compare entered password with hashed password in database
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.json({ success: false, message: "Invalid credentials." });
        }

        // Generate JWT token
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred during login." });
    }
};

// Register User
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists." });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email." });
        }

        // Password Validation
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Password must be at least 8 characters long.",
            });
        }

        if (!/[A-Z]/.test(password)) {
            return res.json({
                success: false,
                message: "Password must include at least one uppercase letter.",
            });
        }

        if (!/[a-z]/.test(password)) {
            return res.json({
                success: false,
                message: "Password must include at least one lowercase letter.",
            });
        }

        if (!/[0-9]/.test(password)) {
            return res.json({
                success: false,
                message: "Password must include at least one number.",
            });
        }

        if (!/[@$!%*?&]/.test(password)) {
            return res.json({
                success: false,
                message: "Password must include at least one special character (@, $, !, %, *, ?, &).",
            });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        });

        // Save new user in database
        const user = await newUser.save();

        // Generate JWT token
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred during registration." });
    }
};

// Request password reset
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString();

        // Save OTP and expiry date
        user.passwordResetOTP = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await user.save();

        // Send OTP to user's email (using your email service)
        // For simplicity, we're just returning the OTP here, you should send it through an email service like Nodemailer
        console.log(`OTP for password reset: ${otp}`);

        res.json({ success: true, message: "OTP sent to your email." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred while sending OTP." });
    }
};

// Verify OTP and reset password
const verifyOTPAndResetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }

        // Check if OTP is valid and not expired
        if (user.passwordResetOTP !== otp || user.otpExpiry < Date.now()) {
            return res.json({ success: false, message: "Invalid or expired OTP." });
        }

        // Validate new password
        if (newPassword.length < 8) {
            return res.json({
                success: false,
                message: "Password must be at least 8 characters long.",
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        user.password = hashedPassword;
        user.passwordResetOTP = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.json({ success: true, message: "Password has been successfully reset." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred while resetting password." });
    }
};

// Export the functions
export { loginUser, registerUser, requestPasswordReset, verifyOTPAndResetPassword };
