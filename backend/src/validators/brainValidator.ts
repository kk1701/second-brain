import { z } from "zod";

const hashRegex = /^[a-z0-9]{6,}$/;

export const ShareBrainSchema = z.object({
  // userId will be derived from auth middleware
});

export const RetrieveSharedBrainSchema = z.object({
  hash: z.string().regex(hashRegex, "Invalid hash format"),
});

export type ShareBrainRequest = z.infer<typeof ShareBrainSchema>;
export type RetrieveSharedBrainParams = z.infer<typeof RetrieveSharedBrainSchema>;
