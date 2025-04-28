"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import PinkLoader from "../component/Loader";

export default function CustomLogin() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // 👈 ADD loading state

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) return;

    setLoading(true); // 👈 Start loading before API call
    try {
      const result = await signIn.create({ identifier: email, password });
      await setActive({ session: result.createdSessionId });
      router.push("/feed"); // Redirect after login
    } catch (err) {
      console.error(err);
      setLoading(false); // 👈 Stop loading if error
    }
  }

  // 👇 Loading screen
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-400">
        <PinkLoader />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-400 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-800">
              Welcome Back To Pixi
            </h1>
            <p className="mt-2 text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-fuchsia-600 hover:text-fuchsia-500"
              >
                Sign up
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-800 outline-none transition-all duration-200 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "password" : "text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-800 outline-none transition-all duration-200 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={showPassword ? "Show password" : "Hide password"}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full overflow-hidden rounded-md bg-fuchsia-500 py-3 text-center font-bold text-white transition-all duration-300"
            >
              <span className="relative z-10">Log In</span>
              <span className="absolute inset-0 -z-10 translate-y-full transform bg-pink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
