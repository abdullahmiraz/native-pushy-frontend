import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, token } = await req.json();

  if (!name || !token) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const response = await fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      Authorization: `key=YOUR_SERVER_KEY`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: token,
      notification: {
        title: "New Notification",
        body: `Open the app to view: ${name}`,
        click_action: `myapp://name/${name}`,
      },
    }),
  });

  return NextResponse.json({ message: "Notification sent", response: await response.json() });
}
