// Project the same spatial story into a 2D canvas when WebGL is unavailable.
export function startConnectionFallback(canvas, hero) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return () => {}
  let active = true
  let frame = 0
  let last = 0
  let progress = 0
  let width = 0
  let height = 0
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
  const project = (x, y, z, angle, mobile) => {
    const ry = angle
    const rz = -.08 + progress * .11
    const nx = x * Math.cos(ry) + z * Math.sin(ry)
    const nz = -x * Math.sin(ry) + z * Math.cos(ry)
    const ny = y * Math.cos(rz) + nx * Math.sin(rz)
    const px = nx * Math.cos(rz) - y * Math.sin(rz)
    const depth = 10 / (10 - nz)
    const unit = (mobile ? width * .077 : clamp(width * .055, 50, 78)) * (1 + progress * .14)
    return { x: width * (mobile ? .5 : .755) + px * unit * depth,
      y: height * (mobile ? .52 : .49) - ny * unit * depth, depth, z: nz }
  }
  const path = (points, color, thick, highlight) => {
    ctx.beginPath()
    points.forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y))
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    ctx.strokeStyle = '#2a1d0d'; ctx.lineWidth = thick + 5; ctx.stroke()
    ctx.shadowColor = color; ctx.shadowBlur = 18
    ctx.strokeStyle = color; ctx.lineWidth = thick; ctx.stroke()
    ctx.shadowBlur = 0
    ctx.strokeStyle = highlight; ctx.lineWidth = Math.max(1, thick * .26); ctx.stroke()
  }
  const node = (point, radius, color) => {
    const r = radius * point.depth
    const g = ctx.createRadialGradient(point.x - r * .3, point.y - r * .4, 0, point.x, point.y, r)
    g.addColorStop(0, '#fff6da'); g.addColorStop(.38, color); g.addColorStop(1, '#39230e')
    ctx.shadowColor = color; ctx.shadowBlur = r * 1.7
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(point.x, point.y, r, 0, Math.PI * 2); ctx.fill()
    ctx.shadowBlur = 0
  }
  const animate = now => {
    if (!active) return
    frame = requestAnimationFrame(animate)
    if (now - last < (innerWidth < 760 ? 34 : 23)) return
    last = now
    const rect = canvas.getBoundingClientRect()
    const w = Math.max(1, Math.round(rect.width))
    const h = Math.max(1, Math.round(rect.height))
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
    const angle = -.14 + progress * 1.34 + Math.sin(now * .0005) * .03
    const pos = (x, y, z) => project(x, y, z, angle, mobile)
    const left = [pos(-5.2, 1.06, .05), pos(-3.5, 1.06, .05), pos(-3.5, -1.02, .05), pos(-5.2, -1.02, .05)]
    // The intake panel has a visible side face and metal rim.
    ctx.fillStyle = 'rgba(33,29,23,.76)'
    ctx.beginPath(); left.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)); ctx.closePath(); ctx.fill()
    for (let i = 0; i < 4; i++) path([left[i], left[(i + 1) % 4]], '#bb8a47', mobile ? 3 : 5, '#f9dfac')
    path([pos(-5.2, .72, .06), pos(-3.5, .72, .06)], '#d2a762', 2, '#ffe7bd')
    for (let i = 0; i < 3; i++) {
      const yy = .42 - i * .33
      path([pos(-4.95, yy, .07), pos(-3.8 + i * .1, yy, .07)], '#977c53', 2, '#e2c28a')
    }
    const ringPoints = Array.from({ length: 65 }, (_, i) => {
      const a = i / 64 * Math.PI * 2
      return pos(4.35, Math.cos(a) * 1.08, Math.sin(a) * 1.08)
    })
    path(ringPoints, '#af793b', mobile ? 8 : 13, '#ffdf9b')
    const inner = Array.from({ length: 65 }, (_, i) => {
      const a = i / 64 * Math.PI * 2
      return pos(4.35, Math.cos(a) * .74, Math.sin(a) * .74)
    })
    path(inner, '#9b7440', mobile ? 1.6 : 2.4, '#fff1cc')
    node(pos(4.35, 0, 0), mobile ? 9 : 16, '#d6a25d')
    const strands = [[], []]
    for (let i = 0; i <= 120; i++) {
      const t = i / 120
      const a = t * Math.PI * 5
      const x = (t - .5) * 7.8
      strands[0].push(pos(x, Math.sin(a) * .77, Math.cos(a) * .77))
      strands[1].push(pos(x, -Math.sin(a) * .77, -Math.cos(a) * .77))
    }
    for (let i = 0; i <= 25; i++) {
      const j = Math.round(i * 120 / 25)
      path([strands[0][j], strands[1][j]], '#54412b', mobile ? 1.7 : 2.6, i % 5 === 0 ? '#eac285' : '#81725d')
    }
    path(strands[1], '#caa77a', mobile ? 6 : 10, '#fff0cd')
    path(strands[0], '#ad712f', mobile ? 7 : 11, '#f5cb83')
    for (let i = 0; i <= 25; i += 5) {
      const j = Math.round(i * 120 / 25)
      node(strands[0][j], mobile ? 4 : 7, '#e3aa5c')
      node(strands[1][j], mobile ? 4 : 7, '#d7c19b')
    }
    for (let i = 0; i < 4; i++) {
      const t = (now * .0001 + i * .25 + progress * .32) % 1
      node(strands[0][Math.floor(t * 120)], mobile ? 4.5 : 8, '#ffcf79')
    }
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
