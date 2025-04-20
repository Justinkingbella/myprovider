import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

// Get the Clerk publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "";

// Check if the key is missing
if (!clerkPubKey) {
  console.error("Missing Clerk publishable key. Please set VITE_CLERK_PUBLISHABLE_KEY environment variable.");
}

// Set up clerk options
const clerkOptions = {
  // Add appearance options if needed
  appearance: {
    baseTheme: undefined, // Use default theme
  },
};

// Create the app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={clerkPubKey} 
      appearance={clerkOptions.appearance}
    >
      <App />
    </ClerkProvider>
  </StrictMode>
);
