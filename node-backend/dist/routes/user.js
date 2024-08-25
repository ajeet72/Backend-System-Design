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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prismaClient_1 = __importDefault(require("../prismaClient"));
const router = express_1.default.Router();
const config_1 = require("../config");
//  this is the singup in route
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send('Name, Email and password are required.');
    }
    try {
        const existingUser = yield prismaClient_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).send('User already exists.');
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield prismaClient_1.default.user.create({
            data: { name, email, password: hashedPassword },
        });
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id, }, config_1.JWT_SECRET);
        res.json({
            message: "User created successfully",
            token: token,
        });
    }
    catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Internal server error.');
    }
}));
//  this is the singin in route
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }
    try {
        const user = yield prismaClient_1.default.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).send('Invalid credentials.');
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Invalid credentials.');
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, }, config_1.JWT_SECRET);
        res.json({
            message: "User signed in successfully",
            token: token,
        });
    }
    catch (error) {
        console.error('Error during signin:', error);
        res.status(500).send('Internal server error.');
    }
}));
exports.default = router;
