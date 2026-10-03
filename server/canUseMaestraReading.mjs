/**
 * Punto de control premium. Hoy no cobra.
 * Huecos futuros: pago por lectura, créditos, límite diario, membresía,
 * usuario autenticado con saldo, código/promoción.
 */

const hitsByIp = new Map()

function clientIp(req) {
  const forwarded = req.headers?.['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim()
  }
  return req.socket?.remoteAddress ?? 'unknown'
}

export function canUseMaestraReading({ req }) {
  if (!process.env.OPENAI_API_KEY) {
    return { ok: false, reason: 'NO_API_KEY', status: 503 }
  }

  const limit = Number(process.env.MAESTRA_DAILY_LIMIT ?? 20)
  if (!Number.isFinite(limit) || limit <= 0) {
    return { ok: true }
  }

  const ip = clientIp(req)
  const day = new Date().toISOString().slice(0, 10)
  const rec = hitsByIp.get(ip)
  if (!rec || rec.day !== day) {
    hitsByIp.set(ip, { count: 1, day })
    return { ok: true }
  }
  if (rec.count >= limit) {
    return { ok: false, reason: 'DAILY_LIMIT', status: 429 }
  }
  rec.count += 1
  return { ok: true }
}
