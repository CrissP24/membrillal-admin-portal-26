import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/ui/components/Badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Plus, Edit, Trash2, DollarSign, Clock, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { tramiteDefRepo } from '@/data/repos';
import type { TramiteDef, TipoTramite } from '@/domain/models/types';
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

const TramitesDefAdmin: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [tramites, setTramites] = useState<TramiteDef[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TramiteDef | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: 'Certificacion' as TipoTramite,
    costo: 0,
    tiempoDias: '',
    requisitosHtml: '',
    activo: true,
  });

  useEffect(() => {
    loadTramites();
  }, []);

  const loadTramites = async () => {
    try {
      setLoading(true);
      const result = await tramiteDefRepo.list();
      setTramites(result.items);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los trámites',
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
        await tramiteDefRepo.update(editingItem.id, formData);
        toast({
          title: 'Actualizado',
          description: 'El trámite ha sido actualizado exitosamente',
        });
      } else {
        await tramiteDefRepo.create(formData);
        toast({
          title: 'Creado',
          description: 'El nuevo trámite ha sido creado exitosamente',
        });
      }
      setIsDialogOpen(false);
      setEditingItem(null);
      setFormData({
        nombre: '',
        tipo: 'Certificacion',
        costo: 0,
        tiempoDias: '',
        requisitosHtml: '',
        activo: true,
      });
      await loadTramites();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudo guardar el trámite',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (item: TramiteDef) => {
    setEditingItem(item);
    setFormData({
      nombre: item.nombre,
      tipo: item.tipo,
      costo: item.costo,
      tiempoDias: item.tiempoDias,
      requisitosHtml: item.requisitosHtml,
      activo: item.activo,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await tramiteDefRepo.remove(itemToDelete);
      toast({
        title: 'Eliminado',
        description: 'El trámite ha sido eliminado exitosamente',
      });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      await loadTramites();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el trámite',
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
          <h1 className="text-3xl font-bold text-ink-900">Definiciones de Trámites</h1>
          <p className="text-ink-600 mt-2">Gestiona los tipos de trámites disponibles para los ciudadanos</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button
            onClick={() => {
              setEditingItem(null);
              setFormData({
                nombre: '',
                tipo: 'Certificacion',
                costo: 0,
                tiempoDias: '',
                requisitosHtml: '',
                activo: true,
              });
              setIsDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Trámite
          </Button>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Editar' : 'Crear'} Trámite</DialogTitle>
              <DialogDescription>
                Complete los campos para {editingItem ? 'actualizar' : 'crear'} una definición de trámite
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Trámite *</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo *</Label>
                  <Select
                    value={formData.tipo}
                    onValueChange={(value) => setFormData({ ...formData, tipo: value as TipoTramite })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Certificacion">Certificación</SelectItem>
                      <SelectItem value="Permiso">Permiso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="costo">Costo (USD) *</Label>
                  <Input
                    id="costo"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.costo}
                    onChange={(e) => setFormData({ ...formData, costo: parseFloat(e.target.value) || 0 })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tiempoDias">Tiempo Estimado *</Label>
                <Input
                  id="tiempoDias"
                  value={formData.tiempoDias}
                  onChange={(e) => setFormData({ ...formData, tiempoDias: e.target.value })}
                  placeholder="Ej: 1-2, 5-8"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requisitosHtml">Requisitos (HTML) *</Label>
                <Textarea
                  id="requisitosHtml"
                  value={formData.requisitosHtml}
                  onChange={(e) => setFormData({ ...formData, requisitosHtml: e.target.value })}
                  rows={6}
                  required
                  className="font-mono text-sm"
                />
                <p className="text-xs text-ink-500">Puedes usar HTML para formatear los requisitos</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="activo">Activo</Label>
                  <p className="text-sm text-ink-500">Mostrar en el catálogo público</p>
                </div>
                <Switch
                  id="activo"
                  checked={formData.activo}
                  onCheckedChange={(checked) => setFormData({ ...formData, activo: checked })}
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
          <CardTitle>Lista de Trámites</CardTitle>
          <CardDescription>Administra las definiciones de trámites disponibles</CardDescription>
        </CardHeader>
        <CardContent>
          {tramites.length === 0 ? (
            <div className="text-center py-8 text-ink-500">
              <p>No hay trámites registrados</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Costo</TableHead>
                  <TableHead>Tiempo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tramites.map((tramite) => (
                  <TableRow key={tramite.id}>
                    <TableCell className="font-medium">{tramite.nombre}</TableCell>
                    <TableCell>
                      <Badge variant={tramite.tipo === 'Certificacion' ? 'default' : 'aprobado'}>
                        {tramite.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-ink-500" />
                        {tramite.costo === 0 ? 'Gratis' : `$${tramite.costo}`}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-ink-500" />
                        {tramite.tiempoDias} días
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={tramite.activo ? 'aprobado' : 'default'}>
                        {tramite.activo ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(tramite)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setItemToDelete(tramite.id);
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
              Esta acción no se puede deshacer. Se eliminará permanentemente esta definición de trámite.
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

export default TramitesDefAdmin;

