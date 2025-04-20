import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css";

// Get the Clerk publishable key directly from the environment
const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;

// Output debug information
if (!publishableKey) {
  console.error("Missing VITE_CLERK_PUBLISHABLE_KEY");
} else {
  console.log("ClerkProvider initializing with key", publishableKey.substring(0, 8) + "...");
}

// Create the app with minimal Clerk configuration
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={publishableKey}>
      <App />
    </ClerkProvider>
  </StrictMode>
);
