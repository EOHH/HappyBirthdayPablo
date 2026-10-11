import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Music2, Pause, Play, Volume2, VolumeX, X } from 'lucide-react'
import { birthdayConfig as data } from './config'
import { loadYouTube, youtubeError, type YouTubePlayer } from './youtube'

type Status = 'loading' | 'ready' | 'playing' | 'paused' | 'buffering' | 'ended' | 'blocked' | 'error'
const labels: Record<Status, string> = {
  loading: 'Conectando con YouTube…', ready: 'Listo para reproducir', playing: 'Reproduciendo', paused: 'En pausa',
  buffering: 'Cargando el video…', ended: 'Video terminado', blocked: 'Pulsa reproducir o usa el control del video.', error: 'Reproducción no disponible',
}

/** Mounted only while visible. Closing destroys the player, never background audio. */
function PlayerPanel({ onClose }: { onClose: () => void }) {
  const host = useRef<HTMLDivElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const player = useRef<YouTubePlayer | null>(null)
  const visible = useRef(true)
  const playTimeout = useRef<number | undefined>(undefined)
  const [ready, setReady] = useState(false)
  const [status, setStatus] = useState<Status>('loading')
  const [error, setError] = useState('')
  const [volume, setVolume] = useState<number>(data.music.initialVolume)
  const [muted, setMuted] = useState(false)

  const watchPlayback = () => {
    clearTimeout(playTimeout.current)
    playTimeout.current = window.setTimeout(() => {
      if (player.current?.getPlayerState() !== 1) setStatus('blocked')
    }, 8000)
  }

  useEffect(() => {
    let disposed = false
    const focusFrame = requestAnimationFrame(() => closeButton.current?.focus())
    let mounted: YouTubePlayer | undefined
    let sync: number | undefined
    const fail = (message: string) => {
      if (disposed) return
      clearTimeout(playTimeout.current)
      setError(message); setStatus('error')
    }
    const timeout = window.setTimeout(() => fail('La conexión tardó demasiado. Puedes abrir el video en YouTube.'), 20000)
    loadYouTube().then(api => {
      if (disposed || !host.current) return
      const element = document.createElement('div')
      host.current.append(element)
      mounted = new api.Player(element, {
        width: '100%', height: '100%', videoId: data.music.videoId,
        playerVars: { origin: window.location.origin, playsinline: 1, controls: 1, autoplay: 0 },
        events: {
          onReady: ({ target }) => {
            if (disposed) return
            clearTimeout(timeout)
            player.current = target
            target.getIframe().title = data.music.label
            target.getIframe().setAttribute('referrerpolicy', 'strict-origin-when-cross-origin')
            target.setVolume(data.music.initialVolume)
            setReady(true); setError(''); setStatus('ready')
            // A user requested this panel. A delayed API load can lose gesture activation.
            if (!document.hidden && visible.current) { target.playVideo(); watchPlayback() }
            sync = window.setInterval(() => {
              if (document.hidden) return
              setVolume(Math.round(target.getVolume()))
              setMuted(target.isMuted())
            }, 600)
          },
          onStateChange: ({ data: state }) => {
            if (disposed) return
            if (state === 1 || state === 2 || state === 0) clearTimeout(playTimeout.current)
            if (state === 1) { setStatus('playing'); setError('') }
            else if (state === 2) setStatus('paused')
            else if (state === 3) setStatus('buffering')
            else if (state === 0) setStatus('ended')
          },
          onAutoplayBlocked: () => { if (!disposed) { clearTimeout(playTimeout.current); setStatus('blocked') } },
          onError: ({ data: code }) => { clearTimeout(timeout); fail(youtubeError(code)) },
        },
      })
    }).catch(() => { clearTimeout(timeout); fail('No se pudo cargar YouTube. Comprueba la conexión o abre el video directamente.') })
    const hide = () => {
      if (document.hidden) { clearTimeout(playTimeout.current); player.current?.pauseVideo() }
    }
    document.addEventListener('visibilitychange', hide)
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = !!entry && entry.intersectionRatio >= .5
      if (entry && entry.intersectionRatio < .5) {
        clearTimeout(playTimeout.current)
        player.current?.pauseVideo()
      }
    }, { threshold: [.5] })
    if (host.current) observer.observe(host.current)
    return () => {
      disposed = true
      cancelAnimationFrame(focusFrame)
      clearTimeout(timeout); clearTimeout(playTimeout.current); clearInterval(sync)
      document.removeEventListener('visibilitychange', hide)
      observer.disconnect()
      mounted?.destroy(); player.current = null
    }
  }, [])

  const toggle = () => {
    if (!player.current) return
    if (player.current.getPlayerState() === 1) player.current.pauseVideo()
    else { player.current.playVideo(); watchPlayback() }
  }
  return <section className="youtube-panel" id="music-panel" aria-label={data.music.label} onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); onClose() } }}>
    <header><div><span>DALE PLAY AL MOMENTO</span><h2>{data.music.label}</h2></div><button ref={closeButton} onClick={onClose} aria-label="Cerrar y detener el video"><X size={20} /></button></header>
    <div className="youtube-viewport" ref={host} />
    <p className="youtube-status" role="status">{error || labels[status]}</p>
    <div className="youtube-controls">
      <button onClick={toggle} disabled={!ready || status === 'error'} aria-label={status === 'playing' ? 'Pausar video' : 'Reproducir video'}>{status === 'playing' ? <Pause size={18} /> : <Play size={18} />}</button>
      <button disabled={!ready} onClick={() => { const p = player.current; if (p) { if (p.isMuted()) p.unMute(); else p.mute(); setMuted(p.isMuted()) } }} aria-label={muted ? 'Activar sonido' : 'Silenciar video'} aria-pressed={muted}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
      <label>Volumen <input type="range" min="0" max="100" value={volume} disabled={!ready} onChange={event => { const value = Number(event.target.value); player.current?.setVolume(value); setVolume(value) }} /></label><output>{volume}%</output>
    </div>
    <footer><a href={data.music.url} target="_blank" rel="noopener noreferrer" onClick={() => player.current?.pauseVideo()}>Abrir en YouTube <ExternalLink size={14} /></a><span>Cerrar detiene el video.</span></footer>
  </section>
}

export function YouTubeMusic({ open, onOpen, onClose }: { open: boolean; onOpen: () => void; onClose: () => void }) {
  const trigger = useRef<HTMLButtonElement>(null)
  const close = () => { onClose(); trigger.current?.focus() }
  return <div className="youtube-music">
    {open && <PlayerPanel onClose={close} />}
    <button ref={trigger} className="music-fab" aria-expanded={open} aria-controls="music-panel" onClick={open ? close : onOpen}><Music2 size={19} /><span>{open ? 'Cerrar música' : 'Música'}</span></button>
  </div>
}
