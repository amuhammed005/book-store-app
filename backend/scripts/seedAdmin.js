import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../model/users/user.model.js";

dotenv.config();

const email = process.env.ADMIN_EMAIL || "codewarrior33@gmail.com";
const password = process.env.ADMIN_PASSWORD || "adam123";

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI is required to create an administrator.");
}

try {
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  const passwordHash = await bcrypt.hash(password, 10);
  const admin = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { $set: { email: email.toLowerCase(), password: passwordHash, role: "admin" } },
    { new: true, upsert: true, runValidators: true },
  );

  console.log(`Administrator ready: ${admin.email}`);
} finally {
  await mongoose.disconnect();
}
