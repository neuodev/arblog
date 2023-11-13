import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import emailRouter from "./routes/email";
import errorHandler from "./middleware/error";

// Server Setup
dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());

// API Endpoints
app.use("/api/v1/email", emailRouter);

app.get("/", (_req, res) => {
  res.send("server is up and running...");
});

// api error handler (should be at the very end)
app.use(errorHandler);

// Run the server
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`.bgCyan));
