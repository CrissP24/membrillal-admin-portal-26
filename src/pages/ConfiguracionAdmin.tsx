import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Users, Bell, Shield, Globe, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ConfiguracionAdmin = () => {
  const [config, setConfig] = useState({
    siteName: 'GAD Parroquial Membrillal',
    email: 'contacto@gadmembrillal.gob.ec',
    telefono: '07-2956123',
    direccion: 'Centro Parroquial, Membrillal',
    notificaciones: true,
    mantenimiento: false,
    registroPublico: true
  });

  const handleSave = () => {
    toast({
      title: "Configuración Guardada",
      description: "Los cambios han sido aplicados exitosamente.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Configuración del Sistema</h1>
          <p className="text-muted-foreground">
            Administra la configuración general del portal GAD
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Guardar Cambios
        </Button>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
          <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Configuración General
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Nombre del Sitio</Label>
                  <Input
                    id="siteName"
                    value={config.siteName}
                    onChange={(e) => setConfig({...config, siteName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Principal</Label>
                  <Input
                    id="email"
                    type="email"
                    value={config.email}
                    onChange={(e) => setConfig({...config, email: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={config.telefono}
                    onChange={(e) => setConfig({...config, telefono: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    value={config.direccion}
                    onChange={(e) => setConfig({...config, direccion: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usuarios">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Gestión de Usuarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base">Registro Público</div>
                    <div className="text-sm text-muted-foreground">
                      Permitir que ciudadanos se registren
                    </div>
                  </div>
                  <Switch 
                    checked={config.registroPublico}
                    onCheckedChange={(checked) => setConfig({...config, registroPublico: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notificaciones">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base">Notificaciones por Email</div>
                    <div className="text-sm text-muted-foreground">
                      Enviar notificaciones importantes por correo
                    </div>
                  </div>
                  <Switch 
                    checked={config.notificaciones}
                    onCheckedChange={(checked) => setConfig({...config, notificaciones: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seguridad">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Seguridad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-base">Modo Mantenimiento</div>
                    <div className="text-sm text-muted-foreground">
                      Activar página de mantenimiento
                    </div>
                  </div>
                  <Switch 
                    checked={config.mantenimiento}
                    onCheckedChange={(checked) => setConfig({...config, mantenimiento: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConfiguracionAdmin;