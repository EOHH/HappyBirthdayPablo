# Música ambiental persistente

## Configuración

Ver `public/audio/README.md`. Editar solo `music.local` e `initialVolume` en `src/config.ts`. El archivo aportado `public/audio/cumpleanos.mp3` está conectado mediante `src: '/audio/cumpleanos.mp3'`, `authorized: true`. No se descarga ni extrae audio del video.

## Comportamiento

`src/AmbientMusic.tsx` conserva un único HTMLAudioElement durante la vida de la aplicación, separado del panel visual. Precarga metadatos para que el navegador valide el recurso y su formato; solicita `play()` directamente desde el clic en “Abrir sorpresa”, antes de temporizadores y animaciones, sin esperar una petición HTTP previa. Un bloqueo del navegador ofrece activación manual. Un archivo ausente o inválido abre los controles con “Activar música en YouTube”; también ocurre cuando no hay una ruta autorizada al abrir la sorpresa.

Cerrar el panel solo cambia su visibilidad. El audio sigue durante el desplazamiento, filtros, carta, torta y apertura/cierre del visor de fotografías. No se modifica `currentTime` al reanudar. La píldora flotante incluye pausa/reproducción y acceso a volumen/silencio; no abre un panel grande automáticamente.

Los eventos `playing`, `pause`, `waiting`, `canplay`, `ended`, `error` y `volumechange` actualizan la interfaz. Hay manejo de promesas rechazadas, timeout de carga y enlace alternativo. Al desmontar la aplicación se retiran listeners y temporizadores, se pausa y se libera el recurso.

YouTube se conserva sin modificar su integración: solo se monta al solicitar expresamente el video, siempre visible. Al cerrarlo se detiene, como exige esta alternativa; la continuidad al cerrar controles corresponde exclusivamente al audio local. Elegir YouTube pausa el audio local para evitar dos fuentes simultáneas. No se reanuda una pista pausada sin otra acción del usuario.

## Verificación

- Lint y build de producción ejecutados satisfactoriamente.
- No se modificaron los estilos del sitio ni los tiempos y efectos de la apertura. Solo se añadió CSS acotado al control musical.
- Se detectó el MP3 aportado: 4.025.710 bytes y cabecera ID3. La ruta antes estaba vacía y deshabilitada; esa era la causa del silencio. La validación del formato completo y la reproducción audible deben confirmarse en navegador.
- Se inició temporalmente `vite preview` y se solicitó `/audio/cumpleanos.mp3`: HTTP 200, `Content-Type: audio/mpeg`, 4.025.710 bytes y SHA-256 idéntico al archivo fuente. Se comprobó así que producción entrega el audio, no una página HTML de fallback. Se detuvo el servidor al terminar.
- El inventario de navegador devolvió `apps: [], browsers: []`. No se confirmó reproducción audible, decodificación completa, permiso de autoplay ni continuidad en un dispositivo real. No se presentan estas comprobaciones como realizadas.
- Las verificaciones de compilación no confirman reproducción en vivo ni compatibilidad de un archivo futuro. Algunos navegadores móviles controlan el volumen mediante los botones del dispositivo; el estado se lee del elemento de audio.
