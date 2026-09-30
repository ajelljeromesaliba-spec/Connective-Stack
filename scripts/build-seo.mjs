import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { createServer } from 'vite'
import { renderToString } from 'react-dom/server'

const origin = 'https://www.connectivestack.com'
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
const server = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })
try {
  const { renderRoute } = await server.ssrLoadModule('/src/main.jsx')
  const { pages, sols } = await server.ssrLoadModule('/src/SeoPages.jsx')
  const { caseStudies } = await server.ssrLoadModule('/src/CaseStudy.jsx')
  const template = await readFile('dist/index.html', 'utf8')
  const images = JSON.parse(await readFile('scripts/image-dimensions.json', 'utf8'))
  const routes = new Map()
  for (const path of ['/', '/ghl-systems', '/demos/hvac-ai-front-desk', '/demos/luxury-real-estate', '/demos/healthcare-patient-experience']) {
    const html = await readFile(`dist${path === '/' ? '' : path}/index.html`, 'utf8')
    routes.set(path, { title: html.match(/<title>(.*?)<\/title>/s)[1].replaceAll('&amp;', '&'), desc: html.match(/name="description" content="([^"]*)"/)[1], image: html.match(/property="og:image" content="([^"]*)"/)?.[1] })
  }
  routes.set('/seo-guides', { title: 'Website, CRM and AI Automation Guides | ConnectiveStack', desc: 'Practical ConnectiveStack guides for website SEO, HVAC lead generation, CRM automation, AI receptionists and business system integrations.' })
  routes.set('/ajell-saliba', { title: 'Experience and Technical Work | ConnectiveStack', desc: 'Website delivery, GoHighLevel systems, DNS, integrations and technical problem solving across agency and operations roles.' })
  for (const [slug, p] of Object.entries(pages)) routes.set(`/guides/${slug}`, { title: `${p[1]} | ConnectiveStack`, desc: p[2] })
  for (const [slug, p] of Object.entries(sols)) routes.set(`/solutions/${slug}`, { title: `${p[1]} | ConnectiveStack`, desc: p[2] })
  for (const [slug, p] of Object.entries(caseStudies)) routes.set(`/case-studies/${slug}`, { title: `${p.title} | ConnectiveStack Case Study`, desc: p.summary, image: origin + p.image })

  for (const [path, meta] of routes) {
    let html = template
    const image = (meta.image || `${origin}/assets/connectivestack-metallic-social.jpg`).replace('https://connectivestack.com', origin)
    html = html.replace(/<title>.*?<\/title>/s, `<title>${escape(meta.title)}</title>`)
    const setMeta = (key, value) => { html = html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*(")`), `$1${escape(value).replaceAll('$', '$$$$')}$2`) }
    for (const key of ['description', 'og:description', 'twitter:description']) setMeta(key, meta.desc)
    for (const key of ['og:title', 'twitter:title']) setMeta(key, meta.title)
    for (const key of ['og:image', 'twitter:image']) setMeta(key, image)
    for (const key of ['og:image:alt', 'twitter:image:alt']) setMeta(key, meta.title)
    html = html.replace(/<meta property="og:image:type"[^>]*>/, '')
    setMeta('og:url', origin + path)
    html = html.replace(/(<link rel="canonical" href=")[^"]+/, `$1${origin}${path}`)
    if (path !== '/') html = html.replace(/<link rel="preload" href="\/images\/automation-signal.webp"[^>]*>/, '')
    const schema = {
      '@context': 'https://schema.org', '@graph': [
        { '@type': 'Organization', '@id': `${origin}/#business`, name: 'ConnectiveStack', url: origin + '/', logo: origin + '/assets/connectivestack-metallic-logo.jpg' },
        { '@type': 'WebSite', '@id': `${origin}/#website`, url: origin + '/', name: 'ConnectiveStack', publisher: { '@id': `${origin}/#business` } },
        { '@type': 'WebPage', '@id': origin + path + '#webpage', url: origin + path, name: meta.title, description: meta.desc, isPartOf: { '@id': `${origin}/#website` } },
        ...(path === '/' ? [] : [{ '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'ConnectiveStack', item: origin + '/' }, { '@type': 'ListItem', position: 2, name: meta.title.split(' | ')[0], item: origin + path }] }]),
      ],
    }
    html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`)
    let content = renderToString(renderRoute(path))
    content = content.replace(/<img\b[^>]*>/g, tag => {
      const src = tag.match(/src="([^"]+)"/)?.[1]
      const size = images[src]
      if (size && !/\bwidth=/.test(tag)) tag = tag.replace('<img', `<img width="${size[0]}" height="${size[1]}"`)
      return tag
    })
    html = html.replace('<div id="root"></div>', `<div id="root">${content}</div>`)
    html = html.replace('</head>', '<noscript><style>[data-reveal],.re-reveal,.hc-reveal{opacity:1!important;visibility:visible!important;transform:none!important}</style></noscript></head>')
    if ((content.match(/<h1\b/g) || []).length !== 1) throw new Error(`Expected one H1: ${path}`)
    const dir = `dist${path === '/' ? '' : path}`
    await mkdir(dir, { recursive: true })
    await writeFile(`${dir}/index.html`, html)
  }
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[...routes.keys()].map(path => `  <url><loc>${origin}${path}</loc></url>`).join('\n')}\n</urlset>\n`)
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`)
  await writeFile('dist/404.html', '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Page not found | ConnectiveStack</title></head><body><main><h1>Page not found</h1><p>This address does not match a page on ConnectiveStack.</p><a href="/">Return to ConnectiveStack</a></main></body></html>')
  console.log(`SEO: generated ${routes.size} pages with rendered content, unique metadata, schema and sitemap.`)
} finally {
  await server.close()
}
