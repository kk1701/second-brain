import mongoose, { model, Schema, Document } from "mongoose";

export interface ILink extends Document {
  hash: string;
  userId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const LinkSchema = new Schema<ILink>(
  {
    hash: { type: String, required: true, unique: true, index: true },
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export const LinkModel = model<ILink>("Link", LinkSchema);
