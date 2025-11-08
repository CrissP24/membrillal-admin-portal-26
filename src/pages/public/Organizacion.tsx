import React, { useEffect, useState } from 'react';
import { AppContainer } from '@/ui/components/AppContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/ui/components/Badge';
import { Loader2 } from 'lucide-react';
import { autoridadesRepo, comisionesRepo } from '@/data/repos';
import type { Autoridad, Comision } from '@/domain/models/types';

const Organizacion: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [autoridades, setAutoridades] = useState<Autoridad[]>([]);
  const [comisiones, setComisiones] = useState<Comision[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [autResult, comResult] = await Promise.all([
        autoridadesRepo.list(),
        comisionesRepo.list(),
      ]);
      setAutoridades(autResult.items);
      setComisiones(comResult.items);
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

  return (
    <div className="min-h-screen bg-canvas py-12">
      <AppContainer>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-ink-900 mb-2">Organización GAD</h1>
          <p className="text-ink-600">Conoce a nuestras autoridades y comisiones de trabajo</p>
        </div>

        {/* Autoridades */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-ink-900 mb-6">Autoridades</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {autoridades.map((autoridad) => (
              <Card key={autoridad.id} className="rounded-2xl shadow-soft border-ink-100">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={autoridad.fotoUrl} alt={autoridad.nombre} />
                    <AvatarFallback className="text-2xl">
                      {autoridad.nombre
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold text-ink-900 mb-1">{autoridad.nombre}</h3>
                  <Badge variant="default" className="mb-2">
                    {autoridad.cargo}
                  </Badge>
                  <p className="text-sm text-ink-600 mb-2">Período: {autoridad.periodo}</p>
                  {autoridad.descripcion && (
                    <p className="text-sm text-ink-500 mt-2">{autoridad.descripcion}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Comisiones */}
        <div>
          <h2 className="text-2xl font-bold text-ink-900 mb-6">Comisiones de Trabajo</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comisiones.map((comision) => (
              <Card key={comision.id} className="rounded-2xl shadow-soft border-ink-100">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-ink-900 mb-3">{comision.nombre}</h3>
                  {comision.objetivo && (
                    <p className="text-sm text-ink-600 mb-4">{comision.objetivo}</p>
                  )}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-ink-700">Integrantes:</p>
                    <ul className="space-y-1">
                      {comision.integrantes.map((integrante, idx) => (
                        <li key={idx} className="text-sm text-ink-600">
                          • {integrante}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AppContainer>
    </div>
  );
};

export default Organizacion;

