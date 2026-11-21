import React from 'react'
import './professional-recommendation.css'

const recommendations = [
  {
      "name": "Nathan Justice",
      "title": "Senior Account Manager, AI Acquisition",
      "photo": "/assets/nathan-justice.webp",
      "quote": "I had the opportunity to work with Ajell at AI Acquisition, where he supported our team across website implementation, GoHighLevel systems, technical operations, and management support.\n\nWhat I appreciated about Ajell was his ability to identify problems, investigate what was causing them, and focus on getting things resolved. Whether he was reviewing client records, checking onboarding processes, identifying overdue tasks, or working on technical implementations, he consistently paid attention to the details that could affect client delivery.\n\nAjell brings a valuable combination of technical knowledge, operational experience, and a problem-solving mindset. He understands that completing a task is only part of the job. Making sure the system or process actually works is what matters.",
      "source": "Shared with permission",
      "kind": "featured"
  },
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
  {
    name: 'Carlos Furcal',
    title: 'Former Upwork client',
    photo: '/assets/carlos-furcal.jpg?v=1',
    quote: 'The beeeest!!!',
    source: '5-star Upwork review',
    kind: 'client',
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
          <span className="recommendation-eyebrow"><span aria-hidden="true" /> Feedback & recommendations</span>
          <h2 id={`recommendation-heading-${placement}`}>What people I've worked with say.</h2>
          <p>Feedback from colleagues and a former Upwork client on working with AJ.</p>
          <span className="recommendation-disclaimer">Professional references and an Upwork client review. These reflect work with AJ personally, not ConnectiveStack client engagements.</span>
        </div>
        <div className="recommendation-cards">
          {recommendations.map(person => (
            <figure className={`recommendation-card${person.kind === 'client' ? ' recommendation-card--client' : person.kind === 'featured' ? ' recommendation-card--featured' : ''}`} key={person.name}>
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
                  <small className="recommendation-verified">{person.source || 'Shared with permission'}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
