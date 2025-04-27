// pages/feed/page.tsx
"use client";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const FeedPage = () => {
  const { isLoaded, isSignedIn, userId } = useAuth(); // Fetch authentication status and user
  const router = useRouter();

  useEffect(() => {
    // Redirect unauthenticated users to the login page
    if (isLoaded && !userId && !isSignedIn) {
      router.push("/log-in");
    }
  }, [isLoaded, userId, isSignedIn, router]);

  // Wait until user info is loaded before rendering the page content
  if (!isLoaded || !userId) {
    return <div>Loading...</div>; // Show a loading spinner or placeholder
  }

  return (
    <div>
      <h1>Feed Page</h1>

      {/* Render the actual content here */}
    </div>
  );
};

export default FeedPage;
