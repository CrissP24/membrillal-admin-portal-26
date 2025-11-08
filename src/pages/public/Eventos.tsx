import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContainer } from '@/ui/components/AppContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/ui/components/Badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Calendar, Clock, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { eventosService } from '@/domain/services';
import type { Evento } from '@/domain/models/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';

const Eventos: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('todos');

  useEffect(() => {
    loadEventos();
  }, []);

  const loadEventos = async () => {
    try {
      setLoading(true);
      const result = await eventosService.list({ orderBy: 'fecha', orderDir: 'asc' });
      setEventos(result.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredEventos = eventos.filter((evento) => {
    const matchesSearch =
      evento.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (evento.lugar && evento.lugar.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesEstado = filterEstado === 'todos' || evento.estado === filterEstado;
    return matchesSearch && matchesEstado;
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
          <h1 className="text-4xl font-bold text-ink-900 mb-2">Eventos y Agenda</h1>
          <p className="text-ink-600">Calendario de eventos y actividades del GAD</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-ink-500" />
                <Input
                  placeholder="Buscar eventos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterEstado} onValueChange={setFilterEstado}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="programado">Programado</SelectItem>
                  <SelectItem value="realizado">Realizado</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Eventos List */}
        {filteredEventos.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-ink-500">No se encontraron eventos</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredEventos.map((evento) => (
              <Card
                key={evento.id}
                className="rounded-2xl shadow-soft border-ink-100 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/public/eventos/${evento.id}`)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="bg-primary-100 rounded-xl p-4 text-center min-w-[80px]">
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
                        <Badge variant={evento.estado}>{evento.estado}</Badge>
                        {evento.hora && (
                          <span className="text-sm text-ink-600 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {evento.hora}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-ink-900 mb-2">{evento.titulo}</h3>
                      {evento.lugar && (
                        <p className="text-sm text-ink-600 flex items-center gap-1 mb-2">
                          <MapPin className="h-3 w-3" />
                          {evento.lugar}
                        </p>
                      )}
                      {evento.descripcionHtml && (
                        <p className="text-sm text-ink-500 line-clamp-2">
                          {evento.descripcionHtml.replace(/<[^>]*>/g, '').substring(0, 150)}...
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </AppContainer>
    </div>
  );
};

export default Eventos;

