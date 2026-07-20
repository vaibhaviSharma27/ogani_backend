import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must contain at least 3 letters"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        validate: [(value) => {
            const pattern = /^[A-Za-z0-9._]+@[A-Za-z]+\.[a-zA-Z]{2,}$/
            return pattern.test(value);
        }, "Please provide a valid email address!"]

    },
    phone: {
        type: String,
        unique: true
    },
    password: String,

    address: {
        type: String,
        required: [true, "Address is required"],
    },
    profile: String
});

const User = mongoose.model("users", userSchema);

export default User;

