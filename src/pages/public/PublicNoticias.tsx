import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/ui/components/Badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Calendar, Tag, Eye, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AppContainer } from '@/ui/components/AppContainer';
import { noticiasService } from '@/domain/services';
import type { Noticia } from '@/domain/models/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';

const PublicNoticias = () => {
  const [loading, setLoading] = useState(true);
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');

  useEffect(() => {
    loadNoticias();
  }, []);

  const loadNoticias = async () => {
    try {
      setLoading(true);
      const result = await noticiasService.list({ orderBy: 'publishedAt', orderDir: 'desc' });
      setNoticias(result.items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const categories = Array.from(new Set(noticias.map((n) => n.categoria)));

  const filteredNoticias = noticias.filter((noticia) => {
    const matchesSearch =
      noticia.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      noticia.cuerpoHtml.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todas' || noticia.categoria === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          <h1 className="text-4xl font-bold text-ink-900 mb-2">Noticias</h1>
          <p className="text-ink-600">Mantente informado sobre las actividades y proyectos del GAD</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-ink-500" />
                <Input
                  placeholder="Buscar noticias..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las categorías</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Noticias Grid */}
        {filteredNoticias.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-ink-500">No se encontraron noticias</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNoticias.map((noticia) => (
              <Card
                key={noticia.id}
                className="rounded-2xl shadow-soft border-ink-100 hover:shadow-lg transition-shadow cursor-pointer"
              >
                {noticia.portadaUrl && (
                  <div className="h-48 bg-ink-200 rounded-t-2xl overflow-hidden">
                    <img
                      src={noticia.portadaUrl}
                      alt={noticia.titulo}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge>{noticia.categoria}</Badge>
                    <div className="flex items-center gap-1 text-xs text-ink-500">
                      <Eye className="h-3 w-3" />
                      {noticia.vistas}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-ink-900 mb-2 line-clamp-2">
                    {noticia.titulo}
                  </h3>
                  <p className="text-sm text-ink-600 line-clamp-3 mb-4">
                    {noticia.cuerpoHtml.replace(/<[^>]*>/g, '').substring(0, 120)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-ink-500">
                      <Calendar className="h-3 w-3" />
                      {format(new Date(noticia.publishedAt), 'dd MMM yyyy', { locale: es })}
                    </div>
                    <Link to={`/public/noticias/${noticia.id}`}>
                      <Button variant="outline" size="sm">
                        Leer más
                      </Button>
                    </Link>
                  </div>
                  {noticia.etiquetas && noticia.etiquetas.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {noticia.etiquetas.slice(0, 3).map((tag, idx) => (
                        <Badge key={idx} variant="default" className="text-xs">
                          <Tag className="h-2 w-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </AppContainer>
    </div>
  );
};

export default PublicNoticias;
