import admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  console.log(serviceAccount);
  if (!serviceAccount) {
    throw new Error(
      "Service account JSON path is not defined in environment variables."
    );
  }
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(req: Request) {
  const { name, token } = await req.json();

  if (!name || !token) {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
    });
  }

  try {
    // Send a message using the Firebase Admin SDK
    const message = {
      token: token,
      notification: {
        title: "New Notification",
        body: `Open the app to view: ${name}`,
      },
      android: {
        notification: {
          clickAction: `myapp://name/${name}`,
        },
      },
    };

    // Send the message
    const response = await admin.messaging().send(message);

    return new Response(
      JSON.stringify({ message: "Notification sent", response }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending message:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send notification" }),
      { status: 500 }
    );
  }
}
