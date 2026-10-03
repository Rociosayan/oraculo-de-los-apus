import { useContext } from 'react'
import { StoreCartContext } from '../context/store-cart-context'

export function useStoreCart() {
  const value = useContext(StoreCartContext)
  if (!value) throw new Error('StoreCartProvider ausente')
  return value
}
