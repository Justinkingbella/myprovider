import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

// Get the Clerk publishable key from environment variables
// Using a function to ensure we get a fresh reference to the environment variable
const getClerkPubKey = () => {
  const key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  
  // Verify that the key exists to prevent runtime errors
  if (!key) {
    console.error("Missing Clerk publishable key. Please set VITE_CLERK_PUBLISHABLE_KEY environment variable.");
    return "";
  }
  
  return key;
};

const clerkPubKey = getClerkPubKey();

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <App />
  </ClerkProvider>
);
