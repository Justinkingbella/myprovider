
import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
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
  const { signUp } = useSignUp();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleVerification = async () => {
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
      
      if (verificationResult?.status === "complete") {
        // Create user in database
        await apiRequest("POST", "/api/users", {
          username: email.split("@")[0],
          email,
          firstName,
          lastName,
          clerkId: verificationResult.createdUserId,
          role,
        });
        
        toast({
          title: "Account verified!",
          description: "Your account has been verified successfully.",
        });
        
        // Redirect to dashboard
        setLocation("/dashboard");
      }
    } catch (err: any) {
      console.error("Verification error:", err);
      toast({
        title: "Verification failed",
        description: err.message || "Please check your code and try again.",
        variant: "destructive",
      });
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
