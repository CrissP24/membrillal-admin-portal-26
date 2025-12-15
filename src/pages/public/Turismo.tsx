import React from 'react';
import { AppContainer } from '@/ui/components/AppContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from '@/ui/components/Badge';
import { MapPin, Star, ArrowRight } from 'lucide-react';

interface Place {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  rating: number;
}

interface Route {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: 'Fácil' | 'Moderado' | 'Difícil';
  imageUrl: string;
}

const mockTouristRoutes: Route[] = [
  {
    id: 'R1',
    name: 'Ruta de las Cascadas',
    description: 'Un recorrido por las caídas de agua más impresionantes de la región, ideal para amantes de la naturaleza.',
    duration: '4 horas',
    difficulty: 'Moderado',
    imageUrl: 'https://via.placeholder.com/400x300?text=Ruta+Cascadas',
  },
  {
    id: 'R2',
    name: 'Ruta Histórica del Centro',
    description: 'Explora la arquitectura colonial y los sitios históricos del corazón de Membrillal.',
    duration: '2 horas',
    difficulty: 'Fácil',
    imageUrl: 'https://via.placeholder.com/400x300?text=Ruta+Historica',
  },
  {
    id: 'R3',
    name: 'Ruta de Aventura en la Montaña',
    description: 'Un desafío para los aventureros, con vistas espectaculares y terrenos variados.',
    duration: '6 horas',
    difficulty: 'Difícil',
    imageUrl: 'https://via.placeholder.com/400x300?text=Ruta+Montana',
  },
];

const mockTouristPlaces: Place[] = [
  {
    id: '1',
    name: 'Cascada La Delicia',
    description: 'Una hermosa cascada rodeada de naturaleza exuberante, ideal para el ecoturismo y la fotografía.',
    imageUrl: 'https://via.placeholder.com/400x300?text=Cascada+La+Delicia',
    category: 'Naturaleza',
    rating: 4.8,
  },
  {
    id: '2',
    name: 'Mirador El Paraíso',
    description: 'Ofrece vistas panorámicas espectaculares del valle y las montañas circundantes, perfecto para atardeceres.',
    imageUrl: 'https://via.placeholder.com/400x300?text=Mirador+El+Paraiso',
    category: 'Vistas',
    rating: 4.7,
  },
  {
    id: '3',
    name: 'Iglesia Antigua de Membrillal',
    description: 'Un sitio histórico con arquitectura colonial, un remanso de paz y cultura.',
    imageUrl: 'https://via.placeholder.com/400x300?text=Iglesia+Antigua',
    category: 'Cultura',
    rating: 4.5,
  },
  {
    id: '4',
    name: 'Sendero Ecológico Río Claro',
    description: 'Un sendero ideal para caminatas y observación de aves, con flora y fauna nativa.',
    imageUrl: 'https://via.placeholder.com/400x300?text=Sendero+Rio+Claro',
    category: 'Aventura',
    rating: 4.6,
  },
];

const Turismo: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas py-12">
      <AppContainer>
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-ink-900 mb-6">Turismo y Cultura en Membrillal</h1>
          <p className="text-lg text-ink-700 mb-10">
            Descubre la riqueza natural y cultural de nuestra parroquia. ¡Un lugar lleno de encanto y tradición!
          </p>

          {/* Destacados Turísticos */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-ink-800 mb-6">Lugares Destacados</h2>
            <Carousel className="w-full">
              <CarouselContent>
                {mockTouristPlaces.map((place) => (
                  <CarouselItem key={place.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                      <img src={place.imageUrl} alt={place.name} className="w-full h-48 object-cover" />
                      <CardContent className="p-4 flex flex-col flex-grow">
                        <CardTitle className="text-xl font-bold mb-2">{place.name}</CardTitle>
                        <p className="text-ink-700 text-sm mb-3 flex-grow">{place.description}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <Badge variant="secondary" className="text-sm"><MapPin className="h-3 w-3 mr-1" />{place.category}</Badge>
                          <span className="flex items-center text-primary-600 text-sm font-medium">
                            <Star className="h-4 w-4 fill-current text-yellow-500 mr-1" /> {place.rating}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>

          {/* Rutas Turísticas */}
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-ink-800 mb-6">Rutas Turísticas</h2>
            <Carousel className="w-full">
              <CarouselContent>
                {mockTouristRoutes.map((route) => (
                  <CarouselItem key={route.id} className="md:basis-1/2 lg:basis-1/3">
                    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                      <img src={route.imageUrl} alt={route.name} className="w-full h-48 object-cover" />
                      <CardContent className="p-4 flex flex-col flex-grow">
                        <CardTitle className="text-xl font-bold mb-2">{route.name}</CardTitle>
                        <p className="text-ink-700 text-sm mb-3 flex-grow">{route.description}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <Badge variant="secondary" className="text-sm"><MapPin className="h-3 w-3 mr-1" />{route.duration}</Badge>
                          <Badge variant="outline" className="text-sm"><Star className="h-3 w-3 mr-1" />{route.difficulty}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </section>

          {/* Sección Plus: Eventos Culturales */}
          <section className="bg-primary-50 rounded-lg p-8 shadow-md">
            <h2 className="text-3xl font-semibold text-primary-800 mb-4">¡No te Pierdas Nuestros Eventos Culturales!</h2>
            <p className="text-lg text-primary-700 mb-6">
              Membrillal es un vibrante centro de tradiciones y celebraciones. Consulta nuestro calendario de eventos para participar en festivales, ferias artesanales y mucho más.
            </p>
            <a href="/public/eventos" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              Ver Calendario de Eventos
              <ArrowRight className="ml-3 h-5 w-5" />
            </a>
          </section>
        </div>
      </AppContainer>
    </div>
  );
};

export default Turismo;


