import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import HvacDemo from './HvacDemo'
import RealEstateDemo from './RealEstateDemo'
import HealthcareDemo from './HealthcareDemo'
import CaseStudy from './CaseStudy'
import GhlSystems from './GhlSystems'

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
    name: 'Professional Website',
    price: '1,250',
    label: 'Starting project investment',
    description: 'A professionally built website that gives your business a credible online presence and a clear path for customers to take action.',
    bestFor: 'Best for established service businesses ready for a stronger online presence',
    includes: ['One landing page or up to 3 simple pages', 'Custom mobile-responsive design', 'Client-provided content and brand setup', 'Contact form and clear calls to action', 'Basic on-page SEO', 'Domain connection and deployment', 'One revision round', '7 days of post-launch support'],
  },
  {
    name: 'Lead-Ready Website',
    price: '2,250',
    label: 'Starting project investment',
    description: 'A more complete service website designed to capture inquiries and move visitors toward a call or appointment.',
    bestFor: 'Best for businesses actively generating leads',
    featured: true,
    includes: ['Up to 5 pages', 'Everything in the Professional Website', 'Copy refinement and conversion structure', 'Lead form or booking calendar setup', 'Email notification routing', 'Analytics or Meta Pixel installation', 'Two revision rounds', '30 days of post-launch technical support'],
  },
  {
    name: 'Connected Website System',
    price: '3,750',
    label: 'Starting project investment',
    description: 'A website connected to the systems behind the business, with lead routing and practical automation included.',
    bestFor: 'Best for teams that need fewer manual handoffs',
    includes: ['Up to 5 pages', 'Everything in the Lead-Ready Website', 'CRM contact and pipeline connection', 'Workflow and notification setup', 'Calendar, form, and lead routing', 'One standard third-party integration', 'Automation testing and handoff', '30 days of post-launch technical support'],
  },
]

const projects = [
  {
    label: 'Home Services',
    title: 'Conversion-first HVAC website',
    copy: 'A focused service site with clear calls to action, trust signals, and an appointment path built for mobile visitors.',
    image: '/assets/hvac-hero-technician.webp',
    accent: 'mint',
    photo: true,
    goal: 'High-intent visitors can still be lost when calls, estimates, follow-up, and booking are disconnected.',
    outcomes: ['Faster mobile actions', 'Stronger local trust', 'Clear booking path'],
    visualTags: ['Mobile-first', 'Call + booking', 'Local trust'],
    href: '/demos/hvac-ai-front-desk',
    caseStudyHref: '/case-studies/hvac-lead-system',
    live: true,
  },
  {
    label: 'Real Estate',
    title: 'Premium multi-broker property experience',
    copy: 'A luxury brokerage concept with curated listings, smart property matching, broker routing, affordability tools, and private tour requests.',
    image: '/assets/realestate-austin-premium.webp',
    accent: 'sand',
    photo: true,
    goal: 'Premium buyers need the right property and broker without being pushed through a generic one-size-fits-all journey.',
    outcomes: ['Smarter broker routing', 'Qualified buyer intent', 'Private tour requests'],
    visualTags: ['Multi-broker', 'AI concierge', 'Buyer tools'],
    href: '/demos/luxury-real-estate',
    caseStudyHref: '/case-studies/luxury-real-estate',
    live: true,
  },
  {
    label: 'Healthcare',
    title: 'Connected multi-provider patient experience',
    copy: 'A fictional clinic platform with conditional intake, provider routing, scheduling, simulated benefits, estimates, and privacy-conscious workflows.',
    image: '/assets/healthcare-hero-v1.webp',
    accent: 'mint',
    photo: true,
    goal: 'Patient intake, provider selection, benefits, estimates, and scheduling can fragment across too many separate steps.',
    outcomes: ['Conditional intake', 'Provider routing', 'Benefits workflow'],
    visualTags: ['Multi-provider', 'Smart intake', 'Cost estimator'],
    href: '/demos/healthcare-patient-experience',
    caseStudyHref: '/case-studies/healthcare-patient-experience',
    live: true,
  },
]

const process = [
  ['01', 'Audit the current journey', 'We document the offer, audience, lead path, required pages, existing tools, and the handoffs that currently fail.'],
  ['02', 'Structure and build', 'I turn the approved scope into page hierarchy, conversion copy, visual direction, and responsive components.'],
  ['03', 'Connect and verify', 'Forms, calendars, CRM fields, notifications, analytics, domains, and fallback paths are tested before launch.'],
  ['04', 'Launch and document', 'The approved build goes live with named deliverables, access handoff, and the support period defined in the proposal.'],
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
              <p>This website may use essential browser storage to remember site preferences, including your cookie choice. Optional analytics or marketing technologies should only be activated after consent where required. You can reopen Cookie Preferences from the footer and change your choice.</p>
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
            <span>CONNECTIVE STACK / PROBLEM AREA {service.number}</span>
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

const CALENDAR_URL = 'https://calendar.app.google/1tdYCWw6gwfTx3E56'
function CookieConsent({ onChoice, onPrivacy }) {
  return (
    <aside className="cookie-consent" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <div className="cookie-consent-copy">
        <span>COOKIE PREFERENCES</span>
        <strong>Your privacy, your choice.</strong>
        <p>This site uses essential browser storage for preferences. Optional analytics or marketing tools, if added, should only run after consent. You can change your choice later.</p>
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
      <label>Estimated budget<select name="budget" required defaultValue=""><option value="" disabled>Select a range</option><option>$1,250 to $2,250</option><option>$2,250 to $3,750</option><option>$3,750 to $6,000</option><option>$6,000+</option><option>Need a recommendation</option></select></label>
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
          <img src="/assets/connective-stack-logo.png" alt="ConnectiveStack" />
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
            <a href="#about" onClick={closeMenu}>About</a>
          </div>
          <a className="nav-cta" href={CALENDAR_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>Show me the problem <Arrow /></a>
        </nav>
      </header>

      <main id="top" className="portfolio-main">
        <section className="hero">
          <div className="hero-surreal-field" aria-hidden="true">
            <span className="hero-field-orb hero-field-orb-one" />
            <span className="hero-field-orb hero-field-orb-two" />
          </div>
          <div className="hero-grid grid-lines" aria-hidden="true" />
          <div className="hero-copy" data-reveal>
            <div className="eyebrow"><span className="status-dot" /> AJ Saliba • Independent web and systems specialist</div>
            <h1>I fix the systems that break between <em>your website, leads, and operations.</em></h1>
            <p className="hero-lead">When leads disappear, forms stop routing, tools do not connect, DNS breaks, follow-up stalls, or a customer journey has too many handoffs, I trace where the system fails and fix the path behind it.</p>
            <div className="hero-actions">
              <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="button button-primary">Show me what's broken <Arrow /></a>
              <a href="#services" className="button button-secondary">See problems I solve</a>
            </div>
            <div className="hero-meta">
              <div><strong>Diagnose before build</strong><span>Find the broken handoff before adding another tool</span></div>
              <div><strong>One technical owner</strong><span>Website, CRM, automation, DNS, and deployment in one path</span></div>
              <div><strong>Proof you can inspect</strong><span>Live demos, case studies, workflow maps, and clear boundaries</span></div>
            </div>
          </div>

          <div className="hero-media surreal-hero" data-reveal>
            <figure className="surreal-canvas">
              <img src="/assets/portfolio-surreal-hero.webp" alt="Surreal architectural world of connected digital systems" fetchPriority="high" />
              <figcaption>
                <span>PORTFOLIO / DIGITAL ARCHITECTURE</span>
                <strong>Ideas become useful systems.</strong>
              </figcaption>
            </figure>
            <div className="surreal-orbit surreal-orbit-one" aria-hidden="true" />
            <div className="surreal-orbit surreal-orbit-two" aria-hidden="true" />
            <div className="floating-card floating-card-one">
              <span className="mini-icon">↗</span>
              <div><small>Designed to convert</small><strong>Clear next actions</strong></div>
              <span className="live-dot" />
            </div>
            <div className="floating-card floating-card-two">
              <div className="flow-nodes"><i /><i /><i /></div>
              <div><small>Built as a system</small><strong>Connected</strong></div>
            </div>
          </div>
        </section>

        <section className="credibility-strip" aria-label="What prospects can verify">
          <div data-reveal><strong>3</strong><span>Interactive industry demos</span></div>
          <div data-reveal><strong>3</strong><span>Documented concept case studies</span></div>
          <div data-reveal><strong>11 years</strong><span>Across service, sales, QA, leadership, and digital operations</span></div>
          <div data-reveal><strong>1 specialist</strong><span>Responsible from scope through launch</span></div>
        </section>

        <section className="section services" id="services">
          <div className="section-heading" data-reveal>
            <span className="kicker">Problems I solve</span>
            <h2>Start with what is breaking. Then fix the system around it.</h2>
            <p>Sometimes the fix is a page. Sometimes it is DNS, CRM routing, a workflow, calendar logic, email delivery, a webhook, or a deployment issue. I start with the failure point, not a preset package.</p>
          </div>
          <div className="service-list">
            {services.map(service => (
              <article className="service-card" key={service.number} data-reveal>
                <span className="service-number">{service.number}</span>
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

        <section className="section work" id="work">
          <div className="section-heading heading-row" data-reveal>
            <div>
              <span className="kicker">Problem-led concept work</span>
              <h2>Each build starts with something that is not working.</h2>
            </div>
            <p>The demos and case studies show how I break a problem into the customer path, system logic, integrations, edge cases, and next action.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className={`project-card ${project.live ? 'project-wide' : ''}`} key={project.title} data-reveal>
                <div className={`project-image ${project.accent} ${project.photo ? 'photo-project' : ''}`}>
                  <picture>
                    {project.mobileImage && <source media="(max-width: 760px)" srcSet={project.mobileImage} />}
                    <img src={project.image} alt={`${project.title} sample concept`} loading="lazy" />
                  </picture>
                  <span className="concept-badge">{project.live ? 'Live interactive demo' : 'Outcome-led concept'}</span>
                  <span className="project-index">0{index + 1}</span>
                  <div className="visual-tags">
                    {project.visualTags.map(tag => <span key={tag}><i />{tag}</span>)}
                  </div>
                </div>
                <div className="project-copy">
                  <span>{project.label}</span>
                  <h3>{project.title}</h3>
                  <p>{project.copy}</p>
                  <div className="project-goal">
                    <small>Problem being solved</small>
                    <strong>{project.goal}</strong>
                  </div>
                  <div className="project-outcomes">
                    <small>What the system addresses</small>
                    <ul>{project.outcomes.map(outcome => <li key={outcome}><Check />{outcome}</li>)}</ul>
                  </div>
                  <div className="project-action-links">
                    {project.caseStudyHref && <a className="project-case-link" href={project.caseStudyHref}>Read the case study <Arrow /></a>}
                    {project.href && <a className="project-demo-link" href={project.href}>Try the live demo <Arrow /></a>}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="concept-disclosure">These are self-initiated concept projects built to demonstrate strategy, interface design, and system planning. Fictional data is labeled, and no performance metric is presented as a client result.</p>
        </section>

        <section className="evidence-section" id="proof">
          <div className="evidence-heading" data-reveal>
            <span className="kicker">How I prove the work</span>
            <h2>See how I think through a problem before you hire me.</h2>
            <p>The strongest proof is not a long software list. It is a visible customer path, the logic behind it, the failure cases considered, and a build you can inspect.</p>
          </div>
          <div className="evidence-grid">
            <article data-reveal><span>01</span><h3>Start at the failure point</h3><p>I map where the customer, lead, data, or internal handoff stops behaving the way the business expects.</p></article>
            <article data-reveal><span>02</span><h3>Trace the full path</h3><p>I check the page, form, CRM record, workflow, calendar, notification, domain, deployment, or integration involved instead of treating the symptom in isolation.</p></article>
            <article data-reveal><span>03</span><h3>Plan for the non-happy path</h3><p>Duplicate contacts, missing fields, no-shows, failed webhooks, routing errors, and fallback actions are part of the system design.</p></article>
            <article data-reveal><span>04</span><h3>Make the fix inspectable</h3><p>Live demos, case studies, workflow maps, and defined scope show what was changed, what the system is meant to do, and where third-party limits remain.</p></article>
          </div>
        </section>

        <section className="surreal-manifesto" aria-label="ConnectiveStack design philosophy">
          <div className="surreal-manifesto-art" data-reveal>
            <img src="/assets/portfolio-surreal-journey.webp" alt="Surreal path connecting floating ideas into one system" loading="lazy" />
            <div className="surreal-manifesto-index">CS / 04</div>
          </div>
          <div className="surreal-manifesto-copy" data-reveal>
            <span className="kicker">Clarity meets imagination</span>
            <h2>Distinctive enough to be remembered. Clear enough to be trusted.</h2>
            <p>Every visual decision supports the message. Every interaction points toward a useful next step. The result is a website with character, plus a system that works behind it.</p>
            <div className="manifesto-principles">
              <span>01 / Art direction</span>
              <span>02 / Clear journeys</span>
              <span>03 / Connected systems</span>
            </div>
          </div>
        </section>

        <section className="price-section">
          <div className="price-intro" data-reveal>
            <span className="kicker">Scope after diagnosis</span>
            <h2>Once the problem is clear, the build gets specific.</h2>
            <p>These are starting scopes, not a prescription before I understand the issue. Website projects start at $1,250; final investment depends on the pages, integrations, automation logic, and technical work actually required.</p>
          </div>
          <div className="pricing-grid" data-reveal>
            {pricingTiers.map(tier => (
              <article className={`pricing-tier ${tier.featured ? 'featured' : ''}`} key={tier.name}>
                {tier.featured && <span className="pricing-popular">Most practical</span>}
                <div className="pricing-tier-head">
                  <span>{tier.name}</span>
                  <strong><sup>$</sup>{tier.price}<b>+</b></strong>
                  <small>{tier.label}</small>
                </div>
                <p>{tier.description}</p>
                <em>{tier.bestFor}</em>
                <ul>{tier.includes.map(item => <li key={item}><Check />{item}</li>)}</ul>
                <a className={`button ${tier.featured ? 'button-primary' : 'button-secondary'}`} href={CALENDAR_URL} target="_blank" rel="noreferrer">Request this project <Arrow /></a>
              </article>
            ))}
          </div>
          <div className="pricing-trust-points" data-reveal>
            <article>
              <span className="pricing-trust-icon" aria-hidden="true"><Check /></span>
              <div>
                <strong>You Own What We Build</strong>
                <p>Your production accounts, domain, and project assets remain under your ownership. ConnectiveStack simply gets the access needed to build and manage your system.</p>
              </div>
            </article>
            <article>
              <span className="pricing-trust-icon" aria-hidden="true"><Check /></span>
              <div>
                <strong>30-Day Post-Launch Support</strong>
                <p>Technical support for the original build is included for 30 days after launch.</p>
              </div>
            </article>
          </div>
          <div className="hourly-support" data-reveal>
            <div className="hourly-support-rate">
              <span>Flexible support</span>
              <strong><sup>$</sup>50<small>/hour</small></strong>
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
            <strong>Need something outside these tiers?</strong>
            <p>Additional pages, full copywriting, e-commerce, AI chat or voice agents, advanced API work, and custom automations are quoted based on scope. Domain, hosting, software, messaging, and other third-party subscription costs are not included.</p>
          </div>
        </section>

        <section className="process-showcase" id="process">
          <div className="process-heading" data-reveal>
            <div>
              <span className="kicker">How I solve it</span>
              <h2>Find the failure point. Fix the path. Verify the handoff.</h2>
            </div>
            <p>I work across the customer-facing page and the technical layers behind it, so the fix is tested through the full path instead of stopping at the first screen that looks correct.</p>
          </div>

          <div className="process-stage">
            <div className="process-film" data-reveal>
              <video autoPlay muted loop playsInline preload="metadata" poster="/assets/build-process-poster.jpg">
                <source src="/assets/build-process.mp4" type="video/mp4" />
              </video>
              <div className="process-film-topbar">
                <span><i /> Build sequence</span>
                <span>Strategy / Web / Systems / Launch</span>
                <span>08 sec</span>
              </div>
              <div className="process-film-caption">
                <small>Connected execution</small>
                <strong>One workflow from first idea to live system</strong>
              </div>
            </div>

            <div className="process-steps" data-reveal>
              {process.map(([number, title, copy]) => (
                <article key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="process-output" data-reveal>
            <span>What gets connected</span>
            <div><i /> Strategy and content</div>
            <div><i /> Responsive website</div>
            <div><i /> GitHub and Vercel</div>
            <div><i /> CRM and automation</div>
            <div><i /> Domain and launch</div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-visual" data-reveal>
            <div className="about-portrait">
              <img src="/assets/ajell-saliba.webp" alt="Ajell Saliba, founder and independent specialist at ConnectiveStack" loading="lazy" />
              <div className="portrait-shade" />
              <div className="portrait-label">
                <span>AJELL SALIBA</span>
                <small>WEB + SYSTEMS SPECIALIST</small>
              </div>
              <div className="portrait-code">
                <span>STATUS</span>
                <strong><i /> Project-based and hourly support</strong>
              </div>
            </div>
            <div className="experience-chip"><strong>11</strong><span>Years of overall professional experience</span></div>
          </div>
          <div className="about-copy" data-reveal>
            <span className="kicker kicker-dark">About AJ</span>
            <h2>I work across the layers where small-business systems usually break.</h2>
            <p>I’m Ajell Saliba, an independent web and systems specialist based in the Philippines and working with US businesses. My 11 years of professional experience span customer service, sales, quality assurance, leadership of a 17-person QA team, GoHighLevel operations, website delivery, DNS, deployments, and integrations.</p>
            <p>You work directly with me from planning through launch. No layers of account management and no vague handoffs.</p>
            <div className="tool-matrix">
              <div className="tool-group">
                <span>Web, hosting and deployment</span>
                <div>{['GoHighLevel', 'Lovable', 'Vercel', 'GitHub', 'Cloudflare', 'Porkbun', 'WordPress', 'Shopify', 'Framer'].map(tool => <b key={tool}>{tool}</b>)}</div>
              </div>
              <div className="tool-group">
                <span>AI, automation and integrations</span>
                <div>{['ChatGPT', 'Claude', 'Zapier', 'Make', 'VAPI', 'Chatbase', 'Supabase', 'Resend', 'Mailgun'].map(tool => <b key={tool}>{tool}</b>)}</div>
              </div>
              <div className="tool-group">
                <span>CRM, sales and scheduling</span>
                <div>{['GoHighLevel', 'HubSpot', 'Salesforce', 'Zoho', 'Calendly', 'Google Calendar', 'Aircall', 'Stripe', 'PayPal'].map(tool => <b key={tool}>{tool}</b>)}</div>
              </div>
              <div className="tool-group">
                <span>Operations, support and creative</span>
                <div>{['Google Workspace', 'Microsoft 365', 'Slack', 'Trello', 'ClickUp', 'Freshdesk', 'Zendesk', 'Canva', 'Figma', 'CapCut'].map(tool => <b key={tool}>{tool}</b>)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
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
              <div><strong>$50/hour</strong><span>Technical support with a one-hour minimum</span></div>
              <div><strong>1 business day</strong><span>Typical response time for new inquiries</span></div>
            </div>
          </div>
          <div className="contact-panel" data-reveal><ProjectInquiryForm /></div>
        </section>
      </main>

      <footer className="portfolio-footer">
        <a href="#top" className="footer-brand"><img src="/assets/connective-stack-logo.png" alt="ConnectiveStack" /></a>
        <p>Fixing the systems between websites, leads, CRM, automation, and customer handoffs.</p>
        <div>
          <span>© {new Date().getFullYear()} ConnectiveStack</span>
          <button type="button" onClick={() => setLegalModal('privacy')}>Privacy</button>
          <button type="button" onClick={() => setLegalModal('terms')}>Terms</button>
          <button type="button" onClick={() => setShowCookieConsent(true)}>Cookie Preferences</button>
          <a href="https://www.linkedin.com/in/ajellsaliba" target="_blank" rel="noreferrer" aria-label="Ajell Saliba on LinkedIn">LinkedIn</a>
          <a href="mailto:ajell.saliba@connectivestack.com">Email AJ</a>
        </div>
      </footer>
      {showCookieConsent && <CookieConsent onChoice={saveCookieConsent} onPrivacy={() => setLegalModal('privacy')} />}
      {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
      {activeService && <ServiceModal service={activeService} onClose={() => setActiveService(null)} />}
    </>
  )
}

const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
const caseStudySlug = currentPath.startsWith('/case-studies/')
  ? currentPath.replace('/case-studies/', '')
  : null
const caseStudySlugs = new Set(['hvac-lead-system', 'luxury-real-estate', 'healthcare-patient-experience'])
const ghlSystemSlug = currentPath === '/ghl-systems'
  ? new URLSearchParams(window.location.search).get('system')
  : null

const route = currentPath === '/ghl-systems'
  ? <GhlSystems slug={ghlSystemSlug || undefined} />
  : currentPath === '/demos/hvac-ai-front-desk'
    ? <HvacDemo />
    : currentPath === '/demos/luxury-real-estate'
      ? <RealEstateDemo />
      : currentPath === '/demos/healthcare-patient-experience'
        ? <HealthcareDemo />
        : caseStudySlugs.has(caseStudySlug)
          ? <CaseStudy slug={caseStudySlug} />
          : <App />

createRoot(document.getElementById('root')).render(route)
