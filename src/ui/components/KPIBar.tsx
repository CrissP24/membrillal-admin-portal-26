import React from 'react';

interface KPIBarProps {
  label: string;
  value: number;
  total: number;
  color?: string;
  showPercentage?: boolean;
}

export const KPIBar: React.FC<KPIBarProps> = ({
  label,
  value,
  total,
  color = 'primary',
  showPercentage = true,
}) => {
  const percentage = total > 0 ? (value / total) * 100 : 0;
  
  const colorClasses: Record<string, string> = {
    primary: 'bg-primary-600',
    green: 'bg-accent-600',
    blue: 'bg-blue-500',
  };

  const bgColor = colorClasses[color] || colorClasses.primary;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-ink-700">{label}</span>
        <span className="font-medium text-ink-900">
          {value} / {total}
          {showPercentage && ` (${Math.round(percentage)}%)`}
        </span>
      </div>
      <div className="w-full bg-ink-100 rounded-full h-2.5">
        <div
          className={`${bgColor} h-2.5 rounded-full transition-all duration-300`}
          style={{ width: `${Math.min(100, percentage)}%` }}
        ></div>
      </div>
    </div>
  );
};

