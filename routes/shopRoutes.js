import { getProducts, getProductById } from "../controllers/productController.js";
import express from "express";

const shopRouter = express.Router();

shopRouter.get("/products", getProducts);
shopRouter.get("/product/:id", getProductById);

export default shopRouter;

