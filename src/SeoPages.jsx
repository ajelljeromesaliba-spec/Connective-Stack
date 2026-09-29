import React,{useEffect,useState} from 'react'
import './seo-pages.css'
const SITE='https://connectivestack.com'
const CAL='https://calendly.com/ajell-saliba-connectivestack/30min'
const pages={
'website-not-showing-on-google':['Website SEO','Why Your Business Website Is Not Showing Up on Google','A practical guide to indexing, technical SEO, local signals and discoverability when a live business website is difficult to find.','Website Development','/solutions/website-development'],
'hvac-website-not-showing-on-google':['HVAC SEO',"Why Your HVAC Website Isn't Showing Up on Google",'What HVAC companies can check when a website is live but difficult to find in branded or local service searches.','HVAC','/solutions/hvac'],
'hvac-google-business-profile-vs-website':['HVAC SEO','Google Business Profile vs. Website for HVAC Companies','How a strong Google Business Profile and a dedicated HVAC website support different parts of local discovery and conversion.','HVAC','/solutions/hvac'],
'hvac-missed-call-automation':['HVAC Automation','How Missed Call Automation Works for HVAC Companies','A practical customer path from a missed HVAC call to response, qualification, booking, CRM and follow-up.','HVAC','/solutions/hvac'],
'automated-lead-follow-up':['CRM Automation','How Automated Lead Follow-Up Works for Small Businesses','How a new inquiry can move from website form to CRM, owner, response, reminders and a defined fallback path.','CRM Automation','/solutions/crm-automation'],
'website-to-crm-integration':['CRM Integration','How to Connect a Website to a CRM','The core data flow between website forms, CRM contacts, opportunities, calendars, notifications and follow-up.','Integrations','/solutions/integrations'],
'website-form-not-delivering-leads':['Website Troubleshooting',"Why Your Website Form Isn't Delivering Leads",'Where form submissions can fail between the browser, server, email provider, CRM, notification and lead owner.','Integrations','/solutions/integrations'],
'ai-receptionist-small-business':['AI Automation','How an AI Receptionist Can Work for a Small Business','A practical look at AI call handling, qualification, structured data capture, human escalation and workflow boundaries.','AI Automation','/solutions/ai-automation']
}
const sols={
'website-development':['WEBSITE DEVELOPMENT','Websites Built to Turn Attention Into Action','Modern service-business websites with clear customer journeys, technical SEO foundations, lead capture and reliable deployment.'],
'ai-automation':['AI AUTOMATION','Practical AI Automation for Small Businesses','AI workflows for repetitive customer and operational tasks, designed with clear boundaries, fallback logic and human handoff.'],
'crm-automation':['CRM AUTOMATION','CRM and Lead Follow-Up Automation','Connect inquiries to contacts, pipelines, owners, reminders and follow-up so opportunities do not disappear between tools.'],
'integrations':['API INTEGRATIONS','Website, CRM and Business System Integrations','Connect websites, calendars, email, CRM, databases and third-party tools around the actual business process.'],
'hvac':['HVAC SYSTEMS','HVAC Websites and Lead Automation','Connect local discovery, service pages, calls, estimate requests, booking and follow-up into one customer path.'],
'real-estate':['REAL ESTATE SYSTEMS','Real Estate Websites and Lead Routing','Property experiences with buyer intent, agent routing, tour requests, qualification and connected follow-up.'],
'healthcare':['HEALTHCARE SYSTEMS','Healthcare Website and Administrative Workflows','Provider discovery, administrative intake, scheduling and patient routing designed with privacy-conscious workflows in mind.']
}
function Meta({title,desc,path}){useEffect(()=>{document.title=title;const set=(sel,attr,val)=>{let x=document.querySelector(sel);if(x)x.setAttribute(attr,val)};set('meta[name="description"]','content',desc);set('meta[property="og:title"]','content',title);set('meta[property="og:description"]','content',desc);set('meta[property="og:url"]','content',SITE+path);let c=document.querySelector('link[rel="canonical"]');if(c)c.href=SITE+path},[title,desc,path]);return null}
function Head(){const [open,setOpen]=useState(false);return <header className="seo-head"><a href="/" className="seo-logo"><img src="/assets/connectivestack-metallic-logo.jpg" alt="ConnectiveStack"/></a><button type="button" className="seo-menu-toggle" aria-label={open?'Close navigation':'Open navigation'} aria-expanded={open} onClick={()=>setOpen(!open)}><span/><span/></button><nav className={open?'is-open':''}><a href="/#services">Problems I Solve</a><a href="/seo-guides">Guides</a><a href="/ajell-saliba">About</a><a className="seo-pill" href={CAL} target="_blank" rel="noreferrer">Show me the problem</a></nav></header>}
function Foot(){return <footer className="seo-foot"><a href="/"><img src="/assets/connectivestack-metallic-logo.jpg" alt="ConnectiveStack"/></a><p>Websites, CRM, AI automation and integrations built around the problem that needs to be solved.</p><div><a href="/seo-guides">Guides</a><a href="/ajell-saliba">About</a></div></footer>}
export function GuideHub(){const [q,setQ]=useState('');const list=Object.entries(pages).filter(([,p])=>(p[1]+' '+p[2]+' '+p[3]).toLowerCase().includes(q.toLowerCase()));return <><Meta title="Website, CRM and AI Automation Guides | ConnectiveStack" desc="Practical ConnectiveStack guides for website SEO, HVAC lead generation, CRM automation, AI receptionists and business system integrations." path="/seo-guides"/><Head/><main className="seo-main"><section className="seo-hero"><span>PRACTICAL SYSTEM GUIDES</span><h1>Find the problem before adding another tool.</h1><p>Technical guides for service businesses dealing with weak website visibility, lost leads, disconnected CRM workflows, missed calls and manual handoffs.</p><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search website, CRM, HVAC, AI..." aria-label="Search guides"/></section><section className="seo-grid">{list.map(([slug,p])=><article key={slug}><small>{p[0]}</small><h2>{p[1]}</h2><p>{p[2]}</p><a href={'/guides/'+slug}>Read guide</a></article>)}</section></main><Foot/></>}
export function Guide({slug}){const p=pages[slug];if(!p)return <GuideHub/>;return <><Meta title={p[1]+' | ConnectiveStack'} desc={p[2]} path={'/guides/'+slug}/><Head/><main className="seo-main seo-article"><a href="/seo-guides">Back to guides</a><article><span>{p[0]}</span><h1>{p[1]}</h1><p className="lead">{p[2]}</p><h2>Start with what can be verified</h2><p>A visible symptom does not always reveal the layer causing the problem. Check the customer path before deciding whether the fix belongs in the website, search setup, CRM, automation or integration.</p><h2>What to check</h2><ul><li>Can the right customer discover and understand the page?</li><li>Is the primary call, form, estimate or booking action easy to complete?</li><li>Does submitted information reach the correct system and owner?</li><li>Is there a defined response when a webhook, field, notification or human handoff fails?</li></ul><h2>What the system should accomplish</h2><p>The goal is a clear path from customer intent to the next business action. That means fewer silent failures, fewer manual handoffs and enough visibility to understand what happened when something breaks.</p><div className="seo-next"><strong>Related solution</strong><a href={p[4]}>Explore {p[3]}</a></div></article></main><Foot/></>}
export function Solution({slug}){const p=sols[slug];if(!p)return <GuideHub/>;const demo=slug==='hvac'?'/demos/hvac-ai-front-desk':slug==='real-estate'?'/demos/luxury-real-estate':slug==='healthcare'?'/demos/healthcare-patient-experience':null;return <><Meta title={p[1]+' | ConnectiveStack'} desc={p[2]} path={'/solutions/'+slug}/><Head/><main className="seo-main"><section className="seo-hero"><span>{p[0]}</span><h1>{p[1]}</h1><p>{p[2]}</p><div className="seo-actions">{demo&&<a className="primary" href={demo}>Try the live demo</a>}<a href="/seo-guides">Read related guides</a></div></section><section className="seo-grid"><article><small>TRACE</small><h2>Trace the current path</h2><p>Start with the customer action, the information it creates and every handoff that follows.</p></article><article><small>REPAIR</small><h2>Fix the actual failure</h2><p>Change the page, routing, workflow or integration that evidence points to instead of adding unnecessary software.</p></article><article><small>TEST</small><h2>Test edge cases</h2><p>Verify mobile behavior, missing fields, duplicates, failed notifications, retries and human escalation.</p></article><article><small>MEASURE</small><h2>Make it measurable</h2><p>Track meaningful customer and operational actions so the business can see where the journey succeeds or stalls.</p></article></section></main><Foot/></>}
const earlierRoles = [
  ['Transparent BPO', 'Sales, cold calling, health insurance and QA', 'Nov 2020 – Nov 2022'],
  ['Teleperformance Philippines', 'Customer service', 'Mar 2019 – Aug 2020'],
  ['Teletech Philippines', 'Technical support', 'Oct 2017 – Mar 2019'],
  ['iQor Philippines', 'Collections', 'Jan 2017 – Oct 2017'],
  ['Telus International', 'Technical support', 'Apr 2015 – Jan 2017'],
]
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
        <div className="seo-actions"><a className="primary" href={CAL} target="_blank" rel="noreferrer">Discuss a technical problem</a><a href="/#work">See a live project</a></div>
      </div>
      <img src="/assets/ajell-saliba.webp" alt="Portrait of the specialist behind ConnectiveStack"/>
    </section>

    <section className="about-work" aria-labelledby="about-work-heading">
      <div className="about-section-head"><span>WORK HISTORY</span><h2 id="about-work-heading">The work behind the portfolio</h2><p>Website delivery, GHL operations and years of direct customer problem solving. These are the roles and responsibilities behind the work shown here.</p></div>
      <div className="about-work-grid">
        <article className="about-role about-role-current">
          <div className="about-role-top"><span>2025 – PRESENT</span><strong>AI Acquisition (AIA)</strong></div>
          <h3>Web and AI automation specialist</h3>
          <p>I build and maintain websites and landing pages for North American service businesses, consultants and agencies, then connect the customer actions to the systems behind them.</p>
          <ul>
            <li>Build responsive pages, apply client feedback, fix broken CTAs and forms, and check the experience through launch.</li>
            <li>Set up GoHighLevel forms, calendars, pipelines, lead routing, notifications and follow-up workflows; troubleshoot missing data and broken handoffs.</li>
            <li>Configure Cloudflare DNS, domains and subdomains, SSL and email authentication; deploy and debug sites through GitHub and Vercel.</li>
            <li>Connect services through APIs and webhooks, test integrations, and handle technical SEO such as metadata, canonicals, robots.txt, sitemaps and structured data.</li>
          </ul>
        </article>
        <article className="about-role">
          <div className="about-role-top"><span>NOV 2022 – JUL 2025</span><strong>ProClick</strong></div>
          <h3>VA team lead, GHL specialist and e-commerce support</h3>
          <p>I managed day-to-day delivery and quality for a VA team while working directly on GoHighLevel and customer operations.</p>
          <ul>
            <li>Built and maintained funnels, forms, calendars, pipelines, opportunity tracking, segmentation and automated follow-up.</li>
            <li>Connected surveys, booking paths and third-party tools, then investigated workflow and CRM issues when the expected action did not happen.</li>
            <li>Supported Shopify and Amazon e-commerce operations, customer service, retention and team QA.</li>
          </ul>
        </article>
      </div>
      <div className="about-earlier">
        <h3>Earlier roles built the troubleshooting foundation</h3>
        <p>Before website and GHL delivery, I worked in technical support, customer service, collections, sales and QA. Those roles taught me to ask what the customer tried, what the system recorded and where the next action stopped.</p>
        <div className="about-earlier-list">{earlierRoles.map(([company,role,dates])=><div key={company}><strong>{company}</strong><span>{role}</span><small>{dates}</small></div>)}</div>
      </div>
    </section>

    <section className="about-skills" aria-labelledby="about-skills-heading">
      <div className="about-section-head"><span>TOOLS AND TECHNICAL WORK</span><h2 id="about-skills-heading">What I use to build and fix it</h2><p>The tools vary by project. The work usually involves more than one layer, so I test the path across the page, infrastructure, CRM and handoff.</p></div>
      <div className="about-skills-grid">{technicalSkills.map(([title,detail])=><article key={title}><h3>{title}</h3><p>{detail}</p></article>)}</div>
      <div className="about-proof"><div><span>PUBLIC WORK</span><h3>See the built work</h3><p><a href="https://www.pawnovaco.com/" target="_blank" rel="noopener noreferrer">Pawnova</a> is a live Amazon affiliate website. The HVAC, real estate and healthcare experiences in the demo menu are clearly labeled concepts, built to show customer journeys and system ideas.</p></div><a href="/" className="about-back-link">Back to portfolio</a></div>
    </section>
  </main>
  <Foot/>
</>}
export const guideSlugs=new Set(Object.keys(pages))
export const solutionSlugs=new Set(Object.keys(sols))
