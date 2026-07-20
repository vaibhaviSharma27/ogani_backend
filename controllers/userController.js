
import multer, { MulterError } from "multer";
import path from "path";
import { v2 as cloudinary, } from "cloudinary";
import streamifier from "streamifier"
import { checkAuth } from "../controllers/authController.js";

export function Profile (req, res){
    res.status(200).json({ message: req.user });
};
const uploader = multer({
    storage: multer.memoryStorage()
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

});

function uploadToCloud(fileBuffer) {
    return new Promise((res, rej) => {
        //Upload to cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "profile",
                resource_type: "image",
            },

            (error, result) => {
                if (error) rej(error);
                else res(result);
            }
        );
        // image is not sent as a whole object sent through small bytes in ram through pipe
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    })
}

export async function updateProfile(req, res) {
    try {

        if (!req.file)
            throw new Error();

        const allowedMimeTypes = ["image/jpg", "image/jpeg", "image/png"];

        const filetype = await fileTypeFromBuffer(req.file.buffer);
        if (!allowedMimeTypes.includes(filetype.mime)) {
            return res.status(400).json({ message: "Only JPG, PNG and JPEG images are allowed..." })
        }

        const result = await uploadToCloud(req.file.buffer);
        req.user.profile = result.url;
        await req.user.save();
        res.status(200).json({ message: req.user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong!!" });

    }
}