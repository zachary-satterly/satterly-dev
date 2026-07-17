// satterly.dev — typed headline with pretext-measured height reservation.
// pretext is vendored (see /vendor/pretext, MIT) — no runtime CDN or registry trust.

const FULL = [
  { text: 'Security professional.', cls: 'sec' },
  { text: ' ',                      cls: null  },
  { text: 'AI developer.',          cls: 'ai'  },
];
const FULL_TEXT = FULL.map(p => p.text).join('');

const headline = document.getElementById('headline');
const typed    = document.getElementById('typed');
const caret    = document.getElementById('caret');
const rest     = document.getElementById('rest');

// --- 1. Reserve final headline height via vendored @chenglou/pretext ------
let pretext = null;
try {
  pretext = await import('./vendor/pretext/layout.js');
} catch (_) { /* fallback below still prevents mid-type shift */ }

function reserveHeight() {
  const cs = getComputedStyle(headline);
  const lineHeight = parseFloat(cs.lineHeight);
  const width = headline.clientWidth;
  if (pretext) {
    const font = `${cs.fontWeight} ${cs.fontSize} Menlo, monospace`;
    const prepared = pretext.prepare(FULL_TEXT, font);
    const { lineCount } = pretext.layout(prepared, width, lineHeight);
    headline.style.minHeight = Math.max(1, lineCount) * lineHeight + 'px';
  } else {
    const ghost = headline.cloneNode(false);
    ghost.style.cssText = 'position:absolute;visibility:hidden;width:' + width + 'px;min-height:0';
    ghost.textContent = FULL_TEXT;
    headline.parentNode.appendChild(ghost);
    headline.style.minHeight = ghost.offsetHeight + 'px';
    ghost.remove();
  }
}
reserveHeight();
addEventListener('resize', reserveHeight);

// --- 2. Typewriter ---------------------------------------------------------
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

function renderInstant() {
  typed.replaceChildren(...FULL.map(p => {
    const s = document.createElement('span');
    if (p.cls) s.className = p.cls;
    s.textContent = p.text;
    return s;
  }));
  rest.classList.add('show');
}

if (reduced) {
  renderInstant();
} else {
  const spans = FULL.map(p => {
    const s = document.createElement('span');
    if (p.cls) s.className = p.cls;
    typed.appendChild(s);
    return s;
  });
  let part = 0, i = 0;
  const BASE = 46;
  (function tick() {
    if (part >= FULL.length) {
      rest.classList.add('show');
      setTimeout(() => { caret.style.opacity = '0'; }, 4200);
      return;
    }
    const { text } = FULL[part];
    spans[part].textContent = text.slice(0, ++i);
    if (i >= text.length) { part++; i = 0; }
    const jitter = BASE + (Math.random() * 55 - 20);
    const pause = text[i - 1] === '.' ? 420 : 0;
    setTimeout(tick, jitter + pause);
  })();
}
