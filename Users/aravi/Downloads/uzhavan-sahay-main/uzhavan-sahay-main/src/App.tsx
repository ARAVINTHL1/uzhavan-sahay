import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import VoiceAssistant from "./pages/VoiceAssistant";
import ImageAnalysis from "./pages/ImageAnalysis";
import CropAdvisory from "./pages/CropAdvisory";
import Weather from "./pages/Weather";
import SoilHealth from "./pages/SoilHealth";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import DiseaseManagement from "./pages/DiseaseManagement";
import CultivationGuide from "./pages/CultivationGuide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import ScrollToTop from "./components/ScrollToTop";

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/voice-assistant" element={<VoiceAssistant />} />
              <Route path="/image-analysis" element={<ImageAnalysis />} />
              <Route path="/crop-advisory" element={<CropAdvisory />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/soil-health" element={<SoilHealth />} />
              <Route path="/government-schemes" element={<GovernmentSchemes />} />
              <Route path="/disease-management" element={<DiseaseManagement />} />
              <Route path="/cultivation-guide" element={<CultivationGuide />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;