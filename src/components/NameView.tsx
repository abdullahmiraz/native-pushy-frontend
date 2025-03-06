/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { generateToken } from "../lib/firebase.config";
import { toast } from "react-toastify";

export default function NameView({ name }: { name: string }) {
  const [shareUrl, setShareUrl] = useState("");

  const generateShareLink = async () => {
    try {
      const res = await fetch(`/api/share?name=${name}`);
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }
      const data = await res.json();
      console.log("Share Data:", data);
      const receivedDeepLink = data?.deepLink;

      if (!receivedDeepLink) {
        throw new Error("API did not return a deepLink");
      }

      console.log("Generated deep link:", receivedDeepLink); // Debugging
      setShareUrl(receivedDeepLink);

      // Copy to clipboard
      await navigator.clipboard.writeText(receivedDeepLink);
      toast("Link copied to clipboard!");

      // Attempt to share if not localhost
      if (navigator.share && window.location.hostname !== "localhost") {
        await navigator.share({ title: "Share", url: receivedDeepLink });
      }
    } catch (error) {
      console.error("Error generating share link:", error);
      toast("Failed to generate share link. Please try again.");
    }
  };

  // Send push notification using /api/notify
  const sendPushNotification = async () => {
    try {
      const token = await generateToken();
      if (!token) {
        toast("Push notifications are not enabled.");
        return;
      }

      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, token }),
      });

      const data = await res.json();
      console.log("Push Notification Response:", data);

      if (data.message) {
        toast("Push notification sent successfully!");
      } else {
        toast("Failed to send notification.");
      }
    } catch (error) {
      console.error("Error sending push notification:", error);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center min-h-screen gap-12">
      <div className="text-2xl space-y-4">
        <div>This page is for </div>
        <div className="font-bold italic underline">{name}</div>
      </div>
      <div>
        <Button onClick={generateShareLink}>Share Link</Button>
      </div>
      <div>
        <Button onClick={sendPushNotification}>Send Push Notification</Button>
      </div>
    </div>
  );
}
