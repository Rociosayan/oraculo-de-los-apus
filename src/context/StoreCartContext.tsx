import { useEffect, useState, type ReactNode } from 'react'
import { StoreCartContext, type StoreCartLine, type StoreCartValue } from './store-cart-context'

const KEY = 'apus-textile-cart'

function readCart(): StoreCartLine[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    if (!Array.isArray(parsed)) return []
    return parsed.filter((line): line is StoreCartLine => !!line && typeof line.productId === 'string' && typeof line.variantId === 'string' && Number.isInteger(line.quantity) && line.quantity > 0 && line.quantity <= 100)
  } catch { return [] }
}

export function StoreCartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<StoreCartLine[]>(readCart)
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(lines)) }, [lines])

  const value: StoreCartValue = {
    lines,
    count: lines.reduce((sum, line) => sum + line.quantity, 0),
    add(productId, variantId, stock) {
      if (!Number.isInteger(stock) || stock <= 0) return
      setLines((current) => {
        const existing = current.find((line) => line.productId === productId && line.variantId === variantId)
        if (existing) return current.map((line) => line === existing ? { ...line, quantity: Math.min(stock, line.quantity + 1) } : line)
        return [...current, { productId, variantId, quantity: 1 }]
      })
    },
    change(productId, variantId, amount, stock) {
      setLines((current) => current.map((line) => line.productId === productId && line.variantId === variantId ? { ...line, quantity: Math.min(Math.max(0, stock), Math.max(0, line.quantity + amount)) } : line).filter((line) => line.quantity > 0))
    },
    remove(productId, variantId) { setLines((current) => current.filter((line) => line.productId !== productId || line.variantId !== variantId)) },
    clear() { setLines([]) },
  }

  return <StoreCartContext.Provider value={value}>{children}</StoreCartContext.Provider>
}
