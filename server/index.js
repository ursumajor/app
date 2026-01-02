import express from "express";
const app = express();
import cors from "cors";
import pool from "./db.js";
import dataRouter from "./routes/dataRoutes.js";
import awsRouter from "./routes/awsRoutes.js"
import profileRouter from "./routes/profileRoutes.js"

app.use(cors());
app.use(express.json());

app.use("/data", dataRouter)
app.use("/aws", awsRouter)
app.use("/profile",profileRouter)

const server = app.listen(5000, () => {
    console.log("server has started on port 5000")
});

process.on('SIGINT', () => {
    console.log("Received SIGINT. Closing server gracefully...");
    server.close(() => {
        console.log("Server closed.");
        pool.end(); // Ensure DB connections are closed
        process.exit(0);
    });
});

process.on('SIGTERM', () => {
    console.log("Received SIGTERM. Closing server gracefully...");
    server.close(() => {
        console.log("Server closed.");
        pool.end(); // Ensure DB connections are closed
        process.exit(0);
    });
});