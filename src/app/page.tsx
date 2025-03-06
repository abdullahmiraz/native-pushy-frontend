/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { generateToken, messaging } from "../lib/firebase.config";
import { onMessage } from "firebase/messaging";
import { toast } from "react-toastify";

export default function Home() {
  const [names, setNames] = useState<string[]>([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetch("/api/names")
      .then((res) => res.json())
      .then((data) => setNames(data.map((item: any) => item.name)));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && messaging) {
      generateToken();
      onMessage(messaging, (payload) => {
        // console.log("Message received. ", payload);
        toast(payload.notification?.body || "Not found message");
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const res = await fetch("/api/names", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });

    if (res.ok) {
      setNames([...names, newName]);
      setNewName("");
    }
  };

  return (
    <main style={{ textAlign: "center", padding: 20 }}>
      <h1>Admin Dashboard</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Enter Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>

      <h2>Generated Pages:</h2>
      <ul>
        {names.map((name) => (
          <li key={name}>
            <a href={`/name/${name}`}>{`domain.com/name/${name}`}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}
