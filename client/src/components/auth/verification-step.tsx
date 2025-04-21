import { useState, useEffect } from "react";
import { useSignUp, useClerk } from "@clerk/clerk-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface VerificationStepProps {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export default function VerificationStep({ 
  email, 
  firstName, 
  lastName,
  role 
}: VerificationStepProps) {
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signUp } = useSignUp();
  const clerk = useClerk();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check if signUp status is already complete
    if (signUp?.status === "complete" && signUp?.createdUserId) {
      handleSuccessfulVerification(signUp.createdUserId);
    }
  }, [signUp?.status]);

  const handleSuccessfulVerification = async (userId: string) => {
    try {
      // Create user in database
      await apiRequest("POST", "/api/users", {
        username: email.split("@")[0],
        email,
        firstName,
        lastName,
        clerkId: userId,
        role,
      });
    } catch (dbErr: any) {
      console.error("Database error:", dbErr);
      // Likely the user already exists, which is fine
    } finally {
      toast({
        title: "Account verified!",
        description: "Your account has been created successfully.",
      });
      
      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1500);
    }
  };

  const handleVerification = async () => {
    setError(null);
    if (!verificationCode) {
      toast({
        title: "Verification code required",
        description: "Please enter the verification code from your email",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsVerifying(true);

      // Attempt verification with the code
      const verificationResult = await signUp?.attemptEmailAddressVerification({
        code: verificationCode,
      });

      console.log("Verification result:", verificationResult);

      if (verificationResult?.status === "complete") {
        await handleSuccessfulVerification(verificationResult.createdUserId || "");
      } else {
        setError("Invalid verification code");
        toast({
          title: "Verification incomplete",
          description: "Please check your code and try again.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      
      // Check for "already verified" error, which is actually a success case
      if (err.message && err.message.includes("already been verified")) {
        try {
          // If already verified, try to sign in directly
          if (signUp?.createdUserId) {
            await handleSuccessfulVerification(signUp.createdUserId);
          } else {
            toast({
              title: "Already verified",
              description: "Your account is verified. Please sign in.",
            });
            setTimeout(() => {
              window.location.href = "/sign-in";
            }, 1500);
          }
        } catch (signInErr) {
          console.error("Sign in error:", signInErr);
          // Redirect to sign-in page
          setTimeout(() => {
            window.location.href = "/sign-in";
          }, 1500);
        }
      } else if (err.errors && err.errors.length > 0) {
        setError(err.errors[0].message || "Invalid verification code");
      } else if (err.message) {
        setError(err.message);
      } else {
        setError("Failed to verify code. Please try again.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Verify your email</h3>
      <p className="text-sm text-gray-500">
        We've sent a verification code to <strong>{email}</strong>. 
        Please enter it below to complete your registration.
      </p>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Input
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
        placeholder="Verification code"
        className="w-full"
        disabled={isVerifying}
        autoFocus
      />
      <Button 
        className="w-full"
        onClick={handleVerification}
        disabled={isVerifying}
      >
        {isVerifying ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Verifying...
          </>
        ) : (
          "Verify Email"
        )}
      </Button>
    </div>
  );
}