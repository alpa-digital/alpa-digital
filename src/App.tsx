import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PoliticaCookies from "./pages/PoliticaCookies";
import ServicePage from "@/components/pages/ServicePage";
import ServicesIndexPage from "@/components/pages/ServicesIndexPage";
import ZonesPage from "@/components/pages/ZonesPage";
import LocationPage from "@/components/pages/LocationPage";
import SectorPage from "@/components/pages/SectorPage";
import SectorsIndexPage from "@/components/pages/SectorsIndexPage";
import CookieConsent from "@/components/CookieConsent";
import { useRouteSeo } from "@/hooks/useRouteSeo";
import { useAnalytics } from "@/lib/analytics";

const queryClient = new QueryClient();

const RouteEffects = () => {
  useRouteSeo();
  useAnalytics();
  return null;
};

/** Árbol de la aplicación. El router lo aporta main.tsx (navegador) o entry-server.tsx (prerenderizado). */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouteEffects />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/servicios" element={<ServicesIndexPage />} />
        <Route path="/servicios/:serviceSlug" element={<ServicePage />} />
        <Route path="/sectores" element={<SectorsIndexPage />} />
        <Route path="/sectores/:sectorSlug" element={<SectorPage />} />
        <Route path="/zonas" element={<ZonesPage />} />
        <Route path="/automatizacion-ia/:provinceSlug" element={<LocationPage />} />
        <Route path="/automatizacion-ia/:provinceSlug/:municipalitySlug" element={<LocationPage />} />
        <Route path="/politica-cookies" element={<PoliticaCookies />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <CookieConsent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
