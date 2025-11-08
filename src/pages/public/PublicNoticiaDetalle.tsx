import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/ui/components/Badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Calendar, Eye, Tag, Share2, Download, Loader2 } from 'lucide-react';
import { AppContainer } from '@/ui/components/AppContainer';
import { noticiasService } from '@/domain/services';
import type { Noticia } from '@/domain/models/types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale/es';
import { EmptyState } from '@/ui/components/EmptyState';

const PublicNoticiaDetalle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [noticia, setNoticia] = useState<Noticia | null>(null);
  const [relatedNoticias, setRelatedNoticias] = useState<Noticia[]>([]);

  useEffect(() => {
    if (id) {
      loadNoticia();
    }
  }, [id]);

  const loadNoticia = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await noticiasService.get(id);
      if (data) {
        setNoticia(data);
        // Incrementar vistas
        await noticiasService.incrementarVistas(id);
        // Cargar noticias relacionadas
        const related = await noticiasService.getByCategoria(data.categoria);
        setRelatedNoticias(related.filter((n) => n.id !== id).slice(0, 3));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
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

  if (!noticia) {
    return (
      <div className="min-h-screen bg-canvas py-12">
        <AppContainer>
          <EmptyState
            title="Noticia no encontrada"
            description="La noticia que buscas no existe o ha sido eliminada"
            action={{
              label: 'Volver a noticias',
              onClick: () => navigate('/public/noticias'),
            }}
          />
        </AppContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas py-12">
      <AppContainer>
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" onClick={() => navigate('/public/noticias')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a noticias
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-4">
                <Badge>{noticia.categoria}</Badge>
                <div className="flex items-center text-sm text-ink-600">
                  <Eye className="h-4 w-4 mr-1" />
                  {noticia.vistas} visualizaciones
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-ink-900 mb-4">{noticia.titulo}</h1>

              <div className="flex items-center gap-4 text-ink-600 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(noticia.publishedAt), "dd 'de' MMMM 'de' yyyy", { locale: es })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: noticia.titulo,
                        text: noticia.cuerpoHtml.replace(/<[^>]*>/g, '').substring(0, 100),
                        url: window.location.href,
                      });
                    }
                  }}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir
                </Button>
              </div>
            </div>

            {/* Featured Image */}
            {noticia.portadaUrl && (
              <div className="mb-8">
                <img
                  src={noticia.portadaUrl}
                  alt={noticia.titulo}
                  className="w-full h-[400px] object-cover rounded-2xl"
                />
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: noticia.cuerpoHtml }}
            />

            {/* Tags */}
            {noticia.etiquetas && noticia.etiquetas.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-ink-900 mb-3">Etiquetas</h3>
                <div className="flex flex-wrap gap-2">
                  {noticia.etiquetas.map((tag, index) => (
                    <Badge key={index} variant="default">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related News */}
            {relatedNoticias.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-ink-900 mb-4">Noticias relacionadas</h3>
                  <div className="space-y-4">
                    {relatedNoticias.map((news) => (
                      <Link
                        key={news.id}
                        to={`/public/noticias/${news.id}`}
                        className="block group"
                      >
                        <div className="flex gap-3">
                          {news.portadaUrl && (
                            <img
                              src={news.portadaUrl}
                              alt={news.titulo}
                              className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                            />
                          )}
                          <div>
                            <h4 className="font-medium line-clamp-2 group-hover:text-primary-600 transition-colors text-ink-900">
                              {news.titulo}
                            </h4>
                            <p className="text-sm text-ink-500 mt-1">
                              {format(new Date(news.publishedAt), 'dd MMM yyyy', { locale: es })}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/public/noticias')}>
                    Ver todas las noticias
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </AppContainer>
    </div>
  );
};

export default PublicNoticiaDetalle;
