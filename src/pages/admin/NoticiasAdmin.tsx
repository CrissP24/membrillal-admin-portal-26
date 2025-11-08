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
import { Search, Plus, Edit, Trash2, Eye, Loader2, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { noticiasService } from '@/domain/services';
import type { Noticia } from '@/domain/models/types';
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

const NoticiasAdmin: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Noticia | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: '',
    cuerpoHtml: '',
    etiquetas: '',
    portadaUrl: '',
  });

  useEffect(() => {
    loadNoticias();
  }, []);

  const loadNoticias = async () => {
    try {
      setLoading(true);
      const result = await noticiasService.list({ orderBy: 'publishedAt', orderDir: 'desc' });
      setNoticias(result.items);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las noticias',
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
        await noticiasService.editar(editingItem.id, {
          titulo: formData.titulo,
          categoria: formData.categoria,
          cuerpoHtml: formData.cuerpoHtml,
          etiquetas: etiquetasArray.length > 0 ? etiquetasArray : undefined,
          portadaUrl: formData.portadaUrl || undefined,
        });
        toast({
          title: 'Actualizada',
          description: 'La noticia ha sido actualizada exitosamente',
        });
      } else {
        await noticiasService.publicar({
          titulo: formData.titulo,
          categoria: formData.categoria,
          cuerpoHtml: formData.cuerpoHtml,
          etiquetas: etiquetasArray.length > 0 ? etiquetasArray : undefined,
          portadaUrl: formData.portadaUrl || undefined,
        });
        toast({
          title: 'Creada',
          description: 'La nueva noticia ha sido creada exitosamente',
        });
      }
      setIsDialogOpen(false);
      setEditingItem(null);
      setFormData({ titulo: '', categoria: '', cuerpoHtml: '', etiquetas: '', portadaUrl: '' });
      await loadNoticias();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudo guardar la noticia',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (item: Noticia) => {
    setEditingItem(item);
    setFormData({
      titulo: item.titulo,
      categoria: item.categoria,
      cuerpoHtml: item.cuerpoHtml,
      etiquetas: item.etiquetas?.join(', ') || '',
      portadaUrl: item.portadaUrl || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await noticiasService.eliminar(itemToDelete);
      toast({
        title: 'Eliminada',
        description: 'La noticia ha sido eliminada exitosamente',
      });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      await loadNoticias();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar la noticia',
        variant: 'destructive',
      });
    }
  };

  const filteredNoticias = noticias.filter(
    (noticia) =>
      noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      noticia.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
      noticia.cuerpoHtml.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-3xl font-bold text-ink-900">Gestión de Noticias</h1>
          <p className="text-ink-600 mt-2">Administre las noticias y comunicados del GAD</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button
            onClick={() => {
              setEditingItem(null);
              setFormData({ titulo: '', categoria: '', cuerpoHtml: '', etiquetas: '', portadaUrl: '' });
              setIsDialogOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva Noticia
          </Button>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Editar' : 'Crear'} Noticia</DialogTitle>
              <DialogDescription>
                Complete los campos para {editingItem ? 'actualizar' : 'crear'} una noticia
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
                  <Label htmlFor="categoria">Categoría *</Label>
                  <Select
                    value={formData.categoria}
                    onValueChange={(value) => setFormData({ ...formData, categoria: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Salud">Salud</SelectItem>
                      <SelectItem value="Agricultura">Agricultura</SelectItem>
                      <SelectItem value="Infraestructura">Infraestructura</SelectItem>
                      <SelectItem value="Educación">Educación</SelectItem>
                      <SelectItem value="Social">Social</SelectItem>
                      <SelectItem value="Cultural">Cultural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portadaUrl">URL de Imagen de Portada</Label>
                  <Input
                    id="portadaUrl"
                    value={formData.portadaUrl}
                    onChange={(e) => setFormData({ ...formData, portadaUrl: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cuerpoHtml">Contenido (HTML) *</Label>
                <Textarea
                  id="cuerpoHtml"
                  value={formData.cuerpoHtml}
                  onChange={(e) => setFormData({ ...formData, cuerpoHtml: e.target.value })}
                  rows={10}
                  required
                  className="font-mono text-sm"
                />
                <p className="text-xs text-ink-500">Puedes usar HTML para formatear el contenido</p>
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

      {/* Stats */}
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
              <Eye className="h-4 w-4 text-accent-600" />
              <span className="text-sm font-medium">Total Vistas</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {noticias.reduce((sum, n) => sum + n.vistas, 0)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-warning-600" />
              <span className="text-sm font-medium">Este Mes</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {noticias.filter((n) => {
                const fecha = new Date(n.publishedAt);
                const hoy = new Date();
                return fecha.getMonth() === hoy.getMonth() && fecha.getFullYear() === hoy.getFullYear();
              }).length}
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
            <Search className="absolute left-3 top-3 h-4 w-4 text-ink-500" />
            <Input
              placeholder="Buscar por título, contenido o categoría..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Noticias</CardTitle>
          <CardDescription>{filteredNoticias.length} noticia(s) encontrada(s)</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredNoticias.length === 0 ? (
            <div className="text-center py-8 text-ink-500">
              <p>No hay noticias</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Vistas</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNoticias.map((noticia) => (
                  <TableRow key={noticia.id}>
                    <TableCell className="max-w-xs">
                      <div>
                        <p className="font-medium line-clamp-1">{noticia.titulo}</p>
                        <p className="text-sm text-ink-500 line-clamp-1">
                          {noticia.cuerpoHtml.replace(/<[^>]*>/g, '').substring(0, 60)}...
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge>{noticia.categoria}</Badge>
                    </TableCell>
                    <TableCell>
                      {format(new Date(noticia.publishedAt), 'dd MMM yyyy', { locale: es })}
                    </TableCell>
                    <TableCell>{noticia.vistas}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(noticia)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setItemToDelete(noticia.id);
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
              Esta acción no se puede deshacer. Se eliminará permanentemente esta noticia.
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

export default NoticiasAdmin;

