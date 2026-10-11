export interface YouTubePlayer {
  playVideo(): void
  pauseVideo(): void
  setVolume(volume: number): void
  getVolume(): number
  mute(): void
  unMute(): void
  isMuted(): boolean
  getPlayerState(): number
  getIframe(): HTMLIFrameElement
  destroy(): void
}

interface PlayerOptions {
  width: string
  height: string
  videoId: string
  playerVars: { origin: string; playsinline: number; controls: number; autoplay: number }
  events: {
    onReady(event: { target: YouTubePlayer }): void
    onStateChange(event: { data: number }): void
    onError(event: { data: number }): void
    onAutoplayBlocked(): void
  }
}

interface YouTubeAPI { Player: new (element: HTMLElement, options: PlayerOptions) => YouTubePlayer }
declare global {
  interface Window { YT?: YouTubeAPI; onYouTubeIframeAPIReady?: () => void }
}

let pending: Promise<YouTubeAPI> | undefined

/** One shared official API script, including React StrictMode remounts. */
export function loadYouTube(): Promise<YouTubeAPI> {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (pending) return pending
  pending = new Promise<YouTubeAPI>((resolve, reject) => {
    const previous = window.onYouTubeIframeAPIReady
    const script = document.createElement('script')
    let settled = false
    script.src = 'https://www.youtube.com/iframe_api'
    script.async = true
    const finish = (failed: boolean) => {
      if (settled) return
      settled = true
      script.onerror = null
      clearTimeout(timeout)
      window.onYouTubeIframeAPIReady = previous
      if (failed || !window.YT?.Player) {
        script.remove()
        pending = undefined
        reject(new Error('No se pudo conectar con YouTube.'))
      } else resolve(window.YT)
    }
    const timeout = window.setTimeout(() => finish(true), 15000)
    window.onYouTubeIframeAPIReady = () => { finish(false); previous?.() }
    script.onerror = () => finish(true)
    document.head.append(script)
  })
  return pending
}

export function youtubeError(code: number): string {
  if (code === 101 || code === 150) return 'Este video no permite reproducirse dentro de esta página.'
  if (code === 100) return 'Este video no está disponible o es privado.'
  if (code === 153) return 'YouTube no pudo validar esta página. Abre el video directamente.'
  if (code === 2) return 'YouTube no reconoce la configuración de este video.'
  return 'YouTube no pudo reproducir el video en este navegador.'
}
