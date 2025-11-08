import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Edit, Trash2, Users, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { autoridadesRepo } from '@/data/repos';
import type { Autoridad } from '@/domain/models/types';
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

const OrganizacionAdmin: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [autoridades, setAutoridades] = useState<Autoridad[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Autoridad | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    cargo: '',
    periodo: '',
    descripcion: '',
    fotoUrl: '',
  });

  useEffect(() => {
    loadAutoridades();
  }, []);

  const loadAutoridades = async () => {
    try {
      setLoading(true);
      const result = await autoridadesRepo.list();
      setAutoridades(result.items);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las autoridades',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await autoridadesRepo.update(editingItem.id, formData);
        toast({
          title: 'Actualizado',
          description: 'La autoridad ha sido actualizada exitosamente',
        });
      } else {
        await autoridadesRepo.create(formData);
        toast({
          title: 'Creado',
          description: 'La nueva autoridad ha sido creada exitosamente',
        });
      }
      setIsDialogOpen(false);
      setEditingItem(null);
      setFormData({ nombre: '', cargo: '', periodo: '', descripcion: '', fotoUrl: '' });
      await loadAutoridades();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudo guardar la información',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (item: Autoridad) => {
    setEditingItem(item);
    setFormData({
      nombre: item.nombre,
      cargo: item.cargo,
      periodo: item.periodo,
      descripcion: item.descripcion || '',
      fotoUrl: item.fotoUrl || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await autoridadesRepo.remove(itemToDelete);
      toast({
        title: 'Eliminado',
        description: 'La autoridad ha sido eliminada exitosamente',
      });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      await loadAutoridades();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la autoridad',
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
          <h1 className="text-3xl font-bold text-ink-900">Organización GAD</h1>
          <p className="text-ink-600 mt-2">
            Gestiona la información de autoridades y funcionarios del GAD Parroquial
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button
            onClick={() => {
              setEditingItem(null);
              setFormData({ nombre: '', cargo: '', periodo: '', descripcion: '', fotoUrl: '' });
              setIsDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Autoridad
          </Button>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Editar' : 'Agregar'} Autoridad</DialogTitle>
              <DialogDescription>
                Complete los campos para {editingItem ? 'actualizar' : 'agregar'} una autoridad
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre Completo *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo *</Label>
                  <Input
                    id="cargo"
                    value={formData.cargo}
                    onChange={(e) => setFormData({ ...formData, cargo: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="periodo">Período *</Label>
                <Input
                  id="periodo"
                  value={formData.periodo}
                  onChange={(e) => setFormData({ ...formData, periodo: e.target.value })}
                  placeholder="2024-2027"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fotoUrl">URL de Foto</Label>
                <Input
                  id="fotoUrl"
                  value={formData.fotoUrl}
                  onChange={(e) => setFormData({ ...formData, fotoUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">{editingItem ? 'Actualizar' : 'Guardar'}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Autoridades y Funcionarios
          </CardTitle>
          <CardDescription>
            Información de las autoridades electas y funcionarios del GAD Parroquial
          </CardDescription>
        </CardHeader>
        <CardContent>
          {autoridades.length === 0 ? (
            <div className="text-center py-8 text-ink-500">
              <p>No hay autoridades registradas</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Miembro</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Período</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {autoridades.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={item.fotoUrl} alt={item.nombre} />
                          <AvatarFallback>
                            {item.nombre
                              .split(' ')
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{item.nombre}</p>
                          {item.descripcion && (
                            <p className="text-sm text-ink-500 line-clamp-1">{item.descripcion}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{item.cargo}</TableCell>
                    <TableCell>{item.periodo}</TableCell>
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
              Esta acción no se puede deshacer. Se eliminará permanentemente esta autoridad.
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

export default OrganizacionAdmin;

