"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config"); // Ensure JWT_SECRET is properly imported
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader;
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (err) {
        console.error('JWT verification error:', err);
        return res.status(403).json({
            message: "Invalid or expired token",
        });
    }
};
exports.authMiddleware = authMiddleware;
