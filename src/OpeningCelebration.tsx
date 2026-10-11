import type { CSSProperties } from 'react'

const colors = ['#bc8aff', '#ff9bce', '#74ecd8', '#6facff', '#ffdc83']

/** Finite, deterministic pieces. Parent owns the lifetime; nothing captures input. */
export function OpeningCelebration() {
  return <div className="opening-celebration" aria-hidden="true">
    <div className="opening-aura" />
    <div className="opening-confetti">{Array.from({ length: 30 }, (_, i) => {
      const angle = (i / 30) * Math.PI * 2
      return <span key={i} className="opening-piece" style={{
        '--dx': `${Math.cos(angle) * (30 + i % 4 * 7)}vw`,
        '--dy': `${Math.sin(angle) * (25 + i % 3 * 10)}vh`,
        '--spin': `${(i % 2 ? 1 : -1) * (160 + i * 17)}deg`,
        '--delay': `${i % 5 * 28}ms`, '--color': colors[i % colors.length],
      } as CSSProperties}><i /></span>
    })}</div>
    <div className="opening-streamers">{Array.from({ length: 6 }, (_, i) => <svg key={i} viewBox="0 0 35 180" style={{ '--left': `${8 + i * 16}%`, '--delay': `${i * 85}ms`, '--color': colors[i % colors.length], '--tilt': `${i % 2 ? 14 : -14}deg` } as CSSProperties}><path d="M18 0C-10 22 44 28 18 49S-8 77 18 94s25 25 0 44-15 30 0 42" /></svg>)}</div>
    <div className="opening-balloons">{Array.from({ length: 4 }, (_, i) => <div key={i} className={`opening-balloon balloon-${i}`} style={{ '--color': colors[i], '--delay': `${220 + i * 190}ms`, '--drift': `${i % 2 ? -18 : 18}px` } as CSSProperties}>
      <svg viewBox="0 0 85 220"><ellipse cx="42" cy="47" rx="31" ry="39" fill="currentColor" /><path d="M25 24q-12 13-6 29" stroke="#ffffff80" strokeWidth="4" strokeLinecap="round" /><path d="m42 85-4 6h8z" fill="currentColor" /><path d="M42 92c-23 28 22 46 0 74s12 37 0 49" stroke="#eee3ff99" fill="none" /></svg>
    </div>)}</div>
    <div className="opening-glints">{Array.from({ length: 8 }, (_, i) => <i key={i} style={{ '--left': `${10 + i * 11}%`, '--top': `${20 + i % 3 * 22}%`, '--delay': `${i * 120}ms` } as CSSProperties} />)}</div>
  </div>
}
