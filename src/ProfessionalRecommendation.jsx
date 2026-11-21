import React from 'react'
import './professional-recommendation.css'

const recommendations = [
  {
    name: 'Nathaniel Orr-Depner',
    title: 'Account Manager',
    photo: '/assets/nathaniel-orr-depner.jpg?v=2',
    quote: 'You have been a joy to work with. You have been incredibly present, punctual, knowledgeable, and reliable. You have made my job and life a lot easier because you were such a great go-to person who wore a lot hats and ALWAY delivered.',
  },
  {
    name: 'Jessica Quinones',
    title: 'Head of Legacy Products & Delivery',
    photo: '/assets/jessica-quinones.jpg?v=1',
    quote: 'Ajell was a strong support to the team. He was punctual, dependable, and adaptable, and I appreciated how willing he was to step in and help where needed.',
  },
]

export default function ProfessionalRecommendation({ placement = 'home' }) {
  return (
    <section
      className={`professional-recommendation professional-recommendation--${placement}`}
      id={placement === 'home' ? 'recommendations' : 'professional-recommendations'}
      aria-labelledby={`recommendation-heading-${placement}`}
    >
      <div className="recommendation-shell">
        <div className="recommendation-intro">
          <span className="recommendation-eyebrow"><span aria-hidden="true" /> Professional recommendations</span>
          <h2 id={`recommendation-heading-${placement}`}>What people I've worked with say.</h2>
          <p>Firsthand feedback on AJ's reliability, ownership, and work across client delivery and operations.</p>
          <span className="recommendation-disclaimer">Recommendations from professional colleagues, not ConnectiveStack client reviews.</span>
        </div>
        <div className="recommendation-cards">
          {recommendations.map(person => (
            <figure className="recommendation-card" key={person.name}>
              <span className="recommendation-quote-mark" aria-hidden="true">“</span>
              <blockquote>{person.quote}</blockquote>
              <figcaption className="recommendation-author">
                <img
                  src={person.photo}
                  alt={person.name}
                  width="160"
                  height="160"
                  loading="lazy"
                  decoding="async"
                />
                <span className="recommendation-author-details">
                  <strong>{person.name}</strong>
                  <small>{person.title}</small>
                  <small className="recommendation-verified">Shared with permission</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
