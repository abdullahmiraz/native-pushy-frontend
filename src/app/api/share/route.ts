import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const deepLink = `myapp://name/${name}`;
  const webFallback = `http://localhost:3000/name/${name}`;

  return NextResponse.json({ deepLink, webFallback });
}
