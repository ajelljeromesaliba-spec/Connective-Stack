// Temporary runtime diagnostic. No keys or secret values are returned.
export function onRequestGet({ env }) {
  return new Response(
    JSON.stringify({ configured: Boolean(env.RESEND_API_KEY) }),
    { status: 200, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } },
  )
}
