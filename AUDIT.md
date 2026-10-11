# Auditoría de experiencia

Se conservan la aplicación Vite, las secciones, las dependencias y `src/config.ts` sin modificar sus datos.

## Correcciones implementadas

- Hero: rejilla en escritorio en lugar de márgenes negativos; título configurado ahora visible; nombres largos pueden partirse sin salir del contenedor.
- Galería: componente reutilizable con estados React de carga/error, espacio reservado y decodificación asíncrona. Se eliminó la manipulación imperativa del DOM y las instrucciones técnicas visibles para invitados.
- Visor: bloqueo del desplazamiento de fondo, foco inicial, ciclo de Tab, restauración de foco, Escape, flechas, deslizamiento táctil y cierre mediante el fondo. Controles de 48 px.
- Bienvenida: contenido de fondo inerte y foco transferido al hero al iniciar.
- Tablet: dedicatorias en dos columnas; tercera tarjeta ocupa la fila. Tres columnas solo en escritorio.
- Carta: ancho de lectura limitado y revelación sin animar altura; relación accesible entre botón y contenido.
- Celebración: confeti fuera del contenedor recortado y eliminación tras finalizar. Confirmación textual accesible y ausencia de partículas cuando se solicita movimiento reducido.
- Menor actividad decorativa: retirado el barrido continuo y las pulsaciones de anillos; movimiento reducido configurado también en Framer Motion.
- Tipografía y colores secundarios más legibles; navegación directa a recuerdos y carta; composición de galería escalonada en pantallas amplias.

## Verificación real

- ESLint y TypeScript/build de producción ejecutados satisfactoriamente.
- Se revisaron reglas de composición para 320, 375, 390, 430, 768 y 1440 px por código, no mediante capturas.
- El inventario del navegador devolvió `apps: [], browsers: []`. No se realizaron pruebas visuales ni de interacción en navegador.
- `public/photos` solo contiene instrucciones; no hay fotografías reales disponibles para validar recortes, orientación o tiempos de descarga.

## Pendiente antes de compartir

Los datos actuales siguen siendo los ejemplos existentes. Sustituirlos por datos y dedicatorias autorizados, incorporar las fotos y revisar en navegador los seis tamaños, nombres largos, zoom al 200 %, teclado, gestos táctiles y movimiento reducido. La inspección visual pendiente no queda sustituida por el build.
