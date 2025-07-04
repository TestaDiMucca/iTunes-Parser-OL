import React, { useState } from "react";
import AuthForm from "@/components/AuthForm";
import Dashboard from "@/components/Dashboard";




function App() {
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const handleLogin = (t: string) => {
    setToken(t);
    localStorage.setItem("token", t);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setAuthMode("login");
  };

  if (!token) {
    return <AuthForm mode={authMode} onLogin={handleLogin} onSwitchMode={setAuthMode} />;
  }

  return <Dashboard token={token} onLogout={handleLogout} />;
}

export default App;
