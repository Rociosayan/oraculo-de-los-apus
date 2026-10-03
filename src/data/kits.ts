export type KitCategory = 'recuerdos' | 'ropa'

export interface KitItem {
  name: string
  quantity: number
  individualPricePen: number | null
  textileProductId?: string
}

export interface AndeanKit {
  id: string
  name: string
  category: KitCategory
  image: string
  discountPen: number | null
  collection?: 'tradicional' | 'premium'
  items: KitItem[]
}

/** Catálogo de demostración. Precios, composición y disponibilidad pendientes de confirmar. */
export const ANDEAN_KITS: AndeanKit[] = [
  { id: 'pucara', name: 'Kit Pucará Tradicional', category: 'recuerdos', image: '/images/products/kit-pucara-concepto-v1.png', discountPen: 15, items: [
    { name: 'Torito de Pucará', quantity: 2, individualPricePen: 35 }, { name: 'Llavero textil', quantity: 1, individualPricePen: 15 }, { name: 'Monedero textil', quantity: 1, individualPricePen: 25 },
  ] },
  { id: 'recuerdos', name: 'Kit Recuerdos de Cusco', category: 'recuerdos', image: '/images/products/kit-pucara-concepto-v1.png', discountPen: 27, items: [
    { name: 'Torito de Pucará', quantity: 1, individualPricePen: 35 }, { name: 'Llavero textil', quantity: 2, individualPricePen: 15 }, { name: 'Monedero textil', quantity: 1, individualPricePen: 25 }, { name: 'Pulsera textil', quantity: 1, individualPricePen: 12 },
  ] },
  { id: 'esencial', name: 'Kit Esencial Andino', category: 'recuerdos', image: '/images/products/kit-pucara-concepto-v1.png', discountPen: 43, items: [
    { name: 'Llavero textil', quantity: 1, individualPricePen: 15 }, { name: 'Monedero textil', quantity: 1, individualPricePen: 25 }, { name: 'Imán de Cusco', quantity: 1, individualPricePen: 12 }, { name: 'Pulsera textil', quantity: 3, individualPricePen: 12 },
  ] },
  { id: 'familiar', name: 'Kit Familiar', category: 'recuerdos', image: '/images/products/kit-pucara-concepto-v1.png', discountPen: 40, items: [
    { name: 'Torito de Pucará', quantity: 1, individualPricePen: 35 }, { name: 'Llavero textil', quantity: 1, individualPricePen: 15 }, { name: 'Monedero textil', quantity: 1, individualPricePen: 25 }, { name: 'Mini peluche', quantity: 1, individualPricePen: 30 },
  ] },
  { id: 'invierno', name: 'Kit Invierno Cusqueño Tradicional', category: 'ropa', collection: 'tradicional', image: '/images/products/kit-invierno-concepto-v1.png', discountPen: 65, items: [
    { name: 'Chompa tradicional de muestra', quantity: 1, individualPricePen: 60, textileProductId: 'chompa-mujer-concepto' }, { name: 'Chullo', quantity: 1, individualPricePen: 45, textileProductId: 'chullo-tradicional' }, { name: 'Guantes tejidos', quantity: 1, individualPricePen: 35, textileProductId: 'guantes-tradicional' }, { name: 'Chalina', quantity: 1, individualPricePen: 45, textileProductId: 'chalina-tradicional' },
  ] },
  { id: 'poncho', name: 'Kit Poncho Andino', category: 'ropa', collection: 'tradicional', image: '/images/products/kit-invierno-concepto-v1.png', discountPen: 50, items: [
    { name: 'Poncho', quantity: 1, individualPricePen: 170 }, { name: 'Chullo', quantity: 1, individualPricePen: 45 }, { name: 'Chalina', quantity: 1, individualPricePen: 45 },
  ] },
  { id: 'mujer', name: 'Kit Mujer Andina', category: 'ropa', collection: 'tradicional', image: '/images/products/kit-invierno-concepto-v1.png', discountPen: 75, items: [
    { name: 'Chompa tradicional de muestra', quantity: 1, individualPricePen: 60 }, { name: 'Chalina', quantity: 1, individualPricePen: 45 }, { name: 'Guantes tejidos', quantity: 1, individualPricePen: 35 }, { name: 'Monedero textil', quantity: 1, individualPricePen: 25 },
  ] },
  { id: 'hombre', name: 'Kit Hombre Andino', category: 'ropa', collection: 'tradicional', image: '/images/products/kit-invierno-concepto-v1.png', discountPen: 80, items: [
    { name: 'Chompa tradicional de muestra', quantity: 1, individualPricePen: 60 }, { name: 'Gorro tejido', quantity: 1, individualPricePen: 40 }, { name: 'Guantes tejidos', quantity: 1, individualPricePen: 35 }, { name: 'Chalina', quantity: 1, individualPricePen: 45 },
  ] },
  { id: 'alpaca-premium', name: 'Kit Invierno Alpaca Premium', category: 'ropa', collection: 'premium', image: '/images/products/kit-invierno-concepto-v1.png', discountPen: null, items: [
    { name: 'Chompa de alpaca (composición por verificar)', quantity: 1, individualPricePen: null }, { name: 'Chullo (material por confirmar)', quantity: 1, individualPricePen: null }, { name: 'Guantes (material por confirmar)', quantity: 1, individualPricePen: null }, { name: 'Chalina (material por confirmar)', quantity: 1, individualPricePen: null },
  ] },
  { id: 'baby-premium', name: 'Kit Baby Alpaca Premium', category: 'ropa', collection: 'premium', image: '/images/products/kit-invierno-concepto-v1.png', discountPen: null, items: [
    { name: 'Chompa baby alpaca (100% sujeto a verificación)', quantity: 1, individualPricePen: null }, { name: 'Accesorios seleccionables (por definir)', quantity: 1, individualPricePen: null },
  ] },
]

export function individualTotalPen(kit: AndeanKit): number | null {
  if (kit.items.some((item) => item.individualPricePen === null)) return null
  return kit.items.reduce((sum, item) => sum + item.quantity * (item.individualPricePen ?? 0), 0)
}

export function kitTotalPen(kit: AndeanKit): number | null {
  const total = individualTotalPen(kit)
  if (total === null || kit.discountPen === null || kit.discountPen < 0 || kit.discountPen > total) return null
  return total - kit.discountPen
}
