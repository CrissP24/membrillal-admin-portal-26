import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-primary/20">404</h1>
          <h2 className="text-3xl font-bold">Página no encontrada</h2>
          <p className="text-muted-foreground">
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Ir al inicio
            </Link>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver atrás
          </Button>
        </div>

        <div className="pt-8 text-sm text-muted-foreground">
          <p>Si crees que esto es un error, por favor contacta con nosotros:</p>
          <p className="mt-2">
            <strong>Email:</strong> info@gadmembrillal.gob.ec<br />
            <strong>Teléfono:</strong> +593 (7) 123-4567
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
