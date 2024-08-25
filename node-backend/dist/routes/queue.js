"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redisClient_1 = __importDefault(require("../redisClient"));
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
router.post("/submit", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { problemId, code, language } = req.body;
    if (!problemId || !code || !language) {
        return res.status(400).send("Missing required fields.");
    }
    try {
        if (!redisClient_1.default.isOpen) {
            yield redisClient_1.default.connect();
        }
        yield redisClient_1.default.lPush("problems", JSON.stringify({ code, language, problemId }));
        // here we can store the data in the database
        res.status(200).send("Submission received and stored.");
    }
    catch (error) {
        console.error("Redis error:", error);
        res.status(500).send("Failed to store submission.");
    }
}));
exports.default = router;
