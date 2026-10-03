import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStoreCart } from '../hooks/useStoreCart'
import { useLanguage } from '../context/LanguageContext'
import { variantCanBeOrdered } from '../data/textileCatalog'
import { useStoreCatalog } from '../hooks/useStoreCatalog'

export function StoreCartPage() {
  const { language } = useLanguage()
  const cart = useStoreCart()
  const { products, exchangeRatePenPerUsd } = useStoreCatalog()
  const [message, setMessage] = useState('')
  const rows = cart.lines.map((line) => {
    const product = products.find((item) => item.id === line.productId)
    const variant = product?.variants.find((item) => item.id === line.variantId)
    const valid = !!product && !!variant && variantCanBeOrdered(product, variant) && line.quantity <= (variant.stock ?? 0)
    return { line, product, variant, valid }
  })
  const ready = rows.length > 0 && rows.every((row) => row.valid)
  const total = rows.reduce((sum, row) => sum + (row.valid ? (row.variant?.salePricePen ?? 0) * row.line.quantity : 0), 0)
  const es = language === 'es'
  const fr = language === 'fr'

  async function copyRequest() {
    if (!ready) return
    const list = rows.map(({ line, product, variant }) => `${line.quantity} × ${product?.name} · ${[variant?.size, variant?.length, variant?.color].filter(Boolean).join(' / ')} · S/ ${(variant?.salePricePen ?? 0) * line.quantity}`).join('\n')
    const request = `${es ? 'Hola, quisiera confirmar disponibilidad y entrega de:' : fr ? 'Bonjour, je souhaite confirmer la disponibilité et la livraison de :' : 'Hello, I would like to confirm availability and delivery of:'}\n${list}\n${es ? 'Subtotal' : fr ? 'Sous-total' : 'Subtotal'}: S/ ${total}\n${es ? 'Confirmemos el costo de entrega y el pago antes de cerrar el pedido.' : fr ? 'Merci de confirmer la livraison et le paiement avant la commande.' : 'Please confirm delivery cost and payment before finalizing.'}`
    try { await navigator.clipboard.writeText(request); setMessage(es ? 'Lista copiada. Pégala en WhatsApp para consultar el pedido.' : fr ? 'Liste copiée. Collez-la dans WhatsApp.' : 'List copied. Paste it into WhatsApp.') }
    catch { setMessage(es ? 'No se pudo copiar automáticamente. Puedes seleccionar las líneas de arriba.' : fr ? 'La copie a échoué. Sélectionnez les lignes ci-dessus.' : 'Copy failed. You can select the lines above.') }
  }

  return <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
    <Link to="/tienda" className="text-sm text-gold-soft">← {es ? 'Tienda' : fr ? 'Boutique' : 'Store'}</Link>
    <h1 className="mt-5 font-display text-4xl text-ivory">{es ? 'Mi carrito' : fr ? 'Mon panier' : 'My cart'}</h1>
    <p className="mt-3 max-w-2xl text-sm leading-7 text-mist/75">{es ? 'Revisa cada prenda antes de solicitar disponibilidad. El envío y la forma de pago se confirman personalmente; aquí todavía no se cobra.' : fr ? 'Vérifiez les articles avant de demander leur disponibilité. Livraison et paiement sont confirmés personnellement.' : 'Review each item before asking about availability. Delivery and payment are confirmed personally; no payment is collected here.'}</p>
    {rows.length ? <div className="mt-8 space-y-3">{rows.map(({ line, product, variant, valid }) => <article key={`${line.productId}:${line.variantId}`} className="flex flex-wrap items-center gap-4 rounded-2xl border border-gold/25 bg-[#f7f0e5] p-4 text-[#3a241c]">
      {product?.photos[0] ? <img src={variant?.image || product.photos[0]} alt="" className="h-20 w-20 rounded-xl object-cover" /> : <div className="h-20 w-20 rounded-xl bg-[#e8d8c8]" />}
      <div className="min-w-40 flex-1"><h2 className="font-display text-xl">{product?.name ?? (es ? 'Producto retirado' : 'Removed product')}</h2><p className="text-xs text-[#765b4b]">{[variant?.size, variant?.length, variant?.color].filter(Boolean).join(' · ')}</p><p className="mt-1 text-sm font-semibold">{valid ? `S/ ${variant?.salePricePen} ${es ? 'cada uno' : 'each'}` : (es ? 'No disponible; quítalo del carrito' : 'Unavailable; remove from cart')}</p></div>
      <div className="flex items-center gap-2"><button type="button" disabled={!valid} onClick={() => cart.change(line.productId, line.variantId, -1, variant?.stock ?? 0)} aria-label={es ? 'Reducir cantidad' : 'Decrease quantity'} className="rounded-full border px-3 py-1 disabled:opacity-40">−</button><span>{line.quantity}</span><button type="button" disabled={!valid || line.quantity >= (variant?.stock ?? 0)} onClick={() => cart.change(line.productId, line.variantId, 1, variant?.stock ?? 0)} aria-label={es ? 'Aumentar cantidad' : 'Increase quantity'} className="rounded-full border px-3 py-1 disabled:opacity-40">+</button><button type="button" onClick={() => cart.remove(line.productId, line.variantId)} className="ml-2 text-sm text-[#a51f31]">{es ? 'Quitar' : fr ? 'Retirer' : 'Remove'}</button></div>
    </article>)}</div> : <p className="mt-8 rounded-2xl border border-gold/25 p-6 text-mist/70">{es ? 'El carrito está vacío. Las prendas pendientes no pueden añadirse todavía.' : fr ? 'Le panier est vide. Les articles en attente ne peuvent pas encore être ajoutés.' : 'Your cart is empty. Pending items cannot be added yet.'}</p>}
    {rows.length > 0 && <div className="mt-7 rounded-3xl border border-gold/30 bg-indigo-night p-6"><p className="font-display text-3xl text-gold-soft">{es ? 'Subtotal' : fr ? 'Sous-total' : 'Subtotal'}: S/ {total.toFixed(2)}</p>{exchangeRatePenPerUsd && <p className="mt-1 text-sm text-mist/70">≈ US$ {(total / exchangeRatePenPerUsd).toFixed(2)}</p>}<p className="mt-2 text-xs text-mist/60">{es ? 'Envío no incluido. El pedido no reserva stock hasta la confirmación.' : fr ? 'Livraison non comprise. Le stock n’est pas réservé.' : 'Delivery not included. Stock is not reserved until confirmation.'}</p><div className="mt-5 flex flex-wrap gap-3"><button type="button" disabled={!ready} onClick={copyRequest} className="rounded-full bg-cyan-soft px-5 py-3 text-sm font-semibold text-night disabled:opacity-45">{es ? 'Copiar pedido para consultar' : fr ? 'Copier la demande' : 'Copy order request'}</button><a href="https://wa.me/qr/UQUCZ45EW6QZE1" target="_blank" rel="noreferrer" className="rounded-full border border-gold/40 px-5 py-3 text-sm font-semibold text-gold-soft">{es ? 'Abrir WhatsApp' : fr ? 'Ouvrir WhatsApp' : 'Open WhatsApp'}</a></div>{message && <p role="status" className="mt-3 text-sm text-mist">{message}</p>}</div>}
  </div>
}
