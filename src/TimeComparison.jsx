import React, { useEffect, useState } from 'react'
import './time-comparison.css'

const clockFormat = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
})

const manilaClockFormat = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
  timeZone: 'Asia/Manila',
})

function browserGmtOffset(date) {
  const minutes = -date.getTimezoneOffset()
  const sign = minutes >= 0 ? '+' : '-'
  const amount = Math.abs(minutes)
  const hours = Math.floor(amount / 60)
  const remainder = amount % 60
  return `GMT${sign}${hours}${remainder ? `:${String(remainder).padStart(2, '0')}` : ''}`
}

export default function TimeComparison() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const tick = () => setNow(new Date())
    tick()
    const interval = window.setInterval(tick, 1000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <div className="hero-clock" role="group" aria-label="Current local time and Manila time">
      <div className="hero-clock__grid">
        <div className="hero-clock__zone">
          <span className="hero-clock__label">Your local time</span>
          <span className="hero-clock__readout" aria-live="off">
            <time>{clockFormat.format(now)}</time>
            <span className="hero-clock__offset">{browserGmtOffset(now)}</span>
          </span>
        </div>
        <span className="hero-clock__rule" aria-hidden="true" />
        <div className="hero-clock__zone">
          <span className="hero-clock__label">My time · Manila</span>
          <span className="hero-clock__readout" aria-live="off">
            <time>{manilaClockFormat.format(now)}</time>
            <span className="hero-clock__offset">GMT+8</span>
          </span>
        </div>
      </div>
      <div className="hero-clock__status">
        <span className="hero-clock__live-dot" aria-hidden="true" />
        <span>Working across time zones</span>
        <span className="hero-clock__slash" aria-hidden="true">//</span>
        <span>Available worldwide</span>
      </div>
    </div>
  )
}
