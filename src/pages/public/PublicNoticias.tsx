import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Calendar, Tag, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const PublicNoticias = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todas");

  const noticias = [
    {
      id: 1,
      title: "Inauguración del nuevo centro de salud comunitario",
      excerpt: "El GAD Parroquial inaugura moderna infraestructura de salud para mejorar la atención a los habitantes de Membrillal y comunidades aledañas.",
      content: "En una ceremonia especial celebrada el pasado viernes, el GAD Parroquial Rural de Membrillal inauguró el nuevo centro de salud comunitario, una obra que beneficiará a más de 3,000 habitantes de la parroquia...",
      date: "2024-07-10",
      category: "Salud",
      image: "/api/placeholder/800/400",
      tags: ["salud", "infraestructura", "comunidad"],
      views: 342
    },
    {
      id: 2,
      title: "Programa de capacitación en agricultura sostenible",
      excerpt: "Inicia el programa de capacitación dirigido a productores locales para implementar técnicas sostenibles de agricultura.",
      content: "Con el objetivo de fortalecer la productividad agrícola y promover prácticas sostenibles, el GAD Parroquial en alianza con el MAGAP, inicia el programa de capacitación en agricultura sostenible...",
      date: "2024-07-08",
      category: "Agricultura",
      image: "/api/placeholder/800/400",
      tags: ["agricultura", "capacitación", "sostenibilidad"],
      views: 256
    },
    {
      id: 3,
      title: "Mejoramiento de vías rurales - Fase II",
      excerpt: "Continúan los trabajos de mejoramiento vial en las principales rutas de acceso a la parroquia.",
      content: "Los trabajos de mejoramiento vial en la Fase II contemplan la rehabilitación de 12 kilómetros de vías rurales que conectan las comunidades con el centro parroquial...",
      date: "2024-07-05",
      category: "Infraestructura",
      image: "/api/placeholder/800/400",
      tags: ["vías", "infraestructura", "transporte"],
      views: 198
    },
    {
      id: 4,
      title: "Proyecto de reforestación comunitaria",
      excerpt: "Lanzamiento del proyecto de reforestación con la participación activa de la comunidad.",
      content: "El proyecto de reforestación comunitaria busca restaurar 50 hectáreas de bosque nativo, con la participación de familias locales y estudiantes...",
      date: "2024-07-03",
      category: "Ambiente",
      image: "/api/placeholder/800/400",
      tags: ["reforestación", "ambiente", "comunidad"],
      views: 167
    },
    {
      id: 5,
      title: "Feria de emprendimiento local exitosa",
      excerpt: "La primera feria de emprendimiento local superó las expectativas con más de 40 expositores.",
      content: "La primera feria de emprendimiento local se realizó con gran éxito, contando con la participación de más de 40 emprendedores locales...",
      date: "2024-07-01",
      category: "Economía",
      image: "/api/placeholder/800/400",
      tags: ["emprendimiento", "economía", "feria"],
      views: 289
    },
    {
      id: 6,
      title: "Convenio con universidad para prácticas estudiantiles",
      excerpt: "Se firma convenio con universidad regional para realizar prácticas estudiantiles en la parroquia.",
      content: "El GAD Parroquial firmó un importante convenio con la Universidad Regional que permitirá a estudiantes realizar prácticas en diferentes áreas...",
      date: "2024-06-28",
      category: "Educación",
      image: "/api/placeholder/800/400",
      tags: ["educación", "convenio", "universidad"],
      views: 134
    }
  ];

  const categories = ["todas", "Salud", "Agricultura", "Infraestructura", "Ambiente", "Economía", "Educación"];

  const filteredNoticias = noticias.filter(noticia => {
    const matchesSearch = noticia.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         noticia.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "todas" || noticia.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Noticias</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Mantente informado sobre las últimas noticias y acontecimientos de nuestra parroquia
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar noticias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="md:w-48">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "todas" ? "Todas las categorías" : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* News Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNoticias.map((noticia) => (
          <Card key={noticia.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-muted">
              <img 
                src={noticia.image} 
                alt={noticia.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary">{noticia.category}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Eye className="h-3 w-3 mr-1" />
                  {noticia.views}
                </div>
              </div>
              <CardTitle className="line-clamp-2">{noticia.title}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(noticia.date).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground line-clamp-3 mb-4">{noticia.excerpt}</p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {noticia.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    <Tag className="h-2 w-2 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link to={`/public/noticias/${noticia.id}`}>
                  Leer más
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredNoticias.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No se encontraron noticias que coincidan con tu búsqueda.</p>
          </div>
          <Button variant="outline" onClick={() => { setSearchTerm(""); setSelectedCategory("todas"); }}>
            Limpiar filtros
          </Button>
        </div>
      )}

      {/* Load More */}
      {filteredNoticias.length > 0 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Cargar más noticias
          </Button>
        </div>
      )}
    </div>
  );
};

export default PublicNoticias;