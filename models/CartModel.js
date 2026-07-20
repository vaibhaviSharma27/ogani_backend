import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    productId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    quantity: Number
});

const Cart = mongoose.model("cart", cartSchema);

export default Cart;
