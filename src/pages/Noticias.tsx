import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Image,
  Calendar,
  User,
  Tag,
} from 'lucide-react';
import { noticiasData } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const Noticias = () => {
  const [noticias, setNoticias] = useState(noticiasData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNoticia, setSelectedNoticia] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    categoria: '',
    tags: '',
  });

  const filteredNoticias = noticias.filter(noticia =>
    noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    noticia.contenido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    noticia.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case 'publicado':
        return <Badge variant="default">Publicado</Badge>;
      case 'borrador':
        return <Badge variant="secondary">Borrador</Badge>;
      case 'revision':
        return <Badge variant="outline">En Revisión</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const getCategoryBadge = (categoria: string) => {
    const colors: Record<string, string> = {
      infraestructura: 'bg-blue-100 text-blue-800',
      convocatoria: 'bg-green-100 text-green-800',
      social: 'bg-purple-100 text-purple-800',
      cultural: 'bg-pink-100 text-pink-800',
    };
    
    return (
      <Badge className={colors[categoria] || 'bg-gray-100 text-gray-800'}>
        {categoria}
      </Badge>
    );
  };

  const handleCreateNoticia = () => {
    const newNoticia = {
      id: Date.now(),
      titulo: formData.titulo,
      contenido: formData.contenido,
      autor: 'Admin Sistema',
      fechaPublicacion: new Date().toISOString().split('T')[0],
      estado: 'borrador',
      categoria: formData.categoria,
      imagen: '/api/placeholder/600/300',
      tags: formData.tags.split(',').map(tag => tag.trim()),
    };

    setNoticias([...noticias, newNoticia]);
    setFormData({ titulo: '', contenido: '', categoria: '', tags: '' });
    setIsCreateDialogOpen(false);
    
    toast({
      title: "Noticia creada",
      description: "La noticia ha sido creada como borrador",
    });
  };

  const handleDeleteNoticia = (id: number) => {
    setNoticias(noticias.filter(noticia => noticia.id !== id));
    toast({
      title: "Noticia eliminada",
      description: "La noticia ha sido eliminada correctamente",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-EC', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Noticias</h1>
          <p className="text-muted-foreground mt-2">
            Administre las noticias y comunicados del GAD
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nueva Noticia
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Crear Nueva Noticia</DialogTitle>
              <DialogDescription>
                Complete los datos para crear una nueva noticia
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                  placeholder="Título de la noticia"
                />
              </div>
              
              <div>
                <Label htmlFor="categoria">Categoría</Label>
                <Select
                  value={formData.categoria}
                  onValueChange={(value) => setFormData({...formData, categoria: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="infraestructura">Infraestructura</SelectItem>
                    <SelectItem value="convocatoria">Convocatoria</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="contenido">Contenido</Label>
                <Textarea
                  id="contenido"
                  value={formData.contenido}
                  onChange={(e) => setFormData({...formData, contenido: e.target.value})}
                  placeholder="Contenido de la noticia"
                  rows={6}
                />
              </div>

              <div>
                <Label htmlFor="tags">Etiquetas (separadas por comas)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  placeholder="tag1, tag2, tag3"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateNoticia}>
                  Crear Noticia
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Total Noticias</span>
            </div>
            <p className="text-2xl font-bold mt-2">{noticias.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Publicadas</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {noticias.filter(n => n.estado === 'publicado').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Edit className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">Borradores</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {noticias.filter(n => n.estado === 'borrador').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Buscar Noticias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título, contenido o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Noticias Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Noticias</CardTitle>
          <CardDescription>
            {filteredNoticias.length} noticia(s) encontrada(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Autor</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredNoticias.map((noticia) => (
                <TableRow key={noticia.id}>
                  <TableCell className="max-w-xs">
                    <div>
                      <p className="font-medium truncate">{noticia.titulo}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {noticia.contenido.substring(0, 80)}...
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{getCategoryBadge(noticia.categoria)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{noticia.autor}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(noticia.fechaPublicacion)}</TableCell>
                  <TableCell>{getStatusBadge(noticia.estado)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setSelectedNoticia(noticia)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{selectedNoticia?.titulo}</DialogTitle>
                            <DialogDescription>
                              Vista previa de la noticia
                            </DialogDescription>
                          </DialogHeader>
                          {selectedNoticia && (
                            <div className="space-y-4">
                              <div className="flex gap-2 flex-wrap">
                                {getCategoryBadge(selectedNoticia.categoria)}
                                {getStatusBadge(selectedNoticia.estado)}
                              </div>
                              
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  {selectedNoticia.autor}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {formatDate(selectedNoticia.fechaPublicacion)}
                                </div>
                              </div>

                              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                                <Image className="h-12 w-12 text-muted-foreground" />
                              </div>

                              <div className="prose max-w-none">
                                <p>{selectedNoticia.contenido}</p>
                              </div>

                              <div>
                                <p className="text-sm font-medium mb-2">Etiquetas:</p>
                                <div className="flex gap-2 flex-wrap">
                                  {selectedNoticia.tags.map((tag: string, index: number) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      <Tag className="h-3 w-3 mr-1" />
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteNoticia(noticia.id)}
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

export default Noticias;