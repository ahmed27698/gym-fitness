export interface WishlistItem {
  id: number
  name: string
  nameAr: string
  price: number
  image: string
  category: string
  rating: number
}

const wishlistItems = ref<WishlistItem[]>([])

export function useWishlist() {
  const loadWishlist = () => {
    if (process.client) {
      const saved = localStorage.getItem('apex-wishlist')
      if (saved) wishlistItems.value = JSON.parse(saved)
    }
  }

  const saveWishlist = () => {
    if (process.client) {
      localStorage.setItem('apex-wishlist', JSON.stringify(wishlistItems.value))
    }
  }

  const addToWishlist = (item: WishlistItem) => {
    if (!isInWishlist(item.id)) {
      wishlistItems.value.push(item)
      saveWishlist()
    }
  }

  const removeFromWishlist = (id: number) => {
    wishlistItems.value = wishlistItems.value.filter((i) => i.id !== id)
    saveWishlist()
  }

  const toggleWishlist = (item: WishlistItem) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id)
    } else {
      addToWishlist(item)
    }
  }

  const isInWishlist = (id: number) =>
    wishlistItems.value.some((i) => i.id === id)

  const wishlistCount = computed(() => wishlistItems.value.length)

  return {
    wishlistItems: readonly(wishlistItems),
    wishlistCount,
    loadWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
  }
}
