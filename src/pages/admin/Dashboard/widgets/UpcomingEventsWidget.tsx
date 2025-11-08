import React, { useEffect, useState } from 'react';
import { StatCard } from '@/ui/components/StatCard';
import { kpisService } from '@/domain/services';
import { eventosService } from '@/domain/services';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';
import { Badge } from '@/ui/components/Badge';
import type { Evento } from '@/domain/models/types';

export const UpcomingEventsWidget: React.FC = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [events, setEvents] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [countData, eventsData] = await Promise.all([
          kpisService.getEventosProximos(),
          eventosService.proximosEventos(),
        ]);
        setCount(countData);
        setEvents(eventsData.slice(0, 3));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <StatCard title="Eventos próximos" value="Cargando..." />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-ink-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-ink-700">Eventos próximos</h3>
        <div className="text-3xl font-bold text-ink-900">{count}</div>
      </div>
      <div className="space-y-3">
        {events.map((evento) => (
          <div
            key={evento.id}
            className="p-3 bg-ink-50 rounded-lg hover:bg-ink-100 cursor-pointer transition-colors"
            onClick={() => navigate(`/dashboard/eventos/${evento.id}`)}
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-ink-900 line-clamp-1">{evento.titulo}</p>
              <Badge variant="programado" className="text-xs">
                {evento.estado}
              </Badge>
            </div>
            <p className="text-xs text-ink-500">
              {format(new Date(evento.fecha), 'dd MMM yyyy', { locale: es })}
              {evento.hora && ` • ${evento.hora}`}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/dashboard/eventos')}
        className="text-sm font-medium text-primary-600 hover:text-primary-700 mt-4"
      >
        Ver agenda completa →
      </button>
    </div>
  );
};

