/** Lightweight inline illustration; no canvas, WebGL or external image requests. */
export function RobotIllustration() {
  return <svg className="robot-illustration" viewBox="0 0 240 200" fill="none" aria-hidden="true">
    <g className="robot-circuits" stroke="currentColor" strokeWidth="1.5"><path d="M14 135h35l20-20M225 58h-32l-20 20M25 50h20l22 22M218 155h-25l-20-20" /><circle cx="14" cy="135" r="4" /><circle cx="225" cy="58" r="4" /><circle cx="25" cy="50" r="4" /><circle cx="218" cy="155" r="4" /></g>
    <g className="robot-body"><path d="M120 38V23" stroke="#67f5d7" strokeWidth="4" /><circle cx="120" cy="19" r="6" fill="#ffafdb" />
      <rect x="65" y="42" width="110" height="85" rx="28" fill="#c8b5ff" stroke="#efe7ff" strokeWidth="2" />
      <rect x="77" y="58" width="86" height="47" rx="18" fill="#251555" />
      <g className="robot-eyes" fill="#67f5d7"><rect x="92" y="70" width="10" height="16" rx="5" /><rect x="138" y="70" width="10" height="16" rx="5" /></g>
      <path d="M112 90q8 7 16 0" stroke="#ffafdb" strokeWidth="3" strokeLinecap="round" />
      <rect x="88" y="131" width="64" height="38" rx="15" fill="#8e63ed" stroke="#c8b5ff" strokeWidth="2" />
      <path d="M120 156l-9-8a5 5 0 0 1 9-5 5 5 0 0 1 9 5z" fill="#ffafdb" />
      <path d="M80 139l-14 13M160 139l14 13M103 172v8M137 172v8" stroke="#c8b5ff" strokeWidth="8" strokeLinecap="round" />
    </g>
  </svg>
}
