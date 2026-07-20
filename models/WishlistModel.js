import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    productId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    quantity: Number
});

const Wishlist = mongoose.model("wishlist", wishlistSchema);

export default Wishlist;