import e from "express";
import mongoose from "mongoose";


const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true,"Title is must"],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ["pending", "in-progress", "completed"],
            default: "pending",
        },
        dueDate: {
            type: Date,
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Task", taskSchema);