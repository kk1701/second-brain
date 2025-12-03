import { Router } from "express";
import type { Request, Response } from "express";
import { ZodError } from "zod";
import crypto from "crypto";
import mongoose from "mongoose";
import { LinkModel } from "../schemas/LinkSchema.js";
import { ContentModel } from "../schemas/ContentSchema.js";
import { authMiddleware } from "../middleware/auth.js";
import type { AuthRequest } from "../middleware/auth.js";
import { ShareBrainSchema, RetrieveSharedBrainSchema } from "../validators/brainValidator.js";

const router = Router();

// Generate a unique hash for sharing
const generateHash = (): string => {
  return crypto.randomBytes(6).toString("hex");
};

// POST / - create a shareable link for user's entire brain (all content)
router.post("/share", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Validate request (currently empty, but extensible for future options)
    ShareBrainSchema.parse(req.body);

    const userIdObj = new mongoose.Types.ObjectId(userId);

    // Generate unique hash
    let hash = generateHash();
    let existingLink = await LinkModel.findOne({ hash });
    while (existingLink) {
      hash = generateHash();
      existingLink = await LinkModel.findOne({ hash });
    }

    // Create or update the link (one per user)
    const link = await LinkModel.findOneAndUpdate(
      { userId: userIdObj },
      { hash },
      { upsert: true, new: true }
    );

    const shareUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/api/v1/brain/${hash}`;

    return res.status(201).json({
      success: true,
      message: "Brain shared successfully",
      link: shareUrl,
      hash,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: err.issues.map((i: any) => ({ field: i.path.join("."), message: i.message })),
      });
    }

    console.error("Share brain error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// GET /:hash - retrieve all content for a shared brain
router.get("/:hash", async (req: Request, res: Response) => {
  try {
    const params = RetrieveSharedBrainSchema.parse(req.params);

    // Find the link by hash
    const link = await LinkModel.findOne({ hash: params.hash }).populate("userId");
    if (!link) {
      return res.status(404).json({ success: false, message: "Shared brain not found" });
    }

    // Fetch all content for this user
    const contents = await ContentModel.find({ userId: link.userId._id }).populate("tags").lean();

    return res.json({
      success: true,
      data: {
        user: {
          id: link.userId._id,
          username: (link.userId as any).username,
        },
        contents,
      },
    });
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: err.issues.map((i: any) => ({ field: i.path.join("."), message: i.message })),
      });
    }

    console.error("Retrieve shared brain error:", err);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;

