import { createClient } from "redis";

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

// Ensure the client connects when imported
client.connect().catch(err => console.error("Failed to connect to Redis", err));

export default client;
