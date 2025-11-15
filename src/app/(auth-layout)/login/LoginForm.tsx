"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
        role: "ADMIN",
      });

      if (response.success) {
        login(response.data, { email, role: "admin" });
        toast.success("Login successful!", {
          description: "Redirecting to dashboard...",
        });
        router.push("/dashboard");
      } else {
        const errorMsg = response.message || "Login failed";
        setError(errorMsg);
        toast.error("Login failed", {
          description: errorMsg,
        });
      }
    } catch (err: any) {
      const errorMsg = err.message || "An error occurred. Please try again.";
      setError(errorMsg);
      toast.error("Error", {
        description: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 w-full max-w-md">
      <div className="border p-4 rounded-md bg-muted/50">
        <p className="text-sm font-medium mb-2">Test Credentials:</p>
        <p className="text-xs text-muted-foreground">
          Email: superadmin@example.com
        </p>
        <p className="text-xs text-muted-foreground">Password: 12345678</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="border p-6 rounded-md shadow-md flex flex-col justify-center space-y-4"
      >
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        {error && (
          <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            {error}
          </div>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
