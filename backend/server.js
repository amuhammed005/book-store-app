import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import upload from "express-fileupload";

import router from "./routes/router.js";
import orderRouter from "./model/orders/order.route.js";
import userRouter from "./model/users/user.route.js";

dotenv.config();

connectDB();

const app = express();

// Configure CORS first
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL || "https://book-store-app-mern-umber.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload());

const port = process.env.PORT || 3000;

app.use("/api/books", router);
app.use("/api/orders", orderRouter);
app.use("/api/auth", userRouter);

app.get("/", (req, res) => {
  res.send("Book Store Backend running");
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
