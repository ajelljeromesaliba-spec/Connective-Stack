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
    title: 'Leads come in, but follow-up breaks',
    copy: 'A form gets submitted, but the lead stalls between the inbox, CRM, owner, calendar, or next follow-up.',
    tags: ['Lead routing', 'Follow-up', 'Booking'],
    summary: 'I trace the lead path from first submission to the person or system responsible for the next action, then fix the handoffs where leads are getting delayed or lost.',
    includes: ['Form and lead-source mapping', 'CRM contact and opportunity creation', 'Owner, pipeline, and notification routing', 'Calendar, reminder, and follow-up logic'],
    bestFor: 'Businesses generating inquiries but seeing slow responses, missed follow-up, or unclear ownership.',
    result: 'A lead path where every inquiry has a defined destination, next action, and fallback.',
  },
  {
    number: '02',
    title: 'The website works until the technical layer breaks',
    copy: 'The page may look fine while DNS, deployment, forms, email delivery, redirects, or third-party connections fail behind it.',
    tags: ['DNS', 'Deployment', 'Troubleshooting'],
    summary: 'I work backward from the visible failure, isolate the layer causing it, and repair the connection without treating every issue like a redesign.',
    includes: ['Domain and DNS checks', 'Vercel and GitHub deployment troubleshooting', 'Form and email-delivery verification', 'Redirect, routing, and integration checks'],
    bestFor: 'Teams with a site that is live but has technical issues affecting leads, access, delivery, or deployment.',
    result: 'A working customer path with the underlying technical issue identified and corrected.',
  },
  {
    number: '03',
    title: 'Your tools do not talk to each other',
    copy: 'Website, CRM, calendar, email, phone, and automation tools exist, but people still copy data or chase updates manually.',
    tags: ['Integrations', 'Webhooks', 'CRM'],
    summary: 'I map what information needs to move between systems, then connect the tools around the actual business process instead of adding another disconnected app.',
    includes: ['Website-to-CRM connections', 'Webhook and workflow setup', 'Calendar, email, phone, and database handoffs', 'Zapier, Make, API, or native integrations where appropriate'],
    bestFor: 'Businesses already paying for multiple platforms but still relying on manual handoffs.',
    result: 'A connected flow where data reaches the next system or person without unnecessary re-entry.',
  },
  {
    number: '04',
    title: 'The customer journey has too much friction',
    copy: 'Visitors cannot tell what to do next, forms ask the wrong questions, or booking and qualification paths create unnecessary drop-off.',
    tags: ['UX', 'Qualification', 'Conversion path'],
    summary: 'I simplify the journey around the real decision the customer needs to make, then connect that action to the system behind it.',
    includes: ['CTA and page-flow review', 'Form and qualification structure', 'Booking-path simplification', 'Mobile and responsive journey checks'],
    bestFor: 'Businesses with traffic or interest but a confusing path from first visit to inquiry or appointment.',
    result: 'A clearer customer journey with fewer unnecessary steps between intent and action.',
  },
  {
    number: '05',
    title: 'Automation works until an edge case happens',
    copy: 'The happy path runs, but duplicates, missing fields, failed webhooks, no-shows, or unanswered leads expose weak spots.',
    tags: ['Fallback logic', 'Edge cases', 'Testing'],
    summary: 'I test beyond the ideal workflow and add rules for the cases that usually create silent failures or manual cleanup.',
    includes: ['Duplicate-contact handling', 'Missing-data and status checks', 'Failure notifications and fallback tasks', 'No-show, no-response, and retry paths'],
    bestFor: 'Teams with automations that technically run but still require frequent manual rescue.',
    result: 'A workflow that has a defined response when the normal path does not complete.',
  },
  {
    number: '06',
    title: 'Internal handoffs depend on memory',
    copy: 'A deal closes or a status changes, but the next person only knows because someone sends a message or remembers to create a task.',
    tags: ['Tasks', 'Notifications', 'Onboarding'],
    summary: 'I turn repeatable handoffs into visible workflow steps so ownership, timing, and required actions are easier to track.',
    includes: ['Task creation and assignment', 'Internal alerts and status changes', 'Client onboarding sequences', 'Pipeline and delivery-stage updates'],
    bestFor: 'Small teams where important follow-through still depends on manual reminders and scattered messages.',
    result: 'A repeatable handoff with clear ownership and fewer steps left to memory.',
  },
]

const pricingTiers = [
  {
    name: 'Focused Fix',
    price: '1,500',
    label: 'Starting project price · USD',
    description: 'For a contained problem with a clear failure point: a broken lead path, website issue, form, booking flow, routing problem, or technical handoff.',
    bestFor: 'Best for one clearly defined problem that does not require rebuilding the whole system',
    includes: ['Diagnosis of the affected customer path', 'Repair or rebuild of the agreed failure point', 'Required configuration and connection work', 'End-to-end testing of the repaired path', 'Clear handoff and documentation', 'Production deployment where required', 'Defined revision scope', '30 days of post-launch technical support'],
  },
  {
    name: 'Acquisition Path Rebuild',
    price: '3,000',
    label: 'Starting project price · USD',
    description: 'For businesses getting interest but losing momentum between the first click, inquiry, qualification, follow-up, and appointment.',
    bestFor: 'Best for businesses with demand but an unreliable path from inquiry to next action',
    featured: true,
    includes: ['Full lead-path diagnosis', 'Everything in the Focused Fix', 'Form, qualification, and CTA logic', 'CRM, ownership, and pipeline routing', 'Follow-up and booking automation', 'Tracking for the agreed conversion path', 'End-to-end QA and handoff', '30 days of post-launch technical support'],
  },
  {
    name: 'Connected Acquisition System',
    price: '5,000',
    label: 'Starting project price · USD',
    description: 'For teams whose website, CRM, calendar, email, phone, and automations exist but still behave like separate systems.',
    bestFor: 'Best for businesses with multiple tools, manual handoffs, and unclear ownership across the customer journey',
    includes: ['Full lead-path diagnosis', 'Everything in the Acquisition Path Rebuild', 'Website, CRM, calendar, and communication connections', 'Workflow, ownership, and fallback logic', 'Lead routing and lifecycle automation', 'Custom integration work within the agreed scope', 'Failure-path testing, QA, and documentation', '30 days of post-launch technical support'],
  },
]

const process = [
  ['01', 'Diagnose the failure', 'We trace what should happen from first customer action to the next business outcome, then identify where data, ownership, communication, or intent breaks.'],
  ['02', 'Prescribe the smallest useful fix', 'I define what actually needs to change, what should stay, which tools belong in the solution, and the success criteria before implementation starts.'],
  ['03', 'Build and connect', 'I implement the agreed fix across the customer-facing experience and the systems behind it, without adding tools that do not solve the diagnosed problem.'],
  ['04', 'Verify the real path', 'We test the normal path and the failure cases end to end, then launch with ownership, documentation, and the next measurement point defined.'],
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
            <span>CONNECTIVE STACK / PROBLEM AREA</span>
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
          <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="button button-primary service-modal-cta" onClick={onClose}>Discuss this problem <Arrow /></a>
        </div>
      </section>
    </div>
  )
}

const CALENDAR_URL = 'https://calendly.com/ajell-saliba-connectivestack/30min'
const offerTicker = [
  'Customer-path diagnosis',
  'Lead-path repair',
  'CRM & ownership routing',
  'Website & delivery failures',
  'Disconnected-tool repair',
  'Booking & follow-up logic',
  'Technical troubleshooting',
  'AI where it earns its place',
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
        `Phone: ${payload.phone || 'Not provided'}`,
        `Company: ${payload.company || 'Not provided'}`,
        `Service: ${payload.service || ''}`,
        `Engagement: ${payload.engagement || ''}`,
        `Budget: ${payload.budget || ''}`,
        `Timeline: ${payload.timeline || ''}`,
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
        <h3>Tell me what should happen, and what happens instead.</h3>
        <p>Share the current setup, the failure or bottleneck, the result you expected, and any deadline or budget constraint. I use that to narrow the problem before recommending a build.</p>
      </div>
      <label>Full name<input name="name" required autoComplete="name" placeholder="Your name" /></label>
      <label>Work email<input name="email" required type="email" autoComplete="email" placeholder="you@company.com" /></label>
      <label>Phone number <small>Optional</small><input name="phone" type="tel" autoComplete="tel" placeholder="US or international number" /></label>
      <label>Company or business<input name="company" autoComplete="organization" placeholder="Company name" /></label>
      <label>Current website <small>Optional</small><input name="website" type="url" inputMode="url" placeholder="https://" /></label>
      <label>What is going wrong?<select name="service" required defaultValue=""><option value="" disabled>Select the closest problem</option><option>Leads are not being followed up correctly</option><option>Website or form is not working as expected</option><option>CRM, calendar, or tools are disconnected</option><option>Customer journey or booking flow has too much friction</option><option>Automation is failing on edge cases</option><option>Internal handoffs are too manual</option><option>I need a new website around a better customer path</option><option>Technical troubleshooting / hourly support</option><option>Not sure yet</option></select></label>
      <label>Engagement type<select name="engagement" required defaultValue="Project-based"><option>Project-based</option><option>Hourly support</option><option>Ongoing support</option><option>Not sure yet</option></select></label>
      <label>Estimated budget<select name="budget" required defaultValue=""><option value="" disabled>Select a range</option><option>$1,500–$2,999</option><option>$3,000–$4,999</option><option>$5,000–$7,499</option><option>$7,500+</option><option>Need a recommendation</option></select></label>
      <label>Preferred timeline<select name="timeline" required defaultValue=""><option value="" disabled>Select a timeline</option><option>As soon as possible</option><option>Within 2 weeks</option><option>Within 30 days</option><option>1 to 3 months</option><option>Flexible or planning ahead</option></select></label>
      <label className="inquiry-wide">What do you need, and what should the project improve?<textarea name="message" required rows="6" maxLength="3000" placeholder="Tell me about your business, the current problem, the pages or systems you need, and the outcome you want." /></label>
      <label className="inquiry-honeypot" aria-hidden="true">Leave this field blank<input name="website_check" tabIndex="-1" autoComplete="off" /></label>
      <label className="inquiry-consent inquiry-wide"><input type="checkbox" name="consent" value="yes" required /><span>I agree to be contacted about this project and understand that submitting this form does not create a service agreement.</span></label>
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
            <a href="#services" onClick={closeMenu}>Problems I Solve</a>
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
          <a className="nav-cta" href={CALENDAR_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>Show me the problem <Arrow /></a>
        </nav>
      </header>

      <main id="top" className="portfolio-main">
        <section className="hero cinematic-hero journey-hero" data-scroll-scene>
          <div className="hero-pinned">
            <ConnectionScene />
            <div className="hero-grid grid-lines" aria-hidden="true" />
            <div className="hero-copy">
              <div className="eyebrow"><span className="status-dot" /> AJ Saliba / Customer acquisition systems</div>
              <h1>Your leads aren’t always the problem. <em>What happens next might be.</em></h1>
              <p className="hero-lead">I find where prospects get lost between your website, forms, calls, CRM, follow-up, and booking, then build the system that fixes the broken handoffs.</p>
              <div className="hero-actions">
                <a href="#work" className="button button-primary">See how I solve it <Arrow /></a>
                <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="button button-secondary">Talk through a problem <Arrow /></a>
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
              <span className="kicker">Proof of method / Concept case studies</span>
              <h2 id="proof-heading">See the diagnosis before the build.</h2>
              <p>These concept case studies show how I trace a broken customer path, define the target state, choose the system response, and test the handoffs. They are capability demonstrations, not claims of measured client results.</p>
              <a href="/case-studies/hvac-lead-system" className="live-project-link">Open a case study <Arrow /></a>
            </div>
            <div className="live-project-mark"><img width="494" height="410" decoding="async" src="/assets/pawnova-logo-transparent-optimized.webp" alt="ConnectiveStack project proof" loading="lazy" /></div>
          </div>
        </section>

        <section className="section services" id="services" data-scroll-scene>
          <div className="services-background" aria-hidden="true">
            <video muted loop playsInline preload="none" poster="/assets/problems-motion-poster.jpg">
              <source src="/assets/problems-motion.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="section-heading" data-reveal>
            <span className="kicker">Problems I solve</span>
            <h2>Start with what is breaking. Then fix the system around it.</h2>
            <p>Sometimes the fix is a page. Sometimes it is DNS, CRM routing, a workflow, calendar logic, email delivery, a webhook, or a deployment issue. I start with the failure point, not a preset package.</p>
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

        <section className="price-section" data-scroll-scene>
          <div className="price-intro" data-reveal>
            <span className="kicker">Ways to work together</span>
            <h2>Diagnose first. Scope the fix second.</h2>
            <p>I do not prescribe the same stack to every business. We start with the failure point, define the smallest system that fixes it, then agree on scope, price, and success criteria before implementation.</p>
          </div>
          <div className="pricing-grid" data-reveal>
            {pricingTiers.map(tier => (
              <article className={`pricing-tier ${tier.featured ? 'featured' : ''}`} key={tier.name} data-depth-card>
                {tier.featured && <span className="pricing-popular">Most common rebuild</span>}
                <div className="pricing-tier-head">
                  <span>{tier.name}</span>
                  <strong><sup>$</sup>{tier.price}<b>+</b></strong>
                  <small>{tier.label}</small>
                </div>
                <p>{tier.description}</p>
                <em>{tier.bestFor}</em>
                <ul>{tier.includes.map(item => <li key={item}><Check />{item}</li>)}</ul>
                <a className={`button ${tier.featured ? 'button-primary' : 'button-secondary'}`} href={CALENDAR_URL} target="_blank" rel="noreferrer">Discuss this project <Arrow /></a>
              </article>
            ))}
          </div>
          <div className="pricing-trust-points" data-reveal>
            <article data-depth-card>
              <span className="pricing-trust-icon" aria-hidden="true"><Check /></span>
              <div>
                <strong>You Own What We Build</strong>
                <p>Your production accounts, domain, and project assets remain under your ownership. ConnectiveStack simply gets the access needed to build and manage your system.</p>
              </div>
            </article>
            <article data-depth-card>
              <span className="pricing-trust-icon" aria-hidden="true"><Check /></span>
              <div>
                <strong>30-Day Post-Launch Support</strong>
                <p>Technical support for the original build is included for 30 days after launch.</p>
              </div>
            </article>
          </div>
          <div className="hourly-support" data-reveal data-depth-card>
            <div className="hourly-support-rate">
              <span>Flexible support</span>
              <strong><sup>$</sup>75<small>/hour</small></strong>
              <p>For smaller updates, fixes, and ongoing technical help.</p>
            </div>
            <div className="hourly-support-details">
              <strong>What hourly support can cover</strong>
              <ul>
                <li><Check /> Website content and layout updates</li>
                <li><Check /> Technical troubleshooting and bug fixes</li>
                <li><Check /> Domain, DNS, form, and calendar support</li>
                <li><Check /> CRM, workflow, and integration updates</li>
              </ul>
            </div>
            <div className="hourly-support-terms">
              <span>Clear expectations</span>
              <p><strong>1-hour minimum</strong> for each support request, then billed in 30-minute increments. I confirm the expected time before starting. Larger builds and new features are quoted as fixed-price projects.</p>
              <a href={CALENDAR_URL} target="_blank" rel="noreferrer">Request hourly support <Arrow /></a>
            </div>
          </div>
          <div className="pricing-note" data-reveal>
            <strong>The diagnosis does not fit a box?</strong>
            <p>Good. The point is not to force your business into a package. If the real fix needs custom web work, AI, voice, API integration, or a different architecture, I scope that after understanding the failure. Third-party platform and usage fees remain separate.</p>
          </div>
        </section>

        <section className="process-showcase" id="process" data-scroll-scene>
          <div className="process-heading" data-reveal>
            <div>
              <span className="kicker">The ConnectiveStack method</span>
              <h2>Diagnose. Prescribe. Build. Verify.</h2>
            </div>
            <p>The tool is never the starting point. I trace the business problem across the customer-facing experience and the technical layers behind it, then use only the pieces needed to repair the path.</p>
          </div>

          <div className="process-stage">
            <div className="process-film" data-reveal>
              <video muted loop playsInline preload="none" poster="/assets/automation-process-gold-poster.jpg">
                <source src="/assets/automation-process-gold.mp4" type="video/mp4" />
              </video>
              <div className="process-film-topbar">
                <span><i /> Build sequence</span>
                <span>Diagnose / Prescribe / Build / Verify</span>
                <span>Connected system</span>
              </div>
              <div className="process-film-caption">
                <small>Connected execution</small>
                <strong>One method from visible symptom to verified fix</strong>
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
            <div><i /> Forms and qualification</div>
            <div><i /> CRM and ownership</div>
            <div><i /> Automation and integrations</div>
            <div><i /> Infrastructure and deployment</div>
          </div>
        </section>

        <section className="contact-section" id="contact" data-scroll-scene>
          <div className="contact-glow" />
          <div className="contact-content" data-reveal>
            <span className="kicker kicker-dark">Start with the problem</span>
            <h2>Show me what is broken, slow, disconnected, or still manual.</h2>
            <p>Send the current website, tools, what should happen, what happens instead, and any deadline or budget constraint. I will trace the likely failure points and recommend a realistic scope.</p>
            <div className="contact-actions">
              <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="button button-light">Book a discovery call <Arrow /></a>
              <a href="mailto:ajell.saliba@connectivestack.com?subject=Website%20project%20inquiry" className="contact-email">ajell.saliba@connectivestack.com</a>
            </div>
            <div className="contact-expectations">
              <div><strong>Project-based</strong><span>Defined scope, price, and delivery plan</span></div>
              <div><strong>$75/hour</strong><span>Technical support with a one-hour minimum</span></div>
              <div><strong>1 business day</strong><span>Typical response time for new inquiries</span></div>
            </div>
          </div>
          <div className="contact-panel" data-reveal><ProjectInquiryForm /></div>
        </section>
      </main>

      <footer className="portfolio-footer">
        <a href="#top" className="footer-brand"><img width="1200" height="199" decoding="async" src="/assets/connectivestack-metallic-logo-optimized.webp" alt="ConnectiveStack" /></a>
        <p>Diagnosing and fixing the broken handoffs between customer intent, your website, CRM, follow-up, booking, and the people responsible for the next action.</p>
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
