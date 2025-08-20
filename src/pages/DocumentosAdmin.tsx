import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, FolderOpen, Download, Eye, Upload, FileText, Search } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { documentosData } from '@/data/mockData';

const DocumentosAdmin = () => {
  const [activeTab, setActiveTab] = useState('actas');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: 'acta',
    categoria: 'sesiones',
    descripcion: '',
    version: '1.0',
    autor: ''
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
        description: "El nuevo documento ha sido subido exitosamente.",
      });
    }
    
    setIsDialogOpen(false);
    setEditingItem(null);
    setFormData({ nombre: '', tipo: 'acta', categoria: 'sesiones', descripcion: '', version: '1.0', autor: '' });
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      nombre: item.nombre,
      tipo: item.tipo,
      categoria: item.categoria,
      descripcion: item.descripcion || '',
      version: item.version,
      autor: item.autor
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    toast({
      title: "Eliminado",
      description: "El documento ha sido eliminado exitosamente.",
    });
  };

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case 'acta':
        return <Badge className="bg-blue-100 text-blue-800">Acta</Badge>;
      case 'resolucion':
        return <Badge className="bg-green-100 text-green-800">Resolución</Badge>;
      case 'ordenanza':
        return <Badge className="bg-purple-100 text-purple-800">Ordenanza</Badge>;
      case 'informe':
        return <Badge className="bg-orange-100 text-orange-800">Informe</Badge>;
      case 'contrato':
        return <Badge className="bg-yellow-100 text-yellow-800">Contrato</Badge>;
      default:
        return <Badge variant="outline">Documento</Badge>;
    }
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case 'aprobado':
        return <Badge className="bg-green-100 text-green-800">Aprobado</Badge>;
      case 'vigente':
        return <Badge className="bg-green-100 text-green-800">Vigente</Badge>;
      case 'borrador':
        return <Badge className="bg-yellow-100 text-yellow-800">Borrador</Badge>;
      case 'revision':
        return <Badge className="bg-blue-100 text-blue-800">En Revisión</Badge>;
      case 'archivado':
        return <Badge variant="secondary">Archivado</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const resolucionesData = [
    {
      id: 1,
      nombre: 'Resolución No. 001-2024',
      tipo: 'resolucion',
      categoria: 'normativa',
      fechaCreacion: '2024-01-10',
      autor: 'Presidente GAD',
      version: '1.0',
      estado: 'vigente',
      descripcion: 'Aprobación del plan operativo anual 2024'
    },
    {
      id: 2,
      nombre: 'Resolución No. 002-2024',
      tipo: 'resolucion',
      categoria: 'administrativa',
      fechaCreacion: '2024-01-15',
      autor: 'Secretario GAD',
      version: '1.0',
      estado: 'vigente',
      descripcion: 'Designación de comisiones de trabajo'
    }
  ];

  const informesData = [
    {
      id: 1,
      nombre: 'Informe de Gestión Trimestral Q1-2024',
      tipo: 'informe',
      categoria: 'gestion',
      fechaCreacion: '2024-03-31',
      autor: 'Coordinador Técnico',
      version: '1.0',
      estado: 'aprobado',
      descripcion: 'Informe de actividades del primer trimestre'
    }
  ];

  const filteredData = (data: any[]) => {
    return data.filter(item => 
      item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.descripcion?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gestión Documental</h1>
          <p className="text-muted-foreground">
            Administra todos los documentos oficiales del GAD Parroquial
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              setEditingItem(null);
              setFormData({ nombre: '', tipo: 'acta', categoria: 'sesiones', descripcion: '', version: '1.0', autor: '' });
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Subir Documento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Editar' : 'Subir'} Documento
              </DialogTitle>
              <DialogDescription>
                Complete los campos para {editingItem ? 'actualizar' : 'subir'} un documento oficial.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del Documento</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  placeholder="Ej: Acta Sesión Enero 2024"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Documento</Label>
                  <Select onValueChange={(value) => setFormData({...formData, tipo: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acta">Acta</SelectItem>
                      <SelectItem value="resolucion">Resolución</SelectItem>
                      <SelectItem value="ordenanza">Ordenanza</SelectItem>
                      <SelectItem value="informe">Informe</SelectItem>
                      <SelectItem value="contrato">Contrato</SelectItem>
                      <SelectItem value="convenio">Convenio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoría</Label>
                  <Select onValueChange={(value) => setFormData({...formData, categoria: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sesiones">Sesiones</SelectItem>
                      <SelectItem value="normativa">Normativa</SelectItem>
                      <SelectItem value="administrativa">Administrativa</SelectItem>
                      <SelectItem value="financiera">Financiera</SelectItem>
                      <SelectItem value="tecnica">Técnica</SelectItem>
                      <SelectItem value="legal">Legal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descripcion">Descripción</Label>
                <Input
                  id="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                  placeholder="Breve descripción del contenido"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="autor">Autor/Responsable</Label>
                  <Input
                    id="autor"
                    value={formData.autor}
                    onChange={(e) => setFormData({...formData, autor: e.target.value})}
                    placeholder="Nombre del autor"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="version">Versión</Label>
                  <Input
                    id="version"
                    value={formData.version}
                    onChange={(e) => setFormData({...formData, version: e.target.value})}
                    placeholder="1.0"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="archivo">Archivo</Label>
                <Input
                  id="archivo"
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  onChange={(e) => console.log('Archivo seleccionado:', e.target.files?.[0]?.name)}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingItem ? 'Actualizar' : 'Subir'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Barra de búsqueda */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="actas" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Actas
          </TabsTrigger>
          <TabsTrigger value="resoluciones" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Resoluciones
          </TabsTrigger>
          <TabsTrigger value="informes" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Informes
          </TabsTrigger>
          <TabsTrigger value="todos" className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            Todos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="actas">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Actas de Sesiones
              </CardTitle>
              <CardDescription>
                Actas de las sesiones del consejo parroquial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Documento</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData(documentosData.filter(d => d.tipo === 'acta')).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.nombre}</p>
                          <p className="text-sm text-muted-foreground">v{item.version}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.categoria}</Badge>
                      </TableCell>
                      <TableCell>{item.autor}</TableCell>
                      <TableCell>{item.fechaCreacion}</TableCell>
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
        </TabsContent>

        <TabsContent value="resoluciones">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Resoluciones
              </CardTitle>
              <CardDescription>
                Resoluciones emitidas por el GAD Parroquial
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Documento</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData(resolucionesData).map((item) => (
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
                      <TableCell>{item.autor}</TableCell>
                      <TableCell>{item.fechaCreacion}</TableCell>
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

        <TabsContent value="informes">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Informes
              </CardTitle>
              <CardDescription>
                Informes técnicos y de gestión
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Documento</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData(informesData).map((item) => (
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
                      <TableCell>{item.autor}</TableCell>
                      <TableCell>{item.fechaCreacion}</TableCell>
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

        <TabsContent value="todos">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                Todos los Documentos
              </CardTitle>
              <CardDescription>
                Vista completa de todos los documentos del sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Documento</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Autor</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData([...documentosData, ...resolucionesData, ...informesData]).map((item) => (
                    <TableRow key={`${item.tipo}-${item.id}`}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.nombre}</p>
                          <p className="text-sm text-muted-foreground">v{item.version}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getTipoBadge(item.tipo)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.categoria}</Badge>
                      </TableCell>
                      <TableCell>{item.autor}</TableCell>
                      <TableCell>{item.fechaCreacion}</TableCell>
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

export default DocumentosAdmin;