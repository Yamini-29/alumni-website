"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  User,
  GraduationCap,
} from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-sm">
      {/* Compact brand row — mobile only */}
      <div className="mb-8 flex flex-col items-center gap-3 lg:hidden">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full border-2"
          style={{ backgroundColor: "#101E4A", borderColor: "#C9A227" }}
        >
          <GraduationCap style={{ color: "#C9A227" }} size={26} />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold tracking-wide text-slate-900">
            Thamarai International School
          </p>
          <p className="text-xs text-gray-600">Alumni Admin Portal</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
        <div
          className="h-1.5 w-full"
          style={{
            background:
              "linear-gradient(to right, #2F45A0, #9C1F63, #C9A227)",
          }}
        />

        <div className="p-8 sm:p-10">
          <h1 className="text-2xl font-semibold text-slate-900">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            Sign in to manage alumni records and outreach.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="flex items-center rounded-lg border border-slate-300 bg-white px-3.5 transition focus-within:border-[#2F45A0] focus-within:ring-2 focus-within:ring-[#2F45A0]/15">
                <User size={17} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-grey-900 outline-none placeholder:text-gray-800"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="flex items-center rounded-lg border border-slate-300 bg-white px-3.5 transition focus-within:border-[#2F45A0] focus-within:ring-2 focus-within:ring-[#2F45A0]/15">
                <Lock size={17} className="text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 transition hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              disabled={loading}
              className="flex w-full items-center justify-center rounded-lg py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
              style={{ backgroundColor: "#101E4A" }}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={16} />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}