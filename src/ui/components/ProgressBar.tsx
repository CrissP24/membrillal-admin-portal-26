import React from 'react';

interface ProgressBarProps {
  percentage: number;
  color?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentage,
  color = 'primary',
  className = '',
}) => {
  const colorClasses: Record<string, string> = {
    primary: 'bg-primary-600',
    green: 'bg-accent-600',
    yellow: 'bg-warning-600',
    red: 'bg-danger-600',
  };

  const bgColor = colorClasses[color] || colorClasses.primary;

  return (
    <div className={`w-full bg-ink-100 rounded-full h-2.5 ${className}`}>
      <div
        className={`${bgColor} h-2.5 rounded-full transition-all duration-300`}
        style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
      ></div>
    </div>
  );
};

