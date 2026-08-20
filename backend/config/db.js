import mongoose from "mongoose";

let databaseAvailable = false;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn(
      "MONGODB_URI is not configured. Starting without MongoDB; the catalogue fallback will be used.",
    );
    return false;
  }

  try {
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    databaseAvailable = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    databaseAvailable = false;
    console.error(
      `MongoDB connection failed. Starting with catalogue fallback: ${error.message}`,
    );
    return false;
  }
};

export const isDatabaseAvailable = () => databaseAvailable;
export default connectDB;
