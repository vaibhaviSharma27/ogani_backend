import {checkAuth, login, Signup, logout} from "../controllers/authController.js";
import express from "express";
import { Profile } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup", Signup);
userRouter.post("/login", login);
userRouter.get("/profile", checkAuth, Profile);
userRouter.get("/logout", logout);

export default userRouter;