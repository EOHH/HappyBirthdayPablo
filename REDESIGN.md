# Regalo de Florchis para PABLO

## Contenido

`src/config.ts` sigue siendo la fuente de datos. PABLO, 25 años, 11 de octubre y Florchis ya están configurados.

Los textos de familiares y la carta que existían eran ejemplos. Se conservan como borradores, pero no se presentan como palabras auténticas. Tras reemplazarlos por textos autorizados, activar las claves de `contentReady`. Las tarjetas de recuerdos sin contenido definitivo funcionan como desplegables con invitaciones editoriales, sin describir acontecimientos inventados.

Colocar fotografías en `public/photos` y editar `photos`. `photoCategories` asigna una categoría a cada foto, en el mismo orden. Las categorías disponibles están en `gallery.categories`. Las categorías vacías muestran un estado explícito. El visor recorre solo las fotos de la categoría seleccionada.

## Experiencia implementada

- Caja con tapa, lazo, iluminación y transición de apertura; no requiere interacción precisa sobre una pieza pequeña.
- Hero personal, medallón de cumpleaños en escritorio y navegación directa.
- Álbum en papel cálido con marcos Polaroid, filtros accesibles y visor con teclado y gestos.
- Tarjetas de recuerdos desplegables; espacio protagonista de Florchis enlazado al sobre.
- Torta construida con CSS: apagar/encender cinco velas, confirmación del deseo y confeti. El número visible indica 25 años.
- Sobre con solapa animada y carta desplegable.
- Sección de nivel 25 con guiños a electrónica y robótica.
- Reproductor oficial YouTube IFrame para el video configurado: controles de reproducción, volumen y silencio, panel visible, enlace externo permanente y tratamiento de errores. Solicita reproducir después de abrir la sorpresa. No descarga ni extrae audio. Cerrar destruye el reproductor; ocultar la pestaña pausa. Los navegadores pueden exigir otra pulsación sobre reproducir.
- Respeto de movimiento reducido, foco contenido en visor, restauración del foco, bloqueo de scroll de fondo y controles táctiles.

## Verificación y límites

ESLint y build de producción (TypeScript estricto + Vite + Tailwind) ejecutados satisfactoriamente. La instalación de Tailwind informó cero vulnerabilidades. No se añadieron otras dependencias.

El navegador de automatización devolvió inventario vacío. No se hicieron capturas ni pruebas de gestos, reproducción de audio o maquetación en un navegador. El álbum utiliza los cinco archivos WebP existentes (96–191 KB); se retiraron las referencias a los archivos inexistentes 06 y 07. No se verificó el recorte en navegador. Las revisiones de interacción son de código: estados y temporizadores de apertura, filtros y recorrido del visor, apagado/reencendido, limpieza de confeti y audio.

Antes de compartir, sustituir fotos y textos pendientes y verificar 320, 375, 390, 430, 768 y 1440 px en navegador, incluyendo teclado y movimiento reducido.

Ejecutar `npm run dev`. Producción: `npm run build`; previsualización: `npm run preview`.
