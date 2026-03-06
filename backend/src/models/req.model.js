import mongoose from "mongoose";

const reqUserSchema = mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Property',
    },

    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    number: {
        type: String,
        required: true,

    },

    message: {
        type: String,
        required: true,
    }
})

const reqModel = mongoose.model('ReqUser', reqUserSchema)

export default reqModel;