import mongoose, { model, Schema } from "mongoose";

export enum ContentType {
    Image = "Image",
    Tweet = "Tweet",
    Video = "Video",
    WebDoc = "WebDoc",
}

const ContentSchema = new Schema({
    title: { type: String, required: true },
    link: { type: String },
    type: { type: String, enum: Object.values(ContentType), required: true },
    tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
});

export const ContentModel = model("Content", ContentSchema);