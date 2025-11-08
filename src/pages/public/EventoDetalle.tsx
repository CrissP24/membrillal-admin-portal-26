import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContainer } from '@/ui/components/AppContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/ui/components/Badge';
import { ArrowLeft, Calendar, Clock, MapPin, Loader2 } from 'lucide-react';
import { eventosService } from '@/domain/services';
import type { Evento } from '@/domain/models/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';
import { EmptyState } from '@/ui/components/EmptyState';

const EventoDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [evento, setEvento] = useState<Evento | null>(null);

  useEffect(() => {
    if (id) {
      loadEvento();
    }
  }, [id]);

  const loadEvento = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await eventosService.get(id);
      setEvento(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  if (!evento) {
    return (
      <div className="min-h-screen bg-canvas py-12">
        <AppContainer>
          <EmptyState
            title="Evento no encontrado"
            description="El evento que buscas no existe o ha sido eliminado"
            action={{
              label: 'Volver a eventos',
              onClick: () => navigate('/public/eventos'),
            }}
          />
        </AppContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas py-12">
      <AppContainer>
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/public/eventos')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a eventos
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Badge variant={evento.estado}>{evento.estado}</Badge>
                  <div className="flex items-center gap-4 text-ink-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {format(new Date(evento.fecha), "dd 'de' MMMM 'de' yyyy", { locale: es })}
                    </div>
                    {evento.hora && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {evento.hora}
                      </div>
                    )}
                    {evento.lugar && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {evento.lugar}
                      </div>
                    )}
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-ink-900 mb-6">{evento.titulo}</h1>

                {evento.portadaUrl && (
                  <div className="mb-6">
                    <img
                      src={evento.portadaUrl}
                      alt={evento.titulo}
                      className="w-full h-[400px] object-cover rounded-2xl"
                    />
                  </div>
                )}

                {evento.descripcionHtml && (
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: evento.descripcionHtml }}
                  />
                )}

                {evento.etiquetas && evento.etiquetas.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-ink-900 mb-3">Etiquetas</h3>
                    <div className="flex flex-wrap gap-2">
                      {evento.etiquetas.map((tag, index) => (
                        <Badge key={index} variant="default">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-ink-900 mb-4">Información del Evento</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-ink-600 mb-1">Fecha</p>
                    <p className="font-medium">
                      {format(new Date(evento.fecha), "dd 'de' MMMM 'de' yyyy", { locale: es })}
                    </p>
                  </div>
                  {evento.hora && (
                    <div>
                      <p className="text-sm text-ink-600 mb-1">Hora</p>
                      <p className="font-medium">{evento.hora}</p>
                    </div>
                  )}
                  {evento.lugar && (
                    <div>
                      <p className="text-sm text-ink-600 mb-1">Lugar</p>
                      <p className="font-medium">{evento.lugar}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-ink-600 mb-1">Estado</p>
                    <Badge variant={evento.estado}>{evento.estado}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AppContainer>
    </div>
  );
};

export default EventoDetalle;

