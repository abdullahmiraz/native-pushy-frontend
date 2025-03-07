import axios from "axios";
import React from "react";
import { Button } from "./ui/button";

export const PushNotiSender = () => {
  const handleClick = async (title: string) => {
    const url = "https://app.nativenotify.com/api/notification";
    const data = {
      appId: 28064,
      appToken: "tZYzycV2rQUwAJDI5C91yc",
      title: `${title}`,
      body: "Push message here as a string",
      dateSent: "3-7-2025 9:02PM",
      pushData: {
        key1: "value1",
        key2: "value2",
      },
      bigPicuture: "https://www.example.com/image",
    };

    try {
      const response = await axios.post(url, data);
      console.log("Push notification sent:", response.data);
    } catch (error) {
      console.error("Error sending push notification:", error);
    }
  };

  return (
    <div>
      <h1>Push Notification Sender</h1>
      <Button onClick={() => handleClick("Hello")}>
        Send Push Notification
      </Button>
    </div>
  );
};
