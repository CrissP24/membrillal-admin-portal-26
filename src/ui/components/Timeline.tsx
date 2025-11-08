import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';
import type { Log } from '@/domain/models/types';

interface TimelineProps {
  items: Log[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className = '' }) => {
  if (items.length === 0) {
    return (
      <div className={`text-center py-8 text-ink-500 ${className}`}>
        <p>No hay registros en el historial</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="relative pl-8 pb-4">
          {index < items.length - 1 && (
            <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-ink-200"></div>
          )}
          <div className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-primary-600 ring-2 ring-white"></div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-ink-100">
            <div className="flex items-start justify-between mb-2">
              <span className="text-sm font-medium text-ink-900">{item.estado}</span>
              <span className="text-xs text-ink-500">
                {format(new Date(item.fecha), 'dd/MM/yyyy HH:mm', { locale: es })}
              </span>
            </div>
            {item.nota && (
              <p className="text-sm text-ink-600 mt-1">{item.nota}</p>
            )}
            {item.usuario && (
              <p className="text-xs text-ink-500 mt-2">Por {item.usuario}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

