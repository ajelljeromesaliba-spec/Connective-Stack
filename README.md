# Connective Stack

Modern portfolio and service website for Connective Stack.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The site is ready for deployment on Vercel. Add the repository as a new Vercel project and keep the default Vite settings.

## HVAC voice demo

The `/demos/hvac-ai-front-desk` page includes a live Vapi browser call connected to the Northstar HVAC demo assistant. The supplied browser-safe public key is included as a fallback so the demo works after deployment.

To manage the key through Vercel instead, add this environment variable and redeploy:

```bash
VITE_VAPI_PUBLIC_KEY=your_vapi_public_key
```

Never add a Vapi private key to the frontend or commit it to the repository.

## Before launch

- Confirm that `ajell.saliba@connectivestack.com` is active.
- Replace or add sample project concepts as the portfolio grows.
- Add a scheduling link when it is ready.
- Update the Open Graph image before sharing the site widely.
