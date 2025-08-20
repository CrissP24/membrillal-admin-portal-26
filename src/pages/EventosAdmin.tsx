import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus, Edit, Trash2, Calendar as CalendarIcon, MapPin, Clock, User, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { mockEventosData } from '@/data/mockData';

const EventosAdmin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [fechaInicio, setFechaInicio] = useState<Date>();
  const [fechaFin, setFechaFin] = useState<Date>();
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    lugar: '',
    tipo: 'reunion',
    responsable: '',
    horaInicio: '',
    horaFin: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      toast({
        title: "Actualizado",
        description: "El evento ha sido actualizado exitosamente.",
      });
    } else {
      toast({
        title: "Creado",
        description: "El nuevo evento ha sido creado exitosamente.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({ titulo: '', descripcion: '', lugar: '', tipo: 'reunion', responsable: '', horaInicio: '', horaFin: '' });
    setFechaInicio(undefined);
    setFechaFin(undefined);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      titulo: item.titulo,
      descripcion: item.descripcion,
      lugar: item.lugar,
      tipo: item.tipo,
      responsable: item.responsable,
      horaInicio: new Date(item.fechaInicio).toTimeString().slice(0, 5),
      horaFin: new Date(item.fechaFin).toTimeString().slice(0, 5)
    });
    setFechaInicio(new Date(item.fechaInicio));
    setFechaFin(new Date(item.fechaFin));
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Eliminado",
      description: "El evento ha sido eliminado exitosamente.",
    });
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'programado':
        return <Badge className="bg-blue-100 text-blue-800">Programado</Badge>;
      case 'en_curso':
        return <Badge className="bg-green-100 text-green-800">En Curso</Badge>;
      case 'finalizado':
        return <Badge variant="secondary">Finalizado</Badge>;
      case 'cancelado':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'reunion':
        return <Badge variant="outline">Reunión</Badge>;
      case 'cultural':
        return <Badge className="bg-purple-100 text-purple-800">Cultural</Badge>;
      case 'comunitario':
        return <Badge className="bg-green-100 text-green-800">Comunitario</Badge>;
      case 'capacitacion':
        return <Badge className="bg-orange-100 text-orange-800">Capacitación</Badge>;
      default:
        return <Badge variant="outline">Otro</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Eventos y Agenda</h1>
          <p className="text-muted-foreground">
            Gestiona la agenda de eventos y actividades del GAD Parroquial
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingItem(null);
              setFormData({ titulo: '', descripcion: '', lugar: '', tipo: 'reunion', responsable: '', horaInicio: '', horaFin: '' });
              setFechaInicio(undefined);
              setFechaFin(undefined);
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Editar' : 'Crear'} Evento
              </DialogTitle>
              <DialogDescription>
                Complete los campos para {editingItem ? 'actualizar' : 'crear'} un evento en la agenda.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título del Evento</Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                  placeholder="Ej: Sesión Ordinaria del Consejo Parroquial"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  placeholder="Descripción detallada del evento"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Evento</Label>
                  <Select onValueChange={(value) => setFormData({...formData, tipo: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reunion">Reunión</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="comunitario">Comunitario</SelectItem>
                      <SelectItem value="capacitacion">Capacitación</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="responsable">Responsable</Label>
                  <Input
                    id="responsable"
                    value={formData.responsable}
                    onChange={(e) => setFormData({...formData, responsable: e.target.value})}
                    placeholder="Nombre del responsable"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lugar">Lugar</Label>
                <Input
                  id="lugar"
                  value={formData.lugar}
                  onChange={(e) => setFormData({...formData, lugar: e.target.value})}
                  placeholder="Ubicación del evento"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Fecha de Inicio</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !fechaInicio && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {fechaInicio ? format(fechaInicio, "PPP") : <span>Seleccionar fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={fechaInicio}
                        onSelect={setFechaInicio}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Fecha de Fin</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !fechaFin && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {fechaFin ? format(fechaFin, "PPP") : <span>Seleccionar fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={fechaFin}
                        onSelect={setFechaFin}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="horaInicio">Hora de Inicio</Label>
                  <Input
                    id="horaInicio"
                    type="time"
                    value={formData.horaInicio}
                    onChange={(e) => setFormData({...formData, horaInicio: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="horaFin">Hora de Fin</Label>
                  <Input
                    id="horaFin"
                    type="time"
                    value={formData.horaFin}
                    onChange={(e) => setFormData({...formData, horaFin: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingItem ? 'Actualizar' : 'Crear'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Agenda de Eventos
          </CardTitle>
          <CardDescription>
            Administra los eventos y actividades programadas del GAD Parroquial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Evento</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Fecha y Hora</TableHead>
                <TableHead>Lugar</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockEventosData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.titulo}</p>
                      <p className="text-sm text-muted-foreground">{item.descripcion}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getTipoBadge(item.tipo)}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <CalendarIcon className="h-3 w-3" />
                        {format(new Date(item.fechaInicio), "dd/MM/yyyy")}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3 w-3" />
                        {format(new Date(item.fechaInicio), "HH:mm")} - {format(new Date(item.fechaFin), "HH:mm")}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.lugar}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {item.responsable}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getEstadoBadge(item.estado)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(item)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventosAdmin;