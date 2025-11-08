import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/ui/components/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, FileText, Download, Loader2, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { transparenciaService } from '@/domain/services';
import type { Documento, DocCategoria } from '@/domain/models/types';
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

const TransparenciaAdmin: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'rendicion';
  const [activeTab, setActiveTab] = useState<DocCategoria | 'solicitudes'>(initialTab as any);
  const [loading, setLoading] = useState(true);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnio, setFilterAnio] = useState<string>('todos');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Documento | null>(null);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    titulo: '',
    categoria: 'Rendicion' as DocCategoria,
    anio: new Date().getFullYear(),
    url: '',
    resumen: '',
    etiquetas: '',
  });

  useEffect(() => {
    if (activeTab !== 'solicitudes') {
      loadDocumentos();
    }
  }, [activeTab]);

  const loadDocumentos = async () => {
    if (activeTab === 'solicitudes') return;
    try {
      setLoading(true);
      const categoria = activeTab as DocCategoria;
      const result = await transparenciaService.getByCategoria(categoria);
      setDocumentos(result);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los documentos',
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
        await transparenciaService.update(editingItem.id, {
          titulo: formData.titulo,
          categoria: formData.categoria,
          anio: formData.anio,
          url: formData.url,
          resumen: formData.resumen || undefined,
          etiquetas: etiquetasArray.length > 0 ? etiquetasArray : undefined,
        });
        toast({
          title: 'Actualizado',
          description: 'El documento ha sido actualizado exitosamente',
        });
      } else {
        await transparenciaService.create({
          titulo: formData.titulo,
          categoria: formData.categoria,
          anio: formData.anio,
          url: formData.url,
          resumen: formData.resumen || undefined,
          etiquetas: etiquetasArray.length > 0 ? etiquetasArray : undefined,
        });
        toast({
          title: 'Creado',
          description: 'El nuevo documento ha sido creado exitosamente',
        });
      }
      setIsDialogOpen(false);
      setEditingItem(null);
      setFormData({
        titulo: '',
        categoria: activeTab as DocCategoria,
        anio: new Date().getFullYear(),
        url: '',
        resumen: '',
        etiquetas: '',
      });
      await loadDocumentos();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudo guardar el documento',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (item: Documento) => {
    setEditingItem(item);
    setFormData({
      titulo: item.titulo,
      categoria: item.categoria,
      anio: item.anio,
      url: item.url,
      resumen: item.resumen || '',
      etiquetas: item.etiquetas?.join(', ') || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await transparenciaService.remove(itemToDelete);
      toast({
        title: 'Eliminado',
        description: 'El documento ha sido eliminado exitosamente',
      });
      setDeleteDialogOpen(false);
      setItemToDelete(null);
      await loadDocumentos();
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el documento',
        variant: 'destructive',
      });
    }
  };

  const filteredDocumentos = documentos.filter((doc) => {
    const matchesSearch =
      doc.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.resumen && doc.resumen.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesAnio = filterAnio === 'todos' || doc.anio.toString() === filterAnio;
    return matchesSearch && matchesAnio;
  });

  const anos = Array.from(new Set(documentos.map((d) => d.anio))).sort((a, b) => b - a);

  if (loading && activeTab !== 'solicitudes') {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ink-900">Transparencia</h1>
        <p className="text-ink-600 mt-2">Gestiona los documentos de transparencia y rendición de cuentas</p>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="rendicion">Rendición</TabsTrigger>
          <TabsTrigger value="presupuesto">Presupuesto</TabsTrigger>
          <TabsTrigger value="licitacion">Licitaciones</TabsTrigger>
          <TabsTrigger value="MarcoLegal">Marco Legal</TabsTrigger>
          <TabsTrigger value="solicitudes">Solicitudes Info</TabsTrigger>
        </TabsList>

        {activeTab !== 'solicitudes' && (
          <>
            <TabsContent value={activeTab}>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-ink-500" />
                      <Input
                        placeholder="Buscar documentos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={filterAnio} onValueChange={setFilterAnio}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todos">Todos</SelectItem>
                        {anos.map((ano) => (
                          <SelectItem key={ano} value={ano.toString()}>
                            {ano}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <Button
                      onClick={() => {
                        setEditingItem(null);
                        setFormData({
                          titulo: '',
                          categoria: activeTab as DocCategoria,
                          anio: new Date().getFullYear(),
                          url: '',
                          resumen: '',
                          etiquetas: '',
                        });
                        setIsDialogOpen(true);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Nuevo Documento
                    </Button>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{editingItem ? 'Editar' : 'Crear'} Documento</DialogTitle>
                        <DialogDescription>
                          Complete los campos para {editingItem ? 'actualizar' : 'crear'} un documento
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
                            <Label htmlFor="anio">Año *</Label>
                            <Input
                              id="anio"
                              type="number"
                              value={formData.anio}
                              onChange={(e) =>
                                setFormData({ ...formData, anio: parseInt(e.target.value) || new Date().getFullYear() })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="url">URL del Documento *</Label>
                            <Input
                              id="url"
                              value={formData.url}
                              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                              placeholder="https://..."
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="resumen">Resumen</Label>
                          <Textarea
                            id="resumen"
                            value={formData.resumen}
                            onChange={(e) => setFormData({ ...formData, resumen: e.target.value })}
                            rows={3}
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
                    <CardTitle>Documentos de {activeTab}</CardTitle>
                    <CardDescription>{filteredDocumentos.length} documento(s) encontrado(s)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {filteredDocumentos.length === 0 ? (
                      <div className="text-center py-8 text-ink-500">
                        <p>No hay documentos</p>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Año</TableHead>
                            <TableHead>Resumen</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredDocumentos.map((doc) => (
                            <TableRow key={doc.id}>
                              <TableCell className="font-medium">{doc.titulo}</TableCell>
                              <TableCell>{doc.anio}</TableCell>
                              <TableCell className="max-w-md">
                                <p className="line-clamp-2 text-sm text-ink-600">{doc.resumen || '-'}</p>
                              </TableCell>
                              <TableCell>
                                {format(new Date(doc.publishedAt), 'dd MMM yyyy', { locale: es })}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex gap-2 justify-end">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => window.open(doc.url, '_blank')}
                                  >
                                    <Download className="h-4 w-4 mr-2" />
                                    Descargar
                                  </Button>
                                  <Button size="sm" variant="outline" onClick={() => handleEdit(doc)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setItemToDelete(doc.id);
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
              </div>
            </TabsContent>
          </>
        )}

        {activeTab === 'solicitudes' && (
          <TabsContent value="solicitudes">
            <Card>
              <CardHeader>
                <CardTitle>Solicitudes de Información</CardTitle>
                <CardDescription>
                  Esta sección muestra las solicitudes de información recibidas (KPIs)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-ink-500">
                  <p>Las solicitudes de información se gestionan desde el Dashboard</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => (window.location.href = '/dashboard')}
                  >
                    Ir al Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente este documento.
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

export default TransparenciaAdmin;

