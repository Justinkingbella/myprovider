import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import SignInForm from "@/components/auth/sign-in";

export default function SignIn() {
  const { isSignedIn } = useUser();
  const [, setLocation] = useLocation();

  // Redirect to dashboard if already signed in
  useEffect(() => {
    if (isSignedIn) {
      setLocation("/dashboard");
    }
  }, [isSignedIn, setLocation]);

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="h-12 w-12 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold mx-auto">
          R
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <button 
            onClick={() => setLocation("/sign-up")}
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            create a new account
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardContent className="pt-6">
            <SignInForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
