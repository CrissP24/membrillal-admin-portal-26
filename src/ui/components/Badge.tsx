import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'aprobado' | 'observado' | 'rechazado' | 'enviado' | 'pagado' | 'entregado' | 'programado' | 'realizado' | 'cancelado';
  className?: string;
}

const variantClasses: Record<string, string> = {
  default: 'bg-ink-100 text-ink-700 ring-1 ring-ink-200',
  aprobado: 'bg-green-50 text-green-700 ring-1 ring-green-200',
  observado: 'bg-yellow-50 text-yellow-800 ring-1 ring-yellow-200',
  rechazado: 'bg-red-50 text-red-700 ring-1 ring-red-200',
  enviado: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  pagado: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
  entregado: 'bg-primary-100 text-primary-700 ring-1 ring-primary-200',
  programado: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
  realizado: 'bg-green-50 text-green-700 ring-1 ring-green-200',
  cancelado: 'bg-red-50 text-red-700 ring-1 ring-red-200',
};

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

