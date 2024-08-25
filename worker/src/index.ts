import { createClient } from "redis";
const client = createClient();

async function processSubmission(submission: string) {
    try {
        const { problemId, code, language } = JSON.parse(submission);

        console.log(`Processing submission for problemId ${problemId}...`);
        console.log(`Code: ${code}`);
        console.log(`Language: ${language}`);
        // Here you would add your actual processing logic

        // The processSubmission function handles the processing of each request sequentially. You simulate processing with a delay, 
        // which is good for testing. In a real scenario, you'd replace this with actual logic.
        await new Promise(resolve => setTimeout(resolve, 4000));
        console.log(`Finished processing submission for problemId ${problemId}.`);
    } catch (error) {
        console.error("Failed to process submission:", error);
        // Additional error handling logic can go here
    }
}

async function startWorker() {

    try {
        await client.connect();
        console.log("Worker connected to Redis.");

        // Main loop
        while (true) {
            try {
                const submission:any = await client.brPop("problems", 0);
                await processSubmission(submission.element);
            } catch (error) {
                console.error("Error processing submission:", error);
                // we can do error handling logic here. For example, we might want to push
                // the submission back onto the queue or log the error to a file.
            }
        }
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
}

startWorker();

