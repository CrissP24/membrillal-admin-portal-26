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
import { Plus, Edit, Trash2, FileText, Download, Eye, Scale } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const marcoLegalData = [
  {
    id: 1,
    titulo: 'Código Orgánico de Organización Territorial - COOTAD',
    descripcion: 'Marco normativo principal para la organización territorial del Estado',
    categoria: 'ley',
    fechaVigencia: '2024-01-01',
    archivo: 'cootad_2024.pdf',
    estado: 'vigente',
    autoridad: 'Asamblea Nacional'
  },
  {
    id: 2,
    titulo: 'Reglamento Interno del GAD Parroquial Membrillal',
    descripcion: 'Normativa interna para el funcionamiento del GAD Parroquial',
    categoria: 'reglamento',
    fechaVigencia: '2023-03-15',
    archivo: 'reglamento_interno_2023.pdf',
    estado: 'vigente',
    autoridad: 'GAD Parroquial Membrillal'
  },
  {
    id: 3,
    titulo: 'Ordenanza de Participación Ciudadana',
    descripcion: 'Normativa para la participación ciudadana en los procesos de decisión',
    categoria: 'ordenanza',
    fechaVigencia: '2023-06-01',
    archivo: 'ordenanza_participacion.pdf',
    estado: 'vigente',
    autoridad: 'GAD Parroquial Membrillal'
  }
];

const MarcoLegalAdmin = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: 'ley',
    fechaVigencia: '',
    autoridad: '',
    estado: 'vigente'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      toast({
        title: "Actualizado",
        description: "El documento legal ha sido actualizado exitosamente.",
      });
    } else {
      toast({
        title: "Creado",
        description: "El nuevo documento legal ha sido creado exitosamente.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({ titulo: '', descripcion: '', categoria: 'ley', fechaVigencia: '', autoridad: '', estado: 'vigente' });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      titulo: item.titulo,
      descripcion: item.descripcion,
      categoria: item.categoria,
      fechaVigencia: item.fechaVigencia,
      autoridad: item.autoridad,
      estado: item.estado
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Eliminado",
      description: "El documento legal ha sido eliminado exitosamente.",
    });
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'vigente':
        return <Badge className="bg-green-100 text-green-800">Vigente</Badge>;
      case 'derogado':
        return <Badge variant="destructive">Derogado</Badge>;
      case 'proyecto':
        return <Badge className="bg-yellow-100 text-yellow-800">Proyecto</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const getCategoriaBadge = (categoria: string) => {
    switch (categoria) {
      case 'ley':
        return <Badge variant="default">Ley</Badge>;
      case 'reglamento':
        return <Badge className="bg-blue-100 text-blue-800">Reglamento</Badge>;
      case 'ordenanza':
        return <Badge className="bg-purple-100 text-purple-800">Ordenanza</Badge>;
      case 'resolucion':
        return <Badge className="bg-orange-100 text-orange-800">Resolución</Badge>;
      default:
        return <Badge variant="outline">Otro</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Marco Legal y Normativa</h1>
          <p className="text-muted-foreground">
            Gestiona el marco normativo y documentos legales del GAD Parroquial
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingItem(null);
              setFormData({ titulo: '', descripcion: '', categoria: 'ley', fechaVigencia: '', autoridad: '', estado: 'vigente' });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Documento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Editar' : 'Agregar'} Documento Legal
              </DialogTitle>
              <DialogDescription>
                Complete los campos para {editingItem ? 'actualizar' : 'agregar'} un documento normativo.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título del Documento</Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                  placeholder="Ej: Reglamento Interno del GAD"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  placeholder="Breve descripción del contenido y alcance"
                  rows={3}
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
                      <SelectItem value="ley">Ley</SelectItem>
                      <SelectItem value="reglamento">Reglamento</SelectItem>
                      <SelectItem value="ordenanza">Ordenanza</SelectItem>
                      <SelectItem value="resolucion">Resolución</SelectItem>
                      <SelectItem value="acuerdo">Acuerdo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Select onValueChange={(value) => setFormData({...formData, estado: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vigente">Vigente</SelectItem>
                      <SelectItem value="proyecto">Proyecto</SelectItem>
                      <SelectItem value="derogado">Derogado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fechaVigencia">Fecha de Vigencia</Label>
                  <Input
                    id="fechaVigencia"
                    type="date"
                    value={formData.fechaVigencia}
                    onChange={(e) => setFormData({...formData, fechaVigencia: e.target.value})}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="autoridad">Autoridad Emisora</Label>
                  <Input
                    id="autoridad"
                    value={formData.autoridad}
                    onChange={(e) => setFormData({...formData, autoridad: e.target.value})}
                    placeholder="Ej: GAD Parroquial Membrillal"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="archivo">Archivo PDF</Label>
                <Input
                  id="archivo"
                  type="file"
                  accept=".pdf"
                  onChange={(e) => console.log('Archivo seleccionado:', e.target.files?.[0]?.name)}
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
            <Scale className="h-5 w-5" />
            Documentos Normativos
          </CardTitle>
          <CardDescription>
            Administra las leyes, reglamentos y normativas que rigen el GAD Parroquial
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Autoridad</TableHead>
                <TableHead>Vigencia</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marcoLegalData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.titulo}</p>
                      <p className="text-sm text-muted-foreground">{item.descripcion}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getCategoriaBadge(item.categoria)}
                  </TableCell>
                  <TableCell className="text-sm">{item.autoridad}</TableCell>
                  <TableCell>{item.fechaVigencia}</TableCell>
                  <TableCell>
                    {getEstadoBadge(item.estado)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
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

export default MarcoLegalAdmin;