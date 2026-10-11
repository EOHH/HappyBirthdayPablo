import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { ExternalLink, Music2, Pause, Play, Volume2, VolumeX, X } from 'lucide-react'
import { birthdayConfig as data } from './config'
import { YouTubeMusic } from './YouTubeMusic'
import './ambient-music.css'

export interface MusicHandle { start(): void; collapse(): void }
type Status = 'idle' | 'loading' | 'playing' | 'paused' | 'ended' | 'blocked' | 'error'
const labels: Record<Status, string> = {
  idle: 'Lista para acompañarte', loading: 'Cargando audio…', playing: 'Reproduciendo',
  paused: 'En pausa', ended: 'Audio terminado', blocked: 'Pulsa reproducir para activar el sonido.', error: 'No se pudo reproducir el audio local.',
}
const localSource = data.music.local.src.trim()
const configured = data.music.local.authorized && /^\/(?!\/)/.test(localSource)

/** Persistent audio lifetime is independent of every visible panel and section. */
export const AmbientMusic = forwardRef<MusicHandle, { visible: boolean; obscured: boolean }>(function AmbientMusic({ visible, obscured }, ref) {
  const audio = useRef<HTMLAudioElement | null>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [volume, setVolume] = useState<number>(data.music.initialVolume)
  const [muted, setMuted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!configured) return
    const element = new Audio()
    audio.current = element
    // The media decoder validates the actual resource (including SPA HTML/404
    // responses). No HEAD/fetch round trip is inserted before the user's play().
    element.preload = 'metadata'
    element.src = localSource
    element.loop = data.music.local.loop
    element.volume = Math.min(100, Math.max(0, data.music.initialVolume)) / 100
    let loadTimer: number | undefined
    const playing = () => {
      if (element.paused || element.ended || element.readyState < 2) return
      clearTimeout(loadTimer); setStatus('playing'); setError('')
    }
    const paused = () => {
      clearTimeout(loadTimer)
      setStatus(previous => previous === 'error' || previous === 'blocked' ? previous : element.ended ? 'ended' : 'paused')
    }
    const loading = () => {
      clearTimeout(loadTimer); setStatus('loading'); setError('')
      loadTimer = window.setTimeout(() => {
        element.pause()
        setStatus('error'); setError('El audio tarda demasiado en cargar. Puedes reintentar o usar YouTube.')
        setExpanded(true)
      }, 15000)
    }
    const ready = () => {
      clearTimeout(loadTimer)
      if (element.paused) setStatus(previous => previous === 'error' || previous === 'blocked' ? previous : 'paused')
    }
    const ended = () => setStatus('ended')
    const failed = () => {
      clearTimeout(loadTimer)
      setStatus('error')
      setExpanded(true)
      setError(element.error?.code === 3 || element.error?.code === 4
        ? 'El archivo no existe o su formato no es compatible. Puedes usar YouTube.'
        : 'No se pudo cargar el audio. Comprueba tu conexión o usa YouTube.')
    }
    const changedVolume = () => { setVolume(Math.round(element.volume * 100)); setMuted(element.muted) }
    const listeners: [string, EventListener][] = [
      ['playing', playing], ['pause', paused], ['loadstart', loading], ['waiting', loading],
      ['loadedmetadata', ready], ['canplay', ready], ['ended', ended], ['error', failed], ['volumechange', changedVolume],
    ]
    listeners.forEach(([event, handler]) => element.addEventListener(event, handler))
    return () => {
      audio.current = null
      clearTimeout(loadTimer)
      listeners.forEach(([event, handler]) => element.removeEventListener(event, handler))
      element.pause(); element.removeAttribute('src'); element.load()
    }
  }, [])

  const play = useCallback(() => {
    const element = audio.current
    if (!element) { setExpanded(true); return }
    // Called directly inside the gift/button click, before any transition or await.
    if (element.error) element.load()
    void element.play().catch((reason: unknown) => {
      if (audio.current !== element) return
      if (reason instanceof DOMException && reason.name === 'AbortError') return
      const blocked = reason instanceof DOMException && reason.name === 'NotAllowedError'
      setStatus(blocked ? 'blocked' : 'error')
      setExpanded(true)
      setError(blocked ? '' : 'El audio no está disponible. Puedes reintentar o abrir YouTube.')
    })
  }, [])

  useImperativeHandle(ref, () => ({
    start: play,
    collapse: () => { setExpanded(false); setVideoOpen(false) },
  }), [play])

  useEffect(() => {
    if (expanded && visible && !obscured) closeButton.current?.focus()
  }, [expanded, visible, obscured])

  const close = () => { setExpanded(false); trigger.current?.focus() }
  const toggle = () => {
    if (audio.current && !audio.current.paused) audio.current.pause()
    else play()
  }
  const openVideo = () => { audio.current?.pause(); setExpanded(false); setVideoOpen(true) }

  // Only controls disappear for the gallery. The HTMLAudioElement stays alive.
  if (!visible || obscured) return null
  if (videoOpen) return <YouTubeMusic open onOpen={() => setVideoOpen(true)} onClose={() => { setVideoOpen(false) }} />
  return <aside className="ambient-music" aria-label="Música ambiental">
    {expanded && <section id="ambient-panel" className="ambient-panel" aria-label={data.music.label} onKeyDown={event => { if (event.key === 'Escape') { event.stopPropagation(); close() } }}>
      <header><h2>{data.music.label}</h2><button ref={closeButton} onClick={close} aria-label="Cerrar controles sin pausar"><X size={18} /></button></header>
      <p role="status">{configured ? error || labels[status] : 'No hay un audio local autorizado configurado. Puedes escuchar el video en YouTube.'}</p>
      {configured && <div className="ambient-controls">
        <button onClick={toggle} aria-label={status === 'playing' ? 'Pausar música' : 'Reproducir música'}>{status === 'playing' ? <Pause size={18} /> : <Play size={18} />}</button>
        <button onClick={() => { if (audio.current) audio.current.muted = !audio.current.muted }} aria-pressed={muted} aria-label={muted ? 'Activar sonido' : 'Silenciar'}>{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>
        <label>Volumen<input type="range" min="0" max="100" value={volume} onChange={event => { if (audio.current) audio.current.volume = Number(event.target.value) / 100 }} /></label><output>{volume}%</output>
      </div>}
      <div className="ambient-alternative"><button onClick={openVideo}>Activar música en YouTube</button><a href={data.music.url} target="_blank" rel="noopener noreferrer" onClick={() => audio.current?.pause()}>Abrir video <ExternalLink size={13} /></a></div>
      <small>{configured ? 'Puedes cerrar este panel: la música continúa.' : 'El video permanece visible mientras se reproduce.'}</small>
    </section>}
    <div className="ambient-pill">
      {configured && <button onClick={toggle} aria-label={status === 'playing' ? 'Pausar música' : 'Reproducir música'}>{status === 'playing' ? <Pause size={17} /> : <Play size={17} />}</button>}
      <button ref={trigger} className="ambient-trigger" aria-expanded={expanded} aria-controls="ambient-panel" onClick={() => setExpanded(value => !value)}><Music2 size={16} /><span>{status === 'error' || status === 'blocked' ? 'Revisar audio' : status === 'loading' ? 'Cargando…' : 'Música'}</span></button>
    </div>
  </aside>
})
