import express from "express";
import client from "../redisClient";
import { authMiddleware } from "../middleware";

const router = express.Router();

router.post("/submit", authMiddleware, async (req, res) => {
    const { problemId, code, language } = req.body;

    if (!problemId || !code || !language) {
        return res.status(400).send("Missing required fields.");
    }

    try {
        if (!client.isOpen) {
            await client.connect();
        }
        await client.lPush("problems", JSON.stringify({ code, language, problemId }));
        // here we can store the data in the database
        res.status(200).send("Submission received and stored.");
    } catch (error) {
        console.error("Redis error:", error);
        res.status(500).send("Failed to store submission.");
    }
});

export default router;
