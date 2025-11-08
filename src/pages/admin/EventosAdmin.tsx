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
import { Plus, Edit, Trash2, Calendar, MapPin, Clock, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { eventosService } from '@/domain/services';
import type { Evento, EstadoEvento } from '@/domain/models/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';
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

const EventosAdmin: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Evento | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    titulo: '',
    fecha: '',
    hora: '',
    lugar: '',
    descripcionHtml: '',
    estado: 'programado' as EstadoEvento,
    etiquetas: '',
  });

  useEffect(() => {
    loadEventos();
  }, []);

  const loadEventos = async () => {
    try {
      setLoading(true);
      const result = await eventosService.list({ orderBy: 'fecha', orderDir: 'asc' });
      setEventos(result.items);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los eventos',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const etiquetasArray = formData.etiquetas
        .split(',')
        .map((e) => e.trim())
        .filter((e) => e.length > 0);

      if (editingItem) {
        await eventosService.actualizar(editingItem.id, {
          titulo: formData.titulo,
          fecha: formData.fecha,
          hora: formData.hora || undefined,
          lugar: formData.lugar || undefined,
          descripcionHtml: formData.descripcionHtml || undefined,
          estado: formData.estado,
          etiquetas: etiquetasArray.length > 0 ? etiquetasArray : undefined,
        });
        toast({
          title: 'Actualizado',
          description: 'El evento ha sido actualizado exitosamente',
        });
      } else {
        await eventosService.programar({
          titulo: formData.titulo,
          fecha: formData.fecha,
          hora: formData.hora || undefined,
          lugar: formData.lugar || undefined,
          descripcionHtml: formData.descripcionHtml || undefined,
          estado: formData.estado,
          etiquetas: etiquetasArray.length > 0 ? etiquetasArray : undefined,
        });
        toast({
          title: 'Creado',
          description: 'El nuevo evento ha sido creado exitosamente',
        });
      }
      setIsDialogOpen(false);
      setEditingItem(null);
      setFormData({
        titulo: '',
        fecha: '',
        hora: '',
        lugar: '',
        descripcionHtml: '',
        estado: 'programado',
        etiquetas: '',
      });
      await loadEventos();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudo guardar el evento',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (item: Evento) => {
    setEditingItem(item);
    setFormData({
      titulo: item.titulo,
      fecha: item.fecha,
      hora: item.hora || '',
      lugar: item.lugar || '',
      descripcionHtml: item.descripcionHtml || '',
      estado: item.estado,
      etiquetas: item.etiquetas?.join(', ') || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      // Cambiar estado a cancelado en lugar de eliminar
      await eventosService.cambiarEstado(itemToDelete, 'cancelado');
      toast({
        title: 'Cancelado',
        description: 'El evento ha sido cancelado',
      });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      await loadEventos();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudo cancelar el evento',
        variant: 'destructive',
      });
    }
  };

  const handleEstadoChange = async (id: string, nuevoEstado: EstadoEvento) => {
    try {
      await eventosService.cambiarEstado(id, nuevoEstado);
      toast({
        title: 'Actualizado',
        description: 'El estado del evento ha sido actualizado',
      });
      await loadEventos();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el estado',
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
          <h1 className="text-3xl font-bold text-ink-900">Eventos y Agenda</h1>
          <p className="text-ink-600 mt-2">Gestiona los eventos y actividades del GAD</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button
            onClick={() => {
              setEditingItem(null);
              setFormData({
                titulo: '',
                fecha: '',
                hora: '',
                lugar: '',
                descripcionHtml: '',
                estado: 'programado',
                etiquetas: '',
              });
              setIsDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Evento
          </Button>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Editar' : 'Crear'} Evento</DialogTitle>
              <DialogDescription>
                Complete los campos para {editingItem ? 'actualizar' : 'crear'} un evento
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título *</Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fecha">Fecha *</Label>
                  <Input
                    id="fecha"
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hora">Hora</Label>
                  <Input
                    id="hora"
                    type="time"
                    value={formData.hora}
                    onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lugar">Lugar</Label>
                <Input
                  id="lugar"
                  value={formData.lugar}
                  onChange={(e) => setFormData({ ...formData, lugar: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Select
                  value={formData.estado}
                  onValueChange={(value) => setFormData({ ...formData, estado: value as EstadoEvento })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="programado">Programado</SelectItem>
                    <SelectItem value="realizado">Realizado</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcionHtml">Descripción (HTML)</Label>
                <Textarea
                  id="descripcionHtml"
                  value={formData.descripcionHtml}
                  onChange={(e) => setFormData({ ...formData, descripcionHtml: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="etiquetas">Etiquetas (separadas por comas)</Label>
                <Input
                  id="etiquetas"
                  value={formData.etiquetas}
                  onChange={(e) => setFormData({ ...formData, etiquetas: e.target.value })}
                  placeholder="tag1, tag2, tag3"
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
            <Calendar className="h-5 w-5" />
            Lista de Eventos
          </CardTitle>
          <CardDescription>Administra los eventos y actividades programadas</CardDescription>
        </CardHeader>
        <CardContent>
          {eventos.length === 0 ? (
            <div className="text-center py-8 text-ink-500">
              <p>No hay eventos registrados</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Lugar</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {eventos.map((evento) => (
                  <TableRow key={evento.id}>
                    <TableCell className="font-medium">{evento.titulo}</TableCell>
                    <TableCell>
                      {format(new Date(evento.fecha), 'dd MMM yyyy', { locale: es })}
                    </TableCell>
                    <TableCell>
                      {evento.hora ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3" />
                          {evento.hora}
                        </div>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      {evento.lugar ? (
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3" />
                          {evento.lugar}
                        </div>
                      ) : (
                        '-'
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={evento.estado}>{evento.estado}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Select
                          value={evento.estado}
                          onValueChange={(value) => handleEstadoChange(evento.id, value as EstadoEvento)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="programado">Programado</SelectItem>
                            <SelectItem value="realizado">Realizado</SelectItem>
                            <SelectItem value="cancelado">Cancelado</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button size="sm" variant="outline" onClick={() => handleEdit(evento)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setItemToDelete(evento.id);
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
              Esta acción cancelará el evento. ¿Deseas continuar?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Cancelar Evento</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EventosAdmin;

