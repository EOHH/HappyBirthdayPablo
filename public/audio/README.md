# Audio local autorizado

Actualmente se utiliza el archivo `cumpleanos.mp3` aportado en esta carpeta. Sustitúyelo únicamente por audio que tengas permiso para usar. No se descarga audio de YouTube.

En `src/config.ts`, dentro de `music`, configura:

```ts
local: {
  src: '/audio/cumpleanos.mp3',
  authorized: true,
  loop: true,
},
initialVolume: 35, // 0–100
```

La ruta comienza en `/audio/`, no en `/public/audio/`. Usa MP3 compatible con los navegadores objetivo y comprime el archivo antes de publicarlo. `loop: false` permite que la canción termine; `true` la repite. Pausar y reanudar conserva la posición.

Mientras `src` esté vacío o `authorized` sea `false`, no se crea audio local. El botón Música ofrece el reproductor visible de YouTube o su enlace externo. Si el archivo falla, esas alternativas permanecen disponibles.
