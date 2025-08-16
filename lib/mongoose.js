// src/lib/mongoose.js
import mongoose from "mongoose";

const { MONGODB_URI } = process.env;
if (!MONGODB_URI) throw new Error("Missing MONGODB_URI in environment");

// Reuse cached connection in dev
global._mongoose = global._mongoose || { conn: null, promise: null };
let cached = global._mongoose;

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      // no dbName here (Option A)
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

