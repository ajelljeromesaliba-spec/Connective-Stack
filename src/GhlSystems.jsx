import React from 'react'
import './ghl-systems.css'

const CALENDAR_URL = 'https://calendar.app.google/1tdYCWw6gwfTx3E56'

export const ghlSystems = [
  {
    slug: 'lead-to-appointment',
    number: '01',
    title: 'Complete Lead-to-Appointment System',
    flow: ['Landing Page', 'Form', 'CRM', 'Automation', 'Calendar', 'Pipeline'],
    description: 'A complete front-to-back lead journey that captures interest, stores the contact, starts follow-up, books the appointment, and moves the opportunity into the right pipeline stage.',
    outcome: 'Reduce the gap between a new inquiry and a booked conversation.',
    integrations: ['GoHighLevel CRM', 'GHL Forms', 'GHL Calendar', 'LC Phone / Twilio', 'Mailgun / Email']
  },
  {
    slug: 'lead-nurture',
    number: '02',
    title: 'Lead Nurture Automation',
    flow: ['New Lead', 'SMS / Email', 'Follow-Ups', 'Pipeline Updates'],
    description: 'A multi-step follow-up workflow that keeps new leads warm, triggers the next touchpoint, and updates pipeline activity without relying on manual reminders.',
    outcome: 'Keep follow-up consistent when the team is busy.',
    integrations: ['GoHighLevel Workflows', 'LC Phone / Twilio', 'Mailgun', 'Gmail / Google Workspace']
  },
  {
    slug: 'client-onboarding',
    number: '03',
    title: 'Client Onboarding System',
    flow: ['New Client', 'Welcome Email', 'Form', 'Tasks', 'Notifications'],
    description: 'A structured onboarding sequence that sends the right information, collects what the team needs, assigns internal actions, and keeps the handoff visible.',
    outcome: 'Create a repeatable onboarding experience with fewer missed steps.',
    integrations: ['GoHighLevel CRM', 'Forms', 'Email', 'Tasks', 'Slack / Webhooks']
  },
  {
    slug: 'appointment-booking',
    number: '04',
    title: 'Appointment Booking System',
    flow: ['Calendar', 'Confirmation', 'Reminders', 'Follow-Up'],
    description: 'An appointment workflow that confirms bookings, sends reminders, and triggers the right post-appointment follow-up based on status.',
    outcome: 'Make booking and reminder communication more reliable.',
    integrations: ['GHL Calendar', 'Google Calendar', 'SMS', 'Email', 'Zoom']
  },
  {
    slug: 'lead-capture',
    number: '05',
    title: 'Lead Capture System',
    flow: ['Landing Page', 'Form', 'CRM', 'Pipeline'],
    description: 'A clean capture flow that turns website inquiries into structured CRM records with the correct tags, source, ownership, and opportunity stage.',
    outcome: 'Keep incoming leads organized from the first submission.',
    integrations: ['GHL Funnels', 'Forms', 'CRM', 'Pipelines', 'Facebook Lead Ads']
  },
  {
    slug: 'lead-qualification-routing',
    number: '06',
    title: 'Lead Qualification & Routing',
    flow: ['New Lead', 'Qualification', 'Tag / Score', 'Assignment', 'Team Alert'],
    description: 'Rules-based qualification that segments leads and routes them to the right owner, pipeline, or next action using form answers and CRM data.',
    outcome: 'Put the right lead in front of the right person faster.',
    integrations: ['GoHighLevel CRM', 'Custom Fields', 'Workflows', 'Slack', 'Webhooks']
  },
  {
    slug: 'missed-call-recovery',
    number: '07',
    title: 'Missed Call Recovery',
    flow: ['Missed Call', 'Instant SMS', 'Lead Created', 'Follow-Up', 'Booking Link'],
    description: 'A missed-call text-back flow that creates or updates the contact, responds quickly, and gives the caller a direct path to continue the conversation.',
    outcome: 'Recover opportunities that would otherwise disappear after an unanswered call.',
    integrations: ['LC Phone / Twilio', 'GoHighLevel CRM', 'SMS', 'GHL Calendar']
  },
  {
    slug: 'no-show-recovery',
    number: '08',
    title: 'No-Show & Appointment Recovery',
    flow: ['No-Show', 'SMS / Email', 'Rebooking Link', 'Follow-Up', 'Pipeline Update'],
    description: 'A recovery sequence for missed appointments that sends a rebooking path and keeps the opportunity visible for follow-up.',
    outcome: 'Give missed appointments a structured second chance.',
    integrations: ['GHL Calendar', 'Workflows', 'SMS', 'Email', 'Pipelines']
  },
  {
    slug: 'review-request',
    number: '09',
    title: 'Review Request Automation',
    flow: ['Service Complete', 'Review Request', 'Reminder', 'Review Logged'],
    description: 'A post-service workflow that asks customers for feedback at the right time and follows up when the first request is missed.',
    outcome: 'Turn completed jobs into a more consistent review process.',
    integrations: ['GoHighLevel Reputation', 'Google Business Profile', 'SMS', 'Email']
  },
  {
    slug: 'reactivation-campaign',
    number: '10',
    title: 'Lead Reactivation Campaign',
    flow: ['Old Leads', 'SMS / Email', 'Replies', 'Qualification', 'Pipeline'],
    description: 'A re-engagement workflow for older contacts that captures responses, requalifies interest, and moves active opportunities back into the sales process.',
    outcome: 'Create new conversations from an existing database.',
    integrations: ['GoHighLevel CRM', 'Smart Lists', 'SMS', 'Email', 'Workflows']
  },
  {
    slug: 'internal-task-notifications',
    number: '11',
    title: 'Internal Task & Notification Workflow',
    flow: ['Trigger', 'Team Alert', 'Task Assignment', 'Status Update'],
    description: 'Internal automation that creates tasks and notifications when important lead, sales, or service events happen.',
    outcome: 'Reduce manual handoffs and make ownership clearer.',
    integrations: ['GoHighLevel Workflows', 'Tasks', 'Slack', 'Email', 'Webhooks']
  },
  {
    slug: 'proposal-follow-up',
    number: '12',
    title: 'Estimate & Proposal Follow-Up',
    flow: ['Quote Sent', 'Reminder', 'Follow-Up', 'Response', 'Won / Lost'],
    description: 'A sales follow-up sequence that keeps estimates and proposals from going quiet and updates the opportunity based on the response.',
    outcome: 'Keep open proposals visible without relying on memory.',
    integrations: ['GoHighLevel CRM', 'Pipelines', 'Email', 'SMS', 'Stripe / Payment Links']
  }
]

const systemArchitectures = [
  {
    number: 'A1',
    title: 'Lead-to-Appointment Architecture',
    problem: 'Turn a new inquiry into a qualified, booked opportunity without relying on manual follow-up.',
    flow: ['Landing Page', 'Form', 'Qualification', 'GHL CRM', 'Automation', 'Calendar', 'Pipeline'],
    tools: ['GoHighLevel', 'LC Phone / Twilio', 'Mailgun', 'Google Calendar'],
    automation: 'Creates or updates the contact, applies source and qualification data, triggers follow-up, books the meeting, and advances the opportunity.',
    edgeCases: ['Duplicate contacts', 'Incomplete form data', 'Failed notifications', 'No response after follow-up'],
    fallback: 'Create a manual task or team alert when the automated path cannot complete.'
  },
  {
    number: 'A2',
    title: 'AI Front Desk & Missed Call Recovery',
    problem: 'Keep calls and after-hours inquiries from disappearing when nobody answers immediately.',
    flow: ['Incoming Call', 'AI / Phone System', 'CRM Contact', 'SMS Follow-Up', 'Booking', 'Human Handoff'],
    tools: ['VAPI', 'GoHighLevel', 'LC Phone / Twilio', 'GHL Calendar'],
    automation: 'Captures caller details, starts an SMS conversation, offers a booking path, and records the lead for follow-up.',
    edgeCases: ['No answer', 'After-hours call', 'Unclear intent', 'Caller requests a person'],
    fallback: 'Route to a human, create a callback task, or send the team a notification.'
  },
  {
    number: 'A3',
    title: 'Website-to-CRM Infrastructure',
    problem: 'Connect the public website to the systems behind it so form submissions do not stop at an inbox.',
    flow: ['Website', 'Form / API', 'Webhook', 'CRM', 'Workflow', 'Notification', 'Database'],
    tools: ['Vercel', 'GitHub', 'Cloudflare', 'GoHighLevel', 'Supabase', 'Resend'],
    automation: 'Validates the submission, sends it to the right system, triggers downstream actions, and records delivery or workflow status.',
    edgeCases: ['Webhook failure', 'Invalid payload', 'Email delivery issue', 'Duplicate submission'],
    fallback: 'Log the failure, preserve the submission, and notify the team instead of silently losing the lead.'
  },
  {
    number: 'A4',
    title: 'Qualified Lead Routing System',
    problem: 'Send the right lead to the right pipeline, owner, or next step based on real qualification data.',
    flow: ['New Lead', 'Custom Fields', 'Logic', 'Tag / Score', 'Owner', 'Pipeline', 'Team Alert'],
    tools: ['GoHighLevel', 'Custom Fields', 'Workflows', 'Slack', 'Webhooks'],
    automation: 'Reads form answers and CRM data, applies routing rules, assigns ownership, and starts the correct follow-up path.',
    edgeCases: ['Missing answers', 'Conflicting criteria', 'Unassigned owner', 'Existing opportunity'],
    fallback: 'Place uncertain leads into a review stage and alert the team for manual assignment.'
  },
  {
    number: 'A5',
    title: 'Appointment Recovery Architecture',
    problem: 'Recover missed appointments instead of letting a no-show become a dead lead.',
    flow: ['No-Show', 'Status Trigger', 'SMS / Email', 'Rebooking Link', 'Pipeline Update', 'Task'],
    tools: ['GHL Calendar', 'GoHighLevel Workflows', 'SMS', 'Email', 'Pipelines'],
    automation: 'Detects appointment status, sends recovery messages, offers a new booking path, and keeps the opportunity active.',
    edgeCases: ['Repeated no-show', 'Reply received', 'Already rebooked', 'Opt-out'],
    fallback: 'Stop automation when needed and create a manual follow-up task for the owner.'
  },
  {
    number: 'A6',
    title: 'Client Onboarding & Internal Handoff',
    problem: 'Move a closed deal into delivery without relying on scattered messages and memory.',
    flow: ['Won Opportunity', 'Welcome Email', 'Intake Form', 'Tasks', 'Internal Alert', 'Delivery Stage'],
    tools: ['GoHighLevel', 'Forms', 'Email', 'Slack', 'Zapier / Make'],
    automation: 'Starts onboarding, collects required information, assigns internal tasks, and updates the client stage.',
    edgeCases: ['Missing intake', 'Incomplete payment', 'Delayed client response', 'Task not completed'],
    fallback: 'Send reminders, escalate internally, or hold the workflow until the required step is complete.'
  }
]

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

function Flow({ steps }) {
  return <div className="ghl-flow">{steps.map((step, i) => <React.Fragment key={step}><span>{step}</span>{i < steps.length - 1 && <b>→</b>}</React.Fragment>)}</div>
}

export default function GhlSystems({ slug }) {
  const system = slug ? ghlSystems.find(item => item.slug === slug) : null

  if (slug && !system) {
    return <main className="ghl-page"><section className="ghl-empty"><a href="/">← Back to portfolio</a><h1>System not found.</h1></section></main>
  }

  if (system) {
    return (
      <main className="ghl-page">
        <header className="ghl-detail-nav">
          <a href="/" className="ghl-brand"><img src="/assets/connective-stack-logo.png" alt="ConnectiveStack" /></a>
          <div><a href="/ghl-systems">All GHL systems</a><a className="ghl-nav-cta" href={CALENDAR_URL} target="_blank" rel="noreferrer">Discuss a build <Arrow /></a></div>
        </header>

        <article className="ghl-detail">
          <div className="ghl-detail-kicker">GHL WORKFLOW / {system.number}</div>
          <h1>{system.title}</h1>
          <p className="ghl-detail-lead">{system.description}</p>

          <section className="ghl-flow-stage">
            <span>Workflow map</span>
            <Flow steps={system.flow} />
          </section>

          <div className="ghl-detail-grid">
            <section>
              <span className="ghl-label">Business objective</span>
              <h2>{system.outcome}</h2>
              <p>This is a capability example, not a claim that every business needs the same workflow. The exact triggers, timing, fields, messages, permissions, and integrations should be configured around the real sales or service process.</p>
            </section>
            <aside>
              <span className="ghl-label">Typical integrations</span>
              <div className="ghl-integration-list">{system.integrations.map(item => <span key={item}>{item}</span>)}</div>
            </aside>
          </div>

          <section className="ghl-build-notes">
            <div><small>01</small><strong>Capture</strong><span>Define the trigger, required fields, source, and contact record.</span></div>
            <div><small>02</small><strong>Route</strong><span>Apply qualification, ownership, pipeline, and notification logic.</span></div>
            <div><small>03</small><strong>Automate</strong><span>Build timed actions, follow-ups, status checks, and fallback paths.</span></div>
            <div><small>04</small><strong>Verify</strong><span>Test successful paths, edge cases, duplicate contacts, and handoff behavior.</span></div>
          </section>

          <section className="ghl-detail-cta">
            <div><span>Need something similar?</span><h2>Build the workflow around your actual process.</h2></div>
            <a href={CALENDAR_URL} target="_blank" rel="noreferrer">Discuss your setup <Arrow /></a>
          </section>
        </article>
      </main>
    )
  }

  return (
    <main className="ghl-page">
      <header className="ghl-detail-nav">
        <a href="/" className="ghl-brand"><img src="/assets/connective-stack-logo.png" alt="ConnectiveStack" /></a>
        <div><a href="/">Portfolio</a><a className="ghl-nav-cta" href={CALENDAR_URL} target="_blank" rel="noreferrer">Start a project <Arrow /></a></div>
      </header>

      <section className="ghl-index-hero">
        <span>GOHIGHLEVEL / CRM + AUTOMATION</span>
        <h1>Systems behind the website.</h1>
        <p>Examples of GoHighLevel workflows I can structure, connect, and deploy for lead capture, follow-up, booking, onboarding, pipeline management, and internal handoffs.</p>
      </section>

      <section className="ghl-system-grid">
        {ghlSystems.map(system => (
          <a className="ghl-system-card" href={'/ghl-systems?system=' + system.slug} key={system.slug}>
            <div className="ghl-card-top"><span>{system.number}</span><small>OPEN SYSTEM ↗</small></div>
            <h2>{system.title}</h2>
            <Flow steps={system.flow} />
            <p>{system.outcome}</p>
            <div className="ghl-card-tags">{system.integrations.slice(0, 3).map(item => <span key={item}>{item}</span>)}</div>
          </a>
        ))}
      </section>

      <section className="ghl-architecture">
        <div className="ghl-architecture-head">
          <span className="ghl-label">SYSTEM ARCHITECTURE</span>
          <h2>How the pieces work together.</h2>
          <p>The workflow itself is only one part of the job. These examples show the trigger, connected tools, automated path, edge cases, and fallback behavior I plan for when building a production-ready system.</p>
        </div>

        <div className="ghl-architecture-grid">
          {systemArchitectures.map(item => (
            <article className="ghl-architecture-card" key={item.number}>
              <div className="ghl-architecture-top">
                <span>{item.number}</span>
                <small>ARCHITECTURE MAP</small>
              </div>
              <h3>{item.title}</h3>
              <p className="ghl-architecture-problem">{item.problem}</p>
              <Flow steps={item.flow} />
              <div className="ghl-architecture-detail">
                <div>
                  <span className="ghl-mini-label">Connected tools</span>
                  <div className="ghl-card-tags">{item.tools.map(tool => <span key={tool}>{tool}</span>)}</div>
                </div>
                <div>
                  <span className="ghl-mini-label">What happens automatically</span>
                  <p>{item.automation}</p>
                </div>
                <div>
                  <span className="ghl-mini-label">Edge cases checked</span>
                  <ul>{item.edgeCases.map(edge => <li key={edge}>{edge}</li>)}</ul>
                </div>
                <div className="ghl-fallback">
                  <span className="ghl-mini-label">Fallback path</span>
                  <p>{item.fallback}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ghl-integrations">
        <span className="ghl-label">Connected tools</span>
        <h2>Built to work with the rest of the stack.</h2>
        <div>
          {['GoHighLevel', 'LC Phone / Twilio', 'Mailgun', 'Google Workspace', 'Google Calendar', 'Facebook Lead Ads', 'Stripe', 'Zapier', 'Make', 'Slack', 'Webhooks', 'VAPI', 'Chatbase', 'OpenAI'].map(item => <span key={item}>{item}</span>)}
        </div>
      </section>
    </main>
  )
}
