import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import path from "path";
import cookieParser from "cookie-parser";
import { fileTypeFromBuffer, fileTypeFromFile } from "file-type";
import fs from "fs/promises";
import nodemailer from "nodemailer";
import { v2 as cloudinary, } from "cloudinary";
import streamifier from "streamifier";


import multer, { MulterError } from "multer";


import crypto from "crypto";
import { checkAuth } from "./controllers/authController.js";

// Routes
import userRouter from "./routes/userRoutes.js";
import userItemsRouter from "./routes/userItemsRoutes.js";
import shopRouter from "./routes/shopRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import contactRouter from "./routes/contactRoutes.js";



const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://vaibhavigroceries.vercel.app",
    credentials: true
}));

app.use("/image", express.static(path.join(process.cwd(),"uploads")));


// Establish db connection

try {
    await mongoose.connect("mongodb://vaibhavisharmasv2527_db_user:9S6k506DHbXWbYEH@ac-ogpfigc-shard-00-00.w8ga4ny.mongodb.net:27017,ac-ogpfigc-shard-00-01.w8ga4ny.mongodb.net:27017,ac-ogpfigc-shard-00-02.w8ga4ny.mongodb.net:27017/ogani?ssl=true&replicaSet=atlas-93qpaw-shard-0&authSource=admin&appName=Cluster0")
    console.log("Connected!");
} catch (error) {
    console.log(error)
}

app.use("/user", userRouter);
app.use("/userItems", userItemsRouter);
app.use("/shop", shopRouter);
app.use("/payment", paymentRouter);
app.use("/contact", contactRouter );


// /createorder, /verifypayment => /payment/createorder   /payment/verifypayment

// maxlength, min, max, unique: true




// Initialize the app




// User Routes
// data validation - mongoose data validation
// hashing

app.post("/signup", express.json());
app.post("/login", express.json());


app.post("/cart", checkAuth, );


app.get("/cart", checkAuth, );

app.post("/wishlist", checkAuth, );


// ################################## Payment



app.post("/create-orders", checkAuth, );

// app.get("/orders",checkAuth, async (req, res)=>{
//     try {
//        const order =  await rzpay.orders.create({
//             currency: "INR",
//             amount: (req.body.amount)*100,
//             receipt: "receipt_"+Math.floor(Math.random()*1000)+"-"+Math.floor(Math.random()*1000)
//         });

//         res.status(200).json({message: order});
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message: "Something went wrong!"});
//     }
// });


// app.post("/verifypayment", checkAuth, (req, res)=>{
//     try {
//         const {razorpay_payment_id,razorpay_order_id, razorpay_signature } =req.body;

//         const msg = razorpay_order_id + "|" +razorpay_payment_id;
//         const expectedSign = crypto.createHmac("sha256", process.env.RAZ_KEY_SECRET)
//                             .update(msg)
//                             .digest("hex");

//         console.log(expectedSign==razorpay_signature);
//         if(expectedSign==razorpay_signature){
//             res.status(200).json({message: "Payment successfull!!"});
//             // manage orders


//         }else{
//             res.status(400).json({message: "Chor hai kya tu!!"});
//         }

        
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({message: "Something went horribly wrong!!"});
//     }
// })

app.post("/verifypayment", checkAuth, );


//end of payment section

app.get("/wishlist", checkAuth,);


app.get("/profile", checkAuth,)

app.get("/logout")

// use postman for free request thing instead of thunderclient 
// use form-data in body apply image as key and select file and then send

// const uploader = multer({
//     storage: multer.diskStorage({
//         filename:(req, file, cb)=>{
//             const randomNum = Math.floor(Math.random()*100000);
//             const currentDateTime = Date.now();
//             const fileName = `${randomNum}-${currentDateTime}${path.extname(file.originalname)}`;
//             cb(null, fileName);
//         },
//         destination: (req, file, cb) => {
//             console.log(file.mimetype);
//             if(file.mimetype.startsWith("image"));
//             cb(null, "./uploads");
//         }

//     }),

//     filefilter: (req, file, cb) => {
//         const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"];
//         if(!allowedMimeTypes.includes(file.mimetype))
//             return cb(new multer.MulterError("Only JPG, PNG and JPEG images are allowed."));
//         cb(null, true)
//     }
// });

// app.post("/profileimage", uploader.single("image"), async (req, res)=>{
// try{
// if(!req.file)
//     return res.status(400).json({message:"Could not upload file!!"});
// console.log(req.file);

// const uploadedFilePath = req.file.path;
// const type = await fileTypeFromFile(uploadedFilePath);
// const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg"];

// if(!allowedMimeTypes.includes(type.mime)){
//     await fs.unlink(uploadedFilePath);
//     res.status(400).json({message:"Only PNG, JPG and JPEG images are allowed!"});

//     return;
// }

// res.status(200).json({message: "file uploaded!!!"})
// }catch(error){

// }
// })



// app.post("/profile", checkAuth, uploader.single("image"), );

// const transporter = nodemailer.createTransport({
//     service:"gmail",
//     auth:{
//        user:"vaibhavisharma.sv2527@gmail.com",
//        pass: 
//     }
// })

// app.post("/contact")

app.get("/products", );


app.get("/product/:id",);



app.use((error, req, res, next) => {

    // Global Error Handling Middleware

    if (error instanceof MulterError) {
        return res.status(400).json({ message: error.code });
    }

    console.log(error)

    res.status(500).json({ message: "Something went wrong!" });

});


// app.listen(3000, () => console.log(`http://localhost:${process.env.PORT}/`));
export default app;



