import React, { useEffect, useState } from 'react';
import { kpisService } from '@/domain/services';
import { useNavigate } from 'react-router-dom';
import { Newspaper, FileText, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';

interface Activity {
  tipo: string;
  id: string;
  titulo: string;
  fecha: string;
  icono: string;
}

export const RecentActivityFeed: React.FC = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await kpisService.getActividadReciente(10);
        setActivities(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const getIcon = (icono: string) => {
    switch (icono) {
      case 'newspaper':
        return <Newspaper className="h-4 w-4" />;
      case 'file-text':
        return <FileText className="h-4 w-4" />;
      case 'calendar':
        return <Calendar className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleClick = (activity: Activity) => {
    const routes: Record<string, string> = {
      noticia: '/dashboard/noticias',
      evento: '/dashboard/eventos',
      tramite: '/dashboard/solicitudes',
    };
    const baseRoute = routes[activity.tipo] || '/dashboard';
    navigate(`${baseRoute}/${activity.id}`);
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
      <h3 className="text-sm font-medium text-ink-700 mb-4">Actividad Reciente</h3>
      {activities.length === 0 ? (
        <p className="text-sm text-ink-500 text-center py-4">No hay actividad reciente</p>
      ) : (
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 bg-ink-50 rounded-lg hover:bg-ink-100 cursor-pointer transition-colors"
              onClick={() => handleClick(activity)}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                {getIcon(activity.icono)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink-900 line-clamp-1">{activity.titulo}</p>
                <p className="text-xs text-ink-500 mt-1">
                  {format(new Date(activity.fecha), "dd MMM 'a las' HH:mm", { locale: es })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

