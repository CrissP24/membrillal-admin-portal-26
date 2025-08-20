import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Users, Calendar, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { mockComisionesData } from '@/data/mockData';

const ComisionesAdmin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    presidente: '',
    miembros: '',
    reuniones: '',
    estado: 'activa'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      toast({
        title: "Actualizada",
        description: "La comisión ha sido actualizada exitosamente.",
      });
    } else {
      toast({
        title: "Creada",
        description: "La nueva comisión ha sido creada exitosamente.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({ nombre: '', descripcion: '', presidente: '', miembros: '', reuniones: '', estado: 'activa' });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      nombre: item.nombre,
      descripcion: item.descripcion,
      presidente: item.presidente,
      miembros: item.miembros.join(', '),
      reuniones: item.reuniones,
      estado: item.estado
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Eliminada",
      description: "La comisión ha sido eliminada exitosamente.",
    });
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'activa':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Activa</Badge>;
      case 'inactiva':
        return <Badge variant="secondary">Inactiva</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Comisiones del GAD</h1>
          <p className="text-muted-foreground">
            Gestiona las comisiones de trabajo del GAD Parroquial Membrillal
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingItem(null);
              setFormData({ nombre: '', descripcion: '', presidente: '', miembros: '', reuniones: '', estado: 'activa' });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Comisión
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Editar' : 'Crear'} Comisión
              </DialogTitle>
              <DialogDescription>
                Complete los campos para {editingItem ? 'actualizar' : 'crear'} una comisión de trabajo.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre de la Comisión</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  placeholder="Ej: Comisión de Planificación y Presupuesto"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  placeholder="Breve descripción de las funciones y objetivos de la comisión"
                  rows={3}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="presidente">Presidente</Label>
                <Input
                  id="presidente"
                  value={formData.presidente}
                  onChange={(e) => setFormData({...formData, presidente: e.target.value})}
                  placeholder="Nombre del presidente de la comisión"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="miembros">Miembros</Label>
                <Textarea
                  id="miembros"
                  value={formData.miembros}
                  onChange={(e) => setFormData({...formData, miembros: e.target.value})}
                  placeholder="Nombres de los miembros separados por comas"
                  rows={2}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reuniones">Cronograma de Reuniones</Label>
                <Input
                  id="reuniones"
                  value={formData.reuniones}
                  onChange={(e) => setFormData({...formData, reuniones: e.target.value})}
                  placeholder="Ej: Primer lunes de cada mes"
                  required
                />
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
            <Users className="h-5 w-5" />
            Comisiones de Trabajo
          </CardTitle>
          <CardDescription>
            Administra las comisiones especializadas del GAD Parroquial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Comisión</TableHead>
                <TableHead>Presidente</TableHead>
                <TableHead>Miembros</TableHead>
                <TableHead>Reuniones</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockComisionesData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.nombre}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.descripcion}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.presidente}</TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      {item.miembros.map((miembro, index) => (
                        <div key={index} className="text-sm">
                          • {miembro}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {item.reuniones}
                    </div>
                  </TableCell>
                  <TableCell>
                    {getEstadoBadge(item.estado)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
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

export default ComisionesAdmin;