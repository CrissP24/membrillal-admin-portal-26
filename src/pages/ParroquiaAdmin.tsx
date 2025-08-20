import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, MapPin, History, Thermometer, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { mockParroquiaData } from '@/data/mockData';

const ParroquiaAdmin = () => {
  const [activeTab, setActiveTab] = useState('historia');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    tipo: 'historia'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      toast({
        title: "Actualizado",
        description: "La información ha sido actualizada exitosamente.",
      });
    } else {
      toast({
        title: "Creado",
        description: "La nueva información ha sido creada exitosamente.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({ titulo: '', contenido: '', tipo: 'historia' });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      titulo: item.titulo,
      contenido: item.contenido,
      tipo: item.tipo
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Eliminado",
      description: "La información ha sido eliminada exitosamente.",
    });
  };

  const TabIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'historia': return <History className="h-4 w-4" />;
      case 'geografia': return <MapPin className="h-4 w-4" />;
      case 'clima': return <Thermometer className="h-4 w-4" />;
      case 'demografia': return <Users className="h-4 w-4" />;
      default: return <History className="h-4 w-4" />;
    }
  };

  const getDataByType = (tipo: string) => {
    return mockParroquiaData.filter(item => item.tipo === tipo);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Información de la Parroquia</h1>
          <p className="text-muted-foreground">
            Gestiona la información histórica, geográfica y demográfica de Membrillal
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingItem(null);
              setFormData({ titulo: '', contenido: '', tipo: activeTab });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Información
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Editar' : 'Agregar'} Información
              </DialogTitle>
              <DialogDescription>
                Complete los campos para {editingItem ? 'actualizar' : 'agregar'} información de la parroquia.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                  placeholder="Ingrese el título"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contenido">Contenido</Label>
                <Textarea
                  id="contenido"
                  value={formData.contenido}
                  onChange={(e) => setFormData({...formData, contenido: e.target.value})}
                  placeholder="Ingrese el contenido detallado"
                  rows={8}
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="historia" className="flex items-center gap-2">
            <TabIcon type="historia" />
            Historia
          </TabsTrigger>
          <TabsTrigger value="geografia" className="flex items-center gap-2">
            <TabIcon type="geografia" />
            Geografía
          </TabsTrigger>
          <TabsTrigger value="clima" className="flex items-center gap-2">
            <TabIcon type="clima" />
            Clima
          </TabsTrigger>
          <TabsTrigger value="demografia" className="flex items-center gap-2">
            <TabIcon type="demografia" />
            Demografía
          </TabsTrigger>
        </TabsList>

        {['historia', 'geografia', 'clima', 'demografia'].map((tipo) => (
          <TabsContent key={tipo} value={tipo}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TabIcon type={tipo} />
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)} de Membrillal
                </CardTitle>
                <CardDescription>
                  Gestiona la información sobre {tipo} de la parroquia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Contenido</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getDataByType(tipo).map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.titulo}</TableCell>
                        <TableCell className="max-w-md">
                          <p className="truncate">{item.contenido}</p>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">Publicado</Badge>
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ParroquiaAdmin;