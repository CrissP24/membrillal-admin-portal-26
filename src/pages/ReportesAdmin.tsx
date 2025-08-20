import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, TrendingUp, Users, FileText, Download, Calendar, DollarSign, Activity } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { presupuestoData, tramitesData, noticiasData, eventosData } from '@/data/mockData';

const ReportesAdmin = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('todos');

  const generateReport = (tipo: string) => {
    toast({
      title: "Reporte Generado",
      description: `El reporte de ${tipo} ha sido generado exitosamente.`,
    });
  };

  const tramitesStats = {
    total: tramitesData.length,
    pendientes: tramitesData.filter(t => t.estado === 'pendiente').length,
    enProceso: tramitesData.filter(t => t.estado === 'en_proceso').length,
    aprobados: tramitesData.filter(t => t.estado === 'aprobado').length,
    rechazados: tramitesData.filter(t => t.estado === 'rechazado').length,
  };

  const noticiasStats = {
    total: noticiasData.length,
    publicadas: noticiasData.filter(n => n.estado === 'publicado').length,
    borradores: noticiasData.filter(n => n.estado === 'borrador').length,
    mesActual: noticiasData.filter(n => n.fechaPublicacion.startsWith('2024-01')).length
  };

  const eventosStats = {
    total: eventosData.length,
    programados: eventosData.filter(e => e.estado === 'programado').length,
    finalizados: eventosData.filter(e => e.estado === 'finalizado').length,
    proximoMes: eventosData.filter(e => e.fechaInicio.startsWith('2024-02')).length
  };

  const participacionData = [
    { mes: 'Enero', asistencia: 45, participacion: 78 },
    { mes: 'Febrero', asistencia: 52, participacion: 83 },
    { mes: 'Marzo', asistencia: 48, participacion: 76 },
    { mes: 'Abril', asistencia: 59, participacion: 89 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reportes y Estadísticas</h1>
          <p className="text-muted-foreground">
            Visualiza estadísticas y genera reportes de gestión del GAD Parroquial
          </p>
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los meses</SelectItem>
              <SelectItem value="01">Enero</SelectItem>
              <SelectItem value="02">Febrero</SelectItem>
              <SelectItem value="03">Marzo</SelectItem>
              <SelectItem value="04">Abril</SelectItem>
              <SelectItem value="05">Mayo</SelectItem>
              <SelectItem value="06">Junio</SelectItem>
              <SelectItem value="07">Julio</SelectItem>
              <SelectItem value="08">Agosto</SelectItem>
              <SelectItem value="09">Septiembre</SelectItem>
              <SelectItem value="10">Octubre</SelectItem>
              <SelectItem value="11">Noviembre</SelectItem>
              <SelectItem value="12">Diciembre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="resumen" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="resumen">Resumen</TabsTrigger>
          <TabsTrigger value="tramites">Trámites</TabsTrigger>
          <TabsTrigger value="presupuesto">Presupuesto</TabsTrigger>
          <TabsTrigger value="participacion">Participación</TabsTrigger>
          <TabsTrigger value="descargas">Descargas</TabsTrigger>
        </TabsList>

        <TabsContent value="resumen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Trámites</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tramitesStats.total}</div>
                <p className="text-xs text-muted-foreground">
                  +12% desde el mes pasado
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Noticias Publicadas</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{noticiasStats.publicadas}</div>
                <p className="text-xs text-muted-foreground">
                  {noticiasStats.mesActual} este mes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Eventos Programados</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{eventosStats.programados}</div>
                <p className="text-xs text-muted-foreground">
                  {eventosStats.proximoMes} próximo mes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ejecución Presupuestal</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{presupuestoData.resumen.porcentajeEjecucion}%</div>
                <p className="text-xs text-muted-foreground">
                  ${presupuestoData.resumen.ejecutado.toLocaleString()} ejecutado
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Resumen de Actividades - {selectedPeriod}</CardTitle>
              <CardDescription>
                Vista general de las actividades y gestión del GAD
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold">Estado de Trámites</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Pendientes</span>
                      <span className="font-medium">{tramitesStats.pendientes}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>En Proceso</span>
                      <span className="font-medium">{tramitesStats.enProceso}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Aprobados</span>
                      <span className="font-medium text-green-600">{tramitesStats.aprobados}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Contenido Digital</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Noticias Publicadas</span>
                      <span className="font-medium">{noticiasStats.publicadas}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Eventos Activos</span>
                      <span className="font-medium">{eventosStats.programados}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Documentos Subidos</span>
                      <span className="font-medium">24</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Transparencia</h3>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Documentos Públicos</span>
                      <span className="font-medium">18</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Solicitudes Info</span>
                      <span className="font-medium">37</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Respuestas Enviadas</span>
                      <span className="font-medium">25</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tramites">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Estadísticas de Trámites
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Pendientes ({tramitesStats.pendientes})</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-600 h-2 rounded-full" 
                        style={{ width: `${(tramitesStats.pendientes / tramitesStats.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">En Proceso ({tramitesStats.enProceso})</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(tramitesStats.enProceso / tramitesStats.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Aprobados ({tramitesStats.aprobados})</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(tramitesStats.aprobados / tramitesStats.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tipos de Trámites Más Solicitados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Permiso de Construcción</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Certificado de Residencia</span>
                    <span className="font-medium">32%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Uso de Suelo</span>
                    <span className="font-medium">23%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="presupuesto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Reporte Presupuestario {selectedPeriod}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Ejecución por Categoría</h3>
                  <div className="space-y-3">
                    {presupuestoData.categorias.map((categoria, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{categoria.nombre}</span>
                          <span className="font-medium">{categoria.porcentaje}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full" 
                            style={{ width: `${categoria.porcentaje}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>${categoria.ejecutado.toLocaleString()}</span>
                          <span>${categoria.presupuestado.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Resumen Ejecutivo</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        ${presupuestoData.resumen.ejecutado.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-700">Total Ejecutado</div>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {presupuestoData.resumen.porcentajeEjecucion}%
                      </div>
                      <div className="text-sm text-blue-700">Porcentaje de Ejecución</div>
                    </div>
                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        ${presupuestoData.resumen.pendiente.toLocaleString()}
                      </div>
                      <div className="text-sm text-orange-700">Pendiente por Ejecutar</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="participacion">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Participación Ciudadana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Asistencia a Sesiones</h3>
                  <div className="space-y-3">
                    {participacionData.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{item.mes}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{item.asistencia} personas</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${(item.asistencia / 100) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Índice de Participación</h3>
                  <div className="space-y-3">
                    {participacionData.map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-sm">{item.mes}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{item.participacion}%</span>
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${item.participacion}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="descargas">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Generar Reportes</CardTitle>
                <CardDescription>
                  Descarga reportes detallados en formato PDF o Excel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-between" 
                  variant="outline"
                  onClick={() => generateReport('trámites')}
                >
                  <span>Reporte de Trámites</span>
                  <Download className="h-4 w-4" />
                </Button>
                <Button 
                  className="w-full justify-between" 
                  variant="outline"
                  onClick={() => generateReport('presupuesto')}
                >
                  <span>Reporte Presupuestario</span>
                  <Download className="h-4 w-4" />
                </Button>
                <Button 
                  className="w-full justify-between" 
                  variant="outline"
                  onClick={() => generateReport('participación')}
                >
                  <span>Reporte de Participación</span>
                  <Download className="h-4 w-4" />
                </Button>
                <Button 
                  className="w-full justify-between" 
                  variant="outline"
                  onClick={() => generateReport('gestión general')}
                >
                  <span>Reporte de Gestión General</span>
                  <Download className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reportes Programados</CardTitle>
                <CardDescription>
                  Configura la generación automática de reportes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Reporte Mensual</p>
                    <p className="text-xs text-muted-foreground">Cada primer día del mes</p>
                  </div>
                  <Button size="sm" variant="outline">Configurar</Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Reporte Trimestral</p>
                    <p className="text-xs text-muted-foreground">Cada fin de trimestre</p>
                  </div>
                  <Button size="sm" variant="outline">Configurar</Button>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Reporte Anual</p>
                    <p className="text-xs text-muted-foreground">31 de diciembre</p>
                  </div>
                  <Button size="sm" variant="outline">Configurar</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportesAdmin;