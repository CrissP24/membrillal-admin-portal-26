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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, MapPin, Camera, Star, Globe, Eye, Image as ImageIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { turismoData } from '@/data/mockData';

const TurismoAdmin = () => {
  const [activeTab, setActiveTab] = useState('lugares');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    categoria: 'natural',
    ubicacion: '',
    servicios: '',
    coordenadas: { lat: '', lng: '' },
    estado: 'activo'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      toast({
        title: "Actualizado",
        description: "El lugar turístico ha sido actualizado exitosamente.",
      });
    } else {
      toast({
        title: "Creado",
        description: "El nuevo lugar turístico ha sido creado exitosamente.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({ 
      nombre: '', 
      descripcion: '', 
      categoria: 'natural', 
      ubicacion: '', 
      servicios: '', 
      coordenadas: { lat: '', lng: '' }, 
      estado: 'activo' 
    });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      nombre: item.nombre,
      descripcion: item.descripcion,
      categoria: item.categoria,
      ubicacion: item.ubicacion,
      servicios: Array.isArray(item.servicios) ? item.servicios.join(', ') : item.servicios,
      coordenadas: {
        lat: item.coordenadas?.lat?.toString() || '',
        lng: item.coordenadas?.lng?.toString() || ''
      },
      estado: item.estado
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Eliminado",
      description: "El lugar turístico ha sido eliminado exitosamente.",
    });
  };

  const getCategoriaBadge = (categoria: string) => {
    switch (categoria) {
      case 'natural':
        return <Badge className="bg-green-100 text-green-800">Natural</Badge>;
      case 'cultural':
        return <Badge className="bg-purple-100 text-purple-800">Cultural</Badge>;
      case 'aventura':
        return <Badge className="bg-orange-100 text-orange-800">Aventura</Badge>;
      case 'gastronomico':
        return <Badge className="bg-yellow-100 text-yellow-800">Gastronómico</Badge>;
      case 'religioso':
        return <Badge className="bg-blue-100 text-blue-800">Religioso</Badge>;
      default:
        return <Badge variant="outline">Otro</Badge>;
    }
  };

  const getEstadoBadge = (estado: string) => {
    return estado === 'activo' 
      ? <Badge className="bg-green-100 text-green-800">Activo</Badge>
      : <Badge variant="secondary">Inactivo</Badge>;
  };

  const eventosData = [
    {
      id: 1,
      nombre: 'Festival de la Cosecha',
      fecha: '2024-03-15',
      descripcion: 'Celebración anual de la cosecha con música, danza y gastronomía local',
      tipo: 'cultural',
      lugar: 'Plaza Central',
      estado: 'programado'
    },
    {
      id: 2,
      nombre: 'Ruta del Cacao',
      fecha: '2024-02-20',
      descripcion: 'Tour por las plantaciones de cacao de la zona',
      tipo: 'gastronomico',
      lugar: 'Fincas locales',
      estado: 'programado'
    }
  ];

  const gastronomiaData = [
    {
      id: 1,
      nombre: 'Bolón de Verde',
      descripcion: 'Plato tradicional elaborado con plátano verde majado y chicharrón',
      categoria: 'plato_principal',
      ingredientes: 'Plátano verde, chicharrón, cebolla, sal',
      origen: 'Tradicional de la costa ecuatoriana',
      disponibilidad: 'Todo el año'
    },
    {
      id: 2,
      nombre: 'Ceviche de Camarón',
      descripcion: 'Camarones frescos marinados en limón con cebolla y cilantro',
      categoria: 'entrada',
      ingredientes: 'Camarones, limón, cebolla, cilantro, sal',
      origen: 'Costa ecuatoriana',
      disponibilidad: 'Todo el año'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Turismo y Cultura</h1>
          <p className="text-muted-foreground">
            Gestiona los atractivos turísticos, eventos culturales y gastronomía de Membrillal
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingItem(null);
              setFormData({ 
                nombre: '', 
                descripcion: '', 
                categoria: 'natural', 
                ubicacion: '', 
                servicios: '', 
                coordenadas: { lat: '', lng: '' }, 
                estado: 'activo' 
              });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Lugar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Editar' : 'Agregar'} Lugar Turístico
              </DialogTitle>
              <DialogDescription>
                Complete los campos para {editingItem ? 'actualizar' : 'agregar'} un destino turístico.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Lugar</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  placeholder="Ej: Cascada El Salto"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  placeholder="Descripción detallada del lugar turístico"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoría</Label>
                  <Select onValueChange={(value) => setFormData({...formData, categoria: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="natural">Natural</SelectItem>
                      <SelectItem value="cultural">Cultural</SelectItem>
                      <SelectItem value="aventura">Aventura</SelectItem>
                      <SelectItem value="gastronomico">Gastronómico</SelectItem>
                      <SelectItem value="religioso">Religioso</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ubicacion">Ubicación</Label>
                  <Input
                    id="ubicacion"
                    value={formData.ubicacion}
                    onChange={(e) => setFormData({...formData, ubicacion: e.target.value})}
                    placeholder="Sector o dirección"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="servicios">Servicios Disponibles</Label>
                <Input
                  id="servicios"
                  value={formData.servicios}
                  onChange={(e) => setFormData({...formData, servicios: e.target.value})}
                  placeholder="Ej: Guías turísticos, senderos, miradores (separados por comas)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lat">Latitud</Label>
                  <Input
                    id="lat"
                    type="number"
                    step="any"
                    value={formData.coordenadas.lat}
                    onChange={(e) => setFormData({
                      ...formData, 
                      coordenadas: { ...formData.coordenadas, lat: e.target.value }
                    })}
                    placeholder="-1.234567"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lng">Longitud</Label>
                  <Input
                    id="lng"
                    type="number"
                    step="any"
                    value={formData.coordenadas.lng}
                    onChange={(e) => setFormData({
                      ...formData, 
                      coordenadas: { ...formData.coordenadas, lng: e.target.value }
                    })}
                    placeholder="-78.123456"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="imagenes">Imágenes</Label>
                <Input
                  id="imagenes"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => console.log('Imágenes seleccionadas:', e.target.files)}
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lugares" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Lugares Turísticos
          </TabsTrigger>
          <TabsTrigger value="eventos" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Eventos Culturales
          </TabsTrigger>
          <TabsTrigger value="gastronomia" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Gastronomía
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lugares">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Destinos Turísticos
              </CardTitle>
              <CardDescription>
                Administra los lugares turísticos y atractivos de Membrillal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lugar</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Ubicación</TableHead>
                    <TableHead>Servicios</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {turismoData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-gray-400" />
                          </div>
                          <div>
                            <p className="font-medium">{item.nombre}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {item.descripcion}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getCategoriaBadge(item.categoria)}
                      </TableCell>
                      <TableCell>{item.ubicacion}</TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          {Array.isArray(item.servicios) ? item.servicios.join(', ') : item.servicios}
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
                          <Button size="sm" variant="outline">
                            <Camera className="h-4 w-4" />
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
        </TabsContent>

        <TabsContent value="eventos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Eventos Culturales
              </CardTitle>
              <CardDescription>
                Festivales, tradiciones y eventos culturales de la parroquia
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Evento</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Lugar</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventosData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.nombre}</p>
                          <p className="text-sm text-muted-foreground">{item.descripcion}</p>
                        </div>
                      </TableCell>
                      <TableCell>{item.fecha}</TableCell>
                      <TableCell>
                        {getCategoriaBadge(item.tipo)}
                      </TableCell>
                      <TableCell>{item.lugar}</TableCell>
                      <TableCell>
                        <Badge className="bg-blue-100 text-blue-800">Programado</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
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

        <TabsContent value="gastronomia">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Gastronomía Local
              </CardTitle>
              <CardDescription>
                Platos típicos y tradiciones culinarias de Membrillal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plato</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Ingredientes</TableHead>
                    <TableHead>Disponibilidad</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gastronomiaData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.nombre}</p>
                          <p className="text-sm text-muted-foreground">{item.descripcion}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.categoria}</Badge>
                      </TableCell>
                      <TableCell className="max-w-xs text-sm">{item.ingredientes}</TableCell>
                      <TableCell>{item.disponibilidad}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
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
      </Tabs>
    </div>
  );
};

export default TurismoAdmin;