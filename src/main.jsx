import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import HvacDemo from './HvacDemo'
import RealEstateDemo from './RealEstateDemo'
import HealthcareDemo from './HealthcareDemo'
import CaseStudy from './CaseStudy'
import GhlSystems from './GhlSystems'
import { GuideHub, Guide, Solution, guideSlugs, solutionSlugs } from './SeoPages'
import './premium.css'
import './secondary-dark.css'
import './spatial.css'
import ProfessionalRecommendation from './ProfessionalRecommendation'
import './brand-refresh.css'
import './responsive-polish.css'
import './pawnova-showcase.css'
import './glassmorphism.css'
import './frosted-site.css'


const SOCIAL_PROFILES = [
  { name: 'Facebook', url: 'https://www.facebook.com/share/18iv6b2mkH/' },
  { name: 'Instagram', url: 'https://www.instagram.com/connectivestack/' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@connectivestack' },
]

function SocialIcon({ name }) {
  if (name === 'Facebook') return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.03 3.66 9.2 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.5-3.92 3.8-3.92 1.1 0 2.25.2 2.25.2v2.48h-1.27c-1.25 0-1.64.77-1.64 1.57v1.89h2.79l-.45 2.91h-2.34V22C18.35 21.26 22 17.09 22 12.06Z" />
    </svg>
  )
  if (name === 'Instagram') return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.6" cy="6.5" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  )
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.7 2h-3.2v12.7a3.1 3.1 0 1 1-3.2-3.1V8.3a6.4 6.4 0 1 0 6.4 6.4V7.6c1.4 1.1 3.2 1.7 5.1 1.7V6.1c-2.8 0-5.1-2.1-5.1-4.1Z" />
    </svg>
  )
}

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

const Check = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

const services = [
  {
    number: '01',
    title: 'Every customer action gets a clear next step',
    copy: 'New inquiries, form submissions, calls, and other customer actions can move into the right response, routing, follow-up, or booking path without relying on memory.',
    tags: ['Lead routing', 'Follow-up', 'Booking'],
    summary: 'ConnectiveStack traces the lead path from first submission to the person or system responsible for the next action, then fixes the handoffs where leads are getting delayed or lost.',
    includes: ['Form and lead-source mapping', 'CRM contact and opportunity creation', 'Owner, pipeline, and notification routing', 'Calendar, reminder, and follow-up logic'],
    bestFor: 'Businesses generating inquiries but seeing slow responses, missed follow-up, or unclear ownership.',
    result: 'A lead path where every inquiry has a defined destination, next action, and fallback.',
  },
  {
    number: '02',
    title: 'Your customer path stays live and reliable',
    copy: 'Forms submit, emails arrive, domains resolve, redirects work, and the technical layer supports the customer journey instead of interrupting it.',
    tags: ['DNS', 'Deployment', 'Troubleshooting'],
    summary: 'ConnectiveStack works backward from the visible failure, isolates the layer causing it, and repairs the connection without treating every issue like a redesign.',
    includes: ['Domain and DNS checks', 'Vercel and GitHub deployment troubleshooting', 'Form and email-delivery verification', 'Redirect, routing, and integration checks'],
    bestFor: 'Teams with a site that is live but has technical issues affecting leads, access, delivery, or deployment.',
    result: 'A working customer path with the underlying technical issue identified and corrected.',
  },
  {
    number: '03',
    title: 'Your systems move data without manual re-entry',
    copy: 'Website, CRM, calendar, email, phone, and automation tools pass the right information forward so your team spends less time copying data or chasing updates.',
    tags: ['Integrations', 'Webhooks', 'CRM'],
    summary: 'ConnectiveStack maps what information needs to move between systems, then connects the tools around the actual business process instead of adding another disconnected app.',
    includes: ['Website-to-CRM connections', 'Webhook and workflow setup', 'Calendar, email, phone, and database handoffs', 'Zapier, Make, API, or native integrations where appropriate'],
    bestFor: 'Businesses already paying for multiple platforms but still relying on manual handoffs.',
    result: 'A connected flow where data reaches the next system or person without unnecessary re-entry.',
  },
  {
    number: '04',
    title: 'Visitors can reach inquiry or booking with less friction',
    copy: 'Clear calls to action, better qualification, and a simpler booking path make it easier for interested visitors to take the next useful step.',
    tags: ['UX', 'Qualification', 'Conversion path'],
    summary: 'ConnectiveStack simplifies the journey around the real decision the customer needs to make, then connects that action to the system behind it.',
    includes: ['CTA and page-flow review', 'Form and qualification structure', 'Booking-path simplification', 'Mobile and responsive journey checks'],
    bestFor: 'Businesses with traffic or interest but a confusing path from first visit to inquiry or appointment.',
    result: 'A clearer customer journey with fewer unnecessary steps between intent and action.',
  },
  {
    number: '05',
    title: 'Automations recover instead of silently failing',
    copy: 'Duplicates, missing fields, failed webhooks, no-shows, and unanswered leads trigger a defined fallback instead of creating invisible cleanup work.',
    tags: ['Fallback logic', 'Edge cases', 'Testing'],
    summary: 'ConnectiveStack tests beyond the ideal workflow and adds rules for the cases that usually create silent failures or manual cleanup.',
    includes: ['Duplicate-contact handling', 'Missing-data and status checks', 'Failure notifications and fallback tasks', 'No-show, no-response, and retry paths'],
    bestFor: 'Teams with automations that technically run but still require frequent manual rescue.',
    result: 'A workflow that has a defined response when the normal path does not complete.',
  },
  {
    number: '06',
    title: 'Every handoff has a clear owner and next action',
    copy: 'When a deal closes or a status changes, the right person gets the task, context, and timing automatically instead of relying on memory.',
    tags: ['Tasks', 'Notifications', 'Onboarding'],
    summary: 'ConnectiveStack turns repeatable handoffs into visible workflow steps so ownership, timing, and required actions are easier to track.',
    includes: ['Task creation and assignment', 'Internal alerts and status changes', 'Client onboarding sequences', 'Pipeline and delivery-stage updates'],
    bestFor: 'Small teams where important follow-through still depends on manual reminders and scattered messages.',
    result: 'A repeatable handoff with clear ownership and fewer steps left to memory.',
  },
]

const process = [
  ['01', 'Define the outcome', 'Agree on the problem, expected behavior and how we will verify it. Where baseline data exists, identify a useful measure such as response time, missed inquiries or manual steps.'],
  ['02', 'Find the constraint', 'ConnectiveStack traces the current customer and data path to identify the smallest set of changes standing between the current setup and the target outcome.'],
  ['03', 'Build the useful system', 'ConnectiveStack implements the customer-facing experience, CRM logic, integrations, and automations needed to produce the agreed next action without adding tools for their own sake.'],
  ['04', 'Verify end to end', 'Run agreed end-to-end acceptance checks, including relevant failure cases. Review the results with you, document ownership and remaining limitations, and hand over the agreed deliverables.'],
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
              <p>This website may use essential browser storage to remember site preferences, including your cookie choice. Booking links take you to Calendly only when you choose to schedule. You can reopen Cookie Preferences from the footer and change your choice.</p>
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
              <p>Privacy questions can be submitted through the <a href="#project-inquiry" onClick={onClose}>contact form</a> for hello@connectivestack.com.</p>
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
              <p>Questions about these terms can be submitted through the <a href="#project-inquiry" onClick={onClose}>contact form</a> for hello@connectivestack.com.</p>
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
              <span>What ConnectiveStack checks and fixes</span>
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
  'Websites & landing pages',
  'CRM & GHL systems',
  'Workflow automation',
  'APIs & webhooks',
  'AI assistants & receptionists',
  'Booking & intake flows',
  'DNS, deployment & email setup',
  'Technical troubleshooting & QA',
]

const leadConversionCapabilities = [
  {
    number: '01',
    title: 'Websites & landing pages',
    copy: 'Build responsive pages around the action the visitor needs to take, then connect forms, booking, tracking, and the systems behind them.',
    outcome: 'A customer-facing experience that is clear, fast, and connected to the next business step.',
  },
  {
    number: '02',
    title: 'CRM & GoHighLevel systems',
    copy: 'Set up pipelines, opportunities, forms, calendars, routing, follow-up, segmentation, and the workflow logic around them.',
    outcome: 'Customer and lead activity is easier to track, assign, and move forward.',
  },
  {
    number: '03',
    title: 'Workflow automation',
    copy: 'Turn repeatable manual steps into triggered workflows with clear conditions, ownership, retries, and fallback actions.',
    outcome: 'Less routine work depends on memory, copying data, or checking several tools.',
  },
  {
    number: '04',
    title: 'APIs, webhooks & integrations',
    copy: 'Connect websites, CRMs, calendars, email, databases, and third-party tools so the right data reaches the right place.',
    outcome: 'Systems work together instead of creating another manual handoff.',
  },
  {
    number: '05',
    title: 'AI assistants & receptionists',
    copy: 'Use AI where it is useful for calls, qualification, support, intake, routing, or structured assistance without making it the source of truth for rules it should not control.',
    outcome: 'AI handles defined repetitive work while business rules and human review stay where they belong.',
  },
  {
    number: '06',
    title: 'Booking, intake & customer flows',
    copy: 'Design the path from first contact through qualification, scheduling, reminders, handoff, and follow-up.',
    outcome: 'Customers have a simpler path to the next step and your team receives better context.',
  },
  {
    number: '07',
    title: 'DNS, deployment & email setup',
    copy: 'Handle domains, subdomains, SSL, Vercel and GitHub deployment, SPF, DKIM, DMARC, MX records, and related launch work.',
    outcome: 'The technical foundation is configured correctly and easier to troubleshoot later.',
  },
  {
    number: '08',
    title: 'Technical QA & troubleshooting',
    copy: 'Trace broken forms, failed automations, deployment issues, integration errors, routing problems, and edge cases across the full path.',
    outcome: 'Problems are isolated and fixed at the layer actually causing them.',
  },
]
function CookieConsent({ onChoice, onPrivacy }) {
  return (
    <aside className="cookie-consent" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <div className="cookie-consent-copy">
        <span>COOKIE PREFERENCES</span>
        <strong>Your privacy, your choice.</strong>
        <p>This site uses essential browser storage for preferences. Booking links open Calendly only when you choose to schedule. You can change your cookie choice later.</p>
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

  const submitInquiry = async event => {
    event.preventDefault()
    setStatus('sending')
    setFeedback('')
    const form = event.currentTarget
    const payload = Object.fromEntries(new FormData(form).entries())

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || result.ok !== true) throw new Error(result.error || 'The inquiry could not be sent.')
      form.reset()
      setStatus('success')
      setFeedback('Thanks. Your project details were sent to AJ. Expect a reply within one business day.')
    } catch (error) {
      setStatus('error')
      setFeedback('The inquiry was not sent. Your details are still in the form. Please try again or book a discovery call if the issue continues.')
    }
  }

  return (
    <form id="project-inquiry" className="inquiry-form" onSubmit={submitInquiry}>
      <div className="inquiry-form-heading">
        <span>PROJECT INQUIRY</span>
        <h3>Tell me what you need.</h3>
        <p>Describe the problem, who it affects, and what you want to happen instead. We will review the details and discuss whether the work is a fit.</p>
      </div>
      <label>Full name<input name="name" required autoComplete="name" placeholder="Your name" /></label>
      <label>Work email<input name="email" required type="email" autoComplete="email" placeholder="you@company.com" /></label>
      <label className="inquiry-wide">Company or website <small>Optional</small><input name="company" autoComplete="organization" placeholder="Company name or website" /></label>
      <label className="inquiry-wide">What do you need?<textarea name="message" required rows="5" maxLength="3000" placeholder="Briefly describe what you want built, fixed, connected, or automated." /></label>
      <label className="inquiry-honeypot" aria-hidden="true">Leave this field blank<input name="website_check" tabIndex="-1" autoComplete="off" /></label>
      <label className="inquiry-consent inquiry-wide"><input type="checkbox" name="consent" value="yes" required /><span>You can contact me about this inquiry.</span></label>
      <button className="button button-primary inquiry-submit inquiry-wide" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending inquiry…' : 'Send project inquiry'} <Arrow /></button>
      {feedback && <div className={`inquiry-feedback ${status}`} role="status"><p>{feedback}</p>{status === 'error' && <div className="inquiry-fallback-actions"><a href={CALENDAR_URL} target="_blank" rel="noreferrer">Book a discovery call</a></div>}</div>}
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
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const targets = document.querySelectorAll('.frost-demos > *, .frost-showcase, .section-heading, .service-card, .lead-system-heading, .lead-system-flow, .lead-system-card, .lead-system-cta, .ai-receptionist-copy, .ai-receptionist-flow, .engagement-trust article, .process-heading, .process-steps article, .portfolio-project-inner, .recommendation-intro, .recommendation-card, .contact-content, .contact-panel')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('editorial-arrived')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    targets.forEach(target => {
      if (target.getBoundingClientRect().top >= window.innerHeight) observer.observe(target)
    })
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
          <img width="1200" height="220" decoding="async" src="/assets/connectivestack-glass-logo.svg" alt="ConnectiveStack" />
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
                  <strong>Lead System Case Study</strong>
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
                  <small>AI + Voice</small>
                  <strong>AI Front Desk Example</strong>
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
                <a href="/style-picker/" onClick={closeMenu}>
                  <small>Interactive Design Tool</small>
                  <strong>Website Style Picker</strong>
                  <span>Explore templates, typography, and brand colors</span>
                </a>
              </div>
            </div>
            <a href="#process" onClick={closeMenu}>Process</a>
            <a href="/ghl-systems" onClick={closeMenu}>GHL Systems</a>
            <a href="/seo-guides" onClick={closeMenu}>Guides</a>
            <a href="https://ajellsaliba.services/" target="_blank" rel="noopener noreferrer" onClick={closeMenu} aria-label="About Ajell, open personal portfolio in a new tab">About</a>
          </div>
          <a className="nav-cta" href={CALENDAR_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>Book a system review <Arrow /></a>
        </nav>
      </header>

      <main id="top" className="portfolio-main">
        <section className="frost-hero" aria-labelledby="frost-hero-title">
          <div className="frost-hero-copy">
            <span className="frost-eyebrow"><i /> Web · CRM · Automation · AI</span>
            <h1 id="frost-hero-title">Every inquiry.<br />A clear <em>next step.</em></h1>
            <p className="frost-lead">Stop losing inquiries to broken systems and missed follow-ups. We build and repair websites, CRM workflows and AI receptionists so your customers reach the right next action.</p>
            <div className="frost-actions">
              <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="button button-primary">Book a system review <Arrow /></a>
              <a href="#live-examples" className="button button-secondary">Explore live demos <Arrow /></a>
            </div>
            <p className="frost-brand-note">ConnectiveStack (Connective Stack) · Founder-led technical delivery</p>
          </div>
          <div className="frost-console" aria-label="Illustrative customer workflow dashboard">
            <div className="frost-console-top"><span><i /><i /><i /></span><strong>Connected workspace</strong><small>Example workflow</small></div>
            <div className="frost-console-body">
              <aside className="frost-console-nav" aria-label="Illustrative modules"><span className="frost-console-active">◈ Overview</span><span>Website</span><span>CRM</span><span>Automations</span><span>AI reception</span></aside>
              <div className="frost-console-content">
                <div className="frost-console-heading"><div><small>Customer journey</small><h2>Lead activity</h2></div><span className="frost-state"><i /> Sample</span></div>
                <div className="frost-mini-grid"><div><small>01 · Capture</small><strong>Inquiry</strong></div><div><small>02 · Route</small><strong>CRM</strong></div><div><small>03 · Respond</small><strong>Follow-up</strong></div></div>
                <div className="frost-chart"><span>Workflow overview</span><svg viewBox="0 0 320 110" role="img" aria-label="Illustrative connected workflow line" preserveAspectRatio="none"><defs><linearGradient id="frostLine"><stop stopColor="#e2c0fa"/><stop offset="1" stopColor="#d16dcb"/></linearGradient><linearGradient id="frostArea" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#c58ee3" stopOpacity=".24"/><stop offset="1" stopColor="#c58ee3" stopOpacity="0"/></linearGradient></defs><path d="M0 94H320M0 63H320M0 32H320" stroke="#e0c6f4" strokeOpacity=".13" strokeDasharray="3 5"/><path d="M0 87C35 87 44 47 79 60S125 83 150 46 192 63 217 37 256 49 282 24 307 20 320 12V110H0Z" fill="url(#frostArea)"/><path d="M0 87C35 87 44 47 79 60S125 83 150 46 192 63 217 37 256 49 282 24 307 20 320 12" fill="none" stroke="url(#frostLine)" strokeWidth="2.4" vectorEffect="non-scaling-stroke"/></svg></div>
                <div className="frost-console-log"><span><Check /> Form captured</span><span>CRM owner assigned</span><span>Next action defined</span></div>
              </div>
            </div>
          </div>
        </section>
        <div className="editorial-capabilities" aria-label="Technical capabilities">
          <span>Website development</span><span>CRM &amp; automation</span><span>AI integrations</span><span>Technical support</span>
        </div>
        <section className="frost-demos editorial-demos" id="live-examples" aria-labelledby="frost-demos-title">
          <div className="editorial-intro"><span className="kicker">Selected work · Interactive concepts</span><h2 id="frost-demos-title">See what connected<br />systems can do.</h2><p>Explore working concept demos that connect the website, customer intake and the next action.</p></div>
          {[
            {tag:'01 / Home services',title:'Never miss the next call.',copy:'An AI front desk concept for service businesses, with qualification, estimates and appointment intake.',label:'Explore HVAC AI front desk',href:'/demos/hvac-ai-front-desk',image:'/assets/hero-hvac-arrival-v1.webp',width:1672,height:941,alt:'HVAC service concept imagery'},
            {tag:'02 / Real estate',title:'Make every viewing count.',copy:'A luxury brokerage concept connecting property discovery to buyer inquiries and broker routing.',label:'Explore real estate demo',href:'/demos/luxury-real-estate',image:'/assets/realestate-austin-premium-optimized.webp',width:1200,height:801,alt:'Contemporary luxury property concept imagery'},
            {tag:'03 / Healthcare',title:'A clearer path to care.',copy:'A patient experience concept with intake, scheduling and provider routing.',label:'Explore healthcare demo',href:'/demos/healthcare-patient-experience',image:'/assets/healthcare-hero-v1.webp',width:1672,height:941,alt:'Healthcare patient experience concept imagery'}
          ].map((demo,i)=><article className={'frost-showcase'+(i%2?' frost-showcase-reverse':'')} key={demo.href}>
            <div className="frost-showcase-copy"><small>{demo.tag}</small><h3>{demo.title}</h3><p>{demo.copy}</p><a className="editorial-link" href={demo.href}>{demo.label} <Arrow /></a></div>
            <a className="frost-showcase-visual" href={demo.href} aria-label={demo.label}><img src={demo.image} width={demo.width} height={demo.height} alt={demo.alt} loading="lazy" decoding="async" /><span className="frost-showcase-label">Live concept demo <Arrow /></span></a>
          </article>)}
        </section>

        <section className="section services" id="services">
          <div className="section-heading">
            <span className="kicker">Business outcomes</span>
            <h2>Where is your business losing time or customer inquiries?</h2>
            <p>A missed call, a form that never reaches the CRM, or a lead with no assigned owner can cost you an opportunity. We identify which part of your process is failing, agree on the expected behavior, and build the fix around it. Open any outcome below to see what we check and what delivery looks like.</p>
          </div>
          <div className="service-list">
            {services.map((service, index) => (
              <article className="service-card" key={service.title}>
                <span className="editorial-index">{String(index+1).padStart(2, '0')}</span>
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

        <section className="lead-system-section" id="lead-system" aria-labelledby="lead-system-heading">
          <div className="lead-system-heading">
            <span className="kicker">How the result gets delivered</span>
            <h2 id="lead-system-heading">Know what happens after every inquiry.</h2>
            <p>For example, when a visitor requests a quote, the form should capture the details, create or update a CRM record, notify the assigned person and trigger the agreed follow-up. If a connection fails, there should be a visible fallback. We design and test that path using the tools your business actually needs.</p>
          </div>

          <div className="lead-system-flow" aria-label="Connected delivery workflow">
            <span>Website</span>
            <i aria-hidden="true">→</i>
            <span>CRM</span>
            <i aria-hidden="true">→</i>
            <span>Integrations</span>
            <i aria-hidden="true">→</i>
            <span>Automation</span>
            <i aria-hidden="true">→</i>
            <span>AI + QA</span>
          </div>

          <div className="lead-system-grid">
            {leadConversionCapabilities.map(item => (
              <article className="lead-system-card" key={item.title}>
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

          <div className="lead-system-cta">
            <div>
              <span>Project-based or ongoing technical support</span>
              <strong>Bring the current setup and desired result. You’ll get a clear view of what ConnectiveStack can own, what should change, and where deeper specialization is needed.</strong>
            </div>
            <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="button button-primary">Discuss the project <Arrow /></a>
          </div>
        </section>

        <section className="ai-receptionist-section" id="ai-receptionist" aria-labelledby="ai-receptionist-heading">
          <div className="ai-receptionist-shell">
            <div className="ai-receptionist-copy">
              <span className="kicker">AI Receptionist</span>
              <h2 id="ai-receptionist-heading">Keep inbound calls moving toward qualification, booking, or the right human handoff.</h2>
              <p>The AI receptionist can answer inbound calls 24/7, handle common questions, capture contact details, qualify the caller, and book appointments into your calendar. The same lead can continue into CRM routing, SMS or email follow-up, reminders, and human handoff without starting over.</p>
              <div className="ai-receptionist-actions">
                <a href="/demos/hvac-ai-front-desk" className="button button-primary">See an AI front desk example <Arrow /></a>
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
          <p className="ai-receptionist-note">AI is the mechanism. The result is a defined path from an inbound call to captured details, qualification, booking, CRM follow-up, or human handoff.</p>
        </section>

        <section className="pricing-trust-points engagement-trust" aria-label="What to expect when working with ConnectiveStack">
          <article>
            <span className="pricing-trust-icon" aria-hidden="true"><Check /></span>
            <div>
              <strong>You Own What We Build</strong>
              <p>Your production accounts, domain, and project assets remain under your ownership. ConnectiveStack gets only the access needed to build and manage the agreed system.</p>
            </div>
          </article>
          <article>
            <span className="pricing-trust-icon" aria-hidden="true"><Check /></span>
            <div>
              <strong>30-Day Post-Launch Support</strong>
              <p>Technical support for the original build is included for 30 days after launch so issues tied to the delivered scope can be addressed.</p>
            </div>
          </article>
        </section>

        <section className="process-showcase" id="process">
          <div className="process-heading">
            <div>
              <span className="kicker">The ConnectiveStack method</span>
              <h2>Know what you are paying for before we build.</h2>
            </div>
            <p>Before implementation, we agree on scope, dependencies, deliverables and acceptance checks. For a lead workflow, those checks might include a test submission, CRM record, assigned owner, notification and follow-up. You can review the evidence at handoff. Revenue and lead volume depend on factors outside the build, so we do not promise them.</p>
          </div>

          <div className="process-stage">
            <div className="process-steps">
              {process.map(([, title, copy], index) => (
                <article key={title}>
                  <span className="editorial-step-number">{String(index+1).padStart(2, '0')}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="process-output">
            <span>Tools used when the diagnosis calls for them</span>
            <div><i /> Website and customer experience</div>
            <div><i /> Forms, calls, and qualification</div>
            <div><i /> CRM and ownership</div>
            <div><i /> Automation and integrations</div>
            <div><i /> Infrastructure and deployment</div>
          </div>
        </section>

        <section className="portfolio-project-spotlight" id="projects" aria-labelledby="paw-nova-heading">
          <div className="portfolio-project-inner">
            <div className="portfolio-project-copy">
              <span className="kicker">Selected independent project</span>
              <h2 id="paw-nova-heading">Paw Nova Co. <em>Product discovery with a purpose.</em></h2>
              <p>Designed and built as an Amazon affiliate product-discovery website for pet owners. Paw Nova organizes product categories, individual product notes, and buying guides into a clear, responsive browsing experience.</p>
              <p className="portfolio-project-note">Visitors compare and research products on Paw Nova, then complete any purchase on Amazon. This is an affiliate site, not an on-site ecommerce checkout.</p>
              <div className="portfolio-project-tags"><span>Website &amp; UI/UX</span><span>Product catalogue</span><span>Buying guides</span><span>Responsive QA</span></div>
              <a className="button button-primary" href="https://www.pawnovaco.com/" target="_blank" rel="noopener noreferrer">Explore Paw Nova Co. <Arrow /></a>
            </div>
            <a className="portfolio-project-visual" href="https://www.pawnovaco.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Paw Nova Co. live website">
              <span className="portfolio-project-visual-top">INDEPENDENT PROJECT <span>LIVE WEBSITE ↗</span></span>
              <span className="portfolio-project-logo-wrap"><img src="/assets/pawnova-logo-transparent-optimized.webp" alt="Paw Nova Co. logo" loading="lazy" decoding="async" /></span>
              <span className="portfolio-project-visual-bottom">PET PRODUCT FINDS · AMAZON AFFILIATE</span>
            </a>
          </div>
        </section>

        <ProfessionalRecommendation placement="home" />

        <section className="contact-section" id="contact">
          <div className="contact-glow" />
          <div className="contact-content">
            <span className="kicker kicker-dark">Start with the outcome</span>
            <h2>Show us where your customer journey breaks.</h2>
            <p>Bring your website, CRM or current workflow and describe what should happen but does not. We can discuss the likely cause, what needs verification, the scope of a fix and how you would know the work is complete. You do not need to choose the technology before the conversation.</p>
            <div className="contact-actions">
              <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="button button-light">Book a discovery call <Arrow /></a>
              <a href="#project-inquiry" className="contact-email" aria-label="Open the project inquiry form">hello@connectivestack.com</a>
            </div>
            <div className="contact-expectations">
              <div><strong>Scoped around the outcome</strong><span>Clear success criteria, deliverables, and delivery plan before implementation</span></div>
              <div><strong>Founder-led technical delivery</strong><span>Direct access to the person diagnosing, building, and verifying the system</span></div>
              <div><strong>1 business day</strong><span>Typical response time for new inquiries</span></div>
            </div>
          </div>
          <div className="contact-panel"><ProjectInquiryForm /></div>
        </section>
      </main>

      <footer className="portfolio-footer">
        <a href="#top" className="footer-brand"><img width="1200" height="220" decoding="async" src="/assets/connectivestack-glass-logo.svg" alt="ConnectiveStack" /></a>
        <p>Building connected systems that move customer actions and internal work toward a clear next result.</p>
        <div className="footer-right">
          <div className="footer-social" role="group" aria-label="ConnectiveStack social media">
            {SOCIAL_PROFILES.map(({ name, url }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`ConnectiveStack on ${name}`}>
                <SocialIcon name={name} />
                <span>{name}</span>
              </a>
            ))}
          </div>
          <div className="footer-utility">
            <span>© {new Date().getFullYear()} ConnectiveStack</span>
            <button type="button" onClick={() => setLegalModal('privacy')}>Privacy</button>
            <button type="button" onClick={() => setLegalModal('terms')}>Terms</button>
            <button type="button" onClick={() => setShowCookieConsent(true)}>Cookie Preferences</button>
            <a href="https://www.linkedin.com/in/ajellsaliba" target="_blank" rel="noopener noreferrer" aria-label="Ajell Saliba on LinkedIn">LinkedIn</a>
            <a href="/style-picker/">Website Style Picker</a>
            <a href="#project-inquiry">Send inquiry</a>
          </div>
        </div>
      </footer>
      {!showCookieConsent && <a className="calendly-direct-badge" href={CALENDAR_URL} target="_blank" rel="noreferrer">Book a system review <Arrow /></a>}
      {showCookieConsent && <CookieConsent onChoice={saveCookieConsent} onPrivacy={() => setLegalModal('privacy')} />}
      {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
      {activeService && <ServiceModal service={activeService} onClose={() => setActiveService(null)} />}
    </>
  )
}

function PersonalPortfolioRedirect() {
  useEffect(() => { window.location.replace('https://ajellsaliba.services/') }, [])
  return <main className="seo-main"><h1>About Ajell</h1><p>This page has moved to <a href="https://ajellsaliba.services/">Ajell's personal portfolio</a>.</p></main>
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
        ? <PersonalPortfolioRedirect />
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
