import Cart from "../models/CartModel.js";

export async function updateCart (req, res){
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id;

        const existingItem = await Cart.findOne({
            productId: new mongoose.Types.ObjectId(productId),
            userId
        });

        if (existingItem) {
            console.log(existingItem, "from line 182");
            existingItem.quantity = existingItem.quantity + quantity;
            if (existingItem.quantity <= 0) {
                await existingItem.deleteOne();
            } else {
                await existingItem.save();
            }


        } else {
            if (quantity >= 1) {
                console.log("No existing item found!");
                const newCartItem = await Cart.create({
                    productId: new mongoose.Types.ObjectId(productId),
                    userId,
                    quantity
                });
            }
        }


        const usersCart = await Cart.aggregate([
            { $match: { userId } },

            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "product"
                }
            },

            {
                $addFields: {
                    product: { $arrayElemAt: ["$product", 0] }
                }
            },

            
               { $project:{
                    quantity: 1,
                    productId:"$product._id",
                    title: "$product.title",
                    price: "$product.price",
                    image: { $arrayElemAt: ["$product.images", 0] }
                }
            }
            
        ]);

        res.status(200).json({
            cart: usersCart
        });

    }catch(error) {

        console.log(error.message);
        res.status(500).json({ message: "Something went wrong!!" })

    }
};

export async function getCart(req, res){
    try {
        const userId = req.user._id;
        const cartItems = await Cart.aggregate([
            { $match: { userId } },

            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "product"
                }
            },

            {
                $addFields: {
                    product: { $arrayElemAt: ["$product", 0] }
                }
            },

            {
                $project: {
                    productId:"$product._id",
                    quantity: 1,
                    title: "$product.title",
                    price: "$product.price",
                    image: { $arrayElemAt: ["$product.images", 0] }
                }
            }
        ])

        res.status(200).json({ message: cartItems });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!!" });
    }

};