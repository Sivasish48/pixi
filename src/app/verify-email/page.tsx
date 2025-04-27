"use client";

import { useSignUp } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyEmailPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    setIsSubmitting(true);
    setError("");

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard");
      } else {
        setError("Verification failed. Redirecting to signup...");
        setTimeout(() => {
          router.push("/signup");
        }, 2000);
      }
    } catch (err: any) {
      setError("Verification failed. Redirecting to signup...");
      setTimeout(() => {
        router.push("/signup");
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-400 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-800">
              Verify Your Email
            </h1>
            <p className="mt-2 text-gray-600">
              Enter the verification code we sent to your email
            </p>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="verification-code"
                className="text-sm font-medium text-gray-700"
              >
                Verification Code
              </label>
              <input
                id="verification-code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-800 outline-none transition-all duration-200 focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200"
                placeholder="Enter 6-digit code"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-fuchsia-500 py-3 text-center font-bold text-white"
            >
              {isSubmitting ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          <div className="text-center text-sm">
            <Link
              href="/sign-up"
              className="font-medium text-fuchsia-600 hover:text-fuchsia-500"
            >
              Back to signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
