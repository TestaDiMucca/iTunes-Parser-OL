import React, { useState } from "react";
import { login, register } from "@/api";

interface Props {
  mode: "login" | "register";
  onLogin: (token: string) => void;
  onSwitchMode: (mode: "login" | "register") => void;
}

export default function AuthForm({ mode, onLogin, onSwitchMode }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        const token = await login(username, password);
        onLogin(token);
      } else {
        await register(username, password);
        alert("Registration successful. You can now log in.");
        onSwitchMode("login");
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 320, margin: "0 auto" }}>
      <h2>{mode === "login" ? "Login" : "Create Account"}</h2>
      <div style={{ marginBottom: "0.5rem" }}>
        <label>
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%" }}
          />
        </label>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit" disabled={loading} style={{ width: "100%" }}>
        {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
      </button>
      <p style={{ marginTop: "0.5rem", textAlign: "center" }}>
        {mode === "login" ? (
          <>
            No account? {" "}
            <a href="#" onClick={() => onSwitchMode("register")}>Create one</a>
          </>
        ) : (
          <>
            Have an account? {" "}
            <a href="#" onClick={() => onSwitchMode("login")}>Login</a>
          </>
        )}
      </p>
    </form>
  );
}
