import Razorpay from "razorpay";

const rzpay = new Razorpay({
    key_id: process.env.RAZ_API_KEY,
    key_secret: process.env.RAZ_KEY_SECRET
});

export async function orderCreate(req, res) {
    try{
        const userId = req.user._id;
        const cart = await Cart.aggregate([
            {$match:{
                userId:userId
            }},
            
            {
                $lookup:{
                    from:"products",
                    localField:"productId",
                    foreignField:"_id",
                    as:"product"

                }
            },
            {
                $unwind:"$product"
            }

        ]);

        let totalAmount = 0;
        let shipping = 10;

        cart.forEach(item=>{
            totalAmount = totalAmount + item.product.price * item.quantity;
  
        });

        console.log(totalAmount);

        const order = await rzpay.orders.create({

              amount: totalAmount*100,

            currency:"INR",
            receipt:"receipt_"+Math.floor(Math.random()*1000)+"-"+Math.floor(Math.random()*1000)
        });

        res.status(200).json({orderId:order.id,amount:order.amount,currency:order.currency});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong!!"});


    }

}

export async function verifyPayment(req,res){
    try{
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        const msg = razorpay_order_id + "|" + razorpay_payment_id; // pipe creating
        const expectedSign = crypto.createHmac("sha256", process.env.RAZ_KEY_SECRET).update(msg).digest("hex"); // creating hash of signature

        console.log(expectedSign==razorpay_signature);
        if(expectedSign==razorpay_signature){
            res.status(200).json({message:"Payment successfull!!"}); //  manage orders
        }else{
            res.status(500).json({message:"Defaulter Detected!!" })
        }

    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong!!"})
        
    }
}