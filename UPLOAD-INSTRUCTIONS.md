# ConnectiveStack Healthcare Minimal Update

This package avoids merging the full feature branch. It contains only the Healthcare demo, its required images, and the two routing files needed to expose it from the portfolio.

## Upload order

1. Upload `public/assets/*` to `public/assets/`.
2. Upload `demos/healthcare-patient-experience/index.html` to the same repository path.
3. Upload `src/HealthcareDemo.jsx` and `src/healthcare-demo.css` to `src/`.
4. Replace `src/main.jsx` and `vite.config.js` last. These include the Healthcare route and Live Demo navigation entry.

## Expected URL

`/demos/healthcare-patient-experience`

## Booking destination

All real booking calls to action use:

`https://calendar.app.google/1tdYCWw6gwfTx3E56`

The simulated patient workflow remains a demo and does not submit real PHI.

## Included files

- 1 Healthcare React page
- 1 Healthcare stylesheet
- 1 Healthcare HTML entry
- 7 optimized Healthcare images
- 1 portfolio router/navigation file
- 1 Vite multipage build configuration

No HVAC, Real Estate, VAPI, contact API, SEO, favicon, or unrelated portfolio files are replaced by this package.
