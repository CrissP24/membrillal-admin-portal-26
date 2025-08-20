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
import { Plus, Edit, Trash2, Megaphone, Search, Filter, Eye, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const comunicadosData = [
  {
    id: 1,
    titulo: 'Suspensión temporal del servicio de agua potable',
    contenido: 'Se informa a la ciudadanía que el día 25 de enero se suspenderá temporalmente el servicio de agua potable en el sector centro para realizar trabajos de mantenimiento preventivo...',
    tipo: 'servicio',
    prioridad: 'alta',
    fechaPublicacion: '2024-01-20',
    fechaVencimiento: '2024-01-26',
    estado: 'publicado',
    autor: 'GAD Parroquial Membrillal',
    alcance: 'general'
  },
  {
    id: 2,
    titulo: 'Convocatoria para conformación de veedurías ciudadanas',
    contenido: 'El GAD Parroquial de Membrillal convoca a los ciudadanos interesados en participar en la conformación de veedurías ciudadanas para el año 2024...',
    tipo: 'convocatoria',
    prioridad: 'media',
    fechaPublicacion: '2024-01-18',
    fechaVencimiento: '2024-02-18',
    estado: 'publicado',
    autor: 'Secretaría GAD',
    alcance: 'general'
  },
  {
    id: 3,
    titulo: 'Medidas preventivas por temporada invernal',
    contenido: 'Ante la proximidad de la temporada lluviosa, el GAD Parroquial recomienda a la ciudadanía tomar las siguientes medidas preventivas...',
    tipo: 'informativo',
    prioridad: 'media',
    fechaPublicacion: '2024-01-15',
    fechaVencimiento: '2024-05-31',
    estado: 'borrador',
    autor: 'Comisión de Riesgos',
    alcance: 'general'
  }
];

const ComunicadosAdmin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    tipo: 'informativo',
    prioridad: 'media',
    fechaVencimiento: '',
    alcance: 'general',
    estado: 'borrador'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      toast({
        title: "Actualizado",
        description: "El comunicado ha sido actualizado exitosamente.",
      });
    } else {
      toast({
        title: "Creado",
        description: "El nuevo comunicado ha sido creado exitosamente.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({ titulo: '', contenido: '', tipo: 'informativo', prioridad: 'media', fechaVencimiento: '', alcance: 'general', estado: 'borrador' });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      titulo: item.titulo,
      contenido: item.contenido,
      tipo: item.tipo,
      prioridad: item.prioridad,
      fechaVencimiento: item.fechaVencimiento,
      alcance: item.alcance,
      estado: item.estado
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Eliminado",
      description: "El comunicado ha sido eliminado exitosamente.",
    });
  };

  const handlePublish = (id: number) => {
    toast({
      title: "Publicado",
      description: "El comunicado ha sido publicado y está visible en el sitio público.",
    });
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'publicado':
        return <Badge className="bg-green-100 text-green-800">Publicado</Badge>;
      case 'borrador':
        return <Badge className="bg-yellow-100 text-yellow-800">Borrador</Badge>;
      case 'revision':
        return <Badge className="bg-blue-100 text-blue-800">En Revisión</Badge>;
      case 'vencido':
        return <Badge variant="destructive">Vencido</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const getPrioridadBadge = (prioridad: string) => {
    switch (prioridad) {
      case 'alta':
        return <Badge variant="destructive">Alta</Badge>;
      case 'media':
        return <Badge className="bg-orange-100 text-orange-800">Media</Badge>;
      case 'baja':
        return <Badge variant="secondary">Baja</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'informativo':
        return <Badge className="bg-blue-100 text-blue-800">Informativo</Badge>;
      case 'servicio':
        return <Badge className="bg-purple-100 text-purple-800">Servicio</Badge>;
      case 'convocatoria':
        return <Badge className="bg-green-100 text-green-800">Convocatoria</Badge>;
      case 'emergencia':
        return <Badge variant="destructive">Emergencia</Badge>;
      default:
        return <Badge variant="outline">Otro</Badge>;
    }
  };

  const filteredData = comunicadosData.filter(item => {
    const matchSearch = item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.contenido.toLowerCase().includes(searchTerm.toLowerCase());
    const matchEstado = filterEstado === 'todos' || item.estado === filterEstado;
    return matchSearch && matchEstado;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Comunicados Oficiales</h1>
          <p className="text-muted-foreground">
            Gestiona los comunicados y anuncios oficiales del GAD Parroquial
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingItem(null);
              setFormData({ titulo: '', contenido: '', tipo: 'informativo', prioridad: 'media', fechaVencimiento: '', alcance: 'general', estado: 'borrador' });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Comunicado
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Editar' : 'Crear'} Comunicado
              </DialogTitle>
              <DialogDescription>
                Complete los campos para {editingItem ? 'actualizar' : 'crear'} un comunicado oficial.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título del Comunicado</Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                  placeholder="Ej: Suspensión temporal del servicio de agua potable"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contenido">Contenido</Label>
                <Textarea
                  id="contenido"
                  value={formData.contenido}
                  onChange={(e) => setFormData({...formData, contenido: e.target.value})}
                  placeholder="Escriba el contenido completo del comunicado..."
                  rows={8}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select onValueChange={(value) => setFormData({...formData, tipo: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="informativo">Informativo</SelectItem>
                      <SelectItem value="servicio">Servicio</SelectItem>
                      <SelectItem value="convocatoria">Convocatoria</SelectItem>
                      <SelectItem value="emergencia">Emergencia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="prioridad">Prioridad</Label>
                  <Select onValueChange={(value) => setFormData({...formData, prioridad: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar prioridad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baja">Baja</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alcance">Alcance</Label>
                  <Select onValueChange={(value) => setFormData({...formData, alcance: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar alcance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="sectorial">Sectorial</SelectItem>
                      <SelectItem value="interno">Interno</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fechaVencimiento">Fecha de Vencimiento (Opcional)</Label>
                  <Input
                    id="fechaVencimiento"
                    type="date"
                    value={formData.fechaVencimiento}
                    onChange={(e) => setFormData({...formData, fechaVencimiento: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select onValueChange={(value) => setFormData({...formData, estado: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="borrador">Borrador</SelectItem>
                      <SelectItem value="revision">En Revisión</SelectItem>
                      <SelectItem value="publicado">Publicado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingItem ? 'Actualizar' : 'Guardar'}
                </Button>
                {formData.estado === 'borrador' && (
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Guardar y Publicar
                  </Button>
                )}
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar comunicados..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="w-48">
              <Select value={filterEstado} onValueChange={setFilterEstado}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="borrador">Borrador</SelectItem>
                  <SelectItem value="revision">En Revisión</SelectItem>
                  <SelectItem value="publicado">Publicado</SelectItem>
                  <SelectItem value="vencido">Vencido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5" />
            Lista de Comunicados
          </CardTitle>
          <CardDescription>
            Administra los comunicados oficiales del GAD Parroquial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Comunicado</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.titulo}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.contenido.substring(0, 100)}...
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Por: {item.autor}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getTipoBadge(item.tipo)}
                  </TableCell>
                  <TableCell>
                    {getPrioridadBadge(item.prioridad)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>Pub: {item.fechaPublicacion}</div>
                      {item.fechaVencimiento && (
                        <div>Vence: {item.fechaVencimiento}</div>
                      )}
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
                      {item.estado === 'borrador' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handlePublish(item.id)}
                          className="bg-green-50 text-green-700 hover:bg-green-100"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
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

export default ComunicadosAdmin;