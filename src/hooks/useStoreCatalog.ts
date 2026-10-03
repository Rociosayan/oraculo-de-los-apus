import { useEffect, useState } from 'react'
import { TEXTILE_PRODUCTS, type TextileProduct } from '../data/textileCatalog'

export interface StoreCatalog { products: TextileProduct[]; exchangeRatePenPerUsd: number | null }

export function useStoreCatalog(): StoreCatalog {
  const [catalog, setCatalog] = useState<StoreCatalog>({ products: TEXTILE_PRODUCTS, exchangeRatePenPerUsd: null })
  useEffect(() => {
    let active = true
    void fetch('/api/catalog', { cache: 'no-store' }).then((response) => response.ok ? response.json() : Promise.reject()).then((data: Partial<StoreCatalog>) => {
      if (!active) return
      setCatalog({ products: Array.isArray(data.products) && data.products.length ? data.products : TEXTILE_PRODUCTS, exchangeRatePenPerUsd: typeof data.exchangeRatePenPerUsd === 'number' && data.exchangeRatePenPerUsd > 0 ? data.exchangeRatePenPerUsd : null })
    }).catch(() => {})
    return () => { active = false }
  }, [])
  return catalog
}
