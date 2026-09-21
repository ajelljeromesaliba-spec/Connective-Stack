const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_FIELD = 3000

const clean = value => String(value || '').trim().slice(0, MAX_FIELD)
const escapeHtml = value => clean(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;')

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed.' })
  }

  if (!process.env.RESEND_API_KEY) {
    return response.status(503).json({ error: 'Email delivery is not configured yet.' })
  }

  const body = request.body || {}
  if (clean(body.website_check)) return response.status(200).json({ ok: true })

  const fields = {
    name: clean(body.name),
    email: clean(body.email),
    phone: clean(body.phone),
    company: clean(body.company),
    website: clean(body.website),
    service: clean(body.service),
    engagement: clean(body.engagement),
    budget: clean(body.budget),
    timeline: clean(body.timeline),
    message: clean(body.message),
    consent: clean(body.consent),
  }

  if (!fields.name || !EMAIL_PATTERN.test(fields.email) || !fields.service || !fields.budget || !fields.timeline || !fields.message || fields.consent !== 'yes') {
    return response.status(400).json({ error: 'Please complete all required fields with a valid email.' })
  }

  const rows = [
    ['Name', fields.name], ['Email', fields.email], ['Phone', fields.phone || 'Not provided'],
    ['Company', fields.company || 'Not provided'], ['Website', fields.website || 'Not provided'],
    ['Service', fields.service], ['Engagement', fields.engagement], ['Budget', fields.budget], ['Timeline', fields.timeline],
  ]
  const htmlRows = rows.map(([label, value]) => `<tr><td style="padding:9px 12px;color:#62706d;border-bottom:1px solid #e7ecea;width:150px">${escapeHtml(label)}</td><td style="padding:9px 12px;color:#18211f;border-bottom:1px solid #e7ecea;font-weight:600">${escapeHtml(value)}</td></tr>`).join('')
  const textRows = rows.map(([label, value]) => `${label}: ${value}`).join('\n')

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Connective Stack Website <website@connectivestack.com>',
        to: ['ajell.saliba@connectivestack.com'],
        reply_to: fields.email,
        subject: `New ${fields.service} inquiry from ${fields.name}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#18211f"><div style="padding:24px;background:#172123;color:white"><small style="color:#7ee3d4;letter-spacing:.12em">CONNECTIVE STACK</small><h1 style="margin:8px 0 0;font-size:28px">New project inquiry</h1></div><table style="width:100%;border-collapse:collapse;background:#fff">${htmlRows}</table><div style="padding:22px;background:#f3f7f5"><strong>Project details</strong><p style="white-space:pre-wrap;line-height:1.65">${escapeHtml(fields.message)}</p></div></div>`,
        text: `New Connective Stack project inquiry\n\n${textRows}\n\nProject details:\n${fields.message}`,
      }),
    })
    const result = await resendResponse.json().catch(() => ({}))
    if (!resendResponse.ok) {
      console.error('Resend delivery failed', result)
      return response.status(502).json({ error: 'Email delivery failed. Please email AJ directly or book a call.' })
    }
    return response.status(200).json({ ok: true })
  } catch (error) {
    console.error('Contact endpoint failed', error)
    return response.status(500).json({ error: 'The inquiry could not be sent. Please try again.' })
  }
}
