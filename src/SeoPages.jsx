import React,{useEffect,useState} from 'react'
import './seo-pages.css'
import ProfessionalRecommendation from './ProfessionalRecommendation'
import guideContent from './guide-content.json'
const SITE='https://www.connectivestack.com'
const CAL='https://calendly.com/ajell-saliba-connectivestack/30min'
export const pages={
'website-not-showing-on-google':['Website SEO','Why Your Business Website Is Not Showing Up on Google','A practical guide to indexing, technical SEO, local signals and discoverability when a live business website is difficult to find.','Website Development','/solutions/website-development'],
'hvac-website-not-showing-on-google':['HVAC SEO',"Why Your HVAC Website Isn't Showing Up on Google",'What HVAC companies can check when a website is live but difficult to find in branded or local service searches.','HVAC','/solutions/hvac'],
'hvac-google-business-profile-vs-website':['HVAC SEO','Google Business Profile vs. Website for HVAC Companies','How a strong Google Business Profile and a dedicated HVAC website support different parts of local discovery and conversion.','HVAC','/solutions/hvac'],
'hvac-missed-call-automation':['HVAC Automation','How Missed Call Automation Works for HVAC Companies','A practical customer path from a missed HVAC call to response, qualification, booking, CRM and follow-up.','HVAC','/solutions/hvac'],
'automated-lead-follow-up':['CRM Automation','How Automated Lead Follow-Up Works for Small Businesses','How a new inquiry can move from website form to CRM, owner, response, reminders and a defined fallback path.','CRM Automation','/solutions/crm-automation'],
'website-to-crm-integration':['CRM Integration','How to Connect a Website to a CRM','The core data flow between website forms, CRM contacts, opportunities, calendars, notifications and follow-up.','Integrations','/solutions/integrations'],
'website-form-not-delivering-leads':['Website Troubleshooting',"Why Your Website Form Isn't Delivering Leads",'Where form submissions can fail between the browser, server, email provider, CRM, notification and lead owner.','Integrations','/solutions/integrations'],
'ai-receptionist-small-business':['AI Automation','How an AI Receptionist Can Work for a Small Business','A practical look at AI call handling, qualification, structured data capture, human escalation and workflow boundaries.','AI Automation','/solutions/ai-automation']
}
export const sols={
'website-development':["WEBSITE DEVELOPMENT","Website Development for Service Businesses","Build a service business website with clear service pages, mobile-friendly inquiry forms, technical SEO and tested lead capture."],
'ai-automation':["AI AUTOMATION","AI Receptionist and Workflow Automation for Small Businesses","Design AI receptionist systems and workflow automation for missed calls, lead qualification, booking and human escalation."],
'crm-automation':["CRM AUTOMATION","GoHighLevel CRM and Lead Follow-Up Automation","Set up or troubleshoot GoHighLevel CRM workflows, pipelines, lead routing, missed-call follow-up and appointment reminders."],
'integrations':["API INTEGRATIONS","Website-to-CRM, API and Webhook Integrations","Connect website forms, CRM, calendars and email with tested APIs and webhooks, including delivery failures and duplicate handling."],
'hvac':["HVAC SYSTEMS","AI Receptionist and Lead Automation for HVAC Companies","Connect HVAC calls, missed-call follow-up, estimate requests, booking and CRM routing with an AI receptionist and a service business website."],
'real-estate':["REAL ESTATE SYSTEMS","Real Estate Websites and CRM Lead Automation","Build real estate inquiry paths with property search, buyer qualification, tour requests, agent assignment and CRM follow-up."],
'healthcare':["HEALTHCARE SYSTEMS","AI Receptionist and Patient Intake Automation for Clinics","Design clinic administrative workflows for appointment inquiries, patient intake, reminders and staff handoff with privacy-conscious boundaries."]
}
function Meta({title,desc,path}){useEffect(()=>{document.title=title;const set=(sel,attr,val)=>{let x=document.querySelector(sel);if(x)x.setAttribute(attr,val)};set('meta[name="description"]','content',desc);set('meta[property="og:title"]','content',title);set('meta[property="og:description"]','content',desc);set('meta[property="og:url"]','content',SITE+path);let c=document.querySelector('link[rel="canonical"]');if(c)c.href=SITE+path},[title,desc,path]);return null}
function Head(){const [open,setOpen]=useState(false);return <header className="seo-head"><a href="/" className="seo-logo"><img width="1200" height="220" decoding="async" src="/assets/connectivestack-approved-logo.svg" alt="ConnectiveStack"/></a><button type="button" className="seo-menu-toggle" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} onClick={()=>setOpen(!open)}><span/><span/></button><nav className={open?'is-open':''}><a href="/#services">Problems I Solve</a><a href="/seo-guides">Guides</a><a href="https://ajellsaliba.services/" target="_blank" rel="noopener noreferrer">About</a><a className="seo-pill" href={CAL} target="_blank" rel="noreferrer">Show me the problem</a></nav></header>}
function Foot(){return <footer className="seo-foot"><a href="/"><img width="1200" height="220" decoding="async" src="/assets/connectivestack-approved-logo.svg" alt="ConnectiveStack"/></a><p>Websites, CRM, AI automation and integrations built around the problem that needs to be solved.</p><div><a href="/seo-guides">Guides</a><a href="https://ajellsaliba.services/" target="_blank" rel="noopener noreferrer">About</a></div></footer>}
export function GuideHub(){const [q,setQ]=useState('');const list=Object.entries(pages).filter(([,p])=>(p[1]+' '+p[2]+' '+p[3]).toLowerCase().includes(q.toLowerCase()));return <><Meta title="Website, CRM and AI Automation Guides | ConnectiveStack" desc="Practical ConnectiveStack guides for website SEO, HVAC lead generation, CRM automation, AI receptionists and business system integrations." path="/seo-guides"/><Head/><main className="seo-main"><section className="seo-hero"><span>PRACTICAL SYSTEM GUIDES</span><h1>Find the problem before adding another tool.</h1><p>Technical guides for service businesses dealing with weak website visibility, lost leads, disconnected CRM workflows, missed calls and manual handoffs.</p><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search website, CRM, HVAC, AI..." aria-label="Search guides"/></section><section className="seo-grid">{list.map(([slug,p])=><article key={slug}><small>{p[0]}</small><h2>{p[1]}</h2><p>{p[2]}</p><a href={'/guides/'+slug}>Read guide</a></article>)}</section></main><Foot/></>}
function GuideSection({block}) {
  return (
    <section className="guide-section">
      <h2>{block.heading}</h2>
      {(block.paragraphs || []).map((paragraph, i) => <p key={i}>{paragraph}</p>)}
      {block.steps?.length > 0 && (
        <ol className="guide-checklist">
          {block.steps.map((step, i) => <li key={i}>{step}</li>)}
        </ol>
      )}
      {block.example && (
        <aside className="guide-example" aria-label={block.example.label}>
          <span>{block.example.label}</span>
          <p>{block.example.text}</p>
        </aside>
      )}
    </section>
  )
}
export function Guide({slug}) {
  const p = pages[slug]
  if (!p) return <GuideHub/>
  const content = guideContent[slug]
  const related = content?.related?.filter(key => pages[key]) || []
  return <>
    <Meta title={p[1]+' | ConnectiveStack'} desc={p[2]} path={'/guides/'+slug}/>
    <Head/>
    <main className="seo-main seo-article guide-page">
      <nav className="guide-breadcrumb" aria-label="Breadcrumb"><a href="/">ConnectiveStack</a><span>/</span><a href="/seo-guides">Guides</a><span>/</span><span>{p[0]}</span></nav>
      <article className="guide-article">
        <header className="guide-article-head">
          <span className="guide-topic">{p[0]}</span>
          <h1>{p[1]}</h1>
          <p className="lead">{p[2]}</p>
          <div className="guide-byline"><span>ConnectiveStack technical guides</span><span>Updated November 2026</span><a href="https://ajellsaliba.services/" target="_blank" rel="noopener noreferrer">About the technical work</a></div>
        </header>
        <section className="guide-direct-answer" aria-label="Short answer">
          <span>THE SHORT ANSWER</span>
          <p>{content?.answer || p[2]}</p>
        </section>
        {content?.sections.map((block,i) => <GuideSection block={block} key={i}/>)}
        {content?.sources?.length > 0 && (
          <section className="guide-reference" aria-label="Documentation">
            <h2>Documentation and further reading</h2>
            <p>Product features and policies can change. Check the provider's current documentation before implementing any workflow.</p>
            <ul>{content.sources.map(([label,url]) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{label}</a></li>)}</ul>
          </section>
        )}
        <section className="guide-next-step">
          <div><span>EXPLORE A RELATED SYSTEM</span><h2>See how this connects to the bigger workflow.</h2><p>These guides describe design and QA practices. Demo and architecture pages are illustrative, not claims of verified client results.</p></div>
          <a className="guide-demo-link" href={content?.demo || p[4]}>View the example system <span aria-hidden="true">↗</span></a>
        </section>
        <nav className="guide-related" aria-label="Related technical guides">
          <h2>Continue with a related guide</h2>
          <ul>{related.map(key => <li key={key}><a href={'/guides/'+key}>{pages[key][1]}<span aria-hidden="true">↗</span></a></li>)}</ul>
        </nav>
        <div className="seo-next"><strong>Related ConnectiveStack service</strong><a href={p[4]}>Explore {p[3]}</a></div>
      </article>
    </main>
    <Foot/>
  </>
}
const solutionDetails = {
  "website-development": {
    "title": "Website Development for Service Businesses",
    "desc": "Build a service business website with clear service pages, mobile-friendly inquiry forms, technical SEO and tested lead capture.",
    "cards": [
      [
        "SERVICE PAGES",
        "Build pages around actual customer searches",
        "Give each core service a clear page with the problem it solves, service area where applicable, realistic next steps and a descriptive title."
      ],
      [
        "LEAD CAPTURE",
        "Connect forms to a real destination",
        "Validate contact fields, send submissions to the agreed inbox or CRM, confirm delivery and show a clear success or error state."
      ],
      [
        "TECHNICAL SEO",
        "Make pages discoverable",
        "Use crawlable links, unique titles, canonical URLs, a sitemap and accessible page content. Check mobile layout and page performance."
      ],
      [
        "ACCEPTANCE TEST",
        "Test the customer journey",
        "Submit test inquiries on mobile and desktop, verify delivery and confirm that failed submissions have a recovery path."
      ]
    ],
    "guides": [
      "website-not-showing-on-google",
      "website-form-not-delivering-leads",
      "website-to-crm-integration"
    ]
  },
  "ai-automation": {
    "title": "AI Receptionist and Workflow Automation for Small Businesses",
    "desc": "Design AI receptionist systems and workflow automation for missed calls, lead qualification, booking and human escalation.",
    "cards": [
      [
        "CALL HANDLING",
        "Answer inquiries when staff are busy",
        "Define what the AI receptionist can answer, collect caller details and identify whether the inquiry needs a booking or human callback."
      ],
      [
        "BOOKING",
        "Connect availability and follow-up",
        "Check the approved calendar before offering a slot, capture the outcome in the CRM and send confirmations only when booking succeeds."
      ],
      [
        "HUMAN HANDOFF",
        "Define where AI must stop",
        "Route urgent, ambiguous or out-of-scope calls to a person. Use a callback task if the transfer or booking cannot complete."
      ],
      [
        "TESTING",
        "Verify the call and data flow",
        "Test after-hours calls, noisy audio, unanswered transfers, invalid phone numbers and duplicate contacts before launch."
      ]
    ],
    "guides": [
      "ai-receptionist-small-business",
      "hvac-missed-call-automation",
      "automated-lead-follow-up"
    ],
    "links": [
      [
        "HVAC AI receptionist",
        "/solutions/hvac"
      ],
      [
        "Healthcare intake workflows",
        "/solutions/healthcare"
      ]
    ]
  },
  "crm-automation": {
    "title": "GoHighLevel CRM and Lead Follow-Up Automation",
    "desc": "Set up or troubleshoot GoHighLevel CRM workflows, pipelines, lead routing, missed-call follow-up and appointment reminders.",
    "cards": [
      [
        "CONTACT ROUTING",
        "Get every inquiry into the right pipeline",
        "Map form, call and webhook inputs to contacts and opportunities; define duplicate handling and who owns the next action."
      ],
      [
        "WORKFLOWS",
        "Fix delayed or missing follow-up",
        "Review triggers, filters, stop conditions and execution history. Separate appointment reminders from prospect follow-up and suppress unwanted messages."
      ],
      [
        "MISSED CALLS",
        "Create a callback path",
        "Capture missed calls, check messaging consent and availability, then send an appropriate response or assign a callback task."
      ],
      [
        "QA",
        "Test before relying on automation",
        "Verify contact creation, owner assignment, calendar outcomes, opt-outs and failure alerts using test records."
      ]
    ],
    "guides": [
      "automated-lead-follow-up",
      "website-to-crm-integration",
      "website-form-not-delivering-leads"
    ],
    "links": [
      [
        "Explore GoHighLevel systems",
        "/ghl-systems"
      ]
    ]
  },
  "integrations": {
    "title": "Website-to-CRM, API and Webhook Integrations",
    "desc": "Connect website forms, CRM, calendars and email with tested APIs and webhooks, including delivery failures and duplicate handling.",
    "cards": [
      [
        "DATA MAPPING",
        "Define what moves between systems",
        "Map required fields, ownership and the expected result at each system. Choose native integrations when they cover the requirements."
      ],
      [
        "WEBHOOKS",
        "Handle failures and duplicates",
        "Validate incoming data, authenticate requests, avoid duplicate records and log failed delivery for review or retry."
      ],
      [
        "EMAIL",
        "Verify the delivery path",
        "Check sending configuration, domain authentication and provider responses. Confirm successful receipt rather than assuming that a form submission sent an email."
      ],
      [
        "QA",
        "Prove the complete handoff",
        "Test valid and invalid inputs, timeouts and retries. Document credentials ownership, expected outcomes and recovery steps without exposing secrets."
      ]
    ],
    "guides": [
      "website-to-crm-integration",
      "website-form-not-delivering-leads",
      "automated-lead-follow-up"
    ]
  },
  "hvac": {
    "title": "AI Receptionist and Lead Automation for HVAC Companies",
    "desc": "Connect HVAC calls, missed-call follow-up, estimate requests, booking and CRM routing with an AI receptionist and a service business website.",
    "cards": [
      [
        "MISSED CALLS",
        "Capture the next service inquiry",
        "When technicians are occupied or the office is closed, collect the caller's contact details, service type, location and preferred callback time."
      ],
      [
        "QUALIFICATION",
        "Route the call based on the job",
        "Separate maintenance, repair and replacement inquiries. Confirm service area and route urgent or unsafe situations to approved human or emergency procedures."
      ],
      [
        "BOOKING",
        "Connect dispatch and estimate requests",
        "Use approved scheduling rules, record the requested job in the CRM and avoid promising a technician or appointment that has not been confirmed."
      ],
      [
        "FOLLOW-UP",
        "Recover inquiries that did not book",
        "Assign a callback owner, track estimate requests and send consent-based reminders. Test missed calls, failed transfers and duplicate submissions."
      ]
    ],
    "guides": [
      "hvac-missed-call-automation",
      "hvac-website-not-showing-on-google",
      "hvac-google-business-profile-vs-website"
    ],
    "links": [
      [
        "HVAC lead system case study",
        "/case-studies/hvac-lead-system"
      ],
      [
        "AI receptionist for small businesses",
        "/guides/ai-receptionist-small-business"
      ]
    ]
  },
  "real-estate": {
    "title": "Real Estate Websites and CRM Lead Automation",
    "desc": "Build real estate inquiry paths with property search, buyer qualification, tour requests, agent assignment and CRM follow-up.",
    "cards": [
      [
        "PROPERTY DISCOVERY",
        "Make property inquiries specific",
        "Connect listing details to clear inquiry and tour requests, capturing the listing reference and preferred contact method."
      ],
      [
        "QUALIFICATION",
        "Collect useful buyer requirements",
        "Capture price range, area and viewing preferences without promising financing, eligibility or availability."
      ],
      [
        "AGENT ROUTING",
        "Assign inquiries to the appropriate agent",
        "Map lead source and property interest to an owner, notification and callback task. Respect consent and avoid duplicate outreach."
      ],
      [
        "TOUR REQUESTS",
        "Confirm the next step",
        "Check approved calendar rules, distinguish requests from confirmed appointments and track follow-up outcomes."
      ]
    ],
    "guides": [
      "website-to-crm-integration",
      "automated-lead-follow-up"
    ],
    "links": [
      [
        "Real estate system case study",
        "/case-studies/luxury-real-estate"
      ]
    ]
  },
  "healthcare": {
    "title": "AI Receptionist and Patient Intake Automation for Clinics",
    "desc": "Design clinic administrative workflows for appointment inquiries, patient intake, reminders and staff handoff with privacy-conscious boundaries.",
    "cards": [
      [
        "ADMINISTRATIVE CALLS",
        "Handle appointment and office inquiries",
        "Use an approved receptionist workflow for hours, location, appointment requests and administrative questions. Do not provide medical advice or diagnose symptoms."
      ],
      [
        "INTAKE",
        "Collect only necessary information",
        "Define what information is needed, who can access it and where it is stored. Review vendor agreements, applicable privacy requirements and retention before handling patient data."
      ],
      [
        "SCHEDULING",
        "Connect requests to clinic staff",
        "Use approved scheduling rules, distinguish a request from a confirmed booking and route exceptions to the responsible staff member."
      ],
      [
        "ESCALATION",
        "Keep clinical decisions with qualified staff",
        "Use a clinic-approved escalation script for urgent or clinical questions. Test failed calls, incomplete requests and staff notifications before deployment."
      ]
    ],
    "guides": [
      "ai-receptionist-small-business",
      "website-to-crm-integration",
      "automated-lead-follow-up"
    ],
    "links": [
      [
        "Healthcare patient experience case study",
        "/case-studies/healthcare-patient-experience"
      ]
    ]
  }
}
export function Solution({slug}) {
  const p = sols[slug]
  const detail = solutionDetails[slug]
  if (!p || !detail) return <GuideHub/>
  const demo = slug === 'hvac' ? '/demos/hvac-ai-front-desk' : slug === 'real-estate' ? '/demos/luxury-real-estate' : slug === 'healthcare' ? '/demos/healthcare-patient-experience' : null
  return <>
    <Meta title={p[1]+' | ConnectiveStack'} desc={p[2]} path={'/solutions/'+slug}/>
    <Head/>
    <main className="seo-main">
      <section className="seo-hero">
        <span>{p[0]}</span><h1>{p[1]}</h1><p>{p[2]}</p>
        <div className="seo-actions">{demo && <a className="primary" href={demo}>Try the live demo</a>}<a className={demo ? undefined : 'primary'} href={CAL} target="_blank" rel="noopener noreferrer">Discuss your workflow</a><a href="/seo-guides">Read related guides</a></div>
      </section>
      <section className="seo-grid">{detail.cards.map(([label,title,copy]) => <article key={label}><small>{label}</small><h2>{title}</h2><p>{copy}</p></article>)}</section>
      <section className="seo-next"><strong>How much does this cost?</strong><p>Pricing depends on the integrations, volume, current setup and testing requirements. We agree on scope, deliverables and acceptance checks before implementation. Third-party subscriptions and usage charges are assessed separately.</p><a href={CAL} target="_blank" rel="noopener noreferrer">Discuss your requirements</a></section>
      <nav className="guide-related" aria-label="Related resources"><h2>Explore the workflow and technical guides</h2><ul>{detail.guides.map(key => <li key={key}><a href={'/guides/'+key}>{pages[key][1]}</a></li>)}{(detail.links || []).map(([label,url]) => <li key={url}><a href={url}>{label}</a></li>)}</ul></nav>
    </main>
    <Foot/>
  </>
}
const technicalSkills = [
  ['Websites and deployment', 'React, JavaScript, HTML, CSS, responsive UI, WordPress, Shopify, Framer, Lovable, GitHub and Vercel.'],
  ['CRM and automation', 'GoHighLevel funnels, forms, calendars, pipelines, segmentation, workflows and follow-up; Zapier and n8n.'],
  ['Integrations and AI tools', 'REST APIs, webhooks, Supabase, Resend, Mailgun, Vapi, Retell, Twilio and Chatbase.'],
  ['Domains and discoverability', 'Cloudflare, DNS, SSL, SPF, DKIM, DMARC, Google Workspace, metadata, canonicals, sitemaps, robots.txt and Search Console.'],
  ['Design and delivery', 'Figma, Canva, QA, accessibility checks, mobile testing, Slack, Trello, FreshDesk, Calendly and Google Calendar.'],
]
export function AboutAjell(){return <>
  <Meta title="Experience and Technical Work | ConnectiveStack" desc="Website delivery, GoHighLevel systems, DNS, integrations and technical problem solving across agency and operations roles." path="/ajell-saliba"/>
  <Head/>
  <main className="seo-main seo-about">
    <section className="about-intro" aria-labelledby="about-heading">
      <div className="about-intro-copy">
        <span>WEB / GHL / TECHNICAL OPERATIONS</span>
        <h1 id="about-heading">I build the website. Then I make the systems behind it work.</h1>
        <p className="lead">A website is only useful when the form, calendar, CRM, notification and follow-up work after someone clicks. My work covers that full path, from the page a customer sees to the handoff a team relies on.</p>
        <p>Across 11 years in technical support, customer operations, sales, QA, team leadership and web delivery, I have learned to trace where a process actually breaks. The last 3+ years have included hands-on GoHighLevel work alongside website builds, deployments and integrations.</p>
        <div className="seo-actions"><a className="primary" href={CAL} target="_blank" rel="noreferrer">Discuss a technical problem</a><a href="/#services">Explore capabilities</a></div>
      </div>
      <img width="1080" height="1440" decoding="async" src="/assets/ajell-saliba.webp" alt="Portrait of the specialist behind ConnectiveStack"/>
    </section>

    <section className="about-work" aria-labelledby="about-work-heading">
      <div className="about-section-head"><span>EXPERIENCE IN PRACTICE</span><h2 id="about-work-heading">From the customer click to the technical handoff</h2><p>The work spans customer-facing pages, the systems behind them and the people who need a reliable next step.</p></div>
      <div className="about-work-grid">
        <article className="about-role about-role-current">
          <div className="about-role-top"><span>WEB / SYSTEMS</span><strong>Delivery and repair</strong></div>
          <h3>Build the page. Connect what happens next.</h3>
          <p>I build and maintain websites and landing pages, then connect customer actions to the CRM, calendar and follow-up behind them.</p>
          <ul>
            <li>Build responsive pages, apply client feedback, fix broken CTAs and forms, and check the experience through launch.</li>
            <li>Set up GoHighLevel forms, calendars, pipelines, lead routing, notifications and follow-up workflows; troubleshoot missing data and broken handoffs.</li>
            <li>Configure Cloudflare DNS, domains and subdomains, SSL and email authentication; deploy and debug sites through GitHub and Vercel.</li>
            <li>Connect services through APIs and webhooks, test integrations, and handle technical SEO such as metadata, canonicals, robots.txt, sitemaps and structured data.</li>
          </ul>
        </article>
        <article className="about-role">
          <div className="about-role-top"><span>OPERATIONS / QA</span><strong>People and process</strong></div>
          <h3>Find the point where a handoff fails.</h3>
          <p>My customer operations, technical support, sales and team leadership work shaped how I diagnose a broken journey. I have led quality work for a VA team while handling CRM and customer issues directly.</p>
          <ul>
            <li>Built and maintained funnels, forms, calendars, pipelines, opportunity tracking, segmentation and automated follow-up.</li>
            <li>Connected surveys, booking paths and third-party tools, then investigated workflow and CRM issues when the expected action did not happen.</li>
            <li>Supported Shopify and Amazon operations, customer service, retention and team QA.</li>
          </ul>
        </article>
      </div>
    </section>

    <section className="about-skills" aria-labelledby="about-skills-heading">
      <div className="about-section-head"><span>TOOLS AND TECHNICAL WORK</span><h2 id="about-skills-heading">What I use to build and fix it</h2><p>The tools vary by project. The work usually involves more than one layer, so I test the path across the page, infrastructure, CRM and handoff.</p></div>
      <div className="about-skills-grid">{technicalSkills.map(([title,detail])=><article key={title}><h3>{title}</h3><p>{detail}</p></article>)}</div>
      <div className="about-proof" id="projects"><div><span>PROJECTS</span><h3>See the built work</h3><p><a href="https://www.pawnovaco.com/" target="_blank" rel="noopener noreferrer">Pawnova</a> is a live Amazon affiliate project. The HVAC, real estate and healthcare experiences in the demo menu are clearly labeled concepts, built to show customer journeys and system ideas.</p></div><a href="/" className="about-back-link">Back to ConnectiveStack</a></div>
    </section>
    <ProfessionalRecommendation placement="about" />
  </main>
  <Foot/>
</>}
export const guideSlugs=new Set(Object.keys(pages))
export const solutionSlugs=new Set(Object.keys(sols))
