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
    title: 'Website design and build',
    copy: 'A polished, mobile-first website that makes your business clear, credible, and easy to contact.',
    tags: ['Custom design', 'Responsive build', 'Fast deployment'],
    summary: 'A complete customer-facing website built around your offer, audience, and primary call to action.',
    includes: ['Page structure and conversion-focused layout', 'Responsive design for desktop, tablet, and mobile', 'Clear service messaging and calls to action', 'Basic on-page SEO, domain setup, and deployment'],
    bestFor: 'Service businesses launching a new site or replacing an outdated one.',
    result: 'A credible website that clearly explains what you do and gives visitors an easy next step.',
  },
  {
    number: '02',
    title: 'Lead-ready setup',
    copy: 'Forms, calendars, calls, and email routes connected so every inquiry reaches the right place.',
    tags: ['Lead forms', 'Booking flows', 'Notifications'],
    summary: 'The conversion layer that turns website interest into an organized inquiry or scheduled conversation.',
    includes: ['Lead forms with the right qualification fields', 'Calendar or appointment booking connections', 'Click-to-call and email contact paths', 'Lead notifications and routing to the right inbox or team'],
    bestFor: 'Businesses getting traffic but losing leads through unclear or disconnected contact paths.',
    result: 'A shorter path from visitor interest to a lead your team can actually follow up with.',
  },
  {
    number: '03',
    title: 'Integrations and automation',
    copy: 'Connect your site to the CRM and tools you already use, then automate the repetitive handoffs.',
    tags: ['CRM connections', 'Workflows', 'AI add-ons'],
    summary: 'Connected workflows that reduce manual handoffs between your website, CRM, calendar, and follow-up tools.',
    includes: ['CRM contact and opportunity creation', 'Workflow triggers, alerts, and follow-up sequences', 'Form, calendar, and pipeline connections', 'Optional AI chat or voice assistant integration'],
    bestFor: 'Teams that already use several tools but still copy information or follow up manually.',
    result: 'A cleaner operating flow with faster routing, fewer missed inquiries, and less repetitive admin work.',
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
    includes: ['Up to 5 pages', 'Everything in the Professional Website', 'Copy refinement and conversion structure', 'Lead form or booking calendar setup', 'Email notification routing', 'Analytics or Meta Pixel installation', 'Two revision rounds', '14 days of post-launch support'],
  },
  {
    name: 'Connected Website System',
    price: '3,750',
    label: 'Starting project investment',
    description: 'A website connected to the systems behind the business, with lead routing and practical automation included.',
    bestFor: 'Best for teams that need fewer manual handoffs',
    includes: ['Up to 5 pages', 'Everything in the Lead-Ready Website', 'CRM contact and pipeline connection', 'Workflow and notification setup', 'Calendar, form, and lead routing', 'One standard third-party integration', 'Automation testing and handoff', '14 days of post-launch support'],
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
    goal: 'Turn high-intent local searches into calls and estimate requests.',
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
    goal: 'Turn premium property interest into qualified conversations with the right broker.',
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
    goal: 'Turn a complex patient journey into clear, coordinated administrative steps.',
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
              <h3>How information is used</h3>
              <ul>
                <li>To respond to inquiries and prepare project estimates</li>
                <li>To provide, maintain, and improve services</li>
                <li>To secure the website and prevent misuse</li>
                <li>To understand general website performance</li>
              </ul>
              <h3>Sharing and third-party services</h3>
              <p>Personal information is not sold. Information may be processed by trusted service providers used for hosting, email, analytics, scheduling, forms, or project delivery. These providers handle information under their own privacy terms.</p>
              <h3>AI voice demonstration</h3>
              <p>The portfolio includes an optional Atlas voice demonstration. If you start a voice session, Atlas may process microphone audio, call events, summaries, transcripts, and related technical data. Do not share medical, payment, account, or other sensitive information in the demonstration.</p>
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
            <span>CONNECTIVE STACK / SERVICE {service.number}</span>
            <h2 id="service-modal-title">{service.title}</h2>
          </div>
          <button type="button" className="legal-close" onClick={onClose} aria-label={`Close ${service.title} details`}>×</button>
        </div>
        <div className="legal-body service-modal-body">
          <p className="service-modal-summary">{service.summary}</p>
          <div className="service-modal-grid">
            <div className="service-modal-includes">
              <span>What can be included</span>
              <ul>{service.includes.map(item => <li key={item}><Check /> <span>{item}</span></li>)}</ul>
            </div>
            <div className="service-modal-aside">
              <div><span>Best for</span><p>{service.bestFor}</p></div>
              <div><span>Delivery objective</span><p>{service.result}</p></div>
            </div>
          </div>
          <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="button button-primary service-modal-cta" onClick={onClose}>Discuss this service <Arrow /></a>
        </div>
      </section>
    </div>
  )
}

const CALENDAR_URL = 'https://calendar.app.google/1tdYCWw6gwfTx3E56'
const ATLAS_VOICE_SCRIPT = 'https://cdn.youratlas.com/scripts/aqx-voice-bubble.prod.min.js'
const ATLAS_CAMPAIGN_ID = 'ac5e4e93-3b0a-4c22-b851-cc202ac3fea8'

function AtlasVoiceWidget() {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    let script = document.getElementById('connectivestack-atlas-voice-script')

    const mountBubble = async () => {
      try {
        await window.customElements.whenDefined('aqx-voice-bubble')
        if (cancelled || document.querySelector('aqx-voice-bubble[data-connectivestack-widget]')) return
        const bubble = document.createElement('aqx-voice-bubble')
        bubble.setAttribute('campaign-id', ATLAS_CAMPAIGN_ID)
        bubble.setAttribute('size', 'sm')
        bubble.setAttribute('data-connectivestack-widget', 'true')
        document.body.appendChild(bubble)
        setStatus('ready')
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    const handleError = () => !cancelled && setStatus('error')

    if (script) {
      if (window.customElements.get('aqx-voice-bubble')) mountBubble()
      else {
        script.addEventListener('load', mountBubble, { once: true })
        script.addEventListener('error', handleError, { once: true })
      }
    } else {
      script = document.createElement('script')
      script.id = 'connectivestack-atlas-voice-script'
      script.src = ATLAS_VOICE_SCRIPT
      script.async = true
      script.addEventListener('load', mountBubble, { once: true })
      script.addEventListener('error', handleError, { once: true })
      document.head.appendChild(script)
    }

    return () => {
      cancelled = true
      script?.removeEventListener('load', mountBubble)
      script?.removeEventListener('error', handleError)
      document.querySelector('aqx-voice-bubble[data-connectivestack-widget]')?.remove()
    }
  }, [])

  return (
    <aside className={`atlas-voice-disclosure ${status}`} aria-live="polite">
      <strong>{status === 'error' ? 'Voice demo unavailable' : status === 'ready' ? 'AI appointment demo' : 'Loading voice demo'}</strong>
      <span>{status === 'error' ? 'Please use the project form or calendar instead.' : 'Powered by Atlas. Do not share sensitive, medical, or payment information.'}</span>
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
        <h3>Describe the current setup.</h3>
        <p>Share the business goal, current website or tools, broken handoffs, required deadline, and available budget. I use these details to recommend a realistic scope.</p>
      </div>
      <label>Full name<input name="name" required autoComplete="name" placeholder="Your name" /></label>
      <label>Work email<input name="email" required type="email" autoComplete="email" placeholder="you@company.com" /></label>
      <label>Phone number <small>Optional</small><input name="phone" type="tel" autoComplete="tel" placeholder="US or international number" /></label>
      <label>Company or business<input name="company" autoComplete="organization" placeholder="Company name" /></label>
      <label>Current website <small>Optional</small><input name="website" type="url" inputMode="url" placeholder="https://" /></label>
      <label>How can I help?<select name="service" required defaultValue=""><option value="" disabled>Select a service</option><option>New website</option><option>Website redesign</option><option>Landing page</option><option>Website plus lead capture</option><option>CRM or GoHighLevel setup</option><option>Automation or integration</option><option>AI chat or voice agent</option><option>Hourly technical support</option><option>Not sure yet</option></select></label>
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
            <a href="#services" onClick={closeMenu}>Services</a>
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
            <a href="/?view=ghl-systems" onClick={closeMenu}>GHL Systems</a>
            <a href="#about" onClick={closeMenu}>About</a>
          </div>
          <a className="nav-cta" href={CALENDAR_URL} target="_blank" rel="noreferrer" onClick={closeMenu}>Start a project <Arrow /></a>
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
            <h1>Distinctive websites built around the <em>customer journey behind them.</em></h1>
            <p className="hero-lead">I design and deploy websites for service businesses, then connect the lead forms, booking, CRM routing, notifications, and follow-up included in the agreed scope.</p>
            <div className="hero-actions">
              <a href={CALENDAR_URL} target="_blank" rel="noreferrer" className="button button-primary">Discuss a project <Arrow /></a>
              <a href="#work" className="button button-secondary">See sample work</a>
            </div>
            <div className="hero-meta">
              <div><strong>Projects from $1,250</strong><span>Pages, revisions, and support defined in writing</span></div>
              <div><strong>Independent specialist</strong><span>Direct planning, build, testing, and handoff</span></div>
              <div><strong>Concept work labeled</strong><span>No invented client metrics or testimonials</span></div>
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
            <span className="kicker">What I build</span>
            <h2>Design, lead capture, and system handoff in one scope.</h2>
            <p>The work is separated into clear deliverables so you know what is being designed, what is being connected, and what remains a third-party responsibility.</p>
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
              <span className="kicker">Selected concepts</span>
              <h2>Designed around the result, not just the page.</h2>
            </div>
            <p>Each concept starts with a business problem, then connects the design, message, and customer journey around a useful outcome.</p>
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
                    <small>Business goal</small>
                    <strong>{project.goal}</strong>
                  </div>
                  <div className="project-outcomes">
                    <small>Designed to improve</small>
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
            <span className="kicker">Evidence before promises</span>
            <h2>What a prospect can inspect before contacting me.</h2>
            <p>Credibility should come from visible work, clear boundaries, and a scope that can be checked.</p>
          </div>
          <div className="evidence-grid">
            <article data-reveal><span>01</span><h3>Interactive demos</h3><p>Open and test the actual customer journeys, forms, calculators, routing logic, and responsive interfaces instead of judging isolated screenshots.</p></article>
            <article data-reveal><span>02</span><h3>Documented reasoning</h3><p>Each case study explains the business problem, assumptions, design decisions, workflow, safeguards, and production requirements.</p></article>
            <article data-reveal><span>03</span><h3>Honest proof boundaries</h3><p>Concept data stays fictional, intended outcomes are not reported as measured results, and automated tools are not presented as replacements for human judgment.</p></article>
            <article data-reveal><span>04</span><h3>Defined commercial terms</h3><p>Starting prices identify page limits, revision rounds, support periods, integrations, and costs that remain outside the project fee.</p></article>
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
            <span className="kicker">Project-based pricing</span>
            <h2>Choose the level of build your business actually needs.</h2>
            <p>Website projects start at $1,250. Final investment depends on page count, integrations, automation complexity, and content readiness. Every engagement has a defined scope, deliverables, and price before work begins.</p>
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
              <span className="kicker">How I work</span>
              <h2>From business brief to connected digital system.</h2>
            </div>
            <p>I handle the customer-facing website and the technical details behind it, so the full experience is planned, built, connected, tested, and launched as one system.</p>
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
            <h2>One specialist. Direct communication. Practical execution.</h2>
            <p>I’m Ajell Saliba, an independent web and systems specialist based in the Philippines and working with US businesses. My 11 years of professional experience span customer service, sales, quality assurance, leadership of a 17-person QA team, GoHighLevel operations, website delivery, DNS, deployments, and integrations.</p>
            <p>You work directly with me from planning through launch. No layers of account management and no vague handoffs.</p>
            <div className="tool-matrix">
              <div className="tool-group">
                <span>Web, CRM and deployment</span>
                <div>{['GoHighLevel', 'Vercel', 'GitHub', 'Cloudflare', 'WordPress', 'Shopify'].map(tool => <b key={tool}>{tool}</b>)}</div>
              </div>
              <div className="tool-group">
                <span>AI and automation</span>
                <div>{['ChatGPT', 'Claude', 'Zapier', 'Make', 'VAPI', 'Chatbase', 'Supabase', 'Resend'].map(tool => <b key={tool}>{tool}</b>)}</div>
              </div>
              <div className="tool-group">
                <span>CRM, sales and support</span>
                <div>{['GoHighLevel', 'HubSpot', 'Salesforce', 'Zoho', 'Aircall', 'Zendesk', 'Freshdesk'].map(tool => <b key={tool}>{tool}</b>)}</div>
              </div>
              <div className="tool-group">
                <span>Creative and operations</span>
                <div>{['Google Workspace', 'Microsoft 365', 'Slack', 'Trello', 'ClickUp', 'Canva', 'Figma', 'Framer'].map(tool => <b key={tool}>{tool}</b>)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-glow" />
          <div className="contact-content" data-reveal>
            <span className="kicker kicker-dark">Start with the current problem</span>
            <h2>Show me where the customer journey or handoff breaks.</h2>
            <p>Send the current website, tools, desired outcome, deadline, and budget range. I will recommend a realistic scope or tell you when the project is not a fit.</p>
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
        <p>Websites, integrations, and automation for service businesses.</p>
        <div>
          <span>© {new Date().getFullYear()} ConnectiveStack</span>
          <button type="button" onClick={() => setLegalModal('privacy')}>Privacy</button>
          <button type="button" onClick={() => setLegalModal('terms')}>Terms</button>
          <a href="https://www.linkedin.com/in/ajellsaliba" target="_blank" rel="noreferrer" aria-label="Ajell Saliba on LinkedIn">LinkedIn</a>
          <a href="mailto:ajell.saliba@connectivestack.com">Email AJ</a>
        </div>
      </footer>
      <AtlasVoiceWidget />
      {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
      {activeService && <ServiceModal service={activeService} onClose={() => setActiveService(null)} />}
    </>
  )
}

const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
const query = new URLSearchParams(window.location.search)
const ghlView = query.get('view') === 'ghl-systems'
const ghlSystemSlug = query.get('system')

const caseStudySlug = currentPath.startsWith('/case-studies/')
  ? currentPath.replace('/case-studies/', '')
  : null
const caseStudySlugs = new Set(['hvac-lead-system', 'luxury-real-estate', 'healthcare-patient-experience'])

const route = ghlView
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
