import { connectDB } from "@/lib/mongodb";
import { Schema, model, models } from "mongoose";
import { NextResponse } from "next/server";

// Define Name Schema
const NameSchema = new Schema(
  { name: { type: String, unique: true } },
  { timestamps: true }
);
const Name = models.Name || model("Name", NameSchema);

// GET all names
export async function GET() {
  await connectDB();
  const names = await Name.find({});
  return NextResponse.json(names);
}

// POST a new name
export async function POST(req: Request) {
  await connectDB();
  const { name } = await req.json();

  // if similar name found then send error
  const similarName = await Name.findOne({ name });
  if (similarName)
    return NextResponse.json(
      { error: "Name already exists" },
      {
        status: 400,
      }
    );

  if (!name)
    return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const newName = new Name({ name });
  await newName.save();

  return NextResponse.json(newName);
}
