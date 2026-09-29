// The same ring assembly projected into 2D when the browser has no WebGL.
export function startConnectionFallback(canvas, hero) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}
  let frame = 0, active = true, last = 0, progress = 0, width = 0, height = 0
  const clamp = (v, low, high) => Math.min(high, Math.max(low, v))
  const project = (x, y, z, rotations, mobile) => {
    const [rx, ry, rz] = rotations
    const ay = y * Math.cos(rx) - z * Math.sin(rx)
    const az = y * Math.sin(rx) + z * Math.cos(rx)
    const bx = x * Math.cos(ry) + az * Math.sin(ry)
    const bz = -x * Math.sin(ry) + az * Math.cos(ry)
    const cx = bx * Math.cos(rz) - ay * Math.sin(rz)
    const cy = bx * Math.sin(rz) + ay * Math.cos(rz)
    const depth = 9 / (9 - bz)
    const unit = mobile ? width * .13 : clamp(width * .085, 76, 118)
    return { x: width * (mobile ? .5 : .755) + cx * unit * depth,
      y: height * (mobile ? .49 : .48) - cy * unit * depth, z: bz, depth }
  }
  const stroke = (a, b, width, color, shine) => {
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y)
    ctx.lineCap = 'round'; ctx.strokeStyle = '#18130e'; ctx.lineWidth = width + 3; ctx.stroke()
    ctx.strokeStyle = color; ctx.lineWidth = width; ctx.stroke()
    ctx.strokeStyle = shine; ctx.lineWidth = Math.max(1, width * .18); ctx.stroke()
  }
  const orb = (point, radius, colors) => {
    const r = radius * point.depth
    const gradient = ctx.createRadialGradient(point.x - r * .38, point.y - r * .42, r * .05, point.x, point.y, r)
    gradient.addColorStop(0, colors[0]); gradient.addColorStop(.38, colors[1]); gradient.addColorStop(1, colors[2])
    ctx.fillStyle = gradient
    ctx.beginPath(); ctx.arc(point.x, point.y, r, 0, Math.PI * 2); ctx.fill()
  }
  const animate = now => {
    if (!active) return
    frame = requestAnimationFrame(animate)
    if (now - last < (innerWidth < 760 ? 33 : 22)) return
    last = now
    const rect = canvas.getBoundingClientRect()
    const w = Math.max(1, Math.round(rect.width)), h = Math.max(1, Math.round(rect.height))
    const dpr = Math.min(devicePixelRatio || 1, 1.5)
    if (w !== width || h !== height) {
      width = w; height = h
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    ctx.clearRect(0, 0, width, height)
    const heroRect = hero.getBoundingClientRect()
    const target = clamp(-heroRect.top / Math.max(1, heroRect.height - innerHeight + 78), 0, 1)
    progress += (target - progress) * .09
    const mobile = width < 760
    const baseY = -.22 + progress * 1.16 + Math.sin(now * .00023) * .07
    const shape = (x, y, z, rx, ry, rz) => project(x, y, z, [rx + .09 + progress * .24, ry + baseY, rz], mobile)
    const configurations = [
      { radius: 2.1, tilt: [.45, -.42 + progress * .42 + now * .00005, .18], color: '#a87a44', highlight: '#f3d8a2', thick: mobile ? 5 : 9 },
      { radius: 1.66, tilt: [1.08 - progress * .52, .45, -.27], color: '#b8a486', highlight: '#fff4d6', thick: mobile ? 3 : 6 },
      { radius: 1.31, tilt: [-.27, 1.16 + progress * .47, .22], color: '#8c653e', highlight: '#dfb779', thick: mobile ? 2 : 4 },
    ]
    const rings = configurations.map(({radius,tilt}) => Array.from({length:97}, (_, i) => {
      const a = i / 96 * Math.PI * 2
      return shape(Math.cos(a) * radius, Math.sin(a) * radius, 0, ...tilt)
    }))
    const drawRing = (front) => {
      rings.forEach((points, index) => {
        const config = configurations[index]
        for (let i = 0; i < 96; i++) {
          const a = points[i], b = points[i + 1]
          const isFront = (a.z + b.z) > 0
          if (isFront !== front) continue
          const shade = isFront ? config.color : '#4b3d2b'
          stroke(a, b, config.thick * ((a.depth + b.depth) / 2), shade, isFront ? config.highlight : '#9f8159')
        }
      })
    }
    drawRing(false)
    const center = shape(0, 0, 0, 0, 0, 0)
    orb(center, mobile ? width * .11 : 83, ['#84745e', '#292723', '#080808'])
    // A recessed lens gives the center a physical face rather than a glowing dot.
    orb({ ...center, x: center.x + (mobile ? 8 : 13), y: center.y - (mobile ? 3 : 6), depth: 1 }, mobile ? width * .049 : 37, ['#ddbf85', '#453622', '#0a0908'])
    orb({ ...center, x: center.x + (mobile ? 8 : 13), y: center.y - (mobile ? 3 : 6), depth: 1 }, mobile ? 6 : 11, ['#fff3d7', '#c9974f', '#53330e'])
    drawRing(true)
    rings.forEach((points, i) => {
      const t = (now * (.00005 + i * .00001) + progress * .2 + i * .34) % 1
      const point = points[Math.floor(t * 96)]
      orb(point, mobile ? 5 : 9, ['#fff8df', '#dbb676', '#50341a'])
    })
    hero.dataset.connectionStage = String(Math.min(3, Math.floor(progress * 4)))
    hero.classList.add('connection-ready')
  }
  const observer = new IntersectionObserver(([entry]) => {
    active = entry.isIntersecting
    if (active && !frame) frame = requestAnimationFrame(animate)
    if (!active && frame) { cancelAnimationFrame(frame); frame = 0 }
  }, { rootMargin: '150px' })
  observer.observe(hero)
  return () => { observer.disconnect(); if (frame) cancelAnimationFrame(frame) }
}
