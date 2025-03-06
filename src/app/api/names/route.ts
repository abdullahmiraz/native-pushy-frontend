import { connectDB } from "@/lib/mongodb";
import { Schema, model, models } from "mongoose";
import { NextResponse } from "next/server";

// Define Name Schema
const NameSchema = new Schema(
  { name: { type: String, unique: true } },
  { timestamps: true }
);
const Name = models.Name || model("Name", NameSchema);

// CORS Headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Allow all domains (change this in production)
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}

// GET all names
export async function GET() {
  await connectDB();
  const names = await Name.find({});
  return NextResponse.json(names, { headers: corsHeaders });
}

// POST a new name
export async function POST(req: Request) {
  await connectDB();
  const { name } = await req.json();

  // Check if name already exists
  const similarName = await Name.findOne({ name });
  if (similarName) {
    return NextResponse.json(
      { error: "Name already exists" },
      { status: 400, headers: corsHeaders }
    );
  }

  if (!name) {
    return NextResponse.json(
      { error: "Name is required" },
      { status: 400, headers: corsHeaders }
    );
  }

  const newName = new Name({ name });
  await newName.save();

  return NextResponse.json(newName, { headers: corsHeaders });
}
