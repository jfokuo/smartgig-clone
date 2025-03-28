
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

const Auth = () => {
  const { signIn, signUp, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  
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
      toast({
        title: "Check your email",
        description: "We've sent you a confirmation link. Please check your email and follow the instructions.",
      });
    } catch (error) {
      console.error("Sign up error:", error);
      // Error handling is already in the useAuth hook
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-4">
        <Card className="w-full max-w-md">
          <Tabs defaultValue="signin">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <CardDescription className="mt-4">
                Sign in to your account or create a new one to access your AI projects.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
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
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
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
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Creating account..." : "Sign Up"}
                    </Button>
                  </div>
                </form>
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
