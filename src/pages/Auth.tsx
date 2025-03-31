
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Auth = () => {
  const { signIn, signUp, loading, emailConfirmationRequired, authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("signin");
  
  const from = (location.state as any)?.from?.pathname || "/";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign in attempt with:", authData.email);
    
    if (!authData.email || !authData.password) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await signIn(authData.email, authData.password);
      console.log("Sign in successful, navigating to:", from);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Sign in error:", error);
      // Error handling is already in the useAuth hook
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up attempt with:", authData.email);
    
    if (!authData.email || !authData.password) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    
    try {
      await signUp(authData.email, authData.password);
      setSignupSuccess(true);
      setActiveTab("success");
    } catch (error) {
      console.error("Sign up error:", error);
      // Error handling is already in the useAuth hook
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
        <Card className="w-full max-w-md">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <CardHeader>
              {!signupSuccess ? (
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
              ) : (
                <div className="flex justify-center">
                  <Button variant="ghost" onClick={() => {
                    setActiveTab("signin");
                    setSignupSuccess(false);
                  }}>
                    Back to Sign In
                  </Button>
                </div>
              )}
              <CardDescription className="mt-4">
                {!signupSuccess 
                  ? "Sign in to your account or create a new one to access your AI projects."
                  : "Your account has been created successfully."}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              {authError && (
                <Alert className="mb-4" variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Authentication Error</AlertTitle>
                  <AlertDescription>
                    {authError}
                  </AlertDescription>
                </Alert>
              )}
              
              {emailConfirmationRequired && !authError && (
                <Alert className="mb-4" variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Email confirmation required</AlertTitle>
                  <AlertDescription>
                    You need to confirm your email before you can sign in.
                    Check your inbox and spam folder for a confirmation link.
                  </AlertDescription>
                </Alert>
              )}
              
              <TabsContent value="signin">
                <form onSubmit={handleSignIn}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signin-email">Email</Label>
                      <Input 
                        id="signin-email"
                        name="email"
                        type="email" 
                        placeholder="Enter your email" 
                        required
                        value={authData.email}
                        onChange={handleInputChange}
                        disabled={!!authError && authError.includes("sign-ins are currently disabled")}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="signin-password">Password</Label>
                      </div>
                      <Input 
                        id="signin-password"
                        name="password"
                        type="password" 
                        placeholder="Enter your password" 
                        required
                        value={authData.password}
                        onChange={handleInputChange}
                        disabled={!!authError && authError.includes("sign-ins are currently disabled")}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loading || (!!authError && authError.includes("sign-ins are currently disabled"))}
                    >
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                    
                    {!!authError && authError.includes("sign-ins are currently disabled") && (
                      <div className="text-center text-sm text-destructive mt-2">
                        Email sign-in is currently disabled. Please contact the administrator to enable it.
                      </div>
                    )}
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSignUp}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input 
                        id="signup-email"
                        name="email"
                        type="email" 
                        placeholder="Enter your email" 
                        required
                        value={authData.email}
                        onChange={handleInputChange}
                        disabled={!!authError && authError.includes("sign-ups are currently disabled")}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input 
                        id="signup-password"
                        name="password"
                        type="password" 
                        placeholder="Create a password" 
                        required
                        value={authData.password}
                        onChange={handleInputChange}
                        disabled={!!authError && authError.includes("sign-ups are currently disabled")}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loading || (!!authError && authError.includes("sign-ups are currently disabled"))}
                    >
                      {loading ? "Creating account..." : "Sign Up"}
                    </Button>
                    
                    {!!authError && authError.includes("sign-ups are currently disabled") && (
                      <div className="text-center text-sm text-destructive mt-2">
                        Email sign-up is currently disabled. Please contact the administrator to enable it.
                      </div>
                    )}
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="success">
                <div className="space-y-4 py-4">
                  <div className="rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-5 w-5" />
                      <h3 className="font-semibold">Email confirmation required</h3>
                    </div>
                    <div className="mt-2 text-sm">
                      <p>
                        Please check your email ({authData.email}) for a confirmation link. 
                        You need to confirm your email before you can sign in.
                      </p>
                      <p className="mt-2">
                        If you don't see the email, check your spam folder.
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setActiveTab("signin");
                      setSignupSuccess(false);
                    }}
                  >
                    Return to Sign In
                  </Button>
                </div>
              </TabsContent>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-gray-500">
                By continuing, you agree to our Terms of Service and Privacy Policy.
              </div>
            </CardFooter>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

export default Auth;
