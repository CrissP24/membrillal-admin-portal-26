import React, { useEffect, useState } from 'react';
import { StatCard } from '@/ui/components/StatCard';
import { KPIBar } from '@/ui/components/KPIBar';
import { kpisService } from '@/domain/services';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/ui/components/Badge';

export const InfoRequestsWidget: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ recibidas: 0, respondidas: 0, pendientes: 0, tasa: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await kpisService.getSolicitudesInformacion();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <StatCard title="Solicitudes de Información" value="Cargando..." />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-ink-100 p-6">
      <h3 className="text-sm font-medium text-ink-700 mb-4">Solicitudes de Información</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-ink-900">{data.recibidas}</div>
            <div className="text-xs text-ink-600">Recibidas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-600">{data.respondidas}</div>
            <div className="text-xs text-ink-600">Respondidas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning-600">{data.pendientes}</div>
            <div className="text-xs text-ink-600">Pendientes</div>
          </div>
        </div>
        <KPIBar
          label="Tasa de Respuesta"
          value={data.respondidas}
          total={data.recibidas}
          color="green"
          showPercentage
        />
        <button
          onClick={() => navigate('/dashboard/transparencia?tab=solicitudes')}
          className="text-sm font-medium text-primary-600 hover:text-primary-700 mt-2"
        >
          Ver detalle →
        </button>
      </div>
    </div>
  );
};

