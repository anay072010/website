// Character artwork + product data.
// To use a real photo for a keyring, put the file in images/ and set `photo`
// on that product below, e.g. photo: 'images/tung-tung-tung-sahur.png'.
// A PNG with a transparent background looks best (it gets a die-cut white edge).
// Products without a photo use the vector artwork below.

const svg = (inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">${inner}</svg>`

const OUT = '#2a1712'

function sneaker(x, y, color) {
  return `<g>
    <path d="M${x - 26} ${y} q0 -16 16 -16 h18 q10 0 16 8 l14 6 q8 4 8 12 v4 h-72z" fill="${color}" stroke="${OUT}" stroke-width="5" stroke-linejoin="round"/>
    <rect x="${x - 28}" y="${y + 2}" width="76" height="11" rx="5" fill="#fff" stroke="${OUT}" stroke-width="5"/>
    <path d="M${x - 6} ${y - 10} l12 6 M${x + 2} ${y - 13} l12 6" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  </g>`
}

const sparkle = (x, y, s, c = '#fff') =>
  `<path d="M${x} ${y - s} Q${x + s * 0.18} ${y - s * 0.18} ${x + s} ${y} Q${x + s * 0.18} ${y + s * 0.18} ${x} ${y + s} Q${x - s * 0.18} ${y + s * 0.18} ${x - s} ${y} Q${x - s * 0.18} ${y - s * 0.18} ${x} ${y - s}Z" fill="${c}"/>`

const ART = {
  'tung-tung-tung-sahur': svg(`
    <defs>
      <linearGradient id="wood" x1="0" x2="1">
        <stop offset="0" stop-color="#9a6334"/><stop offset=".42" stop-color="#dba46a"/><stop offset="1" stop-color="#875226"/>
      </linearGradient>
    </defs>
    <path d="M300 178 L318 186 L376 56 Q370 30 346 38 Z" fill="#e8c38a" stroke="${OUT}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M352 52 q6 30 -14 70" stroke="#b9874f" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M176 318 L166 362 M224 318 L234 362" stroke="${OUT}" stroke-width="9" stroke-linecap="round"/>
    <ellipse cx="156" cy="366" rx="20" ry="9" fill="${OUT}"/><ellipse cx="244" cy="366" rx="20" ry="9" fill="${OUT}"/>
    <path d="M140 205 Q102 232 96 272" stroke="${OUT}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M262 205 Q296 196 309 180" stroke="${OUT}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <circle cx="96" cy="276" r="11" fill="#dba46a" stroke="${OUT}" stroke-width="5"/>
    <circle cx="309" cy="181" r="12" fill="#dba46a" stroke="${OUT}" stroke-width="5"/>
    <rect x="134" y="72" width="132" height="252" rx="44" fill="url(#wood)" stroke="${OUT}" stroke-width="6"/>
    <path d="M152 236 q12 34 -2 70 M246 230 q-10 30 4 70 M200 262 q6 22 0 44" stroke="#7a4a22" stroke-width="4" fill="none" opacity=".55" stroke-linecap="round"/>
    <ellipse cx="200" cy="82" rx="64" ry="19" fill="#ecc993" stroke="${OUT}" stroke-width="6"/>
    <ellipse cx="200" cy="82" rx="40" ry="11" fill="none" stroke="#b07a44" stroke-width="3"/>
    <ellipse cx="200" cy="82" rx="18" ry="5" fill="none" stroke="#b07a44" stroke-width="3"/>
    <circle cx="173" cy="152" r="23" fill="#fff" stroke="${OUT}" stroke-width="5"/>
    <circle cx="227" cy="152" r="23" fill="#fff" stroke="${OUT}" stroke-width="5"/>
    <circle cx="176" cy="156" r="7" fill="#111"/><circle cx="224" cy="156" r="7" fill="#111"/>
    <path d="M148 118 L194 132 M252 118 L206 132" stroke="${OUT}" stroke-width="9" stroke-linecap="round"/>
    <path d="M166 204 Q200 232 234 204 Q200 214 166 204Z" fill="#3a1d0e" stroke="${OUT}" stroke-width="5" stroke-linejoin="round"/>
    ${sparkle(70, 90, 14, '#ffd27a')}${sparkle(340, 300, 10, '#ffd27a')}
  `),

  'ballerina-cappuccina': svg(`
    <path d="M186 244 Q146 230 112 196 M214 244 Q254 230 288 196" stroke="${OUT}" stroke-width="18" fill="none" stroke-linecap="round"/>
    <path d="M186 244 Q146 230 112 196 M214 244 Q254 230 288 196" stroke="#f3c4a3" stroke-width="9" fill="none" stroke-linecap="round"/>
    <circle cx="110" cy="194" r="8" fill="#f3c4a3" stroke="${OUT}" stroke-width="4"/>
    <circle cx="290" cy="194" r="8" fill="#f3c4a3" stroke="${OUT}" stroke-width="4"/>
    <path d="M192 284 L186 352 M208 284 L266 334" stroke="${OUT}" stroke-width="19" stroke-linecap="round"/>
    <path d="M192 284 L186 352 M208 284 L266 334" stroke="#f3c4a3" stroke-width="10" stroke-linecap="round"/>
    <path d="M178 350 q8 18 18 4 z" fill="#ff7fb0" stroke="${OUT}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M262 326 q22 0 16 18 z" fill="#ff7fb0" stroke="${OUT}" stroke-width="5" stroke-linejoin="round"/>
    <rect x="190" y="200" width="20" height="40" fill="#f3c4a3"/>
    <path d="M180 236 Q200 226 220 236 L216 268 L184 268 Z" fill="#ff6fae" stroke="${OUT}" stroke-width="5" stroke-linejoin="round"/>
    <ellipse cx="200" cy="274" rx="86" ry="22" fill="#ffb6d4" stroke="${OUT}" stroke-width="5"/>
    <path d="M120 270 q10 14 20 0 q10 14 20 0 q10 14 20 0 q10 14 20 0 q10 14 20 0 q10 14 20 0 q10 14 20 0 q10 14 20 0" fill="none" stroke="#e0609a" stroke-width="4"/>
    <ellipse cx="200" cy="266" rx="66" ry="12" fill="#ffd0e3"/>
    <path d="M262 102 Q312 104 304 142 Q296 172 254 164" fill="none" stroke="${OUT}" stroke-width="18" stroke-linecap="round"/>
    <path d="M262 102 Q312 104 304 142 Q296 172 254 164" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
    <path d="M126 84 L274 84 L258 190 Q200 218 142 190 Z" fill="#fff" stroke="${OUT}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M140 110 L148 182" stroke="#e9e1da" stroke-width="10" stroke-linecap="round"/>
    <ellipse cx="200" cy="84" rx="74" ry="20" fill="#c98b55" stroke="${OUT}" stroke-width="6"/>
    <ellipse cx="200" cy="82" rx="58" ry="13" fill="#e9b884"/>
    <path d="M200 96 C184 82 174 72 186 67 C195 64 200 71 200 75 C200 71 205 64 214 67 C226 72 216 82 200 96Z" fill="#fbeedc"/>
    <path d="M172 136 q9 -9 18 0 M210 136 q9 -9 18 0" stroke="${OUT}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="164" cy="152" r="9" fill="#ffb6c8"/><circle cx="236" cy="152" r="9" fill="#ffb6c8"/>
    <path d="M190 158 q10 9 20 0" stroke="${OUT}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M180 50 q-8 -14 2 -26 M206 46 q-8 -14 2 -26 M230 50 q-8 -14 2 -26" stroke="#fbeedc" stroke-width="5" fill="none" stroke-linecap="round" opacity=".9"/>
    ${sparkle(70, 290, 12, '#ffd0e3')}${sparkle(334, 250, 14, '#ffd0e3')}${sparkle(320, 64, 9, '#fff')}
  `),

  'tralalero-tralala': svg(`
    <path d="M150 232 L150 318 M206 238 L206 322 M262 230 L262 316" stroke="${OUT}" stroke-width="28" stroke-linecap="round"/>
    <path d="M150 232 L150 318 M206 238 L206 322 M262 230 L262 316" stroke="#4f8fd6" stroke-width="18" stroke-linecap="round"/>
    ${sneaker(150, 330, '#2f6bff')}${sneaker(206, 334, '#2f6bff')}${sneaker(262, 328, '#2f6bff')}
    <path d="M74 198 L26 140 L44 200 L26 262 Z" fill="#4f8fd6" stroke="${OUT}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M188 146 L214 78 L246 144 Z" fill="#4f8fd6" stroke="${OUT}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M62 200 Q120 118 252 138 Q326 150 362 192 Q326 236 252 238 Q140 250 62 200Z" fill="#4f8fd6" stroke="${OUT}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M100 212 Q206 258 336 210 Q272 240 186 238 Q134 232 100 212Z" fill="#f2f6fb"/>
    <path d="M120 160 Q200 136 300 156" stroke="#86b6ea" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M250 176 q-6 16 0 30 M236 178 q-6 16 0 30 M222 180 q-6 16 0 30" stroke="#2c5d96" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="304" cy="176" r="12" fill="#fff" stroke="${OUT}" stroke-width="4"/>
    <circle cx="307" cy="177" r="5" fill="#111"/>
    <path d="M314 210 Q336 216 356 202" stroke="${OUT}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M322 211 l4 8 l4 -9 M334 210 l4 8 l4 -10" fill="#fff" stroke="${OUT}" stroke-width="2"/>
    <circle cx="120" cy="80" r="10" fill="none" stroke="#9fd0ff" stroke-width="4"/>
    <circle cx="96" cy="108" r="6" fill="none" stroke="#9fd0ff" stroke-width="4"/>
    ${sparkle(340, 90, 12, '#cfe6ff')}
  `),

  'bombardiro-crocodilo': svg(`
    <path d="M178 186 L148 104 L204 104 L228 182 Z" fill="#9aa7b0" stroke="${OUT}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M86 204 L44 144 L76 144 L118 196 Z" fill="#5aa04a" stroke="${OUT}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M70 210 Q86 168 200 168 L306 174 Q356 180 366 202 Q356 224 306 228 L200 234 Q86 244 70 210Z" fill="#5aa04a" stroke="${OUT}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M96 222 Q200 244 320 222" stroke="#9fd38a" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M120 172 l10 -14 l10 14 M150 170 l10 -14 l10 14 M180 169 l10 -14 l10 14" fill="#3f7d33" stroke="${OUT}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M298 204 L366 202" stroke="${OUT}" stroke-width="5" stroke-linecap="round"/>
    <path d="M306 204 l5 9 l5 -9 l5 9 l5 -9 l5 9 l5 -9 l5 9 l5 -9 l5 9 l5 -9" fill="#fff" stroke="${OUT}" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="288" cy="166" r="17" fill="#5aa04a" stroke="${OUT}" stroke-width="5"/>
    <circle cx="290" cy="164" r="9" fill="#ffe36b" stroke="${OUT}" stroke-width="3"/>
    <rect x="288" y="158" width="4" height="12" rx="2" fill="#111"/>
    <path d="M232 170 Q244 146 266 152 L262 172 Z" fill="#bfe6ff" stroke="${OUT}" stroke-width="5" stroke-linejoin="round"/>
    <circle cx="160" cy="206" r="16" fill="#1f9d55" stroke="${OUT}" stroke-width="4"/>
    <circle cx="160" cy="206" r="10.5" fill="#fff"/>
    <circle cx="160" cy="206" r="5.5" fill="#e23b3b"/>
    <path d="M172 220 L128 312 L198 312 L232 224 Z" fill="#b2bec6" stroke="${OUT}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M150 300 L196 300" stroke="#e23b3b" stroke-width="7"/>
    <path d="M30 70 q40 10 70 40 M40 330 q40 -10 60 -40" stroke="#ffffff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>
    ${sparkle(350, 110, 12, '#fff3b0')}
  `),

  'brr-brr-patapim': svg(`
    <circle cx="140" cy="96" r="44" fill="#4caf6a" stroke="${OUT}" stroke-width="6"/>
    <circle cx="260" cy="96" r="44" fill="#4caf6a" stroke="${OUT}" stroke-width="6"/>
    <circle cx="200" cy="70" r="50" fill="#5cc27a" stroke="${OUT}" stroke-width="6"/>
    <path d="M172 300 L166 334 M228 300 L234 334" stroke="#8b5a2b" stroke-width="16" stroke-linecap="round"/>
    <ellipse cx="150" cy="350" rx="46" ry="19" fill="#e6be90" stroke="${OUT}" stroke-width="6"/>
    <ellipse cx="250" cy="350" rx="46" ry="19" fill="#e6be90" stroke="${OUT}" stroke-width="6"/>
    <path d="M118 342 q4 -8 10 0 M130 340 q4 -8 10 0 M260 340 q4 -8 10 0 M272 342 q4 -8 10 0" stroke="${OUT}" stroke-width="3" fill="none"/>
    <path d="M152 200 Q104 196 90 160 M248 200 Q296 196 310 160" stroke="#8b5a2b" stroke-width="14" fill="none" stroke-linecap="round"/>
    <path d="M90 160 l-14 -10 M90 160 l-4 -16 M310 160 l14 -10 M310 160 l4 -16" stroke="#8b5a2b" stroke-width="8" stroke-linecap="round"/>
    <rect x="146" y="106" width="108" height="206" rx="40" fill="#8b5a2b" stroke="${OUT}" stroke-width="6"/>
    <path d="M160 250 q8 30 0 50 M240 246 q-8 30 0 52" stroke="#6a4220" stroke-width="5" fill="none" stroke-linecap="round"/>
    <ellipse cx="200" cy="176" rx="48" ry="46" fill="#e6be90" stroke="${OUT}" stroke-width="5"/>
    <circle cx="180" cy="160" r="9" fill="#111"/><circle cx="220" cy="160" r="9" fill="#111"/>
    <circle cx="183" cy="157" r="3" fill="#fff"/><circle cx="223" cy="157" r="3" fill="#fff"/>
    <ellipse cx="200" cy="194" rx="30" ry="22" fill="#d27f5f" stroke="${OUT}" stroke-width="5"/>
    <ellipse cx="190" cy="198" rx="5" ry="4" fill="#7a3a2a"/><ellipse cx="210" cy="198" rx="5" ry="4" fill="#7a3a2a"/>
    <path d="M186 222 q14 8 28 0" stroke="${OUT}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M110 84 q8 6 14 0 M270 80 q8 6 14 0 M190 50 q8 6 14 0" stroke="#2f8a4b" stroke-width="4" fill="none" stroke-linecap="round"/>
    ${sparkle(330, 260, 12, '#c9f5d6')}${sparkle(66, 250, 9, '#c9f5d6')}
  `),

  'chimpanzini-bananini': svg(`
    <path d="M196 352 q4 20 12 22" stroke="#6b4a10" stroke-width="10" stroke-linecap="round" fill="none"/>
    <ellipse cx="200" cy="244" rx="62" ry="100" fill="#fff3bf" stroke="${OUT}" stroke-width="6"/>
    <circle cx="140" cy="164" r="18" fill="#6b4226" stroke="${OUT}" stroke-width="5"/>
    <circle cx="260" cy="164" r="18" fill="#6b4226" stroke="${OUT}" stroke-width="5"/>
    <circle cx="140" cy="164" r="9" fill="#e9c39b"/><circle cx="260" cy="164" r="9" fill="#e9c39b"/>
    <circle cx="200" cy="160" r="58" fill="#6b4226" stroke="${OUT}" stroke-width="6"/>
    <path d="M164 176 Q160 140 186 140 Q200 150 214 140 Q240 140 236 176 Q236 214 200 214 Q164 214 164 176Z" fill="#e9c39b" stroke="${OUT}" stroke-width="4"/>
    <circle cx="186" cy="160" r="8" fill="#111"/><circle cx="214" cy="160" r="8" fill="#111"/>
    <circle cx="188" cy="157" r="2.6" fill="#fff"/><circle cx="216" cy="157" r="2.6" fill="#fff"/>
    <ellipse cx="194" cy="182" rx="3" ry="2.4" fill="#5a3418"/><ellipse cx="206" cy="182" rx="3" ry="2.4" fill="#5a3418"/>
    <path d="M182 196 q18 14 36 0" stroke="${OUT}" stroke-width="4.5" fill="#c0504a" stroke-linecap="round"/>
    <path d="M138 250 Q86 196 112 116 Q148 196 178 262Z" fill="#ffd23f" stroke="${OUT}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M262 250 Q314 196 288 116 Q252 196 222 262Z" fill="#ffd23f" stroke="${OUT}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M128 252 Q200 300 272 252 L262 334 Q200 376 138 334Z" fill="#ffd23f" stroke="${OUT}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M150 280 Q200 304 250 280" stroke="#e8b400" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M118 140 q10 40 30 80 M282 140 q-10 40 -30 80" stroke="#e8b400" stroke-width="4" fill="none" stroke-linecap="round"/>
    ${sparkle(70, 80, 12, '#fff3b0')}${sparkle(334, 300, 12, '#fff3b0')}
  `),

  'lirili-larila': svg(`
    <path d="M182 316 L180 340 M218 316 L220 340" stroke="#3f9a5c" stroke-width="18" stroke-linecap="round"/>
    <rect x="148" y="338" width="50" height="14" rx="7" fill="#a0652e" stroke="${OUT}" stroke-width="5"/>
    <rect x="202" y="338" width="50" height="14" rx="7" fill="#a0652e" stroke="${OUT}" stroke-width="5"/>
    <path d="M160 340 q14 -16 28 0 M214 340 q14 -16 28 0" stroke="#7a4a1e" stroke-width="5" fill="none"/>
    <path d="M160 254 H120 V206" stroke="${OUT}" stroke-width="36" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M160 254 H120 V206" stroke="#4caf6a" stroke-width="24" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M240 276 H282 V226" stroke="${OUT}" stroke-width="36" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M240 276 H282 V226" stroke="#4caf6a" stroke-width="24" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="156" y="182" width="88" height="144" rx="44" fill="#4caf6a" stroke="${OUT}" stroke-width="6"/>
    <path d="M200 196 V316 M178 200 V312 M222 200 V312" stroke="#3a8c55" stroke-width="4"/>
    <path d="M170 230 l-8 -4 M232 250 l8 -4 M172 286 l-8 -4 M230 294 l8 -4 M114 220 l-8 -3 M290 240 l8 -3" stroke="#e8f6c6" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="128" cy="134" rx="40" ry="52" fill="#a9b2bd" stroke="${OUT}" stroke-width="6"/>
    <ellipse cx="272" cy="134" rx="40" ry="52" fill="#a9b2bd" stroke="${OUT}" stroke-width="6"/>
    <ellipse cx="132" cy="136" rx="24" ry="34" fill="#e7b7bf"/><ellipse cx="268" cy="136" rx="24" ry="34" fill="#e7b7bf"/>
    <path d="M200 168 Q204 222 240 230" stroke="${OUT}" stroke-width="32" fill="none" stroke-linecap="round"/>
    <circle cx="200" cy="130" r="58" fill="#b8c0ca" stroke="${OUT}" stroke-width="6"/>
    <path d="M200 168 Q204 222 240 230" stroke="#b8c0ca" stroke-width="20" fill="none" stroke-linecap="round"/>
    <path d="M206 196 h12 M210 212 h12" stroke="#8b939e" stroke-width="3" stroke-linecap="round"/>
    <circle cx="180" cy="124" r="8" fill="#111"/><circle cx="220" cy="124" r="8" fill="#111"/>
    <circle cx="182" cy="121" r="2.6" fill="#fff"/><circle cx="222" cy="121" r="2.6" fill="#fff"/>
    <path d="M236 70 q8 -18 20 -12" stroke="${OUT}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="258" cy="56" r="10" fill="#ff7fb0" stroke="${OUT}" stroke-width="4"/>
    ${sparkle(330, 330, 12, '#ffe0b0')}${sparkle(66, 300, 10, '#ffe0b0')}
  `),

  'cappuccino-assassino': svg(`
    <g transform="rotate(32 200 200)"><rect x="194" y="20" width="12" height="230" rx="3" fill="#dfe6ea" stroke="${OUT}" stroke-width="4"/><rect x="188" y="246" width="24" height="74" rx="6" fill="#1a1a1a" stroke="${OUT}" stroke-width="4"/><rect x="176" y="240" width="48" height="10" rx="4" fill="#d9a441" stroke="${OUT}" stroke-width="3"/></g>
    <g transform="rotate(-32 200 200)"><rect x="194" y="20" width="12" height="230" rx="3" fill="#dfe6ea" stroke="${OUT}" stroke-width="4"/><rect x="188" y="246" width="24" height="74" rx="6" fill="#1a1a1a" stroke="${OUT}" stroke-width="4"/><rect x="176" y="240" width="48" height="10" rx="4" fill="#d9a441" stroke="${OUT}" stroke-width="3"/></g>
    <path d="M182 320 L176 354 M218 320 L224 354" stroke="${OUT}" stroke-width="10" stroke-linecap="round"/>
    <ellipse cx="170" cy="358" rx="18" ry="8" fill="#111"/><ellipse cx="230" cy="358" rx="18" ry="8" fill="#111"/>
    <path d="M262 150 Q312 150 306 196 Q300 236 254 230" fill="none" stroke="${OUT}" stroke-width="18" stroke-linecap="round"/>
    <path d="M262 150 Q312 150 306 196 Q300 236 254 230" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
    <path d="M128 128 L272 128 L256 304 Q200 332 144 304 Z" fill="#fff" stroke="${OUT}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M142 150 L152 290" stroke="#ece6e0" stroke-width="10" stroke-linecap="round"/>
    <ellipse cx="200" cy="128" rx="72" ry="19" fill="#6b3e23" stroke="${OUT}" stroke-width="6"/>
    <ellipse cx="190" cy="124" rx="30" ry="6" fill="#8a5634"/>
    <path d="M132 172 L268 172 L266 214 L134 214 Z" fill="#1a1a1a" stroke="${OUT}" stroke-width="4"/>
    <path d="M264 180 Q300 168 330 186 Q306 190 296 200 Q320 210 334 230 Q300 222 264 206Z" fill="#e23b3b" stroke="${OUT}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M160 186 L192 196 L162 202 Z M240 186 L208 196 L238 202 Z" fill="#fff"/>
    <circle cx="176" cy="196" r="4" fill="#111"/><circle cx="224" cy="196" r="4" fill="#111"/>
    <path d="M182 254 q18 -10 36 0" stroke="${OUT}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M180 90 q-8 -14 2 -26 M210 86 q-8 -14 2 -26" stroke="#d9c7b8" stroke-width="5" fill="none" stroke-linecap="round"/>
  `),

  hypergamy: svg(`
    <defs>
      <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#ff8ac0"/><stop offset=".55" stop-color="#c25bff"/><stop offset="1" stop-color="#5b5bff"/>
      </linearGradient>
      <linearGradient id="gold" x1="0" x2="1"><stop offset="0" stop-color="#ffe08a"/><stop offset="1" stop-color="#f0a35c"/></linearGradient>
    </defs>
    <path d="M200 352 C110 290 44 232 44 156 C44 104 84 66 132 66 C164 66 188 84 200 108 C212 84 236 66 268 66 C316 66 356 104 356 156 C356 232 290 290 200 352Z" fill="url(#hg)" stroke="${OUT}" stroke-width="7" stroke-linejoin="round"/>
    <path d="M96 110 Q110 88 136 86" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".7"/>
    <path d="M80 286 L150 226 L196 252 L290 150" stroke="${OUT}" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M80 286 L150 226 L196 252 L290 150" stroke="url(#gold)" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M300 112 L312 176 L252 158 Z" fill="url(#gold)" stroke="${OUT}" stroke-width="6" stroke-linejoin="round"/>
    <g font-family="'Bagel Fat One', 'Arial Black', Impact, sans-serif" font-weight="900" text-anchor="middle">
      <text x="200" y="176" font-size="62" fill="${OUT}" stroke="${OUT}" stroke-width="12" stroke-linejoin="round">HYPER</text>
      <text x="200" y="176" font-size="62" fill="#fff">HYPER</text>
      <text x="200" y="236" font-size="62" fill="${OUT}" stroke="${OUT}" stroke-width="12" stroke-linejoin="round">GAMY</text>
      <text x="200" y="236" font-size="62" fill="#fff">GAMY</text>
    </g>
    ${sparkle(64, 318, 12, '#ffe08a')}${sparkle(340, 300, 10, '#ffe08a')}
  `),
}

export const PRODUCTS = [
  {
    slug: 'tung-tung-tung-sahur',
    name: 'Tung Tung Tung Sahur',
    line: 'Tung tung tung tung tung tung tung tung tung… SAHUR.',
    tag: 'Bestseller',
    hue: '#dba46a',
    photo: null,
  },
  {
    slug: 'ballerina-cappuccina',
    name: 'Ballerina Cappuccina',
    line: 'Mi mi mi! A cappuccino head in a pink tutu.',
    tag: 'Fan favourite',
    hue: '#ff8ac0',
    photo: null,
  },
  {
    slug: 'tralalero-tralala',
    name: 'Tralalero Tralala',
    line: 'The three-legged shark in blue trainers.',
    tag: 'The original',
    hue: '#4f8fd6',
    photo: null,
  },
  {
    slug: 'bombardiro-crocodilo',
    name: 'Bombardiro Crocodilo',
    line: 'Half crocodile, half bomber plane.',
    tag: null,
    hue: '#5aa04a',
    photo: null,
  },
  {
    slug: 'brr-brr-patapim',
    name: 'Brr Brr Patapim',
    line: 'Forest monkey with a big nose and bigger feet.',
    tag: null,
    hue: '#4caf6a',
    photo: null,
  },
  {
    slug: 'chimpanzini-bananini',
    name: 'Chimpanzini Bananini',
    line: 'Wa wa wa! A chimp living in a banana.',
    tag: null,
    hue: '#ffd23f',
    photo: null,
  },
  {
    slug: 'lirili-larila',
    name: 'Lirilì Larilà',
    line: 'Elephant head, cactus body, sandals on.',
    tag: null,
    hue: '#a9b2bd',
    photo: null,
  },
  {
    slug: 'cappuccino-assassino',
    name: 'Cappuccino Assassino',
    line: 'A coffee cup ninja with two katanas.',
    tag: 'New',
    hue: '#e23b3b',
    photo: null,
  },
  {
    slug: 'hypergamy',
    name: 'Hypergamy',
    line: 'For the friend who only dates up.',
    tag: null,
    hue: '#c25bff',
    photo: null,
  },
]

const SIZE = 512

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// Use the product's photo if it has one, otherwise the built-in artwork.
async function loadSource(slug) {
  const photo = PRODUCTS.find((p) => p.slug === slug)?.photo
  if (photo) {
    try {
      return { img: await loadImage(photo), photo: true }
    } catch {
      console.warn(`Could not load ${photo}, using the built-in artwork instead.`)
    }
  }
  const blob = new Blob([ART[slug]], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  try {
    return { img: await loadImage(url), photo: false }
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 2000)
  }
}

// Turns any image into a die-cut sticker: thick white outline + art on top.
function stickerize(img, photo) {
  const pad = 40
  const inner = SIZE - pad * 2
  const art = document.createElement('canvas')
  art.width = art.height = SIZE
  const a = art.getContext('2d')
  const ratio = Math.min(inner / img.width, inner / img.height)
  const w = img.width * ratio
  const h = img.height * ratio
  const x = (SIZE - w) / 2
  const y = (SIZE - h) / 2
  if (photo) {
    // Round the corners of photos so they read as a printed insert.
    const r = Math.min(w, h) * 0.12
    a.save()
    a.beginPath()
    a.roundRect(x, y, w, h, r)
    a.clip()
    a.drawImage(img, x, y, w, h)
    a.restore()
  } else {
    a.drawImage(img, x, y, w, h)
  }

  const silhouette = document.createElement('canvas')
  silhouette.width = silhouette.height = SIZE
  const s = silhouette.getContext('2d')
  s.drawImage(art, 0, 0)
  s.globalCompositeOperation = 'source-in'
  s.fillStyle = '#fff'
  s.fillRect(0, 0, SIZE, SIZE)

  const out = document.createElement('canvas')
  out.width = out.height = SIZE
  const o = out.getContext('2d')
  const radius = 14
  for (let i = 0; i < 24; i++) {
    const t = (i / 24) * Math.PI * 2
    o.drawImage(silhouette, Math.cos(t) * radius, Math.sin(t) * radius)
  }
  o.drawImage(silhouette, 0, 0)
  o.drawImage(art, 0, 0)
  return out
}

const cache = new Map()

export function getSticker(slug) {
  if (!cache.has(slug)) {
    cache.set(
      slug,
      loadSource(slug).then(({ img, photo }) => ({ canvas: stickerize(img, photo), photo }))
    )
  }
  return cache.get(slug)
}
