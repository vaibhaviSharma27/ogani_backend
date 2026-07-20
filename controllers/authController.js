import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import User from "../models/UserModel.js";

export async function Signup (req, res){
    try {
        let { name, email, phone, password, address } = req.body;
        password = await bcrypt.hash(password, 12);
        const createdUser = await User.create({ name, email, phone, password, address });
        if (!createdUser)
            throw new Error("Could not process your request at the moment")

        res.status(201).json({ message: createdUser });
    } catch (error) {
        if (error.name == "ValidationError") {
            // fields = Object.keys(error.errors) => ["name", "email", ...]
            // fields.map(field=>error.errors[field].message) => ["Name must contain at least 3 letters", "Please provide ..."]
            const messages = Object.keys(error.errors).map(el => error.errors[el].message)
            console.log(messages);
            res.status(400).json({ message: messages });
        } else if (error.code == 11000) {
            const errObj = error.keyValue;
            const field = Object.keys(errObj)[0]
            const value = errObj[field]

            res.status(400).json({ message: `The ${field} ${value} has already been taken!` });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

export async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        console.log(email);
        if (!user)
            throw new Error("Invalid Credentials!");

        const correctPass = await bcrypt.compare(password, user.password);

        if (!correctPass)
            throw new Error("Invalid Credentials");

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
        res.cookie("jwt", token, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: "None" });

        // maxAge is the expiry of the cookie and is stored in milliseconds only .

        // and httpOnly is for cookie can not be changed through javascript like modification is not possible through js means and returns empty string when tried to access.

        res.status(200).json({ message: "logged in!!", token })

    } catch (error) {
        console.log(error);
        // data and hash values are required!!
        res.status(400).json({ message: error.message });

    }
};

export async function checkAuth(req, res, next) {
    //middleware
    try {
        const token = req.cookies.jwt;
        if (!token)
            return res.status(401).json({ message: "Please login!!" });

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const userId = payload.userId;
        const user = await User.findById(userId);
        if (!user) {
            // clear the cookie
            throw new Error("You should not be here!!");
        }

        req.user = user;
        next();

    } catch (error) {
        if (error.name == "JsonWebTokenError" || error.name == "TokenExpiredError") {

            res.cookie("jwt", "", { maxAge: 1000 });
            return res.status(401).json({ message: "You should not be here!!" });
        }
        res.status(500).json({ message: "Something went wrong!!" });
        console.log(error);

    }
};

export function logout(req, res){
    res.cookie("jwt", "");
    res.status(200).json({ message: "Logged out!!" })
};
