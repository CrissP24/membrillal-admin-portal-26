import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Edit, Trash2, Users, Phone, Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { mockOrganizacionData } from '@/data/mockData';

const OrganizacionAdmin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    cargo: '',
    telefono: '',
    email: '',
    periodo: '',
    biografia: '',
    tipo: 'autoridad'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      toast({
        title: "Actualizado",
        description: "La información del miembro ha sido actualizada exitosamente.",
      });
    } else {
      toast({
        title: "Creado",
        description: "El nuevo miembro ha sido agregado exitosamente.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({ nombre: '', cargo: '', telefono: '', email: '', periodo: '', biografia: '', tipo: 'autoridad' });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      nombre: item.nombre,
      cargo: item.cargo,
      telefono: item.telefono,
      email: item.email,
      periodo: item.periodo,
      biografia: item.biografia,
      tipo: item.tipo
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Eliminado",
      description: "El miembro ha sido eliminado exitosamente.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Organización GAD</h1>
          <p className="text-muted-foreground">
            Gestiona la información de autoridades y funcionarios del GAD Parroquial
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingItem(null);
              setFormData({ nombre: '', cargo: '', telefono: '', email: '', periodo: '', biografia: '', tipo: 'autoridad' });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Miembro
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Editar' : 'Agregar'} Miembro
              </DialogTitle>
              <DialogDescription>
                Complete los campos para {editingItem ? 'actualizar' : 'agregar'} un miembro de la organización.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre Completo</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    placeholder="Ej: Ing. Carlos Mendoza"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input
                    id="cargo"
                    value={formData.cargo}
                    onChange={(e) => setFormData({...formData, cargo: e.target.value})}
                    placeholder="Ej: Presidente del GAD"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                    placeholder="07-2956123"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="ejemplo@gadmembrillal.gob.ec"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="periodo">Período</Label>
                <Input
                  id="periodo"
                  value={formData.periodo}
                  onChange={(e) => setFormData({...formData, periodo: e.target.value})}
                  placeholder="2023-2027"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="biografia">Biografía</Label>
                <Textarea
                  id="biografia"
                  value={formData.biografia}
                  onChange={(e) => setFormData({...formData, biografia: e.target.value})}
                  placeholder="Breve descripción de la experiencia y formación"
                  rows={4}
                  required
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingItem ? 'Actualizar' : 'Guardar'}
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
            Autoridades y Funcionarios
          </CardTitle>
          <CardDescription>
            Información de las autoridades electas y funcionarios del GAD Parroquial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Miembro</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>Contacto</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrganizacionData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={item.foto} alt={item.nombre} />
                        <AvatarFallback>{item.nombre.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{item.nombre}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-xs">
                          {item.biografia}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.cargo}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {item.telefono}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {item.email}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{item.periodo}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Activo</Badge>
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

export default OrganizacionAdmin;