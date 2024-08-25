import express from "express";
import userRoutes from "./routes/user";
import queueRoutes from "./routes/queue";
import promClient from "prom-client";

// Collect default metrics
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics({ register: promClient.register });


const app = express();
app.use(express.json());

// Register your routes
app.use('/users', userRoutes);
app.use('/queue', queueRoutes);

// Metrics endpoint
app.get('/metrics', async (req, res) => {
    res.setHeader("Content-Type", promClient.register.contentType);
    res.send(await promClient.register.metrics());
});

// Start the server
app.listen(4000, () => {
    console.log(`Server is running on port 4000`);
});
