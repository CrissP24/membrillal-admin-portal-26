import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { AppContainer } from '@/ui/components/AppContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Timeline } from '@/ui/components/Timeline';
import { Badge } from '@/ui/components/Badge';
import { EmptyState } from '@/ui/components/EmptyState';
import { Search, FileQuestion } from 'lucide-react';
import { tramitesService } from '@/domain/services';
import type { TramiteInstancia } from '@/domain/models/types';
import { Loader2 } from 'lucide-react';

const Seguimiento: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [folio, setFolio] = useState(searchParams.get('folio') || '');
  const [solicitud, setSolicitud] = useState<TramiteInstancia | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!folio.trim()) {
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const result = await tramitesService.trackByFolio(folio.trim());
      setSolicitud(result);
    } catch (error) {
      console.error(error);
      setSolicitud(null);
    } finally {
      setLoading(false);
    }
  };

  const getEstadoBadge = (estado: string) => {
    const variants: Record<string, any> = {
      aprobado: 'aprobado',
      observado: 'observado',
      rechazado: 'rechazado',
      enviado: 'enviado',
      pagado: 'pagado',
      entregado: 'entregado',
      borrador: 'default',
    };
    return <Badge variant={variants[estado] || 'default'}>{estado}</Badge>;
  };

  return (
    <div className="min-h-screen bg-canvas py-12">
      <AppContainer>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-ink-900 mb-8">Seguimiento de Trámites</h1>

          {/* Buscador */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <Label htmlFor="folio" className="mb-2 block">
                Ingresa tu número de folio
              </Label>
              <div className="flex gap-2">
                <Input
                  id="folio"
                  placeholder="Ej: GAD-202401-0001"
                  value={folio}
                  onChange={(e) => setFolio(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1"
                />
                <Button onClick={handleSearch} disabled={loading || !folio.trim()}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Buscar
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Resultado */}
          {loading && (
            <Card>
              <CardContent className="p-12 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600 mx-auto mb-4" />
                <p className="text-ink-600">Buscando trámite...</p>
              </CardContent>
            </Card>
          )}

          {!loading && searched && !solicitud && (
            <EmptyState
              title="No encontramos tu trámite"
              description="Verifica que el número de folio sea correcto. Si el problema persiste, contacta con el GAD."
              icon={<FileQuestion className="h-12 w-12 text-ink-400" />}
            />
          )}

          {!loading && solicitud && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Información del Trámite</CardTitle>
                  {getEstadoBadge(solicitud.estado)}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-ink-600">Folio</Label>
                    <p className="text-lg font-semibold text-ink-900">{solicitud.folio}</p>
                  </div>
                  <div>
                    <Label className="text-ink-600">Estado</Label>
                    <div className="mt-1">{getEstadoBadge(solicitud.estado)}</div>
                  </div>
                  <div>
                    <Label className="text-ink-600">Ciudadano</Label>
                    <p className="text-lg font-semibold text-ink-900">
                      {solicitud.ciudadano.nombres}
                    </p>
                  </div>
                  <div>
                    <Label className="text-ink-600">Documento</Label>
                    <p className="text-lg font-semibold text-ink-900">
                      {solicitud.ciudadano.documento}
                    </p>
                  </div>
                </div>

                {solicitud.adjuntos && solicitud.adjuntos.length > 0 && (
                  <div>
                    <Label className="text-ink-600 mb-2 block">Documentos Adjuntos</Label>
                    <div className="flex flex-wrap gap-2">
                      {solicitud.adjuntos.map((adj) => (
                        <Badge key={adj.id} variant="default">
                          {adj.nombre}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-ink-600 mb-4 block">Historial</Label>
                  <Timeline items={solicitud.historial} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </AppContainer>
    </div>
  );
};

export default Seguimiento;

