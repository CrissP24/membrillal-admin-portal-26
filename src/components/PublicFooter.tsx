import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, ExternalLink } from "lucide-react";

const PublicFooter = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/src/assets/gad-logo.png" 
                alt="GAD Membrillal" 
                className="h-12 w-12 bg-white rounded p-1"
              />
              <div>
                <h3 className="font-bold text-lg">GAD Membrillal</h3>
                <p className="text-sm opacity-80">Gobierno Autónomo Descentralizado</p>
              </div>
            </div>
            <p className="text-sm opacity-80">
              Trabajando por el desarrollo sostenible y el bienestar de nuestra comunidad parroquial.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/public/parroquia" className="opacity-80 hover:opacity-100 transition-opacity">Nuestra Parroquia</Link></li>
              <li><Link to="/public/organizacion" className="opacity-80 hover:opacity-100 transition-opacity">Organización</Link></li>
              <li><Link to="/public/tramites" className="opacity-80 hover:opacity-100 transition-opacity">Servicios en Línea</Link></li>
              <li><Link to="/public/noticias" className="opacity-80 hover:opacity-100 transition-opacity">Noticias</Link></li>
              <li><Link to="/public/eventos" className="opacity-80 hover:opacity-100 transition-opacity">Eventos</Link></li>
            </ul>
          </div>

          {/* Transparency */}
          <div>
            <h4 className="font-semibold mb-4">Transparencia</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/public/rendicion" className="opacity-80 hover:opacity-100 transition-opacity">Rendición de Cuentas</Link></li>
              <li><Link to="/public/presupuesto" className="opacity-80 hover:opacity-100 transition-opacity">Presupuesto</Link></li>
              <li><Link to="/public/licitaciones" className="opacity-80 hover:opacity-100 transition-opacity">Licitaciones</Link></li>
              <li><Link to="/public/marco-legal" className="opacity-80 hover:opacity-100 transition-opacity">Marco Legal</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-80">Calle Principal s/n, Membrillal, Ecuador</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="opacity-80">+593 (7) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="opacity-80">info@gadmembrillal.gob.ec</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="font-medium mb-3">Síguenos</h5>
              <div className="flex space-x-3">
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Facebook className="h-4 w-4" />
                </a>
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
          <p>&copy; 2024 GAD Parroquial Rural de Membrillal. Todos los derechos reservados.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <Link to="/public/politica-privacidad" className="hover:opacity-100 transition-opacity">
              Política de Privacidad
            </Link>
            <Link to="/public/terminos" className="hover:opacity-100 transition-opacity">
              Términos de Uso
            </Link>
            <a 
              href="https://www.ecuador.gob.ec" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:opacity-100 transition-opacity"
            >
              Portal Ecuador
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;