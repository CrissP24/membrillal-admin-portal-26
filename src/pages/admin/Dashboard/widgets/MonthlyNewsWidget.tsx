import React, { useEffect, useState } from 'react';
import { StatCard } from '@/ui/components/StatCard';
import { kpisService } from '@/domain/services';
import { useNavigate } from 'react-router-dom';
import { noticiasService } from '@/domain/services';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';
import type { Noticia } from '@/domain/models/types';

export const MonthlyNewsWidget: React.FC = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [recent, setRecent] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [countData, recentData] = await Promise.all([
          kpisService.getNoticiasEsteMes(),
          noticiasService.list({ pageSize: 3, orderBy: 'publishedAt', orderDir: 'desc' }),
        ]);
        setCount(countData);
        setRecent(recentData.items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <StatCard title="Noticias este mes" value="Cargando..." />;
  }

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-ink-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-ink-700">Noticias este mes</h3>
        <div className="text-3xl font-bold text-ink-900">{count}</div>
      </div>
      <div className="space-y-3">
        {recent.map((noticia) => (
          <div
            key={noticia.id}
            className="p-3 bg-ink-50 rounded-lg hover:bg-ink-100 cursor-pointer transition-colors"
            onClick={() => navigate(`/dashboard/noticias/${noticia.id}`)}
          >
            <p className="text-sm font-medium text-ink-900 line-clamp-1">{noticia.titulo}</p>
            <p className="text-xs text-ink-500 mt-1">
              {format(new Date(noticia.publishedAt), 'dd MMM yyyy', { locale: es })}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/dashboard/noticias')}
        className="text-sm font-medium text-primary-600 hover:text-primary-700 mt-4"
      >
        Ver todas →
      </button>
    </div>
  );
};

