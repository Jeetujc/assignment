import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true,"UserName is must"],
            unique: [true,"UserName must be unique"],
            trim: true,
        },
        email: {
            type: String,
            required: [true,"Email is must"],
            unique: [true,"Email must be unique"],
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true,"Password is must"],
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);