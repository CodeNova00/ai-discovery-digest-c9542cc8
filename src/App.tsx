
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { useEffect } from "react";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Insights from "./pages/Insights";
import Explore from "./pages/Explore";
import Digest from "./pages/Digest";
import Summarizer from "./pages/Summarizer";
import Chatbot from "./pages/Chatbot";
import About from "./pages/About";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Subscription from "./pages/Subscription";
import ScrapingService from "./services/ScrapingService";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize the scraping service when the app starts
    ScrapingService.scheduleScrapingJob();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/insights" element={<Layout><Insights /></Layout>} />
              <Route path="/explore" element={<Layout><Explore /></Layout>} />
              <Route path="/digest" element={<Layout><Digest /></Layout>} />
              <Route path="/summarizer" element={<Layout><Summarizer /></Layout>} />
              <Route path="/chatbot" element={<Layout><Chatbot /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/login" element={<Layout><Login /></Layout>} />
              <Route path="/profile" element={<Layout><Profile /></Layout>} />
              <Route path="/subscription" element={<Layout><Subscription /></Layout>} />
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
