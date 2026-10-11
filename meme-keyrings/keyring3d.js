// 3D keyring viewer: chrome split ring + chain + clear acrylic charm,
// floating in a particle field that reacts to the pointer.
import * as THREE from 'three'

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches

const PARTICLE_COLORS = ['#f0a35c', '#ff6fae', '#fbf0e2', '#1f9d55', '#e23b3b', '#7fb2ff', '#ffd27a']

function roundedRect(w, h, r) {
  const s = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.quadraticCurveTo(x + w, y, x + w, y + r)
  s.lineTo(x + w, y + h - r)
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  s.lineTo(x + r, y + h)
  s.quadraticCurveTo(x, y + h, x, y + h - r)
  s.lineTo(x, y + r)
  s.quadraticCurveTo(x, y, x + r, y)
  return s
}

// A small studio of coloured light panels, baked into an environment map
// so the chrome and acrylic get believable reflections.
function makeEnvironment(renderer) {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color('#1b0f18')
  const panel = (color, intensity, pos, rot, size) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(size[0], size[1]),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide })
    )
    m.position.set(...pos)
    m.rotation.set(...rot)
    scene.add(m)
  }
  panel('#ffffff', 3, [0, 6, 0], [Math.PI / 2, 0, 0], [8, 8])
  panel('#ffb0d0', 2.2, [-6, 1, 2], [0, Math.PI / 2, 0], [4, 6])
  panel('#ffc98a', 2.4, [6, 0, 2], [0, -Math.PI / 2, 0], [4, 6])
  panel('#9cc4ff', 1.6, [0, 0, -6], [0, 0, 0], [10, 3])
  panel('#ffffff', 1.5, [0, -1, 6], [0, Math.PI, 0], [6, 2])
  const pmrem = new THREE.PMREMGenerator(renderer)
  const env = pmrem.fromScene(scene, 0.03).texture
  pmrem.dispose()
  return env
}

function makeParticles(count) {
  const geo = new THREE.BufferGeometry()
  const pos = new Float32Array(count * 3)
  const col = new Float32Array(count * 3)
  const seed = new Float32Array(count)
  const size = new Float32Array(count)
  const c = new THREE.Color()
  for (let i = 0; i < count; i++) {
    const r = 2.2 + Math.pow(Math.random(), 0.7) * 9
    const t = Math.random() * Math.PI * 2
    pos[i * 3] = Math.cos(t) * r
    pos[i * 3 + 1] = (Math.random() - 0.5) * 11
    pos[i * 3 + 2] = Math.sin(t) * r * 0.5 - 2.5
    c.set(PARTICLE_COLORS[(Math.random() * PARTICLE_COLORS.length) | 0])
    col.set([c.r, c.g, c.b], i * 3)
    seed[i] = Math.random()
    size[i] = Math.random() < 0.06 ? 3.2 + Math.random() * 2 : 0.8 + Math.random() * 1.4
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
  geo.setAttribute('seed', new THREE.BufferAttribute(seed, 1))
  geo.setAttribute('size', new THREE.BufferAttribute(size, 1))

  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(99, 99) },
      uBurst: { value: 0 },
      uScale: { value: 1 },
    },
    vertexShader: /* glsl */ `
      attribute float seed;
      attribute float size;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uBurst;
      uniform float uScale;
      varying vec3 vColor;
      varying float vTwinkle;
      varying float vStar;
      void main() {
        vec3 p = position;
        float a = uTime * (0.04 + seed * 0.06);
        float cs = cos(a), sn = sin(a);
        p.xz = mat2(cs, -sn, sn, cs) * p.xz;
        p.y += sin(uTime * 0.6 + seed * 40.0) * 0.25;
        p.y = mod(p.y + uTime * 0.12 * (0.3 + seed) + 5.5, 11.0) - 5.5;
        vec2 d = p.xy - uMouse;
        float dist = length(d);
        p.xy += normalize(d + 1e-4) * smoothstep(2.2, 0.0, dist) * 1.3;
        p.xy += normalize(p.xy + 1e-4) * uBurst * (0.6 + seed * 2.4);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        vTwinkle = 0.55 + 0.45 * sin(uTime * (1.5 + seed * 3.0) + seed * 30.0);
        vStar = step(2.9, size);
        gl_PointSize = size * uScale * (34.0 / -mv.z) * (1.0 + uBurst * 0.6);
        vColor = color;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vColor;
      varying float vTwinkle;
      varying float vStar;
      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        float glow = smoothstep(0.5, 0.0, d);
        float core = smoothstep(0.12, 0.0, d);
        float cross = max(smoothstep(0.05, 0.0, abs(uv.x)), smoothstep(0.05, 0.0, abs(uv.y))) * smoothstep(0.5, 0.1, d);
        float a = mix(glow * glow, core + cross * 0.9 + glow * 0.3, vStar) * vTwinkle;
        gl_FragColor = vec4(vColor + core * 0.6, a);
      }
    `,
  })
  return new THREE.Points(geo, mat)
}

export function createKeyringViewer(canvas, opts = {}) {
  const { particles = 1800, offsetX = 0, scale = 1, fitTop = 0 } = opts
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()
  scene.environment = makeEnvironment(renderer)
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
  camera.position.set(0, 0, 11)

  const key = new THREE.DirectionalLight('#fff4e6', 2.2)
  key.position.set(3, 4, 6)
  scene.add(key, new THREE.AmbientLight('#ffd9ec', 0.35))

  // ---- keyring ----
  const chrome = new THREE.MeshStandardMaterial({ color: '#f2f2f5', metalness: 1, roughness: 0.18 })
  const rig = new THREE.Group() // pivots at the split ring
  const root = new THREE.Group()
  root.add(rig)
  scene.add(root)

  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.065, 24, 96), chrome)
  ring.rotation.y = 0.5
  rig.add(ring)
  const ring2 = ring.clone()
  ring2.scale.setScalar(0.985)
  ring2.position.z = 0.05
  rig.add(ring2) // split rings are two coils

  const linkGeo = new THREE.TorusGeometry(0.14, 0.038, 12, 40)
  const LINKS = 5
  for (let i = 0; i < LINKS; i++) {
    const l = new THREE.Mesh(linkGeo, chrome)
    l.scale.set(1, 1.55, 1)
    l.position.y = -0.62 - 0.12 - i * 0.29
    l.rotation.y = i % 2 ? Math.PI / 2 : 0
    rig.add(l)
  }
  const chainEnd = -0.62 - 0.12 - (LINKS - 1) * 0.29 - 0.2

  const jump = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.04, 12, 40), chrome)
  jump.position.y = chainEnd - 0.08
  jump.rotation.y = Math.PI / 2
  rig.add(jump)

  const W = 2.5
  const H = 2.8
  const T = 0.14
  const charm = new THREE.Group()
  charm.position.y = chainEnd - 0.2 - H / 2 + 0.24
  rig.add(charm)

  const shape = roundedRect(W, H, 0.42)
  const hole = new THREE.Path()
  hole.absarc(0, H / 2 - 0.24, 0.1, 0, Math.PI * 2, true)
  shape.holes.push(hole)
  const bodyGeo = new THREE.ExtrudeGeometry(shape, {
    depth: T,
    bevelEnabled: true,
    bevelThickness: 0.04,
    bevelSize: 0.04,
    bevelSegments: 4,
    curveSegments: 24,
  })
  bodyGeo.translate(0, 0, -T / 2)
  const acrylic = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    metalness: 0,
    roughness: 0.04,
    transmission: 1,
    thickness: 0.35,
    ior: 1.49,
    clearcoat: 1,
    clearcoatRoughness: 0.02,
    iridescence: 0.35,
    iridescenceIOR: 1.3,
    envMapIntensity: 1.4,
  })
  charm.add(new THREE.Mesh(bodyGeo, acrylic))

  const printMat = new THREE.MeshStandardMaterial({ transparent: true, roughness: 0.35, metalness: 0, alphaTest: 0.02 })
  const printGeo = new THREE.PlaneGeometry(W * 0.92, W * 0.92)
  const front = new THREE.Mesh(printGeo, printMat)
  front.position.set(0, -0.12, T / 2 + 0.042)
  const back = new THREE.Mesh(printGeo, printMat)
  back.position.set(0, -0.12, -T / 2 - 0.042)
  back.rotation.y = Math.PI
  charm.add(front, back)

  // Holographic sheen layer on top of the print.
  const sheen = new THREE.Mesh(
    new THREE.PlaneGeometry(W * 0.98, H * 0.98),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uAngle: { value: 0 } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `
        varying vec2 vUv; uniform float uAngle;
        void main(){
          float band = sin((vUv.x + vUv.y) * 6.0 + uAngle * 3.0);
          vec3 c = 0.5 + 0.5 * cos(6.283 * (vec3(0.0, 0.33, 0.67) + (vUv.x - vUv.y) + uAngle * 0.5));
          float a = smoothstep(0.82, 1.0, band) * 0.22;
          gl_FragColor = vec4(c, a);
        }`,
    })
  )
  sheen.position.z = T / 2 + 0.05
  charm.add(sheen)

  const points = particles ? makeParticles(particles) : null
  if (points) scene.add(points)

  // ---- interaction ----
  const pointer = new THREE.Vector2(0, 0)
  const pointerWorld = new THREE.Vector2(99, 99)
  let spin = 0
  let spinVel = reduceMotion ? 0 : 0.6
  let dragging = false
  let lastX = 0
  let burst = 0
  let flip = null // texture swap animation
  let swing = 0
  let swingVel = 0

  canvas.addEventListener('pointerdown', (e) => {
    dragging = true
    lastX = e.clientX
    canvas.setPointerCapture(e.pointerId)
  })
  canvas.addEventListener('pointerup', () => (dragging = false))
  canvas.addEventListener('pointercancel', () => (dragging = false))
  const onMove = (e) => {
    const r = canvas.getBoundingClientRect()
    pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1
    pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1
    const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (camera.position.z + 2.5)
    pointerWorld.set(pointer.x * halfH * camera.aspect, pointer.y * halfH)
    if (dragging) {
      const dx = e.clientX - lastX
      lastX = e.clientX
      spinVel = dx * 0.35
      swingVel += dx * 0.0006
    }
  }
  window.addEventListener('pointermove', onMove, { passive: true })
  canvas.addEventListener('pointerleave', () => pointerWorld.set(99, 99))

  let scrollSpin = 0
  let lastScroll = scrollY
  window.addEventListener(
    'scroll',
    () => {
      scrollSpin += (scrollY - lastScroll) * 0.004
      lastScroll = scrollY
    },
    { passive: true }
  )

  function resize() {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    // Fit the whole keyring (about 5.6 units from ring to charm bottom) into
    // the canvas, or into the top `fitTop` pixels on narrow screens.
    const narrow = w < 720
    const visibleH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z
    const unitsPerPx = visibleH / h
    const roomPx = narrow && fitTop ? Math.min(fitTop, h) : Math.min(h, innerHeight - 110)
    const s = Math.min(scale, ((roomPx - 60) * unitsPerPx) / 5.6)
    root.scale.setScalar(s)
    root.position.x = narrow ? 0 : offsetX
    root.position.y = visibleH / 2 - 30 * unitsPerPx - 0.75 * s
    if (points) points.material.uniforms.uScale.value = renderer.getPixelRatio() * Math.min(1.4, h / 500)
  }
  new ResizeObserver(resize).observe(canvas)
  resize()

  let visible = true
  new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(canvas)

  const clock = new THREE.Clock()
  let pendingTexture = null

  function frame() {
    requestAnimationFrame(frame)
    if (!visible) return
    const dt = Math.min(clock.getDelta(), 0.05)
    const t = clock.elapsedTime

    if (!dragging) spinVel += ((reduceMotion ? 0 : 0.5) - spinVel) * 0.02
    spin += (spinVel * dt) + scrollSpin
    scrollSpin *= 0.0

    // pendulum swing, nudged by pointer position
    const target = reduceMotion ? 0 : pointer.x * 0.12 + Math.sin(t * 1.1) * 0.05
    swingVel += (target - swing) * 0.02
    swingVel *= 0.95
    swing += swingVel

    let flipY = 0
    if (flip) {
      flip.t += dt / 0.7
      const k = Math.min(flip.t, 1)
      flipY = Math.sin(k * Math.PI) * Math.PI * 0.5 * 2
      if (k >= 0.5 && pendingTexture) {
        printMat.map = pendingTexture
        printMat.needsUpdate = true
        pendingTexture = null
      }
      if (k >= 1) flip = null
    }

    rig.rotation.z = swing
    rig.rotation.x = reduceMotion ? 0 : pointer.y * -0.15
    charm.rotation.y = spin + flipY
    sheen.material.uniforms.uAngle.value = charm.rotation.y + t * 0.1

    if (points) {
      const u = points.material.uniforms
      u.uTime.value = reduceMotion ? 0 : t
      u.uMouse.value.lerp(pointerWorld, 0.15)
      burst *= 0.93
      u.uBurst.value = burst
      points.rotation.y = reduceMotion ? 0 : pointer.x * 0.08
    }
    renderer.render(scene, camera)
  }
  frame()

  return {
    setArtwork(canvasEl, { animate = true } = {}) {
      const tex = new THREE.CanvasTexture(canvasEl)
      tex.colorSpace = THREE.SRGBColorSpace
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy()
      if (!printMat.map || !animate || reduceMotion) {
        printMat.map = tex
        printMat.needsUpdate = true
        return
      }
      pendingTexture = tex
      flip = { t: 0 }
      burst = 1
    },
    burst() {
      burst = 1
    },
  }
}
