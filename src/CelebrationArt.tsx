/** Original ribbon paths, used as stationery artwork rather than interface icons. */
export function RibbonArtwork({ variant = 'ribbon' }: { variant?: 'ribbon' | 'orbit' | 'frame' }) {
  return <svg className={`ribbon-art ribbon-art--${variant}`} viewBox="0 0 160 100" fill="none" aria-hidden="true" focusable="false">
    {variant === 'ribbon' && <><path d="M13 76C50 77 36 11 71 24c32 12-6 58 16 62 23 4 14-59 58-65" stroke="currentColor" strokeWidth="9" /><path d="M13 73C50 74 36 8 71 21c32 12-6 58 16 62 23 4 14-59 58-65" stroke="#ffe9b5" strokeWidth="2" /></>}
    {variant === 'orbit' && <><ellipse cx="80" cy="50" rx="60" ry="23" transform="rotate(-25 80 50)" stroke="currentColor" strokeWidth="2" /><path d="M51 77V29h24l16 18h22v28" stroke="#80e8df" strokeWidth="2" /><circle cx="51" cy="77" r="4" fill="#80e8df" /><circle cx="127" cy="25" r="6" fill="#ffe2a0" /></>}
    {variant === 'frame' && <><path d="M29 79 19 24l89-15 11 57z" stroke="currentColor" strokeWidth="2" /><path d="m45 84 5-61 89 7-5 61z" fill="#ffffff0a" stroke="#efc9f7" strokeWidth="2" /><path d="m60 69 18-19 14 13 12-11 16 20" stroke="#8befdc" strokeWidth="2" /><circle cx="110" cy="43" r="5" fill="#ffe2a0" /></>}
  </svg>
}
