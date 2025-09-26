import mongoose from "mongoose";
import { MONGO_URI } from "./evn";

export async function connectDB(): Promise<void> {
  try {
    const uri = MONGO_URI;
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      dbName: "dental-ai",
    });
    console.log("Connected to MongoDB via Mongoose");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}
