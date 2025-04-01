
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/use-auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Gigs from "./pages/Gigs";
import GigDetail from "./pages/GigDetail";
import AILearningPath from "./pages/AILearningPath";
import Auth from "./pages/Auth";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import CreateGig from "./pages/CreateGig";
import EducatorResources from "./pages/EducatorResources";
import SuccessStories from "./pages/SuccessStories";
import Pricing from "./pages/Pricing";
import StudentDiscounts from "./pages/StudentDiscounts";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Press from "./pages/Press";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import SocialRedirect from "./pages/SocialRedirect";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/gigs" element={<Gigs />} />
            <Route path="/gig/:id" element={<GigDetail />} />
            <Route path="/create-gig" element={<CreateGig />} />
            <Route path="/educator-resources" element={<EducatorResources />} />
            <Route path="/success-stories/:type" element={<SuccessStories />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/student-discounts" element={<StudentDiscounts />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/press" element={<Press />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/social/:platform" element={<SocialRedirect />} />
            <Route path="/projects" element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            } />
            <Route path="/ai-path" element={
              <ProtectedRoute>
                <AILearningPath />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
