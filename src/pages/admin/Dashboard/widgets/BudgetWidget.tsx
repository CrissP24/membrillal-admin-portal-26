import React, { useEffect, useState } from 'react';
import { StatCard } from '@/ui/components/StatCard';
import { kpisService } from '@/domain/services';
import { useNavigate } from 'react-router-dom';

export const BudgetWidget: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ ejecutado: 0, presupuesto: 0, porcentaje: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await kpisService.getEjecucionPresupuestaria();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(value);
  };

  if (loading) {
    return <StatCard title="Ejecución Presupuestaria 2024" value="Cargando..." />;
  }

  return (
    <StatCard
      title="Ejecución Presupuestaria 2024"
      value={formatCurrency(data.ejecutado)}
      subtext={`Presupuesto: ${formatCurrency(data.presupuesto)}`}
      progress={{
        percentage: data.porcentaje,
        color: 'primary',
      }}
      action={{
        label: 'Ver detalle',
        onClick: () => navigate('/dashboard/transparencia?tab=presupuesto'),
      }}
    />
  );
};

