
<template>
  <div>
    <section class="pt-40 pb-16 relative" style="background: var(--color-bg)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <h1 class="section-title mb-2">{{ $t('shop.cart') }}</h1>
        <p class="text-sm" style="color: var(--color-text-muted)">{{ cartCount }} items in your cart</p>
      </div>
    </section>

    <section class="pb-20" style="background: var(--color-bg)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div v-if="cartItems.length > 0" class="grid lg:grid-cols-3 gap-10">
          <!-- Cart Items -->
          <div class="lg:col-span-2 space-y-4">
            <div
              v-for="item in cartItems"
              :key="`${item.id}-${item.variant}`"
              class="card-glass rounded-sm p-4 flex gap-4 items-center"
            >
              <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded-sm flex-shrink-0" />
              <div class="flex-1">
                <p class="text-xs font-heading uppercase tracking-widest mb-1" style="color: var(--color-text-muted)">{{ item.category }}</p>
                <h3 class="font-heading font-bold text-base uppercase tracking-wider" style="color: var(--color-text-primary)">{{ item.name }}</h3>
                <p v-if="item.variant" class="text-xs mt-1" style="color: var(--color-text-muted)">{{ item.variant }}</p>
              </div>
              <div class="flex items-center gap-3">
                <button
                  class="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold transition-all duration-200"
                  style="background: var(--color-surface-raised); color: var(--color-text-primary)"
                  @click="updateQuantity(item.id, item.quantity - 1, item.variant)"
                >
                  –
                </button>
                <span class="w-8 text-center font-heading font-bold" style="color: var(--color-text-primary)">{{ item.quantity }}</span>
                <button
                  class="w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold transition-all duration-200"
                  style="background: var(--color-surface-raised); color: var(--color-text-primary)"
                  @click="updateQuantity(item.id, item.quantity + 1, item.variant)"
                >
                  +
                </button>
              </div>
              <div class="text-right">
                <p class="font-display text-xl" style="color: var(--color-accent)">${{ (item.price * item.quantity).toFixed(2) }}</p>
                <button
                  class="text-xs mt-1 hover:opacity-60 transition-opacity"
                  style="color: '#ff1744'"
                  @click="removeFromCart(item.id, item.variant)"
                >
                  <Trash2 class="w-4 h-4" style="color: #ff1744" />
                </button>
              </div>
            </div>
          </div>

          <!-- Summary -->
          <div>
            <div class="card-glass rounded-sm p-6 sticky top-28">
              <h3 class="font-heading font-bold text-lg uppercase tracking-wider mb-6" style="color: var(--color-text-primary)">Order Summary</h3>

              <div class="space-y-3 mb-6">
                <div class="flex justify-between text-sm" style="color: var(--color-text-secondary)">
                  <span>{{ $t('shop.subtotal') }}</span>
                  <span>${{ cartTotal.toFixed(2) }}</span>
                </div>
                <div class="flex justify-between text-sm" style="color: var(--color-text-secondary)">
                  <span>{{ $t('shop.shipping') }}</span>
                  <span style="color: var(--color-accent)">{{ cartTotal > 100 ? $t('shop.free_shipping') : '$9.99' }}</span>
                </div>
              </div>

              <!-- Coupon -->
              <div class="flex gap-2 mb-6">
                <input
                  v-model="coupon"
                  type="text"
                  :placeholder="$t('shop.coupon')"
                  class="flex-1 px-4 py-2 rounded-sm text-sm outline-none"
                  style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)"
                />
                <button
                  class="btn-outline text-xs py-2 px-4"
                  @click="applyCoupon"
                >
                  {{ $t('shop.apply') }}
                </button>
              </div>

              <div
                class="flex justify-between text-lg font-heading font-bold mb-6 pt-4"
                style="color: var(--color-text-primary); border-top: 1px solid var(--color-border)"
              >
                <span>{{ $t('shop.total') }}</span>
                <span :style="{ color: 'var(--color-accent)' }">
                  ${{ (cartTotal + (cartTotal > 100 ? 0 : 9.99)).toFixed(2) }}
                </span>
              </div>

              <NuxtLink :to="localePath('/shop/checkout')" class="btn-primary w-full text-center py-4 block">
                {{ $t('shop.checkout') }}
                <ArrowRight class="w-4 h-4 inline ml-2" />
              </NuxtLink>

              <NuxtLink :to="localePath('/shop')" class="btn-outline w-full text-center py-3 block mt-3 text-sm">
                Continue Shopping
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Empty Cart -->
        <div v-else class="text-center py-24">
          <ShoppingCart class="w-16 h-16 mx-auto mb-6 opacity-30" :style="{ color: 'var(--color-text-muted)' }" />
          <h2 class="font-display text-4xl uppercase mb-4" style="color: var(--color-text-primary)">{{ $t('shop.empty_cart') }}</h2>
          <p class="text-sm mb-8" style="color: var(--color-text-muted)">Browse our shop and add some products!</p>
          <NuxtLink :to="localePath('/shop')" class="btn-primary">Go to Shop</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Trash2, ShoppingCart, ArrowRight } from 'lucide-vue-next'

useHead({ title: 'Cart — APEX FITNESS' })
const localePath = useLocalePath()
const { success, error } = useToast()
const { cartItems, cartCount, cartTotal, updateQuantity, removeFromCart, loadCart } = useCart()

const coupon = ref('')

onMounted(() => loadCart())

const applyCoupon = () => {
  if (coupon.value.toUpperCase() === 'APEX20') {
    success('Coupon applied! 20% discount added.')
  } else {
    error('Invalid coupon code')
  }
}
</script>
