import React, { useEffect } from 'react'
import './case-study.css'

const CALENDAR_URL = 'https://calendly.com/ajell-saliba-connectivestack/30min'

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

const Check = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="m4 10 4 4 8-9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

export const caseStudies = {
  'hvac-lead-system': {
    industry: 'Home services',
    title: 'From urgent HVAC problem to an organized service request.',
    summary: 'A conversion-focused HVAC concept designed to capture high-intent inquiries, answer common questions, and give the service team better information before the first follow-up.',
    image: '/assets/case-study-hvac-problem-v1.webp',
    imageAlt: 'Homeowner uncomfortable in a hot home while checking the thermostat',
    demoHref: '/demos/hvac-ai-front-desk',
    demoLabel: 'Try the HVAC demo',
    theme: 'blue',
    meta: [
      ['Project type', 'Interactive concept'],
      ['Primary focus', 'Lead capture and service intake'],
      ['Core systems', 'Web, AI front desk, routing'],
      ['Audience', 'Residential HVAC companies'],
    ],
    context: [
      'Heating and cooling inquiries are often urgent. A homeowner may be dealing with no cold air, unusual equipment noise, poor airflow, or a system that has stopped working completely. They want a clear next action, not a long marketing journey.',
      'For the service company, the challenge is different. Missed calls, incomplete contact forms, and vague messages make it harder to prioritize requests and prepare the right response. This concept treats the website as the first operational handoff, not just a digital brochure.',
    ],
    challenge: {
      title: 'The website needs to reduce friction without pretending to diagnose the equipment.',
      copy: 'The experience had to help customers explain the situation quickly while keeping the business in control of final estimates, scheduling, and service decisions.',
      points: [
        'Make urgent service actions obvious on mobile',
        'Capture useful issue details before the callback',
        'Support customers who prefer chat, voice, or a standard form',
        'Avoid presenting automated estimates as final service quotes',
      ],
    },
    goals: [
      ['Capture demand', 'Give after-hours and mobile visitors a clear way to request help.'],
      ['Improve lead quality', 'Collect the issue, location, urgency, and preferred contact details in a structured format.'],
      ['Reduce uncertainty', 'Explain what happens next and reinforce that a technician confirms the final diagnosis and price.'],
      ['Support faster routing', 'Prepare the inquiry for notification, CRM creation, and follow-up workflows.'],
    ],
    strategy: [
      ['01', 'Lead with the customer problem', 'The opening message focuses on restored comfort and a faster response rather than technical equipment language.'],
      ['02', 'Offer multiple entry points', 'Customers can request service, explore the AI front desk, or use voice depending on their urgency and preference.'],
      ['03', 'Keep the handoff structured', 'The intake experience is designed to produce usable fields for a CRM, pipeline, notification, or scheduling workflow.'],
    ],
    journey: [
      ['Arrival', 'The visitor immediately sees emergency-friendly service language and a primary request-service action.'],
      ['Issue selection', 'The experience asks what is happening instead of expecting the customer to know the equipment diagnosis.'],
      ['Qualification', 'Location, urgency, system type, and contact preferences can be captured.'],
      ['Expectation setting', 'The customer sees that estimates are preliminary and service details require confirmation.'],
      ['Routing', 'The request can be sent to the correct inbox, pipeline stage, dispatcher, or calendar.'],
      ['Follow-up', 'The business can confirm receipt, request missing information, and schedule the visit.'],
    ],
    build: [
      {
        title: 'Customer-facing experience',
        items: ['Responsive HVAC service website', 'Prominent request-service actions', 'Trust and service-readiness messaging', 'Mobile-friendly intake path'],
      },
      {
        title: 'Interactive tools',
        items: ['AI front desk demonstration', 'Voice interaction demonstration', 'Service issue intake', 'Preliminary estimate experience'],
      },
      {
        title: 'Operational layer',
        items: ['Structured lead fields', 'Notification-ready request data', 'CRM and pipeline mapping concept', 'Booking and confirmation handoff'],
      },
    ],
    decisions: [
      ['Urgency without panic', 'The interface uses direct language and high-contrast actions without making unsupported emergency claims.'],
      ['Problem-first questions', 'Customers describe symptoms such as no cold air or poor airflow rather than choosing a technical diagnosis.'],
      ['Clear automation boundary', 'AI can answer and capture information, but a human technician remains responsible for diagnosis, availability, and final pricing.'],
      ['Persistent assistance', 'The floating AI entry point stays available without replacing standard navigation and service-request controls.'],
    ],
    flow: ['Website visit', 'Issue intake', 'Lead record', 'Team alert', 'Booking follow-up'],
    testing: [
      ['Responsive behavior', 'Primary actions, navigation, cards, and intake controls are designed to remain readable and usable across desktop and mobile layouts.'],
      ['Lead clarity', 'Fields are written in customer language and organized around information a service team can use.'],
      ['Trust safeguards', 'The demo distinguishes estimated information from confirmed service decisions and identifies the business profile as fictional.'],
      ['Failure planning', 'A real implementation would include fallback email routing, spam protection, delivery monitoring, and manual recovery steps.'],
    ],
    outcomes: [
      ['Fewer abandoned inquiries', 'Visitors have more than one clear way to ask for help.'],
      ['Better-prepared callbacks', 'The service team receives more context before contacting the customer.'],
      ['Faster administrative handoff', 'Structured information can move directly into the tools the business already uses.'],
      ['More consistent follow-up', 'Receipt confirmations and internal alerts can reduce missed requests.'],
    ],
    implementation: [
      'Replace the fictional service area, pricing logic, and business details with verified client information.',
      'Connect forms to the client CRM, pipeline, calendar, email, and SMS provider.',
      'Train the assistant only on approved services, policies, hours, and escalation rules.',
      'Define emergency language, response-time expectations, and human handoff procedures.',
      'Track form completion, call clicks, booked visits, qualified leads, and response time.',
    ],
  },
  'luxury-real-estate': {
    industry: 'Real estate',
    title: 'A premium property journey built around intent, not endless browsing.',
    summary: 'A luxury brokerage concept that combines curated listings, private search, advisor routing, affordability tools, and concierge-style lead capture.',
    image: '/assets/case-study-realestate-problem-v1.webp',
    imageAlt: 'Property buyer overwhelmed by listings, notes, and affordability decisions',
    demoHref: '/demos/luxury-real-estate',
    demoLabel: 'Try the real estate demo',
    theme: 'forest',
    meta: [
      ['Project type', 'Interactive concept'],
      ['Primary focus', 'Qualified buyer and seller journeys'],
      ['Core systems', 'Listings, routing, calculators'],
      ['Audience', 'Premium brokerages and advisors'],
    ],
    context: [
      'Luxury real estate visitors are not all looking for the same thing. Some are actively comparing properties, some want a private search, some need an affordability conversation, and others are evaluating which advisor understands their market.',
      'A premium brokerage website should preserve the visual quality expected in the category while giving serious prospects a useful path forward. This concept balances editorial presentation with structured qualification and advisor routing.',
    ],
    challenge: {
      title: 'Premium presentation alone is not enough.',
      copy: 'The website needed to feel selective and refined while still helping visitors reveal their market, property type, timing, and level of intent.',
      points: [
        'Present listings without turning the page into a generic property grid',
        'Route inquiries to the most relevant broker or advisor',
        'Support buyers, sellers, and private-search prospects',
        'Keep consultation and affordability tools easy to find',
      ],
    },
    goals: [
      ['Protect the brand', 'Use a restrained visual system that supports premium positioning.'],
      ['Understand intent', 'Separate casual browsing from private-search, tour, seller, and advisory inquiries.'],
      ['Route intelligently', 'Match the prospect with the advisor best suited to the market and request.'],
      ['Create useful momentum', 'Give visitors tools and next steps before asking for a consultation.'],
    ],
    strategy: [
      ['01', 'Use editorial hierarchy', 'Large imagery, refined typography, and controlled information density create a premium first impression.'],
      ['02', 'Design around distinct journeys', 'Property exploration, private search, advisor discovery, and affordability are treated as separate but connected paths.'],
      ['03', 'Make qualification feel personal', 'Questions focus on preferences and priorities so routing feels like service rather than form completion.'],
    ],
    journey: [
      ['Discovery', 'The visitor encounters a curated market perspective and selected residences.'],
      ['Exploration', 'Listings and market categories help narrow the type of opportunity.'],
      ['Intent selection', 'The visitor can explore, request a private search, speak with an advisor, or use an affordability tool.'],
      ['Qualification', 'Market, property type, budget, timeline, and representation needs can be captured.'],
      ['Advisor match', 'Rules can assign the inquiry to the broker with the right market or client specialty.'],
      ['Private follow-up', 'The prospect receives a tailored response, tour option, or consultation path.'],
    ],
    build: [
      {
        title: 'Brand and property experience',
        items: ['Luxury brokerage visual system', 'Curated property presentation', 'Market pulse and trust indicators', 'Responsive editorial layouts'],
      },
      {
        title: 'Buyer and seller tools',
        items: ['Private search workflow', 'Property matching concept', 'Affordability calculator', 'Tour and consultation requests'],
      },
      {
        title: 'Broker operations',
        items: ['Advisor profile system', 'Intent-based broker routing', 'Structured inquiry data', 'Calendar-ready consultation handoff'],
      },
    ],
    decisions: [
      ['Restraint over volume', 'The hero and property sections prioritize a small number of high-quality signals instead of crowding the page with listings.'],
      ['Multiple qualified paths', 'Visitors can act based on their actual goal instead of being forced into one generic contact form.'],
      ['Visible but quiet conversion', 'Calls to action remain clear without weakening the private, premium tone.'],
      ['Fictional market data', 'Pricing, inventory, advisors, and performance indicators are presented as simulated concept content.'],
    ],
    flow: ['Visitor intent', 'Preference capture', 'Advisor rules', 'Qualified inquiry', 'Private consultation'],
    testing: [
      ['Visual consistency', 'Typography, photography, spacing, controls, and cards follow one premium design system.'],
      ['Interaction clarity', 'Property, advisor, calculator, and consultation actions have distinct labels and destinations.'],
      ['Responsive presentation', 'The hierarchy is designed to preserve readable copy and usable actions on smaller screens.'],
      ['Data boundaries', 'A production build would validate listing feeds, consent requirements, fair-housing language, and brokerage disclosures.'],
    ],
    outcomes: [
      ['More useful inquiries', 'Prospects can communicate market, budget, timing, and representation needs before the first call.'],
      ['Better advisor matching', 'Routing can reduce manual reassignment and improve relevance.'],
      ['Stronger premium perception', 'The digital experience supports the service level expected from a luxury brokerage.'],
      ['Clearer conversion paths', 'Different visitor goals lead to different next steps rather than one generic form.'],
    ],
    implementation: [
      'Connect a verified MLS, IDX, or approved listing data source where required.',
      'Replace all fictional advisors, properties, market figures, and testimonials with approved content.',
      'Configure routing rules around real territories, specialties, licensing, and availability.',
      'Connect consultation calendars, CRM pipelines, email, and follow-up workflows.',
      'Review fair-housing, advertising, privacy, and brokerage disclosure requirements with the client.',
    ],
  },
  'healthcare-patient-experience': {
    industry: 'Healthcare',
    title: 'A clearer administrative journey from care need to scheduled visit.',
    summary: 'A fictional multi-provider clinic experience that demonstrates conditional intake, provider routing, simulated benefits, cost education, scheduling, and privacy-conscious workflow design.',
    image: '/assets/case-study-healthcare-problem-v1.webp',
    imageAlt: 'Patient frustrated by appointment and insurance paperwork',
    demoHref: '/demos/healthcare-patient-experience',
    demoLabel: 'Try the healthcare demo',
    theme: 'teal',
    meta: [
      ['Project type', 'Interactive concept'],
      ['Primary focus', 'Patient access and administration'],
      ['Core systems', 'Intake, routing, scheduling'],
      ['Audience', 'Clinics and multi-provider practices'],
    ],
    context: [
      'Patients often need to choose a provider, understand whether insurance may apply, estimate their likely responsibility, and find an appointment before they can move forward. When these tasks live in disconnected systems, the administrative journey becomes confusing.',
      'This concept shows how a clinic website can organize those steps without presenting itself as a diagnostic tool, insurance authority, or source of guaranteed pricing. The focus is patient access and administrative clarity.',
    ],
    challenge: {
      title: 'Healthcare convenience must not blur privacy, eligibility, or clinical boundaries.',
      copy: 'The experience needed to demonstrate useful routing and scheduling while making it unmistakable that all providers, patients, insurance information, and estimates are simulated.',
      points: [
        'Help visitors select the right type of provider or service',
        'Explain copay, deductible, and coinsurance concepts carefully',
        'Collect only the minimum information needed for the demonstrated step',
        'Avoid requesting real protected health information in the public demo',
      ],
    },
    goals: [
      ['Clarify access', 'Help patients understand which administrative path fits their need.'],
      ['Reduce misrouting', 'Use conditional questions to recommend an appropriate provider category.'],
      ['Set expectations', 'Explain that benefits and estimates require verification and are not guarantees.'],
      ['Connect the journey', 'Bring intake, routing, cost education, and scheduling into one coherent experience.'],
    ],
    strategy: [
      ['01', 'Separate administration from diagnosis', 'Questions focus on visit needs and logistics rather than making clinical conclusions.'],
      ['02', 'Reveal information progressively', 'The interface asks only for information relevant to the selected path.'],
      ['03', 'Repeat critical safeguards', 'Demo notices and privacy language appear where users are most likely to enter or interpret information.'],
    ],
    journey: [
      ['Care need', 'The visitor chooses a general visit reason or service category.'],
      ['Conditional intake', 'Follow-up questions adapt to the administrative path without diagnosing the patient.'],
      ['Provider routing', 'The interface suggests a fictional provider based on specialty and demonstrated availability.'],
      ['Benefits education', 'Simulated plan information explains copay, deductible, and coinsurance concepts.'],
      ['Estimate context', 'The visitor sees a non-binding cost illustration with verification language.'],
      ['Scheduling', 'The demonstration ends with a fictional appointment and confirmation workflow.'],
    ],
    build: [
      {
        title: 'Patient-facing experience',
        items: ['Responsive clinic website', 'Service and provider exploration', 'Conditional intake workflow', 'Scheduling demonstration'],
      },
      {
        title: 'Administrative tools',
        items: ['Provider routing logic', 'Simulated benefits experience', 'Cost-estimate education', 'Confirmation and reminder concept'],
      },
      {
        title: 'Privacy and trust layer',
        items: ['Persistent fictional-demo disclosure', 'No-real-PHI warnings', 'Minimum-necessary field design', 'Clear eligibility and estimate disclaimers'],
      },
    ],
    decisions: [
      ['Safety before novelty', 'Interactive features are useful only when the limitations are visible and understandable.'],
      ['Minimum necessary information', 'The public concept avoids collecting real health or insurance information.'],
      ['Plain-language cost education', 'Copay, deductible, and coinsurance are explained as concepts rather than confirmed benefits.'],
      ['Human and system verification', 'Provider fit, eligibility, pricing, and appointments would require verification in a real implementation.'],
    ],
    flow: ['Visit need', 'Conditional intake', 'Provider match', 'Benefits context', 'Scheduling'],
    testing: [
      ['Disclosure visibility', 'The fictional-demo and no-real-PHI language is visible before users interact with healthcare workflows.'],
      ['Form clarity', 'Questions distinguish required administrative information from optional context.'],
      ['Responsive access', 'Navigation, provider cards, calculators, and booking steps are designed for touch and smaller screens.'],
      ['Production safeguards', 'A real deployment would require security, access control, audit logging, vendor review, retention rules, and legal compliance work.'],
    ],
    outcomes: [
      ['Clearer patient navigation', 'Visitors can understand the available administrative paths before calling.'],
      ['Fewer incorrectly routed requests', 'Conditional intake can direct inquiries to a more appropriate team or provider category.'],
      ['Better cost conversations', 'Patients receive context about insurance responsibility without presenting an unverified guarantee.'],
      ['More coordinated scheduling', 'Intake and routing information can support the booking and confirmation process.'],
    ],
    implementation: [
      'Complete a formal privacy, security, legal, and compliance review before handling patient information.',
      'Use approved HIPAA-eligible vendors and execute required agreements where applicable.',
      'Connect verified eligibility, practice-management, EHR, scheduling, payment, and communication systems.',
      'Define role-based access, encryption, audit logs, retention, incident response, and staff procedures.',
      'Replace every simulated provider, plan, estimate, and availability record with approved live data.',
    ],
  },
}

export default function CaseStudy({ slug }) {
  const study = caseStudies[slug] || caseStudies['hvac-lead-system']

  useEffect(() => {
    document.title = `${study.title} | ConnectiveStack Case Study`
    const pageUrl = `https://www.connectivestack.com/case-studies/${slug}`
    const pageDescription = study.summary
    const socialImage = `https://www.connectivestack.com${study.image}`
    const setMeta = (selector, attribute, value) => {
      const element = document.head.querySelector(selector)
      if (element) element.setAttribute(attribute, value)
    }

    setMeta('link[rel="canonical"]', 'href', pageUrl)
    setMeta('meta[name="description"]', 'content', pageDescription)
    setMeta('meta[property="og:title"]', 'content', `${study.title} | ConnectiveStack Case Study`)
    setMeta('meta[property="og:description"]', 'content', pageDescription)
    setMeta('meta[property="og:url"]', 'content', pageUrl)
    setMeta('meta[property="og:image"]', 'content', socialImage)
    setMeta('meta[name="twitter:title"]', 'content', `${study.title} | ConnectiveStack Case Study`)
    setMeta('meta[name="twitter:description"]', 'content', pageDescription)
    setMeta('meta[name="twitter:image"]', 'content', socialImage)
    window.scrollTo(0, 0)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const selector = [
      '.case-header > *',
      '.case-hero-copy > *',
      '.case-hero-visual',
      '.case-meta > div',
      '.case-section-label',
      '.case-section-copy > *',
      '.case-challenge > *',
      '.case-strategy-heading > *',
      '.case-strategy-grid article',
      '.case-build-heading > *',
      '.case-build-grid article',
      '.case-journey article',
      '.case-flow > div',
      '.case-decisions-heading > *',
      '.case-decision-list article',
      '.case-testing-grid article',
      '.case-outcomes-heading > *',
      '.case-outcome-grid article',
      '.case-implementation > *',
      '.case-final-cta > *',
      '.case-footer > *',
    ].join(',')

    const motionItems = [...document.querySelectorAll(selector)]
    motionItems.forEach((item, index) => {
      item.setAttribute('data-case-reveal', '')
      item.style.setProperty('--case-delay', `${(index % 4) * 85}ms`)
    })

    if (reduceMotion) {
      motionItems.forEach(item => item.classList.add('case-is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('case-is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' })

    motionItems.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [study])

  return (
    <div className={`case-page case-theme-${study.theme}`}>
      <header className="case-header">
        <a className="case-back" href="/" aria-label="ConnectiveStack home"><img width="1200" height="199" decoding="async" src="/assets/connectivestack-metallic-logo-optimized.webp" alt="ConnectiveStack" /></a>
        <span>CONCEPT CASE STUDY</span>
        <a className="case-header-cta" href={study.demoHref}>{study.demoLabel} <Arrow /></a>
      </header>

      <main>
        <section className="case-hero">
          <div className="case-hero-copy">
            <span className="case-kicker">{study.industry} / Interactive concept</span>
            <h1>{study.title}</h1>
            <p>{study.summary}</p>
            <div className="case-hero-actions">
              <a className="case-button case-button-primary" href={study.demoHref}>{study.demoLabel} <Arrow /></a>
              <a className="case-button case-button-secondary" href="#case-details">Read the strategy</a>
            </div>
            <div className="case-disclosure">
              <strong>Concept project</strong>
              <span>This case study demonstrates strategy and implementation capability. It does not claim results from a live client engagement.</span>
            </div>
          </div>
          <figure className="case-hero-visual">
            <img src={study.image} alt={study.imageAlt} />
            <figcaption><span>DESIGNED EXPERIENCE</span><strong>{study.meta[1][1]}</strong></figcaption>
          </figure>
        </section>

        <section className="case-meta" aria-label="Project overview">
          {study.meta.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
        </section>

        <section className="case-section case-context" id="case-details">
          <div className="case-section-label">DIAGNOSIS</div>
          <div className="case-section-copy">
            <span className="case-kicker">01 / Diagnose the problem</span>
            <h2>What is breaking in the customer path?</h2>
            {study.context.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section className="case-challenge">
          <div>
            <span className="case-kicker">Failure point</span>
            <h2>{study.challenge.title}</h2>
            <p>{study.challenge.copy}</p>
          </div>
          <ul>{study.challenge.points.map(point => <li key={point}><Check /><span>{point}</span></li>)}</ul>
        </section>

        <section className="case-section">
          <div className="case-section-label">SUCCESS CRITERIA</div>
          <div className="case-section-copy">
            <span className="case-kicker">02 / Define the target state</span>
            <h2>What must be true for the fix to count as useful?</h2>
            <div className="case-goal-grid">
              {study.goals.map(([title, copy], index) => (
                <article key={title}><h3>{title}</h3><p>{copy}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="case-strategy">
          <div className="case-strategy-heading">
            <span className="case-kicker">03 / Prescribe the fix</span>
            <h2>Choose the system response before choosing the tools.</h2>
          </div>
          <div className="case-strategy-grid">
            {study.strategy.map(([number, title, copy]) => (
              <article key={title}><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </section>

        <section className="case-section">
          <div className="case-section-label">JOURNEY</div>
          <div className="case-section-copy">
            <span className="case-kicker">Path under test</span>
            <h2>Trace the customer action through every handoff that has to work.</h2>
            <div className="case-journey">
              {study.journey.map(([title, copy], index) => (
                <article key={title}><div><h3>{title}</h3><p>{copy}</p></div></article>
              ))}
            </div>
          </div>
        </section>

        <section className="case-build">
          <div className="case-build-heading">
            <span className="case-kicker">04 / Build the prescribed system</span>
            <h2>Build only the customer-facing and operational pieces the diagnosis calls for.</h2>
          </div>
          <div className="case-build-grid">
            {study.build.map(group => (
              <article key={group.title}><h3>{group.title}</h3><ul>{group.items.map(item => <li key={item}><Check />{item}</li>)}</ul></article>
            ))}
          </div>
        </section>

        <section className="case-section">
          <div className="case-section-label">SYSTEM</div>
          <div className="case-section-copy">
            <span className="case-kicker">Handoff map</span>
            <h2>Follow the information from customer intent to the person or system responsible for the next action.</h2>
            <div className="case-flow">
              {study.flow.map((step, index) => <React.Fragment key={step}><div><strong>{step}</strong></div>{index < study.flow.length - 1 && <i>→</i>}</React.Fragment>)}
            </div>
            <p className="case-flow-note">The exact CRM, calendar, messaging, and automation tools would be selected around the client’s existing operations.</p>
          </div>
        </section>

        <section className="case-decisions">
          <div className="case-decisions-heading">
            <span className="case-kicker">System decisions</span>
            <h2>Each decision answers a specific failure, constraint, or handoff requirement.</h2>
          </div>
          <div className="case-decision-list">
            {study.decisions.map(([title, copy], index) => (
              <article key={title}><div><h3>{title}</h3><p>{copy}</p></div></article>
            ))}
          </div>
        </section>

        <section className="case-section">
          <div className="case-section-label">QA</div>
          <div className="case-section-copy">
            <span className="case-kicker">05 / Verify the path</span>
            <h2>Test the normal path, the failure cases, and the boundaries before calling the system ready.</h2>
            <div className="case-testing-grid">
              {study.testing.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}
            </div>
          </div>
        </section>

        <section className="case-outcomes">
          <div className="case-outcomes-heading">
            <span className="case-kicker">What we would measure</span>
            <h2>The concept defines the behaviors to measure in a live implementation.</h2>
            <p>These are design objectives, not measured client results. A live engagement would establish baseline data and reporting before making performance claims.</p>
          </div>
          <div className="case-outcome-grid">
            {study.outcomes.map(([title, copy]) => <article key={title}><Check /><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </section>

        <section className="case-implementation">
          <div>
            <span className="case-kicker">From concept to production</span>
            <h2>Replace assumptions with verified business rules, live integrations, baseline data, and production safeguards.</h2>
            <p>The concept demonstrates the experience and system direction. Production work would replace assumptions with verified business rules, content, integrations, and compliance requirements.</p>
          </div>
          <ul>{study.implementation.map(item => <li key={item}><p>{item}</p></li>)}</ul>
        </section>

        <section className="case-final-cta">
          <span>Something in your customer path keeps breaking?</span>
          <h2>Start with the failure. Then build only what fixes it.</h2>
          <p>Show me what a prospect does, what should happen next, and where the real process breaks. I’ll trace the path before recommending the build.</p>
          <div>
            <a className="case-button case-button-light" href={CALENDAR_URL} target="_blank" rel="noreferrer">Discuss a project <Arrow /></a>
            <a className="case-button case-button-ghost" href={study.demoHref}>{study.demoLabel}</a>
          </div>
        </section>
      </main>

      <footer className="case-footer">
        <a href="/">ConnectiveStack</a>
        <span>Diagnosis, customer-path design, and connected system implementation by AJ Saliba.</span>
        <a href={CALENDAR_URL} target="_blank" rel="noreferrer">Start a project <Arrow /></a>
      </footer>
    </div>
  )
}
