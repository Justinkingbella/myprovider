import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useSignIn } from "@clerk/clerk-react";
import { useLocation } from "wouter";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SocialButtons from "./social-buttons";

export default function SignInForm() {
  const [email, setEmail] = useState("antoniojoaquimjustino@gmail.com");
  const [password, setPassword] = useState("Mariabella7753M@AJ");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error
    setError(null);

    if (!isSignInLoaded) {
      toast({
        title: "Authentication loading",
        description: "Please wait while the authentication system initializes.",
      });
      return;
    }

    try {
      setIsLoading(true);

      console.log("Starting sign in with email:", email);

      // Basic validation
      if (!email || !email.includes('@')) {
        setError("Please enter a valid email address");
        setIsLoading(false);
        return;
      }

      if (!password || password.length < 8) {
        setError("Password must be at least 8 characters");
        setIsLoading(false);
        return;
      }

      // Attempt to sign in
      const result = await signIn.create({
        identifier: email,
        password,
      });

      console.log("Sign in result status:", result.status);

      if (result.status === "complete") {
        setEmail("");
        setPassword("");
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });

        // Redirect to dashboard
        setLocation("/dashboard");
      } else {
        // This shouldn't happen with identifier + password
        console.log("Sign in not complete. Status:", result.status);
        setError("There was a problem signing in. Please try again.");
      }
    } catch (err: any) {
      console.error("Error during sign in:", err);

      // More detailed error handling
      if (err.errors && err.errors.length > 0) {
        setError(err.errors[0].message);
      } else {
        setError("Authentication failed. Please check your credentials and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSignUp = () => {
    setLocation("/sign-up");
  };

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form className="space-y-6" onSubmit={handleSignIn}>
        <div>
          <Label htmlFor="email">Email address</Label>
          <div className="mt-1">
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <div className="mt-1">
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember-me" 
              checked={rememberMe} 
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              disabled={isLoading}
            />
            <Label htmlFor="remember-me" className="text-sm text-gray-900">
              Remember me
            </Label>
          </div>

          <div className="text-sm">
            <Button variant="link" className="p-0" onClick={() => alert("Forgot password functionality would be handled by Clerk")}>
              Forgot your password?
            </Button>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading || !isSignInLoaded}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            Or continue with
          </span>
        </div>
      </div>

      <SocialButtons mode="sign-in" />

      <div className="text-center text-sm">
        <span className="text-gray-600">Don't have an account? </span>
        <Button 
          variant="link" 
          className="p-0" 
          onClick={navigateToSignUp}
          disabled={isLoading}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
}