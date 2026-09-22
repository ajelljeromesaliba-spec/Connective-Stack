import React, { useEffect, useMemo, useState } from 'react'
import './real-estate-demo.css'

const Icon = ({ name }) => {
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m15 8 4 4-4 4" /></>,
    bed: <><path d="M3 11v7M21 11v7M3 15h18" /><path d="M5 15V9h5a3 3 0 0 1 3 3v3M13 12h5a3 3 0 0 1 3 3" /></>,
    bath: <><path d="M4 13h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2ZM7 13V6a3 3 0 0 1 6 0" /><path d="M11 8h4" /></>,
    area: <><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    spark: <><path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" /><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" /></>,
    close: <><path d="m6 6 12 12M18 6 6 18" /></>,
    chat: <path d="M4 5h16v12H8l-4 4V5Z" />,
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>
}

const AsterRowMark = ({ compact = false }) => (
  <span className={`re-brand-mark ${compact ? 'compact' : ''}`} aria-hidden="true">
    <svg viewBox="0 0 64 64">
      <path className="re-mark-frame" d="M12 53V27C12 14 20.8 6 32 6s20 8 20 21v26" />
      <path className="re-mark-a" d="m19 47 12-29 12 29M24 36h15" />
      <path className="re-mark-r" d="M32 18v29M32 20h5.5c7 0 9.5 3.2 9.5 7.5S44 35 37.5 35H32m6 0 10 12" />
      <path className="re-mark-star" d="m51 8 1.4 4.1 4.1 1.4-4.1 1.4L51 19l-1.4-4.1-4.1-1.4 4.1-1.4L51 8Z" />
      <path className="re-mark-base" d="M8 53h48" />
    </svg>
  </span>
)

const listings = [
  { id: 1, city: 'Beverly Hills', state: 'CA', neighborhood: 'Trousdale Estates', price: 4895000, beds: 4, baths: 5, sqft: '4,820', category: 'Luxury', type: 'City', image: '/assets/realestate-hero.svg', video: '/assets/realestate-hero-flow-v1.mp4', broker: 'Elena Marlow', initials: 'EM', specialty: 'Luxury residences' },
  { id: 2, city: 'Malibu', state: 'CA', neighborhood: 'Carbon Beach', price: 7250000, beds: 5, baths: 6, sqft: '5,640', category: 'Luxury', type: 'Coastal', image: '/assets/realestate-malibu.svg', video: '/assets/realestate-malibu-flow-v1.mp4', broker: 'Marcus Cole', initials: 'MC', specialty: 'Coastal properties' },
  { id: 3, city: 'Scottsdale', state: 'AZ', neighborhood: 'Paradise Valley', price: 3180000, beds: 4, baths: 4.5, sqft: '4,310', category: 'Premium', type: 'Desert', image: '/assets/realestate-scottsdale.svg', video: '/assets/realestate-scottsdale-flow-v1.mp4', broker: 'Sofia Reyes', initials: 'SR', specialty: 'Relocation and Arizona homes' },
  { id: 4, city: 'Austin', state: 'TX', neighborhood: 'The Grove Residences', price: 1285000, beds: 2, baths: 2.5, sqft: '1,780', category: 'Premium', type: 'Urban', image: '/assets/realestate-austin-premium.webp', video: '/assets/realestate-austin-flow-v1.mp4', broker: 'Jordan Lee', initials: 'JL', specialty: 'Investment properties' },
  { id: 5, city: 'Phoenix', state: 'AZ', neighborhood: 'Arcadia Townhomes', price: 535000, beds: 3, baths: 2.5, sqft: '1,690', category: 'Starter', type: 'Townhome', image: '/assets/realestate-phoenix-starter.webp', video: '/assets/realestate-phoenix-flow-v1.mp4', broker: 'Sofia Reyes', initials: 'SR', specialty: 'First-time buyers and relocation' },
  { id: 6, city: 'Mesa', state: 'AZ', neighborhood: 'Desert Willow', price: 415000, beds: 3, baths: 2, sqft: '1,560', category: 'Affordable', type: 'Single-family', image: '/assets/realestate-mesa-affordable.webp', video: '/assets/realestate-mesa-flow-v1.mp4', broker: 'Sofia Reyes', initials: 'SR', specialty: 'Affordable Arizona homes' },
]

const brokers = [
  { initials: 'EM', name: 'Elena Marlow', role: 'Luxury Residential', market: 'Beverly Hills · Los Angeles', stats: '96% list-to-close', formNote: 'Luxury buyer or seller representation', formType: 'luxury', portrait: 'portrait-elena' },
  { initials: 'MC', name: 'Marcus Cole', role: 'Coastal Specialist', market: 'Malibu · Pacific Palisades', stats: '$48M sold this year', formNote: 'Coastal and waterfront property search', formType: 'coastal', portrait: 'portrait-marcus' },
  { initials: 'SR', name: 'Sofia Reyes', role: 'Relocation Advisor', market: 'Scottsdale · Phoenix · Mesa', stats: '4.9 client rating', formNote: 'Arizona relocation and first-home planning', formType: 'relocation', portrait: 'portrait-sofia' },
  { initials: 'JL', name: 'Jordan Lee', role: 'Investment Properties', market: 'Austin · Greater Los Angeles', stats: '12 years advising', formNote: 'Investment strategy and acquisition', formType: 'investment', portrait: 'portrait-jordan' },
]

const categoryGuide = [
  { name: 'Luxury', range: '$3M+', note: 'Private estates and signature residences' },
  { name: 'Premium', range: '$1M–$3M', note: 'High-design homes in leading markets' },
  { name: 'Starter', range: '$500K–$1M', note: 'First-home and move-up opportunities' },
  { name: 'Affordable', range: 'Under $500K', note: 'Value-focused homes with clear costs' },
]

const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)

function MortgageCalculator() {
  const [price, setPrice] = useState(3180000)
  const [down, setDown] = useState(25)
  const [rate, setRate] = useState(6.5)
  const monthly = useMemo(() => {
    const principal = price * (1 - down / 100)
    const r = rate / 100 / 12
    const n = 360
    return r ? principal * r * (1 + r) ** n / ((1 + r) ** n - 1) : principal / n
  }, [price, down, rate])
  return (
    <div className="re-calculator">
      <div className="re-calc-fields">
        <label>Property price<input type="number" value={price} onChange={e => setPrice(Math.max(0, Number(e.target.value)))} /></label>
        <label>Down payment<select value={down} onChange={e => setDown(Number(e.target.value))}><option value="20">20%</option><option value="25">25%</option><option value="30">30%</option><option value="40">40%</option></select></label>
        <label>Interest rate<input type="number" step=".1" value={rate} onChange={e => setRate(Math.max(0, Number(e.target.value)))} /></label>
      </div>
      <div className="re-calc-result">
        <span>ESTIMATED MONTHLY PRINCIPAL + INTEREST</span>
        <strong>{money(monthly)}<small>/mo</small></strong>
        <div><i style={{ width: `${down}%` }} /></div>
        <p>{money(price * down / 100)} down · 30-year fixed example</p>
        <small>Illustration only. Taxes, insurance, HOA fees, and lender requirements are not included.</small>
      </div>
    </div>
  )
}

function Matchmaker({ onTour }) {
  const [location, setLocation] = useState('Malibu')
  const [budget, setBudget] = useState('$3M+')
  const [goal, setGoal] = useState('Primary residence')
  const match = useMemo(() => {
    if (budget === 'Under $500K') return listings[5]
    if (budget === '$500K–$1M') return listings[4]
    if (budget === '$1M–$3M') return location === 'Austin' ? listings[3] : listings[2]
    if (location === 'Malibu') return listings[1]
    if (location === 'Scottsdale' || location === 'Phoenix') return listings[2]
    return listings[0]
  }, [location, budget])
  return (
    <div className="re-match-card">
      <div className="re-match-controls">
        <span>SMART PROPERTY MATCH</span>
        <h3>Tell us what moving well looks like.</h3>
        <label>Preferred market<select value={location} onChange={e => setLocation(e.target.value)}><option>Malibu</option><option>Beverly Hills</option><option>Scottsdale</option><option>Austin</option><option>Phoenix</option></select></label>
        <div className="re-choice-group"><small>Budget</small>{['Under $500K', '$500K–$1M', '$1M–$3M', '$3M+'].map(item => <button type="button" className={budget === item ? 'active' : ''} onClick={() => setBudget(item)} key={item}>{item}</button>)}</div>
        <div className="re-choice-group"><small>Goal</small>{['Primary residence', 'Second home', 'Investment'].map(item => <button className={goal === item ? 'active' : ''} onClick={() => setGoal(item)} key={item}>{item}</button>)}</div>
      </div>
      <div className="re-match-result">
        <span><Icon name="spark" /> BEST CURRENT MATCH</span>
        <img src={match.image} alt={`${match.neighborhood} property`} />
        <div>
          <small>{match.neighborhood}</small>
          <strong>{money(match.price)}</strong>
          <p>{match.beds} beds · {match.baths} baths · {match.sqft} sq ft</p>
        </div>
        <div className="re-routed"><b>{match.initials}</b><p>Routed to <strong>{match.broker}</strong><span>{match.specialty}</span></p><i>AVAILABLE</i></div>
        <button onClick={() => onTour(match)}>Request a private tour <Icon name="arrow" /></button>
      </div>
    </div>
  )
}

const CategoryField = ({ category }) => {
  if (category === 'Luxury') return <label>Representation need<select><option>Buying</option><option>Selling</option><option>Buying and selling</option></select></label>
  if (category === 'Premium') return <label>Financing stage<select><option>Pre-approved</option><option>Speaking with a lender</option><option>Cash purchase</option><option>Not started</option></select></label>
  if (category === 'Starter') return <label>First-time buyer?<select><option>Yes</option><option>No</option><option>Not sure yet</option></select></label>
  return <label>Monthly payment target<select><option>Under $2,500</option><option>$2,500–$3,500</option><option>$3,500–$4,500</option><option>Still estimating</option></select></label>
}

function TourModal({ property, onClose }) {
  const [sent, setSent] = useState(false)
  if (!property) return null
  return (
    <div className="re-modal-overlay" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <div className="re-modal">
        <button className="re-modal-close" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
        {sent ? <div className="re-confirmation"><span><Icon name="check" /></span><small>REQUEST RECEIVED</small><h2>Your private tour is being coordinated.</h2><p>{property.broker} is the best-fit broker for {property.neighborhood}. In a real setup, the lead would now enter the CRM and trigger email and SMS confirmation.</p><button onClick={onClose}>Return to listings</button></div> : <>
          <span className="re-modal-kicker">PRIVATE SHOWING</span>
          <h2>Tour {property.neighborhood}</h2>
          <p>Choose a preferred time. This portfolio demo uses sample details only and does not submit information externally.</p>
          <div className="re-form-route"><b>{property.initials}</b><div><small>ASSIGNED ADVISOR</small><strong>{property.broker}</strong><span>{property.category} · {property.specialty}</span></div></div>
          <form onSubmit={e => { e.preventDefault(); setSent(true) }}>
            <label>Full name<input required placeholder="Sample buyer" /></label>
            <label>Email<input required type="email" placeholder="buyer@example.com" /></label>
            <label>Preferred date<input required type="date" /></label>
            <label>Buying timeline<select><option>Within 30 days</option><option>1–3 months</option><option>3–6 months</option><option>Researching</option></select></label>
            <CategoryField category={property.category} />
            <button type="submit">Request private tour <Icon name="arrow" /></button>
          </form>
        </>}
      </div>
    </div>
  )
}

function BrokerModal({ broker, onClose }) {
  const [sent, setSent] = useState(false)
  if (!broker) return null
  const customFields = {
    luxury: <><label>Representation need<select><option>Buying</option><option>Selling</option><option>Buying and selling</option></select></label><label>Target price range<select><option>$3M–$5M</option><option>$5M–$10M</option><option>$10M+</option></select></label><label>Preferred market<input placeholder="Beverly Hills, Bel Air, Los Angeles" /></label><label>Timeline<select><option>Within 30 days</option><option>1–3 months</option><option>3–6 months</option><option>Exploring privately</option></select></label></>,
    coastal: <><label>Property use<select><option>Primary residence</option><option>Second home</option><option>Investment</option></select></label><label>Preferred coastal area<input placeholder="Malibu, Pacific Palisades" /></label><label>Waterfront requirement<select><option>Direct waterfront</option><option>Ocean view</option><option>Near the coast</option><option>Flexible</option></select></label><label>Tour timing<select><option>This week</option><option>Within 30 days</option><option>1–3 months</option><option>Researching</option></select></label></>,
    relocation: <><label>Moving from<input placeholder="Current city and state" /></label><label>Move-by timeframe<select><option>Within 30 days</option><option>1–3 months</option><option>3–6 months</option><option>Flexible</option></select></label><label>Preferred Arizona area<select><option>Scottsdale</option><option>Phoenix</option><option>Mesa</option><option>Help me choose</option></select></label><label>Home category<select><option>Premium</option><option>Starter</option><option>Affordable</option></select></label></>,
    investment: <><label>Investment goal<select><option>Long-term rental</option><option>Short-term rental</option><option>Appreciation</option><option>Portfolio diversification</option></select></label><label>Target market<select><option>Austin</option><option>Los Angeles</option><option>Open to recommendations</option></select></label><label>Acquisition budget<select><option>Under $1M</option><option>$1M–$3M</option><option>$3M+</option></select></label><label>Target hold period<select><option>1–3 years</option><option>3–7 years</option><option>7+ years</option></select></label></>,
  }
  return <div className="re-modal-overlay" onMouseDown={e => e.target === e.currentTarget && onClose()}>
    <div className="re-modal">
      <button className="re-modal-close" onClick={onClose} aria-label="Close"><Icon name="close" /></button>
      {sent ? <div className="re-confirmation"><span><Icon name="check" /></span><small>CONSULTATION ROUTED</small><h2>Your request is ready for {broker.name}.</h2><p>The form captured the details relevant to {broker.role.toLowerCase()}. In a live setup, the correct pipeline, calendar, and follow-up sequence would now start automatically.</p><button onClick={onClose}>Return to advisors</button></div> : <>
        <span className="re-modal-kicker">PERSONALIZED ADVISOR INTAKE</span>
        <h2>Meet {broker.name}</h2>
        <p>{broker.formNote}. The questions below are tailored to this advisor, so the first conversation starts with the right context.</p>
        <div className="re-form-route"><b>{broker.initials}</b><div><small>{broker.role}</small><strong>{broker.name}</strong><span>{broker.market}</span></div></div>
        <form onSubmit={e => { e.preventDefault(); setSent(true) }}>
          <label>Full name<input required placeholder="Sample client" /></label>
          <label>Email<input required type="email" placeholder="client@example.com" /></label>
          {customFields[broker.formType]}
          <button type="submit">Send to {broker.name.split(' ')[0]} <Icon name="arrow" /></button>
        </form>
      </>}
    </div>
  </div>
}

const visitorPaths = {
  Buyer: {
    eyebrow: 'FIND THE RIGHT HOME',
    title: 'Start a private property search.',
    copy: 'Share your market, budget, and timeline. The system will match you with the best available advisor.',
    fields: <><label>Preferred market<input placeholder="City, neighborhood, or state" /></label><label>Budget range<select><option>Under $500K</option><option>$500K–$1M</option><option>$1M–$3M</option><option>$3M+</option></select></label><label>Buying timeline<select><option>Within 30 days</option><option>1–3 months</option><option>3–6 months</option><option>Researching</option></select></label><label>Financing stage<select><option>Pre-approved</option><option>Speaking with a lender</option><option>Cash purchase</option><option>Not started</option></select></label></>,
  },
  Seller: {
    eyebrow: 'PREPARE TO SELL',
    title: 'Request a private home review.',
    copy: 'Tell us about the property and your preferred timing. A listing advisor can prepare the next steps.',
    fields: <><label>Property location<input placeholder="City and state" /></label><label>Property type<select><option>Single-family home</option><option>Condo or townhome</option><option>Luxury estate</option><option>Investment property</option></select></label><label>Selling timeframe<select><option>As soon as possible</option><option>1–3 months</option><option>3–6 months</option><option>Exploring value</option></select></label><label>Current occupancy<select><option>Owner occupied</option><option>Tenant occupied</option><option>Vacant</option></select></label></>,
  },
  Broker: {
    eyebrow: 'BROKER COLLABORATION',
    title: 'Connect with the brokerage team.',
    copy: 'Built for referral partners, cooperating brokers, and agents interested in the platform or network.',
    fields: <><label>Brokerage name<input placeholder="Your brokerage" /></label><label>Licensed state<input placeholder="CA, AZ, TX, or other" /></label><label>Collaboration goal<select><option>Buyer referral</option><option>Seller referral</option><option>Co-broker opportunity</option><option>Join the network</option></select></label><label>Primary market<input placeholder="Market or territory" /></label></>,
  },
  Investor: {
    eyebrow: 'INVESTMENT SEARCH',
    title: 'Build an acquisition brief.',
    copy: 'Define the return strategy, target market, and capital range for a more useful first conversation.',
    fields: <><label>Investment goal<select><option>Long-term rental</option><option>Short-term rental</option><option>Appreciation</option><option>Portfolio diversification</option></select></label><label>Target market<input placeholder="Austin, Los Angeles, or open" /></label><label>Acquisition budget<select><option>Under $1M</option><option>$1M–$3M</option><option>$3M+</option></select></label><label>Purchase timeline<select><option>Within 30 days</option><option>1–3 months</option><option>3–6 months</option><option>Researching</option></select></label></>,
  },
}

function VisitorPathway() {
  const [role, setRole] = useState('Buyer')
  const [sent, setSent] = useState(false)
  const path = visitorPaths[role]
  const chooseRole = nextRole => { setRole(nextRole); setSent(false) }
  return <section className="re-visitor-path re-section re-reveal" id="start">
    <div className="re-heading"><div><span>CHOOSE YOUR PATH</span><h2>One website. A relevant next step for every visitor.</h2></div><p>Instead of sending everyone to the same contact form, each path collects the information needed for that person’s goal.</p></div>
    <div className="re-role-tabs" role="tablist" aria-label="Visitor type">{Object.keys(visitorPaths).map(item => <button type="button" role="tab" aria-selected={role === item} className={role === item ? 'active' : ''} onClick={() => chooseRole(item)} key={item}><small>I am a</small><strong>{item}</strong></button>)}</div>
    <div className="re-role-panel">
      <div className="re-role-copy"><span>{path.eyebrow}</span><h3>{path.title}</h3><p>{path.copy}</p><div><b>01</b><span>Qualified intake</span></div><div><b>02</b><span>Correct advisor route</span></div><div><b>03</b><span>CRM-ready follow-up</span></div></div>
      {sent ? <div className="re-role-confirm"><span><Icon name="check" /></span><small>{role.toUpperCase()} PATH COMPLETE</small><h3>The inquiry is ready to route.</h3><p>This demo does not submit data externally. In a live build, the visitor would now enter the correct pipeline and follow-up sequence.</p><button type="button" onClick={() => setSent(false)}>Start another inquiry</button></div> : <form onSubmit={e => { e.preventDefault(); setSent(true) }}>
        <div className="re-role-form-head"><small>PERSONALIZED {role.toUpperCase()} INTAKE</small><strong>Tell us what you need.</strong></div>
        <label>Full name<input required placeholder="Sample visitor" /></label><label>Email<input required type="email" placeholder="visitor@example.com" /></label>
        {path.fields}
        <button type="submit">Continue as {role === 'Investor' ? 'an' : 'a'} {role} <Icon name="arrow" /></button>
      </form>}
    </div>
  </section>
}

function Concierge() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Welcome to Aster & Row. Are you buying, selling, or exploring an investment?' }])
  const reply = question => {
    const responses = {
      'Find a property': 'I can match you by market, budget, property style, and timeline. Malibu currently has a strong coastal listing at $7.25M.',
      'Meet a broker': 'I’ll route you by market and specialty. Elena covers Beverly Hills, Marcus handles Malibu, Sofia leads Scottsdale, and Jordan advises investors.',
      'Value my home': 'A broker can prepare a private market review using recent comparable sales, condition, and current demand. No public estimate is treated as a final valuation.',
    }
    setMessages(items => [...items, { from: 'user', text: question }, { from: 'bot', text: responses[question] }])
  }
  return <>
    <button className="re-chat-launcher" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'chat'} /><span>{open ? 'Close' : 'Ask the concierge'}</span></button>
    {open && <aside className="re-chat">
      <div className="re-chat-head"><AsterRowMark compact /><div><strong>Aster Concierge</strong><span><i /> Online · Demo experience</span></div><button onClick={() => setOpen(false)}><Icon name="close" /></button></div>
      <div className="re-chat-messages">{messages.map((item, i) => <p className={item.from} key={i}>{item.text}</p>)}</div>
      <div className="re-chat-options">{['Find a property', 'Meet a broker', 'Value my home'].map(item => <button onClick={() => reply(item)} key={item}>{item}</button>)}</div>
    </aside>}
  </>
}

export default function RealEstateDemo() {
  const [filter, setFilter] = useState('All Homes')
  const [saved, setSaved] = useState([])
  const [tour, setTour] = useState(null)
  const [advisor, setAdvisor] = useState(null)
  const shown = filter === 'All Homes' ? listings : listings.filter(item => item.category === filter)

  useEffect(() => {
    document.title = 'Luxury Real Estate Brokerage Demo | Connective Stack'
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: .08 })
    document.querySelectorAll('.re-reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const videos = document.querySelectorAll('.re-listing-image video')
    const playbackObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.play().catch(() => {})
      else entry.target.pause()
    }), { threshold: .2 })
    videos.forEach(video => playbackObserver.observe(video))
    return () => playbackObserver.disconnect()
  }, [filter])

  return (
    <div className="re-page">
      <div className="re-demo-bar"><a href="/">← Connective Stack portfolio</a><span>Interactive concept · Fictional brokerage</span><b>{saved.length} saved</b></div>
      <header className="re-header">
        <a href="#home" className="re-brand"><AsterRowMark /><span><strong>ASTER &amp; ROW</strong><small>PRIVATE REAL ESTATE</small></span></a>
        <nav><a href="#start">Get started</a><a href="#properties">Properties</a><a href="#match">Private search</a><a href="#advisors">Advisors</a><a href="#affordability">Affordability</a></nav>
        <button onClick={() => setAdvisor(brokers[0])}>Schedule a consultation</button>
      </header>
      <main>
        <section className="re-hero re-reveal" id="home">
          <video className="re-hero-image" autoPlay muted loop playsInline poster="/assets/realestate-hero.svg" aria-label="Cinematic preview of the featured Beverly Hills residence"><source src="/assets/realestate-hero-flow-v1.mp4" type="video/mp4" /></video>
          <div className="re-hero-shade" />
          <div className="re-hero-copy"><span>CURATED HOMES · TRUSTED ADVISORS</span><h1>Exceptional property.<br /><em>Personal representation.</em></h1><p>One private search, intelligently routed to the broker who knows your market, property type, and priorities.</p><div><a href="#properties">Explore residences <Icon name="arrow" /></a><button onClick={() => setTour(listings[0])}>Request a private search</button></div></div>
          <div className="re-market-card"><small>LIVE MARKET PULSE</small><strong>14</strong><span>qualified opportunities</span><div><i /> Los Angeles <b>7</b></div><div><i /> Malibu <b>4</b></div><div><i /> Scottsdale <b>3</b></div></div>
          <div className="re-hero-caption"><span>FEATURED RESIDENCE</span><strong>Trousdale Estates · Beverly Hills</strong><small>$4,895,000</small></div>
        </section>

        <section className="re-proof"><div><strong>$186M</strong><span>Career sales</span></div><div><strong>4</strong><span>Specialist advisors</span></div><div><strong>96%</strong><span>List-to-close ratio</span></div><div><strong>18 min</strong><span>Average lead response</span></div></section>

        <VisitorPathway />

        <section className="re-properties re-section re-reveal" id="properties">
          <div className="re-heading"><div><span>PRIVATE COLLECTION</span><h2>Residences selected with intention.</h2></div><p>Filter the portfolio, save a property, and request a private viewing. Every inquiry is matched to the right advisor.</p></div>
          <div className="re-category-guide">{categoryGuide.map(item => <button type="button" className={filter === item.name ? 'active' : ''} onClick={() => setFilter(item.name)} key={item.name}><span>{item.name}</span><strong>{item.range}</strong><small>{item.note}</small></button>)}</div>
          <div className="re-filters">{['All Homes', 'Luxury', 'Premium', 'Starter', 'Affordable'].map(item => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
          <div className="re-listings">{shown.map(item => <article key={item.id}>
            <div className="re-listing-image"><video autoPlay muted loop playsInline preload="metadata" poster={item.image} aria-label={`Video preview of ${item.neighborhood}`}><source src={item.video} type="video/mp4" /></video><div className="re-video-status"><i /><span>LIVE PREVIEW</span></div><div className="re-listing-badges"><span>{item.category}</span><small>{item.type}</small></div><button className={saved.includes(item.id) ? 'saved' : ''} onClick={() => setSaved(ids => ids.includes(item.id) ? ids.filter(id => id !== item.id) : [...ids, item.id])} aria-label="Save property"><Icon name="heart" /></button></div>
            <div className="re-listing-copy"><small><Icon name="pin" /> {item.city}, {item.state}</small><h3>{item.neighborhood}</h3><strong>{money(item.price)}</strong><div><span><Icon name="bed" /> {item.beds} beds</span><span><Icon name="bath" /> {item.baths} baths</span><span><Icon name="area" /> {item.sqft} sq ft</span></div><button onClick={() => setTour(item)}>View private details <Icon name="arrow" /></button></div>
          </article>)}</div>
        </section>

        <section className="re-match re-section re-reveal" id="match">
          <div className="re-heading light"><div><span>BROKERAGE INTELLIGENCE</span><h2>A search that knows who should answer.</h2></div><p>Buyer criteria, market, and intent determine both the property recommendation and the specialist broker assigned to the conversation.</p></div>
          <Matchmaker onTour={setTour} />
        </section>

        <section className="re-advisors re-section re-reveal" id="advisors">
          <div className="re-heading"><div><span>ADVISORY TEAM</span><h2>Multiple brokers. One seamless standard.</h2></div><p>Each lead is routed by geography, property type, price range, and availability, while the brokerage keeps one consistent client experience.</p></div>
          <div className="re-broker-grid">{brokers.map(broker => <article key={broker.name}><div className={`re-avatar ${broker.portrait}`}><img src="/assets/realestate-advisors-v1.webp" alt={`${broker.name}, ${broker.role}`} /><span>{broker.initials}</span></div><small>{broker.role}</small><h3>{broker.name}</h3><p>{broker.market}</p><div className="re-agent-form-note">Form: {broker.formNote}</div><span>{broker.stats}</span><button onClick={() => setAdvisor(broker)}>Meet this advisor <Icon name="arrow" /></button></article>)}</div>
          <div className="re-routing"><span>NEW INQUIRY</span><i /><div><small>01</small><strong>Intent scored</strong><p>Buy · $5M+ · 90 days</p></div><i /><div><small>02</small><strong>Market matched</strong><p>Malibu · Coastal</p></div><i /><div className="active"><small>03</small><strong>Broker assigned</strong><p>Marcus Cole · Available</p></div></div>
        </section>

        <section className="re-affordability re-section re-reveal" id="affordability">
          <div className="re-heading light"><div><span>FINANCIAL VIEW</span><h2>Model the purchase before the conversation.</h2></div><p>Give qualified buyers a useful starting point, then route them to the right advisor or lending partner.</p></div>
          <MortgageCalculator />
        </section>

        <section className="re-cta re-reveal"><div><span>CONNECTIVE STACK DEMO</span><h2>Built for the full brokerage, not just one agent.</h2></div><div><p>This fictional concept demonstrates premium listings, broker routing, lead qualification, calculators, CRM-ready intake, and automated follow-up.</p><a href="mailto:ajell.saliba@connectivestack.com?subject=Real%20estate%20website%20demo">Build a real estate experience <Icon name="arrow" /></a></div></section>
      </main>
      <footer className="re-footer"><div className="re-brand"><AsterRowMark /><span><strong>ASTER &amp; ROW</strong><small>FICTIONAL PORTFOLIO DEMO</small></span></div><p>Designed and built by <a href="/">Connective Stack</a></p></footer>
      <Concierge />
      <TourModal property={tour} onClose={() => setTour(null)} />
      <BrokerModal broker={advisor} onClose={() => setAdvisor(null)} />
    </div>
  )
}
