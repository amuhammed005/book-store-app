import express from "express";
import { adminAuth, registerUser, userAuth } from "./user.controller.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", userAuth);
userRouter.post("/admin", adminAuth);

export default userRouter;
