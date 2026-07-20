import mongoose from "mongoose";

export async function getProducts(req, res){
    try {
        const { q, category } = req.query;

        const ogani = await mongoose.connection.db;
        const products = await ogani.collection("products").find({ title: { $regex: q || "", $options: "i" }, category: { $regex: category || "", $options: "i" } }).toArray();
        const categories = await ogani.collection("products").distinct("category");

        res.status(200).json({ products, categories });
        console.log("request received response sent")
    } catch (error) {
        console.log(error);

    }

};

export async function getProductById(req, res) {
    try {
        const { id } = req.params;
        const ogani = mongoose.connection.db;
        const product = await ogani.collection("products").findOne({ _id: new mongoose.Types.ObjectId(id) });
        res.status(200).json({ product });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong!" });
    }
};