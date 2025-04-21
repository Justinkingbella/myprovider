
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useSignUp } from "@clerk/clerk-react";
import { useLocation } from "wouter";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import SocialButtons from "./social-buttons";
import { userRegistrationSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import VerificationStep from "./verification-step";

export default function SignUpForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [terms, setTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showVerification, setShowVerification] = useState(false);
  
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error
    setError(null);
    
    if (!isSignUpLoaded) {
      return;
    }
    
    if (!terms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }
    
    try {
      // Reset error
      setError(null);
      
      // Custom validation to provide clearer feedback
      const passwordErrors = [];
      
      if (password.length < 8) {
        passwordErrors.push("Password must be at least 8 characters");
      }
      
      if (!/[0-9]/.test(password)) {
        passwordErrors.push("Password must contain at least one number");
      }
      
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        passwordErrors.push("Password must contain at least one special character");
      }
      
      if (passwordErrors.length > 0) {
        setError(passwordErrors.join(". "));
        return;
      }
      
      // Generate a username if not manually specified
      const username = email.split("@")[0];
      
      // Validate form using Zod schema
      try {
        userRegistrationSchema.parse({
          firstName,
          lastName,
          email,
          password,
          role,
          username
        });
      } catch (zodErr: any) {
        console.error("Validation error:", zodErr);
        if (zodErr.errors && zodErr.errors.length > 0) {
          setError(zodErr.errors[0].message);
          return;
        }
      }
      
      setIsLoading(true);
      
      // Create user with Clerk
      await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });
      
      // Prepare verification with email code
      try {
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        
        // Show verification step
        setShowVerification(true);
        
        toast({
          title: "Verification email sent",
          description: "Please check your email for a verification code.",
        });
      } catch (verificationErr: any) {
        console.error("Verification preparation error:", verificationErr);
        toast({
          title: "Error sending verification",
          description: verificationErr.message || "Please try again or contact support.",
          variant: "destructive",
        });
      }
      
    } catch (err: any) {
      console.error("Error during sign up:", err);
      if (err.errors) {
        setError(err.errors[0]?.message || "Invalid information provided");
      } else if (err.issues) {
        // Zod validation errors
        setError(err.issues[0]?.message || "Please check your information and try again");
      } else if (err.message) {
        // Clerk or other error with a message
        setError(err.message);
      } else {
        setError("There was a problem creating your account. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const navigateToSignIn = () => {
    setLocation("/sign-in");
  };
  
  // If we're in verification stage, show verification component
  if (showVerification) {
    return (
      <VerificationStep 
        email={email}
        firstName={firstName}
        lastName={lastName}
        role={role}
      />
    );
  }
  
  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form className="space-y-6" onSubmit={handleSignUp}>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <Label htmlFor="first-name">First name</Label>
            <div className="mt-1">
              <Input
                id="first-name"
                name="first-name"
                type="text"
                autoComplete="given-name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="last-name">Last name</Label>
            <div className="mt-1">
              <Input
                id="last-name"
                name="last-name"
                type="text"
                autoComplete="family-name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

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
              autoComplete="new-password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Must be at least 8 characters with at least one number and one special character
          </p>
        </div>

        <div>
          <Label htmlFor="role">Account type</Label>
          <div className="mt-1">
            <Select 
              value={role} 
              onValueChange={setRole}
              disabled={isLoading}
            >
              <SelectTrigger id="role">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">Customer</SelectItem>
                <SelectItem value="provider">Service Provider</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={terms} 
            onCheckedChange={(checked) => setTerms(checked as boolean)}
            disabled={isLoading}
          />
          <Label htmlFor="terms" className="text-sm text-gray-900">
            I agree to the{" "}
            <Button variant="link" className="p-0" onClick={() => alert("Terms of Service would be displayed here")}>
              Terms of Service
            </Button>{" "}
            and{" "}
            <Button variant="link" className="p-0" onClick={() => alert("Privacy Policy would be displayed here")}>
              Privacy Policy
            </Button>
          </Label>
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading || !isSignUpLoaded}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Create account"
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

      <SocialButtons mode="sign-up" />
      
      <div className="text-center text-sm">
        <span className="text-gray-600">Already have an account? </span>
        <Button 
          variant="link" 
          className="p-0" 
          onClick={navigateToSignIn}
          disabled={isLoading}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
}
