import { describe, expect, it } from 'vitest'
import { ANDEAN_KITS, individualTotalPen, kitTotalPen } from './kits'
import { compositionIsValid, findVariant, variantCanBeOrdered, type TextileProduct } from './textileCatalog'

describe('datos de venta textil', () => {
  it('no permite vender sin composición, precio y stock confirmados', () => {
    const product: TextileProduct = {
      id: 'ejemplo', name: 'Ejemplo', category: 'chompa', collection: 'premium', supplier: null,
      composition: { verified: false, fiberType: 'alpaca', alpacaPercent: 100, otherFibers: [], evidenceNote: null },
      variants: [{ id: 'm-rojo', size: 'M', length: 'regular', color: 'rojo', image: '/images/ejemplo.png', salePricePen: 350, purchasePricePen: 200, stock: 1, available: true }],
      careInstructions: null, verifiedOrigin: null, photos: ['/images/ejemplo.png'], photoVerified: false, description: '',
    }
    expect(variantCanBeOrdered(product, product.variants[0])).toBe(false)
    product.composition = { ...product.composition, verified: true, evidenceNote: 'Ficha del proveedor' }
    expect(compositionIsValid(product.composition)).toBe(true)
    expect(variantCanBeOrdered(product, product.variants[0])).toBe(false)
    product.photoVerified = true
    expect(variantCanBeOrdered(product, product.variants[0])).toBe(true)
    product.variants[0].stock = 0
    expect(variantCanBeOrdered(product, product.variants[0])).toBe(false)
  })

  it('solo encuentra combinaciones existentes de talla, largo y color', () => {
    const product = { variants: [{ id: 'm-rojo', size: 'M', length: 'regular', color: 'rojo' }] } as TextileProduct
    expect(findVariant(product, 'M', 'regular', 'rojo')?.id).toBe('m-rojo')
    expect(findVariant(product, 'L', 'regular', 'rojo')).toBeUndefined()
  })

  it('calcula el kit con componentes y descuento, sin precio para los premium pendientes', () => {
    const traditional = ANDEAN_KITS.find((kit) => kit.id === 'invierno')!
    expect(individualTotalPen(traditional)).toBe(185)
    expect(kitTotalPen(traditional)).toBe(120)
    expect(kitTotalPen(ANDEAN_KITS.find((kit) => kit.id === 'baby-premium')!)).toBeNull()
  })
})
