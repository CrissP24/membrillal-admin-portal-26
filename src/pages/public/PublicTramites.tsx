import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Search, FileText, Clock, DollarSign, CheckCircle, AlertCircle, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

const PublicTramites = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTramite, setSelectedTramite] = useState<any>(null);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      nombres: "",
      apellidos: "",
      cedula: "",
      telefono: "",
      email: "",
      direccion: "",
      descripcion: ""
    }
  });

  const tramites = [
    {
      id: 1,
      nombre: "Certificado de Residencia",
      descripcion: "Documento que certifica que una persona reside en la parroquia",
      requisitos: [
        "Cédula de identidad original y copia",
        "Planilla de servicio básico",
        "Declaración juramentada de dos testigos"
      ],
      costo: "Gratuito",
      tiempo: "1-2 días hábiles",
      categoria: "Certificaciones",
      icon: FileText,
      disponible: true
    },
    {
      id: 2,
      nombre: "Permiso de Funcionamiento",
      descripcion: "Autorización para el funcionamiento de establecimientos comerciales",
      requisitos: [
        "RUC o RISE del establecimiento",
        "Cédula del propietario",
        "Planos del local",
        "Permiso de bomberos",
        "Permiso de salud (si aplica)"
      ],
      costo: "$25.00",
      tiempo: "5-8 días hábiles",
      categoria: "Permisos",
      icon: CheckCircle,
      disponible: true
    },
    {
      id: 3,
      nombre: "Certificado de No Adeudar",
      descripcion: "Documento que certifica que no tiene deudas pendientes con el GAD",
      requisitos: [
        "Cédula de identidad",
        "Comprobante de último pago (si aplica)"
      ],
      costo: "Gratuito",
      tiempo: "1 día hábil",
      categoria: "Certificaciones",
      icon: DollarSign,
      disponible: true
    },
    {
      id: 4,
      nombre: "Permiso de Construcción",
      descripcion: "Autorización para construcción o modificación de inmuebles",
      requisitos: [
        "Planos arquitectónicos aprobados",
        "Escrituras del terreno",
        "Cédula del propietario",
        "Informe de uso de suelo",
        "Estudio de impacto ambiental (si aplica)"
      ],
      costo: "$50.00 - $200.00",
      tiempo: "10-15 días hábiles",
      categoria: "Permisos",
      icon: AlertCircle,
      disponible: false,
      motivo: "En proceso de actualización normativa"
    },
    {
      id: 5,
      nombre: "Certificado de Libertad de Soltera/o",
      descripción: "Documento que certifica el estado civil de soltería",
      requisitos: [
        "Cédula de identidad original y copia",
        "Declaración juramentada",
        "Certificado de nacimiento actualizado"
      ],
      costo: "$5.00",
      tiempo: "2-3 días hábiles",
      categoria: "Certificaciones",
      icon: User,
      disponible: true
    },
    {
      id: 6,
      nombre: "Registro de Organizaciones",
      descripcion: "Registro oficial de organizaciones comunitarias y sociales",
      requisitos: [
        "Acta de constitución",
        "Estatutos de la organización",
        "Nómina de directivos",
        "Cédulas de directivos"
      ],
      costo: "Gratuito",
      tiempo: "7-10 días hábiles",
      categoria: "Registros",
      icon: FileText,
      disponible: true
    }
  ];

  const filteredTramites = tramites.filter(tramite =>
    tramite.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tramite.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onSubmit = (data: any) => {
    toast({
      title: "Solicitud enviada",
      description: `Su solicitud para ${selectedTramite?.nombre} ha sido registrada. Le contactaremos pronto.`,
    });
    form.reset();
    setSelectedTramite(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Servicios en Línea</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Realiza tus trámites de manera fácil y rápida. Conoce los requisitos y solicita tus documentos online.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar trámites..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="text-center">
          <CardHeader>
            <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg">Rápido y Eficiente</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              La mayoría de trámites se procesan en 1-3 días hábiles
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg">Sin Papeleos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Solicita tus trámites online y evita filas innecesarias
            </p>
          </CardContent>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg">Seguimiento</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Consulta el estado de tu trámite en tiempo real
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTramites.map((tramite) => (
          <Card key={tramite.id} className={`${!tramite.disponible ? 'opacity-60' : 'hover:shadow-lg'} transition-shadow`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <tramite.icon className="h-8 w-8 text-primary flex-shrink-0" />
                <div className="flex flex-col gap-2">
                  <Badge variant={tramite.disponible ? "default" : "secondary"}>
                    {tramite.categoria}
                  </Badge>
                  {!tramite.disponible && (
                    <Badge variant="destructive">No disponible</Badge>
                  )}
                </div>
              </div>
              <CardTitle className="text-lg">{tramite.nombre}</CardTitle>
              <CardDescription>{tramite.descripcion}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Costo:</span>
                  <span className="font-medium">{tramite.costo}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tiempo:</span>
                  <span className="font-medium">{tramite.tiempo}</span>
                </div>
              </div>

              {tramite.disponible ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full" 
                      onClick={() => setSelectedTramite(tramite)}
                    >
                      Solicitar trámite
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{tramite.nombre}</DialogTitle>
                      <DialogDescription>
                        Complete el formulario para solicitar este trámite
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                      {/* Requirements */}
                      <div>
                        <h3 className="font-semibold mb-3">Requisitos:</h3>
                        <ul className="space-y-1 text-sm">
                          {tramite.requisitos.map((req, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Form */}
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="nombres"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Nombres</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Ingrese sus nombres" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="apellidos"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Apellidos</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Ingrese sus apellidos" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="cedula"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Cédula de Identidad</FormLabel>
                                  <FormControl>
                                    <Input placeholder="1234567890" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="telefono"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Teléfono</FormLabel>
                                  <FormControl>
                                    <Input placeholder="0987654321" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="correo@ejemplo.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="direccion"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Dirección</FormLabel>
                                <FormControl>
                                  <Input placeholder="Dirección domiciliaria" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="descripcion"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Descripción adicional (opcional)</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Información adicional sobre su solicitud"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                              Enviar solicitud
                            </Button>
                            <DialogTrigger asChild>
                              <Button type="button" variant="outline">
                                Cancelar
                              </Button>
                            </DialogTrigger>
                          </div>
                        </form>
                      </Form>
                    </div>
                  </DialogContent>
                </Dialog>
              ) : (
                <div className="space-y-2">
                  <Button className="w-full" disabled>
                    No disponible
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    {tramite.motivo}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Info */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle>¿Necesitas ayuda?</CardTitle>
          <CardDescription>
            Si tienes dudas sobre algún trámite, contáctanos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Teléfono:</strong><br />
              +593 (7) 123-4567
            </div>
            <div>
              <strong>Email:</strong><br />
              tramites@gadmembrillal.gob.ec
            </div>
            <div>
              <strong>Horario:</strong><br />
              Lunes a Viernes: 8:00 AM - 5:00 PM
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublicTramites;