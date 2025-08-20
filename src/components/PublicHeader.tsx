import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, FileText, Building2, Users, Calendar, MapPin, Phone, User } from "lucide-react";
import { cn } from "@/lib/utils";

const PublicHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      title: "Inicio",
      href: "/",
    },
    {
      title: "Institucional",
      items: [
        { title: "Parroquia", href: "/public/parroquia", description: "Historia, geografía y características generales" },
        { title: "Organización", href: "/public/organizacion", description: "Estructura organizacional y autoridades" },
        { title: "Marco Legal", href: "/public/marco-legal", description: "Normativa y reglamentos vigentes" },
      ]
    },
    {
      title: "Transparencia",
      items: [
        { title: "Rendición de Cuentas", href: "/public/rendicion", description: "Informes y documentos de gestión" },
        { title: "Presupuesto", href: "/public/presupuesto", description: "Información presupuestaria y ejecución" },
        { title: "Licitaciones", href: "/public/licitaciones", description: "Procesos de contratación pública" },
      ]
    },
    {
      title: "Servicios",
      href: "/public/tramites",
      icon: FileText
    },
    {
      title: "Noticias",
      href: "/public/noticias",
    },
    {
      title: "Eventos",
      href: "/public/eventos",
      icon: Calendar
    },
    {
      title: "Turismo",
      href: "/public/turismo",
      icon: MapPin
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/src/assets/gad-logo.png" 
              alt="GAD Membrillal" 
              className="h-10 w-10"
            />
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-primary">GAD Membrillal</h1>
              <p className="text-xs text-muted-foreground">Gobierno Autónomo Descentralizado</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {menuItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  {item.items ? (
                    <>
                      <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                          {item.items.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <NavigationMenuLink asChild>
                                <Link
                                  to={subItem.href}
                                  className={cn(
                                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                  )}
                                >
                                  <div className="text-sm font-medium leading-none">{subItem.title}</div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {subItem.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        to={item.href!}
                        className={cn(
                          "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                        )}
                      >
                        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                        {item.title}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Contact & Login */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>+593 (7) 123-4567</span>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">
                <User className="mr-2 h-4 w-4" />
                Acceso Administrativo
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {menuItems.map((item, index) => (
                    <div key={index}>
                      {item.items ? (
                        <div>
                          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">
                            {item.title}
                          </h3>
                          <div className="space-y-2 pl-4">
                            {item.items.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                to={subItem.href}
                                className="block py-2 text-sm hover:text-primary transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <Link
                          to={item.href!}
                          className="flex items-center py-2 text-sm font-medium hover:text-primary transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                          {item.title}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;