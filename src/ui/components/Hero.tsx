import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Newspaper } from 'lucide-react';

interface HeroProps {
  title: string;
  subtitle: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export const Hero: React.FC<HeroProps> = ({ title, subtitle, primaryAction, secondaryAction }) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-accent-600"></div>
      <div className="relative text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed">{subtitle}</p>
          {(primaryAction || secondaryAction) && (
            <div className="mt-8 flex gap-3 flex-wrap">
              {primaryAction && (
                <Button
                  onClick={primaryAction.onClick}
                  className="bg-accent-600 hover:bg-accent-700 text-white"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {primaryAction.label}
                </Button>
              )}
              {secondaryAction && (
                <Button
                  onClick={secondaryAction.onClick}
                  variant="outline"
                  className="text-white border-white/30 hover:bg-white/10 hover:border-white/50"
                >
                  <Newspaper className="h-4 w-4 mr-2" />
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

