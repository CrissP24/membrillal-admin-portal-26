import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Eye, Tag, Share2, Download } from "lucide-react";

const PublicNoticiaDetalle = () => {
  const { id } = useParams();

  // En una aplicación real, esto vendría de una API
  const noticia = {
    id: parseInt(id || "1"),
    title: "Inauguración del nuevo centro de salud comunitario",
    content: `
      <p>En una ceremonia especial celebrada el pasado viernes, el GAD Parroquial Rural de Membrillal inauguró el nuevo centro de salud comunitario, una obra que beneficiará a más de 3,000 habitantes de la parroquia y comunidades aledañas.</p>
      
      <p>La nueva infraestructura de salud cuenta con consultorios médicos especializados, área de emergencias, laboratorio clínico, farmacia comunitaria y espacios para programas de prevención en salud. La inversión total de la obra ascendió a $180,000 dólares, financiados a través del presupuesto participativo y aportes del Gobierno Provincial.</p>
      
      <h3>Servicios Disponibles</h3>
      <p>El centro de salud ofrecerá los siguientes servicios a la comunidad:</p>
      <ul>
        <li>Medicina general</li>
        <li>Pediatría</li>
        <li>Ginecología</li>
        <li>Odontología</li>
        <li>Laboratorio clínico</li>
        <li>Farmacia comunitaria</li>
        <li>Programas de prevención</li>
      </ul>
      
      <h3>Horarios de Atención</h3>
      <p>El centro funcionará de lunes a viernes de 7:00 AM a 5:00 PM, y los sábados de 8:00 AM a 1:00 PM. Para emergencias, se habilitará un sistema de guardia rotativa con el hospital más cercano.</p>
      
      <p>La presidente del GAD Parroquial, señora María González, destacó que "esta obra representa un paso fundamental para garantizar el derecho a la salud de nuestros habitantes, especialmente de los adultos mayores y niños que requieren atención médica regular".</p>
      
      <p>Durante la ceremonia de inauguración estuvieron presentes autoridades provinciales, cantonales, dirigentes comunitarios y más de 200 habitantes de la parroquia, quienes expresaron su satisfacción por contar con esta nueva infraestructura de salud.</p>
    `,
    date: "2024-07-10",
    category: "Salud",
    image: "/api/placeholder/1200/600",
    tags: ["salud", "infraestructura", "comunidad"],
    views: 342,
    author: "Comunicación GAD Membrillal"
  };

  const relatedNews = [
    {
      id: 2,
      title: "Programa de capacitación en agricultura sostenible",
      date: "2024-07-08",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Mejoramiento de vías rurales - Fase II",
      date: "2024-07-05",
      image: "/api/placeholder/300/200"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="outline" asChild>
          <Link to="/public/noticias">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a noticias
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary">{noticia.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Eye className="h-4 w-4 mr-1" />
                {noticia.views} visualizaciones
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{noticia.title}</h1>
            
            <div className="flex items-center gap-4 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(noticia.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <span>Por: {noticia.author}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mb-6">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Descargar PDF
              </Button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img 
              src={noticia.image} 
              alt={noticia.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: noticia.content }}
          />

          {/* Tags */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Etiquetas</h3>
            <div className="flex flex-wrap gap-2">
              {noticia.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Share Section */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Compartir esta noticia</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Facebook</Button>
                <Button variant="outline" size="sm">Twitter</Button>
                <Button variant="outline" size="sm">WhatsApp</Button>
                <Button variant="outline" size="sm">Email</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Related News */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Noticias relacionadas</h3>
              <div className="space-y-4">
                {relatedNews.map((news) => (
                  <Link 
                    key={news.id}
                    to={`/public/noticias/${news.id}`}
                    className="block group"
                  >
                    <div className="flex gap-3">
                      <img 
                        src={news.image} 
                        alt={news.title}
                        className="w-20 h-20 object-cover rounded flex-shrink-0"
                      />
                      <div>
                        <h4 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                          {news.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(news.date).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/public/noticias">Ver todas las noticias</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Newsletter */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">Mantente informado</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Suscríbete para recibir las últimas noticias de la parroquia
              </p>
              <Button className="w-full">
                Suscribirse
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PublicNoticiaDetalle;