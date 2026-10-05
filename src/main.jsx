import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import HvacDemo from './HvacDemo'
import RealEstateDemo from './RealEstateDemo'
import HealthcareDemo from './HealthcareDemo'
import CaseStudy from './CaseStudy'
import GhlSystems from './GhlSystems'
import { GuideHub, Guide, Solution, AboutAjell, guideSlugs, solutionSlugs } from './SeoPages'
import './premium.css'
import './secondary-dark.css'
import './spatial.css'
import ConnectionScene from './ConnectionScene'

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

const Check = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

const services = [
  {
    number: '01',
    title: 'Every new lead gets a fast next step',
    copy: 'New inquiries move from first response to qualification, routing, follow-up, and booking without waiting for someone to remember.',
    tags: ['Lead routing', 'Follow-up', 'Booking'],
    summary: 'I trace the lead path from first submission to the person or system responsible for the next action, then fix the handoffs where leads are getting delayed or lost.',
    includes: ['Form and lead-source mapping', 'CRM contact and opportunity creation', 'Owner, pipeline, and notification routing', 'Calendar, reminder, and follow-up logic'],
    bestFor: 'Businesses generating inquiries but seeing slow responses, missed follow-up, or unclear ownership.',
    result: 'A lead path where every inquiry has a defined destination, next action, and fallback.',
  },
  {
    number: '02',
    title: 'Your customer path stays live and reliable',
    copy: 'Forms submit, emails arrive, domains resolve, redirects work, and the technical layer supports the customer journey instead of interrupting it.',
    tags: ['DNS', 'Deployment', 'Troubleshooting'],
    summary: 'I work backward from the visible failure, isolate the layer causing it, and repair the connection without treating every issue like a redesign.',
    includes: ['Domain and DNS checks', 'Vercel and GitHub deployment troubleshooting', 'Form and email-delivery verification', 'Redirect, routing, and integration checks'],
    bestFor: 'Teams with a site that is live but has technical issues affecting leads, access, delivery, or deployment.',
    result: 'A working customer path with the underlying technical issue identified and corrected.',
  },
  {
    number: '03',
    title: 'Your systems move data without manual re-entry',
    copy: 'Website, CRM, calendar, email, phone, and automation tools pass the right information forward so your team spends less time copying data or chasing updates.',
    tags: ['Integrations', 'Webhooks', 'CRM'],
    summary: 'I map what information needs to move between systems, then connect the tools around the actual business process instead of adding another disconnected app.',
    includes: ['Website-to-CRM connections', 'Webhook and workflow setup', 'Calendar, email, phone, and database handoffs', 'Zapier, Make, API, or native integrations where appropriate'],
    bestFor: 'Businesses already paying for multiple platforms but still relying on manual handoffs.',
    result: 'A connected flow where data reaches the next system or person without unnecessary re-entry.',
  },
  {
    number: '04',
    title: 'More visitors reach inquiry or booking',
    copy: 'Clear calls to action, better qualification, and a simpler booking path make it easier for interested visitors to take the next useful step.',
    tags: ['UX', 'Qualification', 'Conversion path'],
    summary: 'I simplify the journey around the real decision the customer needs to make, then connect that action to the system behind it.',
    includes: ['CTA and page-flow review', 'Form and qualification structure', 'Booking-path simplification', 'Mobile and responsive journey checks'],
    bestFor: 'Businesses with traffic or interest but a confusing path from first visit to inquiry or appointment.',
    result: 'A clearer customer journey with fewer unnecessary steps between intent and action.',
  },
  {
    number: '05',
    title: 'Automations recover instead of silently failing',
    copy: 'Duplicates, missing fields, failed webhooks, no-shows, and unanswered leads trigger a defined fallback instead of creating invisible cleanup work.',
    tags: ['Fallback logic', 'Edge cases', 'Testing'],
    summary: 'I test beyond the ideal workflow and add rules for the cases that usually create silent failures or manual cleanup.',
    includes: ['Duplicate-contact handling', 'Missing-data and status checks', 'Failure notifications and fallback tasks', 'No-show, no-response, and retry paths'],
    bestFor: 'Teams with automations that technically run but still require frequent manual rescue.',
    result: 'A workflow that has a defined response when the normal path does not complete.',
  },
  {
    number: '06',
    title: 'Every handoff has a clear owner and next action',
    copy: 'When a deal closes or a status changes, the right person gets the task, context, and timing automatically instead of relying on memory.',
    tags: ['Tasks', 'Notifications', 'Onboarding'],
    summary: 'I turn repeatable handoffs into visible workflow steps so ownership, timing, and required actions are easier to track.',
    includes: ['Task creation and assignment', 'Internal alerts and status changes', 'Client onboarding sequences', 'Pipeline and delivery-stage updates'],
    bestFor: 'Small teams where important follow-through still depends on manual reminders and scattered messages.',
    result: 'A repeatable handoff with clear ownership and fewer steps left to memory.',
  },
]

const process = [
  ['01', 'Define the outcome', 'We start with the business result you want after a customer acts, then define the response time, ownership, qualification, booking, or follow-through that result requires.'],
  ['02', 'Find the constraint', 'I trace the current customer and data path to identify the smallest set of changes standing between the current setup and the target outcome.'],
  ['03', 'Build the useful system', 'I implement the customer-facing experience, CRM logic, integrations, and automations needed to produce the agreed next action without adding tools for their own sake.'],
  ['04', 'Verify end to end', 'We test the normal path and the failure cases, then launch with ownership, documentation, and a clear measurement point for the outcome we set at the start.'],
]

function LegalModal({ type, onClose }) {
  const isPrivacy = type === 'privacy'

  return (
    <div className="legal-overlay" role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className="legal-modal" role="dialog" aria-modal="true" aria-labelledby="legal-title">
        <div className="legal-header">
          <div>
            <span>CONNECTIVE STACK / LEGAL</span>
            <h2 id="legal-title">{isPrivacy ? 'Privacy Policy' : 'Terms and Conditions'}</h2>
          </div>
          <button type="button" className="legal-close" onClick={onClose} aria-label="Close legal information">×</button>
        </div>
        <div className="legal-body">
          <p className="legal-updated">Last updated: September 18, 2026</p>
          {isPrivacy ? (
            <>
              <p>ConnectiveStack respects your privacy. This policy explains how information may be collected and used when you visit this website or contact AJ about a project.</p>
              <h3>Information collected</h3>
              <p>Information may include your name, email address, company details, project requirements, and anything else you choose to provide through email or a contact form. Basic technical and analytics data may also be collected, such as device type, browser, referring page, and general location.</p>
              <h3>Cookies and browser storage</h3>
              <p>This website may use essential browser storage to remember site preferences, including your cookie choice. The Calendly scheduling widget loads only when you accept optional services. Direct booking links remain available without it. You can reopen Cookie Preferences from the footer and change your choice.</p>
              <h3>How information is used</h3>
              <ul>
                <li>To respond to inquiries and prepare project estimates</li>
                <li>To provide, maintain, and improve services</li>
                <li>To secure the website and prevent misuse</li>
                <li>To understand general website performance</li>
              </ul>
              <h3>Sharing and third-party services</h3>
              <p>Personal information is not sold. Information may be processed by trusted service providers used for hosting, email, analytics, scheduling, forms, or project delivery. These providers handle information under their own privacy terms.</p>
              <h3>Retention and your choices</h3>
              <p>Information is retained only as reasonably needed for communication, service delivery, recordkeeping, and legal obligations. You may request access, correction, or deletion of information by emailing AJ.</p>
              <h3>Contact</h3>
              <p>Privacy questions may be sent to <a href="mailto:ajell.saliba@connectivestack.com">ajell.saliba@connectivestack.com</a>.</p>
            </>
          ) : (
            <>
              <p>By using this website, you agree to these terms. The website presents information about services offered by ConnectiveStack and Ajell Saliba.</p>
              <h3>Website information</h3>
              <p>Content is provided for general information and may be updated without notice. Examples and concept projects are demonstrations of capabilities and should not be treated as guaranteed business results.</p>
              <h3>Project engagements</h3>
              <p>Actual services, scope, timelines, pricing, revisions, payment terms, and deliverables are governed by the written proposal or agreement accepted for each project.</p>
              <h3>Client responsibilities</h3>
              <ul>
                <li>Provide accurate content, access, feedback, and approvals on time</li>
                <li>Confirm ownership or permission for supplied text, images, data, and brand assets</li>
                <li>Pay third-party subscriptions, usage fees, domains, or licenses unless otherwise agreed</li>
              </ul>
              <h3>Intellectual property</h3>
              <p>Unless otherwise agreed in writing, final project deliverables transfer after full payment. ConnectiveStack retains ownership of pre-existing tools, reusable methods, and general know-how. Third-party assets remain subject to their original licenses.</p>
              <h3>Limitations</h3>
              <p>No specific lead, revenue, ranking, or conversion result is guaranteed. ConnectiveStack is not responsible for outages, policy changes, or failures caused by third-party platforms and services.</p>
              <h3>Contact</h3>
              <p>Questions about these terms may be sent to <a href="mailto:ajell.saliba@connectivestack.com">ajell.saliba@connectivestack.com</a>.</p>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

function ServiceModal({ service, onClose }) {
  return (
    <div className="legal-overlay" role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
      <section className="legal-modal service-modal" role="dialog" aria-modal="true" aria-labelledby="service-modal-title">
        <div className="legal-header service-modal-header">
          <div>
            <span>CONNECTIVE STACK / OUTCOME AREA</span>
            <h2 id="service-modal-title">{service.title}</h2>
          </div>
          <button type="button" className="legal-close" onClick={onClose} aria-label={`Close ${service.title} details`}>×</button>
        </div>
        <div className="legal-body service-modal-body">
          <p className="service-modal-summary">{service.summary}</p>
          <div className="service-modal-grid">
            <div className="service-modal-includes">
              <span>What I usually check and fix</span>
              <ul>{service.includes.map(item => <li key={item}><Check /> <span>{item}</span></li>)}</ul>
            </div>
            <div className="service-modal-aside">
              <div><span>Common when</span><p>{service.bestFor}</p></div>
              <div><span>Target outcome</span><p>{service.result}</p></div>
            </div>
          </div>
          <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="button button-primary service-modal-cta" onClick={onClose}>Discuss this outcome <Arrow /></a>
        </div>
      </section>
    </div>
  )
}

const CALENDAR_URL = 'https://calendly.com/ajell-saliba-connectivestack/30min'
const offerTicker = [
  'Lead response & qualification',
  'AI receptionist & call handling',
  'Missed-call recovery',
  'SMS & email follow-up',
  'CRM & ownership routing',
  'Appointment booking',
  'Lead reactivation',
  'Review & reporting workflows',
]

const leadConversionCapabilities = [
  {
    number: '01',
    title: 'Missed-call recovery',
    copy: 'When a call is missed, trigger an immediate text-back so the lead gets a response while the intent is still fresh.',
    outcome: 'Fewer inbound opportunities disappear just because nobody picked up.',
  },
  {
    number: '02',
    title: 'Instant SMS & email follow-up',
    copy: 'New form submissions and inquiries can receive the right first response immediately, then continue through a defined follow-up sequence.',
    outcome: 'Every new lead gets a next step without waiting for someone to remember.',
  },
  {
    number: '03',
    title: 'Lead qualification & routing',
    copy: 'Ask the questions that matter, tag the lead, update the CRM, and route qualified opportunities to the right person or pipeline.',
    outcome: 'Your team spends more time on the leads that actually need them.',
  },
  {
    number: '04',
    title: 'Appointment booking & reminders',
    copy: 'Move qualified leads into the right calendar, then send confirmations, reminders, and no-show follow-up around the appointment.',
    outcome: 'Less friction between interest and an actual conversation on the calendar.',
  },
  {
    number: '05',
    title: 'CRM pipeline automation',
    copy: 'Create contacts and opportunities, assign owners, update stages, trigger tasks, and keep the lead history visible in one place.',
    outcome: 'The next action is tied to the lead record instead of scattered across inboxes and memory.',
  },
  {
    number: '06',
    title: 'Lead reactivation',
    copy: 'Re-engage older leads, no-responses, and unfinished conversations with controlled SMS or email sequences instead of letting the database sit idle.',
    outcome: 'Existing lead data gets another chance to produce conversations before you pay for more traffic.',
  },
  {
    number: '07',
    title: 'Review & reputation workflows',
    copy: 'After the right customer milestone, automatically request a review and keep the request process consistent without manual chasing.',
    outcome: 'Happy customers are asked at the right time instead of only when someone remembers.',
  },
  {
    number: '08',
    title: 'Reporting & failure alerts',
    copy: 'Track the agreed lead path and surface failed handoffs, unanswered leads, or workflow errors before they quietly pile up.',
    outcome: 'You can see where the system is leaking instead of guessing from scattered activity.',
  },
]
function CookieConsent({ onChoice, onPrivacy }) {
  return (
    <aside className="cookie-consent" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <div className="cookie-consent-copy">
        <span>COOKIE PREFERENCES</span>
        <strong>Your privacy, your choice.</strong>
        <p>This site uses essential browser storage for preferences. The Calendly scheduling widget loads when you accept optional services. You can still use the direct booking links with necessary cookies only. You can change your choice later.</p>
        <button type="button" className="cookie-privacy-link" onClick={onPrivacy}>Read Privacy Policy</button>
      </div>
      <div className="cookie-consent-actions">
        <button type="button" className="cookie-secondary" onClick={() => onChoice('necessary')}>Necessary only</button>
        <button type="button" className="cookie-primary" onClick={() => onChoice('all')}>Accept all</button>
      </div>
    </aside>
  )
}

function ProjectInquiryForm() {
  const [status, setStatus] = useState('idle')
  const [feedback, setFeedback] = useState('')
  const [fallbackEmail, setFallbackEmail] = useState('')

  const submitInquiry = async event => {
    event.preventDefault()
    setStatus('sending')
    setFeedback('')
    setFallbackEmail('')
    const form = event.currentTarget
    const payload = Object.fromEntries(new FormData(form).entries())

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'The inquiry could not be sent.')
      form.reset()
      setStatus('success')
      setFeedback('Thanks. Your project details were sent to AJ. Expect a reply within one business day.')
    } catch (error) {
      const emailBody = [
        `Name: ${payload.name || ''}`,
        `Email: ${payload.email || ''}`,
        `Company / website: ${payload.company || 'Not provided'}`,
        '',
        'Project details:',
        payload.message || '',
      ].join('\n')
      setFallbackEmail(`mailto:ajell.saliba@connectivestack.com?subject=${encodeURIComponent(`Project inquiry from ${payload.name || 'website lead'}`)}&body=${encodeURIComponent(emailBody)}`)
      setStatus('error')
      setFeedback('The form could not send automatically. Your details are still here. Use either option below to continue without starting over.')
    }
  }

  return (
    <form className="inquiry-form" onSubmit={submitInquiry}>
      <div className="inquiry-form-heading">
        <span>PROJECT INQUIRY</span>
        <h3>Tell me what you need.</h3>
        <p>A short summary is enough. I’ll review it and reply if it looks like a fit.</p>
      </div>
      <label>Full name<input name="name" required autoComplete="name" placeholder="Your name" /></label>
      <label>Work email<input name="email" required type="email" autoComplete="email" placeholder="you@company.com" /></label>
      <label className="inquiry-wide">Company or website <small>Optional</small><input name="company" autoComplete="organization" placeholder="Company name or website" /></label>
      <label className="inquiry-wide">What do you need?<textarea name="message" required rows="5" maxLength="3000" placeholder="Briefly describe what you want built, fixed, connected, or automated." /></label>
      <label className="inquiry-honeypot" aria-hidden="true">Leave this field blank<input name="website_check" tabIndex="-1" autoComplete="off" /></label>
      <label className="inquiry-consent inquiry-wide"><input type="checkbox" name="consent" value="yes" required /><span>You can contact me about this inquiry.</span></label>
      <button className="button button-primary inquiry-submit inquiry-wide" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending inquiry…' : 'Send project inquiry'} <Arrow /></button>
      {feedback && <div className={`inquiry-feedback ${status}`} role="status"><p>{feedback}</p>{status === 'error' && <div className="inquiry-fallback-actions"><a href={fallbackEmail}>Email these details to AJ</a><a href={CALENDAR_URL} target="_blank" rel="noreferrer">Book a discovery call</a></div>}</div>}
    </form>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [openNavDropdown, setOpenNavDropdown] = useState(null)
  const [legalModal, setLegalModal] = useState(null)
  const [activeService, setActiveService] = useState(null)
  const [cookieConsent, setCookieConsent] = useState(() => {
    try { return window.localStorage.getItem('connectivestack_cookie_consent') }
    catch { return null }
  })
  const [showCookieConsent, setShowCookieConsent] = useState(() => {
    try { return !window.localStorage.getItem('connectivestack_cookie_consent') }
    catch { return true }
  })

  useEffect(() => {
    if (cookieConsent !== 'all') return undefined

    const stylesheet = document.createElement('link')
    stylesheet.rel = 'stylesheet'
    stylesheet.href = 'https://assets.calendly.com/assets/external/widget.css'
    document.head.appendChild(stylesheet)

    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = () => {
      if (window.Calendly) {
        window.Calendly.initBadgeWidget({
          url: CALENDAR_URL,
          text: 'Schedule time with me',
          color: '#c69a58',
          textColor: '#ffffff',
          branding: true,
        })
      }
    }
    document.body.appendChild(script)

    return () => {
      script.onload = null
      script.remove()
      stylesheet.remove()
      document.querySelector('.calendly-badge-widget')?.remove()
    }
  }, [cookieConsent])

  useEffect(() => {
    const revealItems = [...document.querySelectorAll('[data-reveal]')]
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    revealItems.forEach((item, index) => {
      item.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`)
    })

    if (reduceMotion) {
      revealItems.forEach(item => item.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })

    revealItems.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const scenes = [...document.querySelectorAll('[data-scroll-scene]')]
    const hero = document.querySelector('.cinematic-hero')
    let frame = 0
    let heroVisualProgress = null
    let lastFrameTime = 0
    const smoothstep = value => {
      const t = Math.max(0, Math.min(1, value))
      return t * t * (3 - 2 * t)
    }
    const update = () => {
      frame = 0
      scenes.forEach(scene => {
        const rect = scene.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > window.innerHeight) return
        const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
        scene.style.setProperty('--scene-progress', progress.toFixed(3))
        scene.style.setProperty('--scene-shift', `${((.5 - progress) * 54).toFixed(1)}px`)
        scene.style.setProperty('--scene-turn', `${((progress - .5) * 5).toFixed(2)}deg`)
      })
      if (hero) {
        const rect = hero.getBoundingClientRect()
        const travel = Math.max(1, rect.height - window.innerHeight + 78)
        const targetProgress = Math.max(0, Math.min(1, -rect.top / travel))
        const now = performance.now()
        const easing = 1 - Math.exp(-Math.min(now - lastFrameTime, 32) / 105)
        heroVisualProgress = heroVisualProgress === null ? targetProgress : heroVisualProgress + (targetProgress - heroVisualProgress) * easing
        lastFrameTime = now
        const progress = heroVisualProgress
        const secondOpacity = smoothstep((progress - .25) / .5)
        const middleOpacity = smoothstep((progress - .2) / .16) * (1 - smoothstep((progress - .61) / .16))
        hero.style.setProperty('--hero-progress', progress.toFixed(3))
        hero.style.setProperty('--hero-second-opacity', secondOpacity.toFixed(3))
        hero.style.setProperty('--hero-film-middle', middleOpacity.toFixed(3))
        hero.style.setProperty('--hero-film-first', (1 - smoothstep((progress - .18) / .18)).toFixed(3))
        hero.style.setProperty('--hero-film-last', smoothstep((progress - .62) / .18).toFixed(3))
        if (Math.abs(targetProgress - progress) > .001) frame = window.requestAnimationFrame(update)
      }
    }
    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    return () => {
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return undefined
    const cards = [...document.querySelectorAll('[data-depth-card]')]
    const cleanups = cards.map(card => {
      let frame = 0
      const onMove = event => {
        if (frame) cancelAnimationFrame(frame)
        const { clientX, clientY } = event
        frame = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect()
          const x = (clientX - rect.left) / rect.width - .5
          const y = (clientY - rect.top) / rect.height - .5
          card.style.setProperty('--tilt-x', `${(-y * 6).toFixed(2)}deg`)
          card.style.setProperty('--tilt-y', `${(x * 6).toFixed(2)}deg`)
          card.style.setProperty('--glint-x', `${((x + .5) * 100).toFixed(1)}%`)
          card.style.setProperty('--glint-y', `${((y + .5) * 100).toFixed(1)}%`)
        })
      }
      const onLeave = () => {
        if (frame) cancelAnimationFrame(frame)
        card.style.removeProperty('--tilt-x')
        card.style.removeProperty('--tilt-y')
      }
      card.addEventListener('pointermove', onMove, { passive: true })
      card.addEventListener('pointerleave', onLeave)
      return () => {
        card.removeEventListener('pointermove', onMove)
        card.removeEventListener('pointerleave', onLeave)
        if (frame) cancelAnimationFrame(frame)
      }
    })
    return () => cleanups.forEach(cleanup => cleanup())
  }, [])

  useEffect(() => {
    const videos = document.querySelectorAll('.process-film video, .services-background video')
    if (!videos.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const video = entry.target
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      })
    }, { threshold: .15 })
    videos.forEach(video => observer.observe(video))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!legalModal && !activeService && !menuOpen) return undefined
    const closeOnEscape = event => {
      if (event.key !== 'Escape') return
      setLegalModal(null)
      setActiveService(null)
      setMenuOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [legalModal, activeService, menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
    setOpenNavDropdown(null)
  }

  const toggleNavDropdown = name => {
    setOpenNavDropdown(current => current === name ? null : name)
  }

  const saveCookieConsent = choice => {
    try { window.localStorage.setItem('connectivestack_cookie_consent', choice) } catch {}
    setCookieConsent(choice)
    setShowCookieConsent(false)
    window.dispatchEvent(new CustomEvent('connectivestack:cookie-consent', { detail: { choice } }))
  }

  return (
    <>
      <header className="site-header portfolio-header">
        <a href="#top" className="brand" aria-label="ConnectiveStack home">
          <img width="1200" height="199" decoding="async" src="/assets/connectivestack-metallic-logo-optimized.webp" alt="ConnectiveStack" />
        </a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="site-navigation">
          <span /><span />
        </button>
        <nav id="site-navigation" className={menuOpen ? 'nav-open' : ''}>
          <div className="nav-primary">
            <a href="#services" onClick={closeMenu}>Outcomes</a>
            <div className={`nav-demo-menu ${openNavDropdown === 'case-studies' ? 'mobile-open' : ''}`}>
              <button type="button" className="nav-demo-trigger" onClick={() => toggleNavDropdown('case-studies')} aria-expanded={openNavDropdown === 'case-studies'}>Case Studies <svg viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
              <div className="nav-demo-dropdown">
                <a href="/case-studies/hvac-lead-system" onClick={closeMenu}>
                  <small>Home Services</small>
                  <strong>HVAC Lead System</strong>
                  <span>Website, intake, booking, and follow-up flow</span>
                </a>
                <a href="/case-studies/luxury-real-estate" onClick={closeMenu}>
                  <small>Real Estate</small>
                  <strong>Luxury Real Estate</strong>
                  <span>Buyer journey, broker routing, and conversion logic</span>
                </a>
                <a href="/case-studies/healthcare-patient-experience" onClick={closeMenu}>
                  <small>Healthcare</small>
                  <strong>Patient Experience</strong>
                  <span>Intake, provider routing, scheduling, and safeguards</span>
                </a>
              </div>
            </div>
            <div className={`nav-demo-menu ${openNavDropdown === 'live-demos' ? 'mobile-open' : ''}`}>
              <button type="button" className="nav-demo-trigger" onClick={() => toggleNavDropdown('live-demos')} aria-expanded={openNavDropdown === 'live-demos'}>Live Demos <svg viewBox="0 0 12 8" aria-hidden="true"><path d="m1 1 5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
              <div className="nav-demo-dropdown">
                <a href="/demos/hvac-ai-front-desk" onClick={closeMenu}>
                  <small>Home Services</small>
                  <strong>HVAC AI Front Desk</strong>
                  <span>Chat, voice, estimates, and service intake</span>
                </a>
                <a href="/demos/luxury-real-estate" onClick={closeMenu}>
                  <small>Real Estate</small>
                  <strong>Premium Brokerage</strong>
                  <span>Listings, broker routing, and buyer tools</span>
                </a>
                <a href="/demos/healthcare-patient-experience" onClick={closeMenu}>
                  <small>Healthcare</small>
                  <strong>Connected Patient Experience</strong>
                  <span>Intake, benefits, scheduling, and provider routing</span>
                </a>
              </div>
            </div>
            <a href="#process" onClick={closeMenu}>Process</a>
            <a href="/ghl-systems" onClick={closeMenu}>GHL Systems</a>
            <a href="/seo-guides" onClick={closeMenu}>Guides</a>
            <a href="/ajell-saliba" onClick={closeMenu}>About</a>
          </div>
          <a className="nav-cta" href={CALENDAR_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>Book a system review <Arrow /></a>
        </nav>
      </header>

      <main id="top" className="portfolio-main">
        <section className="hero cinematic-hero journey-hero" data-scroll-scene>
          <div className="hero-pinned">
            <ConnectionScene />
            <div className="hero-grid grid-lines" aria-hidden="true" />
            <div className="hero-copy">
              <div className="eyebrow"><span className="status-dot" /> AJ Saliba / Customer acquisition systems</div>
              <h1>Turn more inbound interest into <em>booked appointments.</em></h1>
              <p className="hero-lead">ConnectiveStack helps you respond faster, qualify consistently, route leads correctly, follow up automatically, and make booking easier. More of the demand you already generate reaches a real sales conversation without adding more admin work.</p>
              <div className="hero-actions">
                <a href="#work" className="button button-primary">See the outcomes <Arrow /></a>
                <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="button button-secondary">Book a system review <Arrow /></a>
              </div>
            </div>
            <div className="hero-scroll-cue" aria-hidden="true"><span>Scroll to see the system</span><span className="hero-scroll-line" /></div>
            <div className="hero-motion-track" aria-hidden="true"><span /></div>
          </div>
        </section>

        <section className="offer-marquee" aria-label="Website and automation services">
          <p className="offer-marquee-accessible">{offerTicker.join(', ')}</p>
          <div className="offer-marquee-track" aria-hidden="true">
            {[0, 1].map(copy => <div className="offer-marquee-group" key={copy}>
              {offerTicker.map(item => <span className="offer-marquee-item" key={item}>{item}</span>)}
            </div>)}
          </div>
        </section>

        <section className="live-project" id="work" aria-labelledby="proof-heading" data-scroll-scene>
          <div className="live-project-inner" data-reveal data-depth-card>
            <div className="live-project-copy">
              <span className="kicker">System case studies</span>
              <h2 id="proof-heading">See how the outcome gets built.</h2>
              <p>These walkthroughs start with the business result, map the customer path required to reach it, then show the system logic and handoffs behind the experience. They are demonstration builds designed to make the approach and execution inspectable before we work together.</p>
              <a href="/case-studies/hvac-lead-system" className="live-project-link">Open a case study <Arrow /></a>
            </div>
            <div className="live-project-mark"><img width="494" height="410" decoding="async" src="/assets/project-hvac.svg" alt="HVAC lead system case study preview" loading="lazy" /></div>
          </div>
        </section>

        <section className="section services" id="services" data-scroll-scene>
          <div className="services-background" aria-hidden="true">
            <video muted loop playsInline preload="none" poster="/assets/problems-motion-poster.jpg">
              <source src="/assets/problems-motion.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="section-heading" data-reveal>
            <span className="kicker">Business outcomes</span>
            <h2>More leads answered. More follow-up completed. More appointments booked.</h2>
            <p>The work is built around what should happen after someone shows interest: a fast response, useful qualification, clear ownership, consistent follow-up, and an easy path to the calendar.</p>
          </div>
          <div className="service-list">
            {services.map(service => (
              <article className="service-card" key={service.title} data-reveal data-depth-card>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </div>
                <div className="service-tags">
                  {service.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
                <button type="button" className="service-arrow" onClick={() => setActiveService(service)} aria-label={`View ${service.title} details`}><Arrow /></button>
              </article>
            ))}
          </div>
        </section>

        <section className="lead-system-section" id="lead-system" data-scroll-scene aria-labelledby="lead-system-heading">
          <div className="lead-system-heading" data-reveal>
            <span className="kicker">What the system can handle</span>
            <h2 id="lead-system-heading">Make every new lead easier to respond to, qualify, and book.</h2>
            <p>ConnectiveStack handles the repeatable work between a new inquiry and the next real business action so your team can spend more time on conversations that need a human.</p>
          </div>

          <div className="lead-system-flow" data-reveal aria-label="Lead conversion workflow">
            <span>New lead</span>
            <i aria-hidden="true">→</i>
            <span>Immediate response</span>
            <i aria-hidden="true">→</i>
            <span>Qualification</span>
            <i aria-hidden="true">→</i>
            <span>Appointment</span>
            <i aria-hidden="true">→</i>
            <span>CRM + follow-up</span>
          </div>

          <div className="lead-system-grid">
            {leadConversionCapabilities.map(item => (
              <article className="lead-system-card" key={item.title} data-reveal data-depth-card>
                <span className="lead-system-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <div className="lead-system-outcome">
                  <small>Business result</small>
                  <strong>{item.outcome}</strong>
                </div>
              </article>
            ))}
          </div>

          <div className="lead-system-cta" data-reveal>
            <div>
              <span>One path, connected end to end</span>
              <strong>Call, form, text, email, calendar, CRM, and follow-up can work as one system.</strong>
            </div>
            <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="button button-primary">Map my lead path <Arrow /></a>
          </div>
        </section>

        <section className="ai-receptionist-section" id="ai-receptionist" data-scroll-scene aria-labelledby="ai-receptionist-heading">
          <div className="ai-receptionist-shell" data-reveal>
            <div className="ai-receptionist-copy">
              <span className="kicker">AI Receptionist</span>
              <h2 id="ai-receptionist-heading">Answer more inbound calls and turn more of them into booked appointments.</h2>
              <p>The AI receptionist can answer inbound calls 24/7, handle common questions, capture contact details, qualify the caller, and book appointments into your calendar. The same lead can continue into CRM routing, SMS or email follow-up, reminders, and human handoff without starting over.</p>
              <div className="ai-receptionist-actions">
                <a href="/demos/hvac-ai-front-desk" className="button button-primary">See the AI front desk demo <Arrow /></a>
                <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="button button-secondary">Talk through your call flow <Arrow /></a>
              </div>
            </div>
            <div className="ai-receptionist-flow" aria-label="AI receptionist workflow">
              <article>
                <span>01</span>
                <strong>Answer</strong>
                <p>Pick up inbound calls even when your staff is busy or the office is closed.</p>
              </article>
              <article>
                <span>02</span>
                <strong>Qualify</strong>
                <p>Ask the questions your team needs before deciding the next step.</p>
              </article>
              <article>
                <span>03</span>
                <strong>Book or route</strong>
                <p>Schedule qualified callers or hand off the conversation when a human should step in.</p>
              </article>
              <article>
                <span>04</span>
                <strong>Follow through</strong>
                <p>Send the lead into your CRM, trigger follow-up, and keep the next action visible.</p>
              </article>
            </div>
          </div>
          <p className="ai-receptionist-note" data-reveal>AI is the mechanism. The outcome is simple: more inbound demand gets answered, captured, qualified, and moved to the next step.</p>
        </section>

        <section className="pricing-trust-points engagement-trust" aria-label="What to expect when working with ConnectiveStack" data-scroll-scene>
          <article data-reveal data-depth-card>
            <span className="pricing-trust-icon" aria-hidden="true"><Check /></span>
            <div>
              <strong>You Own What We Build</strong>
              <p>Your production accounts, domain, and project assets remain under your ownership. ConnectiveStack gets only the access needed to build and manage the agreed system.</p>
            </div>
          </article>
          <article data-reveal data-depth-card>
            <span className="pricing-trust-icon" aria-hidden="true"><Check /></span>
            <div>
              <strong>30-Day Post-Launch Support</strong>
              <p>Technical support for the original build is included for 30 days after launch so issues tied to the delivered scope can be addressed.</p>
            </div>
          </article>
        </section>

        <section className="process-showcase" id="process" data-scroll-scene>
          <div className="process-heading" data-reveal>
            <div>
              <span className="kicker">The ConnectiveStack method</span>
              <h2>Define the outcome. Build the path. Verify it works.</h2>
            </div>
            <p>The business result comes first. I define what should happen after a customer acts, work backward through the customer-facing and technical layers, then use only the pieces needed to make that outcome repeatable.</p>
          </div>

          <div className="process-stage">
            <div className="process-film" data-reveal>
              <video muted loop playsInline preload="none" poster="/assets/automation-process-gold-poster.jpg">
                <source src="/assets/automation-process-gold.mp4" type="video/mp4" />
              </video>
              <div className="process-film-topbar">
                <span><i /> Build sequence</span>
                <span>Outcome / Constraint / Build / Verify</span>
                <span>Connected system</span>
              </div>
              <div className="process-film-caption">
                <small>Connected execution</small>
                <strong>One method from target outcome to verified result</strong>
              </div>
            </div>

            <div className="process-steps" data-reveal>
              {process.map(([, title, copy]) => (
                <article key={title} data-depth-card>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="process-output" data-reveal>
            <span>Tools used when the diagnosis calls for them</span>
            <div><i /> Website and customer experience</div>
            <div><i /> Forms, calls, and qualification</div>
            <div><i /> CRM and ownership</div>
            <div><i /> Automation and integrations</div>
            <div><i /> Infrastructure and deployment</div>
          </div>
        </section>

        <section className="contact-section" id="contact" data-scroll-scene>
          <div className="contact-glow" />
          <div className="contact-content" data-reveal>
            <span className="kicker kicker-dark">Start with the outcome</span>
            <h2>Tell me what should happen when a lead reaches you.</h2>
            <p>More calls answered, faster follow-up, cleaner qualification, more booked appointments, or less manual admin. I will work backward from that result through your current website, CRM, calls, calendar, and follow-up setup, then recommend a realistic scope.</p>
            <div className="contact-actions">
              <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="button button-light">Book a discovery call <Arrow /></a>
              <a href="mailto:ajell.saliba@connectivestack.com?subject=Website%20project%20inquiry" className="contact-email">ajell.saliba@connectivestack.com</a>
            </div>
            <div className="contact-expectations">
              <div><strong>Scoped around the outcome</strong><span>Clear success criteria, deliverables, and delivery plan before implementation</span></div>
              <div><strong>Direct technical support</strong><span>Work with the person diagnosing and building the system</span></div>
              <div><strong>1 business day</strong><span>Typical response time for new inquiries</span></div>
            </div>
          </div>
          <div className="contact-panel" data-reveal><ProjectInquiryForm /></div>
        </section>
      </main>

      <footer className="portfolio-footer">
        <a href="#top" className="footer-brand"><img width="1200" height="199" decoding="async" src="/assets/connectivestack-metallic-logo-optimized.webp" alt="ConnectiveStack" /></a>
        <p>Helping more customer intent become action: calls answered, leads qualified, follow-up completed, CRM updated, and appointments booked.</p>
        <div>
          <span>© {new Date().getFullYear()} ConnectiveStack</span>
          <button type="button" onClick={() => setLegalModal('privacy')}>Privacy</button>
          <button type="button" onClick={() => setLegalModal('terms')}>Terms</button>
          <button type="button" onClick={() => setShowCookieConsent(true)}>Cookie Preferences</button>
          <a href="https://www.linkedin.com/in/ajellsaliba" target="_blank" rel="noreferrer" aria-label="Ajell Saliba on LinkedIn">LinkedIn</a>
          <a href="mailto:ajell.saliba@connectivestack.com">Email AJ</a>
        </div>
      </footer>
      {cookieConsent !== 'all' && !showCookieConsent && <a className="calendly-direct-badge" href={CALENDAR_URL} target="_blank" rel="noreferrer">Schedule time with me</a>}
      {showCookieConsent && <CookieConsent onChoice={saveCookieConsent} onPrivacy={() => setLegalModal('privacy')} />}
      {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
      {activeService && <ServiceModal service={activeService} onClose={() => setActiveService(null)} />}
    </>
  )
}

export function renderRoute(currentPath, search = '') {
const caseStudySlug = currentPath.startsWith('/case-studies/')
  ? currentPath.replace('/case-studies/', '')
  : null
const caseStudySlugs = new Set(['hvac-lead-system', 'luxury-real-estate', 'healthcare-patient-experience'])
const ghlSystemSlug = currentPath === '/ghl-systems'
  ? new URLSearchParams(search).get('system')
  : null

const guideSlug = currentPath.startsWith('/guides/') ? currentPath.replace('/guides/', '') : null
const solutionSlug = currentPath.startsWith('/solutions/') ? currentPath.replace('/solutions/', '') : null

const route = currentPath === '/seo-guides'
  ? <GuideHub />
  : guideSlugs.has(guideSlug)
    ? <Guide slug={guideSlug} />
    : solutionSlugs.has(solutionSlug)
      ? <Solution slug={solutionSlug} />
      : currentPath === '/ajell-saliba'
        ? <AboutAjell />
        : currentPath === '/ghl-systems'
          ? <GhlSystems slug={ghlSystemSlug || undefined} />
          : currentPath === '/demos/hvac-ai-front-desk'
    ? <HvacDemo />
    : currentPath === '/demos/luxury-real-estate'
      ? <RealEstateDemo />
      : currentPath === '/demos/healthcare-patient-experience'
        ? <HealthcareDemo />
        : caseStudySlugs.has(caseStudySlug)
          ? <CaseStudy slug={caseStudySlug} />
          : currentPath === '/' ? <App /> : <main className="seo-main seo-article"><h1>Page not found</h1><p>This address does not match a page on ConnectiveStack.</p><a href="/">Return to ConnectiveStack</a></main>

return route
}

if (typeof document !== 'undefined') {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  createRoot(document.getElementById('root')).render(renderRoute(path, window.location.search))
}
