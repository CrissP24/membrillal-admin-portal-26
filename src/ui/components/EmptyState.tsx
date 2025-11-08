import React from 'react';
import { FileQuestion, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  action,
  icon = <FileQuestion className="h-12 w-12 text-ink-400" />,
}) => {
  return (
    <div className="text-center py-12 px-4">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-ink-900 mb-2">{title}</h3>
      {description && <p className="text-sm text-ink-500 mb-6 max-w-md mx-auto">{description}</p>}
      {action && (
        <Button onClick={action.onClick} className="inline-flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {action.label}
        </Button>
      )}
    </div>
  );
};

