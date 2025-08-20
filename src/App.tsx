import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardLayout from "@/components/DashboardLayout";
import PublicLayout from "@/components/PublicLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tramites from "./pages/Tramites";
import Noticias from "./pages/Noticias";
import NotFound from "./pages/NotFound";
import PublicNoticias from "./pages/public/PublicNoticias";
import PublicNoticiaDetalle from "./pages/public/PublicNoticiaDetalle";
import PublicTramites from "./pages/public/PublicTramites";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes with layout */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Index />} />
              <Route path="public/noticias" element={<PublicNoticias />} />
              <Route path="public/noticias/:id" element={<PublicNoticiaDetalle />} />
              <Route path="public/tramites" element={<PublicTramites />} />
              <Route path="public/parroquia" element={<div className="container mx-auto px-4 py-8"><h1 className="text-4xl font-bold mb-4">Nuestra Parroquia</h1><p className="text-muted-foreground">Información sobre la historia, geografía y características de Membrillal. Módulo en desarrollo.</p></div>} />
              <Route path="public/organizacion" element={<div className="container mx-auto px-4 py-8"><h1 className="text-4xl font-bold mb-4">Organización GAD</h1><p className="text-muted-foreground">Estructura organizacional y autoridades del GAD Parroquial. Módulo en desarrollo.</p></div>} />
              <Route path="public/marco-legal" element={<div className="container mx-auto px-4 py-8"><h1 className="text-4xl font-bold mb-4">Marco Legal</h1><p className="text-muted-foreground">Normativa y reglamentos vigentes. Módulo en desarrollo.</p></div>} />
              <Route path="public/rendicion" element={<div className="container mx-auto px-4 py-8"><h1 className="text-4xl font-bold mb-4">Rendición de Cuentas</h1><p className="text-muted-foreground">Informes y documentos de gestión. Módulo en desarrollo.</p></div>} />
              <Route path="public/presupuesto" element={<div className="container mx-auto px-4 py-8"><h1 className="text-4xl font-bold mb-4">Presupuesto</h1><p className="text-muted-foreground">Información presupuestaria y ejecución. Módulo en desarrollo.</p></div>} />
              <Route path="public/licitaciones" element={<div className="container mx-auto px-4 py-8"><h1 className="text-4xl font-bold mb-4">Licitaciones</h1><p className="text-muted-foreground">Procesos de contratación pública. Módulo en desarrollo.</p></div>} />
              <Route path="public/eventos" element={<div className="container mx-auto px-4 py-8"><h1 className="text-4xl font-bold mb-4">Eventos y Agenda</h1><p className="text-muted-foreground">Calendario de eventos y actividades. Módulo en desarrollo.</p></div>} />
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
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
