import { useState } from 'react'
import { RibbonArtwork } from './CelebrationArt'

export function Photo({ src, alt, eager = false }: { src: string; alt: string; eager?: boolean }) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  return <div className={`photo-media photo-media--${status}`}>
    {status !== 'error' && <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onLoad={() => setStatus('ready')} onError={() => setStatus('error')} />}
    {status === 'loading' && <span className="photo-loading" aria-hidden="true" />}
    {status === 'error' && <div className="photo-fallback" role="img" aria-label={`${alt}. Fotografía no disponible`}><RibbonArtwork variant="frame" /><span>Un recuerdo por revelar</span></div>}
  </div>
}
