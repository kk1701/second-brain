import { Router } from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../schemas/UserSchema.js";
import { SignupSchema, SigninSchema } from "../validators/authValidator.js";
import { ZodError } from "zod";

const authRouter = Router();

// Signup route
authRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        // Validate request body with Zod
        const validatedData = SignupSchema.parse(req.body);

        // Check if user already exists
        const existingUser = await UserModel.findOne({
            username: validatedData.username,
        });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists with this username",
            });
        }

        // Create new user (password will be hashed by the schema pre-save hook)
        const user = await UserModel.create({
            username: validatedData.username,
            password: validatedData.password,
        });

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET || "your-secret-key",
            { expiresIn: "7d" }
        );

        res.status(201).json({
            success: true,
            message: "User signed up successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
            },
        });
    } catch (error) {
        // Handle Zod validation errors
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.issues.map((err: any) => ({
                    field: err.path.join("."),
                    message: err.message,
                })),
            });
        }

        // Handle duplicate key error
        if ((error as any)?.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Username already exists",
            });
        }

        // Handle other errors
        console.error("Signup error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

// Signin route
authRouter.post("/signin", async (req: Request, res: Response) => {
    try {
        // Validate request body with Zod
        const validatedData = SigninSchema.parse(req.body);

        // Find user and explicitly select password field
        const user = await UserModel.findOne({
            username: validatedData.username,
        }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }

        // Compare passwords
        const isPasswordValid = await user.comparePassword(validatedData.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET || "your-secret-key",
            { expiresIn: "7d" }
        );

        res.json({
            success: true,
            message: "User signed in successfully",
            token,
            user: {
                id: user._id,
                username: user.username,
            },
        });
    } catch (error) {
        // Handle Zod validation errors
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.issues.map((err: any) => ({
                    field: err.path.join("."),
                    message: err.message,
                })),
            });
        }

        // Handle other errors
        console.error("Signin error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});

export default authRouter;
