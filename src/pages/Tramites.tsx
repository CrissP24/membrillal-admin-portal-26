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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Search,
  Filter,
  Eye,
  Edit,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  FileText,
  User,
  Calendar,
} from 'lucide-react';
import { tramitesData } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const Tramites = () => {
  const [tramites, setTramites] = useState(tramitesData);
  const [filteredTramites, setFilteredTramites] = useState(tramitesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [selectedTramite, setSelectedTramite] = useState<any>(null);

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return <Badge variant="destructive" className="gap-1"><Clock className="h-3 w-3" />Pendiente</Badge>;
      case 'en_proceso':
        return <Badge variant="secondary" className="gap-1"><AlertCircle className="h-3 w-3" />En Proceso</Badge>;
      case 'aprobado':
        return <Badge variant="default" className="gap-1"><CheckCircle className="h-3 w-3" />Aprobado</Badge>;
      case 'rechazado':
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" />Rechazado</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterTramites(value, filterStatus);
  };

  const handleFilterStatus = (status: string) => {
    setFilterStatus(status);
    filterTramites(searchTerm, status);
  };

  const filterTramites = (search: string, status: string) => {
    let filtered = tramites;

    if (search) {
      filtered = filtered.filter(
        tramite =>
          tramite.numeroTramite.toLowerCase().includes(search.toLowerCase()) ||
          tramite.solicitante.toLowerCase().includes(search.toLowerCase()) ||
          tramite.tipo.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== 'todos') {
      filtered = filtered.filter(tramite => tramite.estado === status);
    }

    setFilteredTramites(filtered);
  };

  const handleStatusChange = (tramiteId: number, newStatus: string) => {
    const updatedTramites = tramites.map(tramite => {
      if (tramite.id === tramiteId) {
        const timelineEntry = {
          fecha: new Date().toISOString().split('T')[0],
          accion: `Estado cambiado a ${newStatus}`,
          usuario: "Admin",
          comentario: `Trámite actualizado desde el panel administrativo`
        };
        
        return {
          ...tramite,
          estado: newStatus,
          timeline: [...tramite.timeline, timelineEntry]
        };
      }
      return tramite;
    });

    setTramites(updatedTramites);
    filterTramites(searchTerm, filterStatus);
    
    toast({
      title: "Estado actualizado",
      description: `El trámite ha sido actualizado a: ${newStatus}`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-EC', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Trámites</h1>
          <p className="text-muted-foreground mt-2">
            Administre los trámites y solicitudes ciudadanas
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nuevo Trámite
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-warning" />
              <span className="text-sm font-medium">Pendientes</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {tramites.filter(t => t.estado === 'pendiente').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-info" />
              <span className="text-sm font-medium">En Proceso</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {tramites.filter(t => t.estado === 'en_proceso').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Aprobados</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {tramites.filter(t => t.estado === 'aprobado').length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm font-medium">Rechazados</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {tramites.filter(t => t.estado === 'rechazado').length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros y Búsqueda</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por número, solicitante o tipo..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={handleFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="pendiente">Pendientes</SelectItem>
                <SelectItem value="en_proceso">En Proceso</SelectItem>
                <SelectItem value="aprobado">Aprobados</SelectItem>
                <SelectItem value="rechazado">Rechazados</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tramites Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Trámites</CardTitle>
          <CardDescription>
            {filteredTramites.length} trámite(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Solicitante</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTramites.map((tramite) => (
                <TableRow key={tramite.id}>
                  <TableCell className="font-medium">
                    {tramite.numeroTramite}
                  </TableCell>
                  <TableCell>{tramite.tipo}</TableCell>
                  <TableCell>{tramite.solicitante}</TableCell>
                  <TableCell>{formatDate(tramite.fechaSolicitud)}</TableCell>
                  <TableCell>{getStatusBadge(tramite.estado)}</TableCell>
                  <TableCell>{tramite.responsable}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setSelectedTramite(tramite)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>
                              Detalle del Trámite - {selectedTramite?.numeroTramite}
                            </DialogTitle>
                            <DialogDescription>
                              Información completa y timeline del trámite
                            </DialogDescription>
                          </DialogHeader>
                          {selectedTramite && (
                            <div className="space-y-6">
                              {/* Información básica */}
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="text-sm font-medium">Tipo de Trámite</label>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {selectedTramite.tipo}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Solicitante</label>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {selectedTramite.solicitante}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Fecha de Solicitud</label>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    {formatDate(selectedTramite.fechaSolicitud)}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm font-medium">Estado</label>
                                  <div className="mt-1">
                                    {getStatusBadge(selectedTramite.estado)}
                                  </div>
                                </div>
                              </div>

                              {/* Descripción */}
                              <div>
                                <label className="text-sm font-medium">Descripción</label>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {selectedTramite.descripcion}
                                </p>
                              </div>

                              {/* Cambiar estado */}
                              <div>
                                <label className="text-sm font-medium">Cambiar Estado</label>
                                <Select
                                  value={selectedTramite.estado}
                                  onValueChange={(newStatus) => handleStatusChange(selectedTramite.id, newStatus)}
                                >
                                  <SelectTrigger className="w-full mt-1">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pendiente">Pendiente</SelectItem>
                                    <SelectItem value="en_proceso">En Proceso</SelectItem>
                                    <SelectItem value="aprobado">Aprobado</SelectItem>
                                    <SelectItem value="rechazado">Rechazado</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              {/* Timeline */}
                              <div>
                                <label className="text-sm font-medium">Timeline del Trámite</label>
                                <div className="mt-3 space-y-3">
                                  {selectedTramite.timeline.map((entry: any, index: number) => (
                                    <div key={index} className="flex gap-3 p-3 border rounded-lg">
                                      <div className="flex flex-col items-center">
                                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                                        {index < selectedTramite.timeline.length - 1 && (
                                          <div className="w-px h-8 bg-border mt-1"></div>
                                        )}
                                      </div>
                                      <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                          <p className="font-medium text-sm">{entry.accion}</p>
                                          <span className="text-xs text-muted-foreground">
                                            {formatDate(entry.fecha)}
                                          </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                          Por: {entry.usuario}
                                        </p>
                                        {entry.comentario && (
                                          <p className="text-sm text-muted-foreground mt-1">
                                            {entry.comentario}
                                          </p>
                                        )}
                                      </div>
                                    </div>
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

export default Tramites;