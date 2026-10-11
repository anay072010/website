import { PRODUCTS, getSticker } from './art.js'
import { createKeyringViewer } from './keyring3d.js'

// ---- Edit these for your company ----
const CONFIG = {
  business: 'KEYROT',
  contact: '@your.handle', // Instagram handle, email or stall location shown to customers
}

// Bundle prices in pence. The bag finds the cheapest mix.
const BUNDLES = [
  { qty: 5, price: 1000 },
  { qty: 2, price: 500 },
  { qty: 1, price: 300 },
]

const $ = (s) => document.querySelector(s)
const gbp = (p) => '£' + (p % 100 ? (p / 100).toFixed(2) : p / 100)
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

export function bestPrice(n) {
  const cost = [0]
  const pick = [null]
  for (let i = 1; i <= n; i++) {
    cost[i] = Infinity
    for (const b of BUNDLES) {
      if (b.qty <= i && cost[i - b.qty] + b.price < cost[i]) {
        cost[i] = cost[i - b.qty] + b.price
        pick[i] = b
      }
    }
  }
  const used = {}
  for (let i = n; i > 0; i -= pick[i].qty) used[pick[i].qty] = (used[pick[i].qty] || 0) + 1
  return { total: cost[n], used }
}

// ---------- bag state ----------
let bag = {}
try {
  bag = JSON.parse(localStorage.getItem('keyrot-bag') || '{}') || {}
} catch {}
const save = () => {
  try {
    localStorage.setItem('keyrot-bag', JSON.stringify(bag))
  } catch {}
}
const count = () => Object.values(bag).reduce((a, b) => a + b, 0)

function add(slug, qty = 1) {
  bag[slug] = (bag[slug] || 0) + qty
  if (bag[slug] <= 0) delete bag[slug]
  save()
  renderBag()
  if (qty > 0) {
    const p = PRODUCTS.find((x) => x.slug === slug)
    toast(`${p.name} added · ${count()} in bag`)
    const btn = $('#bag-open')
    btn.classList.remove('bump')
    void btn.offsetWidth
    btn.classList.add('bump')
  }
}

let toastTimer
function toast(msg) {
  const t = $('#toast')
  t.textContent = msg
  t.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => t.classList.remove('show'), 2200)
}

const stickerUrls = {}

function orderText() {
  const n = count()
  const { total } = bestPrice(n)
  const lines = PRODUCTS.filter((p) => bag[p.slug]).map((p) => `${bag[p.slug]} × ${p.name}`)
  return `${CONFIG.business} order\n${lines.join('\n')}\n\n${n} keyring${n === 1 ? '' : 's'} · Total ${gbp(total)}`
}

function renderBag() {
  const n = count()
  $('#bag-count').textContent = n
  const items = $('#bag-items')
  const foot = $('#bag-foot')

  if (!n) {
    items.innerHTML = `<div class="bag-empty"><p>Your bag is empty. Start with the log.</p><button class="btn btn-primary" type="button" data-add="tung-tung-tung-sahur">Add Tung Tung Tung Sahur · £3</button></div>`
    foot.innerHTML = ''
    return
  }

  items.innerHTML = PRODUCTS.filter((p) => bag[p.slug])
    .map(
      (p) => `<div class="bag-item">
        <img src="${stickerUrls[p.slug] || ''}" alt="">
        <div><div class="n">${p.name}</div></div>
        <div class="stepper" role="group" aria-label="Quantity of ${p.name}">
          <button type="button" data-step="-1" data-slug="${p.slug}" aria-label="Remove one">−</button>
          <span>${bag[p.slug]}</span>
          <button type="button" data-step="1" data-slug="${p.slug}" aria-label="Add one">+</button>
        </div>
      </div>`
    )
    .join('')

  const { total, used } = bestPrice(n)
  const full = n * 300
  const next = bestPrice(n + 1).total - total
  const breakdown = Object.entries(used)
    .sort((a, b) => b[0] - a[0])
    .map(([q, times]) => `${times > 1 ? times + ' × ' : ''}${q === '1' ? 'single' : q + '-pack'}`)
    .join(' + ')

  let nudge = ''
  if (next === 0) nudge = `Your next keyring is <strong>free</strong>. 5 cost the same as ${n}.`
  else if (next < 300) nudge = `Add one more for just <strong>${gbp(next)}</strong>.`

  foot.innerHTML = `
    ${nudge ? `<div class="nudge">${nudge}</div>` : ''}
    <div class="totals">
      <div class="row"><span>${n} × £3</span><span>${gbp(full)}</span></div>
      ${full > total ? `<div class="row save"><span>Bundle saving (${breakdown})</span><span>−${gbp(full - total)}</span></div>` : ''}
      <div class="row total"><span>Total</span><span>${gbp(total)}</span></div>
    </div>
    <label class="sr-only" for="order-text">Your order</label>
    <textarea class="order-text" id="order-text" readonly>${orderText()}</textarea>
    <button class="btn btn-primary" id="copy-order" type="button">Copy order</button>
    <p style="color:var(--muted);font-size:14px">Send it to <span class="handle">${CONFIG.contact}</span> or show it at our stall. Pay when you collect.</p>`
}

function openBag(open) {
  $('#bag').classList.toggle('open', open)
  $('#bag').setAttribute('aria-hidden', String(!open))
  $('#scrim').classList.toggle('open', open)
}

document.addEventListener('click', async (e) => {
  const addBtn = e.target.closest('[data-add]')
  if (addBtn) add(addBtn.dataset.add)
  const step = e.target.closest('[data-step]')
  if (step) add(step.dataset.slug, Number(step.dataset.step))
  const view = e.target.closest('[data-view]')
  if (view) openViewer(view.dataset.view)
  if (e.target.closest('#copy-order')) {
    const text = orderText()
    try {
      await navigator.clipboard.writeText(text)
      toast('Order copied. Paste it in a message to us.')
    } catch {
      const ta = $('#order-text')
      ta.focus()
      ta.select()
      toast('Press Ctrl/⌘ + C to copy your order.')
    }
  }
})
$('#bag-open').addEventListener('click', () => openBag(true))
$('#bag-close').addEventListener('click', () => openBag(false))
$('#scrim').addEventListener('click', () => openBag(false))
document.addEventListener('keydown', (e) => e.key === 'Escape' && openBag(false))
document.querySelectorAll('[data-handle]').forEach((el) => (el.textContent = CONFIG.contact))

// ---------- ribbon ----------
const names = PRODUCTS.map((p) => `<span>${p.name}</span><span><i>✦</i></span>`).join('')
$('#ribbon-track').innerHTML = names + names

// ---------- shop grid ----------
$('#grid').innerHTML = PRODUCTS.map(
  (p, i) => `<article class="card" style="--hue:${p.hue}" data-slug="${p.slug}">
    <div class="card-stage">
      ${p.tag ? `<span class="chip">${p.tag}</span>` : ''}
      <div class="charm" style="--delay:${(-i * 0.7).toFixed(1)}s">
        <div class="chain"></div><div class="loop"></div>
        <div class="acrylic"><img alt="${p.name} keyring" data-art="${p.slug}"><span class="glare"></span></div>
      </div>
    </div>
    <div class="card-body">
      <div class="card-top"><h3>${p.name}</h3><span class="price-each">£3</span></div>
      <p class="line">${p.line}</p>
      <div class="card-actions">
        <button class="btn btn-primary" type="button" data-add="${p.slug}">Add to bag</button>
        <button class="btn btn-ghost" type="button" data-view="${p.slug}">Spin in 3D</button>
      </div>
    </div>
  </article>`
).join('')

// Card tilt + holo highlight following the pointer.
if (!reduceMotion) {
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return
      const r = card.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      card.style.setProperty('--mx', x * 100 + '%')
      card.style.setProperty('--my', y * 100 + '%')
      card.style.setProperty('--ry', (x - 0.5) * 10 + 'deg')
      card.style.setProperty('--rx', (0.5 - y) * 10 + 'deg')
    })
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--rx', '0deg')
      card.style.setProperty('--ry', '0deg')
    })
  })
}

// Load every sticker, then fill images.
Promise.all(
  PRODUCTS.map(async (p) => {
    const { canvas } = await getSticker(p.slug)
    stickerUrls[p.slug] = canvas.toDataURL('image/png')
    document.querySelectorAll(`[data-art="${p.slug}"]`).forEach((img) => (img.src = stickerUrls[p.slug]))
    if (p.slug === 'ballerina-cappuccina') $('#layer-art').src = stickerUrls[p.slug]
  })
).then(renderBag)
renderBag()

// ---------- hero 3D ----------
let hero = null
let current = 0
let autoTimer

function showHero(i, animate = true) {
  current = (i + PRODUCTS.length) % PRODUCTS.length
  const p = PRODUCTS[current]
  $('#now-name').textContent = p.name
  $('#now-line').textContent = p.line
  getSticker(p.slug).then(({ canvas }) => hero && hero.setArtwork(canvas, { animate }))
}
function restartAuto() {
  clearInterval(autoTimer)
  if (!reduceMotion) autoTimer = setInterval(() => showHero(current + 1), 6000)
}

try {
  hero = createKeyringViewer($('#hero-canvas'), { offsetX: 2.4, fitTop: 470, scale: 0.9, particles: innerWidth < 720 ? 1100 : 2200 })
} catch (err) {
  console.warn('3D unavailable', err)
}
showHero(0, false)
restartAuto()
$('#now-next').addEventListener('click', () => (showHero(current + 1), restartAuto()))
$('#now-prev').addEventListener('click', () => (showHero(current - 1), restartAuto()))
$('#now-add').addEventListener('click', () => add(PRODUCTS[current].slug))

// ---------- 3D viewer dialog ----------
let viewer = null
let viewerSlug = null
function openViewer(slug) {
  const p = PRODUCTS.find((x) => x.slug === slug)
  viewerSlug = slug
  $('#viewer-name').textContent = p.name
  $('#viewer-line').textContent = p.line
  const dlg = $('#viewer')
  dlg.showModal()
  if (!viewer) {
    try {
      viewer = createKeyringViewer($('#viewer-canvas'), { particles: 700, scale: 1.2 })
    } catch (err) {
      console.warn('3D unavailable', err)
    }
  }
  getSticker(slug).then(({ canvas }) => viewer && viewer.setArtwork(canvas, { animate: false }))
  viewer && viewer.burst()
}
$('#viewer-close').addEventListener('click', () => $('#viewer').close())
$('#viewer').addEventListener('click', (e) => e.target === e.currentTarget && e.currentTarget.close())
$('#viewer-add').addEventListener('click', () => add(viewerSlug))
