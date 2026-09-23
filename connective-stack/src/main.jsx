import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import HvacDemo from './HvacDemo'
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
  },
  {
    number: '02',
    title: 'Lead-ready setup',
    copy: 'Forms, calendars, calls, and email routes connected so every inquiry reaches the right place.',
    tags: ['Lead forms', 'Booking flows', 'Notifications'],
  },
  {
    number: '03',
    title: 'Integrations and automation',
    copy: 'Connect your site to the CRM and tools you already use, then automate the repetitive handoffs.',
    tags: ['CRM connections', 'Workflows', 'AI add-ons'],
  },
]

const projects = [
  {
    label: 'Home Services',
    title: 'Conversion-first HVAC website',
    copy: 'A focused service site with clear calls to action, trust signals, and an appointment path built for mobile visitors.',
    image: '/assets/project-hvac.svg',
    accent: 'mint',
    goal: 'Turn high-intent local searches into calls and estimate requests.',
    outcomes: ['Faster mobile actions', 'Stronger local trust', 'Clear booking path'],
    visualTags: ['Mobile-first', 'Call + booking', 'Local trust'],
    href: '/demos/hvac-ai-front-desk',
    live: true,
  },
  {
    label: 'Professional Services',
    title: 'Clean advisory website',
    copy: 'A credible digital presence that simplifies a complex offer and guides qualified visitors toward a consultation.',
    image: '/assets/project-advisory.svg',
    accent: 'violet',
    goal: 'Make a complex service easier to understand and easier to buy.',
    outcomes: ['Clearer positioning', 'Qualified consultations', 'Stronger credibility'],
    visualTags: ['Clear offer', 'Expert positioning', 'Consultation CTA'],
  },
  {
    label: 'Connected Operations',
    title: 'Lead routing workflow',
    copy: 'A visual customer journey that connects website inquiries, notifications, scheduling, and CRM follow-up.',
    image: '/assets/project-workflow.svg',
    accent: 'blue',
    goal: 'Reduce response gaps between a new inquiry and a booked appointment.',
    outcomes: ['Instant lead routing', 'Consistent follow-up', 'Fewer missed inquiries'],
    visualTags: ['CRM routing', 'Calendar sync', 'Follow-up'],
  },
]

const process = [
  ['01', 'Discover', 'We align on the goal, audience, pages, content, and the tools your business already uses.'],
  ['02', 'Design and build', 'I shape the message, create the visual direction, and build the responsive experience.'],
  ['03', 'Connect and test', 'Forms, buttons, analytics, domains, and integrations are tested across devices.'],
  ['04', 'Launch and support', 'Your site goes live with a clean handoff and seven days of post-launch support.'],
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
              <p>Connective Stack respects your privacy. This policy explains how information may be collected and used when you visit this website or contact AJ about a project.</p>
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
              <h3>Retention and your choices</h3>
              <p>Information is retained only as reasonably needed for communication, service delivery, recordkeeping, and legal obligations. You may request access, correction, or deletion of information by emailing AJ.</p>
              <h3>Contact</h3>
              <p>Privacy questions may be sent to <a href="mailto:aj@connectivestack.com">aj@connectivestack.com</a>.</p>
            </>
          ) : (
            <>
              <p>By using this website, you agree to these terms. The website presents information about services offered by Connective Stack and AJ Saliba.</p>
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
              <p>Unless otherwise agreed in writing, final project deliverables transfer after full payment. Connective Stack retains ownership of pre-existing tools, reusable methods, and general know-how. Third-party assets remain subject to their original licenses.</p>
              <h3>Limitations</h3>
              <p>No specific lead, revenue, ranking, or conversion result is guaranteed. Connective Stack is not responsible for outages, policy changes, or failures caused by third-party platforms and services.</p>
              <h3>Contact</h3>
              <p>Questions about these terms may be sent to <a href="mailto:aj@connectivestack.com">aj@connectivestack.com</a>.</p>
            </>
          )}
        </div>
      </section>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [legalModal, setLegalModal] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 }
    )
    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!legalModal) return undefined
    const closeOnEscape = event => event.key === 'Escape' && setLegalModal(null)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [legalModal])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Connective Stack home">
          <img src="/assets/connective-stack-logo.png" alt="Connective Stack" />
        </a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>
          <span /><span />
        </button>
        <nav className={menuOpen ? 'nav-open' : ''}>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="/demos/hvac-ai-front-desk" onClick={closeMenu}>Live Demo</a>
          <a href="/ghl-systems" onClick={closeMenu}>GHL Systems</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#process" onClick={closeMenu}>Process</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Start a project <Arrow /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-background-video" aria-hidden="true">
            <video autoPlay muted loop playsInline preload="metadata">
              <source src="/assets/hero-background.mp4" type="video/mp4" />
            </video>
            <div className="hero-video-wash" />
          </div>
          <div className="hero-grid grid-lines" aria-hidden="true" />
          <div className="hero-copy" data-reveal>
            <div className="eyebrow"><span className="status-dot" /> AJ Saliba • Independent web and systems specialist</div>
            <h1>Websites that look sharp and <em>work harder.</em></h1>
            <p className="hero-lead">I build modern websites for service businesses, then connect the forms, calendars, CRM, and follow-up tools behind them.</p>
            <div className="hero-actions">
              <a href="#contact" className="button button-primary">Build my website <Arrow /></a>
              <a href="#work" className="button button-secondary">See sample work</a>
            </div>
            <div className="hero-meta">
              <div><strong>From $500</strong><span>Simple website builds</span></div>
              <div><strong>Direct support</strong><span>You work with me, AJ</span></div>
              <div><strong>US-ready</strong><span>Clear, conversion-focused copy</span></div>
            </div>
          </div>

          <div className="hero-media" data-reveal>
            <div className="video-shell">
              <video autoPlay muted loop playsInline poster="/assets/video-poster.svg">
                <source src="/assets/connective-stack-commercial.mp4" type="video/mp4" />
              </video>
              <div className="video-topbar"><span /><span>Connected digital systems</span><span>08 sec</span></div>
            </div>
            <div className="floating-card floating-card-one">
              <span className="mini-icon">↗</span>
              <div><small>Lead captured</small><strong>Website form</strong></div>
              <span className="live-dot" />
            </div>
            <div className="floating-card floating-card-two">
              <div className="flow-nodes"><i /><i /><i /></div>
              <div><small>System status</small><strong>Connected</strong></div>
            </div>
          </div>
        </section>

        <section className="signal-bar" aria-label="Capabilities">
          <span>Strategy</span><i />
          <span>Web design</span><i />
          <span>Development</span><i />
          <span>Integrations</span><i />
          <span>Automation</span>
        </section>

        <section className="section services" id="services">
          <div className="section-heading" data-reveal>
            <span className="kicker">What I build</span>
            <h2>A better website is only the beginning.</h2>
            <p>The goal is a clean customer journey, from the first click to the next action.</p>
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
                <span className="service-arrow"><Arrow /></span>
              </article>
            ))}
          </div>
        </section>

        <section className="systems-section">
          <div className="systems-copy" data-reveal>
            <span className="kicker kicker-dark">Connected by design</span>
            <h2>Your tools should feel like one system.</h2>
            <p>A website should not create another disconnected inbox. I connect the customer-facing experience to the tools that keep your business moving.</p>
            <ul className="check-list">
              <li><Check /> Forms routed to the right inbox or CRM</li>
              <li><Check /> Booking links placed where intent is highest</li>
              <li><Check /> Automated notifications and follow-up</li>
              <li><Check /> Domains, analytics, and tracking configured</li>
            </ul>
            <a href="#contact" className="text-link">Talk about your setup <Arrow /></a>
          </div>
          <div className="systems-visual" data-reveal>
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="system-core"><img src="/assets/favicon.svg" alt="" /><span>YOUR WEBSITE</span></div>
            <div className="system-node node-web"><span>01</span><strong>Lead form</strong><small>Capture</small></div>
            <div className="system-node node-crm"><span>02</span><strong>CRM</strong><small>Organize</small></div>
            <div className="system-node node-calendar"><span>03</span><strong>Calendar</strong><small>Book</small></div>
            <div className="system-node node-follow"><span>04</span><strong>Follow-up</strong><small>Convert</small></div>
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
              <article className={`project-card ${index === 0 ? 'project-wide' : ''}`} key={project.title} data-reveal>
                <div className={`project-image ${project.accent}`}>
                  <img src={project.image} alt={`${project.title} sample concept`} />
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
                    <small>Built to improve</small>
                    <ul>{project.outcomes.map(outcome => <li key={outcome}><Check />{outcome}</li>)}</ul>
                  </div>
                  {project.href && <a className="project-demo-link" href={project.href}>Try the live HVAC demo <Arrow /></a>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="experience-section" id="experience">
          <div className="experience-heading" data-reveal>
            <span className="kicker kicker-dark">Experience and capability</span>
            <h2>Design sense backed by hands-on technical operations.</h2>
            <p>My experience combines modern web delivery with more than a decade in customer service, sales, quality assurance, technical support, and operations. I understand what needs to happen after a visitor clicks, submits, books, or replies.</p>
          </div>
          <div className="experience-layout">
            <div className="timeline" data-reveal>
              <article>
                <span className="timeline-year">2025<br />Present</span>
                <div>
                  <small>AIA / AI agency web operations</small>
                  <h3>Website, GHL and Systems Specialist</h3>
                  <p>Build and maintain client websites, manage GitHub and Vercel deployments, configure Cloudflare, DNS, domains, and technical SEO, and support GoHighLevel funnels, calendars, workflows, migrations, and third-party integrations.</p>
                </div>
              </article>
              <article>
                <span className="timeline-year">2022<br />2025</span>
                <div>
                  <small>ProClick</small>
                  <h3>VA Team Lead and GoHighLevel Specialist</h3>
                  <p>Led day-to-day VA delivery while managing pipelines, funnels, multistep workflows, nurture sequences, lead routing, forms, surveys, CRM organization, Shopify and Amazon support, and customer operations.</p>
                </div>
              </article>
              <article>
                <span className="timeline-year">2020<br />2022</span>
                <div>
                  <small>Transparent BPO</small>
                  <h3>Sales Representative and Quality Assurance</h3>
                  <p>Managed outbound health insurance sales, CRM documentation, lead follow-up, KPI tracking, call evaluation, compliance checks, performance reporting, and coaching feedback.</p>
                </div>
              </article>
              <article>
                <span className="timeline-year">2015<br />2020</span>
                <div>
                  <small>Teleperformance, Teletech, iQor and Telus</small>
                  <h3>Customer and Technical Support</h3>
                  <p>Resolved complex account, billing, order, healthcare, telecommunications, device, and technical issues across phone, email, and chat while maintaining clear documentation and service quality.</p>
                </div>
              </article>
            </div>
            <div className="capability-console" data-reveal>
              <div className="console-top"><span>capabilities.json</span><i>● LIVE</i></div>
              <div className="capability-group">
                <span>01 / BUILD</span>
                <div><strong>Responsive websites</strong><b>READY</b></div>
                <div><strong>Landing pages</strong><b>READY</b></div>
                <div><strong>Technical SEO setup</strong><b>READY</b></div>
              </div>
              <div className="capability-group">
                <span>02 / CONNECT</span>
                <div><strong>CRM and calendars</strong><b>READY</b></div>
                <div><strong>Forms and notifications</strong><b>READY</b></div>
                <div><strong>API and third-party tools</strong><b>READY</b></div>
              </div>
              <div className="capability-group">
                <span>03 / LAUNCH</span>
                <div><strong>GitHub and Vercel</strong><b>READY</b></div>
                <div><strong>Cloudflare and DNS</strong><b>READY</b></div>
                <div><strong>Email authentication</strong><b>READY</b></div>
              </div>
            </div>
          </div>
          <div className="tech-marquee" aria-label="Technology experience">
            <div>
              {['GoHighLevel', 'Vercel', 'GitHub', 'Cloudflare', 'Lovable', 'ChatGPT', 'Claude', 'Athena', 'Google Workspace', 'Zapier', 'VAPI', 'Supabase', 'GoHighLevel', 'Vercel', 'GitHub', 'Cloudflare'].map((tool, index) => <span key={`${tool}-${index}`}>{tool}<i /></span>)}
            </div>
          </div>
        </section>

        <section className="price-section">
          <div className="price-intro" data-reveal>
            <span className="kicker">Simple starting point</span>
            <h2>Launch the essentials. Add more when it makes sense.</h2>
            <p>No oversized package for a business that needs a clear, professional online presence first.</p>
          </div>
          <div className="price-card" data-reveal>
            <div className="price-top">
              <div><span>Essential website</span><strong><sup>$</sup>500</strong><small>starting price</small></div>
              <p>A focused website for service businesses that need to look credible and make it easy for customers to reach out.</p>
            </div>
            <div className="price-details">
              <ul>
                <li><Check /> Up to 3 pages</li>
                <li><Check /> Custom responsive design</li>
                <li><Check /> Contact form and calls to action</li>
              </ul>
              <ul>
                <li><Check /> Basic on-page SEO</li>
                <li><Check /> Domain and launch setup</li>
                <li><Check /> 7 days post-launch support</li>
              </ul>
              <a className="button button-primary" href="#contact">Get a project estimate <Arrow /></a>
            </div>
            <div className="addon-strip">
              <span>Optional add-ons</span>
              <div><i /> Additional pages</div>
              <div><i /> Copywriting</div>
              <div><i /> Booking setup</div>
              <div><i /> CRM and automation</div>
            </div>
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
              <img src="/assets/ajell-saliba.webp" alt="Ajell Saliba, founder and independent specialist at Connective Stack" />
              <div className="portrait-shade" />
              <div className="portrait-label">
                <span>AJELL SALIBA</span>
                <small>WEB + SYSTEMS SPECIALIST</small>
              </div>
              <div className="portrait-code">
                <span>STATUS</span>
                <strong><i /> Available for projects</strong>
              </div>
            </div>
            <div className="experience-chip"><strong>3+</strong><span>Years building in GoHighLevel and connected systems</span></div>
          </div>
          <div className="about-copy" data-reveal>
            <span className="kicker kicker-dark">About AJ</span>
            <h2>One specialist. Direct communication. Practical execution.</h2>
            <p>I’m Ajell Saliba, an independent web and systems specialist based in the Philippines and working with US businesses. I bring more than a decade of customer-facing and operational experience, including team leadership, GoHighLevel, website operations, domains, integrations, and AI-assisted development.</p>
            <p>You work directly with me from planning through launch. No layers of account management and no vague handoffs.</p>
            <div className="tool-matrix">
              <div className="tool-group">
                <span>Web, CRM and deployment</span>
                <div>{['GoHighLevel', 'Lovable', 'Vercel', 'GitHub', 'Cloudflare', 'WordPress', 'Shopify', 'CMS Platforms'].map(tool => <b key={tool}>{tool}</b>)}</div>
              </div>
              <div className="tool-group">
                <span>AI and automation</span>
                <div>{['ChatGPT', 'Claude', 'Athena', 'Zapier', 'Make', 'VAPI', 'Chatbase', 'Supabase', 'Resend'].map(tool => <b key={tool}>{tool}</b>)}</div>
              </div>
              <div className="tool-group">
                <span>CRM, sales and support</span>
                <div>{['Salesforce', 'HubSpot', 'Zoho', 'Apollo.io', 'Aircall', 'Zendesk', 'Freshdesk'].map(tool => <b key={tool}>{tool}</b>)}</div>
              </div>
              <div className="tool-group">
                <span>Creative and operations</span>
                <div>{['Google Workspace', 'Microsoft 365', 'Slack', 'Trello', 'ClickUp', 'Notion', 'Canva', 'Figma', 'Framer', 'Zoom', 'Google Meet', 'Dropbox', 'Helium 10', 'Amazon Seller Central'].map(tool => <b key={tool}>{tool}</b>)}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-glow" />
          <div className="contact-content" data-reveal>
            <span className="kicker kicker-dark">Have a project in mind?</span>
            <h2>Let’s build the right starting point.</h2>
            <p>Tell me what your business does, what is not working today, and what you want the website to help you achieve.</p>
            <a href="mailto:aj@connectivestack.com?subject=Website%20project%20inquiry" className="button button-light">aj@connectivestack.com <Arrow /></a>
          </div>
          <div className="contact-panel" data-reveal>
            <span>Good fit for</span>
            <ul>
              <li><Check /> New service business websites</li>
              <li><Check /> Website redesigns</li>
              <li><Check /> Landing pages</li>
              <li><Check /> CRM and calendar connections</li>
              <li><Check /> Workflow and follow-up setup</li>
            </ul>
          </div>
        </section>
      </main>

      <footer>
        <a href="#top" className="footer-brand"><img src="/assets/connective-stack-logo.png" alt="Connective Stack" /></a>
        <p>Websites, integrations, and automation for service businesses.</p>
        <div>
          <span>© {new Date().getFullYear()} Connective Stack</span>
          <button type="button" onClick={() => setLegalModal('privacy')}>Privacy</button>
          <button type="button" onClick={() => setLegalModal('terms')}>Terms</button>
          <a href="mailto:aj@connectivestack.com">Email AJ</a>
        </div>
      </footer>
      {legalModal && <LegalModal type={legalModal} onClose={() => setLegalModal(null)} />}
    </>
  )
}

const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
const ghlSystemSlug = currentPath.startsWith('/ghl-systems/')
  ? currentPath.replace('/ghl-systems/', '')
  : null

const route = currentPath === '/demos/hvac-ai-front-desk'
  ? <HvacDemo />
  : currentPath === '/ghl-systems'
    ? <GhlSystems />
    : ghlSystemSlug
      ? <GhlSystems slug={ghlSystemSlug} />
      : <App />

createRoot(document.getElementById('root')).render(route)
