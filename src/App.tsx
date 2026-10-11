import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { birthdayConfig as data } from './config'
import { Photo } from './Photo'
import { BirthdayCake } from './experiences'
import { AmbientMusic, type MusicHandle } from './AmbientMusic'
import { RobotIllustration } from './RobotIllustration'
import { RibbonArtwork } from './CelebrationArt'
import { OpeningCelebration } from './OpeningCelebration'

const reveal = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }

function SectionTitle({ label, title, text }: { label: string; title: string; text?: string }) {
  return <motion.header className="section-title" variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .3 }}>
    <span>{label}</span><h2>{title}</h2>{text && <p>{text}</p>}
  </motion.header>
}

function Confetti({ burst }: { burst: number }) {
  const colors = ['#8b5cf6', '#42d8ff', '#f3efff', '#bc8cff', '#47ffc8']
  return <div className="confetti" aria-hidden>{Array.from({ length: 48 }, (_, i) => <i key={`${burst}-${i}`} style={{ '--x': `${(i * 47) % 100}vw`, '--r': `${i * 37}deg`, '--d': `${(i % 12) * .08}s`, '--c': colors[i % colors.length] } as React.CSSProperties} />)}</div>
}

function App() {
  const reduce = useReducedMotion()
  const [started, setStarted] = useState(false)
  const [opening, setOpening] = useState(false)
  const [openingEffects, setOpeningEffects] = useState(false)
  const [openingComplete, setOpeningComplete] = useState(false)
  const musicRef = useRef<MusicHandle>(null)
  const [category, setCategory] = useState('Todos')
  const [activePhoto, setActivePhoto] = useState<number | null>(null)
  const [letterOpen, setLetterOpen] = useState(false)
  const [burst, setBurst] = useState(0)
  const heroRef = useRef<HTMLElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const touchStart = useRef<number | null>(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const ornamentY = useTransform(scrollYProgress, [0, .18], [0, -45])

  const celebrate = useCallback(() => setBurst(v => v + 1), [])
  const start = () => { musicRef.current?.start(); setOpening(true) }
  const visiblePhotos = data.photos.map((photo, index) => ({ photo, index })).filter(({ index }) => category === 'Todos' || data.photoCategories[index] === category)
  const movePhoto = useCallback((direction: number) => setActivePhoto(current => {
    const indices = data.photos.map((_, index) => index).filter(index => category === 'Todos' || data.photoCategories[index] === category)
    if (!indices.length) return null
    return indices[(indices.indexOf(current ?? -1) + direction + indices.length) % indices.length]
  }), [category])

  useEffect(() => {
    if (!opening) return
    if (openingComplete) return
    const timers = [
      window.setTimeout(() => setOpeningEffects(!reduce), reduce ? 0 : 320),
      window.setTimeout(() => setStarted(true), reduce ? 0 : 1050),
      window.setTimeout(() => { setOpeningEffects(false); setOpeningComplete(true) }, reduce ? 0 : 5600),
    ]
    return () => timers.forEach(window.clearTimeout)
  }, [opening, reduce, openingComplete])

  const skipOpening = () => {
    setOpeningComplete(true); setOpeningEffects(false); setStarted(true)
  }

  useEffect(() => {
    document.title = `Para ${data.person.name} · ${data.person.age} vueltas al sol`
    document.querySelector('meta[name="description"]')?.setAttribute('content', `Un regalo digital de ${data.host} para celebrar los ${data.person.age} años de ${data.person.name}. ${data.person.date}.`)
  }, [])

  useEffect(() => {
    if (started) heroRef.current?.focus({ preventScroll: true })
  }, [started])

  useEffect(() => {
    if (started && activePhoto === null) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previous }
  }, [started, activePhoto])

  const photoOpen = activePhoto !== null
  useEffect(() => {
    if (!photoOpen) return
    const previous = document.activeElement as HTMLElement | null
    dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus()
    return () => previous?.focus({ preventScroll: true })
  }, [photoOpen])

  useEffect(() => {
    if (!burst) return
    const timer = window.setTimeout(() => setBurst(0), 4200)
    return () => window.clearTimeout(timer)
  }, [burst])

  useEffect(() => {
    if (activePhoto === null) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActivePhoto(null)
      if (event.key === 'ArrowRight') movePhoto(1)
      if (event.key === 'ArrowLeft') movePhoto(-1)
      if (event.key === 'Tab') {
        const buttons = dialogRef.current?.querySelectorAll<HTMLButtonElement>('button')
        if (!buttons?.length) return
        const first = buttons[0]
        const last = buttons[buttons.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activePhoto, movePhoto])

  return <MotionConfig reducedMotion="user" transition={reduce ? { duration: 0 } : { duration: .55 }}>
    <motion.div className="progress" style={{ scaleX }} />
    <AnimatePresence>{!started && <motion.div className={`welcome ${opening ? 'is-opening' : ''}`} style={{ pointerEvents: opening ? 'none' : 'auto' }} exit={{ opacity: 0, scale: reduce ? 1 : 1.06 }} transition={{ duration: reduce ? 0 : .55 }}>
      <div className="welcome-grid" /><motion.div className="welcome-core" animate={reduce ? {} : { rotate: 45 }} transition={{ duration: 4, ease: 'easeOut' }}><span /></motion.div>
      <motion.div className="welcome-content" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}>
        <div className="status">DE {data.host.toUpperCase()} · PARA {data.person.name.toUpperCase()}</div>
        <h1>{data.gift.title}</h1><p>{data.gift.subtitle}</p>
        <button className={`gift-box ${opening ? 'gift-opening' : ''}`} onClick={start} disabled={opening} autoFocus aria-label={data.gift.action}><span className="gift-glow" /><span className="gift-lid"><i /></span><span className="gift-body"><i /></span><span className="gift-tag">P.</span><span className="gift-sparks" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ '--angle': `${i * 30}deg` } as React.CSSProperties} />)}</span></button>
        <button className="primary" onClick={start} disabled={opening}>{opening ? `Para ti, ${data.person.displayName}…` : data.gift.action}<ChevronRight size={18} aria-hidden="true" /></button>
        {opening && <button className="skip-opening" onClick={skipOpening}>{data.gift.skip}</button>}
        <small>{data.person.date} · Una sorpresa hecha con cariño</small>
      </motion.div>
    </motion.div>}</AnimatePresence>

    <main className={!started ? 'locked' : ''} inert={!started || photoOpen}>
      <a className="skip-link sr-only focus:not-sr-only" href="#recuerdos">Saltar al álbum</a>
      <nav className="chapter-nav" aria-label="Explorar la sorpresa"><a href="#recuerdos">Recuerdos</a><a href="#carta">Tu carta</a></nav>
      <section className="hero" ref={heroRef} tabIndex={-1} aria-label="Feliz cumpleaños">
        <div className="orb orb-a" /><div className="orb orb-b" /><div className="circuit-lines" />
        <motion.div className="hero-content" initial="hidden" animate={started ? 'visible' : 'hidden'} variants={{ visible: { transition: { staggerChildren: .13, delayChildren: .25 } } }}>
          <div className="hero-header">
            <motion.div variants={reveal} className="eyebrow">{data.hero.eyebrow}</motion.div>
            <motion.p variants={reveal} className="date">{data.person.date} · VERSIÓN {data.person.age}.0</motion.p>
            <motion.h1 aria-label={data.gift.reveal} variants={reduce ? reveal : { hidden: { opacity: 0, y: 24, rotate: -2 }, visible: { opacity: 1, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 95, damping: 18 } } }}>
              <span className="hero-greeting">{data.hero.greeting}</span>
              <span className="hero-name">{data.person.displayName}!</span>
              <em className="hero-accent">{data.hero.accent}</em>
            </motion.h1>
          </div>

          <motion.div
            className="hero-visual"
            variants={reduce ? reveal : {
              hidden: { opacity: 0, scale: .93, y: 30 },
              visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 75, damping: 16, delay: .32 } }
            }}
          >
            <div className="hero-visual-glow" aria-hidden="true" />
            <div className="hero-photo-frame">
              <span className="tech-corner tech-tl" aria-hidden="true" />
              <span className="tech-corner tech-tr" aria-hidden="true" />
              <span className="tech-corner tech-bl" aria-hidden="true" />
              <span className="tech-corner tech-br" aria-hidden="true" />

              <div className="hero-photo-hud">
                <span className="hud-dot" aria-hidden="true" />
                <span className="hud-label">{data.hero.photo.badge}</span>
                <span className="hud-code" aria-hidden="true">SYS.ACT // 25.0</span>
              </div>

              <div className="hero-photo-img-wrap">
                <img
                  src={data.hero.photo.src}
                  alt={data.hero.photo.alt}
                  loading="eager"
                  decoding="async"
                  className="hero-photo-img"
                  style={{ objectPosition: data.hero.photo.objectPosition }}
                />
                <div className="hero-photo-overlay" aria-hidden="true" />
              </div>

              <div className="hero-photo-bar" aria-hidden="true">
                <span className="bar-seg" />
                <span className="bar-tag">{data.person.displayName.toUpperCase()} · 100% ENERGY</span>
                <span className="bar-seg" />
              </div>
            </div>

            <motion.div
              className="birthday-medallion"
              style={{ y: reduce ? 0 : ornamentY }}
              aria-hidden="true"
            >
              <span>EDICIÓN ESPECIAL</span>
              <strong>{data.person.age}</strong>
              <em>vueltas al sol</em>
              <RobotIllustration />
            </motion.div>
          </motion.div>

          <div className="hero-body">
            <motion.p variants={reveal} className="hero-copy">{data.hero.message}</motion.p>
            <motion.p variants={reveal} className="hero-note">{data.hero.title}</motion.p>
            <motion.a variants={reveal} className="scroll-link" href="#recuerdos">Descubrir la sorpresa <ArrowDown /></motion.a>
          </div>
        </motion.div>
        <div className="hero-index">Una sorpresa de {data.host}</div>
      </section>

      <section id="recuerdos" className="gallery section-pad">
        <SectionTitle label="01 / LO QUE SE QUEDA" title={data.gallery.title} text="Un álbum para detener el tiempo, aunque sea un poquito." />
        <div className="gallery-filters" role="group" aria-label="Categorías de fotografías">{data.gallery.categories.map(item => <button key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
        {!visiblePhotos.length && <p className="gallery-empty" role="status">Aún no hay fotografías en esta categoría.</p>}
        {!data.photos.length && <p className="gallery-empty">Los recuerdos también viven en las palabras que siguen.</p>}
        <div className="photo-rail" key={category}>{visiblePhotos.map(({ photo, index }) => <motion.button initial={{ opacity: 0, y: reduce ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} className={`photo-card photo-${index % 3}`} key={photo.src} onClick={() => { musicRef.current?.collapse(); setActivePhoto(index) }} whileTap={{ scale: .97 }} aria-label={`Abrir ${photo.alt}`}>
          <Photo src={photo.src} alt={photo.alt} /><div className="photo-shade" /><span className="photo-number">0{index + 1}</span><p>{photo.caption}</p>
        </motion.button>)}</div>
        <p className="swipe-hint"><ArrowDown /> Desliza para explorar</p>
      </section>

      <section className="memories section-pad">
        <SectionTitle label="MEMORIA INTERNA · 02" title="Las cosas que hacen que seas tú." />
        {!data.contentReady.memories && <><p className="pending-copy">{data.pending.memories}</p><div className="memory-prompts">{data.memoryPrompts.map((item, index) => <motion.details initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal} key={item.title} className="memory-keepsake"><summary><span>0{index + 1}</span><RibbonArtwork variant={index === 0 ? 'frame' : index === 1 ? 'ribbon' : 'orbit'} /><h3>{item.title}</h3><small>Toca para descubrir</small></summary><p>{item.text}</p></motion.details>)}</div></>}
        <div className="memory-list">{(data.contentReady.memories ? data.memories : []).map((memory, i) => <motion.article key={memory.code} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .4 }} variants={reveal} transition={{ delay: i * .08 }}>
          <span>{memory.code}</span><div><h3>{memory.title}</h3><p>{memory.text}</p></div>
        </motion.article>)}</div>
      </section>

      <section className="messages section-pad">
        <SectionTitle label="SEÑALES RECIBIDAS · 03" title="Mensajes desde tu constelación." text="Palabras enviadas por las personas que hacen equipo contigo." />
        <a className="florchis-feature" href="#carta"><span>EL DETALLE DETRÁS DE TODO ESTO</span><h3>{data.host}</h3><p>Preparó esta sorpresa para ti.</p><span>Abrir su sobre <ArrowDown size={16} /></span></a>
        {!data.contentReady.dedications && <p className="pending-copy">{data.pending.dedications}</p>}
        <div className="message-grid">{(data.contentReady.dedications ? data.dedications : []).map((item, i) => <motion.article key={item.sender} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal} transition={{ delay: i * .1 }}>
          <p>“{item.message}”</p><footer><div className="avatar">{item.sender.charAt(0)}</div><div><strong>{item.sender}</strong><span>{item.relation}</span></div></footer>
        </motion.article>)}</div>
      </section>

      <BirthdayCake onCelebrate={celebrate} />
      <section className="version section-pad">
        <div className="version-card">
          <div className="level-illustration" aria-hidden="true"><RobotIllustration /></div>
          <div className="scanner" /><div className="version-top"><span>ROBÓTICA · MECATRÓNICA · ELECTRÓNICA</span></div>
          <div className="version-number"><span>v</span>{data.person.age}<small>.0</small></div><h2>{data.version.name}</h2>
          <div className="feature-list">{data.version.features.map((feature, i) => <div key={feature}><span>0{i + 1}</span><p>{feature}</p><i>INSTALADO</i></div>)}</div>
          <div className="system-note">Sistema estable. Potencial ilimitado.</div>
        </div>
      </section>

      <section id="carta" className="letter section-pad">
        <SectionTitle label="SOLO PARA TUS OJOS" title="Las palabras también son un regalo." text={`Un sobre de ${data.host}, para ${data.person.name}.`} />
        <motion.button className={`envelope ${letterOpen ? 'open' : ''}`} onClick={() => setLetterOpen(v => !v)} whileTap={{ scale: .98 }} aria-expanded={letterOpen} aria-controls="birthday-letter">
          <div className="envelope-seal"><span className="seal-monogram" aria-hidden="true">{data.host.charAt(0)}</span></div><span>{letterOpen ? 'Cerrar carta' : 'Toca para abrir'}</span>
        </motion.button>
        <AnimatePresence>{letterOpen && <motion.article id="birthday-letter" className="letter-paper" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <h2>{data.letter.heading}</h2>{data.contentReady.letter ? <>{data.letter.paragraphs.map(p => <p key={p}>{p}</p>)}<strong>{data.letter.signature}</strong></> : <p>{data.pending.letter}</p>}
        </motion.article>}</AnimatePresence>
      </section>

      <section className={`finale section-pad ${burst ? 'celebrating' : ''}`}>
        <div className="final-rings"><i /><i /><i /></div><motion.div className="final-content" initial="hidden" whileInView="visible" viewport={{ once: true, amount: .4 }} variants={reveal}>
          <RibbonArtwork /><span>QUE LA VIDA TE SIGA SORPRENDIENDO</span><h2>{data.final.title}<br /><em>{data.person.name}.</em></h2><p>{data.final.subtitle}</p>
          <button className="primary celebrate" onClick={celebrate}>Celebrar otra vez</button>
        </motion.div>
        <p className="celebration-status" role="status">{burst > 0 ? data.final.title : ''}</p>
      </section>
    </main>
    {openingEffects && !reduce && !photoOpen && <OpeningCelebration />}
    <AmbientMusic ref={musicRef} visible={started} obscured={photoOpen} />
    {burst > 0 && !reduce && <Confetti burst={burst} />}

    <AnimatePresence>{activePhoto !== null && <motion.div ref={dialogRef} className="lightbox" role="dialog" aria-modal="true" aria-label="Visor de fotografías" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={event => { if (event.target === event.currentTarget) setActivePhoto(null) }} onTouchStart={event => { touchStart.current = event.touches[0].clientX }} onTouchEnd={event => { if (touchStart.current !== null) { const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 60) movePhoto(delta < 0 ? 1 : -1); touchStart.current = null } }}>
      <button className="close" onClick={() => setActivePhoto(null)} aria-label="Cerrar"><X /></button>
      <button className="nav prev" onClick={() => movePhoto(-1)} aria-label="Anterior"><ChevronLeft /></button>
      <motion.figure key={activePhoto} initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }}>
        <Photo src={data.photos[activePhoto].src} alt={data.photos[activePhoto].alt} eager />
        <figcaption><span>0{activePhoto + 1} / 0{data.photos.length}</span>{data.photos[activePhoto].caption}</figcaption>
      </motion.figure>
      <button className="nav next" onClick={() => movePhoto(1)} aria-label="Siguiente"><ChevronRight /></button>
    </motion.div>}</AnimatePresence>
  </MotionConfig>
}

export default App
