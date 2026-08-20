import User from "./user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { isDatabaseAvailable } from "../../config/db.js";

const createToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPIRES_IN || "1d" },
  );
};

const sendAuthResponse = (res, user, message, status = 200) => {
  const token = createToken(user);
  return res.status(status).json({
    success: true,
    message,
    token,
    user: { id: user._id, email: user.email, username: user.username, role: user.role },
  });
};

const databaseRequired = (res) => {
  if (isDatabaseAvailable()) return false;
  res.status(503).json({
    success: false,
    message: "Accounts are temporarily unavailable while the database is offline.",
  });
  return true;
};

export const registerUser = async (req, res) => {
  if (databaseRequired(res)) return;

  try {
    const { username, email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();
    if (!normalizedEmail || !password || password.length < 8) {
      return res.status(422).json({ success: false, message: "Use a valid email and a password of at least 8 characters." });
    }

    if (await User.exists({ email: normalizedEmail })) {
      return res.status(409).json({ success: false, message: "An account with this email already exists." });
    }

    const user = await User.create({ username: username?.trim(), email: normalizedEmail, password });
    return sendAuthResponse(res, user, "Account created successfully", 201);
  } catch (error) {
    console.error("Registration failed", error.message);
    return res.status(500).json({ success: false, message: "Unable to create account." });
  }
};

export const userAuth = async (req, res, requireAdmin = false) => {
  if (databaseRequired(res)) return;

  try {
    const { email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      return res.status(422).json({ success: false, message: "Email and password are required." });
    }

    const admin = await User.findOne({ email: normalizedEmail });

    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    if (requireAdmin && admin.role !== "admin") {
      return res.status(403).json({ success: false, message: "Administrator access is required." });
    }

    return sendAuthResponse(res, admin, "Authentication successful");
  } catch (error) {
    console.error("Failed to login as admin", error.message);
    return res.status(500).json({
      success: false,
      message: "Unable to sign in.",
    });
  }
};

export const adminAuth = (req, res) => userAuth(req, res, true);
