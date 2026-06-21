<template>
  <div>
    <section class="pt-40 pb-16" style="background: var(--color-bg)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <h1 class="section-title">{{ $t('shop.checkout') }}</h1>
      </div>
    </section>

    <section class="pb-20" style="background: var(--color-bg)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div v-if="!orderPlaced" class="grid lg:grid-cols-2 gap-10">
          <!-- Form -->
          <div class="space-y-6">
            <!-- Personal Info -->
            <div class="card-glass rounded-sm p-6">
              <h3 class="font-heading font-bold text-base uppercase tracking-widest mb-6 flex items-center gap-2" style="color: var(--color-accent)">
                <User class="w-4 h-4" />
                Personal Information
              </h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-heading uppercase tracking-widest mb-2" style="color: var(--color-text-secondary)">First Name</label>
                  <input v-model="form.firstName" type="text" class="w-full px-4 py-3 rounded-sm text-sm outline-none" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)" />
                </div>
                <div>
                  <label class="block text-xs font-heading uppercase tracking-widest mb-2" style="color: var(--color-text-secondary)">Last Name</label>
                  <input v-model="form.lastName" type="text" class="w-full px-4 py-3 rounded-sm text-sm outline-none" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)" />
                </div>
                <div class="col-span-2">
                  <label class="block text-xs font-heading uppercase tracking-widest mb-2" style="color: var(--color-text-secondary)">Email</label>
                  <input v-model="form.email" type="email" class="w-full px-4 py-3 rounded-sm text-sm outline-none" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)" />
                </div>
                <div class="col-span-2">
                  <label class="block text-xs font-heading uppercase tracking-widest mb-2" style="color: var(--color-text-secondary)">Phone</label>
                  <input v-model="form.phone" type="tel" class="w-full px-4 py-3 rounded-sm text-sm outline-none" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)" />
                </div>
              </div>
            </div>

            <!-- Shipping -->
            <div class="card-glass rounded-sm p-6">
              <h3 class="font-heading font-bold text-base uppercase tracking-widest mb-6 flex items-center gap-2" style="color: var(--color-accent)">
                <MapPin class="w-4 h-4" />
                Shipping Address
              </h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-heading uppercase tracking-widest mb-2" style="color: var(--color-text-secondary)">Address</label>
                  <input v-model="form.address" type="text" class="w-full px-4 py-3 rounded-sm text-sm outline-none" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-heading uppercase tracking-widest mb-2" style="color: var(--color-text-secondary)">City</label>
                    <input v-model="form.city" type="text" class="w-full px-4 py-3 rounded-sm text-sm outline-none" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)" />
                  </div>
                  <div>
                    <label class="block text-xs font-heading uppercase tracking-widest mb-2" style="color: var(--color-text-secondary)">Country</label>
                    <input v-model="form.country" type="text" class="w-full px-4 py-3 rounded-sm text-sm outline-none" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment -->
            <div class="card-glass rounded-sm p-6">
              <h3 class="font-heading font-bold text-base uppercase tracking-widest mb-6 flex items-center gap-2" style="color: var(--color-accent)">
                <CreditCard class="w-4 h-4" />
                Payment Details
              </h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-heading uppercase tracking-widest mb-2" style="color: var(--color-text-secondary)">Card Number</label>
                  <input type="text" placeholder="•••• •••• •••• ••••" class="w-full px-4 py-3 rounded-sm text-sm outline-none" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-heading uppercase tracking-widest mb-2" style="color: var(--color-text-secondary)">Expiry</label>
                    <input type="text" placeholder="MM/YY" class="w-full px-4 py-3 rounded-sm text-sm outline-none" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)" />
                  </div>
                  <div>
                    <label class="block text-xs font-heading uppercase tracking-widest mb-2" style="color: var(--color-text-secondary)">CVV</label>
                    <input type="text" placeholder="•••" class="w-full px-4 py-3 rounded-sm text-sm outline-none" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div>
            <div class="card-glass rounded-sm p-6 sticky top-28">
              <h3 class="font-heading font-bold text-base uppercase tracking-widest mb-6" style="color: var(--color-text-primary)">Order Summary</h3>
              <div class="space-y-3 mb-6">
                <div v-for="item in cartItems" :key="item.id" class="flex items-center gap-3">
                  <img :src="item.image" :alt="item.name" class="w-12 h-12 object-cover rounded-sm" />
                  <div class="flex-1">
                    <p class="text-sm font-heading font-semibold uppercase" style="color: var(--color-text-primary)">{{ item.name }}</p>
                    <p class="text-xs" style="color: var(--color-text-muted)">Qty: {{ item.quantity }}</p>
                  </div>
                  <span class="text-sm font-semibold" style="color: var(--color-accent)">${{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>
              <div style="border-top: 1px solid var(--color-border)" class="pt-4">
                <div class="flex justify-between text-lg font-bold font-heading mb-6">
                  <span style="color: var(--color-text-primary)">Total</span>
                  <span :style="{ color: 'var(--color-accent)' }">${{ cartTotal.toFixed(2) }}</span>
                </div>
                <button
                  class="btn-primary w-full py-4 text-base"
                  :disabled="placing"
                  @click="placeOrder"
                >
                  <span v-if="!placing" class="flex items-center justify-center gap-2">
                    Place Order
                    <ShoppingBag class="w-4 h-4" />
                  </span>
                  <span v-else>Processing...</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Success State -->
        <div v-else class="text-center py-24">
          <div
            class="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
            style="background: var(--color-accent)"
          >
            <CheckCircle2 class="w-12 h-12 text-black" />
          </div>
          <h2 class="font-display text-5xl uppercase mb-4" style="color: var(--color-text-primary)">Order Placed!</h2>
          <p class="text-base mb-8" style="color: var(--color-text-secondary)">
            Thank you for your order. You'll receive a confirmation email shortly.
          </p>
          <NuxtLink :to="localePath('/shop')" class="btn-primary">Continue Shopping</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { User, MapPin, CreditCard, ShoppingBag, CheckCircle2 } from 'lucide-vue-next'

useHead({ title: 'Checkout — APEX FITNESS' })
const localePath = useLocalePath()
const { cartItems, cartTotal, clearCart, loadCart } = useCart()
const { success } = useToast()

onMounted(() => loadCart())

const form = ref({
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: '', country: '',
})
const placing = ref(false)
const orderPlaced = ref(false)

const placeOrder = async () => {
  placing.value = true
  await new Promise((r) => setTimeout(r, 2000))
  placing.value = false
  orderPlaced.value = true
  clearCart()
  success('Order placed successfully!')
}
</script>
