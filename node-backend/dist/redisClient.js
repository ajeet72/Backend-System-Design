"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const client = (0, redis_1.createClient)();
client.on('error', (err) => console.log('Redis Client Error', err));
// Ensure the client connects when imported
client.connect().catch(err => console.error("Failed to connect to Redis", err));
exports.default = client;
