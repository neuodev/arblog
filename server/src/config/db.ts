import mongoose from "mongoose";
import "colors";

async function connectDB(): Promise<void> {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("Missing mongo URI");
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.error(
      `Error: ${error instanceof Error ? error.message : error}`.red.underline
        .bold
    );
    process.exit(1);
  }
}

export default connectDB;
