// Temporary check: never expose the secret itself.
export function onRequestGet({ env }) {
  return new Response(JSON.stringify({ configured: Boolean(env.RESEND_API_KEY) }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })
}
