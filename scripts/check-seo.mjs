import { readFile, access } from 'node:fs/promises'
const xml = await readFile('dist/sitemap.xml', 'utf8')
const paths = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]).pathname)
const titles = new Set()
const errors = []
for (const path of paths) {
  const html = await readFile(`dist${path === '/' ? '' : path}/index.html`, 'utf8')
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1]
  if (!title || titles.has(title)) errors.push(`${path}: missing or duplicate title`)
  titles.add(title)
  if ((html.match(/<h1\b/g) || []).length !== 1) errors.push(`${path}: H1 count`)
  if (html.includes('noindex')) errors.push(`${path}: blocked indexing`)
  if (!html.includes(`rel="canonical" href="https://www.connectivestack.com${path}"`)) errors.push(`${path}: canonical mismatch`)
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) JSON.parse(match[1])
  for (const tag of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt=/.test(tag[0])) errors.push(`${path}: image without alt`)
  for (const match of html.matchAll(/(?:href|src|poster)="([^"<>]+)"/g)) {
    const value = match[1].replaceAll('&amp;', '&')
    if (!value.startsWith('/') && !value.startsWith('#')) continue
    const url = new URL(value, `https://www.connectivestack.com${path}`)
    let target = url.pathname
    if (target === '/solutions/website-systems') target = '/solutions/website-development'
    const file = paths.includes(target) ? `dist${target === '/' ? '' : target}/index.html` : `dist${target}`
    try {
      await access(file)
      if (url.hash && paths.includes(target)) {
        const dest = await readFile(file, 'utf8')
        if (!dest.includes(`id="${decodeURIComponent(url.hash.slice(1))}"`)) errors.push(`${path}: missing anchor ${value}`)
      }
    } catch { errors.push(`${path}: missing internal target ${value}`) }
  }
}
if (errors.length) { console.error([...new Set(errors)].join('\n')); process.exitCode = 1 }
else console.log(`SEO audit passed: ${paths.length} pages, metadata, canonicals, schema, H1s, image alt attributes, internal links and assets.`)
