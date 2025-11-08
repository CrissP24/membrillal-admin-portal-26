import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/ui/components/Badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, FileText, Clock, DollarSign, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AppContainer } from '@/ui/components/AppContainer';
import { tramiteDefRepo } from '@/data/repos';
import type { TramiteDef } from '@/domain/models/types';

const PublicTramites = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tramites, setTramites] = useState<TramiteDef[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTipo, setSelectedTipo] = useState<string>('todos');

  useEffect(() => {
    loadTramites();
  }, []);

  const loadTramites = async () => {
    try {
      setLoading(true);
      const result = await tramiteDefRepo.list({ filters: { activo: true } });
      setTramites(result.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTramites = tramites.filter((tramite) => {
    const matchesSearch =
      tramite.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tramite.requisitosHtml.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTipo = selectedTipo === 'todos' || tramite.tipo === selectedTipo;
    return matchesSearch && matchesTipo;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas py-12">
        <AppContainer>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          </div>
        </AppContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas py-12">
      <AppContainer>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-ink-900 mb-2">Servicios en Línea</h1>
          <p className="text-ink-600">Realiza tus trámites de forma rápida y sencilla</p>
        </div>

        {/* Banner */}
        <Card className="mb-8 bg-gradient-to-r from-primary-600 to-primary-700 text-white border-0">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Consulta el estado de tu trámite en tiempo real</h2>
                <p className="text-white/90">Ingresa tu número de folio para ver el progreso</p>
              </div>
              <Button
                variant="secondary"
                onClick={() => navigate('/public/seguimiento')}
                className="bg-white text-primary-700 hover:bg-white/90"
              >
                Ver Seguimiento
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-ink-500" />
                <Input
                  placeholder="Buscar trámites..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedTipo} onValueChange={setSelectedTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  <SelectItem value="Certificacion">Certificaciones</SelectItem>
                  <SelectItem value="Permiso">Permisos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tramites Grid */}
        {filteredTramites.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-ink-500">No se encontraron trámites</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTramites.map((tramite) => (
              <Card
                key={tramite.id}
                className="rounded-2xl shadow-soft border-ink-100 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant={tramite.tipo === 'Certificacion' ? 'default' : 'aprobado'}>
                      {tramite.tipo}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-ink-600">
                      <DollarSign className="h-4 w-4" />
                      {tramite.costo === 0 ? 'Gratis' : `$${tramite.costo}`}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-ink-900 mb-2">{tramite.nombre}</h3>
                    <div className="flex items-center gap-2 text-sm text-ink-600 mb-3">
                      <Clock className="h-4 w-4" />
                      <span>{tramite.tiempoDias} días</span>
                    </div>
                    <div
                      className="text-sm text-ink-600 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: tramite.requisitosHtml.replace(/<[^>]*>/g, '').substring(0, 100) + '...',
                      }}
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => navigate(`/public/tramites/solicitar/${tramite.id}`)}
                  >
                    Solicitar Trámite
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </AppContainer>
    </div>
  );
};

export default PublicTramites;
