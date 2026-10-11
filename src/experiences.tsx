import { useState } from 'react'
import { birthdayConfig as data } from './config'

export function BirthdayCake({ onCelebrate }: { onCelebrate: () => void }) {
  const [lit, setLit] = useState(true)
  return <section className="cake-section section-pad" id="deseo">
    <span className="chapter-label">UN MOMENTO SOLO PARA TI</span><h2>{data.cake.title}</h2>
    <div className={`cake-art ${lit ? 'is-lit' : ''}`} role="img" aria-label={`Torta de cumpleaños con velas ${lit ? 'encendidas' : 'apagadas'}`}>
      <div className="candles">{[0, 1, 2, 3, 4].map(i => <span className="candle" key={i}><i className="flame" /></span>)}</div>
      <div className="cake-top" /><div className="cake-body"><span>{data.person.age}</span><i /><i /><i /></div><div className="cake-plate" />
    </div>
    <button className="primary" onClick={() => { setLit(!lit); if (lit) onCelebrate() }}>{lit ? data.cake.action : data.cake.reset}</button>
    <p className="wish-status" role="status">{!lit ? data.cake.success : 'Tómate tu tiempo. Este instante es tuyo.'}</p>
  </section>
}
