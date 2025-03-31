import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  emailConfirmationRequired: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [emailConfirmationRequired, setEmailConfirmationRequired] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state change event:", event);
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session ? "User is logged in" : "No active session");
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        console.error("Sign up error from Supabase:", error);
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      console.log("Sign up response:", data);
      
      // Check if email confirmation is required
      if (data.user && data.user.identities && data.user.identities.length === 0) {
        toast({
          title: "Email already registered",
          description: "This email is already registered. Please sign in instead.",
          variant: "destructive",
        });
        return;
      }
      
      // If no session is created, email confirmation is required
      if (!data.session) {
        setEmailConfirmationRequired(true);
        toast({
          title: "Account created",
          description: "Check your email for the confirmation link before signing in.",
        });
      } else {
        // User was automatically signed in (email confirmation disabled)
        toast({
          title: "Account created",
          description: "You have been automatically signed in.",
        });
      }
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("Attempting to sign in with:", email);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error("Sign in error from Supabase:", error);
        
        // Special handling for unconfirmed emails
        if (error.message === "Invalid login credentials") {
          // Check if the user exists but hasn't confirmed their email
          const { data: checkData } = await supabase.auth.signUp({ email, password });
          
          if (checkData.user && checkData.user.identities && checkData.user.identities.length === 0) {
            // User exists but email might not be confirmed
            toast({
              title: "Email confirmation required",
              description: "Please check your email and confirm your account before signing in. Check your spam folder if you can't find the email.",
              variant: "destructive",
            });
            setEmailConfirmationRequired(true);
            return;
          } else {
            // Regular invalid credentials
            toast({
              title: "Sign in failed",
              description: "Invalid email or password. Please try again.",
              variant: "destructive",
            });
          }
        } else {
          // Other errors
          toast({
            title: "Sign in failed",
            description: error.message,
            variant: "destructive",
          });
        }
        throw error;
      }
      
      console.log("Sign in successful:", data);
      toast({
        title: "Welcome back",
        description: "You are now signed in.",
      });
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "An error occurred while signing out.",
        variant: "destructive",
      });
      console.error("Sign out error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      session, 
      user, 
      signUp, 
      signIn, 
      signOut, 
      loading,
      emailConfirmationRequired 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
