import React, { useEffect, useRef, useState } from 'react'
import { defaultQuickReplies, findKnowledgeAnswer } from './hvacKnowledge'
import './hvac-demo.css'

const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY || '58e493a2-aed3-4a98-a192-6baca6d23d64'
const VAPI_ASSISTANT_ID = 'a1db8e60-1a21-4fab-b5ef-94f7e5671359'
const VAPI_SDK_URL = 'https://cdn.jsdelivr.net/npm/@vapi-ai/web@2.7.0/+esm'

const Icon = ({ name }) => {
  const paths = {
    snow: <><path d="M12 3v18M5 7l14 10M19 7 5 17" /><path d="m9 5 3 2 3-2M9 19l3-2 3 2M5 11l3 1-1 3M19 13l-3-1 1-3" /></>,
    flame: <path d="M13.5 3.5c.7 4-2 4.8-1.1 7.2.7 1.8 2.4.2 2.7-1.1 2.6 2.3 3.9 4.2 3.9 6.5A7 7 0 0 1 5 16c0-3.7 2.5-6.2 5-8.7.1 2.4 1 3.1 1.8 2.4 1.2-1.1.3-3.9 1.7-6.2Z" />,
    air: <><path d="M4 8h9.5a2.5 2.5 0 1 0-2.3-3.5" /><path d="M3 12h15a2.5 2.5 0 1 1-2.3 3.5" /><path d="M5 16h5" /></>,
    gauge: <><path d="M4 17a8 8 0 1 1 16 0" /><path d="m12 13 4-4M7 17h10" /></>,
    chat: <path d="M5 5h14v10H9l-4 4V5Z" />,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    send: <><path d="m4 4 17 8-17 8 3-8-3-8Z" /><path d="M7 12h14" /></>,
    mic: <><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6" /></>,
    phoneOff: <><path d="m3 3 18 18" /><path d="M8.4 8.4 6.9 6.9c-.5-.5-1.3-.5-1.8-.1L3.8 8c-.6.5-.8 1.3-.5 2 2 5.1 5.9 9 11 11 .7.3 1.5.1 2-.5l1.2-1.3c.4-.5.4-1.3-.1-1.8l-1.8-1.8" /><path d="M13.2 5.2c2.8.5 5.1 2.8 5.6 5.6" /></>,
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>
}

const services = [
  ['snow', 'AC repair and installation', 'Diagnostics, repairs, replacements, mini-splits, and seasonal cooling care.'],
  ['flame', 'Heating and heat pumps', 'Furnaces, heat pumps, dual-fuel systems, safety checks, and heating tune-ups.'],
  ['air', 'Airflow and air quality', 'Ductwork, filtration, humidity control, thermostats, and comfort balancing.'],
]

const faqItems = [
  ['How quickly can someone come out?', 'Same-day and emergency availability depends on technician capacity and location. The assistant collects urgency, ZIP code, system type, and contact details so the request can be routed correctly.'],
  ['Should I repair or replace my system?', 'The decision should compare system age and condition, repair cost, frequency of breakdowns, comfort, efficiency, refrigerant, and expected remaining life. An inspection is required before making a recommendation.'],
  ['How often should HVAC maintenance be scheduled?', 'A common approach is a cooling check before summer and a heating check before winter. The equipment, usage, climate, and manufacturer requirements can affect the schedule.'],
  ['Do you provide prices through chat?', 'The demo shares diagnostic fees and explains the process. Repairs and replacements require system-specific evaluation before an exact quote is given.'],
  ['Can the assistant handle emergencies?', 'It identifies urgency and routes service requests, but life safety hazards are escalated to 911, the fire department, or the gas utility immediately.'],
]

function VoiceDemo() {
  const vapiRef = useRef(null)
  const timerRef = useRef(null)
  const completionTimerRef = useRef(null)
  const [status, setStatus] = useState('idle')
  const [speaking, setSpeaking] = useState(false)
  const [volume, setVolume] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [error, setError] = useState('')

  const stopTimer = () => {
    window.clearInterval(timerRef.current)
    timerRef.current = null
  }

  useEffect(() => () => {
    stopTimer()
    window.clearTimeout(completionTimerRef.current)
    vapiRef.current?.stop?.()
  }, [])

  const formatTime = value => `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`

  const initializeVapi = async () => {
    if (vapiRef.current) return vapiRef.current
    const vapiModule = await import(/* @vite-ignore */ VAPI_SDK_URL)
    const Vapi = vapiModule.default?.default || vapiModule.default
    if (typeof Vapi !== 'function') throw new Error('The voice client could not be initialized. Please refresh the page and try again.')
    const vapi = new Vapi(VAPI_PUBLIC_KEY)

    vapi.on('call-start', () => {
      window.clearTimeout(completionTimerRef.current)
      setStatus('live')
      setError('')
      setSeconds(0)
      stopTimer()
      timerRef.current = window.setInterval(() => setSeconds(value => value + 1), 1000)
    })
    vapi.on('call-end', () => {
      setStatus('completed')
      setSpeaking(false)
      setVolume(0)
      stopTimer()
      window.clearTimeout(completionTimerRef.current)
      completionTimerRef.current = window.setTimeout(() => setStatus('idle'), 4500)
    })
    vapi.on('speech-start', () => setSpeaking(true))
    vapi.on('speech-end', () => setSpeaking(false))
    vapi.on('volume-level', level => setVolume(Math.min(1, Math.max(0, Number(level) || 0))))
    vapi.on('error', event => {
      const rawMessage = event?.error?.message || event?.message || ''
      const message = /permission|notallowed|microphone/i.test(rawMessage)
        ? 'Microphone access is blocked. Allow microphone access in your browser, then try again.'
        : rawMessage || 'The voice demo could not connect. Please check microphone access and try again.'
      setError(message)
      setStatus('idle')
      setSpeaking(false)
      stopTimer()
    })

    vapiRef.current = vapi
    return vapi
  }

  const startCall = async () => {
    if (status === 'connecting' || status === 'live' || status === 'ending') return
    window.clearTimeout(completionTimerRef.current)
    setStatus('connecting')
    setError('')
    try {
      const vapi = await initializeVapi()
      await vapi.start(VAPI_ASSISTANT_ID)
    } catch (event) {
      const rawMessage = event?.message || ''
      setError(/permission|notallowed|microphone/i.test(rawMessage)
        ? 'Microphone access is blocked. Allow microphone access in your browser, then try again.'
        : rawMessage || 'The voice connection was not available. Please try again.')
      setStatus('idle')
    }
  }

  const endCall = () => {
    if (!vapiRef.current || status === 'idle') return
    setStatus('ending')
    vapiRef.current.stop()
  }

  const live = status === 'live' || status === 'ending'
  const statusLabel = status === 'connecting' ? 'Connecting securely' : status === 'ending' ? 'Ending call' : status === 'completed' ? 'Call completed. Thank you for trying the demo.' : speaking ? 'Northstar is speaking' : live ? 'Listening to you' : 'Ready for a demo call'

  return (
    <section className="hvac-voice-section" id="voice-demo">
      <div className="hvac-voice-copy">
        <span className="hvac-kicker">Live browser call</span>
        <h2>Talk to the AI front desk.</h2>
        <p>Start a real voice conversation with the Northstar receptionist. Ask about an HVAC issue, test an emergency scenario, or request a sample appointment.</p>
        <div className="voice-demo-disclosure">
          <Icon name="mic" />
          <div><strong>Portfolio demonstration</strong><span>Your browser will request microphone access. Use sample contact details only. No real service appointment or technician dispatch will be created.</span></div>
        </div>
        <div className="voice-prompt-list">
          <span>Try saying</span>
          <button type="button" onClick={startCall}>“My AC is blowing warm air.”</button>
          <button type="button" onClick={startCall}>“I smell gas near my furnace.”</button>
          <button type="button" onClick={startCall}>“Can I request an appointment?”</button>
        </div>
      </div>

      <div className={`voice-console ${live ? 'is-live' : ''} ${speaking ? 'is-speaking' : ''}`}>
        <div className="voice-console-top"><span>VAPI VOICE SESSION</span><i>{live ? '● LIVE' : '● STANDBY'}</i></div>
        <div className="voice-orbit" aria-hidden="true">
          <i className="voice-ring ring-a" /><i className="voice-ring ring-b" />
          <div className="voice-core"><Icon name="mic" /></div>
          <div className="voice-bars">
            {[0, 1, 2, 3, 4, 5, 6].map((item, index) => <b key={item} style={{ height: live ? `${18 + ((index * 17 + volume * 60) % 55)}px` : `${18 + (index % 3) * 5}px` }} />)}
          </div>
        </div>
        <div className="voice-status"><i className={live ? 'online' : ''} /><div><small>{statusLabel}</small><strong>{live ? formatTime(seconds) : 'Northstar Heating & Air'}</strong></div></div>
        {error && <div className="voice-error" role="alert">{error}</div>}
        <div className="voice-actions">
          {!live && status !== 'connecting' ? (
            <button type="button" className="voice-start" onClick={startCall}><Icon name="mic" /> {status === 'completed' ? 'Start another demo' : 'Start voice demo'}</button>
          ) : status === 'connecting' ? (
            <button type="button" className="voice-start" disabled><span className="voice-spinner" /> Connecting...</button>
          ) : (
            <button type="button" className="voice-end" onClick={endCall} disabled={status === 'ending'}><Icon name="phoneOff" /> {status === 'ending' ? 'Ending...' : 'End call'}</button>
          )}
        </div>
        <p className="voice-privacy">Audio is handled by Vapi for this live demonstration. Do not share sensitive or payment information.</p>
      </div>
    </section>
  )
}

function ChatAssistant({ open, onOpenChange, onLeadCreated, seededQuestion }) {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi, I’m Nova, the Northstar virtual front desk. I can answer HVAC questions, check service coverage, and help request an appointment. This is an interactive portfolio demo, so please use sample contact details.' },
  ])
  const [input, setInput] = useState('')
  const [replies, setReplies] = useState(defaultQuickReplies)
  const [flow, setFlow] = useState(null)
  const [thinking, setThinking] = useState(false)
  const scrollRef = useRef(null)
  const replyTimerRef = useRef(null)

  useEffect(() => {
    if (open) setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth' }), 30)
  }, [messages, open, thinking])

  useEffect(() => {
    if (seededQuestion?.text && open) handleMessage(seededQuestion.text)
    // seededQuestion is intentionally consumed only when a page action opens the assistant.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seededQuestion])

  useEffect(() => () => window.clearTimeout(replyTimerRef.current), [])

  const addBot = (text, nextReplies = defaultQuickReplies, urgent = false) => {
    setThinking(true)
    setReplies([])
    const responseDelay = 850 + Math.min(text.length * 4, 900) + Math.floor(Math.random() * 250)
    window.clearTimeout(replyTimerRef.current)
    replyTimerRef.current = window.setTimeout(() => {
      setMessages(current => [...current, { from: 'bot', text, urgent }])
      setReplies(nextReplies)
      setThinking(false)
    }, responseDelay)
  }

  const startBooking = service => {
    setFlow({ step: 'service', data: service ? { service } : {} })
    if (service) {
      addBot(`Got it. I’ll start a ${service} request. How urgent is the issue?`, ['Emergency or unsafe', 'No heating or cooling', 'System still runs', 'Planning or estimate'])
    } else {
      addBot('What type of help do you need?', ['AC repair', 'Heating repair', 'Maintenance', 'Replacement estimate', 'Indoor air quality'])
    }
  }

  const continueBooking = value => {
    const current = flow || { step: 'service', data: {} }
    if (current.step === 'service') {
      setFlow({ step: 'urgency', data: { ...current.data, service: current.data.service || value } })
      addBot('How urgent is the issue?', ['Emergency or unsafe', 'No heating or cooling', 'System still runs', 'Planning or estimate'])
      return
    }
    if (current.step === 'urgency') {
      if (value.toLowerCase().includes('emergency')) {
        addBot('If there is gas odor, a carbon monoxide alarm, fire, smoke, sparking, or anyone feels sick, leave immediately and call 911 from outside. Otherwise, enter a sample five-digit ZIP code so I can demonstrate service-area routing.', [], true)
      } else {
        addBot('Enter a sample five-digit ZIP code so I can demonstrate service-area routing.', [])
      }
      setFlow({ step: 'zip', data: { ...current.data, urgency: value } })
      return
    }
    if (current.step === 'zip') {
      const zip = value.match(/\b\d{5}\b/)?.[0]
      if (!zip) {
        addBot('Please enter a five-digit ZIP code for this demo.', [])
        return
      }
      setFlow({ step: 'name', data: { ...current.data, zip } })
      addBot('Thanks. I’ll include that ZIP for service-area verification. What sample name should I place on the request?', [])
      return
    }
    if (current.step === 'name') {
      setFlow({ step: 'contact', data: { ...current.data, name: value } })
      addBot('What sample phone number or email should the office use? Nothing entered here is transmitted or stored.', [])
      return
    }
    if (current.step === 'contact') {
      setFlow({ step: 'time', data: { ...current.data, contact: value } })
      addBot('Which service window do you prefer? This records a preference only and does not confirm an appointment.', ['Morning preferred', 'Afternoon preferred', 'Earliest available'])
      return
    }
    if (current.step === 'time') {
      const lead = { ...current.data, time: value, status: 'New service request' }
      onLeadCreated(lead)
      setFlow(null)
      addBot(`Demo request created for ${lead.name}. A real setup can create the contact, add an opportunity, notify dispatch, and trigger confirmation automatically. No information from this demo was sent or saved.`, ['View CRM handoff', 'Ask another question', 'Contact Connective Stack'])
    }
  }

  const handleMessage = raw => {
    const value = raw.trim()
    if (!value || thinking) return
    setMessages(current => [...current, { from: 'user', text: value }])
    setInput('')

    if (flow) {
      continueBooking(value)
      return
    }

    const lowered = value.toLowerCase()
    if (lowered.includes('contact connective')) {
      addBot('You can contact AJ at aj@connectivestack.com to discuss a website, front desk assistant, CRM connection, or automation build.', ['Ask another question'])
      return
    }
    if (lowered.includes('view crm')) {
      addBot('The live workflow panel on this page now shows the captured demo record and the actions a CRM automation could perform.', ['Ask another question', 'Book another service'])
      return
    }
    if (lowered.includes('book') || lowered.includes('request') || lowered.includes('join maintenance')) {
      const service = lowered.includes('ac') ? 'AC diagnostic' : lowered.includes('heating') ? 'heating service' : lowered.includes('tune') || lowered.includes('maintenance') ? 'maintenance visit' : lowered.includes('replacement') ? 'replacement estimate' : null
      startBooking(service)
      return
    }

    const result = findKnowledgeAnswer(value)
    addBot(result.answer, result.replies, result.urgent)
  }

  const submit = event => {
    event.preventDefault()
    handleMessage(input)
  }

  return (
    <>
      <button className={`hvac-chat-launcher ${open ? 'is-open' : ''}`} type="button" onClick={() => onOpenChange(!open)} aria-label={open ? 'Close HVAC assistant' : 'Open HVAC assistant'}>
        <Icon name={open ? 'close' : 'chat'} />
        {!open && <span>Try the AI front desk</span>}
      </button>
      {open && (
        <aside className="hvac-chat" aria-label="Northstar virtual front desk">
          <div className="hvac-chat-head">
            <div className="nova-avatar">N</div>
            <div><strong>Nova</strong><span><i /> Virtual front desk online</span></div>
            <button type="button" onClick={() => onOpenChange(false)} aria-label="Close chat"><Icon name="close" /></button>
          </div>
          <div className="hvac-chat-demo-note">Interactive demo. Use sample contact details only.</div>
          <div className="hvac-chat-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div className={`hvac-message ${message.from} ${message.urgent ? 'urgent' : ''}`} key={`${message.from}-${index}`}>
                {message.text}
              </div>
            ))}
            {thinking && (
              <div className="hvac-message bot hvac-thinking" role="status" aria-label="Nova is preparing a response">
                <span /><span /><span />
              </div>
            )}
            <div ref={scrollRef} />
          </div>
          {replies.length > 0 && (
            <div className="hvac-quick-replies">
              {replies.map(reply => <button type="button" key={reply} onClick={() => handleMessage(reply)}>{reply}</button>)}
            </div>
          )}
          <form className="hvac-chat-form" onSubmit={submit}>
            <input value={input} onChange={event => setInput(event.target.value)} placeholder={thinking ? 'Nova is preparing a response...' : 'Ask an HVAC question...'} aria-label="Message Nova" disabled={thinking} />
            <button type="submit" aria-label="Send message" disabled={thinking}><Icon name="send" /></button>
          </form>
        </aside>
      )}
    </>
  )
}

export default function HvacDemo() {
  const [chatOpen, setChatOpen] = useState(false)
  const [seededQuestion, setSeededQuestion] = useState(null)
  const [lead, setLead] = useState(null)
  const [openFaq, setOpenFaq] = useState(0)

  useEffect(() => {
    const previousTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const previousDescription = meta?.getAttribute('content')
    document.title = 'HVAC AI Receptionist Demo | Connective Stack'
    meta?.setAttribute('content', 'Try a live HVAC AI receptionist with browser voice, service FAQs, lead qualification, safety escalation, and appointment-request capture.')
    window.scrollTo(0, 0)
    return () => {
      document.title = previousTitle
      if (previousDescription) meta?.setAttribute('content', previousDescription)
    }
  }, [])

  const openWith = question => {
    setChatOpen(true)
    setSeededQuestion({ text: question, id: Date.now() })
  }

  return (
    <div className="hvac-page">
      <div className="demo-ribbon">
        <span>Interactive portfolio demo by Connective Stack</span>
        <a href="/">Return to AJ’s portfolio <Icon name="arrow" /></a>
      </div>

      <header className="hvac-header">
        <a className="hvac-brand" href="#home" aria-label="Northstar Heating and Air home">
          <span className="hvac-brand-mark"><Icon name="snow" /></span>
          <span><strong>NORTHSTAR</strong><small>HEATING &amp; AIR</small></span>
        </a>
        <nav>
          <a href="#services">Services</a>
          <a href="#how-it-works">AI Front Desk</a>
          <a href="#voice-demo">Voice Demo</a>
          <a href="#faq">FAQs</a>
        </nav>
        <button type="button" className="hvac-header-cta" onClick={() => openWith('Book service')}>Request service</button>
      </header>

      <main>
        <section className="hvac-hero" id="home">
          <div className="hvac-hero-copy">
            <div className="hvac-eyebrow"><i /> 24/7 request capture</div>
            <h1>Comfort restored.<br /><em>Without the runaround.</em></h1>
            <p>Fast, professional heating and cooling service with a virtual front desk ready to answer questions and capture requests around the clock.</p>
            <div className="hvac-hero-actions">
              <button type="button" className="hvac-button primary" onClick={() => openWith('My AC is not cooling')}>Get HVAC help <Icon name="arrow" /></button>
              <a className="hvac-button secondary" href="#voice-demo"><Icon name="mic" /> Talk to the AI</a>
            </div>
            <div className="hvac-trust-row">
              <span><Icon name="check" /> Licensed and insured demo profile</span>
              <span><Icon name="check" /> Upfront options</span>
              <span><Icon name="check" /> 24/7 request capture</span>
            </div>
          </div>
          <div className="hvac-hero-visual" aria-label="HVAC technician inspecting a home thermostat">
            <div className="hvac-hero-photo">
              <img src="/assets/hvac-hero-technician.webp" alt="HVAC technician inspecting a smart thermostat in a modern home" />
              <div className="hvac-photo-shade" />
              <div className="hvac-photo-label"><span>ON-SITE EXPERTISE</span><strong>Diagnostics built around the whole system</strong></div>
            </div>
            <div className="comfort-card compact">
              <div className="comfort-top"><span>HOME COMFORT</span><i>● SYSTEM ONLINE</i></div>
              <div className="comfort-compact-row"><div><small>INDOOR</small><strong>72<sup>°</sup></strong></div><div><span>Humidity</span><b>44%</b><span>Air quality</span><b>Good</b></div></div>
            </div>
            <div className="dispatch-card"><span className="dispatch-icon"><Icon name="gauge" /></span><div><small>Service preference</small><strong>Captured for confirmation</strong></div></div>
            <div className="response-card"><i /><span><small>Front desk</small><strong>Replies in seconds</strong></span></div>
          </div>
        </section>

        <section className="hvac-proof-strip">
          <div><strong>24/7</strong><span>Request capture</span></div>
          <div><strong>60+</strong><span>HVAC intents covered</span></div>
          <div><strong>5 steps</strong><span>To a qualified request</span></div>
          <div><strong>1 system</strong><span>Website to CRM</span></div>
        </section>

        <section className="hvac-section" id="services">
          <div className="hvac-section-head">
            <div><span>Complete comfort service</span><h2>One team for the system behind your walls.</h2></div>
            <p>Built like a real service-business website, with clear paths for urgent repairs, planned projects, maintenance, and questions.</p>
          </div>
          <div className="hvac-service-showcase" aria-label="HVAC service photography">
            <figure className="service-photo service-photo-large">
              <img src="/assets/hvac-ac-service.webp" alt="HVAC technician diagnosing an outdoor air conditioning condenser" loading="lazy" />
              <figcaption><span>Cooling systems</span><strong>Detailed diagnostics before recommendations</strong></figcaption>
            </figure>
            <figure className="service-photo">
              <img src="/assets/hvac-furnace-service.webp" alt="HVAC technician maintaining a residential furnace" loading="lazy" />
              <figcaption><span>Heating systems</span><strong>Maintenance that protects comfort and reliability</strong></figcaption>
            </figure>
            <div className="service-visual-note">
              <span>WHAT A REAL BUILD CAN SHOW</span>
              <strong>People, equipment, process, and proof.</strong>
              <p>Custom photography and service-specific visuals help visitors understand the work before they ever call.</p>
              <div><i /> Repair <i /> Maintenance <i /> Installation</div>
            </div>
          </div>
          <div className="hvac-service-grid">
            {services.map(([icon, title, copy]) => (
              <article key={title}>
                <span className="service-icon"><Icon name={icon} /></span>
                <h3>{title}</h3><p>{copy}</p>
                <button type="button" onClick={() => openWith(`Tell me about ${title}`)}>Ask about this service <Icon name="arrow" /></button>
              </article>
            ))}
          </div>
        </section>

        <section className="hvac-issues">
          <div><span>Not sure where to start?</span><h2>Tell the front desk what is happening.</h2></div>
          <div className="issue-buttons">
            {['AC is blowing warm air', 'System is leaking water', 'Furnace is not heating', 'Airflow is weak', 'System makes a loud noise', 'I need a replacement estimate'].map(issue => (
              <button type="button" key={issue} onClick={() => openWith(issue)}>{issue}<Icon name="arrow" /></button>
            ))}
          </div>
        </section>

        <section className="hvac-ai-section" id="how-it-works">
          <div className="hvac-ai-copy">
            <span className="hvac-kicker">The live front desk</span>
            <h2>Answers the routine. Escalates the important.</h2>
            <p>The assistant uses a structured HVAC knowledge base to answer common questions, recognize safety concerns, qualify the request, and prepare a clean handoff.</p>
            <ul>
              <li><Icon name="check" /> Service, pricing, coverage, and policy answers</li>
              <li><Icon name="check" /> Repair, maintenance, and replacement guidance</li>
              <li><Icon name="check" /> Immediate safety escalation for hazardous situations</li>
              <li><Icon name="check" /> Contact, urgency, ZIP, and scheduling capture</li>
            </ul>
            <button type="button" className="hvac-button light" onClick={() => openWith('What can the assistant answer?')}>Test the assistant <Icon name="arrow" /></button>
          </div>
          <div className="workflow-console">
            <div className="workflow-top"><span>LIVE WORKFLOW</span><i>{lead ? '● LEAD ROUTED' : '● WAITING FOR DEMO LEAD'}</i></div>
            <div className="workflow-nodes">
              {['Website chat', 'Safety check', 'Lead qualification', 'CRM record', 'Dispatch follow-up'].map((item, index) => (
                <div className={lead || index === 0 ? 'active' : ''} key={item}><span>0{index + 1}</span><strong>{item}</strong><small>{lead ? 'Complete' : index === 0 ? 'Online' : 'Ready'}</small></div>
              ))}
            </div>
            <div className={`lead-record ${lead ? 'has-lead' : ''}`}>
              <div><span>DEMO OPPORTUNITY</span><b>{lead ? 'NEW' : 'EMPTY'}</b></div>
              {lead ? (
                <dl>
                  <div><dt>Customer</dt><dd>{lead.name}</dd></div>
                  <div><dt>Service</dt><dd>{lead.service}</dd></div>
                  <div><dt>Urgency</dt><dd>{lead.urgency}</dd></div>
                  <div><dt>ZIP</dt><dd>{lead.zip}</dd></div>
                  <div><dt>Window</dt><dd>{lead.time}</dd></div>
                </dl>
              ) : <p>Complete the chat booking flow to watch a structured request appear here.</p>}
            </div>
          </div>
        </section>

        <VoiceDemo />

        <section className="hvac-faq hvac-section" id="faq">
          <div className="hvac-section-head">
            <div><span>Common questions</span><h2>Useful answers before the visit.</h2></div>
            <p>The page and assistant work together so customers can move forward without waiting for the office to answer every routine question.</p>
          </div>
          <div className="hvac-faq-list">
            {faqItems.map(([question, answer], index) => (
              <article className={openFaq === index ? 'open' : ''} key={question}>
                <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><i>{openFaq === index ? '−' : '+'}</i></button>
                {openFaq === index && <p>{answer}</p>}
              </article>
            ))}
          </div>
        </section>

        <section className="hvac-demo-cta">
          <div><span>Need a system like this?</span><h2>Turn your website into a working front desk.</h2></div>
          <div><p>This page is a fictional demonstration built by AJ Saliba at Connective Stack. The same structure can be customized around a real company’s services, policies, service area, CRM, and scheduling process.</p><a href="mailto:aj@connectivestack.com?subject=HVAC%20front%20desk%20project" className="hvac-button dark">Build one for my business <Icon name="arrow" /></a></div>
        </section>
      </main>

      <footer className="hvac-footer">
        <div className="hvac-brand"><span className="hvac-brand-mark"><Icon name="snow" /></span><span><strong>NORTHSTAR</strong><small>FICTIONAL HVAC DEMO</small></span></div>
        <p>Created by <a href="/">Connective Stack</a>. No submitted demo data is transmitted or stored.</p>
      </footer>

      <ChatAssistant open={chatOpen} onOpenChange={setChatOpen} onLeadCreated={setLead} seededQuestion={seededQuestion} />
    </div>
  )
}
