import { Router } from "express";
import type { Request, Response } from "express";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { ContentModel } from "../schemas/ContentSchema.js";
import { UserModel } from "../schemas/UserSchema.js";
import { TagModel } from "../schemas/TagSchema.js";
import {
	CreateContentSchema,
	GetContentsQuerySchema,
	DeleteContentParamsSchema,
} from "../validators/contentValidator.js";
import { authMiddleware } from "../middleware/auth.js";
import type { AuthRequest } from "../middleware/auth.js";

const router = Router();

// POST / - add content
router.post("/", authMiddleware, async (req: AuthRequest, res: Response) => {
	try {
		const data = CreateContentSchema.parse(req.body);

		// userId comes from authenticated token
		const userId = req.user?.userId;
		if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });

		const user = await UserModel.findById(userId);
		if (!user) {
			return res.status(404).json({ success: false, message: "User not found" });
		}

		const userIdObj = new mongoose.Types.ObjectId(userId);

		let tagObjectIds: mongoose.Types.ObjectId[] = [];
		if (data.tags && data.tags.length > 0) {
			tagObjectIds = data.tags.map((t) => new mongoose.Types.ObjectId(t));
			const tagsCount = await TagModel.countDocuments({ _id: { $in: tagObjectIds } });
			if (tagsCount !== tagObjectIds.length) {
				return res.status(400).json({ success: false, message: "One or more tags are invalid" });
			}
		}

		const payload: any = {
			title: data.title,
			link: data.link ?? undefined,
			type: data.type,
			tags: tagObjectIds,
			userId: userIdObj,
		};
		const created = await ContentModel.create(payload as any);

		return res.status(201).json({ success: true, content: created });
	} catch (err) {
		if (err instanceof ZodError) {
			return res.status(400).json({
				success: false,
				message: "Validation failed",
				errors: err.issues.map((i: any) => ({ field: i.path.join('.'), message: i.message })),
			});
		}

		console.error("Create content error:", err);
		return res.status(500).json({ success: false, message: "Internal server error" });
	}
});

// GET / - get contents (optionally filter by userId query)
router.get("/", async (req: Request, res: Response) => {
	try {
		const query = GetContentsQuerySchema.parse(req.query);

		const filter: any = {};
		if (query.userId) filter.userId = query.userId;

		const contents = await ContentModel.find(filter).populate("tags").lean();

		return res.json({ success: true, contents });
	} catch (err) {
		if (err instanceof ZodError) {
			return res.status(400).json({
				success: false,
				message: "Validation failed",
				errors: err.issues.map((i: any) => ({ field: i.path.join('.'), message: i.message })),
			});
		}

		console.error("Get contents error:", err);
		return res.status(500).json({ success: false, message: "Internal server error" });
	}
});

// DELETE /:id - delete a specific content by id (owner only)
router.delete("/:id", authMiddleware, async (req: AuthRequest, res: Response) => {
	try {
		const params = DeleteContentParamsSchema.parse(req.params);

		const content = await ContentModel.findById(params.id);
		if (!content) {
			return res.status(404).json({ success: false, message: "Content not found" });
		}

		const requesterId = req.user?.userId;
		if (!requesterId) return res.status(401).json({ success: false, message: "Unauthorized" });

		if (content.userId.toString() !== requesterId) {
			return res.status(403).json({ success: false, message: "Forbidden: not the content owner" });
		}

		await content.deleteOne();
		return res.json({ success: true, message: "Content deleted" });
	} catch (err) {
		if (err instanceof ZodError) {
			return res.status(400).json({
				success: false,
				message: "Validation failed",
				errors: err.issues.map((i: any) => ({ field: i.path.join('.'), message: i.message })),
			});
		}

		console.error("Delete content error:", err);
		return res.status(500).json({ success: false, message: "Internal server error" });
	}
});

export default router;