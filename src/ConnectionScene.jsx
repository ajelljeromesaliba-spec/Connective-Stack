import React, { useEffect, useRef } from 'react'
import { startConnectionFallback } from './ConnectionCanvasFallback'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

export default function ConnectionScene() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const hero = canvas?.closest('.cinematic-hero')
    if (!canvas || !hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let disposed = false
    let cleanup = () => {}
    import('three').then(THREE => {
      if (disposed) return
      let renderer
      try {
        renderer = new THREE.WebGLRenderer({ canvas, antialias: window.innerWidth > 760, alpha: true, powerPreference: 'high-performance' })
      } catch { cleanup = startConnectionFallback(canvas, hero); return }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.25 : 1.6))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.6
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(36, 1, .1, 100)
      camera.position.set(0, .25, 13.4)
      const rig = new THREE.Group()
      scene.add(rig)
      scene.add(new THREE.AmbientLight(0xffe7bd, 2.5))
      const key = new THREE.PointLight(0xffda93, 100)
      key.position.set(1.5, 4, 6)
      scene.add(key)
      const rim = new THREE.PointLight(0xffffff, 75)
      rim.position.set(-4, -3, -2)
      scene.add(rim)

      const gold = new THREE.MeshStandardMaterial({ color: 0xc69650, metalness: .85, roughness: .23 })
      const ivory = new THREE.MeshStandardMaterial({ color: 0xe8d9bd, metalness: .74, roughness: .23 })
      const dark = new THREE.MeshStandardMaterial({ color: 0x292724, metalness: .88, roughness: .28 })
      const pulseMaterial = new THREE.MeshBasicMaterial({ color: 0xffdd99 })
      const ringMaterial = new THREE.MeshStandardMaterial({ color: 0xd5aa68, emissive: 0x4e2c0a, emissiveIntensity: .4, metalness: .85, roughness: .22 })
      const geometry = []
      const add = (mesh, parent = rig) => { parent.add(mesh); geometry.push(mesh.geometry); return mesh }
      const tube = (points, radius, material, parent = rig) => add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), Math.max(48, points.length * 4), radius, 8, false), material), parent)
      const box = (w, h, d, x, y, z, material, parent = rig) => {
        const mesh = add(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material), parent)
        mesh.position.set(x, y, z)
        return mesh
      }
      const sphereGeometry = new THREE.SphereGeometry(.11, 12, 10)
      const strands = [gold, ivory]
      for (let strand = 0; strand < 2; strand++) {
        const points = []
        for (let i = 0; i <= 100; i++) {
          const t = i / 100
          const angle = t * Math.PI * 5 + strand * Math.PI
          points.push(new THREE.Vector3((t - .5) * 7.8, Math.sin(angle) * .76, Math.cos(angle) * .76))
        }
        tube(points, .085, strands[strand])
      }
      for (let i = 0; i <= 25; i++) {
        const t = i / 25
        const a = t * Math.PI * 5
        const x = (t - .5) * 7.8
        const pointA = new THREE.Vector3(x, Math.sin(a) * .76, Math.cos(a) * .76)
        const pointB = new THREE.Vector3(x, -pointA.y, -pointA.z)
        tube([pointA, pointB], .023, i % 5 === 0 ? gold : dark)
        if (i % 5 === 0) {
          const node = add(new THREE.Mesh(sphereGeometry, ivory))
          node.position.copy(pointA)
          const pair = add(new THREE.Mesh(sphereGeometry, gold))
          pair.position.copy(pointB)
        }
      }

      // The two ends are solid spatial objects: an intake browser and an output handoff ring.
      const browser = new THREE.Group()
      rig.add(browser)
      browser.position.x = -4.25
      const browserBars = [
        [1.75, .075, .1, 0, 1, 0], [1.75, .075, .1, 0, -.95, 0],
        [.075, 2, .1, -.84, .025, 0], [.075, 2, .1, .84, .025, 0],
        [1.64, .06, .08, 0, .66, 0], [.52, .055, .07, -.36, .25, 0],
        [.9, .055, .07, -.17, -.05, 0], [.67, .055, .07, -.28, -.34, 0],
      ]
      browserBars.forEach(([w, h, d, x, y, z], i) => box(w, h, d, x, y, z, i < 5 ? gold : ivory, browser))
      box(1.68, 1.92, .055, 0, .025, -.16, dark, browser)
      const output = new THREE.Group()
      rig.add(output)
      output.position.x = 4.25
      const ring = add(new THREE.Mesh(new THREE.TorusGeometry(.96, .09, 12, 64), ringMaterial), output)
      ring.rotation.y = .36
      const innerRing = add(new THREE.Mesh(new THREE.TorusGeometry(.66, .018, 8, 64), ivory), output)
      innerRing.rotation.y = .36
      const core = add(new THREE.Mesh(new THREE.IcosahedronGeometry(.28, 1), gold), output)
      const pulses = Array.from({ length: 5 }, () => add(new THREE.Mesh(new THREE.SphereGeometry(.075, 10, 8), pulseMaterial)))

      let active = true
      let raf = 0
      let smoothed = 0
      let lastTime = 0
      let width = 0
      let height = 0
      const resize = () => {
        const rect = canvas.getBoundingClientRect()
        const nextWidth = Math.max(1, Math.round(rect.width))
        const nextHeight = Math.max(1, Math.round(rect.height))
        if (width === nextWidth && height === nextHeight) return
        width = nextWidth; height = nextHeight
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }
      const animate = (now) => {
        if (!active || disposed) return
        raf = window.requestAnimationFrame(animate)
        if (now - lastTime < (window.innerWidth < 760 ? 30 : 16)) return
        lastTime = now
        resize()
        const rect = hero.getBoundingClientRect()
        const target = clamp(-rect.top / Math.max(1, rect.height - window.innerHeight + 78), 0, 1)
        smoothed += (target - smoothed) * .085
        const mobile = width < 760
        const breathe = Math.sin(now * .00045) * .035
        rig.rotation.y = -.2 + smoothed * 1.52 + breathe
        rig.rotation.x = .1 + smoothed * .17
        rig.rotation.z = -.08 + smoothed * .12
        rig.position.x = mobile ? 0 : 2.08 - smoothed * .45
        rig.position.y = mobile ? .65 - smoothed * .22 : -.08
        const scale = mobile ? .55 : clamp(width / 1350, .72, 1.1)
        rig.scale.setScalar(scale * (1 + smoothed * .1))
        camera.position.z = 13.4 - smoothed * 2.8
        camera.lookAt(mobile ? 0 : 1.4, mobile ? .55 : 0, 0)
        core.rotation.x += .012
        core.rotation.y += .015
        ring.rotation.z = smoothed * .7
        pulses.forEach((pulse, i) => {
          const t = (now * .00011 + i / pulses.length + smoothed * .5) % 1
          const angle = t * Math.PI * 5
          pulse.position.set((t - .5) * 7.8, Math.sin(angle) * .76, Math.cos(angle) * .76)
          pulse.scale.setScalar(.5 + .8 * Math.sin(Math.PI * t))
        })
        hero.dataset.connectionStage = String(Math.min(3, Math.floor(smoothed * 4)))
        renderer.render(scene, camera)
        hero.classList.add('connection-ready')
      }
      const observer = new IntersectionObserver(([entry]) => {
        active = entry.isIntersecting
        if (active && !raf) raf = requestAnimationFrame(animate)
        if (!active && raf) { cancelAnimationFrame(raf); raf = 0 }
      }, { rootMargin: '150px' })
      observer.observe(hero)
      cleanup = () => {
        observer.disconnect()
        if (raf) cancelAnimationFrame(raf)
        geometry.forEach(item => item.dispose())
        sphereGeometry.dispose()
        ;[gold, ivory, dark, pulseMaterial, ringMaterial].forEach(item => item.dispose())
        renderer.dispose()
      }
    })
    return () => { disposed = true; cleanup() }
  }, [])

  return <canvas ref={canvasRef} className="connection-canvas" aria-hidden="true" />
}
