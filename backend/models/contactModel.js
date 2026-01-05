import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name: {
            type: String,
            required: [true, "Please add contact name"],
        },
        email: {
            type: String,
            required: [true, "Please add contact email"],
        },
        phone: {
            type: String,
            required: [true, "Please add contact Phone Number"],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Contact", contactSchema);