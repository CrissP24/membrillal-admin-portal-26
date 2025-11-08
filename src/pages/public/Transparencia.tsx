import React, { useEffect, useState } from 'react';
import { AppContainer } from '@/ui/components/AppContainer';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/ui/components/Badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { transparenciaService } from '@/domain/services';
import type { Documento, DocCategoria } from '@/domain/models/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';

const Transparencia: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [activeTab, setActiveTab] = useState<DocCategoria>('Rendicion');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAnio, setFilterAnio] = useState<string>('todos');

  useEffect(() => {
    loadDocumentos();
  }, [activeTab]);

  const loadDocumentos = async () => {
    try {
      setLoading(true);
      const result = await transparenciaService.getByCategoria(activeTab);
      setDocumentos(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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

  const categoriaLabels: Record<DocCategoria, string> = {
    Rendicion: 'Rendición de Cuentas',
    Presupuesto: 'Presupuesto',
    Licitacion: 'Licitaciones',
    MarcoLegal: 'Marco Legal',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-canvas py-12">
        <AppContainer>
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          </div>
        </AppContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas py-12">
      <AppContainer>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-ink-900 mb-2">Transparencia</h1>
          <p className="text-ink-600">Accede a los documentos de transparencia y rendición de cuentas</p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as DocCategoria)}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="Rendicion">Rendición</TabsTrigger>
            <TabsTrigger value="Presupuesto">Presupuesto</TabsTrigger>
            <TabsTrigger value="Licitacion">Licitaciones</TabsTrigger>
            <TabsTrigger value="MarcoLegal">Marco Legal</TabsTrigger>
          </TabsList>

          {(['Rendicion', 'Presupuesto', 'Licitacion', 'MarcoLegal'] as DocCategoria[]).map((categoria) => (
            <TabsContent key={categoria} value={categoria}>
              <div className="space-y-4">
                {/* Filters */}
                <Card>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-ink-500" />
                        <Input
                          placeholder="Buscar documentos..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                      <Select value={filterAnio} onValueChange={setFilterAnio}>
                        <SelectTrigger>
                          <SelectValue placeholder="Todos los años" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos los años</SelectItem>
                          {anos.map((ano) => (
                            <SelectItem key={ano} value={ano.toString()}>
                              {ano}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Documents List */}
                {filteredDocumentos.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <p className="text-ink-500">No se encontraron documentos</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDocumentos.map((doc) => (
                      <Card
                        key={doc.id}
                        className="rounded-2xl shadow-soft border-ink-100 hover:shadow-lg transition-shadow"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <FileText className="h-8 w-8 text-primary-600" />
                            <Badge>{doc.anio}</Badge>
                          </div>
                          <h3 className="text-lg font-semibold text-ink-900 mb-2 line-clamp-2">{doc.titulo}</h3>
                          {doc.resumen && (
                            <p className="text-sm text-ink-600 line-clamp-3 mb-4">{doc.resumen}</p>
                          )}
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-ink-500">
                              {format(new Date(doc.publishedAt), 'dd MMM yyyy', { locale: es })}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(doc.url, '_blank')}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Descargar
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </AppContainer>
    </div>
  );
};

export default Transparencia;

