export interface AuthResponse {
  token: string;
}

export async function login(username: string, password: string): Promise<string> {
  const res = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    throw new Error("Invalid credentials");
  }
  const data: AuthResponse = await res.json();
  return data.token;
}

export async function register(username: string, password: string): Promise<void> {
  const res = await fetch("/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    throw new Error("Registration failed");
  }
}

export async function pingTest(token: string): Promise<string> {
  const res = await fetch("/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Unauthorized");
  }
  return await res.text();
}
