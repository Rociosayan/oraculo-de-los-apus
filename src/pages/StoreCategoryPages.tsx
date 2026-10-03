import { Link } from 'react-router-dom'
import { KitsSection } from '../components/shop/KitsSection'
import { TextileCollections } from '../components/shop/TextileCollections'
import { useLanguage } from '../context/LanguageContext'

function StoreBreadcrumb() {
  const { language } = useLanguage()
  return <nav className="mx-auto max-w-6xl px-4 pt-7 sm:px-6" aria-label="Store"><Link to="/tienda" className="text-sm text-gold-soft hover:underline">← {language === 'es' ? 'Todas las categorías' : language === 'fr' ? 'Toutes les catégories' : 'All categories'}</Link></nav>
}

export function StoreClothingPage() {
  return <div><StoreBreadcrumb /><TextileCollections mode="clothing" /></div>
}

export function StoreAccessoriesPage() {
  return <div><StoreBreadcrumb /><TextileCollections mode="accessories" /></div>
}

export function StoreKitsPage() {
  const { language } = useLanguage()
  const title = language === 'es' ? '¿Te vas de Cusco y olvidaste comprar tus recuerdos?' : language === 'fr' ? 'Vous quittez Cusco sans vos souvenirs ?' : 'Leaving Cusco and forgot to buy souvenirs?'
  const detail = language === 'es' ? 'Entrega local por coordinar. Confirmaremos producto, dirección, horario y costo antes de aceptar un pedido.' : language === 'fr' ? 'Livraison locale à organiser. Produit, adresse, horaire et coût seront confirmés avant toute commande.' : 'Local delivery by arrangement. Product, address, time and cost are confirmed before accepting an order.'
  return <div><StoreBreadcrumb /><KitsSection /><section className="mx-auto mb-16 max-w-6xl px-4 sm:px-6"><div className="rounded-3xl border border-gold/30 bg-[#3a241c] p-7 sm:p-10"><h2 className="font-display text-3xl text-ivory sm:text-4xl">{title}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-mist/80">{detail}</p><a href="https://wa.me/qr/UQUCZ45EW6QZE1" target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full border border-gold/50 px-6 py-3 text-sm font-semibold text-gold-soft">{language === 'es' ? 'Consultar por WhatsApp' : language === 'fr' ? 'Demander sur WhatsApp' : 'Ask on WhatsApp'}</a></div></section></div>
}
