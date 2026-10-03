export type TextileCollection = 'tradicional' | 'premium'
export type FiberType = 'alpaca' | 'baby-alpaca' | 'alpaca-blend' | 'other' | 'unverified'
export type TextileCategory = 'chompa' | 'casaca' | 'poncho' | 'chullo' | 'chalina' | 'guantes'
export type ShopAudience = 'mujer' | 'hombre' | 'accesorios'
export type GarmentSize = 'S' | 'M' | 'ML' | 'L' | 'XL'
export type GarmentLength = 'regular' | 'medio-largo'

export interface TextileComposition {
  verified: boolean
  fiberType: FiberType
  alpacaPercent: number | null
  otherFibers: { name: string; percent: number }[]
  evidenceNote: string | null
}

export interface GarmentVariant {
  id: string
  size: GarmentSize | null
  length: GarmentLength | null
  color: string
  image: string
  salePricePen: number | null
  purchasePricePen?: number | null
  stock: number | null
  available: boolean
}

export interface TextileProduct {
  id: string
  name: string
  category: TextileCategory
  collection: TextileCollection
  audience?: ShopAudience
  indicativePricePen?: number | null
  supplier: string | null
  composition: TextileComposition
  variants: GarmentVariant[]
  careInstructions: string | null
  verifiedOrigin: string | null
  photos: string[]
  photoPanel?: 'left-half' | 'right-half' | 'middle-third'
  photoVerified: boolean
  description: string
}

const unverified: TextileComposition = {
  verified: false, fiberType: 'unverified', alpacaPercent: null, otherFibers: [], evidenceNote: null,
}

/** Conceptos de catálogo: ningún registro representa stock real ni composición confirmada. */
export const TEXTILE_PRODUCTS: TextileProduct[] = [
  { id: 'poncho-mujer-concepto', name: 'Poncho andino para mujer', category: 'poncho', collection: 'tradicional', audience: 'mujer', indicativePricePen: 150, supplier: null, composition: unverified, variants: [], careInstructions: null, verifiedOrigin: null, photos: ['/images/products/referencia-mujer-dos-prendas.png'], photoPanel: 'left-half', photoVerified: false, description: 'Imagen proporcionada como referencia. Materiales y precio final pendientes.' },
  { id: 'poncho-hombre-concepto', name: 'Poncho andino para hombre', category: 'poncho', collection: 'tradicional', audience: 'hombre', indicativePricePen: 170, supplier: null, composition: unverified, variants: [], careInstructions: null, verifiedOrigin: null, photos: ['/images/products/referencia-poncho-hombre.png'], photoVerified: false, description: 'Imagen proporcionada como referencia. Materiales y precio final pendientes.' },
  { id: 'chompa-mujer-concepto', name: 'Chompa tradicional para mujer', category: 'chompa', collection: 'tradicional', audience: 'mujer', indicativePricePen: 60, supplier: null, composition: unverified, variants: [], careInstructions: null, verifiedOrigin: null, photos: ['/images/products/referencia-mujer-dos-prendas.png'], photoPanel: 'right-half', photoVerified: false, description: 'Composición pendiente de confirmar; no se anuncia como baby alpaca.' },
  { id: 'chompa-mujer-celeste-concepto', name: 'Chompa clara con diseño celeste', category: 'chompa', collection: 'tradicional', audience: 'mujer', indicativePricePen: 60, supplier: null, composition: unverified, variants: [], careInstructions: null, verifiedOrigin: null, photos: ['/images/products/referencia-chompa-mujer-celeste.png'], photoVerified: false, description: 'Imagen proporcionada como referencia. Composición, tallas y precio final pendientes.' },
  { id: 'casaca-hombre-referencia', name: 'Casaca andina para hombre', category: 'casaca', collection: 'tradicional', audience: 'hombre', indicativePricePen: 70, supplier: null, composition: unverified, variants: [], careInstructions: null, verifiedOrigin: null, photos: ['/images/products/referencia-poncho-y-casacas.png'], photoPanel: 'middle-third', photoVerified: false, description: 'Casaca con cierre de la imagen proporcionada. Material, tallas y precio final pendientes.' },
  { id: 'chullo-tradicional', name: 'Chullo andino', category: 'chullo', collection: 'tradicional', audience: 'accesorios', supplier: null, composition: unverified, variants: [], careInstructions: null, verifiedOrigin: null, photos: [], photoVerified: false, description: 'Modelo de muestra; composición y variantes pendientes.' },
  { id: 'chalina-tradicional', name: 'Chalina andina', category: 'chalina', collection: 'tradicional', audience: 'accesorios', supplier: null, composition: unverified, variants: [], careInstructions: null, verifiedOrigin: null, photos: [], photoVerified: false, description: 'Modelo de muestra; composición y variantes pendientes.' },
  { id: 'guantes-tradicional', name: 'Guantes tejidos', category: 'guantes', collection: 'tradicional', audience: 'accesorios', supplier: null, composition: unverified, variants: [], careInstructions: null, verifiedOrigin: null, photos: [], photoVerified: false, description: 'Modelo de muestra; composición y variantes pendientes.' },
]

export function compositionIsValid(composition: TextileComposition): boolean {
  if (!composition.verified || !composition.evidenceNote?.trim() || composition.alpacaPercent === null) return false
  if (composition.alpacaPercent < 0 || composition.alpacaPercent > 100) return false
  if (composition.otherFibers.some((fiber) => !fiber.name || fiber.percent < 0 || fiber.percent > 100)) return false
  if ((composition.fiberType === 'alpaca' || composition.fiberType === 'baby-alpaca') && composition.alpacaPercent !== 100) return false
  if (composition.fiberType === 'alpaca-blend' && (composition.alpacaPercent <= 0 || composition.alpacaPercent >= 100)) return false
  if (composition.fiberType === 'other' && composition.alpacaPercent !== 0) return false
  if (composition.fiberType === 'unverified') return false
  return composition.alpacaPercent + composition.otherFibers.reduce((sum, fiber) => sum + fiber.percent, 0) === 100
}

export function variantCanBeOrdered(product: TextileProduct, variant: GarmentVariant): boolean {
  return product.photoVerified && product.photos.length > 0 && product.composition.verified && compositionIsValid(product.composition)
    && variant.available && variant.stock !== null && variant.stock > 0
    && variant.salePricePen !== null && variant.salePricePen > 0
}

export function findVariant(product: TextileProduct, size: GarmentSize | null, length: GarmentLength | null, color: string): GarmentVariant | undefined {
  return product.variants.find((variant) => variant.size === size && variant.length === length && variant.color === color)
}
