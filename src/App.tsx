import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DataProvider } from "@/app/providers/DataProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import PublicLayout from "@/components/PublicLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tramites from "./pages/Tramites";
import BandejaSolicitudes from "./pages/admin/BandejaSolicitudes";
import Noticias from "./pages/Noticias";
import NotFound from "./pages/NotFound";
import PublicNoticias from "./pages/public/PublicNoticias";
import PublicNoticiaDetalle from "./pages/public/PublicNoticiaDetalle";
import PublicTramites from "./pages/public/PublicTramites";
import Inicio from "./pages/public/Inicio";
import SolicitarTramite from "./pages/public/SolicitarTramite";
import Seguimiento from "./pages/public/Seguimiento";
import Parroquia from "./pages/public/Parroquia";
import Organizacion from "./pages/public/Organizacion";
import Eventos from "./pages/public/Eventos";
import EventoDetalle from "./pages/public/EventoDetalle";
import Transparencia from "./pages/public/Transparencia";
import ParroquiaAdmin from "./pages/ParroquiaAdmin";
import OrganizacionAdmin from "./pages/OrganizacionAdmin";
import ComisionesAdmin from "./pages/ComisionesAdmin";
import MarcoLegalAdmin from "./pages/MarcoLegalAdmin";
import TransparenciaAdmin from "./pages/TransparenciaAdmin";
import EventosAdmin from "./pages/EventosAdmin";
import ComunicadosAdmin from "./pages/ComunicadosAdmin";
import TurismoAdmin from "./pages/TurismoAdmin";
import DocumentosAdmin from "./pages/DocumentosAdmin";
import ReportesAdmin from "./pages/ReportesAdmin";
import ConfiguracionAdmin from "./pages/ConfiguracionAdmin";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DataProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes with layout */}
                <Route path="/" element={<PublicLayout />}>
                  <Route index element={<Index />} />
                  <Route path="public/inicio" element={<Inicio />} />
                  <Route path="public/noticias" element={<PublicNoticias />} />
                  <Route path="public/noticias/:id" element={<PublicNoticiaDetalle />} />
                  <Route path="public/tramites" element={<PublicTramites />} />
                  <Route path="public/tramites/solicitar/:tramiteId" element={<SolicitarTramite />} />
                  <Route path="public/seguimiento" element={<Seguimiento />} />
                  <Route path="public/parroquia" element={<Parroquia />} />
                  <Route path="public/organizacion" element={<Organizacion />} />
                  <Route path="public/marco-legal" element={<div className="container mx-auto px-4 py-8"><h1 className="text-4xl font-bold mb-4">Marco Legal</h1><p className="text-muted-foreground">Normativa y reglamentos vigentes. Módulo en desarrollo.</p></div>} />
                  <Route path="public/transparencia" element={<Transparencia />} />
                  <Route path="public/rendicion" element={<Transparencia />} />
                  <Route path="public/presupuesto" element={<Transparencia />} />
                  <Route path="public/licitaciones" element={<Transparencia />} />
                  <Route path="public/eventos" element={<Eventos />} />
                  <Route path="public/eventos/:id" element={<EventoDetalle />} />
                  <Route path="public/turismo" element={<div className="container mx-auto px-4 py-8"><h1 className="text-4xl font-bold mb-4">Turismo y Cultura</h1><p className="text-muted-foreground">Lugares turísticos y patrimonio cultural. Módulo en desarrollo.</p></div>} />
                </Route>

                {/* Auth routes (no layout) */}
                <Route path="/login" element={<Login />} />
                
                {/* Protected admin routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="institucional/parroquia" element={<ParroquiaAdmin />} />
                  <Route path="institucional/organizacion" element={<OrganizacionAdmin />} />
                  <Route path="institucional/comisiones" element={<ComisionesAdmin />} />
                  <Route path="institucional/marco-legal" element={<MarcoLegalAdmin />} />
                  
                  <Route path="transparencia/*" element={<TransparenciaAdmin />} />
                  
                  <Route path="servicios/tramites" element={<Tramites />} />
                  <Route path="solicitudes" element={<BandejaSolicitudes />} />
                  <Route path="solicitudes/:id" element={<BandejaSolicitudes />} />
                  
                  <Route path="noticias" element={<Noticias />} />
                  <Route path="comunicados" element={<ComunicadosAdmin />} />
                  
                  <Route path="eventos" element={<EventosAdmin />} />
                  <Route path="turismo" element={<TurismoAdmin />} />
                  <Route path="documentos" element={<DocumentosAdmin />} />
                  <Route path="reportes" element={<ReportesAdmin />} />
                  <Route path="configuracion" element={<ConfiguracionAdmin />} />
                </Route>
                
                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </DataProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
