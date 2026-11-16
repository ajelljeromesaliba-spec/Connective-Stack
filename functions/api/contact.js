const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_FIELD = 3000
const clean = value => String(value ?? '').trim().slice(0, MAX_FIELD)
const escapeHtml = value => clean(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;')
const json = (body, status) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff' },
})

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY) {
    return json({ error: 'Email delivery is not configured yet.' }, 503)
  }

  if (Number(request.headers.get('content-length') || 0) > 16000) {
    return json({ error: 'Submission is too large.' }, 413)
  }

  let body
  try {
    const raw = await request.text()
    if (raw.length > 16000) return json({ error: 'Submission is too large.' }, 413)
    body = JSON.parse(raw)
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw Error('Invalid body')
  } catch {
    return json({ error: 'Invalid request body.' }, 400)
  }

  if (clean(body.website_check)) return json({ ok: true }, 200)

  const fields = {
    name: clean(body.name),
    email: clean(body.email),
    company: clean(body.company),
    message: clean(body.message),
    consent: clean(body.consent),
  }

  if (!fields.name || !EMAIL_PATTERN.test(fields.email) || !fields.message || fields.consent !== 'yes') {
    return json({ error: 'Please complete your name, email, project details, and consent.' }, 400)
  }

  const rows = [
    ['Name', fields.name],
    ['Email', fields.email],
    ['Company / website', fields.company || 'Not provided'],
  ]
  const htmlRows = rows.map(([label, value]) =>
    `<tr><td style="padding:9px 12px;color:#62706d;border-bottom:1px solid #e7ecea;width:150px">${escapeHtml(label)}</td><td style="padding:9px 12px;color:#18211f;border-bottom:1px solid #e7ecea;font-weight:600">${escapeHtml(value)}</td></tr>`
  ).join('')
  const textRows = rows.map(([label, value]) => `${label}: ${value}`).join('\n')

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Connective Stack Website <website@connectivestack.com>',
        to: ['ajell.saliba@connectivestack.com'],
        reply_to: fields.email,
        subject: `New project inquiry from ${fields.name}`,
        html: `<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#18211f"><div style="padding:24px;background:#172123;color:white"><small style="color:#7ee3d4;letter-spacing:.12em">CONNECTIVE STACK</small><h1 style="margin:8px 0 0;font-size:28px">New project inquiry</h1></div><table style="width:100%;border-collapse:collapse;background:#fff">${htmlRows}</table><div style="padding:22px;background:#f3f7f5"><strong>Project details</strong><p style="white-space:pre-wrap;line-height:1.65">${escapeHtml(fields.message)}</p></div></div>`,
        text: `New Connective Stack project inquiry\n\n${textRows}\n\nProject details:\n${fields.message}`,
      }),
    })
    if (!resendResponse.ok) {
      console.error('Resend delivery failed', resendResponse.status)
      return json({ error: 'Email delivery failed. Please email AJ directly or book a call.' }, 502)
    }
    return json({ ok: true }, 200)
  } catch (error) {
    console.error('Contact endpoint failed', error)
    return json({ error: 'The inquiry could not be sent. Please try again.' }, 500)
  }
}

export function onRequest() {
  return json({ error: 'Method not allowed.' }, 405)
}
