<template>
  <div>
    <section class="pt-40 pb-16" style="background: var(--color-bg)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <h1 class="section-title mb-2">{{ $t('shop.wishlist') }}</h1>
        <p class="text-sm" style="color: var(--color-text-muted)">{{ wishlistCount }} saved items</p>
      </div>
    </section>

    <section class="pb-20" style="background: var(--color-bg)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div v-if="wishlistItems.length > 0">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              v-for="item in wishlistItems"
              :key="item.id"
              class="group card-glass rounded-sm overflow-hidden"
            >
              <div class="relative overflow-hidden" style="aspect-ratio: 1">
                <img :src="item.image" :alt="item.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <button
                  class="absolute top-3 right-3 w-8 h-8 glass rounded-sm flex items-center justify-center"
                  @click="removeFromWishlist(item.id)"
                >
                  <X class="w-4 h-4" style="color: #ff1744" />
                </button>
              </div>
              <div class="p-4">
                <p class="text-xs font-heading uppercase tracking-widest mb-1" style="color: var(--color-text-muted)">{{ item.category }}</p>
                <h3 class="font-heading font-bold text-sm uppercase tracking-wider mb-2" style="color: var(--color-text-primary)">{{ item.name }}</h3>
                <div class="flex items-center justify-between">
                  <span class="font-display text-xl" style="color: var(--color-accent)">${{ item.price }}</span>
                  <button
                    class="w-9 h-9 rounded-sm flex items-center justify-center text-black"
                    style="background: var(--color-accent)"
                    @click="moveToCart(item)"
                  >
                    <ShoppingCart class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-24">
          <Heart class="w-16 h-16 mx-auto mb-6 opacity-30" :style="{ color: 'var(--color-text-muted)' }" />
          <h2 class="font-display text-4xl uppercase mb-4" style="color: var(--color-text-primary)">{{ $t('shop.empty_wishlist') }}</h2>
          <p class="text-sm mb-8" style="color: var(--color-text-muted)">Save items you love to your wishlist</p>
          <NuxtLink :to="localePath('/shop')" class="btn-primary">Browse Shop</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { X, ShoppingCart, Heart } from 'lucide-vue-next'

useHead({ title: 'Wishlist — APEX FITNESS' })
const localePath = useLocalePath()
const { wishlistItems, wishlistCount, removeFromWishlist, loadWishlist } = useWishlist()
const { addToCart } = useCart()
const { success } = useToast()

onMounted(() => loadWishlist())

const moveToCart = (item: any) => {
  addToCart({ id: item.id, name: item.name, nameAr: item.nameAr, price: item.price, image: item.image, category: item.category })
  removeFromWishlist(item.id)
  success(`${item.name} moved to cart!`)
}
</script>
