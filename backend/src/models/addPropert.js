import mongoose from "mongoose";


const propertSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    price: {
        type: String,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    purpose: {
        type: String,
        enum: ["rent", "sale"],
        required: true,
    },

    images: {
        type: [String],
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },

    isActive: {
        type: Boolean,
        default: true,
    }
})

const productModel = mongoose.model("Property", propertSchema)

export default productModel;