# 🏛️ Membrillal Admin Portal - Documentación Completa

> **Una plataforma moderna de administración y gestión para la Parroquia de Membrillal**

---

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Guía de Instalación](#guía-de-instalación)
5. [Ejecución del Proyecto](#ejecución-del-proyecto)
6. [Arquitectura](#arquitectura)
7. [Funcionalidades Principales](#funcionalidades-principales)
8. [Autenticación](#autenticación)
9. [Entidades Principales](#entidades-principales)
10. [Componentes UI](#componentes-ui)
11. [Enrutamiento](#enrutamiento)
12. [Almacenamiento](#almacenamiento)
13. [Estándares de Código](#estándares-de-código)
14. [Deployment](#deployment)
15. [Troubleshooting](#troubleshooting)

---

## 🎯 Descripción General

**Membrillal Admin Portal** es una plataforma integral diseñada para la administración digital de una parroquia rural. Proporciona una experiencia completa tanto para administradores como para ciudadanos.

### Características Clave

✨ **Para Administradores:**
- Panel de control intuitivo
- Gestión de noticias, eventos y documentos
- Control de usuarios y permisos
- Seguimiento de trámites
- Reportes y análisis
- Configuración del sistema

✨ **Para Ciudadanos:**
- Portal público accesible
- Visualización de noticias y eventos
- Solicitud de trámites
- Seguimiento de solicitudes
- Información de la parroquia
- Documentos de transparencia

---

## 🛠️ Stack Tecnológico

### Frontend Principal

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| **React** | 18+ | Framework frontend |
| **TypeScript** | 5+ | Tipado estático |
| **Vite** | 5+ | Bundler ultrarrápido |
| **React Router** | 6+ | Enrutamiento SPA |
| **TanStack Query** | 5+ | Gestión de caché y sincronización |

### UI & Estilos

| Tecnología | Propósito |
|-----------|----------|
| **Tailwind CSS** | Framework CSS utilitario |
| **shadcn/ui** | Componentes preconstruidos |
| **Radix UI** | Primitivos accesibles |
| **Lucide React** | Iconos |

### Utilidades

| Tecnología | Propósito |
|-----------|----------|
| **React Hook Form** | Gestión de formularios |
| **Zod/Resolver** | Validación de esquemas |
| **date-fns** | Manipulación de fechas |
| **clsx** | Utilidad de CSS condicional |

---

## 📁 Estructura del Proyecto

### Organización en Capas

```
src/
├── presentation/        # Componentes de UI
├── application/        # Lógica de aplicación
├── domain/             # Modelos y servicios
├── data/               # Acceso a datos
└── infrastructure/     # Configuración
```

### Árbol Completo

```
membrillal-admin-portal-26/
│
├── 📂 src/
│   ├── 📄 main.tsx                    # Punto de entrada
│   ├── 📄 App.tsx                     # Router principal
│   ├── 📄 index.css                   # Estilos globales
│   │
│   ├── 📂 app/
│   │   └── providers/
│   │       └── DataProvider.tsx       # Configuración de contextos
│   │
│   ├── 📂 components/
│   │   ├── DashboardHeader.tsx        # Encabezado panel admin
│   │   ├── DashboardLayout.tsx        # Layout administrativo
│   │   ├── DashboardSidebar.tsx       # Menú lateral
│   │   ├── ProtectedRoute.tsx         # HOC para rutas autenticadas
│   │   ├── PublicHeader.tsx           # Encabezado portal público
│   │   ├── PublicLayout.tsx           # Layout público
│   │   ├── PublicFooter.tsx           # Pie de página
│   │   └── 📂 ui/                     # Componentes shadcn/ui
│   │       ├── accordion.tsx          # Acordeón
│   │       ├── alert.tsx              # Alertas
│   │       ├── button.tsx             # Botones
│   │       ├── card.tsx               # Tarjetas
│   │       ├── dialog.tsx             # Diálogos modales
│   │       ├── form.tsx               # Formularios
│   │       ├── input.tsx              # Inputs de texto
│   │       ├── select.tsx             # Selectores
│   │       ├── table.tsx              # Tablas
│   │       ├── tabs.tsx               # Pestañas
│   │       ├── toast.tsx              # Notificaciones
│   │       ├── toaster.tsx            # Contenedor de toasts
│   │       ├── skeleton.tsx           # Placeholders
│   │       └── ... (40+ componentes)
│   │
│   ├── 📂 contexts/
│   │   └── AuthContext.tsx            # Contexto global de autenticación
│   │
│   ├── 📂 data/
│   │   ├── mockData.ts                # Datos de ejemplo
│   │   ├── 📂 repos/                  # Capa de repositorios
│   │   │   ├── BaseRepository.ts      # Clase base reutilizable
│   │   │   ├── AutoridadesRepo.ts     # Gestión de autoridades
│   │   │   ├── ComisionesRepo.ts      # Gestión de comisiones
│   │   │   ├── ComunicacionesRepo.ts  # Gestión de comunicaciones
│   │   │   ├── DocumentosRepo.ts      # Gestión de documentos
│   │   │   ├── EventosRepo.ts         # Gestión de eventos
│   │   │   ├── NoticiasRepo.ts        # Gestión de noticias
│   │   │   ├── ParroquiaRepo.ts       # Info de parroquia
│   │   │   ├── TramiteDefRepo.ts      # Definiciones de trámites
│   │   │   ├── TramiteInstRepo.ts     # Instancias de trámites
│   │   │   ├── UsuariosRepo.ts        # Gestión de usuarios
│   │   │   └── index.ts
│   │   └── 📂 store/                  # Capa de almacenamiento
│   │       ├── LocalStorageStore.ts   # Implementación localStorage
│   │       ├── RestStore.ts           # Implementación API REST
│   │       ├── interfaces.ts          # Interfaces de store
│   │       ├── keys.ts                # Claves de almacenamiento
│   │       └── index.ts
│   │
│   ├── 📂 domain/
│   │   ├── 📂 models/
│   │   │   └── types.ts               # Tipos globales (Usuario, Noticia, etc)
│   │   └── 📂 services/
│   │       ├── AuthService.ts         # Lógica de autenticación
│   │       ├── TramitesService.ts     # Lógica de trámites
│   │       ├── NoticiasService.ts     # Lógica de noticias
│   │       ├── EventosService.ts      # Lógica de eventos
│   │       ├── TransparenciaService.ts # Lógica de transparencia
│   │       ├── KPIsService.ts         # Cálculo de métricas
│   │       └── index.ts               # Exportaciones
│   │
│   ├── 📂 hooks/
│   │   ├── use-mobile.tsx             # Hook para dispositivo móvil
│   │   └── use-toast.ts               # Hook para notificaciones
│   │
│   ├── 📂 lib/
│   │   └── utils.ts                   # Funciones utilitarias
│   │
│   ├── 📂 pages/
│   │   ├── Index.tsx                  # Landing page
│   │   ├── Login.tsx                  # Página de login
│   │   ├── Dashboard.tsx              # Dashboard principal
│   │   ├── Tramites.tsx               # Gestión de trámites
│   │   ├── Noticias.tsx               # Gestión de noticias
│   │   ├── NotFound.tsx               # Página 404
│   │   ├── 📂 admin/                  # Sección administrativa
│   │   │   ├── BandejaSolicitudes.tsx
│   │   │   ├── ComisionesAdmin.tsx
│   │   │   ├── ComunicadosAdmin.tsx
│   │   │   ├── ConfiguracionAdmin.tsx
│   │   │   ├── DocumentosAdmin.tsx
│   │   │   ├── EventosAdmin.tsx
│   │   │   ├── MarcoLegalAdmin.tsx
│   │   │   ├── OrganizacionAdmin.tsx
│   │   │   ├── ParroquiaAdmin.tsx
│   │   │   ├── ReportesAdmin.tsx
│   │   │   ├── TransparenciaAdmin.tsx
│   │   │   └── TurismoAdmin.tsx
│   │   └── 📂 public/                 # Sección pública
│   │       ├── Inicio.tsx
│   │       ├── PublicNoticias.tsx
│   │       ├── PublicNoticiaDetalle.tsx
│   │       ├── PublicTramites.tsx
│   │       ├── SolicitarTramite.tsx
│   │       ├── Seguimiento.tsx
│   │       ├── Parroquia.tsx
│   │       ├── Organizacion.tsx
│   │       ├── Eventos.tsx
│   │       ├── EventoDetalle.tsx
│   │       ├── Transparencia.tsx
│   │       └── Turismo.tsx
│   │
│   ├── 📂 seed/
│   │   └── seed.ts                    # Script de datos iniciales
│   │
│   └── 📂 ui/
│       └── components/                # Componentes de dominio
│
├── 📄 package.json                    # Dependencias y scripts
├── 📄 tsconfig.json                   # Configuración TypeScript
├── 📄 tsconfig.app.json               # Config TS para app
├── 📄 tsconfig.node.json              # Config TS para Node
├── 📄 vite.config.ts                  # Configuración Vite
├── 📄 tailwind.config.ts              # Configuración Tailwind
├── 📄 postcss.config.js               # Configuración PostCSS
├── 📄 eslint.config.js                # Configuración ESLint
├── 📄 components.json                 # Configuración shadcn/ui
├── 📄 index.html                      # Template HTML
├── 📄 bun.lockb                       # Lock file Bun
└── 📄 README.md                       # Documentación
```

---

## 🚀 Guía de Instalación

### Paso 1: Requisitos Previos

**Opción A: Usar Node.js (Recomendado)**
- Descargar de https://nodejs.org/ (versión 16+)
- Verificar instalación: `node --version`

**Opción B: Usar Bun (Más rápido)**
- Descargar de https://bun.sh
- Verificar instalación: `bun --version`

### Paso 2: Clonar el Repositorio

```bash
# Con Git
git clone https://github.com/CrissP24/membrillal-admin-portal-26.git
cd membrillal-admin-portal-26

# O descargar ZIP desde GitHub
```

### Paso 3: Instalar Dependencias

**Con Bun (Recomendado - muy rápido):**
```bash
bun install
```

**Con npm (Clásico):**
```bash
npm install
```

**Con yarn:**
```bash
yarn install
```

**Con pnpm:**
```bash
pnpm install
```

### Paso 4: Configuración del Ambiente (Opcional)

Crear archivo `.env.local` en la raíz:

```env
# Configuración de API
VITE_API_BASE_URL=http://localhost:3000

# Información de la app
VITE_APP_NAME=Membrillal Admin Portal
VITE_APP_VERSION=1.0.0
```

---

## 🏃 Ejecución del Proyecto

### Modo Desarrollo

```bash
# Con Bun
bun run dev

# Con npm
npm run dev

# Con yarn
yarn dev

# Con pnpm
pnpm dev
```

**Resultado:** La aplicación estará en `http://localhost:8080`

### Compilación para Producción

```bash
# Con Bun
bun run build

# Con npm
npm run build

# Con yarn
yarn build

# Con pnpm
pnpm build
```

**Resultado:** Los archivos compilados estarán en carpeta `dist/`

### Compilación en Modo Desarrollo

```bash
# Con Bun
bun run build:dev

# Con npm
npm run build:dev
```

### Vista Previa del Build

```bash
# Con Bun
bun run preview

# Con npm
npm run preview

# Con yarn
yarn preview

# Con pnpm
pnpm preview
```

### Linting del Código

```bash
# Con Bun
bun run lint

# Con npm
npm run lint

# Con yarn
yarn lint

# Con pnpm
pnpm lint
```

---

## 🏗️ Arquitectura

### Modelo de Capas

```
┌─────────────────────────────────────────────┐
│                                             │
│    🎨 PRESENTATION LAYER                   │
│    React Components, Pages, UI              │
│                                             │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│                                             │
│    🧠 APPLICATION LAYER                    │
│    Context, Hooks, State Management        │
│                                             │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│                                             │
│    💼 DOMAIN LAYER                         │
│    Business Logic, Services                │
│                                             │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│                                             │
│    📊 DATA LAYER                           │
│    Repositories, Stores                    │
│                                             │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│                                             │
│    💾 STORAGE LAYER                        │
│    LocalStorage, REST API                  │
│                                             │
└─────────────────────────────────────────────┘
```

### Patrones de Diseño

#### 1. Repository Pattern

Abstrae el acceso a datos:

```typescript
// data/repos/NoticiasRepo.ts
class NoticiasRepository {
  static async getAll(): Promise<Noticia[]> {
    return store.get('noticias') || [];
  }

  static async getById(id: string): Promise<Noticia | null> {
    const noticias = await this.getAll();
    return noticias.find(n => n.id === id) || null;
  }

  static async create(noticia: Noticia): Promise<Noticia> {
    const noticias = await this.getAll();
    const newNoticia = { ...noticia, id: generateId() };
    noticias.push(newNoticia);
    await store.save('noticias', noticias);
    return newNoticia;
  }
}
```

#### 2. Service Layer

Contiene la lógica de negocio:

```typescript
// domain/services/NoticiasService.ts
class NoticiasService {
  static async getNoticias() {
    return NoticiasRepository.getAll();
  }

  static async getDestacadas() {
    const noticias = await this.getNoticias();
    return noticias.slice(0, 5);
  }

  static async createNoticia(data: CreateNoticiaDto) {
    // Validaciones
    if (!data.titulo || data.titulo.length < 5) {
      throw new Error('Título inválido');
    }
    
    return NoticiasRepository.create(data);
  }
}
```

#### 3. Context API

Estado global compartido:

```typescript
// contexts/AuthContext.tsx
interface AuthContextType {
  user: Usuario | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(null);

  const value: AuthContextType = { user, isAuthenticated: !!user, ... };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### 4. Custom Hooks

Reutilización de lógica:

```typescript
// hooks/useNoticias.ts
export function useNoticias() {
  return useQuery({
    queryKey: ['noticias'],
    queryFn: () => NoticiasService.getNoticias()
  });
}

// Uso en componentes
function NoticiasList() {
  const { data, isLoading } = useNoticias();
  // ...
}
```

---

## ✨ Funcionalidades Principales

### 🔐 Sistema de Autenticación

**Características:**
- Login con email y contraseña
- Persistencia de sesión en localStorage
- Rutas protegidas
- Redirección automática a login
- Roles de usuario (admin, moderador, usuario)
- Logout

**Flujo de Autenticación:**
```
1. Usuario accede a /login
2. Ingresa credenciales
3. Se validan credenciales
4. Se guarda sesión en localStorage
5. Se redirige a /admin/dashboard
6. Cada ruta protegida verifica sesión
```

### 📰 Gestión de Noticias

**Funcionalidades CRUD:**
- ✅ Crear nuevas noticias
- ✅ Editar noticias existentes
- ✅ Eliminar noticias
- ✅ Listar noticias

**Características:**
- Categorización
- Editor HTML para contenido
- Imágenes de portada
- Sistema de vistas
- Etiquetas
- Fecha de publicación

### 📅 Gestión de Eventos

**CRUD Completo:**
- Crear eventos
- Editar detalles
- Eliminar eventos
- Listar y filtrar

**Información de Eventos:**
- Título y descripción
- Fecha y hora
- Ubicación
- Imágenes
- Capacidad

### 📄 Gestión de Documentos

**Categorías:**
- Rendición de cuentas
- Presupuestos
- Licitaciones
- Marco legal

**Funcionalidades:**
- Almacenamiento por año
- Búsqueda y filtrado
- Descarga de archivos
- Resúmenes y etiquetas

### 📋 Sistema de Trámites

**Flujo de Trámites:**
1. Ciudadano visualiza trámites disponibles
2. Ciudadano selecciona y completa solicitud
3. Ciudadano recibe número de seguimiento
4. Admin recibe solicitud en bandeja
5. Admin procesa solicitud
6. Ciudadano puede ver estado en tiempo real

**Estados de Trámite:**
- Pendiente (recibido)
- Procesando (en revisión)
- Completado (entregado)
- Rechazado (rechazado)

### 👥 Gestión de Autoridades

- Información de autoridades principales
- Cargo y período de ejercicio
- Fotografías de perfil
- Descripciones y trayectoria

### 🏘️ Información de Parroquia

- Historia de la parroquia
- Estructura organizacional
- Marco legal y regulaciones
- Documentos de transparencia
- Información turística

---

## 🔒 Autenticación Detallada

### Cómo Usar

```tsx
// En componentes
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <p>No estás autenticado</p>;
  }

  return <p>Hola {user.nombre}</p>;
}
```

### Rutas Protegidas

```tsx
// En App.tsx
<Route 
  path="/admin/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

### Almacenamiento de Sesión

```typescript
// Se guarda en localStorage
localStorage.setItem('gad_user', JSON.stringify({
  id: 'user_123',
  email: 'user@example.com',
  nombre: 'Juan Pérez',
  rol: 'admin'
}));
```

---

## 📊 Entidades Principales

### Usuario

```typescript
interface Usuario {
  id: string;
  email: string;
  nombre: string;
  apellido?: string;
  rol: 'admin' | 'moderador' | 'usuario';
  activo: boolean;
  fechaRegistro?: string;
  telefono?: string;
  direccion?: string;
}
```

### Noticia

```typescript
interface Noticia {
  id: string;
  titulo: string;
  descripcion?: string;
  categoria: string;
  cuerpoHtml: string;
  portadaUrl?: string;
  vistas: number;
  etiquetas?: string[];
  autor?: string;
  publishedAt: string;
  updatedAt?: string;
}
```

### Evento

```typescript
interface Evento {
  id: string;
  titulo: string;
  descripcion: string;
  fecha: string;
  horaInicio: string;
  horaFin?: string;
  lugar: string;
  imagenUrl?: string;
  capacidad?: number;
  asistentes?: number;
  createdAt: string;
}
```

### Documento

```typescript
interface Documento {
  id: string;
  titulo: string;
  categoria: 'Rendicion' | 'Presupuesto' | 'Licitacion' | 'MarcoLegal';
  anio: number;
  url: string;
  resumen?: string;
  etiquetas?: string[];
  publishedAt: string;
  tamaño?: number;
}
```

### Trámite (Definición)

```typescript
interface TramiteDefinicion {
  id: string;
  nombre: string;
  descripcion: string;
  requisitos: string[];
  pasos: string[];
  tiempoEstimado?: string;
  costo?: number;
  activo: boolean;
}
```

### Instancia de Trámite

```typescript
interface TramiteInstancia {
  id: string;
  numeroSolicitud: string;
  tramiteId: string;
  usuarioId: string;
  estado: 'pendiente' | 'procesando' | 'completado' | 'rechazado';
  fecha: string;
  fechaCompletado?: string;
  notas?: string;
  documentos?: string[];
}
```

### Autoridad

```typescript
interface Autoridad {
  id: string;
  nombre: string;
  cargo: string;
  fotoUrl?: string;
  periodo: string;
  descripcion?: string;
  email?: string;
  telefono?: string;
}
```

### Comisión

```typescript
interface Comision {
  id: string;
  nombre: string;
  descripcion?: string;
  integrantes: string[];
  objetivo?: string;
  fechaCreacion?: string;
}
```

---

## 🎨 Componentes UI (shadcn/ui)

La librería **shadcn/ui** proporciona más de 40 componentes:

### Componentes Básicos
- `Button` - Botones
- `Input` - Campos de texto
- `Label` - Etiquetas
- `Card` - Tarjetas

### Componentes de Formulario
- `Form` - Wrapper de formularios
- `Select` - Selectores
- `Checkbox` - Checkboxes
- `RadioGroup` - Radio buttons
- `Textarea` - Áreas de texto
- `Toggle` - Botones toggle

### Componentes de Diálogo
- `Dialog` - Diálogos modales
- `AlertDialog` - Diálogos de alerta
- `Drawer` - Menús laterales
- `Popover` - Popovers

### Componentes de Presentación
- `Table` - Tablas
- `Tabs` - Pestañas
- `Accordion` - Acordeones
- `Carousel` - Carruseles
- `Skeleton` - Placeholders

### Componentes de Notificación
- `Toast` - Notificaciones
- `Alert` - Alertas
- `ProgressBar` - Barras de progreso

### Componentes Avanzados
- `Command` - Paleta de comandos
- `ContextMenu` - Menús contextuales
- `NavigationMenu` - Menús de navegación
- `Pagination` - Paginación
- `Tooltip` - Tooltips

---

## 🌐 Enrutamiento

### Estructura de Rutas

```
/                                    → Landing page
├── /login                           → Página de login
├── /                                → Layout público
│   ├── /public/inicio               → Inicio público
│   ├── /public/noticias             → Listado de noticias
│   ├── /public/noticias/:id         → Detalle de noticia
│   ├── /public/tramites             → Catálogo de trámites
│   ├── /public/tramites/solicitar   → Formulario solicitud
│   ├── /public/tramites/seguimiento → Seguimiento
│   ├── /public/eventos              → Listado de eventos
│   ├── /public/eventos/:id          → Detalle evento
│   ├── /public/parroquia            → Info parroquia
│   ├── /public/organizacion         → Estructura org
│   ├── /public/transparencia        → Documentos
│   └── /public/turismo              → Info turística
└── /admin/                          → Layout administrativo (Protected)
    ├── /admin/dashboard             → Panel principal
    ├── /admin/bandeja-solicitudes   → Solicitudes
    ├── /admin/noticias              → Gestión noticias
    ├── /admin/eventos               → Gestión eventos
    ├── /admin/documentos            → Gestión documentos
    ├── /admin/autoridades           → Gestión autoridades
    ├── /admin/comisiones            → Gestión comisiones
    ├── /admin/transparencia         → Gestión transparencia
    ├── /admin/reportes              → Reportes y análisis
    └── /admin/configuracion         → Configuración sistema

/404 o /not-found                   → Página no encontrada
```

### Protección de Rutas

```tsx
// El componente ProtectedRoute verifica autenticación
<Route 
  path="/admin/*" 
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* más rutas */}
        </Routes>
      </DashboardLayout>
    </ProtectedRoute>
  } 
/>
```

---

## 💾 Almacenamiento

### LocalStorage (Defecto)

```typescript
// Guardar datos
localStorage.setItem('gad_noticias', JSON.stringify(noticias));

// Recuperar datos
const noticias = JSON.parse(localStorage.getItem('gad_noticias'));

// Eliminar datos
localStorage.removeItem('gad_noticias');

// Limpiar todo
localStorage.clear();
```

### Claves Utilizadas

```typescript
// Autenticación
localStorage.gad_user              // Sesión actual

// Datos
localStorage.gad_noticias          // Noticias
localStorage.gad_eventos           // Eventos
localStorage.gad_documentos        // Documentos
localStorage.gad_usuarios          // Usuarios
localStorage.gad_tramites          // Trámites

// Preferencias
localStorage.app_theme             // Tema (light/dark)
localStorage.app_lang              // Idioma
```

### Store Abstracción

```typescript
// Cambiar entre LocalStorage y API REST
const store = new LocalStorageStore();  // LocalStorage
const store = new RestStore('api.url'); // API REST

// Interfaz uniforme
await store.get('noticias');
await store.save('noticias', data);
await store.remove('noticias');
```

---

## 📝 Estándares de Código

### Nomenclatura

```typescript
// Componentes: PascalCase
function DashboardHeader() { }
export default DashboardHeader;

// Variables y funciones: camelCase
const getUserData = () => { };
const currentUser = null;

// Constantes: UPPER_SNAKE_CASE
const MAX_ITEMS = 100;
const API_BASE_URL = 'https://api.example.com';

// Tipos e Interfaces: PascalCase
interface Usuario { }
type Status = 'pending' | 'active';

// Archivos: camelCase o PascalCase según contenido
DashboardHeader.tsx        // Componente
useAuth.ts                 // Hook
types.ts                   // Tipos
utils.ts                   // Utilidades
```

### Organización de Imports

```typescript
// 1. React y librerías externas
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 2. Componentes de la app
import Button from '@/components/ui/button';
import Card from '@/components/ui/card';

// 3. Hooks personalizados
import { useAuth } from '@/contexts/AuthContext';
import { useMobile } from '@/hooks/use-mobile';

// 4. Servicios y utilidades
import { NoticiasService } from '@/domain/services';
import { cn } from '@/lib/utils';

// 5. Tipos
import type { Noticia } from '@/domain/models/types';

// 6. Estilos
import './DashboardHeader.css';
```

### Estructura de Componentes

```typescript
// 1. Imports
import React, { useEffect } from 'react';
import Button from '@/components/ui/button';

// 2. Tipos locales
interface DashboardProps {
  title: string;
}

// 3. Componente
const Dashboard: React.FC<DashboardProps> = ({ title }) => {
  // State
  const [count, setCount] = React.useState(0);

  // Hooks
  const { user } = useAuth();
  const navigate = useNavigate();

  // Effects
  useEffect(() => {
    // Efectos
  }, []);

  // Handlers
  const handleClick = () => {
    // Lógica
  };

  // Render
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick}>Click</Button>
    </div>
  );
};

// 4. Export
export default Dashboard;
```

---

## 🌍 Deployment

### Compilación para Producción

```bash
# Build
npm run build

# El resultado estará en: dist/
```

### Opciones de Hosting

#### 1. Vercel (Recomendado)

```bash
# Instalar CLI
npm i -g vercel

# Desplegar
vercel deploy
```

#### 2. Netlify

```bash
# Instalar CLI
npm i -g netlify-cli

# Desplegar
netlify deploy --prod --dir=dist
```

#### 3. GitHub Pages

```bash
# Actualizar vite.config.ts
export default defineConfig({
  base: '/membrillal-admin-portal-26/'
});

# Build y desplegar
npm run build
# Pushear carpeta dist/ a rama gh-pages
```

#### 4. Servidor Propio

```bash
# Copiar contenido de dist/ a servidor web
# Apache, Nginx, etc.

# Asegurar redireccionamiento a index.html para SPA
```

### Configuración Recomendada

- **CORS**: Configurar según dominio del backend
- **HTTPS**: Obligatorio en producción
- **Caching**: Configurar headers de caché
- **Compression**: Habilitar gzip
- **CDN**: Usar CDN para archivos estáticos

---

## 🐛 Troubleshooting

### Puerto 8080 en Uso

```bash
# Opción 1: Cambiar puerto
npm run dev -- --port 3000

# Opción 2: Liberar puerto (Windows)
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Opción 3: Liberar puerto (Mac/Linux)
lsof -i :8080
kill -9 <PID>
```

### Errores de TypeScript

```bash
# Verificar tipos
npx tsc --noEmit

# O en el proyecto
bun check
```

### Problemas de Dependencias

```bash
# Limpiar cache e reinstalar
rm -rf node_modules bun.lockb package-lock.json
npm cache clean --force
npm install

# O con Bun
bun install --force
```

### Errores de Módulos

```bash
# Asegurar resolución de paths
# Verificar tsconfig.json y vite.config.ts

# Limpiar cache de Vite
rm -rf node_modules/.vite

# Reiniciar servidor dev
npm run dev
```

### CORS en Desarrollo

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
});
```

### Hot Module Replacement (HMR)

```typescript
// vite.config.ts
export default defineConfig({
  server: {
    hmr: {
      host: 'localhost',
      port: 8080
    }
  }
});
```

---

## 📚 Recursos Útiles

### Documentación Oficial
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Router Docs](https://reactrouter.com/en/main)
- [TanStack Query](https://tanstack.com/query/latest)

### UI & Styling
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Radix UI Documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [Lucide Icons](https://lucide.dev/)

### Herramientas
- [Bun Documentation](https://bun.sh/docs)
- [ESLint Configuration](https://eslint.org/docs/latest/user-guide/configuring/)
- [PostCSS Documentation](https://postcss.org/)

---

## 🗺️ Roadmap

### ✅ v1.0 (Actual)
- Autenticación básica
- CRUD de contenidos (noticias, eventos, documentos)
- Portal público funcional
- Panel administrativo
- Gestión de trámites básica

### 🔄 v1.1 (Próxima)
- [ ] Integración con API real
- [ ] Notificaciones por email
- [ ] Búsqueda avanzada
- [ ] Exportación de reportes (PDF, Excel)
- [ ] Auditoría de cambios

### 🚀 v2.0 (Futuro)
- [ ] PWA (Progressive Web App)
- [ ] Integración con pasarelas de pago
- [ ] Sistema de permisos granulares
- [ ] Replicación en tiempo real
- [ ] Mobile app nativa (React Native)
- [ ] Internacionalización (i18n)
- [ ] Modo offline

---

## ✨ Resumen del Proyecto

```
MEMBRILLAL ADMIN PORTAL
├── ✅ Portal público accesible
├── ✅ Area administrativa completa
├── ✅ Autenticación segura
├── ✅ Gestión de contenidos (noticias, eventos, etc)
├── ✅ Sistema de trámites
├── ✅ Interfaz moderna y responsive
├── ✅ Componentes reutilizables
├── ✅ Arquitectura escalable
├── ✅ Código limpio y documentado
└── ✅ Performance optimizado
```

---

## 📞 Soporte

Para reportar bugs, solicitar funcionalidades o hacer preguntas:

1. **Crear un Issue** en el repositorio GitHub
2. **Describir el problema** de forma clara
3. **Incluir pasos para reproducir** (si es un bug)
4. **Esperar feedback** del equipo

### Contacto
- 📧 GitHub: [@CrissP24](https://github.com/CrissP24)
- 📍 Repositorio: [membrillal-admin-portal-26](https://github.com/CrissP24/membrillal-admin-portal-26)

---

## 📄 Licencia

© 2025 Parroquia de Membrillal. Todos los derechos reservados.

---

**Última actualización:** Noviembre 2025  
**Versión:** 1.0.0  
**Desarrollado por:** CrissP24
