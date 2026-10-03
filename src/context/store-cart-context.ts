import { createContext } from 'react'

export interface StoreCartLine { productId: string; variantId: string; quantity: number }
export interface StoreCartValue {
  lines: StoreCartLine[]
  count: number
  add: (productId: string, variantId: string, stock: number) => void
  change: (productId: string, variantId: string, amount: number, stock: number) => void
  remove: (productId: string, variantId: string) => void
  clear: () => void
}

export const StoreCartContext = createContext<StoreCartValue | null>(null)
