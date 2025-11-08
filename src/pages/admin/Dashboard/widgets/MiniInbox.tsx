import React, { useEffect, useState } from 'react';
import { tramiteInstRepo } from '@/data/repos';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/ui/components/Badge';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';
import type { TramiteInstancia } from '@/domain/models/types';

export const MiniInbox: React.FC = () => {
  const navigate = useNavigate();
  const [solicitudes, setSolicitudes] = useState<TramiteInstancia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await tramiteInstRepo.list({
          pageSize: 5,
          orderBy: 'updatedAt',
          orderDir: 'desc',
        });
        setSolicitudes(result.items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

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

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-soft border border-ink-100 p-6">
        <p className="text-ink-600">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-ink-100 p-6">
      <h3 className="text-sm font-medium text-ink-700 mb-4">Bandeja de Solicitudes</h3>
      {solicitudes.length === 0 ? (
        <p className="text-sm text-ink-500 text-center py-4">No hay solicitudes</p>
      ) : (
        <div className="space-y-2">
          {solicitudes.map((solicitud) => (
            <div
              key={solicitud.id}
              className="p-3 bg-ink-50 rounded-lg hover:bg-ink-100 cursor-pointer transition-colors"
              onClick={() => navigate(`/dashboard/solicitudes/${solicitud.id}`)}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-ink-900">{solicitud.folio}</span>
                {getEstadoBadge(solicitud.estado)}
              </div>
              <p className="text-xs text-ink-600">{solicitud.ciudadano.nombres}</p>
              <p className="text-xs text-ink-500 mt-1">
                {format(new Date(solicitud.updatedAt), 'dd MMM yyyy', { locale: es })}
              </p>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => navigate('/dashboard/solicitudes')}
        className="text-sm font-medium text-primary-600 hover:text-primary-700 mt-4"
      >
        Ver todas →
      </button>
    </div>
  );
};

