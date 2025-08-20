import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Phone, Mail, ExternalLink, FileText, Users, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

const PublicHome = () => {
  const recentNews = [
    {
      id: 1,
      title: "Inauguración del nuevo centro de salud comunitario",
      excerpt: "El GAD Parroquial inaugura moderna infraestructura de salud para mejorar la atención a los habitantes.",
      date: "2024-07-10",
      image: "/api/placeholder/400/250"
    },
    {
      id: 2,
      title: "Programa de capacitación en agricultura sostenible",
      excerpt: "Inicia el programa de capacitación dirigido a productores locales para implementar técnicas sostenibles.",
      date: "2024-07-08",
      image: "/api/placeholder/400/250"
    },
    {
      id: 3,
      title: "Mejoramiento de vías rurales - Fase II",
      excerpt: "Continúan los trabajos de mejoramiento vial en las principales rutas de acceso a la parroquia.",
      date: "2024-07-05",
      image: "/api/placeholder/400/250"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Asamblea Parroquial",
      date: "2024-07-20",
      time: "09:00",
      location: "Casa Parroquial"
    },
    {
      id: 2,
      title: "Feria de Emprendimiento Local",
      date: "2024-07-25",
      time: "08:00",
      location: "Plaza Central"
    },
    {
      id: 3,
      title: "Taller de Gestión Ambiental",
      date: "2024-07-30",
      time: "14:00",
      location: "Centro Comunitario"
    }
  ];

  const quickServices = [
    { name: "Certificados", icon: FileText, description: "Certificados de residencia y otros documentos" },
    { name: "Registro Civil", icon: Users, description: "Servicios de registro civil" },
    { name: "Permisos", icon: Building2, description: "Permisos de construcción y funcionamiento" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-glow to-accent py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              GAD Parroquial Rural de Membrillal
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Trabajando por el desarrollo sostenible y el bienestar de nuestra comunidad
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/public/tramites">
                  <FileText className="mr-2 h-5 w-5" />
                  Servicios en Línea
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20" asChild>
                <Link to="/public/noticias">
                  Ver Noticias
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="py-16 bg-accent/5">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Servicios Destacados</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {quickServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <service.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>{service.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                  <Button variant="outline" className="mt-4" asChild>
                    <Link to="/public/tramites">
                      Solicitar
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent News */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Noticias Recientes</h2>
            <Button variant="outline" asChild>
              <Link to="/public/noticias">
                Ver todas
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {recentNews.map((news) => (
              <Card key={news.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit">
                    {new Date(news.date).toLocaleDateString('es-ES')}
                  </Badge>
                  <CardTitle className="line-clamp-2">{news.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">{news.excerpt}</p>
                  <Button variant="link" className="p-0 mt-2" asChild>
                    <Link to={`/public/noticias/${news.id}`}>
                      Leer más →
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Próximos Eventos</h2>
            <Button variant="outline" asChild>
              <Link to="/public/eventos">
                Ver agenda completa
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    {event.title}
                  </CardTitle>
                  <CardDescription>
                    {new Date(event.date).toLocaleDateString('es-ES')} • {event.time}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contáctanos</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  <span>Calle Principal s/n, Membrillal, Ecuador</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5" />
                  <span>+593 (7) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  <span>info@gadmembrillal.gob.ec</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Horarios de Atención</h3>
              <div className="space-y-2">
                <p>Lunes a Viernes: 8:00 AM - 5:00 PM</p>
                <p>Sábados: 8:00 AM - 1:00 PM</p>
                <p>Domingos: Cerrado</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PublicHome;