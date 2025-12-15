import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContainer } from '@/ui/components/AppContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UploadBox } from '@/ui/components/UploadBox';
import { Badge } from '@/ui/components/Badge';
import { CheckCircle, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { tramiteDefRepo } from '@/data/repos';
import { tramitesService } from '@/domain/services';
import type { TramiteDef, Ciudadano, Adj } from '@/domain/models/types';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';

const ciudadanoSchema = z.object({
  nombres: z.string().min(3, 'Los nombres deben tener al menos 3 caracteres'),
  documento: z.string().regex(/^\d{10}$/, 'El documento debe tener 10 dígitos'),
  email: z.string().email('Email inválido').optional(),
  telefono: z.string().optional(),
});

type Step = 1 | 2 | 3 | 4; // 4 = success

const SolicitarTramite: React.FC = () => {
  const { tramiteId } = useParams<{ tramiteId: string }>();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [tramite, setTramite] = useState<TramiteDef | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [ciudadano, setCiudadano] = useState<Partial<Ciudadano>>({
    nombres: '',
    documento: '',
    email: '',
    telefono: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [adjuntos, setAdjuntos] = useState<Adj[]>([]);
  const [solicitud, setSolicitud] = useState<string>('');
  const [instanciaId, setInstanciaId] = useState<string | null>(null);
  const [folio, setFolio] = useState<string>('');

  useEffect(() => {
    const loadTramite = async () => {
      if (!tramiteId) {
        navigate('/public/tramites');
        return;
      }
      try {
        const data = await tramiteDefRepo.get(tramiteId);
        if (!data) {
          toast({
            title: 'Error',
            description: 'Trámite no encontrado',
            variant: 'destructive',
          });
          navigate('/public/tramites');
          return;
        }
        setTramite(data);
      } catch (error) {
        console.error(error);
        navigate('/public/tramites');
      } finally {
        setLoading(false);
      }
    };
    loadTramite();
  }, [tramiteId, navigate]);

  const validateStep1 = (): boolean => {
    try {
      ciudadanoSchema.parse(ciudadano);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleStep1Next = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleStep2Next = async () => {
    if (!tramite || !tramiteId) return;

    // Check if adjuntos are required
    const requiereAdjuntos = tramite.requisitosHtml.toLowerCase().includes('adjuntar');
    if (requiereAdjuntos && adjuntos.length === 0) {
      toast({
        title: 'Error',
        description: 'Debe adjuntar al menos un documento',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      // Create instance
      const instancia = await tramitesService.iniciarSolicitud(
        tramiteId,
        ciudadano as Ciudadano,
        solicitud
      );
      setInstanciaId(instancia.id);

      // Add adjuntos
      for (const adj of adjuntos) {
        await tramitesService.guardarAdjunto(instancia.id, adj);
      }

      setStep(3);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudo crear la solicitud',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEnviar = async () => {
    if (!instanciaId) return;

    setSaving(true);
    try {
      const instancia = await tramitesService.enviarSolicitud(instanciaId);
      setFolio(instancia.folio);
      setStep(4);
      toast({
        title: 'Éxito',
        description: 'Solicitud enviada correctamente',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'No se pudo enviar la solicitud',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleFileSelect = (file: { name: string; url: string }) => {
    const adj: Adj = {
      id: `${Date.now()}-${Math.random()}`,
      nombre: file.name,
      url: file.url,
    };
    setAdjuntos((prev) => [...prev, adj]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (!tramite) {
    return (
      <div className="min-h-screen flex items-center justify-center text-ink-600">
        <p>Trámite no encontrado o no disponible.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas py-12">
      <AppContainer>
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step >= s
                          ? 'bg-primary-600 text-white'
                          : 'bg-ink-200 text-ink-500'
                      }`}
                    >
                      {step > s ? <CheckCircle className="h-5 w-5" /> : s}
                    </div>
                    <span className="text-xs mt-2 text-ink-600">
                      {s === 1 ? 'Datos' : s === 2 ? 'Requisitos' : 'Resumen'}
                    </span>
                  </div>
                  {s < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        step > s ? 'bg-primary-600' : 'bg-ink-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Paso 1: Datos del Ciudadano</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nombres">Nombres Completos *</Label>
                    <Input
                      id="nombres"
                      value={ciudadano.nombres}
                      onChange={(e) =>
                        setCiudadano({ ...ciudadano, nombres: e.target.value })
                      }
                      className={errors.nombres ? 'border-red-500' : ''}
                    />
                    {errors.nombres && (
                      <p className="text-sm text-red-500 mt-1">{errors.nombres}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="documento">Cédula de Identidad *</Label>
                    <Input
                      id="documento"
                      value={ciudadano.documento}
                      onChange={(e) =>
                        setCiudadano({ ...ciudadano, documento: e.target.value })
                      }
                      maxLength={10}
                      className={errors.documento ? 'border-red-500' : ''}
                    />
                    {errors.documento && (
                      <p className="text-sm text-red-500 mt-1">{errors.documento}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={ciudadano.email}
                      onChange={(e) =>
                        setCiudadano({ ...ciudadano, email: e.target.value })
                      }
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="telefono">Teléfono (Opcional)</Label>
                    <Input
                      id="telefono"
                      value={ciudadano.telefono}
                      onChange={(e) =>
                        setCiudadano({ ...ciudadano, telefono: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => navigate('/public/tramites')}>
                    Cancelar
                  </Button>
                  <Button onClick={handleStep1Next}>
                    Siguiente <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Paso 2: Requisitos y Adjuntos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Requisitos del Trámite</Label>
                  <div
                    className="mt-2 p-4 bg-ink-50 rounded-xl prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: tramite.requisitosHtml }}
                  />
                </div>
                <div>
                  <Label>Adjuntar Documentos</Label>
                  <UploadBox onFileSelect={handleFileSelect} multiple />
                  {adjuntos.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {adjuntos.map((adj) => (
                        <Badge key={adj.id} variant="default">
                          {adj.nombre}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="motivoSolicitud">Motivo de la Solicitud (Opcional)</Label>
                  <Textarea
                    id="motivoSolicitud"
                    value={solicitud}
                    onChange={(e) => setSolicitud(e.target.value)}
                    placeholder="Describe brevemente tu requerimiento..."
                    rows={3}
                    className="mt-1"
                  />
                </div>
                <div className="flex justify-between gap-2">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Anterior
                  </Button>
                  <Button onClick={handleStep2Next} disabled={saving}>
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Guardando...
                      </>
                    ) : (
                      <>
                        Continuar <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Paso 3: Resumen y Envío</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Datos del Trámite</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-ink-600">Trámite:</span>
                        <span className="font-medium">{tramite.nombre}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ink-600">Costo:</span>
                        <span className="font-medium">
                          {tramite.costo === 0 ? 'Gratis' : `$${tramite.costo}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-ink-600">Tiempo estimado:</span>
                        <span className="font-medium">{tramite.tiempoDias} días</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Datos del Ciudadano</h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-ink-600">Nombres: </span>
                        <span className="font-medium">{ciudadano.nombres}</span>
                      </div>
                      <div>
                        <span className="text-ink-600">Documento: </span>
                        <span className="font-medium">{ciudadano.documento}</span>
                      </div>
                      <div>
                        <span className="text-ink-600">Email: </span>
                        <span className="font-medium">{ciudadano.email}</span>
                      </div>
                      {ciudadano.telefono && (
                        <div>
                          <span className="text-ink-600">Teléfono: </span>
                          <span className="font-medium">{ciudadano.telefono}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between gap-2">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Anterior
                  </Button>
                  <Button onClick={handleEnviar} disabled={saving} className="bg-accent-600 hover:bg-accent-700">
                    {saving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      'Enviar Solicitud'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 4 && (
            <Card className="text-center">
              <CardContent className="py-12">
                <CheckCircle className="h-16 w-16 text-accent-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-ink-900 mb-2">
                  ¡Solicitud Enviada Exitosamente!
                </h2>
                <p className="text-ink-600 mb-6">
                  Tu solicitud ha sido registrada en el sistema
                </p>
                <div className="bg-primary-100 rounded-xl p-6 mb-6">
                  <p className="text-sm text-ink-600 mb-2">Folio de Seguimiento</p>
                  <p className="text-3xl font-bold text-primary-700">{folio}</p>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button onClick={() => navigate(`/public/seguimiento?folio=${folio}`)}>
                    Ver Seguimiento
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/public/tramites')}>
                    Volver a Servicios
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </AppContainer>
    </div>
  );
};

export default SolicitarTramite;

