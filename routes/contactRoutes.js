import express from "express";
import { contactEmail } from "../controllers/contactController.js";

const contactRouter = express.Router();

contactRouter.post("/contact", contactEmail);

export default contactRouter;