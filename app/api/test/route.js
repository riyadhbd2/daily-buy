import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    return NextResponse.json({
        success: true,
        message: "Connected to MongoDB successfully"
    })
}