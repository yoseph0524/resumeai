import React, { useEffect } from "react";
import { useAuth } from "./AuthContext"; // Adjust the path based on your structure
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const { authUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/Auth/SignIn"); // Redirect to the sign-in page if not authenticated
    }
  }, [authUser, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator while checking authentication
  }

  if (authUser) {
    return children; // Render the protected content if authenticated
  }

  return null; // Return null if not authenticated (although the redirect should already happen)
}
