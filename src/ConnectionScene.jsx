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
      renderer.toneMappingExposure = 1.9

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(38, 1, .1, 100)
      camera.position.set(0, .2, 11)
      const sculpture = new THREE.Group()
      scene.add(sculpture)
      scene.add(new THREE.AmbientLight(0xf1d8aa, 1.45))
      const light = (color, power, x, y, z) => {
        const point = new THREE.PointLight(color, power)
        point.position.set(x, y, z)
        scene.add(point)
      }
      light(0xffdb9b, 95, -3, 4, 5)
      light(0xffffff, 68, 4, -2, 5)
      light(0x9c5a20, 55, 0, 1, -4)

      const materials = [
        new THREE.MeshStandardMaterial({ color: 0xb58951, metalness: .9, roughness: .23 }),
        new THREE.MeshStandardMaterial({ color: 0xe2cfaa, metalness: .85, roughness: .2 }),
        new THREE.MeshStandardMaterial({ color: 0x282521, metalness: .8, roughness: .32 }),
        new THREE.MeshStandardMaterial({ color: 0x151412, metalness: .83, roughness: .26 }),
        new THREE.MeshStandardMaterial({ color: 0xf6d99d, emissive: 0x7a3e0d, emissiveIntensity: .32, metalness: .7, roughness: .19 }),
      ]
      const meshes = []
      const add = (geometry, material, parent = sculpture) => {
        const mesh = new THREE.Mesh(geometry, material)
        parent.add(mesh)
        meshes.push(mesh)
        return mesh
      }

      // Dense center, separated rings and their moving carriers create real occlusion.
      const core = add(new THREE.SphereGeometry(.92, 48, 32), materials[3])
      const face = add(new THREE.SphereGeometry(.43, 32, 20), materials[2])
      face.position.z = .74
      const iris = add(new THREE.SphereGeometry(.18, 24, 16), materials[4])
      iris.position.z = 1.08
      const halo = add(new THREE.TorusGeometry(.64, .028, 10, 72), materials[0])
      halo.position.z = .88

      const rings = [
        { radius: 2.1, tube: .105, material: materials[0], x: .45, y: -.42, z: .18 },
        { radius: 1.66, tube: .065, material: materials[1], x: 1.08, y: .45, z: -.27 },
        { radius: 1.31, tube: .043, material: materials[0], x: -.27, y: 1.16, z: .22 },
      ].map(({ radius, tube, material, x, y, z }) => {
        const pivot = new THREE.Group()
        sculpture.add(pivot)
        pivot.rotation.set(x, y, z)
        add(new THREE.TorusGeometry(radius, tube, 12, 96), material, pivot)
        return { pivot, radius }
      })
      // Gunmetal sections interrupt the polish. The object reads as machinery, not neon art.
      const bands = [
        add(new THREE.TorusGeometry(1.03, .12, 12, 72, Math.PI * .7), materials[2]),
        add(new THREE.TorusGeometry(1.03, .12, 12, 72, Math.PI * .7), materials[2]),
      ]
      bands[0].rotation.set(.33, .38, .2)
      bands[1].rotation.set(.33, .38, Math.PI + .2)
      const carrierGeometry = new THREE.IcosahedronGeometry(.145, 1)
      const carriers = rings.map(({ pivot }, i) => add(carrierGeometry, i === 1 ? materials[4] : materials[1], pivot))
      const satellites = []
      for (let i = 0; i < 14; i++) {
        const marker = add(new THREE.OctahedronGeometry(i % 4 === 0 ? .055 : .025), i % 4 === 0 ? materials[0] : materials[2])
        satellites.push(marker)
      }

      let raf = 0
      let active = true
      let smoothed = 0
      let last = 0
      let width = 0
      let height = 0
      const resize = () => {
        const rect = canvas.getBoundingClientRect()
        const w = Math.max(1, Math.round(rect.width))
        const h = Math.max(1, Math.round(rect.height))
        if (w === width && h === height) return
        width = w; height = h
        renderer.setSize(width, height, false)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }
      const animate = now => {
        if (!active || disposed) return
        raf = requestAnimationFrame(animate)
        if (now - last < (window.innerWidth < 760 ? 32 : 18)) return
        last = now
        resize()
        const rect = hero.getBoundingClientRect()
        const travel = Math.max(1, rect.height - window.innerHeight + 78)
        const target = clamp(-rect.top / travel, 0, 1)
        smoothed += (target - smoothed) * .085
        const mobile = width < 760
        sculpture.position.set(mobile ? 0 : 2.1 - smoothed * .36, mobile ? .42 : -.08, 0)
        sculpture.scale.setScalar(mobile ? .66 : clamp(width / 1348, .8, 1.1))
        sculpture.rotation.y = -.22 + smoothed * 1.16 + Math.sin(now * .00023) * .07
        sculpture.rotation.x = .09 + smoothed * .24
        rings[0].pivot.rotation.y = -.42 + smoothed * .42 + now * .00005
        rings[1].pivot.rotation.x = 1.08 - smoothed * .52
        rings[2].pivot.rotation.y = 1.16 + smoothed * .47
        carriers.forEach((carrier, i) => {
          const a = now * (.00031 + i * .00007) + smoothed * 1.2 + i * 2.1
          carrier.position.set(Math.cos(a) * rings[i].radius, Math.sin(a) * rings[i].radius, 0)
          carrier.rotation.y += .018
        })
        satellites.forEach((point, i) => {
          const a = i * 2.399 + now * .00008
          const radius = 2.45 + (i % 3) * .1
          point.position.set(Math.cos(a) * radius, Math.sin(a) * radius * .73, Math.sin(a * .9) * .62)
        })
        core.rotation.y += .003
        face.rotation.y = core.rotation.y
        iris.scale.setScalar(1 + .12 * Math.sin(now * .002))
        camera.position.z = 11 - smoothed * 1.35
        camera.lookAt(mobile ? 0 : 1.25, mobile ? .4 : 0, 0)
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
        meshes.forEach(mesh => { if (mesh.geometry !== carrierGeometry) mesh.geometry.dispose() })
        carrierGeometry.dispose()
        materials.forEach(material => material.dispose())
        renderer.dispose()
      }
    })
    return () => { disposed = true; cleanup() }
  }, [])

  return <canvas ref={canvasRef} className="connection-canvas" aria-hidden="true" />
}
