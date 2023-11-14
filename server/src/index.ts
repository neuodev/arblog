import express from "express";
import connectDB from "./config/db";
import emailRouter from "./routes/email";
import errorHandler from "./middleware/error";
import https from "node:https";
import fs from "node:fs";
import cors from "cors";

connectDB();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Endpoints
app.use("/api/v1/email", emailRouter);

app.get("/", (_req, res) => {
  res.send("server is up and running...");
});

// api error handler (should be at the very end)
app.use(errorHandler);

const enableHttps: boolean = !!process.env.ENABLE_HTTPS;
const keyFilePath = process.env.KEY_FILE_PATH;
const certFilePath = process.env.CERT_FILE_PATH;
const chainFilePath = process.env.CHAIN_FILE_PATH;
const port = process.env.PORT || 4000;

if (enableHttps && keyFilePath && certFilePath && chainFilePath) {
  https
    .createServer(
      {
        key: fs.readFileSync(keyFilePath),
        cert: fs.readFileSync(certFilePath),
        ca: fs.readFileSync(chainFilePath),
      },
      app
    )
    .listen(443, () => console.log("Listening on 443 (https)".bgCyan));
} else {
  app.listen(port, () => console.log(`Server running on port ${port}`.bgCyan));
}
