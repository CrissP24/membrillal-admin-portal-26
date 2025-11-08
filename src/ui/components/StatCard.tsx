import React from 'react';
import { ProgressBar } from './ProgressBar';

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  progress?: {
    percentage: number;
    color?: string;
  };
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtext,
  progress,
  action,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-2xl shadow-soft border border-ink-100 p-6 ${className}`}>
      <h3 className="text-sm font-medium text-ink-700 mb-2">{title}</h3>
      <div className="text-3xl font-bold text-ink-900 mb-1">{value}</div>
      {subtext && <p className="text-sm text-ink-500 mb-4">{subtext}</p>}
      {progress && (
        <div className="mb-4">
          <ProgressBar percentage={progress.percentage} color={progress.color} />
        </div>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="text-sm font-medium text-primary-600 hover:text-primary-700 mt-4"
        >
          {action.label} →
        </button>
      )}
    </div>
  );
};

