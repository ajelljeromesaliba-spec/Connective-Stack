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
  { id: 1, city: 'Beverly Hills', state: 'CA', neighborhood: 'Trousdale Estates', price: 4895000, beds: 4, baths: 5, sqft: '4,820', type: 'City', image: '/assets/realestate-hero.svg', broker: 'Elena Marlow', initials: 'EM', specialty: 'Luxury residences' },
  { id: 2, city: 'Malibu', state: 'CA', neighborhood: 'Carbon Beach', price: 7250000, beds: 5, baths: 6, sqft: '5,640', type: 'Coastal', image: '/assets/realestate-malibu.svg', broker: 'Marcus Cole', initials: 'MC', specialty: 'Coastal properties' },
  { id: 3, city: 'Scottsdale', state: 'AZ', neighborhood: 'Paradise Valley', price: 3180000, beds: 4, baths: 4.5, sqft: '4,310', type: 'Desert', image: '/assets/realestate-scottsdale.svg', broker: 'Sofia Reyes', initials: 'SR', specialty: 'Desert modern homes' },
]

const brokers = [
  { initials: 'EM', name: 'Elena Marlow', role: 'Luxury Residential', market: 'Beverly Hills Â· Los Angeles', stats: '96% list-to-close' },
  { initials: 'MC', name: 'Marcus Cole', role: 'Coastal Specialist', market: 'Malibu Â· Pacific Palisades', stats: '$48M sold this year' },
  { initials: 'SR', name: 'Sofia Reyes', role: 'Relocation Advisor', market: 'Scottsdale Â· Paradise Valley', stats: '4.9 client rating' },
  { initials: 'JL', name: 'Jordan Lee', role: 'Investment Properties', market: 'Greater Los Angeles', stats: '12 years advising' },
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
        <p>{money(price * down / 100)} down Â· 30-year fixed example</p>
        <small>Illustration only. Taxes, insurance, HOA fees, and lender requirements are not included.</small>
      </div>
    </div>
  )
}

function Matchmaker({ onTour }) {
  const [location, setLocation] = useState('Malibu')
  const [budget, setBudget] = useState('5M+')
  const [goal, setGoal] = useState('Primary residence')
  const match = location === 'Scottsdale' ? listings[2] : location === 'Malibu' ? listings[1] : listings[0]
  return (
    <div className="re-match-card">
      <div className="re-match-controls">
        <span>SMART PROPERTY MATCH</span>
        <h3>Tell us what moving well looks like.</h3>
        <label>Preferred market<select value={location} onChange={e => setLocation(e.target.value)}><option>Malibu</option><option>Beverly Hills</option><option>Scottsdale</option></select></label>
        <div className="re-choice-group"><small>Budget</small>{['Under $3M', '$3Mâ$5M', '5M+'].map(item => <button className={budget === item ? 'active' : ''} onClick={() => setBudget(item)} key={item}>{item}</button>)}</div>
        <div className="re-choice-group"><small>Goal</small>{['Primary residence', 'Second home', 'Investment'].map(item => <button className={goal === item ? 'active' : ''} onClick={() => setGoal(item)} key={item}>{item}</button>)}</div>
      </div>
      <div className="re-match-result">
        <span><Icon name="spark" /> BEST CURRENT MATCH</span>
        <img src={match.image} alt={`${match.neighborhood} property`} />
        <div>
          <small>{match.neighborhood}</small>
          <strong>{money(match.price)}</strong>
          <p>{match.beds} beds Â· {match.baths} baths Â· {match.sqft} sq ft</p>
        </div>
        <div className="re-routed"><b>{match.initials}</b><p>Routed to <strong>{match.broker}</strong><span>{match.specialty}</span></p><i>AVAILABLE</i></div>
        <button onClick={() => onTour(match)}>Request a private tour <Icon name="arrow" /></button>
      </div>
    </div>
  )
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
          <form onSubmit={e => { e.preventDefault(); setSent(true) }}>
            <label>Full name<input required placeholder="Sample buyer" /></label>
            <label>Email<input required type="email" placeholder="buyer@example.com" /></label>
            <label>Preferred date<input required type="date" /></label>
            <label>Buying timeline<select><option>Within 30 days</option><option>1â3 months</option><option>3â6 months</option><option>Researching</option></select></label>
            <button type="submit">Request private tour <Icon name="arrow" /></button>
          </form>
        </>}
      </div>
    </div>
  )
}

function Concierge() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Welcome to Aster & Row. Are you buying, selling, or exploring an investment?' }])
  const reply = question => {
    const responses = {
      'Find a property': 'I can match you by market, budget, property style, and timeline. Malibu currently has a strong coastal listing at $7.25M.',
      'Meet a broker': 'Iâll route you by market and specialty. Elena covers Beverly Hills, Marcus handles Malibu, Sofia leads Scottsdale, and Jordan advises investors.',
      'Value my home': 'A broker can prepare a private market review using recent comparable sales, condition, and current demand. No public estimate is treated as a final valuation.',
    }
    setMessages(items => [...items, { from: 'user', text: question }, { from: 'bot', text: responses[question] }])
  }
  return <>
    <button className="re-chat-launcher" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'chat'} /><span>{open ? 'Close' : 'Ask the concierge'}</span></button>
    {open && <aside className="re-chat">
      <div className="re-chat-head"><AsterRowMark compact /><div><strong>Aster Concierge</strong><span><i /> Online Â· Demo experience</span></div><button onClick={() => setOpen(false)}><Icon name="close" /></button></div>
      <div className="re-chat-messages">{messages.map((item, i) => <p className={item.from} key={i}>{item.text}</p>)}</div>
      <div className="re-chat-options">{['Find a property', 'Meet a broker', 'Value my home'].map(item => <button onClick={() => reply(item)} key={item}>{item}</button>)}</div>
    </aside>}
  </>
}

export default function RealEstateDemo() {
  const [filter, setFilter] = useState('All')
  const [saved, setSaved] = useState([])
  const [tour, setTour] = useState(null)
  const shown = filter === 'All' ? listings : listings.filter(item => item.type === filter)

  useEffect(() => {
    document.title = 'Luxury Real Estate Brokerage Demo | Connective Stack'
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible')), { threshold: .08 })
    document.querySelectorAll('.re-reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="re-page">
      <div className="re-demo-bar"><a href="/">â Connective Stack portfolio</a><span>Interactive concept Â· Fictional brokerage</span><b>{saved.length} saved</b></div>
      <header className="re-header">
        <a href="#home" className="re-brand"><AsterRowMark /><span><strong>ASTER &amp; ROW</strong><small>PRIVATE REAL ESTATE</small></span></a>
        <nav><a href="#properties">Properties</a><a href="#match">Private search</a><a href="#advisors">Advisors</a><a href="#affordability">Affordability</a></nav>
        <button onClick={() => setTour(listings[0])}>Schedule a consultation</button>
      </header>
      <main>
        <section className="re-hero re-reveal" id="home">
          <img className="re-hero-image" src="/assets/realestate-hero.svg" alt="Modern luxury home at golden hour" />
          <div className="re-hero-shade" />
          <div className="re-hero-copy"><span>CURATED HOMES Â· TRUSTED ADVISORS</span><h1>Exceptional property.<br /><em>Personal representation.</em></h1><p>One private search, intelligently routed to the broker who knows your market, property type, and priorities.</p><div><a href="#properties">Explore residences <Icon name="arrow" /></a><button onClick={() => setTour(listings[0])}>Request a private search</button></div></div>
          <div className="re-market-card"><small>LIVE MARKET PULSE</small><strong>14</strong><span>qualified opportunities</span><div><i /> Los Angeles <b>7</b></div><div><i /> Malibu <b>4</b></div><div><i /> Scottsdale <b>3</b></div></div>
          <div className="re-hero-caption"><span>FEATURED RESIDENCE</span><strong>Trousdale Estates Â· Beverly Hills</strong><small>$4,895,000</small></div>
        </section>

        <section className="re-proof"><div><strong>$186M</strong><span>Career sales</span></div><div><strong>4</strong><span>Specialist advisors</span></div><div><strong>96%</strong><span>List-to-close ratio</span></div><div><strong>18 min</strong><span>Average lead response</span></div></section>

        <section className="re-properties re-section re-reveal" id="properties">
          <div className="re-heading"><div><span>PRIVATE COLLECTION</span><h2>Residences selected with intention.</h2></div><p>Filter the portfolio, save a property, and request a private viewing. Every inquiry is matched to the right advisor.</p></div>
          <div className="re-filters">{['All', 'City', 'Coastal', 'Desert'].map(item => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
          <div className="re-listings">{shown.map(item => <article key={item.id}>
            <div className="re-listing-image"><img src={item.image} alt={`${item.neighborhood} luxury residence`} /><span>{item.type}</span><button className={saved.includes(item.id) ? 'saved' : ''} onClick={() => setSaved(ids => ids.includes(item.id) ? ids.filter(id => id !== item.id) : [...ids, item.id])} aria-label="Save property"><Icon name="heart" /></button></div>
            <div className="re-listing-copy"><small><Icon name="pin" /> {item.city}, {item.state}</small><h3>{item.neighborhood}</h3><strong>{money(item.price)}</strong><div><span><Icon name="bed" /> {item.beds} beds</span><span><Icon name="bath" /> {item.baths} baths</span><span><Icon name="area" /> {item.sqft} sq ft</span></div><button onClick={() => setTour(item)}>View private details <Icon name="arrow" /></button></div>
          </article>)}</div>
        </section>

        <section className="re-match re-section re-reveal" id="match">
          <div className="re-heading light"><div><span>BROKERAGE INTELLIGENCE</span><h2>A search that knows who should answer.</h2></div><p>Buyer criteria, market, and intent determine both the property recommendation and the specialist broker assigned to the conversation.</p></div>
          <Matchmaker onTour={setTour} />
        </section>

        <section className="re-advisors re-section re-reveal" id="advisors">
          <div className="re-heading"><div><span>ADVISORY TEAM</span><h2>Multiple brokers. One seamless standard.</h2></div><p>Each lead is routed by geography, property type, price range, and availability, while the brokerage keeps one consistent client experience.</p></div>
          <div className="re-broker-grid">{brokers.map((broker, index) => <article key={broker.name}><div className={`re-avatar tone-${index + 1}`}>{broker.initials}</div><small>{broker.role}</small><h3>{broker.name}</h3><p>{broker.market}</p><span>{broker.stats}</span><button onClick={() => setTour(listings[index > 2 ? 0 : index])}>Meet this advisor <Icon name="arrow" /></button></article>)}</div>
          <div className="re-routing"><span>NEW INQUIRY</span><i /><div><small>01</small><strong>Intent scored</strong><p>Buy Â· $5M+ Â· 90 days</p></div><i /><div><small>02</small><strong>Market matched</strong><p>Malibu Â· Coastal</p></div><i /><div className="active"><small>03</small><strong>Broker assigned</strong><p>Marcus Cole Â· Available</p></div></div>
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
    </div>
  )
}
