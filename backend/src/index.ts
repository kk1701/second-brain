import express from 'express';
import type { Express, Request, Response } from 'express';
import { UserModel } from './schemas/UserSchema.js';
import { connectDB } from './config/db.js';
import { configDotenv } from 'dotenv';

configDotenv();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize database connection
(async () => {
    try {
        await connectDB()
        
        app.listen(PORT, () => {
            console.log(`✓ Server running on port ${PORT}`)
        })
    } catch (error) {
        console.error("Failed to start server:", error)
        process.exit(1)
    }
})()

app.post("/api/v1/signup", async (req, res) => {
    // add zod validation, hash the password, handle 500 and other errors

    const username = req.body.username
    const password = req.body.password

    await UserModel.create({
        username: username,
        password: password
    })

    res.json({
        message: "User signed up successfully."
    })
})


app.post("/api/v1/signin", (req, res) => {

})


app.post("/api/v1/content", (req, res) => {

})


app.get("/api/v1/content", (req, res) => {

})


app.delete("/api/v1/content", (req, res) => {

})


app.post("/api/v1/brain/share", (req, res) => {

})


app.get("/api/v1/brain/:shareLink", (req, res) => {

})