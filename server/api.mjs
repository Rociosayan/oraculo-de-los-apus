import { loadEnv } from './loadEnv.mjs'
import { handleMaestra } from './maestra.mjs'
import { handleServices } from './services.mjs'
import { handleCatalog } from './catalog.mjs'

loadEnv()

export async function handleApi(req, res) {
  const pathname = new URL(req.url ?? '/', 'http://localhost').pathname
  if (pathname === '/api/maestra') {
    return handleMaestra(req, res)
  }
  if (pathname === '/api/services') return handleServices(req, res)
  if (pathname === '/api/catalog') return handleCatalog(req, res)
  if (pathname === '/api/admin/catalog') return handleCatalog(req, res, true)
  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify({ error: 'NOT_FOUND' }))
}
