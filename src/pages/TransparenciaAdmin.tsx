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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, FileText, DollarSign, Gavel, MessageSquare, Download, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { mockTransparenciaData, mockSolicitudesData, presupuestoData } from '@/data/mockData';

const TransparenciaAdmin = () => {
  const [activeTab, setActiveTab] = useState('rendicion');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    tipo: 'rendicion',
    categoria: '',
    archivo: '',
    montoReferencial: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      toast({
        title: "Actualizado",
        description: "El documento ha sido actualizado exitosamente.",
      });
    } else {
      toast({
        title: "Creado",
        description: "El nuevo documento ha sido creado exitosamente.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({ titulo: '', descripcion: '', tipo: activeTab, categoria: '', archivo: '', montoReferencial: '' });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      titulo: item.titulo,
      descripcion: item.descripcion,
      tipo: item.tipo,
      categoria: item.categoria,
      archivo: item.archivo,
      montoReferencial: item.montoReferencial?.toString() || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Eliminado",
      description: "El documento ha sido eliminado exitosamente.",
    });
  };

  const getDataByType = (tipo: string) => {
    return mockTransparenciaData.filter(item => item.tipo === tipo);
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'publicado':
        return <Badge className="bg-green-100 text-green-800">Publicado</Badge>;
      case 'en_proceso':
        return <Badge className="bg-yellow-100 text-yellow-800">En Proceso</Badge>;
      case 'pendiente':
        return <Badge variant="secondary">Pendiente</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Transparencia y Acceso a la Información</h1>
          <p className="text-muted-foreground">
            Gestiona documentos de transparencia, rendición de cuentas y solicitudes de información
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingItem(null);
              setFormData({ titulo: '', descripcion: '', tipo: activeTab, categoria: '', archivo: '', montoReferencial: '' });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Documento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Editar' : 'Agregar'} Documento
              </DialogTitle>
              <DialogDescription>
                Complete los campos para {editingItem ? 'actualizar' : 'agregar'} un documento de transparencia.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título</Label>
                <Input
                  id="titulo"
                  value={formData.titulo}
                  onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                  placeholder="Título del documento"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Textarea
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  placeholder="Descripción detallada del documento"
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
                      <SelectItem value="anual">Anual</SelectItem>
                      <SelectItem value="trimestral">Trimestral</SelectItem>
                      <SelectItem value="obras">Obras</SelectItem>
                      <SelectItem value="servicios">Servicios</SelectItem>
                      <SelectItem value="bienes">Bienes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {activeTab === 'licitacion' && (
                  <div className="space-y-2">
                    <Label htmlFor="montoReferencial">Monto Referencial ($)</Label>
                    <Input
                      id="montoReferencial"
                      type="number"
                      value={formData.montoReferencial}
                      onChange={(e) => setFormData({...formData, montoReferencial: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="archivo">Archivo</Label>
                <Input
                  id="archivo"
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  onChange={(e) => setFormData({...formData, archivo: e.target.files?.[0]?.name || ''})}
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
          <TabsTrigger value="rendicion" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Rendición
          </TabsTrigger>
          <TabsTrigger value="presupuesto" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Presupuesto
          </TabsTrigger>
          <TabsTrigger value="licitacion" className="flex items-center gap-2">
            <Gavel className="h-4 w-4" />
            Licitaciones
          </TabsTrigger>
          <TabsTrigger value="solicitudes" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Solicitudes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rendicion">
          <Card>
            <CardHeader>
              <CardTitle>Rendición de Cuentas</CardTitle>
              <CardDescription>
                Documentos de rendición de cuentas y reportes de gestión
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Documento</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getDataByType('rendicion').map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.titulo}</p>
                          <p className="text-sm text-muted-foreground">{item.descripcion}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.categoria}</Badge>
                      </TableCell>
                      <TableCell>{item.fechaPublicacion}</TableCell>
                      <TableCell>{getEstadoBadge(item.estado)}</TableCell>
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
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="presupuesto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Presupuesto Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${presupuestoData.resumen.presupuestoTotal.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Ejecutado</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  ${presupuestoData.resumen.ejecutado.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">% Ejecución</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{presupuestoData.resumen.porcentajeEjecucion}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pendiente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  ${presupuestoData.resumen.pendiente.toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ejecución por Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Presupuestado</TableHead>
                    <TableHead>Ejecutado</TableHead>
                    <TableHead>% Ejecución</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {presupuestoData.categorias.map((categoria, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{categoria.nombre}</TableCell>
                      <TableCell>${categoria.presupuestado.toLocaleString()}</TableCell>
                      <TableCell>${categoria.ejecutado.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${categoria.porcentaje}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{categoria.porcentaje}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="licitacion">
          <Card>
            <CardHeader>
              <CardTitle>Licitaciones y Convenios</CardTitle>
              <CardDescription>
                Procesos de contratación pública y convenios institucionales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Proceso</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getDataByType('licitacion').map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.titulo}</p>
                          <p className="text-sm text-muted-foreground">{item.descripcion}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.categoria}</Badge>
                      </TableCell>
                      <TableCell>${item.montoReferencial?.toLocaleString()}</TableCell>
                      <TableCell>{getEstadoBadge(item.estado)}</TableCell>
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
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="solicitudes">
          <Card>
            <CardHeader>
              <CardTitle>Solicitudes de Información Pública</CardTitle>
              <CardDescription>
                Gestión de solicitudes de acceso a información pública
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No. Solicitud</TableHead>
                    <TableHead>Solicitante</TableHead>
                    <TableHead>Tipo Información</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSolicitudesData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.numeroSolicitud}</TableCell>
                      <TableCell>{item.solicitante}</TableCell>
                      <TableCell>{item.tipoInformacion}</TableCell>
                      <TableCell>{item.fechaSolicitud}</TableCell>
                      <TableCell>{getEstadoBadge(item.estado)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
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

export default TransparenciaAdmin;