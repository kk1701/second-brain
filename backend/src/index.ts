import express from 'express';
import type { Express, Request, Response } from 'express';
import { UserModel } from './schemas/UserSchema.js';
import { connectDB } from './config/db.js';
import { configDotenv } from 'dotenv';
import authRouter from './routes/authRoutes.js';
import contentRouter from './routes/contentRoutes.js';

configDotenv();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use('/api/v1/content', contentRouter);

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





app.post("/api/v1/brain/share", (req, res) => {

})


app.get("/api/v1/brain/:shareLink", (req, res) => {

})