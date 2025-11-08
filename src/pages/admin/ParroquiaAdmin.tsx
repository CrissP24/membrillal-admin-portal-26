import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { parroquiaRepo } from '@/data/repos';
import type { Parroquia } from '@/domain/models/types';

const ParroquiaAdmin: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [parroquia, setParroquia] = useState<Parroquia | null>(null);
  const [formData, setFormData] = useState({
    titulo: '',
    contenidoHtml: '',
  });

  useEffect(() => {
    loadParroquia();
  }, []);

  const loadParroquia = async () => {
    try {
      setLoading(true);
      const result = await parroquiaRepo.list();
      if (result.items.length > 0) {
        const data = result.items[0];
        setParroquia(data);
        setFormData({
          titulo: data.titulo,
          contenidoHtml: data.contenidoHtml,
        });
      } else {
        // Create initial parroquia
        const newParroquia = await parroquiaRepo.create({
          titulo: 'GAD Parroquial Rural de Membrillal',
          contenidoHtml: '<p>Información sobre la parroquia...</p>',
        });
        setParroquia(newParroquia);
        setFormData({
          titulo: newParroquia.titulo,
          contenidoHtml: newParroquia.contenidoHtml,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudo cargar la información',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parroquia) return;

    try {
      setSaving(true);
      await parroquiaRepo.update(parroquia.id, {
        titulo: formData.titulo,
        contenidoHtml: formData.contenidoHtml,
      });
      toast({
        title: 'Éxito',
        description: 'Información actualizada correctamente',
      });
      await loadParroquia();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudo guardar la información',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ink-900">Información de la Parroquia</h1>
        <p className="text-ink-600 mt-2">
          Gestiona la información histórica, geográfica y demográfica de Membrillal
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Editar Información</CardTitle>
          <CardDescription>
            Actualiza el contenido que se muestra en la página pública
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título</Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                placeholder="Título de la parroquia"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contenido">Contenido (HTML)</Label>
              <Textarea
                id="contenido"
                value={formData.contenidoHtml}
                onChange={(e) => setFormData({ ...formData, contenidoHtml: e.target.value })}
                placeholder="Contenido en HTML..."
                rows={15}
                required
                className="font-mono text-sm"
              />
              <p className="text-xs text-ink-500">
                Puedes usar HTML para formatear el contenido (párrafos, listas, encabezados, etc.)
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cambios
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Vista Previa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <h2>{formData.titulo}</h2>
            <div dangerouslySetInnerHTML={{ __html: formData.contenidoHtml }} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParroquiaAdmin;

