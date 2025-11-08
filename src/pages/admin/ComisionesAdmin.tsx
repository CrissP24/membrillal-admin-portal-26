import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Users, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { comisionesRepo } from '@/data/repos';
import type { Comision } from '@/domain/models/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const ComisionesAdmin: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [comisiones, setComisiones] = useState<Comision[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Comision | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    integrantes: '',
    objetivo: '',
  });

  useEffect(() => {
    loadComisiones();
  }, []);

  const loadComisiones = async () => {
    try {
      setLoading(true);
      const result = await comisionesRepo.list();
      setComisiones(result.items);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las comisiones',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const integrantesArray = formData.integrantes
        .split(',')
        .map((i) => i.trim())
        .filter((i) => i.length > 0);

      if (editingItem) {
        await comisionesRepo.update(editingItem.id, {
          nombre: formData.nombre,
          integrantes: integrantesArray,
          objetivo: formData.objetivo || undefined,
        });
        toast({
          title: 'Actualizada',
          description: 'La comisión ha sido actualizada exitosamente',
        });
      } else {
        await comisionesRepo.create({
          nombre: formData.nombre,
          integrantes: integrantesArray,
          objetivo: formData.objetivo || undefined,
        });
        toast({
          title: 'Creada',
          description: 'La nueva comisión ha sido creada exitosamente',
        });
      }
      setIsDialogOpen(false);
      setEditingItem(null);
      setFormData({ nombre: '', integrantes: '', objetivo: '' });
      await loadComisiones();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudo guardar la información',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (item: Comision) => {
    setEditingItem(item);
    setFormData({
      nombre: item.nombre,
      integrantes: item.integrantes.join(', '),
      objetivo: item.objetivo || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await comisionesRepo.remove(itemToDelete);
      toast({
        title: 'Eliminada',
        description: 'La comisión ha sido eliminada exitosamente',
      });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      await loadComisiones();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la comisión',
        variant: 'destructive',
      });
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-ink-900">Comisiones del GAD</h1>
          <p className="text-ink-600 mt-2">
            Gestiona las comisiones de trabajo del GAD Parroquial Membrillal
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button
            onClick={() => {
              setEditingItem(null);
              setFormData({ nombre: '', integrantes: '', objetivo: '' });
              setIsDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Comisión
          </Button>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Editar' : 'Crear'} Comisión</DialogTitle>
              <DialogDescription>
                Complete los campos para {editingItem ? 'actualizar' : 'crear'} una comisión
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre de la Comisión *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Ej: Comisión de Planificación y Presupuesto"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="integrantes">Integrantes *</Label>
                <Textarea
                  id="integrantes"
                  value={formData.integrantes}
                  onChange={(e) => setFormData({ ...formData, integrantes: e.target.value })}
                  placeholder="Nombres separados por comas: Juan Pérez, María González, Carlos Ramírez"
                  rows={3}
                  required
                />
                <p className="text-xs text-ink-500">Separe los nombres con comas</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="objetivo">Objetivo</Label>
                <Textarea
                  id="objetivo"
                  value={formData.objetivo}
                  onChange={(e) => setFormData({ ...formData, objetivo: e.target.value })}
                  placeholder="Descripción de los objetivos de la comisión"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">{editingItem ? 'Actualizar' : 'Crear'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Comisiones de Trabajo
          </CardTitle>
          <CardDescription>
            Administra las comisiones especializadas del GAD Parroquial
          </CardDescription>
        </CardHeader>
        <CardContent>
          {comisiones.length === 0 ? (
            <div className="text-center py-8 text-ink-500">
              <p>No hay comisiones registradas</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Comisión</TableHead>
                  <TableHead>Integrantes</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comisiones.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{item.nombre}</p>
                        {item.objetivo && (
                          <p className="text-sm text-ink-500 mt-1">{item.objetivo}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {item.integrantes.map((miembro, index) => (
                          <div key={index} className="text-sm">
                            • {miembro}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setItemToDelete(item.id);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente esta comisión.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ComisionesAdmin;

