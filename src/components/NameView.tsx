/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";

export default function NameView({ name }: { name: string }) {
  const [shareUrl, setShareUrl] = useState("");

  const generateShareLink = async () => {
    const res = await fetch(`/api/share?name=${name}`);
    const data = await res.json();
    setShareUrl(data.deepLink);

    if (navigator.share) {
      navigator.share({ title: "Share", url: data.deepLink });
    } else {
      alert(`Copy this link: ${data.deepLink}`);
    }
  };

  return (
    <main style={{ textAlign: "center", padding: 20 }}>
      <h1>This page is for {name}</h1>
      <button onClick={generateShareLink}>Share Link</button>
    </main>
  );
}
