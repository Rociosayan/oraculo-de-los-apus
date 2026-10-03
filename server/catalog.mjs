import { createHash, timingSafeEqual } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const path = join(process.cwd(), 'data', 'store-catalog.json')
const send = (res, status, payload) => {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' })
  res.end(JSON.stringify(payload))
}

async function readCatalog() {
  try { return JSON.parse(await readFile(path, 'utf8')) } catch (error) {
    if (error?.code === 'ENOENT') return { products: [], exchangeRatePenPerUsd: null }
    throw error
  }
}

function authorized(req) {
  const configured = process.env.STORE_ADMIN_TOKEN
  const provided = req.headers.authorization?.replace(/^Bearer /i, '')
  if (!configured || !provided) return false
  const expectedHash = createHash('sha256').update(configured).digest()
  const actualHash = createHash('sha256').update(provided).digest()
  return timingSafeEqual(expectedHash, actualHash)
}

function validProduct(product) {
  if (!product || typeof product.id !== 'string' || !/^[a-z0-9-]{2,64}$/.test(product.id)) return false
  if (typeof product.name !== 'string' || !product.name.trim() || product.name.length > 140) return false
  if (typeof product.photoVerified !== 'boolean') return false
  if (product.photoVerified && (!Array.isArray(product.photos) || product.photos.length === 0)) return false
  if (!['tradicional', 'premium'].includes(product.collection)) return false
  if (!['chompa', 'casaca', 'poncho', 'chullo', 'chalina', 'guantes'].includes(product.category)) return false
  if (product.audience !== undefined && !['mujer', 'hombre', 'accesorios'].includes(product.audience)) return false
  if (product.indicativePricePen != null && (!Number.isFinite(product.indicativePricePen) || product.indicativePricePen <= 0)) return false
  const c = product.composition
  if (!c || typeof c.verified !== 'boolean' || !['alpaca', 'baby-alpaca', 'alpaca-blend', 'other', 'unverified'].includes(c.fiberType)) return false
  if (c.alpacaPercent !== null && (!Number.isFinite(c.alpacaPercent) || c.alpacaPercent < 0 || c.alpacaPercent > 100)) return false
  if (!Array.isArray(c.otherFibers) || c.otherFibers.some((f) => typeof f.name !== 'string' || !Number.isFinite(f.percent) || f.percent < 0 || f.percent > 100)) return false
  if (c.verified && (c.alpacaPercent === null || c.alpacaPercent + c.otherFibers.reduce((sum, f) => sum + f.percent, 0) !== 100 || !c.evidenceNote)) return false
  if (c.fiberType === 'alpaca' && c.verified && c.alpacaPercent !== 100) return false
  if (c.fiberType === 'baby-alpaca' && c.verified && c.alpacaPercent !== 100) return false
  if (c.fiberType === 'alpaca-blend' && c.verified && (c.alpacaPercent <= 0 || c.alpacaPercent >= 100)) return false
  if (c.fiberType === 'other' && c.verified && c.alpacaPercent !== 0) return false
  if (c.fiberType === 'unverified' && c.verified) return false
  if (!Array.isArray(product.variants) || product.variants.length > 100) return false
  if (product.variants.some((v) => !v || typeof v.id !== 'string' || typeof v.color !== 'string' || typeof v.image !== 'string' || typeof v.available !== 'boolean' || (v.salePricePen != null && (!Number.isFinite(v.salePricePen) || v.salePricePen <= 0)) || (v.purchasePricePen != null && (!Number.isFinite(v.purchasePricePen) || v.purchasePricePen < 0)) || (v.stock != null && (!Number.isInteger(v.stock) || v.stock < 0)))) return false
  return Array.isArray(product.photos) && product.photos.every((photo) => typeof photo === 'string' && photo.startsWith('/images/'))
}

export async function handleCatalog(req, res, admin = false) {
  if (admin && !process.env.STORE_ADMIN_TOKEN) return send(res, 503, { error: 'ADMIN_NOT_CONFIGURED' })
  if (admin && !authorized(req)) return send(res, 401, { error: 'UNAUTHORIZED' })
  if (req.method === 'GET') {
    try {
      const catalog = await readCatalog()
      return send(res, 200, admin ? catalog : { exchangeRatePenPerUsd: catalog.exchangeRatePenPerUsd ?? null, products: catalog.products.map((product) => ({ ...product, supplier: null, composition: { ...product.composition, evidenceNote: product.composition.verified ? 'Verificación registrada' : null }, variants: product.variants.map(({ purchasePricePen: _purchasePricePen, ...variant }) => variant) })) })
    } catch { return send(res, 500, { error: 'CATALOG_READ_ERROR' }) }
  }
  if (!admin || req.method !== 'PUT') return send(res, 405, { error: 'METHOD_NOT_ALLOWED' })
  try {
    let raw = ''
    for await (const chunk of req) {
      raw += chunk.toString()
      if (raw.length > 1_000_000) return send(res, 413, { error: 'TOO_LARGE' })
    }
    const data = JSON.parse(raw)
    if (!data || !Array.isArray(data.products) || data.products.length > 200 || !data.products.every(validProduct)) return send(res, 400, { error: 'INVALID_CATALOG' })
    if (data.exchangeRatePenPerUsd != null && (!Number.isFinite(data.exchangeRatePenPerUsd) || data.exchangeRatePenPerUsd <= 0)) return send(res, 400, { error: 'INVALID_EXCHANGE_RATE' })
    if (new Set(data.products.map((product) => product.id)).size !== data.products.length) return send(res, 400, { error: 'DUPLICATE_ID' })
    await mkdir(join(process.cwd(), 'data'), { recursive: true })
    const temporary = `${path}.tmp`
    await writeFile(temporary, JSON.stringify({ products: data.products, exchangeRatePenPerUsd: data.exchangeRatePenPerUsd ?? null }, null, 2), { encoding: 'utf8', mode: 0o600 })
    await rename(temporary, path)
    return send(res, 200, { saved: true, count: data.products.length })
  } catch { return send(res, 400, { error: 'INVALID_REQUEST' }) }
}
