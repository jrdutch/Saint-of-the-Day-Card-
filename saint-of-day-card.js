/**
 * Saint of the Day — Lovelace Custom Card
 * https://github.com/jrdutch/saint-of-the-day-card-
 *
 * Displays the Catholic saint of the day with biography, feast type,
 * tags, a quote, and a unique SVG illustration.
 *
 * Data: catholic.org RSS feed (live), with a 35+ saint embedded fallback.
 */

// ── SVG Illustrations ─────────────────────────────────────────────────────────
const ILLUSTRATIONS = {
  marian: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="mg" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#1a3a6b"/><stop offset="100%" stop-color="#0d1f3c"/></radialGradient>
      <radialGradient id="mhalo" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#f5d78e" stop-opacity=".5"/><stop offset="100%" stop-color="#f5d78e" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="420" height="200" fill="url(#mg)"/>
    ${Array.from({length:12},(_,i)=>{const a=i*30-90,r=72,x=210+r*Math.cos(a*Math.PI/180),y=100+r*Math.sin(a*Math.PI/180);return`<polygon points="${x},${y-6} ${x+1.5},${y-2} ${x+5.5},${y-2} ${x+2.5},${y+1} ${x+3.5},${y+5} ${x},${y+2.5} ${x-3.5},${y+5} ${x-2.5},${y+1} ${x-5.5},${y-2} ${x-1.5},${y-2}" fill="#f5d78e"/>`;}).join('')}
    <ellipse cx="210" cy="100" rx="55" ry="55" fill="url(#mhalo)"/>
    <ellipse cx="210" cy="88" rx="28" ry="30" fill="#e8d0f0"/>
    <path d="M182 118 Q210 160 238 118 Q225 175 210 178 Q195 175 182 118Z" fill="#c8a8e0"/>
    <ellipse cx="210" cy="84" rx="17" ry="19" fill="#f0e0c8"/>
    <path d="M193 80 Q210 60 227 80 Q230 100 227 118 Q210 112 193 118 Q190 100 193 80Z" fill="#d4b8e0" opacity=".6"/>
    <circle cx="210" cy="82" r="23" fill="none" stroke="#f5d78e" stroke-width="1.5" opacity=".8"/>
    <line x1="210" y1="178" x2="210" y2="155" stroke="#5a8a4a" stroke-width="2"/>
    <ellipse cx="210" cy="150" rx="6" ry="10" fill="white" transform="rotate(-15,210,150)"/>
    <ellipse cx="217" cy="148" rx="5" ry="9" fill="white" transform="rotate(10,217,148)"/>
    <ellipse cx="203" cy="148" rx="5" ry="9" fill="white" transform="rotate(-40,203,148)"/>
    <text x="210" y="195" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,

  bishop: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a1a4a"/><stop offset="100%" stop-color="#1a0e30"/></linearGradient></defs>
    <rect width="420" height="200" fill="url(#bg)"/>
    <rect x="8" y="8" width="404" height="184" rx="6" fill="none" stroke="#8b6a2a" stroke-width="1" opacity=".6"/>
    <path d="M185 140 L195 80 L210 55 L225 80 L235 140Z" fill="#7a3a6a"/>
    <path d="M195 80 L210 55 L225 80" fill="none" stroke="#f5d78e" stroke-width="1.5"/>
    <line x1="185" y1="140" x2="235" y2="140" stroke="#f5d78e" stroke-width="1.5"/>
    <line x1="195" y1="115" x2="225" y2="115" stroke="#f5d78e" stroke-width="1"/>
    <line x1="210" y1="68" x2="210" y2="90" stroke="#f5d78e" stroke-width="2"/>
    <line x1="200" y1="76" x2="220" y2="76" stroke="#f5d78e" stroke-width="2"/>
    <circle cx="210" cy="100" r="3" fill="#c04040"/><circle cx="200" cy="125" r="2.5" fill="#4060c0"/><circle cx="220" cy="125" r="2.5" fill="#4060c0"/>
    <line x1="242" y1="160" x2="242" y2="70" stroke="#a07830" stroke-width="4" stroke-linecap="round"/>
    <path d="M242 70 Q242 50 255 50 Q268 50 268 63 Q268 75 255 78 Q248 80 242 78" fill="none" stroke="#a07830" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="210" cy="108" r="32" fill="none" stroke="#f5d78e" stroke-width="1" opacity=".5" stroke-dasharray="3,3"/>
    <text x="210" y="178" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,

  martyr: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="rg" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="#6b1a1a"/><stop offset="100%" stop-color="#2a0808"/></radialGradient></defs>
    <rect width="420" height="200" fill="url(#rg)"/>
    <line x1="140" y1="185" x2="180" y2="60" stroke="#4a7a2a" stroke-width="3" stroke-linecap="round"/>
    ${[-20,-10,0,10,20,30,40].map((t,i)=>`<ellipse cx="${165+i*2}" cy="${155-i*14}" rx="18" ry="6" fill="#5a8a3a" transform="rotate(${-50+t},${165+i*2},${155-i*14})" opacity="${.6+i*.06}"/>`).join('')}
    <line x1="280" y1="185" x2="240" y2="60" stroke="#4a7a2a" stroke-width="3" stroke-linecap="round"/>
    ${[-20,-10,0,10,20,30,40].map((t,i)=>`<ellipse cx="${255-i*2}" cy="${155-i*14}" rx="18" ry="6" fill="#5a8a3a" transform="rotate(${50-t},${255-i*2},${155-i*14})" opacity="${.6+i*.06}"/>`).join('')}
    <rect x="204" y="40" width="12" height="110" rx="3" fill="#d4a030"/>
    <rect x="182" y="68" width="56" height="12" rx="3" fill="#d4a030"/>
    <circle cx="210" cy="100" r="45" fill="none" stroke="#f5d78e" stroke-width="1" opacity=".4"/>
    <text x="210" y="188" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,

  apostle: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="apg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#1a3a2a"/><stop offset="100%" stop-color="#0d2018"/></linearGradient></defs>
    <rect width="420" height="200" fill="url(#apg)"/>
    <path d="M20,20 L50,20 M20,20 L20,50" stroke="#8b6a2a" stroke-width="1.5" fill="none"/>
    <path d="M400,20 L370,20 M400,20 L400,50" stroke="#8b6a2a" stroke-width="1.5" fill="none"/>
    <path d="M20,180 L50,180 M20,180 L20,150" stroke="#8b6a2a" stroke-width="1.5" fill="none"/>
    <path d="M400,180 L370,180 M400,180 L400,150" stroke="#8b6a2a" stroke-width="1.5" fill="none"/>
    <g transform="translate(185,100) rotate(-30)">
      <circle cx="0" cy="-40" r="18" fill="none" stroke="#c8a030" stroke-width="4"/>
      <circle cx="0" cy="-40" r="8" fill="none" stroke="#c8a030" stroke-width="3"/>
      <line x1="0" y1="-22" x2="0" y2="48" stroke="#c8a030" stroke-width="4" stroke-linecap="round"/>
      <line x1="0" y1="30" x2="10" y2="30" stroke="#c8a030" stroke-width="4" stroke-linecap="round"/>
      <line x1="0" y1="42" x2="10" y2="42" stroke="#c8a030" stroke-width="4" stroke-linecap="round"/>
    </g>
    <g transform="translate(235,100) rotate(30)">
      <circle cx="0" cy="-40" r="18" fill="none" stroke="#a8a8a8" stroke-width="4"/>
      <circle cx="0" cy="-40" r="8" fill="none" stroke="#a8a8a8" stroke-width="3"/>
      <line x1="0" y1="-22" x2="0" y2="48" stroke="#a8a8a8" stroke-width="4" stroke-linecap="round"/>
      <line x1="0" y1="30" x2="10" y2="30" stroke="#a8a8a8" stroke-width="4" stroke-linecap="round"/>
      <line x1="0" y1="42" x2="10" y2="42" stroke="#a8a8a8" stroke-width="4" stroke-linecap="round"/>
    </g>
    <circle cx="210" cy="95" r="38" fill="none" stroke="#f5d78e" stroke-width="1" opacity=".5"/>
    <text x="210" y="185" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,

  friar: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="frg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3a2a1a"/><stop offset="100%" stop-color="#1e1408"/></linearGradient></defs>
    <rect width="420" height="200" fill="url(#frg)"/>
    <path d="M30,185 Q210,170 390,185" fill="none" stroke="#c8a030" stroke-width="2" stroke-dasharray="8,4" opacity=".5"/>
    <path d="M175,170 Q175,100 210,70 Q245,100 245,170Z" fill="#5a3a1a"/>
    <path d="M185,170 Q185,108 210,82 Q235,108 235,170Z" fill="#6b4a2a"/>
    <ellipse cx="210" cy="118" rx="22" ry="26" fill="#e8d0b0"/>
    <circle cx="210" cy="115" r="35" fill="none" stroke="#f5d78e" stroke-width="1.5" opacity=".6"/>
    <line x1="210" y1="45" x2="210" y2="68" stroke="#c8a030" stroke-width="3" stroke-linecap="round"/>
    <line x1="196" y1="50" x2="224" y2="50" stroke="#c8a030" stroke-width="3" stroke-linecap="round"/>
    <rect x="192" y="148" width="36" height="24" rx="2" fill="#8b5a2a"/>
    <line x1="210" y1="148" x2="210" y2="172" stroke="#c8a030" stroke-width="1"/>
    <text x="210" y="188" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,

  archangel: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="argg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a2a4a"/><stop offset="100%" stop-color="#080d1e"/></linearGradient>
      <radialGradient id="arglow" cx="50%" cy="45%" r="40%"><stop offset="0%" stop-color="#c8d8ff" stop-opacity=".3"/><stop offset="100%" stop-color="#c8d8ff" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="420" height="200" fill="url(#argg)"/>
    <ellipse cx="210" cy="90" rx="80" ry="70" fill="url(#arglow)"/>
    <path d="M210,105 Q160,70 120,110 Q145,75 175,90 Q190,82 210,95Z" fill="#b8c8e8" opacity=".7"/>
    <path d="M210,105 Q155,85 125,125 Q150,90 178,100 Q193,94 210,105Z" fill="#d8e4f8" opacity=".5"/>
    <path d="M210,105 Q260,70 300,110 Q275,75 245,90 Q230,82 210,95Z" fill="#b8c8e8" opacity=".7"/>
    <path d="M210,105 Q265,85 295,125 Q270,90 242,100 Q227,94 210,105Z" fill="#d8e4f8" opacity=".5"/>
    <path d="M198,105 Q198,140 195,170 Q210,165 225,170 Q222,140 222,105Z" fill="#e8e4d8"/>
    <circle cx="210" cy="92" r="18" fill="#f0e0c8"/>
    <circle cx="210" cy="92" r="26" fill="none" stroke="#f5d78e" stroke-width="2" opacity=".8"/>
    <line x1="230" y1="60" x2="230" y2="155" stroke="#c8c8d8" stroke-width="3" stroke-linecap="round"/>
    <line x1="222" y1="95" x2="238" y2="95" stroke="#c8c8d8" stroke-width="4" stroke-linecap="round"/>
    <polygon points="230,58 227,68 233,68" fill="#e8d840"/>
    <text x="210" y="188" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,

  solemnity: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="solg" cx="50%" cy="50%" r="70%"><stop offset="0%" stop-color="#4a3000"/><stop offset="100%" stop-color="#1a1000"/></radialGradient>
      <radialGradient id="solGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#f5d78e" stop-opacity=".6"/><stop offset="100%" stop-color="#f5d78e" stop-opacity="0"/></radialGradient>
    </defs>
    <rect width="420" height="200" fill="url(#solg)"/>
    ${Array.from({length:24},(_,i)=>{const a=i*15,r1=40,r2=85,x1=210+r1*Math.cos(a*Math.PI/180),y1=95+r1*Math.sin(a*Math.PI/180),x2=210+r2*Math.cos(a*Math.PI/180),y2=95+r2*Math.sin(a*Math.PI/180);return`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#f5d78e" stroke-width="${i%2===0?1:.5}" opacity="${i%2===0?.4:.2}"/>`;}).join('')}
    <circle cx="210" cy="95" r="45" fill="url(#solGlow)"/>
    <circle cx="210" cy="95" r="32" fill="#8b6a00" opacity=".8"/>
    <circle cx="210" cy="95" r="32" fill="none" stroke="#f5d78e" stroke-width="2"/>
    <text x="210" y="103" text-anchor="middle" font-family="Georgia,serif" font-size="26" font-weight="bold" fill="#f5d78e">IHS</text>
    <line x1="210" y1="72" x2="210" y2="62" stroke="#f5d78e" stroke-width="2"/>
    <line x1="205" y1="66" x2="215" y2="66" stroke="#f5d78e" stroke-width="2"/>
    ${Array.from({length:8},(_,i)=>{const a=i*45,r=50,x=210+r*Math.cos(a*Math.PI/180),y=95+r*Math.sin(a*Math.PI/180);return`<circle cx="${x}" cy="${y}" r="2.5" fill="#f5d78e" opacity=".6"/>`;}).join('')}
    <text x="210" y="178" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,

  christmas: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="chrg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a0a2a"/><stop offset="100%" stop-color="#1a0a0a"/></linearGradient></defs>
    <rect width="420" height="200" fill="url(#chrg)"/>
    ${[[80,30],[150,20],[300,25],[360,35],[100,60],[340,55],[60,80],[380,70]].map(([x,y])=>`<polygon points="${x},${y-5} ${x+1.2},${y-1.5} ${x+5},${y-1.5} ${x+2},${y+1} ${x+3},${y+5} ${x},${y+2} ${x-3},${y+5} ${x-2},${y+1} ${x-5},${y-1.5} ${x-1.2},${y-1.5}" fill="#f5f0d0" opacity=".7"/>`).join('')}
    <polygon points="210,10 213,28 228,18 216,30 232,33 216,36 228,48 213,38 210,56 207,38 192,48 204,36 188,33 204,30 192,18 207,28" fill="#f5d030" opacity=".95"/>
    <line x1="210" y1="56" x2="210" y2="85" stroke="#f5d030" stroke-width="1.5" opacity=".5"/>
    <polygon points="120,120 210,85 300,120" fill="#3a2a1a"/>
    <rect x="175" y="135" width="70" height="30" rx="4" fill="#6a4a1a"/>
    <ellipse cx="210" cy="140" rx="20" ry="10" fill="#f0e0c8"/>
    <ellipse cx="210" cy="132" rx="10" ry="10" fill="#f0e0c8"/>
    <circle cx="210" cy="132" r="14" fill="none" stroke="#f5d78e" stroke-width="1.5" opacity=".8"/>
    <ellipse cx="160" cy="138" rx="12" ry="22" fill="#1a2a6a"/>
    <circle cx="160" cy="116" r="10" fill="#3a1a00"/>
    <ellipse cx="258" cy="135" rx="13" ry="25" fill="#2a1a00"/>
    <circle cx="258" cy="110" r="11" fill="#2a1a00"/>
    <line x1="272" y1="100" x2="258" y2="160" stroke="#4a3a1a" stroke-width="3"/>
    <text x="210" y="186" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,

  monk: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="mkg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#1a1a0a"/><stop offset="100%" stop-color="#0a0a05"/></linearGradient></defs>
    <rect width="420" height="200" fill="url(#mkg)"/>
    <rect x="10" y="10" width="400" height="180" rx="5" fill="none" stroke="#8b6a2a" stroke-width="2"/>
    ${[[30,30],[390,30],[30,170],[390,170]].map(([cx,cy])=>`<circle cx="${cx}" cy="${cy}" r="6" fill="#8b6a2a"/><circle cx="${cx}" cy="${cy}" r="3" fill="#f5d78e"/>`).join('')}
    <path d="M150,130 Q150,90 210,85 Q270,90 270,130 Q270,150 210,155 Q150,150 150,130Z" fill="#f5e8c8"/>
    <line x1="210" y1="85" x2="210" y2="155" stroke="#8b6a2a" stroke-width="1.5"/>
    ${[100,110,120,130,140].map(y=>`<line x1="160" y1="${y}" x2="206" y2="${y}" stroke="#6a4a1a" stroke-width="1" opacity=".4"/><line x1="214" y1="${y}" x2="260" y2="${y}" stroke="#6a4a1a" stroke-width="1" opacity=".4"/>`).join('')}
    <line x1="210" y1="35" x2="210" y2="78" stroke="#c8a030" stroke-width="3" stroke-linecap="round"/>
    <line x1="190" y1="50" x2="230" y2="50" stroke="#c8a030" stroke-width="3" stroke-linecap="round"/>
    <circle cx="210" cy="56" r="26" fill="none" stroke="#f5d78e" stroke-width="1" opacity=".4" stroke-dasharray="4,4"/>
    <text x="210" y="180" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,

  mystic: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="mysg" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#3a1a4a"/><stop offset="100%" stop-color="#150a20"/></radialGradient>
      <radialGradient id="mysHeart" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#e04040"/><stop offset="100%" stop-color="#801818"/></radialGradient>
    </defs>
    <rect width="420" height="200" fill="url(#mysg)"/>
    ${Array.from({length:20},(_,i)=>`<circle cx="${60+i*16}" cy="${40+Math.sin(i*0.8)*30}" r="1.5" fill="#f5d78e" opacity="${.2+i%3*.2}"/>`).join('')}
    <path d="M210,145 Q180,120 180,105 Q180,88 195,85 Q205,82 210,90 Q215,82 225,85 Q240,88 240,105 Q240,120 210,145Z" fill="url(#mysHeart)"/>
    <path d="M200,87 Q197,72 202,65 Q204,78 208,72 Q206,82 210,78 Q214,82 212,72 Q216,78 218,65 Q223,72 220,87" fill="#f5a030" opacity=".9"/>
    <line x1="210" y1="95" x2="210" y2="118" stroke="#f5d78e" stroke-width="2"/>
    <line x1="202" y1="103" x2="218" y2="103" stroke="#f5d78e" stroke-width="2"/>
    <circle cx="210" cy="112" r="24" fill="none" stroke="#6a4a1a" stroke-width="2" stroke-dasharray="3,2"/>
    <circle cx="210" cy="100" r="55" fill="none" stroke="#f5d78e" stroke-width=".5" opacity=".3"/>
    <circle cx="210" cy="100" r="48" fill="none" stroke="#f5d78e" stroke-width="1" opacity=".4"/>
    <text x="210" y="186" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,

  default: (name) => `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="defg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#2a1a0a"/><stop offset="100%" stop-color="#1a0e05"/></linearGradient></defs>
    <rect width="420" height="200" fill="url(#defg)"/>
    <rect x="12" y="12" width="396" height="176" rx="6" fill="none" stroke="#8b6a2a" stroke-width="1.5"/>
    <rect x="204" y="30" width="12" height="130" rx="4" fill="#c8a030"/>
    <rect x="170" y="68" width="80" height="14" rx="4" fill="#c8a030"/>
    <circle cx="210" cy="95" r="52" fill="none" stroke="#f5d78e" stroke-width="1" opacity=".4"/>
    ${[[210,35],[210,155],[150,95],[270,95]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="4" fill="#f5d78e" opacity=".5"/>`).join('')}
    <text x="210" y="182" text-anchor="middle" font-family="Georgia,serif" font-size="11" fill="#f5d78e" opacity=".8">${name}</text></svg>`,
};

function getIllustration(saint) {
  const t = (saint.tags || []).join(' ').toLowerCase();
  const n = (saint.name || '').toLowerCase();
  if (/christmas|nativity of our lord/.test(n))                              return ILLUSTRATIONS.christmas(saint.name);
  if (/mary|marian|virgin|assumption|immaculate|annunciation|visitation/.test(n + t)) return ILLUSTRATIONS.marian(saint.name);
  if (/archangel/.test(t + n))                                               return ILLUSTRATIONS.archangel(saint.name);
  if (/apostle/.test(t))                                                     return ILLUSTRATIONS.apostle(saint.name);
  if (/martyr/.test(t))                                                      return ILLUSTRATIONS.martyr(saint.name);
  if (/mystic|carmelite/.test(t + n))                                        return ILLUSTRATIONS.mystic(saint.name);
  if (/friar|franciscan/.test(t + n))                                        return ILLUSTRATIONS.friar(saint.name);
  if (/monk|abbot|benedic/.test(t + n))                                      return ILLUSTRATIONS.monk(saint.name);
  if (/bishop|doctor|theologian|pope/.test(t))                               return ILLUSTRATIONS.bishop(saint.name);
  if (/solemnity/.test(t))                                                   return ILLUSTRATIONS.solemnity(saint.name);
  return ILLUSTRATIONS.default(saint.name);
}

// ── Easter & liturgical season ────────────────────────────────────────────────
function getEaster(year) {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mo = Math.floor((h + l - 7 * m + 114) / 31);
  const dy = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, mo - 1, dy);
}

// hF=headerFrom, hT=headerTo, ac=accent, tBg=tagBg, tBo=tagBorder, tTx=tagText,
// qBg=quoteBg, qBo=quoteBorder, qTx=quoteText, div=divider, fBg=footerBg
// tBg/tBo/tTx/qBg/qTx use rgba so they work on transparent card backgrounds.
// tTx/qTx fall back to HA's primary-text-color so they're readable in any theme.
const THEMES = {
  ordinary:  { hF:'#1a5c2e', hT:'#0d3d1e', ac:'#1a6b35', tBg:'rgba(26,107,53,.14)', tBo:'rgba(26,107,53,.35)', qBg:'rgba(26,107,53,.08)', qBo:'#2a8a4a', div:'rgba(26,107,53,.2)' },
  advent:    { hF:'#4a1a6b', hT:'#280a40', ac:'#7a3aab', tBg:'rgba(122,58,171,.14)', tBo:'rgba(122,58,171,.35)', qBg:'rgba(122,58,171,.08)', qBo:'#7a3aab', div:'rgba(122,58,171,.2)' },
  christmas: { hF:'#7a5a00', hT:'#402e00', ac:'#a07820', tBg:'rgba(160,120,32,.14)', tBo:'rgba(160,120,32,.35)', qBg:'rgba(160,120,32,.08)', qBo:'#a07820', div:'rgba(160,120,32,.2)' },
  lent:      { hF:'#4a1a6b', hT:'#280a40', ac:'#7a3aab', tBg:'rgba(122,58,171,.14)', tBo:'rgba(122,58,171,.35)', qBg:'rgba(122,58,171,.08)', qBo:'#7a3aab', div:'rgba(122,58,171,.2)' },
  easter:    { hF:'#7a6000', hT:'#402e00', ac:'#b09020', tBg:'rgba(176,144,32,.14)', tBo:'rgba(176,144,32,.35)', qBg:'rgba(176,144,32,.08)', qBo:'#b09020', div:'rgba(176,144,32,.2)' },
  martyr:    { hF:'#8b1a1a', hT:'#4a0808', ac:'#c04040', tBg:'rgba(192,64,64,.14)', tBo:'rgba(192,64,64,.35)', qBg:'rgba(192,64,64,.08)', qBo:'#c04040', div:'rgba(192,64,64,.2)' },
  virgin:    { hF:'#4a4838', hT:'#2a2820', ac:'#7a7060', tBg:'rgba(122,112,96,.14)', tBo:'rgba(122,112,96,.35)', qBg:'rgba(122,112,96,.08)', qBo:'#a8a098', div:'rgba(122,112,96,.2)' },
  marian:    { hF:'#1a2a8b', hT:'#0d1660', ac:'#3050c0', tBg:'rgba(48,80,192,.14)', tBo:'rgba(48,80,192,.35)', qBg:'rgba(48,80,192,.08)', qBo:'#3050c0', div:'rgba(48,80,192,.2)' },
};

function getLiturgicalTheme(saint) {
  const tags = (saint.tags || []).join(' ').toLowerCase();
  const name = (saint.name || '').toLowerCase();

  // Feast-specific overrides take priority over season
  if (/\bmartyrs?\b/.test(tags)) return THEMES.martyr;
  if (/\bvirgins?\b/.test(tags)) return THEMES.virgin;
  if (/blessed virgin|our lady|marian/.test(tags) ||
      /our lady|immaculate|assumption|annunciation|nativity of.*mary|visitation/.test(name))
    return THEMES.marian;

  // Calculate season
  const now = new Date();
  const yr = now.getFullYear();
  const today = new Date(yr, now.getMonth(), now.getDate());
  const easter = getEaster(yr);
  const eD = new Date(easter.getFullYear(), easter.getMonth(), easter.getDate());
  const ashWed = new Date(eD); ashWed.setDate(eD.getDate() - 46);
  const pentecost = new Date(eD); pentecost.setDate(eD.getDate() + 49);

  if (today >= ashWed && today < eD) return THEMES.lent;
  if (today >= eD && today <= pentecost) return THEMES.easter;

  const dec25 = new Date(yr, 11, 25);
  const jan6dow = new Date(yr, 0, 6).getDay();
  const baptism = new Date(yr, 0, jan6dow === 0 ? 13 : 6 + (7 - jan6dow));
  if (today >= dec25 || (today.getMonth() < 2 && today <= baptism)) return THEMES.christmas;

  const dec25dow = dec25.getDay();
  const adventStart = new Date(yr, 11, 25 - (dec25dow === 0 ? 28 : dec25dow + 21));
  if (today >= adventStart) return THEMES.advent;

  return THEMES.ordinary;
}

// ── Embedded saint data ───────────────────────────────────────────────────────
const SAINTS = {
  '01-01': { name:'Mary, Mother of God', feast:'Solemnity', tags:['Solemnity','Blessed Virgin Mary','Holy Day of Obligation'], bio:'January 1st honors Mary as the Mother of God (Theotokos), proclaimed at the Council of Ephesus in 431 AD. This is the oldest Marian feast in the Western Church, celebrating her unique role as the mother of Jesus Christ.', quote:'My soul magnifies the Lord, and my spirit rejoices in God my Savior.', quoteSource:'Luke 1:46–47', url:'https://en.wikipedia.org/wiki/Mary,_mother_of_Jesus' },
  '01-17': { name:'Saint Anthony the Great', feast:'Memorial', tags:['Desert Father','Monk','Abbot'], bio:'Anthony (251–356 AD) was an Egyptian Christian monk known as the "Father of Monasticism." He withdrew into the desert and is said to have lived to 105 years old, inspiring countless monastic communities.', quote:'Humility is the foundation of all the other virtues.', quoteSource:'St. Anthony the Great', url:'https://en.wikipedia.org/wiki/Anthony_the_Great' },
  '01-24': { name:'Saint Francis de Sales', feast:'Memorial', tags:['Bishop','Doctor of the Church','Writer'], bio:'Francis de Sales (1567–1622) was the Bishop of Geneva and a prolific spiritual writer. His "Introduction to the Devout Life" remains a beloved guide to holiness for lay people. He is the patron saint of writers and journalists.', quote:'Nothing is so strong as gentleness, nothing so gentle as real strength.', quoteSource:'St. Francis de Sales', url:'https://en.wikipedia.org/wiki/Francis_de_Sales' },
  '01-28': { name:'Saint Thomas Aquinas', feast:'Memorial', tags:['Doctor of the Church','Friar','Theologian'], bio:'Thomas Aquinas (1225–1274) was an Italian Dominican friar whose "Summa Theologiae" synthesized Christian theology with Aristotelian philosophy. He is the patron saint of students and universities.', quote:'The things that we love tell us what we are.', quoteSource:'St. Thomas Aquinas', url:'https://en.wikipedia.org/wiki/Thomas_Aquinas' },
  '02-14': { name:'Saints Cyril and Methodius', feast:'Feast Day', tags:['Apostles to the Slavs','Missionaries','Doctors of the Church'], bio:'Cyril (826–869) and Methodius (815–885) were Greek brothers who evangelized the Slavic peoples. Cyril created the Glagolitic alphabet so scripture could be translated into the Slavic language. They are co-patrons of Europe.', quote:'Among peoples there is only one God, one faith, one baptism.', quoteSource:'St. Cyril', url:'https://en.wikipedia.org/wiki/Saints_Cyril_and_Methodius' },
  '03-17': { name:'Saint Patrick', feast:'Feast Day', tags:['Bishop','Patron of Ireland','Missionary'], bio:'Patrick (385–461 AD) was kidnapped into Irish slavery at 16. After escaping, he returned as a missionary, converting thousands, ordaining priests, and establishing the Church throughout Ireland.', quote:'Christ with me, Christ before me, Christ behind me, Christ in me.', quoteSource:"St. Patrick's Breastplate", url:'https://en.wikipedia.org/wiki/Saint_Patrick' },
  '03-19': { name:'Saint Joseph', feast:'Solemnity', tags:['Solemnity','Patron of the Universal Church','Worker'], bio:'Joseph was the husband of the Virgin Mary and foster father of Jesus Christ. A carpenter from Nazareth, he protected the Holy Family and raised Jesus with great love. He is patron of the Universal Church, workers, and fathers.', quote:'Joseph did as the angel of the Lord commanded him.', quoteSource:'Matthew 1:24', url:'https://en.wikipedia.org/wiki/Saint_Joseph' },
  '03-25': { name:'Annunciation of the Lord', feast:'Solemnity', tags:['Solemnity','Blessed Virgin Mary','Incarnation'], bio:"The Annunciation celebrates the angel Gabriel's announcement to Mary that she would conceive the Son of God. Mary's \"fiat\" marks the moment of the Incarnation, nine months before Christmas.", quote:'Behold, I am the handmaid of the Lord. Let it be done to me according to your word.', quoteSource:'Luke 1:38', url:'https://en.wikipedia.org/wiki/Annunciation' },
  '04-23': { name:'Saint George', feast:'Optional Memorial', tags:['Martyr','Patron of England','Soldier'], bio:'George (died c. 303 AD) was a Roman soldier who refused to renounce his faith under Emperor Diocletian and was martyred. He is patron of England, Georgia, Portugal, and many other nations.', quote:'I am a Christian, and I will not deny my faith.', quoteSource:'St. George (traditional)', url:'https://en.wikipedia.org/wiki/Saint_George' },
  '04-29': { name:'Saint Catherine of Siena', feast:'Feast Day', tags:['Doctor of the Church','Dominican','Mystic'], bio:'Catherine of Siena (1347–1380) was a Dominican mystic and Doctor of the Church. Her letters urging Pope Gregory XI to return from Avignon helped end the Avignon papacy. She cared for the poor and received the stigmata.', quote:'Be who God meant you to be and you will set the world on fire.', quoteSource:'St. Catherine of Siena', url:'https://en.wikipedia.org/wiki/Catherine_of_Siena' },
  '06-13': { name:'Saint Anthony of Padua', feast:'Memorial', tags:['Doctor of the Church','Friar','Patron of Lost Things'], bio:'Anthony of Padua (1195–1231) was a Portuguese Franciscan friar renowned for preaching and care for the poor. He is the patron of lost things and was proclaimed a Doctor of the Church within a year of his death.', quote:'Actions speak louder than words; let your words teach and your actions speak.', quoteSource:'St. Anthony of Padua', url:'https://en.wikipedia.org/wiki/Anthony_of_Padua' },
  '06-21': { name:'Saint Aloysius Gonzaga', feast:'Memorial', tags:['Jesuit','Patron of Youth'], bio:'Aloysius Gonzaga (1568–1591) renounced his title to join the Jesuits and died at 23 caring for plague victims. He is the patron saint of youth and Catholic students.', quote:'I am a piece of crooked iron and I came into religion to be made straight by the hammer of penance.', quoteSource:'St. Aloysius Gonzaga', url:'https://en.wikipedia.org/wiki/Aloysius_Gonzaga' },
  '06-24': { name:'Birth of Saint John the Baptist', feast:'Solemnity', tags:['Solemnity','Prophet','Forerunner of Christ'], bio:'John the Baptist was the forerunner of Jesus Christ. Born miraculously to Elizabeth and Zechariah, he baptized Jesus in the Jordan. He is the only saint besides Mary whose birth is celebrated as a Solemnity.', quote:'He must increase, but I must decrease.', quoteSource:'John 3:30', url:'https://en.wikipedia.org/wiki/John_the_Baptist' },
  '06-27': { name:'Saint Cyril of Alexandria', feast:'Memorial', tags:['Bishop','Doctor of the Church','Theologian'], bio:'Cyril of Alexandria (376–444 AD) was Archbishop of Alexandria and one of the most important early Church theologians. He championed the title "Theotokos" for Mary at the Council of Ephesus in 431, defending the unity of Christ\'s divine and human natures.', quote:'We confess our Lord Jesus Christ, the only begotten Son of God, perfect God and perfect man.', quoteSource:'St. Cyril of Alexandria', url:'https://en.wikipedia.org/wiki/Cyril_of_Alexandria' },
  '06-28': { name:'Saint Irenaeus', feast:'Memorial', tags:['Bishop','Doctor of the Church','Martyr'], bio:'Irenaeus (c. 130–202 AD) was Bishop of Lyon and an early Church Father who combated Gnostic heresies. His "Against Heresies" is one of the earliest expositions of Christian theology.', quote:'The glory of God is man fully alive, and the life of man is the vision of God.', quoteSource:'St. Irenaeus', url:'https://en.wikipedia.org/wiki/Irenaeus' },
  '06-29': { name:'Saints Peter and Paul', feast:'Solemnity', tags:['Solemnity','Apostles','Martyrs'], bio:'This solemnity celebrates Peter the fisherman, first Pope, and Paul the great missionary. Both were martyred in Rome under Nero. Together they represent the twin pillars of the Catholic Church.', quote:'You are the Christ, the Son of the living God.', quoteSource:'Matthew 16:16', url:'https://en.wikipedia.org/wiki/Feast_of_Saints_Peter_and_Paul' },
  '07-11': { name:'Saint Benedict', feast:'Feast Day', tags:['Monk','Abbot','Patron of Europe'], bio:'Benedict of Nursia (480–547 AD) founded Western monasticism. His Rule, emphasizing prayer and work ("Ora et Labora"), shaped European civilization for centuries. He is the patron of Europe.', quote:'Prefer nothing whatever to Christ, and may he lead us all together to everlasting life.', quoteSource:'St. Benedict, The Rule', url:'https://en.wikipedia.org/wiki/Benedict_of_Nursia' },
  '07-22': { name:'Saint Mary Magdalene', feast:'Feast Day', tags:['Apostle to the Apostles','Disciple','Martyr'], bio:'Mary Magdalene was the first witness of the Resurrection, earning the title "Apostle to the Apostles." She remained at the Cross when most apostles fled. Pope Francis elevated her feast to Feast Day in 2016.', quote:'I have seen the Lord!', quoteSource:'John 20:18', url:'https://en.wikipedia.org/wiki/Mary_Magdalene' },
  '07-25': { name:'Saint James the Apostle', feast:'Feast Day', tags:['Apostle','Martyr','Patron of Spain'], bio:'James, son of Zebedee, was the first apostle martyred, executed by Herod Agrippa around 44 AD. His tomb at Santiago de Compostela became one of the greatest medieval pilgrimage destinations.', quote:'Lord, we will drink the cup you drink.', quoteSource:'Mark 10:39', url:'https://en.wikipedia.org/wiki/James,_son_of_Zebedee' },
  '08-10': { name:'Saint Lawrence', feast:'Feast Day', tags:['Deacon','Martyr','Patron of the Poor'], bio:'Lawrence (225–258 AD) was a deacon of Rome who, when ordered to surrender Church treasures, presented the poor saying "These are the treasures of the Church." He was martyred by roasting under Emperor Valerian.', quote:'The Church is truly rich, far richer than your emperor.', quoteSource:'St. Lawrence (traditional)', url:'https://en.wikipedia.org/wiki/Saint_Lawrence' },
  '08-15': { name:'Assumption of the Blessed Virgin Mary', feast:'Solemnity', tags:['Solemnity','Blessed Virgin Mary','Holy Day of Obligation'], bio:'The Assumption celebrates Mary being taken body and soul into heavenly glory. Defined as dogma by Pope Pius XII in 1950, it is one of the most ancient Marian feasts and a Holy Day of Obligation.', quote:'For he who is mighty has done great things for me, and holy is his name.', quoteSource:'Luke 1:49', url:'https://en.wikipedia.org/wiki/Assumption_of_Mary' },
  '08-28': { name:'Saint Augustine of Hippo', feast:'Memorial', tags:['Bishop','Doctor of the Church','Theologian'], bio:'Augustine (354–430 AD) is one of the greatest theologians in history. His "Confessions" and "City of God" remain masterpieces of world literature. He converted after years of searching and the prayers of his mother, Saint Monica.', quote:'Our heart is restless until it finds its rest in Thee.', quoteSource:'St. Augustine, Confessions', url:'https://en.wikipedia.org/wiki/Augustine_of_Hippo' },
  '09-08': { name:'Nativity of the Blessed Virgin Mary', feast:'Feast Day', tags:['Feast Day','Blessed Virgin Mary','Marian'], bio:"This feast celebrates the birth of the Virgin Mary, observed nine months after her Immaculate Conception. Mary's birth has been celebrated since the 7th century as the dawn before the Sunrise of salvation.", quote:'Blessed are you among women, and blessed is the fruit of your womb.', quoteSource:'Luke 1:42', url:'https://en.wikipedia.org/wiki/Nativity_of_Mary' },
  '09-29': { name:'Sts. Michael, Gabriel & Raphael', feast:'Feast Day', tags:['Archangels','Feast Day'], bio:"Michaelmas honors three archangels: Michael the warrior, Gabriel the messenger who announced the Incarnation to Mary, and Raphael the healer. Together they represent God's protection, communication, and healing.", quote:'Behold, I send an angel before you to guard you on the way.', quoteSource:'Exodus 23:20', url:'https://en.wikipedia.org/wiki/Archangel' },
  '10-01': { name:'Saint Thérèse of Lisieux', feast:'Memorial', tags:['Doctor of the Church','Carmelite','Mystic'], bio:'Thérèse Martin (1873–1897) entered Carmel at 15 and died at 24. Her "Little Way" of doing small things with great love became one of the most influential spiritual paths in modern Catholicism. She is a Doctor of the Church.', quote:'Miss no single opportunity of making some small sacrifice, here by a smiling look, there by a kindly word.', quoteSource:'St. Thérèse of Lisieux', url:'https://en.wikipedia.org/wiki/Th%C3%A9r%C3%A8se_of_Lisieux' },
  '10-04': { name:'Saint Francis of Assisi', feast:'Memorial', tags:['Friar','Patron of Animals and Ecology'], bio:'Francis of Assisi (1181–1226) renounced wealth to live in radical poverty. He founded the Franciscan Order, received the stigmata, and composed the "Canticle of the Sun." He is patron of animals and ecology.', quote:'Lord, make me an instrument of your peace. Where there is hatred, let me sow love.', quoteSource:'Peace Prayer of St. Francis', url:'https://en.wikipedia.org/wiki/Francis_of_Assisi' },
  '10-07': { name:'Our Lady of the Rosary', feast:'Memorial', tags:['Memorial','Blessed Virgin Mary','Marian'], bio:"Established after the Christian victory at Lepanto (October 7, 1571), this feast honors Mary as Our Lady of the Rosary. Meditating on the mysteries of Christ's life through repeated prayers is one of the most beloved Catholic devotions.", quote:'The Rosary is the most excellent form of prayer.', quoteSource:'Pope Leo XIII', url:'https://en.wikipedia.org/wiki/Our_Lady_of_the_Rosary' },
  '10-15': { name:'Saint Teresa of Ávila', feast:'Memorial', tags:['Doctor of the Church','Carmelite','Mystic'], bio:'Teresa of Ávila (1515–1582) was a Spanish Carmelite mystic and reformer. "The Interior Castle" and "The Way of Perfection" are masterpieces of mystical theology. She was the first woman proclaimed Doctor of the Church.', quote:'The important thing is not to think much but to love much.', quoteSource:'St. Teresa of Ávila', url:'https://en.wikipedia.org/wiki/Teresa_of_%C3%81vila' },
  '11-01': { name:"All Saints' Day", feast:'Solemnity', tags:['Solemnity','Holy Day of Obligation','All Saints'], bio:"All Saints' Day honors every saint — known and unknown — who have attained heavenly glory. This solemnity affirms the Church's belief in the Communion of Saints and the universal call to holiness.", quote:'Blessed are the pure in heart, for they shall see God.', quoteSource:'Matthew 5:8', url:"https://en.wikipedia.org/wiki/All_Saints'_Day" },
  '11-02': { name:"All Souls' Day", feast:'Commemoration', tags:['Commemoration','Prayer for the Dead'], bio:"All Souls' Day commemorates all the faithful departed, especially those in purgatory. The Church encourages prayer, Masses, and almsgiving for the dead. Established by St. Odilo of Cluny in 998.", quote:'It is a holy and wholesome thought to pray for the dead.', quoteSource:'2 Maccabees 12:46', url:"https://en.wikipedia.org/wiki/All_Souls'_Day" },
  '11-30': { name:'Saint Andrew', feast:'Feast Day', tags:['Apostle','Martyr','Patron of Scotland and Greece'], bio:"Andrew was Simon Peter's brother and among the first disciples called by Jesus. He was martyred on an X-shaped cross in Patras — now called the Cross of Saint Andrew. He is patron of Scotland and Greece.", quote:'We have found the Messiah.', quoteSource:'John 1:41', url:'https://en.wikipedia.org/wiki/Andrew_the_Apostle' },
  '12-03': { name:'Saint Francis Xavier', feast:'Memorial', tags:['Jesuit','Missionary','Patron of Missions','Martyr'], bio:'Francis Xavier (1506–1552) was a Spanish Jesuit co-founder of the Society of Jesus. He brought Christianity to India, Southeast Asia, and Japan, baptizing tens of thousands. He is the patron of missionaries.', quote:'It is not the actual physical exertion that counts, but the spirit of faith with which it is undertaken.', quoteSource:'St. Francis Xavier', url:'https://en.wikipedia.org/wiki/Francis_Xavier' },
  '12-08': { name:'Immaculate Conception', feast:'Solemnity', tags:['Solemnity','Blessed Virgin Mary','Holy Day of Obligation'], bio:'The Immaculate Conception holds that Mary was preserved from original sin from the first moment of her conception. Defined as dogma by Pope Pius IX in 1854, it is the patronal feast of the United States.', quote:'Hail, full of grace, the Lord is with you.', quoteSource:'Luke 1:28', url:'https://en.wikipedia.org/wiki/Immaculate_Conception' },
  '12-12': { name:'Our Lady of Guadalupe', feast:'Feast Day', tags:['Feast Day','Blessed Virgin Mary','Patron of the Americas'], bio:'In 1531 the Virgin Mary appeared to Saint Juan Diego and left her image on his cloak. She is Patron of the Americas and is venerated at the Basilica of Guadalupe, the most visited Catholic shrine in the world.', quote:'Am I not here, I who am your Mother?', quoteSource:'Our Lady of Guadalupe to Juan Diego', url:'https://en.wikipedia.org/wiki/Our_Lady_of_Guadalupe' },
  '12-25': { name:'Nativity of Our Lord Jesus Christ', feast:'Solemnity – Christmas', tags:['Solemnity','Holy Day of Obligation','Christmas'], bio:'Christmas commemorates the birth of Jesus Christ in Bethlehem, the fulfillment of centuries of prophecy. The eternal Son of God became human through the Virgin Mary — the Incarnation at the heart of the Christian faith.', quote:'For unto you is born this day in the city of David a Savior, who is Christ the Lord.', quoteSource:'Luke 2:11', url:'https://en.wikipedia.org/wiki/Christmas' },
  '12-26': { name:'Saint Stephen', feast:'Feast Day', tags:['Deacon','Martyr','Protomartyr'], bio:'Stephen was the first Christian martyr, stoned to death in Jerusalem. As he died he prayed for his killers, echoing Christ on the Cross. The young Saul of Tarsus — later St. Paul — witnessed the stoning.', quote:'Lord Jesus, receive my spirit. Lord, do not hold this sin against them.', quoteSource:'Acts 7:59–60', url:'https://en.wikipedia.org/wiki/Saint_Stephen' },
  '12-27': { name:'Saint John the Apostle', feast:'Feast Day', tags:['Apostle','Evangelist','Beloved Disciple'], bio:"John was Jesus' Beloved Disciple and the only apostle to remain at the foot of the Cross. He wrote the Fourth Gospel, three Epistles, and the Book of Revelation, and is the only apostle believed to have died of natural causes.", quote:'God so loved the world that he gave his only Son, that everyone who believes in him might have eternal life.', quoteSource:'John 3:16', url:'https://en.wikipedia.org/wiki/John_the_Apostle' },
};

// ── Card styles ───────────────────────────────────────────────────────────────
const CARD_CSS = `
  :host {
    display: block;
    --lit-hF: #6b3a2a; --lit-hT: #a0622a; --lit-ac: #8b4e32;
    --lit-tBg: rgba(139,78,50,.12); --lit-tBo: rgba(139,78,50,.3); --lit-tTx: var(--primary-text-color, #3a1f0e);
    --lit-qBg: rgba(139,78,50,.07); --lit-qBo: #8b4e32; --lit-qTx: var(--primary-text-color, #5a3520);
    --lit-div: var(--divider-color, rgba(0,0,0,.12)); --lit-fBg: transparent;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  /* ha-card is the element HA themes target — it gets background, border-radius,
     box-shadow, and backdrop-filter (frosted glass) from the active theme. */
  ha-card {
    font-family: Georgia, 'Times New Roman', serif;
    overflow: hidden;
    display: block;
  }
  .card-header {
    background: linear-gradient(135deg, var(--lit-hF) 0%, var(--lit-hT) 100%);
    padding: .9rem 1.25rem .75rem; display: flex; align-items: center; gap: .6rem;
    border-bottom: 2px solid #c9a227;
  }
  .card-header-icon { font-size: 1rem; color: #f5d78e; flex-shrink: 0; }
  .card-label { font-size: .66rem; font-family: Arial, sans-serif; letter-spacing: .12em; text-transform: uppercase; color: #f5d78e; opacity: .85; }
  .card-date { font-size: .8rem; color: #fff; margin-top: .1rem; font-family: Arial, sans-serif; }
  .card-image-wrap { position: relative; height: 190px; overflow: hidden; }
  .card-image-wrap svg { width: 100%; height: 100%; display: block; }
  /* Bias the crop toward the top so faces in portrait paintings stay in frame */
  .card-image-wrap img { width: 100%; height: 100%; object-fit: cover; object-position: center 20%; display: block; }
  /* Dissolve the photo's base into the card instead of ending in a hard edge */
  .card-image-wrap::after {
    content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 44px;
    background: linear-gradient(to bottom, transparent, var(--ha-card-background, var(--card-background-color, #fff)));
    pointer-events: none;
  }
  .card-body { padding: .9rem 1.1rem 1.1rem; }
  .card-name { font-size: 1.3rem; color: var(--primary-text-color, #3a1f0e); line-height: 1.2; margin-bottom: .2rem; }
  .card-feast { font-size: .85rem; font-family: Georgia, serif; font-variant: small-caps; color: var(--lit-ac); letter-spacing: .14em; margin-bottom: .75rem; }
  .card-divider { display: flex; align-items: center; gap: .6rem; border: none; margin-bottom: .75rem; }
  .card-divider::before, .card-divider::after { content: ''; flex: 1; height: 1px; }
  .card-divider::before { background: linear-gradient(to right, transparent, var(--lit-div)); }
  .card-divider::after { background: linear-gradient(to left, transparent, var(--lit-div)); }
  .card-divider span { color: var(--lit-ac); font-size: .8rem; line-height: 1; opacity: .7; }
  .card-tags { display: flex; flex-wrap: wrap; gap: .3rem; margin-bottom: .75rem; }
  .card-tag { font-size: .7rem; font-family: Arial, sans-serif; background: var(--lit-tBg); color: var(--primary-text-color, #3a1f0e); border: 1px solid var(--lit-tBo); border-radius: 20px; padding: .18rem .5rem; }
  .card-bio { font-size: .85rem; color: var(--secondary-text-color, #4a3020); line-height: 1.6; margin-bottom: .9rem; }
  .card-quote { position: relative; background: var(--lit-qBg); border-left: 3px solid var(--lit-qBo); border-radius: 0 8px 8px 0; padding: .6rem .85rem .6rem 2.3rem; margin-bottom: .9rem; display: none; }
  .card-quote::before { content: '\\201C'; position: absolute; left: .55rem; top: -.05rem; font-family: Georgia, serif; font-size: 2.3rem; line-height: 1; color: var(--lit-ac); opacity: .35; }
  .card-quote.show { display: block; }
  .card-quote p { font-size: .8rem; color: var(--primary-text-color, #5a3520); font-style: italic; line-height: 1.5; opacity: .9; }
  .card-quote cite { display: block; margin-top: .3rem; font-size: .7rem; font-family: Arial, sans-serif; color: var(--lit-ac); font-style: normal; opacity: .8; }
  .card-footer { display: flex; align-items: center; justify-content: space-between; padding: .6rem 1.1rem .8rem; border-top: 1px solid var(--lit-div); background: var(--lit-fBg); }
  .card-source { font-size: .72rem; font-family: Arial, sans-serif; color: var(--secondary-text-color, #9a7850); opacity: .8; }
  .card-link { font-size: .72rem; font-family: Arial, sans-serif; color: var(--lit-ac); text-decoration: none; border: 1px solid var(--lit-ac); border-radius: 20px; padding: .25rem .7rem; transition: background .2s, color .2s; opacity: .85; }
  .card-link:hover { background: var(--lit-ac); color: #fff; opacity: 1; }
  .shimmer { background: linear-gradient(90deg, var(--secondary-background-color,#e8dcc8) 25%, var(--card-background-color,#f5ede0) 50%, var(--secondary-background-color,#e8dcc8) 75%); background-size: 200% 100%; animation: shimmer 1.4s infinite; border-radius: 4px; color: transparent !important; }
  @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
`;

// ── Card HTML template ────────────────────────────────────────────────────────
const CARD_HTML = `
  <ha-card>
    <div class="card-header">
      <span class="card-header-icon">✝</span>
      <div>
        <div class="card-label">Catholic Saint of the Day</div>
        <div class="card-date" id="date"></div>
      </div>
    </div>
    <div class="card-image-wrap" id="illustration"></div>
    <div class="card-body">
      <h2 class="card-name shimmer" id="name" style="height:1.5rem;width:70%">&nbsp;</h2>
      <p class="card-feast shimmer" id="feast" style="height:.85rem;width:40%;margin-bottom:.75rem">&nbsp;</p>
      <div class="card-divider"><span>✠</span></div>
      <div class="card-tags" id="tags"></div>
      <p class="card-bio shimmer" id="bio" style="height:4.5rem;width:100%">&nbsp;</p>
      <blockquote class="card-quote" id="quote">
        <p id="quote-text"></p>
        <cite id="quote-source"></cite>
      </blockquote>
    </div>
    <div class="card-footer">
      <span class="card-source" id="source-label">Roman Catholic Calendar</span>
      <a class="card-link" id="link" href="https://www.catholic.org/saints/" target="_blank" rel="noopener">Learn More →</a>
    </div>
  </ha-card>
`;

// ── RSS parser ────────────────────────────────────────────────────────────────
function parseRSS(xml) {
  const doc = new DOMParser().parseFromString(xml, 'application/xml');
  if (doc.querySelector('parsererror')) return null;
  const items = Array.from(doc.getElementsByTagName('item'));
  if (!items.length) return null;

  // Prefer the item published today; otherwise accept the newest item only if
  // it is fresh (< 36h old) so a dead feed never shows a stale saint.
  const now = new Date();
  const pubOf = it => new Date(it.getElementsByTagName('pubDate')[0]?.textContent || '');
  const sameDay = d => !isNaN(d) && d.getFullYear() === now.getFullYear() &&
                       d.getMonth() === now.getMonth() && d.getDate() === now.getDate();
  let item = items.find(it => sameDay(pubOf(it)));
  if (!item) {
    const pd = pubOf(items[0]);
    if (isNaN(pd) || now - pd > 36 * 3600 * 1000) return null;
    item = items[0];
  }

  // getElementsByTagName handles the media: namespace reliably; querySelector doesn't.
  const g = tag => item.getElementsByTagName(tag)[0]?.textContent?.trim() || '';
  const title = g('title');
  if (!title) return null;
  const link = g('link') || 'https://www.catholic.org/saints/';

  let imageUrl = item.getElementsByTagName('media:content')[0]?.getAttribute('url') || '';
  const tmp = document.createElement('div');
  tmp.innerHTML = g('description');
  if (!imageUrl) imageUrl = tmp.querySelector('img')?.src || '';
  tmp.querySelectorAll('img').forEach(el => el.remove());
  const bio = tmp.textContent.replace(/\s+/g, ' ').trim();

  return { name: title, feast: 'Feast Day', tags: ['Catholic', 'Saint of the Day'], bio: bio || 'Visit the link below to read the full biography.', url: link, imageUrl, source: 'uCatholic' };
}

// rss.app serves the XML without CORS headers, so a direct browser fetch is
// blocked. Try direct first (in case that changes), then CORS-friendly relays.
const FEED_URL = 'https://rss.app/feeds/1tWSQDMDaOnerbi9.xml';
const FEED_ATTEMPTS = [
  FEED_URL,
  'https://api.allorigins.win/raw?url=' + encodeURIComponent(FEED_URL),
  'https://corsproxy.io/?url=' + encodeURIComponent(FEED_URL),
];

async function fetchSaint() {
  for (const url of FEED_ATTEMPTS) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(7000) });
      if (!r.ok) continue;
      const saint = parseRSS(await r.text());
      if (saint) return saint;
    } catch (_) { /* try next */ }
  }
  return null;
}

function todayKey() {
  const d = new Date();
  return String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

// ── Custom Element ────────────────────────────────────────────────────────────
class SaintOfDayCard extends HTMLElement {

  // No getConfigElement: the card takes no options, so HA falls back to its
  // built-in YAML editor instead of a broken visual editor.
  static getStubConfig() {
    return {};
  }

  setConfig(config) {
    this._config = config;
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    this.shadowRoot.innerHTML = `<style>${CARD_CSS}</style>${CARD_HTML}`;
    this._$ = id => this.shadowRoot.getElementById(id);
    this._loaded = false;
    this._init();
  }

  set hass(_hass) {
    // No HA state needed; load data once on first hass set
    if (!this._loaded) {
      this._loaded = true;
      this._load();
    }
  }

  getCardSize() { return 7; }

  _init() {
    this._$('date').textContent = new Date().toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    });
  }

  async _load() {
    let saint = null;
    const CACHE_KEY = 'saint-of-day-card-cache';

    saint = await fetchSaint();

    if (saint) {
      try { localStorage.setItem(CACHE_KEY, JSON.stringify({ key: todayKey(), saint })); } catch (_) {}
    } else {
      // Feed unreachable — reuse today's earlier successful fetch if we have one.
      try {
        const c = JSON.parse(localStorage.getItem(CACHE_KEY));
        if (c && c.key === todayKey()) saint = c.saint;
      } catch (_) {}
    }

    // RSS returns only generic metadata — enrich from the curated dataset so
    // liturgical colors (martyr, virgin, marian), the true feast rank, and a
    // quote all survive regardless of data source.
    const embedded = SAINTS[todayKey()];
    if (saint && embedded) {
      saint.tags = embedded.tags;
      saint.feast = embedded.feast;
      if (!saint.quote) { saint.quote = embedded.quote; saint.quoteSource = embedded.quoteSource; }
    }

    if (!saint) {
      saint = embedded || {
        name: 'Saints of the Roman Calendar', feast: 'Feast Day',
        tags: ['Catholic', 'Holy Men and Women'],
        bio: "The Church honors saints every day of the year — holy men and women who bore witness to Christ through heroic virtue. Visit catholic.org to discover today's saint.",
        quote: 'To be a saint is not a luxury but a necessity.', quoteSource: 'Pope St. John Paul II',
        url: 'https://www.catholic.org/saints/', source: 'Roman Catholic Calendar',
      };
    }

    this._render(saint);
  }

  _applyTheme(t) {
    const h = this;
    h.style.setProperty('--lit-hF', t.hF);
    h.style.setProperty('--lit-hT', t.hT);
    h.style.setProperty('--lit-ac', t.ac);
    h.style.setProperty('--lit-tBg', t.tBg);
    h.style.setProperty('--lit-tBo', t.tBo);
    h.style.setProperty('--lit-qBg', t.qBg);
    h.style.setProperty('--lit-qBo', t.qBo);
    h.style.setProperty('--lit-div', t.div);
  }

  _render(s) {
    const $ = this._$;

    this._applyTheme(getLiturgicalTheme(s));

    ['name', 'feast', 'bio'].forEach(id => {
      const el = $(id);
      el.classList.remove('shimmer');
      el.removeAttribute('style');
    });

    $('name').textContent  = s.name;
    $('feast').textContent = s.feast;
    $('bio').textContent   = s.bio;

    $('tags').innerHTML = (s.tags || [])
      .map(t => `<span class="card-tag">${t.replace(/&/g, '&amp;')}</span>`).join('');

    if (s.quote) {
      $('quote-text').textContent   = `"${s.quote}"`;
      $('quote-source').textContent = `— ${s.quoteSource || ''}`;
      $('quote').classList.add('show');
    }

    const wrap = $('illustration');
    if (s.imageUrl) {
      wrap.innerHTML = '';
      const img = document.createElement('img');
      img.alt = s.name;
      img.loading = 'lazy';
      img.onerror = () => { wrap.innerHTML = getIllustration(s); };
      img.src = s.imageUrl;
      wrap.appendChild(img);
    } else {
      wrap.innerHTML = getIllustration(s);
    }
    $('source-label').textContent = s.source || 'Roman Catholic Calendar';
    $('link').href = s.url || 'https://www.catholic.org/saints/';

    this._renderedKey = todayKey();
    this._scheduleMidnightRefresh();
  }

  _refreshIfStale() {
    if (this._renderedKey && this._renderedKey !== todayKey()) {
      this._init();
      this._load();
    }
  }

  _scheduleMidnightRefresh() {
    clearTimeout(this._midnightTimer);
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    this._midnightTimer = setTimeout(() => {
      this._init();
      this._loaded = false;
      this._load();
    }, midnight - now + 1000);
  }

  connectedCallback() {
    // Timers get throttled on background tabs and sleeping wall tablets, so
    // also re-check the date whenever the dashboard becomes visible again.
    if (!this._visListener) {
      this._visListener = () => {
        if (document.visibilityState === 'visible') this._refreshIfStale();
      };
    }
    document.addEventListener('visibilitychange', this._visListener);
    this._refreshIfStale();
  }

  disconnectedCallback() {
    if (this._visListener) document.removeEventListener('visibilitychange', this._visListener);
    clearTimeout(this._midnightTimer);
  }
}

customElements.define('saint-of-day-card', SaintOfDayCard);

// Register with the Lovelace card picker
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'saint-of-day-card',
  name: 'Saint of the Day',
  description: 'Displays the Catholic saint of the day with biography, feast type, tags, a quote, and a unique illustrated artwork panel.',
  preview: true,
  documentationURL: 'https://github.com/jrdutch/saint-of-the-day-card-',
});
