import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '@/ui/components/Hero';
import { AppContainer } from '@/ui/components/AppContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/ui/components/Badge';
import { Clock, DollarSign, FileCheck, Zap, Calendar, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { tramiteDefRepo } from '@/data/repos';
import { noticiasService } from '@/domain/services';
import { eventosService } from '@/domain/services';
import type { TramiteDef, Noticia, Evento } from '@/domain/models/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';

const Inicio: React.FC = () => {
  const navigate = useNavigate();
  const [tramites, setTramites] = useState<TramiteDef[]>([]);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);

  useEffect(() => {
    const loadData = async () => {
      // Load featured tramites
      const tramitesData = await tramiteDefRepo.list({ pageSize: 3 });
      setTramites(tramitesData.items);

      // Load recent news
      const noticiasData = await noticiasService.list({ pageSize: 3, orderBy: 'publishedAt', orderDir: 'desc' });
      setNoticias(noticiasData.items);

      // Load upcoming events
      const eventosData = await eventosService.proximosEventos();
      setEventos(eventosData.slice(0, 3));
    };
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-canvas">
      {/* Hero Section */}
      <Hero
        title="GAD Parroquial Rural de Membrillal"
        subtitle="Trabajando por el desarrollo sostenible y el bienestar de nuestra comunidad"
        primaryAction={{
          label: 'Servicios en Línea',
          onClick: () => navigate('/public/tramites'),
        }}
        secondaryAction={{
          label: 'Ver Noticias',
          onClick: () => navigate('/public/noticias'),
        }}
      />

      {/* CTA Tríada */}
      <section className="py-16 bg-section">
        <AppContainer>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="rounded-2xl shadow-soft p-6 bg-white border-ink-100">
              <Zap className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="text-lg font-semibold text-ink-900 mb-2">Rápido y Eficiente</h3>
              <p className="text-sm text-ink-600">Realiza tus trámites en línea sin salir de casa</p>
            </Card>
            <Card className="rounded-2xl shadow-soft p-6 bg-white border-ink-100">
              <FileCheck className="h-8 w-8 text-accent-600 mb-4" />
              <h3 className="text-lg font-semibold text-ink-900 mb-2">Sin Papeleos</h3>
              <p className="text-sm text-ink-600">Digitaliza tus documentos y evita filas</p>
            </Card>
            <Card className="rounded-2xl shadow-soft p-6 bg-white border-ink-100">
              <Clock className="h-8 w-8 text-info-600 mb-4" />
              <h3 className="text-lg font-semibold text-ink-900 mb-2">Seguimiento</h3>
              <p className="text-sm text-ink-600">Consulta el estado de tu trámite en tiempo real</p>
            </Card>
          </div>
        </AppContainer>
      </section>

      {/* Servicios Destacados */}
      <section className="py-16 bg-white">
        <AppContainer>
          <h2 className="text-3xl font-bold text-ink-900 mb-8">Servicios Destacados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {tramites.map((tramite) => (
              <Card key={tramite.id} className="rounded-2xl shadow-soft border-ink-100 hover:shadow-lg transition-shadow">
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
                  <h3 className="text-lg font-semibold text-ink-900 mb-2">{tramite.nombre}</h3>
                  <div className="flex items-center gap-2 text-sm text-ink-600 mb-4">
                    <Clock className="h-4 w-4" />
                    <span>{tramite.tiempoDias} días</span>
                  </div>
                  <Button
                    onClick={() => navigate(`/public/tramites/solicitar/${tramite.id}`)}
                    className="w-full"
                  >
                    Solicitar Trámite
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </AppContainer>
      </section>

      {/* Noticias Recientes */}
      <section className="py-16 bg-section">
        <AppContainer>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-ink-900">Noticias Recientes</h2>
            <Button variant="outline" onClick={() => navigate('/public/noticias')}>
              Ver todas
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {noticias.map((noticia) => (
              <Card
                key={noticia.id}
                className="rounded-2xl shadow-soft border-ink-100 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/public/noticias/${noticia.id}`)}
              >
                {noticia.portadaUrl && (
                  <div className="h-48 bg-ink-200 rounded-t-2xl overflow-hidden">
                    <img src={noticia.portadaUrl} alt={noticia.titulo} className="w-full h-full object-cover" />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge>{noticia.categoria}</Badge>
                    <div className="flex items-center gap-1 text-xs text-ink-500">
                      <Eye className="h-3 w-3" />
                      {noticia.vistas}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-ink-900 mb-2 line-clamp-2">{noticia.titulo}</h3>
                  <p className="text-xs text-ink-500">
                    {format(new Date(noticia.publishedAt), 'dd MMM yyyy', { locale: es })}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </AppContainer>
      </section>

      {/* Próximos Eventos */}
      <section className="py-16 bg-white">
        <AppContainer>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-ink-900">Próximos Eventos</h2>
            <Button variant="outline" onClick={() => navigate('/public/eventos')}>
              Ver agenda completa
            </Button>
          </div>
          <div className="space-y-4">
            {eventos.map((evento) => (
              <Card
                key={evento.id}
                className="rounded-2xl shadow-soft border-ink-100 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/public/eventos/${evento.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary-100 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-primary-700">
                          {format(new Date(evento.fecha), 'dd', { locale: es })}
                        </div>
                        <div className="text-xs text-primary-600 uppercase">
                          {format(new Date(evento.fecha), 'MMM', { locale: es })}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="programado">{evento.estado}</Badge>
                        {evento.hora && (
                          <span className="text-sm text-ink-600 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {evento.hora}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-ink-900 mb-2">{evento.titulo}</h3>
                      {evento.lugar && (
                        <p className="text-sm text-ink-600">{evento.lugar}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </AppContainer>
      </section>

      {/* Contacto */}
      <section className="py-16 bg-primary-700 text-white">
        <AppContainer>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Dirección</h3>
              <p className="text-white/90">Av. Principal s/n, Membrillal</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Teléfono</h3>
              <p className="text-white/90">+593 99 999 9999</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Email</h3>
              <p className="text-white/90">contacto@membrillal.gob.ec</p>
            </div>
          </div>
        </AppContainer>
      </section>
    </div>
  );
};

export default Inicio;

