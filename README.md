# HappyBirthdayPablo 🎈🎂

Una experiencia web interactiva, moderna y elegante desarrollada para celebrar el cumpleaños número 25 de **Pablo**. Creada con React, TypeScript, Vite, Framer Motion y Tailwind CSS.

---

## ✨ Características Principales

* **Apertura de Celebración Interactiva**: Animación de unboxing con apertura de regalo y efectos de partículas festivas.
* **Hero Personalizado**: Composición fotográfica en alta fidelidad de Pablo con su pastel temático de mecatrónica y robótica, marco tecnológico con visor HUD, iluminación ambiental violeta/cian y la tarjeta secundaria de "25 vueltas al sol".
* **Carta Auténtica de Florchis**: Sobre interactivo que revela las palabras auténticas y personalizadas de felicitación y bendición con diseño de papelería digital cuidada.
* **Galería de Recuerdos**: Carrusel dinámico y visor lightbox para explorar fotografías y momentos especiales.
* **Pastel de Cumpleaños Interactivo**: Animación interactiva para apagar velas y pedir un deseo con confeti festivo.
* **Banda Sonora Integrada**: Soporte para reproducción de audio local y reproductor flotante sincronizado.
* **Diseño Totalmente Responsivo**: Optimizado tanto para dispositivos móviles como para pantallas de escritorio, sin desbordamientos y con tipografía fluida.
* **Accesibilidad**: Respeto a las preferencias del sistema para movimiento reducido (`prefers-reduced-motion`) y navegación por teclado.

---

## 🛠️ Tecnologías

* **Frontend**: [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Bundler & Tooling**: [Vite](https://vitejs.dev/)
* **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
* **Estilos**: Vanilla CSS + [Tailwind CSS](https://tailwindcss.com/)
* **Iconografía**: [Lucide React](https://lucide.dev/)

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos
* **Node.js**: Versión 18.0 o superior (recomendado Node.js 20 LTS o 22 LTS).
* **npm**: Versión 9 o superior.

### 1. Clonar el repositorio
```bash
git clone https://github.com/EOHH/HappyBirthdayPablo.git
cd HappyBirthdayPablo
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible localmente en `http://localhost:5173/` (o el puerto indicado en la consola).

### 4. Validar calidad de código y compilación
```bash
# Análisis estático y linter
npm run lint

# Pruebas unitarias
npm test

# Compilación de producción
npm run build
```

---

## 🌐 Despliegue en Vercel

El proyecto está preconfigurado para un despliegue sin fricciones en **Vercel** como aplicación Single Page Application (SPA) basada en Vite.

### Despliegue directo desde GitHub
1. Ingresa a tu panel en [Vercel](https://vercel.com/) e inicia sesión.
2. Haz clic en **Add New Project** e importa el repositorio `EOHH/HappyBirthdayPablo`.
3. Vercel detectará automáticamente el framework:
   * **Framework Preset**: `Vite`
   * **Root Directory**: `./`
   * **Build Command**: `npm run build` (o `tsc -b && vite build`)
   * **Output Directory**: `dist`
   * **Install Command**: `npm install`
4. Haz clic en **Deploy**.

### Configuración de Vercel (`vercel.json`)
El repositorio incluye un archivo [`vercel.json`](vercel.json) optimizado:
* Habilita `cleanUrls` para URLs limpias.
* Configura encabezados de caché inmutable (`Cache-Control: public, max-age=31536000, immutable`) para todos los recursos estáticos bajo `/assets/`.

---

## 📁 Estructura del Proyecto

```plaintext
HappyBirthdayPablo/
├── public/
│   ├── audio/           # Pistas de audio locales
│   └── photos/          # Fotografías de la galería y hero
├── src/
│   ├── AmbientMusic.tsx # Control de música ambiente
│   ├── App.tsx          # Componente principal de la experiencia
│   ├── CelebrationArt.tsx
│   ├── OpeningCelebration.tsx
│   ├── Photo.tsx        # Renderizado optimizado de imágenes
│   ├── RobotIllustration.tsx
│   ├── YouTubeMusic.tsx # Integración de reproductor musical
│   ├── config.ts        # Fuente centralizada de contenido y dedicatorias
│   ├── experiences.tsx  # Pastel de cumpleaños y experiencias interactivas
│   └── main.tsx         # Punto de entrada de la aplicación
├── vercel.json          # Configuración de despliegue en Vercel
├── vite.config.ts       # Configuración de Vite y plugins
└── package.json         # Scripts y dependencias
```

---

## 📄 Licencia

Este proyecto es privado y fue desarrollado con fines conmemorativos personales.
