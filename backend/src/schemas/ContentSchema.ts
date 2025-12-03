import mongoose, { model, Schema, Document } from "mongoose";

export enum ContentType {
    Image = "Image",
    Tweet = "Tweet",
    Video = "Video",
    WebDoc = "WebDoc",
}

export interface IContent extends Document {
    title: string;
    link?: string;
    type: ContentType;
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const ContentSchema = new Schema<IContent>(
    {
        title: { type: String, required: true, trim: true },
        link: { type: String },
        type: { type: String, enum: Object.values(ContentType), required: true },
        tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
        userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
    },
    {
        timestamps: true,
    }
);

ContentSchema.index({ userId: 1, type: 1 });

export const ContentModel = model<IContent>("Content", ContentSchema);