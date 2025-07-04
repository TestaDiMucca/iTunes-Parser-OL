import React, { useEffect, useState } from "react";
import { pingTest } from "@/api";

interface Props {
  token: string;
  onLogout: () => void;
}

export default function Dashboard({ token, onLogout }: Props) {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await pingTest(token);
        setMessage(res);
      } catch (err) {
        console.error(err);
        setError("Failed to authenticate – please log in again.");
        onLogout();
      }
    })();
  }, [token, onLogout]);

  return (
    <main style={{ padding: "1rem" }}>
      <h1>Dashboard</h1>
      {message && <p>Welcome! Server says: {message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={onLogout}>Logout</button>
    </main>
  );
}
