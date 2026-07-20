import express from "express";
import { checkAuth } from "../controllers/authController.js";
import { updateCart, getCart } from "../controllers/cartController.js";
import { updateWishlist, getWishlist } from "../controllers/wishlistController.js";

const userItemsRouter = express.Router();

userItemsRouter.post("/cart", checkAuth, updateCart);
userItemsRouter.post("/wishlist", checkAuth, updateWishlist);
userItemsRouter.get("/cart", checkAuth, getCart);
userItemsRouter.get("/wishlist", checkAuth, getWishlist);

export default userItemsRouter;