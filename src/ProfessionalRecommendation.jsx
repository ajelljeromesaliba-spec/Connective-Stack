import React from 'react'
import './professional-recommendation.css'

const testimonial = "You have been a joy to work with. You have been incredibly present, punctual, knowledgeable, and reliable. You have made my job and life a lot easier because you were such a great go-to person who wore a lot hats and ALWAY delivered."

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
          <span className="recommendation-disclaimer">Professional colleague recommendation, not a ConnectiveStack client review.</span>
        </div>
        <figure className="recommendation-card">
          <span className="recommendation-quote-mark" aria-hidden="true">“</span>
          <blockquote>{testimonial}</blockquote>
          <figcaption className="recommendation-author">
            <img
              src="/assets/nathaniel-orr-depner.jpg?v=2"
              alt="Nathaniel Orr-Depner"
              width="160"
              height="160"
              loading="lazy"
              decoding="async"
            />
            <span>
              <strong>Nathaniel Orr-Depner</strong>
              <small>Account Manager</small>
            </span>
            <span className="recommendation-verified">Shared with permission</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
