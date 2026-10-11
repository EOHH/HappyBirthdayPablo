# Refinamiento final de apertura

## Cambios

- Se retiraron los iconos decorativos de regalo, destellos, corazones, correo, robot genérico, circuito y confeti, además de la estrella tipográfica del hero. Se mantienen flechas, cierre y controles de música.
- Ilustraciones SVG originales de cintas, un marco fotográfico y una órbita conectada para los recuerdos, el estado de foto no disponible y el final. El sobre lleva el monograma de Florchis; se conserva el robot ilustrado propio.
- Mensaje de entrada: “¡Felices 25, Pablo!”, centralizado en `src/config.ts`.

## Secuencia

1. Pulsación: se abre la tapa y se conserva la solicitud musical existente.
2. 320 ms: explosión radial, serpentinas, globos laterales y puntos de luz.
3. 1.050 ms: página habilitada, revelación del hero y montaje musical como antes. Los efectos permiten todos los toques; están debajo del visor y del panel YouTube.
4. 5.600 ms: desmontaje de todos los efectos de apertura. Los temporizadores se cancelan al desmontar o saltar la secuencia.

“Ir a la sorpresa” permite omitir la apertura. Con movimiento reducido se accede inmediatamente al hero y no se montan partículas ni globos. El panel musical, su ciclo de vida y sus controles no fueron modificados.

## Rendimiento

Animaciones finitas de transformaciones y opacidad; sin canvas, WebGL, física por frame, imágenes nuevas ni dependencias. La celebración utiliza 48 piezas principales (36 visibles en móvil), además del resplandor, los nodos SVG y las partículas preexistentes de la caja. El trabajo termina automáticamente. El confeti existente de torta/final sigue disponible.

## Verificación

- `npm run lint`: aprobado sin errores.
- `npm run build`: aprobado; TypeScript estricto y Vite. Bundle de aplicación: 125,69 KB gzip; CSS: 12,33 KB gzip.
- Revisión de código: cancelación de temporizadores, desmontaje de partículas, opción para omitir, movimiento reducido, capas sin interceptación de toques y conservación del arranque musical de 1.050 ms.
- Navegador: el inventario devolvió `apps: [], browsers: []`. No se realizaron capturas ni comprobaciones visuales en dispositivos. Pendiente verificar sincronización percibida, disposición a 320–430 px y reproducción musical en vivo. No se modificaron los archivos del reproductor ni su API.
