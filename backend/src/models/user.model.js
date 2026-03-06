import mongoose from "mongoose";

const stateSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        default: 'sale',
        required: true,
    },

    isActive: {
        type: Boolean,
        default: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const stateModel = mongoose.model("User", stateSchema);

export default stateModel;