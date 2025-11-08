import React, { useEffect, useState } from 'react';
import { AppContainer } from '@/ui/components/AppContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { parroquiaRepo } from '@/data/repos';
import type { Parroquia } from '@/domain/models/types';

const Parroquia: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [parroquia, setParroquia] = useState<Parroquia | null>(null);

  useEffect(() => {
    loadParroquia();
  }, []);

  const loadParroquia = async () => {
    try {
      setLoading(true);
      const result = await parroquiaRepo.list();
      if (result.items.length > 0) {
        setParroquia(result.items[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas py-12">
        <AppContainer>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          </div>
        </AppContainer>
      </div>
    );
  }

  if (!parroquia) {
    return (
      <div className="min-h-screen bg-canvas py-12">
        <AppContainer>
          <div className="text-center py-20">
            <p className="text-ink-500">No hay información disponible</p>
          </div>
        </AppContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas py-12">
      <AppContainer>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-ink-900 mb-2">{parroquia.titulo}</h1>
        </div>

        {parroquia.imagenUrl && (
          <div className="mb-8">
            <img
              src={parroquia.imagenUrl}
              alt={parroquia.titulo}
              className="w-full h-96 object-cover rounded-2xl"
            />
          </div>
        )}

        <Card>
          <CardContent className="p-8">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: parroquia.contenidoHtml }}
            />
          </CardContent>
        </Card>
      </AppContainer>
    </div>
  );
};

export default Parroquia;

