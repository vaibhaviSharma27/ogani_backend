import { orderCreate, verifyPayment } from "../controllers/paymentController.js";
import express from "express";
import { checkAuth } from "../controllers/authController.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-orders", checkAuth, orderCreate);
paymentRouter.post("/verifypayment", checkAuth, verifyPayment);

export default paymentRouter;