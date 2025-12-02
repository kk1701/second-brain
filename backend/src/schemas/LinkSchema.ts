import mongoose, { model, Schema } from "mongoose";


const LinkSchema = new Schema({
    hash: {type: String, required: true},
    userId: {type: mongoose.Types.ObjectId, ref: 'User'}
})

export const LinkModel = model("Link", LinkSchema)
