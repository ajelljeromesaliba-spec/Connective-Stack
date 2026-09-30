import { useEffect, useRef, useState } from 'react'

const SDK_URL = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.3.0/dist/unicornStudio.umd.js'
let sdkPromise

function loadSDK() {
  if (window.UnicornStudio?.addScene) return Promise.resolve(window.UnicornStudio)
  if (!sdkPromise) {
    sdkPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = SDK_URL
      script.async = true
      script.onload = () => window.UnicornStudio?.addScene
        ? resolve(window.UnicornStudio)
        : reject(new Error('Unicorn Studio runtime unavailable'))
      script.onerror = () => { script.remove(); reject(new Error('Unicorn Studio failed to load')) }
      document.head.appendChild(script)
    }).catch(error => { sdkPromise = undefined; throw error })
  }
  return sdkPromise
}

export default function RealEstateScene() {
  const host = useRef(null)
  const [ready, setReady] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(preference.matches)
    preference.addEventListener('change', update)
    return () => preference.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    let cancelled = false
    let scene
    setReady(false)
    loadSDK().then(async studio => {
      if (cancelled || !host.current) return
      scene = await studio.addScene({
        element: host.current,
        projectId: 'sf9yuazbUGO6Oak9SNtQ',
        production: true,
        fps: 60,
        scale: 1,
        dpi: Math.min(window.devicePixelRatio || 1, 1.5),
        fixed: false,
        lazyLoad: true,
        interactivity: { mouse: { disableMobile: true } },
        ariaLabel: 'Interactive real estate scene',
      })
      if (cancelled) scene.destroy()
      else setReady(true)
    }).catch(error => {
      if (!cancelled) console.warn('Real estate scene is using its image fallback:', error)
    })
    return () => { cancelled = true; scene?.destroy() }
  }, [reducedMotion])

  return <div className="re-scene-visual" aria-hidden="true">
    <img className="re-scene-fallback" src="/assets/realestate-hero.svg" alt="" loading="lazy" />
    {!reducedMotion && <div ref={host} className={`re-unicorn-scene${ready ? ' is-ready' : ''}`} data-us-project="sf9yuazbUGO6Oak9SNtQ" />}
  </div>
}
