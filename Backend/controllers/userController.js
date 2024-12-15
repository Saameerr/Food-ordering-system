import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import crypto from "crypto"; // To generate OTP
import nodemailer from "nodemailer"; // Import nodemailer

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

const sendOTPEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail", // You can also use other email services if needed
        auth: {
            user: process.env.EMAIL_USER, // Your Gmail address (from .env)
            pass: process.env.EMAIL_PASS, // Your app-specific Gmail password (from .env)
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: email, // Recipient address
        subject: "Password Reset OTP", // Email subject
        html: `
        <html>
          <body>
            <p>Dear User,</p>
            <p>We received a request to reset your password. Please use the following OTP to reset your password:</p>
            <h2 style="font-size: 24px; color: #333;">${otp}</h2>
            <p>This OTP is valid for the next 10 minutes. If you did not request this, please ignore this email.</p>
            <br />
            <p>Best regards,</p>
            <p>The KhajaBhayo Team</p>
          </body>
        </html>
      `,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log(`OTP sent to ${email}`);
    } catch (error) {
        console.log("Error sending OTP email:", error);
    }
};

// Updated requestPasswordReset function
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

        // Send OTP to user's email
        await sendOTPEmail(email, otp); // Call the sendOTPEmail function

        res.json({ success: true, message: "OTP sent to your email." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred while sending OTP." });
    }
};

// Step 2: Verify OTP
const verifyOTP = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found." });
        }

        // Verify OTP and expiry
        if (user.passwordResetOTP !== otp || user.otpExpiry < Date.now()) {
            return res.json({ success: false, message: "Invalid or expired OTP." });
        }

        res.json({ success: true, message: "OTP verified successfully." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred while verifying OTP." });
    }
};

// Step 3: Reset Password
const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found." });
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

        res.json({ success: true, message: "Password reset successfully." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred while resetting password." });
    }
};

// Export functions
export { 
    loginUser, 
    registerUser, 
    requestPasswordReset, 
    verifyOTP, 
    resetPassword 
};
