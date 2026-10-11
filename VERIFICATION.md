# PABLO · Revisión de la experiencia y YouTube

## Resultado implementado

- Nombre corregido a PABLO en configuración, apertura, hero, carta, final, título, descripción y documentación. La edad sigue siendo 25, la fecha 11 de octubre y la sorpresa es de Florchis.
- Se conserva la arquitectura React/Vite, Tailwind, Framer Motion, las cinco fotografías, los filtros, el lightbox accesible, los recuerdos desplegables, la torta y la carta. No se añadieron dependencias.
- Nuevo tratamiento visual en `src/vibrant.css`, con hero tipográfico, colores más luminosos, robot SVG ligero, circuitos, apertura con partículas, torta con detalles y final con anillos expansivos. Las animaciones decorativas tienen ciclos limitados. El parallax del medallón solo se ve en escritorio y se desactiva con movimiento reducido.
- Los contenidos personales no confirmados siguen ocultos mediante `contentReady`. No se escribieron recuerdos específicos ni mensajes en nombre de Florchis.

## YouTube

`src/YouTubeMusic.tsx` usa la API oficial mediante `src/youtube.ts`. El video y volumen inicial se editan en `src/config.ts`: `music.videoId`, `music.url`, `music.initialVolume`.

Al pulsar “Abrir sorpresa” se solicita abrir el reproductor. Después de la transición de la caja se monta el panel visible; en `onReady` se intenta reproducir. La carga asíncrona puede perder la activación del gesto, de modo que se maneja `onAutoplayBlocked` y se ofrece reproducción manual. No se reproduce antes de esta interacción.

- Estado de reproducción mediante `onStateChange`, sin fingir que un clic equivale a reproducción confirmada.
- Reproducción/pausa mediante `playVideo` y `pauseVideo`.
- Silencio mediante `mute`/`unMute`; volumen mediante `setVolume`. Se consultan `getVolume` e `isMuted` para reflejar cambios hechos en los controles de YouTube.
- Controles originales visibles. Iframe con alto mínimo de 200 px y ancho de al menos 200 px en los tamaños solicitados, sin transparencias ni recortes deliberados.
- Cerrar el panel destruye el reproductor. Abrir una foto también lo cierra. Ocultar la pestaña o dejar menos de la mitad del video visible pausa; no reanuda automáticamente.
- Errores 2, 5, 100, 101, 150 y 153, fallo de script, timeout y bloqueo de reproducción muestran información. Siempre hay un enlace para abrir el video en YouTube.
- `origin` y política de referrer configurados. No se descarga ni extrae audio.

Fuentes oficiales consultadas: [IFrame API](https://developers.google.com/youtube/iframe_api_reference) y [requisitos del reproductor](https://developers.google.com/youtube/terms/required-minimum-functionality).

## Pruebas ejecutadas

- `npm run lint`: aprobado.
- `npm run build`: aprobado, TypeScript estricto y paquete de producción generado.
- `npm test`: cinco pruebas aprobadas usando el runner integrado de Node y un entorno simulado, sin servicios externos: carga concurrente única, fallo y reintento del script, timeout, preservación de callback previo y mensajes de errores de YouTube.
- Búsqueda de referencias al nombre incorrecto y al antiguo audio sintetizado: ninguna en código fuente, metadatos o documentación actualizada.

## No verificado en vivo

El inventario de automatización devolvió `apps: [], browsers: []`. No se hicieron capturas ni pruebas visuales a 320, 375, 390, 430, 768 o 1440 px. Tampoco se comprobó reproducción real del video, su disponibilidad regional o permiso de inserción, autoplay, volumen/silencio, gestos táctiles, recortes de fotos ni rendimiento en un teléfono real. Las pruebas aisladas no sustituyen esas comprobaciones.

## Comprobación manual pendiente

Ejecutar `npm run dev` y abrir la URL que indique Vite. En los seis tamaños revisar: caja → hero, panel musical sin desbordamiento, reproducir/pausar, volumen y silencio tanto externos como nativos, cerrar/reabrir, cambio de pestaña, filtros incluidos los vacíos, deslizamiento del visor, Tab/Escape, velas y confeti, carta y movimiento reducido. Probar además offline, bloqueo de autoplay y el enlace externo. Confirmar la inserción del video también en el dominio de producción.
