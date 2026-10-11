/** ÚNICO ARCHIVO DE CONTENIDO — edita aquí toda la información personal. */
export const birthdayConfig = {
  person: {
    name: 'PABLO',
    age: 25,
    date: '11 de octubre',
    shortName: 'PABLO',
    displayName: 'Pablo',
  },
  host: 'Florchis',
  // Activa solo después de sustituir los borradores por textos autorizados.
  contentReady: { memories: false, dedications: false, letter: true },
  pending: { memories: 'Aquí tendrán su lugar los recuerdos elegidos para ti.', dedications: 'Las palabras personales aún están por llegar.', letter: 'Este sobre está reservado para las palabras de Florchis. Su carta aún está por llegar.' },
  // Una categoría por fotografía; puedes añadir categorías en gallery.categories.
  photoCategories: ['Por recordar', 'Por recordar', 'Por recordar', 'Por recordar', 'Por recordar'] as string[],
  memoryPrompts: [
    { title: 'Un instante', text: 'Un lugar para ese recuerdo que quieras conservar.' },
    { title: 'Una sonrisa', text: 'Un lugar para una historia que merezca volver a contarse.' },
    { title: 'Lo que viene', text: 'Un lugar para todo lo que todavía queda por vivir.' },
  ],
  gift: { title: 'Hoy el universo tiene algo para ti.', subtitle: 'Un regalo. Mil formas de celebrar.', action: 'Abrir sorpresa', reveal: '¡Felices 25, Pablo!', skip: 'Ir a la sorpresa' },
  cake: { title: 'Cierra los ojos. Pide un deseo.', action: 'Apagar las velas', success: 'Que este nuevo año te acerque a tu deseo.', reset: 'Encender de nuevo' },
  gallery: { categories: ['Todos', 'Por recordar', 'Juntos', 'Aventuras'], title: 'La vida, en pequeños instantes.' },
  music: {
    label: 'La banda sonora de tu sorpresa',
    // Copia un audio autorizado a public/audio y activa ambas opciones.
    local: { src: '/audio/cumpleanos.mp3' as string, authorized: true as boolean, loop: true as boolean },
    videoId: 'jKRW9ZV8QzI', url: 'https://youtu.be/jKRW9ZV8QzI', initialVolume: 35,
  },
  hero: {
    eyebrow: 'PROYECTO · UN AÑO MÁS DE VIDA',
    title: 'Hoy celebramos tu existencia.',
    greeting: '¡Felices 25,',
    accent: 'Que empiece lo extraordinario.',
    message: 'Por todo lo que construyes, por cada idea que conviertes en realidad y por la energía única que dejas en quienes te rodean.',
    photo: {
      src: '/photos/foto-06.webp',
      alt: 'Pablo celebrando sus 25 años con su pastel temático de robótica',
      badge: 'PROTAGONISTA · 25 AÑOS',
      objectPosition: 'center 18%',
    },
  },
  photos: [
    { src: '/photos/foto-01.webp', alt: 'Un recuerdo especial juntos', caption: 'El comienzo de tantas historias' },
    { src: '/photos/foto-02.webp', alt: 'Una aventura inolvidable', caption: 'Días que merecen repetirse' },
    { src: '/photos/foto-03.webp', alt: 'Un momento de alegría', caption: 'Tu risa, nuestra favorita' },
    { src: '/photos/foto-04.webp', alt: 'Una celebración compartida', caption: 'Instantes que se quedan' },
    { src: '/photos/foto-05.webp', alt: 'Una tarde entre amigos', caption: 'Siempre en buena compañía' },
  ],
  memories: [
    { code: 'M-01', title: 'Esa curiosidad tuya', text: 'La que no acepta un “así funciona” y siempre quiere descubrir el porqué.' },
    { code: 'M-02', title: 'Tu forma de crear', text: 'Con paciencia, ingenio y esa capacidad especial de encontrar soluciones donde otros ven piezas.' },
    { code: 'M-03', title: 'La energía que compartes', text: 'Porque cada proyecto importa, pero las personas que inspiras en el camino importan todavía más.' },
  ],
  dedications: [
    { sender: 'Tu familia', relation: 'Tu equipo desde el día uno', message: 'Que este nuevo año te encuentre rodeado de amor, desafíos que te entusiasmen y razones infinitas para sonreír. Estamos muy orgullosos de ti.' },
    { sender: 'Tus amigos', relation: 'Cómplices de aventuras', message: 'Gracias por las ideas imposibles, las conversaciones largas y todos los recuerdos. Lo mejor de esta historia todavía está por construirse.' },
    { sender: 'Quienes te queremos', relation: 'Tu red más importante', message: 'Deseamos que nunca te falte curiosidad para imaginar, valentía para intentar y gente bonita con quien celebrar cada logro.' },
  ],
  version: {
    name: 'Nivel 25 desbloqueado',
    features: ['Más historias por vivir', 'Nuevas ideas en desarrollo', 'Experiencia acumulada', 'Curiosidad sin límites'],
  },
  letter: {
    heading: 'Para PABLO, de Florchis',
    paragraphs: [
      '¡¡Feliz cumpleaños, Pablito de blito, ito, jajija okk nuu! 🥳🎈',
      'Que sigas cumpliendo tus metas y creciendo como lo vienes haciendo. Que Diosito siempre te guíe y te bendiga en cada paso.',
      '🙏✨ ¡Muchos éxitos y un fuerte abrazo! 🎂🎁💙',
    ],
    signature: 'Con cariño, Florchis',
  },
  final: {
    title: '¡Feliz cumpleaños!',
    subtitle: 'El siguiente capítulo empieza ahora.',
  },
} as const

export type BirthdayConfig = typeof birthdayConfig
