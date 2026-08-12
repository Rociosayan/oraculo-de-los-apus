import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'

const port = Number(process.env.PORT ?? 8787)
const dist = join(process.cwd(), 'dist')
const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.mp3': 'audio/mpeg', '.mp4': 'video/mp4',
}

function serveStatic(req, res) {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
  const requested = normalize(join(dist, pathname === '/' ? 'index.html' : pathname))
  const safePath = requested.startsWith(dist) && existsSync(requested) && statSync(requested).isFile()
    ? requested
    : join(dist, 'index.html')
  if (!existsSync(safePath)) {
    res.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8' })
    return res.end('Ejecuta npm run build antes de iniciar el servidor.')
  }
  res.writeHead(200, {
    'Content-Type': mime[extname(safePath)] ?? 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
  })
  createReadStream(safePath).pipe(res)
}

const server = createServer((req, res) => {
  if (new URL(req.url, 'http://localhost').pathname.startsWith('/api/')) {
    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' })
    return res.end(JSON.stringify({ error: 'NOT_FOUND' }))
  }
  serveStatic(req, res)
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Tarot Andino disponible en http://127.0.0.1:${port}`)
})
