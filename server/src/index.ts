import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import emailRouter from "./routes/email";

// Server Setup
dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());

// API Endpoints
app.use("/api/v1/email", emailRouter);

// Run the server
const port = process.env.PORT || 3000;
app.listen(() => console.log(`Server running on port ${port}`.bgCyan));
