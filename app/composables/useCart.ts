export interface CartItem {
  id: number
  name: string
  nameAr: string
  price: number
  image: string
  quantity: number
  variant?: string
  category: string
}

const cartItems = ref<CartItem[]>([])
const cartOpen = ref(false)

export function useCart() {
  const loadCart = () => {
    if (process.client) {
      const saved = localStorage.getItem('apex-cart')
      if (saved) cartItems.value = JSON.parse(saved)
    }
  }

  const saveCart = () => {
    if (process.client) {
      localStorage.setItem('apex-cart', JSON.stringify(cartItems.value))
    }
  }

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    const existing = cartItems.value.find(
      (i) => i.id === item.id && i.variant === item.variant
    )
    if (existing) {
      existing.quantity += quantity
    } else {
      cartItems.value.push({ ...item, quantity })
    }
    saveCart()
  }

  const removeFromCart = (id: number, variant?: string) => {
    cartItems.value = cartItems.value.filter(
      (i) => !(i.id === id && i.variant === variant)
    )
    saveCart()
  }

  const updateQuantity = (id: number, quantity: number, variant?: string) => {
    const item = cartItems.value.find(
      (i) => i.id === id && i.variant === variant
    )
    if (item) {
      if (quantity <= 0) {
        removeFromCart(id, variant)
      } else {
        item.quantity = quantity
        saveCart()
      }
    }
  }

  const clearCart = () => {
    cartItems.value = []
    saveCart()
  }

  const cartCount = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const cartTotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  return {
    cartItems: readonly(cartItems),
    cartOpen,
    cartCount,
    cartTotal,
    loadCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }
}
