import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/ui/components/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  DollarSign,
  FileText,
  Loader2,
  Download,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { tramiteInstRepo, tramiteDefRepo } from '@/data/repos';
import { tramitesService } from '@/domain/services';
import { useAuth } from '@/contexts/AuthContext';
import type { TramiteInstancia, TramiteDef } from '@/domain/models/types';
import { Timeline } from '@/ui/components/Timeline';
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

// Componente para cargar nombre del trámite
const SolicitudTramiteNombre: React.FC<{ tramiteId: string }> = ({ tramiteId }) => {
  const [nombre, setNombre] = useState<string>('Cargando...');
  useEffect(() => {
    tramiteDefRepo.get(tramiteId).then((tramite) => {
      if (tramite) setNombre(tramite.nombre);
    });
  }, [tramiteId]);
  return <span>{nombre}</span>;
};

const BandejaSolicitudes: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [solicitudes, setSolicitudes] = useState<TramiteInstancia[]>([]);
  const [selectedSolicitud, setSelectedSolicitud] = useState<TramiteInstancia | null>(null);
  const [tramiteDef, setTramiteDef] = useState<TramiteDef | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('todos');
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isAccionOpen, setIsAccionOpen] = useState(false);
  const [accionTipo, setAccionTipo] = useState<'observar' | 'aprobar' | 'rechazar' | 'pago' | 'entregar' | null>(
    null
  );
  const [accionData, setAccionData] = useState({ nota: '', codigo: '', comprobanteUrl: '' });

  useEffect(() => {
    loadSolicitudes();
  }, []);

  const loadSolicitudes = async () => {
    try {
      setLoading(true);
      const result = await tramiteInstRepo.list({ orderBy: 'updatedAt', orderDir: 'desc' });
      setSolicitudes(result.items);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las solicitudes',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = async (solicitud: TramiteInstancia) => {
    setSelectedSolicitud(solicitud);
    try {
      const tramite = await tramiteDefRepo.get(solicitud.tramiteId);
      setTramiteDef(tramite);
    } catch (error) {
      console.error('Error loading tramite:', error);
    }
    setIsDetailOpen(true);
  };

  const handleAccion = async () => {
    if (!selectedSolicitud || !accionTipo) return;

    try {
      const usuarioNombre = user?.nombre || 'Sistema';

      switch (accionTipo) {
        case 'observar':
          if (!accionData.nota.trim()) {
            toast({
              title: 'Error',
              description: 'La nota es obligatoria',
              variant: 'destructive',
            });
            return;
          }
          await tramitesService.observar(selectedSolicitud.id, accionData.nota, usuarioNombre);
          toast({
            title: 'Observada',
            description: 'La solicitud ha sido observada',
          });
          break;

        case 'aprobar':
          await tramitesService.aprobar(selectedSolicitud.id, usuarioNombre);
          toast({
            title: 'Aprobada',
            description: 'La solicitud ha sido aprobada',
          });
          break;

        case 'rechazar':
          if (!accionData.nota.trim()) {
            toast({
              title: 'Error',
              description: 'La nota es obligatoria',
              variant: 'destructive',
            });
            return;
          }
          await tramitesService.rechazar(selectedSolicitud.id, accionData.nota, usuarioNombre);
          toast({
            title: 'Rechazada',
            description: 'La solicitud ha sido rechazada',
          });
          break;

        case 'pago':
          if (!accionData.codigo.trim()) {
            toast({
              title: 'Error',
              description: 'El código de pago es obligatorio',
              variant: 'destructive',
            });
            return;
          }
          await tramitesService.registrarPago(
            selectedSolicitud.id,
            {
              codigo: accionData.codigo,
              comprobanteUrl: accionData.comprobanteUrl,
            },
            usuarioNombre
          );
          toast({
            title: 'Pago Registrado',
            description: 'El pago ha sido registrado correctamente',
          });
          break;

        case 'entregar':
          const { pdfBlob } = await tramitesService.entregar(selectedSolicitud.id, usuarioNombre);
          // Download PDF
          const url = URL.createObjectURL(pdfBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${selectedSolicitud.folio}.pdf`;
          a.click();
          URL.revokeObjectURL(url);
          toast({
            title: 'Entregado',
            description: 'El documento ha sido entregado y descargado',
          });
          break;
      }

      setIsAccionOpen(false);
      setAccionTipo(null);
      setAccionData({ nota: '', codigo: '', comprobanteUrl: '' });
      await loadSolicitudes();
      if (selectedSolicitud) {
        const updated = await tramiteInstRepo.get(selectedSolicitud.id);
        if (updated) {
          setSelectedSolicitud(updated);
        }
      }
    } catch (error: any) {
      console.error(error);
      toast({
        title: 'Error',
        description: error.message || 'No se pudo realizar la acción',
        variant: 'destructive',
      });
    }
  };

  const getEstadoBadge = (estado: string) => {
    const variants: Record<string, any> = {
      aprobado: 'aprobado',
      observado: 'observado',
      rechazado: 'rechazado',
      enviado: 'enviado',
      pagado: 'pagado',
      entregado: 'entregado',
      borrador: 'default',
    };
    return <Badge variant={variants[estado] || 'default'}>{estado}</Badge>;
  };

  const getAccionesDisponibles = (estado: string) => {
    switch (estado) {
      case 'enviado':
        return ['observar', 'aprobar', 'rechazar'];
      case 'observado':
        return ['aprobar', 'rechazar'];
      case 'aprobado':
        return ['pago'];
      case 'pagado':
        return ['entregar'];
      default:
        return [];
    }
  };

  const filteredSolicitudes = solicitudes.filter((s) => {
    const matchesSearch =
      s.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.ciudadano.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.ciudadano.documento.includes(searchTerm);
    const matchesEstado = filterEstado === 'todos' || s.estado === filterEstado;
    return matchesSearch && matchesEstado;
  });

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-ink-900">Bandeja de Solicitudes</h1>
        <p className="text-ink-600 mt-2">Gestiona las solicitudes de trámites de los ciudadanos</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-ink-500" />
              <Input
                placeholder="Buscar por folio, nombre o cédula..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterEstado} onValueChange={setFilterEstado}>
              <SelectTrigger>
                <SelectValue placeholder="Todos los estados" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los estados</SelectItem>
                <SelectItem value="enviado">Enviado</SelectItem>
                <SelectItem value="observado">Observado</SelectItem>
                <SelectItem value="aprobado">Aprobado</SelectItem>
                <SelectItem value="rechazado">Rechazado</SelectItem>
                <SelectItem value="pagado">Pagado</SelectItem>
                <SelectItem value="entregado">Entregado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Solicitudes</CardTitle>
          <CardDescription>{filteredSolicitudes.length} solicitud(es) encontrada(s)</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredSolicitudes.length === 0 ? (
            <div className="text-center py-8 text-ink-500">
              <p>No hay solicitudes</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Folio</TableHead>
                  <TableHead>Trámite</TableHead>
                  <TableHead>Ciudadano</TableHead>
                  <TableHead>Documento</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Actualizado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSolicitudes.map((solicitud) => (
                  <TableRow key={solicitud.id}>
                    <TableCell className="font-medium">{solicitud.folio}</TableCell>
                    <TableCell>
                      <SolicitudTramiteNombre tramiteId={solicitud.tramiteId} />
                    </TableCell>
                    <TableCell>{solicitud.ciudadano.nombres}</TableCell>
                    <TableCell>{solicitud.ciudadano.documento}</TableCell>
                    <TableCell>{getEstadoBadge(solicitud.estado)}</TableCell>
                    <TableCell>
                      {format(new Date(solicitud.updatedAt), 'dd MMM yyyy', { locale: es })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetail(solicitud)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Ver
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Solicitud: {selectedSolicitud?.folio}</DialogTitle>
            <DialogDescription>Detalle completo de la solicitud</DialogDescription>
          </DialogHeader>

          {selectedSolicitud && (
            <div className="space-y-6">
              {/* Info del Trámite */}
              {tramiteDef && (
                <Card>
                  <CardHeader>
                    <CardTitle>Información del Trámite</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-ink-600">Trámite</Label>
                        <p className="font-medium">{tramiteDef.nombre}</p>
                      </div>
                      <div>
                        <Label className="text-ink-600">Costo</Label>
                        <p className="font-medium">
                          {tramiteDef.costo === 0 ? 'Gratis' : `$${tramiteDef.costo}`}
                        </p>
                      </div>
                      <div>
                        <Label className="text-ink-600">Tiempo Estimado</Label>
                        <p className="font-medium">{tramiteDef.tiempoDias} días</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Datos del Ciudadano */}
              <Card>
                <CardHeader>
                  <CardTitle>Datos del Ciudadano</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-ink-600">Nombres</Label>
                      <p className="font-medium">{selectedSolicitud.ciudadano.nombres}</p>
                    </div>
                    <div>
                      <Label className="text-ink-600">Documento</Label>
                      <p className="font-medium">{selectedSolicitud.ciudadano.documento}</p>
                    </div>
                    <div>
                      <Label className="text-ink-600">Email</Label>
                      <p className="font-medium">{selectedSolicitud.ciudadano.email}</p>
                    </div>
                    {selectedSolicitud.ciudadano.telefono && (
                      <div>
                        <Label className="text-ink-600">Teléfono</Label>
                        <p className="font-medium">{selectedSolicitud.ciudadano.telefono}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Adjuntos */}
              {selectedSolicitud.adjuntos && selectedSolicitud.adjuntos.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Documentos Adjuntos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedSolicitud.adjuntos.map((adj) => (
                        <Badge key={adj.id} variant="default" className="cursor-pointer">
                          <FileText className="h-3 w-3 mr-1" />
                          {adj.nombre}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Historial */}
              <Card>
                <CardHeader>
                  <CardTitle>Historial</CardTitle>
                </CardHeader>
                <CardContent>
                  <Timeline items={selectedSolicitud.historial} />
                </CardContent>
              </Card>

              {/* Acciones */}
              {getAccionesDisponibles(selectedSolicitud.estado).length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {getAccionesDisponibles(selectedSolicitud.estado).map((accion) => (
                    <Button
                      key={accion}
                      variant="outline"
                      onClick={() => {
                        setAccionTipo(accion as any);
                        setIsAccionOpen(true);
                      }}
                    >
                      {accion === 'observar' && <AlertCircle className="h-4 w-4 mr-2" />}
                      {accion === 'aprobar' && <CheckCircle className="h-4 w-4 mr-2" />}
                      {accion === 'rechazar' && <XCircle className="h-4 w-4 mr-2" />}
                      {accion === 'pago' && <DollarSign className="h-4 w-4 mr-2" />}
                      {accion === 'entregar' && <Download className="h-4 w-4 mr-2" />}
                      {accion.charAt(0).toUpperCase() + accion.slice(1)}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Accion Dialog */}
      <Dialog open={isAccionOpen} onOpenChange={setIsAccionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {accionTipo === 'observar' && 'Observar Solicitud'}
              {accionTipo === 'aprobar' && 'Aprobar Solicitud'}
              {accionTipo === 'rechazar' && 'Rechazar Solicitud'}
              {accionTipo === 'pago' && 'Registrar Pago'}
              {accionTipo === 'entregar' && 'Entregar Documento'}
            </DialogTitle>
            <DialogDescription>
              {accionTipo === 'observar' && 'Ingresa una nota explicando las observaciones'}
              {accionTipo === 'aprobar' && '¿Estás seguro de aprobar esta solicitud?'}
              {accionTipo === 'rechazar' && 'Ingresa una nota explicando el rechazo'}
              {accionTipo === 'pago' && 'Registra los datos del pago realizado'}
              {accionTipo === 'entregar' && 'Se generará y descargará el documento PDF'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {(accionTipo === 'observar' || accionTipo === 'rechazar') && (
              <div className="space-y-2">
                <Label htmlFor="nota">Nota *</Label>
                <Textarea
                  id="nota"
                  value={accionData.nota}
                  onChange={(e) => setAccionData({ ...accionData, nota: e.target.value })}
                  rows={4}
                  required
                />
              </div>
            )}

            {accionTipo === 'pago' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="codigo">Código de Pago *</Label>
                  <Input
                    id="codigo"
                    value={accionData.codigo}
                    onChange={(e) => setAccionData({ ...accionData, codigo: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comprobanteUrl">URL del Comprobante</Label>
                  <Input
                    id="comprobanteUrl"
                    value={accionData.comprobanteUrl}
                    onChange={(e) => setAccionData({ ...accionData, comprobanteUrl: e.target.value })}
                  />
                </div>
              </>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAccionOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAccion}>
                {accionTipo === 'aprobar' && 'Aprobar'}
                {accionTipo === 'observar' && 'Observar'}
                {accionTipo === 'rechazar' && 'Rechazar'}
                {accionTipo === 'pago' && 'Registrar Pago'}
                {accionTipo === 'entregar' && 'Entregar'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BandejaSolicitudes;

