import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Users,
  ClipboardList,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Newspaper,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
} from 'lucide-react';
import { dashboardData } from '@/data/mockData';

const Dashboard = () => {
  const { widgets, recentActivity } = dashboardData;

  const statsCards = [
    {
      title: "Usuarios Activos",
      value: widgets.usuariosActivos,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Trámites Pendientes",
      value: widgets.tramitesPendientes,
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Trámites en Proceso",
      value: widgets.tramitesEnProceso,
      icon: AlertCircle,
      color: "text-info",
      bgColor: "bg-info/10",
    },
    {
      title: "Trámites Aprobados",
      value: widgets.tramitesAprobados,
      icon: CheckCircle,
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'tramite':
        return ClipboardList;
      case 'noticia':
        return Newspaper;
      case 'evento':
        return Calendar;
      default:
        return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'tramite':
        return 'text-primary';
      case 'noticia':
        return 'text-success';
      case 'evento':
        return 'text-info';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-EC', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Panel de control - GAD Parroquial Membrillal
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-medium transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ejecución Presupuestaria */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Ejecución Presupuestaria 2024
            </CardTitle>
            <CardDescription>
              Estado actual del presupuesto parroquial
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ejecutado</p>
                <p className="text-2xl font-bold text-primary">
                  {formatCurrency(widgets.ejecucionPresupuestaria.ejecutado)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Presupuestado</p>
                <p className="text-xl font-semibold">
                  {formatCurrency(widgets.ejecucionPresupuestaria.presupuestado)}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progreso de ejecución</span>
                <span className="font-medium">
                  {widgets.ejecucionPresupuestaria.porcentaje}%
                </span>
              </div>
              <Progress 
                value={widgets.ejecucionPresupuestaria.porcentaje} 
                className="h-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Noticias este mes</p>
                <p className="text-xl font-bold text-success">
                  {widgets.noticiasPublicadasMes}
                </p>
              </div>
              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Eventos próximos</p>
                <p className="text-xl font-bold text-info">
                  {widgets.eventosProximos}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Solicitudes de Información */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-info" />
              Solicitudes de Información
            </CardTitle>
            <CardDescription>
              Transparencia y acceso a la información
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Recibidas</span>
                <Badge variant="outline">
                  {widgets.solicitudesInformacion.recibidas}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Respondidas</span>
                <Badge variant="default">
                  {widgets.solicitudesInformacion.respondidas}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pendientes</span>
                <Badge variant="destructive">
                  {widgets.solicitudesInformacion.pendientes}
                </Badge>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex justify-between text-sm mb-2">
                <span>Tasa de respuesta</span>
                <span className="font-medium">
                  {Math.round(
                    (widgets.solicitudesInformacion.respondidas / 
                     widgets.solicitudesInformacion.recibidas) * 100
                  )}%
                </span>
              </div>
              <Progress 
                value={
                  (widgets.solicitudesInformacion.respondidas / 
                   widgets.solicitudesInformacion.recibidas) * 100
                } 
                className="h-2"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Actividad Reciente
          </CardTitle>
          <CardDescription>
            Últimas actividades en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              return (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className={`p-2 rounded-lg bg-muted`}>
                    <Icon className={`h-4 w-4 ${getActivityColor(activity.type)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">
                      Por {activity.user} • {formatDate(activity.timestamp)}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;