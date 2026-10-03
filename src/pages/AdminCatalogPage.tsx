import { useState } from 'react'
import { TEXTILE_PRODUCTS } from '../data/textileCatalog'
import { AdminCatalogEditor } from '../components/shop/AdminCatalogEditor'

export function AdminCatalogPage() {
  const [token, setToken] = useState('')
  const [draft, setDraft] = useState(JSON.stringify({ products: TEXTILE_PRODUCTS, exchangeRatePenPerUsd: null }, null, 2))
  const [loaded, setLoaded] = useState(false)
  const [status, setStatus] = useState('')
  const [busy, setBusy] = useState(false)

  async function load() {
    setBusy(true)
    setStatus('')
    try {
      const response = await fetch('/api/admin/catalog', { headers: { Authorization: `Bearer ${token}` } })
      if (!response.ok) throw new Error(response.status === 503 ? 'Configura STORE_ADMIN_TOKEN en el servidor.' : 'Acceso rechazado o catálogo no disponible.')
      const data: { products: unknown[]; exchangeRatePenPerUsd?: number | null } = await response.json()
      setDraft(JSON.stringify({ products: data.products.length ? data.products : TEXTILE_PRODUCTS, exchangeRatePenPerUsd: data.exchangeRatePenPerUsd ?? null }, null, 2))
      setLoaded(true)
      setStatus(data.products.length ? 'Catálogo cargado.' : 'Se cargaron los modelos de muestra. Revisa los datos antes de guardar.')
    } catch (error) { setStatus(error instanceof Error ? error.message : 'No se pudo cargar.') }
    finally { setBusy(false) }
  }

  async function save() {
    if (!loaded || !token) return
    setBusy(true)
    setStatus('')
    try {
      const parsed = JSON.parse(draft)
      const response = await fetch('/api/admin/catalog', { method: 'PUT', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(parsed) })
      if (!response.ok) throw new Error(`No se guardó. Código ${response.status}: revisa formato, porcentajes y variantes.`)
      setStatus('Catálogo guardado. La tienda mostrará los cambios al recargar.')
    } catch (error) { setStatus(error instanceof Error ? error.message : 'No se pudo guardar.') }
    finally { setBusy(false) }
  }

  return <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
    <p className="text-xs uppercase tracking-[0.25em] text-gold-soft">Administración local</p><h1 className="mt-2 font-display text-4xl text-ivory">Catálogo textil</h1>
    <p className="mt-3 max-w-3xl text-sm leading-7 text-mist/75">Edita productos, materiales, precios y variantes desde este formulario. Para guardar debes configurar un token privado en el servidor y cargar primero el catálogo actual. Las prendas no verificadas permanecen fuera de venta.</p>
    <label className="mt-7 block max-w-xl text-sm text-ivory">Token de administración<input type="password" value={token} onChange={(event) => setToken(event.target.value)} autoComplete="off" className="mt-2 w-full rounded-xl border border-gold/30 bg-night p-3 text-ivory" /></label>
    <button type="button" onClick={load} disabled={!token || busy} className="mt-4 rounded-full border border-gold/40 px-5 py-2.5 text-sm text-gold-soft disabled:opacity-50">Cargar catálogo</button>
    <AdminCatalogEditor draft={draft} onChange={setDraft} />
    <details className="mt-8 rounded-2xl border border-gold/25 p-5"><summary className="cursor-pointer text-sm font-semibold text-gold-soft">JSON avanzado</summary><label className="mt-5 block text-sm text-ivory">Datos del catálogo<textarea value={draft} onChange={(event) => setDraft(event.target.value)} spellCheck={false} rows={20} className="mt-2 w-full rounded-xl border border-gold/30 bg-night p-4 font-mono text-xs leading-5 text-mist" /></label><p className="mt-2 text-xs text-mist/60">Aquí puedes completar otras fibras y porcentajes. La imagen debe estar previamente en /images/. Los datos privados del proveedor no se muestran al público.</p></details>
    <button type="button" onClick={save} disabled={busy || !loaded} className="mt-5 rounded-full bg-cyan-soft px-6 py-3 text-sm font-semibold text-night disabled:opacity-50">Guardar catálogo</button>{!loaded && <p className="mt-2 text-xs text-mist/60">Carga el catálogo con el token antes de guardar; así no se sobrescriben cambios existentes.</p>}
    {status && <p role="status" className="mt-5 rounded-xl border border-gold/25 p-4 text-sm text-mist">{status}</p>}
  </div>
}
