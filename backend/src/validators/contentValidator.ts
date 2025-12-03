import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const CreateContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  link: z.string().url("Link must be a valid URL").optional(),
  type: z.enum(["Image", "Tweet", "Video", "WebDoc"]),
  tags: z.array(z.string().regex(objectIdRegex, "Invalid tag id")).optional(),
  // userId will be derived from authenticated token; do not accept from client
  userId: z.string().regex(objectIdRegex, "Invalid user id").optional(),
});

export const GetContentsQuerySchema = z.object({
  userId: z.string().regex(objectIdRegex, "Invalid user id").optional(),
});

export const DeleteContentParamsSchema = z.object({
  id: z.string().regex(objectIdRegex, "Invalid content id"),
});

export type CreateContentRequest = z.infer<typeof CreateContentSchema>;
export type GetContentsQuery = z.infer<typeof GetContentsQuerySchema>;
export type DeleteContentParams = z.infer<typeof DeleteContentParamsSchema>;
