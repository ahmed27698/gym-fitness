<template>
  <div v-if="product">
    <!-- Breadcrumb -->
    <section class="pt-32 pb-6 relative" style="background: var(--color-bg)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div class="flex items-center gap-2 text-xs" style="color: var(--color-text-muted)">
          <NuxtLink :to="localePath('/')">Home</NuxtLink>
          <ChevronRight class="w-3 h-3" />
          <NuxtLink :to="localePath('/shop')">Shop</NuxtLink>
          <ChevronRight class="w-3 h-3" />
          <span :style="{ color: 'var(--color-accent)' }">{{ product.name }}</span>
        </div>
      </div>
    </section>

    <!-- Product Detail -->
    <section class="py-10" style="background: var(--color-bg)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Images -->
          <div>
            <div class="rounded-sm overflow-hidden mb-4" style="aspect-ratio: 1; background: var(--color-surface)">
              <img
                :src="product.images[activeImage]"
                :alt="product.name"
                class="w-full h-full object-cover"
              />
            </div>
            <div v-if="product.images.length > 1" class="flex gap-3">
              <button
                v-for="(img, i) in product.images"
                :key="i"
                class="w-20 h-20 rounded-sm overflow-hidden transition-all duration-200"
                :style="{ border: `2px solid ${activeImage === i ? 'var(--color-accent)' : 'var(--color-border)'}` }"
                @click="activeImage = i"
              >
                <img :src="img" :alt="`View ${i + 1}`" class="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          <!-- Info -->
          <div>
            <div class="flex items-center gap-3 mb-3">
              <span class="text-xs font-heading font-semibold uppercase tracking-widest px-2 py-1 rounded-sm" style="background: var(--color-surface-raised); color: var(--color-accent)">
                {{ product.category }}
              </span>
              <span v-if="product.badge" class="text-xs font-heading font-bold uppercase tracking-widest px-2 py-1 rounded-sm text-black" :style="{ background: 'var(--color-accent)' }">
                {{ product.badge }}
              </span>
            </div>

            <h1 class="font-heading font-bold text-3xl md:text-4xl uppercase tracking-wider mb-4" style="color: var(--color-text-primary)">
              {{ product.name }}
            </h1>

            <!-- Rating -->
            <div class="flex items-center gap-3 mb-4">
              <div class="flex gap-1">
                <Star v-for="i in 5" :key="i" class="w-4 h-4" :style="{ color: i <= Math.round(product.rating) ? '#ffd700' : 'var(--color-border)', fill: i <= Math.round(product.rating) ? '#ffd700' : 'none' }" />
              </div>
              <span class="text-sm" style="color: var(--color-text-muted)">{{ product.rating }} ({{ product.reviews }} reviews)</span>
            </div>

            <!-- Price -->
            <div class="flex items-baseline gap-3 mb-6">
              <span class="font-display text-5xl" style="color: var(--color-accent)">${{ product.price }}</span>
              <span v-if="product.discount > 0" class="text-xl line-through" style="color: var(--color-text-muted)">${{ product.originalPrice }}</span>
              <span v-if="product.discount > 0" class="text-sm font-heading font-bold uppercase px-2 py-1 rounded-sm text-black" style="background: #ff1744">-{{ product.discount }}%</span>
            </div>

            <p class="text-base leading-relaxed mb-6" style="color: var(--color-text-secondary)">{{ product.description }}</p>

            <!-- Features -->
            <div class="mb-6">
              <p class="text-xs font-heading font-bold uppercase tracking-widest mb-3" style="color: var(--color-accent)">Features</p>
              <ul class="grid grid-cols-2 gap-2">
                <li v-for="feat in product.features" :key="feat" class="text-sm flex items-center gap-2" style="color: var(--color-text-secondary)">
                  <CheckCircle2 class="w-4 h-4 flex-shrink-0" :style="{ color: 'var(--color-accent)' }" />
                  {{ feat }}
                </li>
              </ul>
            </div>

            <!-- Variants -->
            <div v-if="product.variants.length > 1" class="mb-6">
              <p class="text-xs font-heading font-bold uppercase tracking-widest mb-3" style="color: var(--color-accent)">Select Option</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="v in product.variants"
                  :key="v"
                  class="px-4 py-2 text-sm font-heading font-semibold uppercase tracking-wider rounded-sm transition-all duration-200"
                  :style="{
                    background: selectedVariant === v ? 'var(--color-accent)' : 'var(--color-surface)',
                    color: selectedVariant === v ? '#000' : 'var(--color-text-secondary)',
                    border: `1px solid ${selectedVariant === v ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  }"
                  @click="selectedVariant = v"
                >
                  {{ v }}
                </button>
              </div>
            </div>

            <!-- Quantity -->
            <div class="flex items-center gap-4 mb-6">
              <div class="flex items-center gap-2 rounded-sm overflow-hidden" style="border: 1px solid var(--color-border)">
                <button class="w-10 h-10 flex items-center justify-center text-lg font-bold transition-colors" style="color: var(--color-text-primary)" @click="qty = Math.max(1, qty - 1)">–</button>
                <span class="w-12 text-center font-heading font-bold text-base" style="color: var(--color-text-primary)">{{ qty }}</span>
                <button class="w-10 h-10 flex items-center justify-center text-lg font-bold transition-colors" style="color: var(--color-text-primary)" @click="qty++">+</button>
              </div>
              <span v-if="product.stock > 0" class="text-sm flex items-center gap-1" style="color: '#00e676'">
                <CheckCircle2 class="w-4 h-4" style="color: #00e676" />
                <span style="color: #00e676">In Stock ({{ product.stock }})</span>
              </span>
              <span v-else class="text-sm" style="color: #ff1744">Out of Stock</span>
            </div>

            <!-- Actions -->
            <div class="flex gap-3">
              <button
                class="flex-1 btn-primary py-4 text-base flex items-center justify-center gap-2"
                :disabled="product.stock === 0"
                @click="addProduct"
              >
                <ShoppingCart class="w-5 h-5" />
                Add to Cart
              </button>
              <button
                class="w-14 h-14 flex items-center justify-center rounded-sm transition-all duration-200 hover:scale-110"
                style="border: 1px solid var(--color-border); background: var(--color-surface)"
                @click="toggleWishlist({ id: product.id, name: product.name, nameAr: product.nameAr, price: product.price, image: product.images[0], category: product.category, rating: product.rating })"
              >
                <Heart
                  class="w-5 h-5"
                  :style="{ color: isInWishlist(product.id) ? '#ff1744' : 'var(--color-text-secondary)', fill: isInWishlist(product.id) ? '#ff1744' : 'none' }"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Products -->
    <section class="py-16" style="background: var(--color-bg-secondary)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 class="section-title mb-8">Related Products</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <NuxtLink
            v-for="p in relatedProducts"
            :key="p.id"
            :to="localePath(`/shop/${p.id}`)"
            class="group card-glass rounded-sm overflow-hidden"
          >
            <div class="overflow-hidden" style="aspect-ratio: 1">
              <img :src="p.images[0]" :alt="p.name" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div class="p-4">
              <h3 class="font-heading font-bold text-sm uppercase tracking-wider mb-1" style="color: var(--color-text-primary)">{{ p.name }}</h3>
              <span class="font-display text-xl" style="color: var(--color-accent)">${{ p.price }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="pt-40 text-center py-20">
    <p style="color: var(--color-text-muted)">Product not found</p>
    <NuxtLink :to="localePath('/shop')" class="btn-primary mt-4 inline-block">Back to Shop</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, Star, CheckCircle2, ShoppingCart, Heart } from 'lucide-vue-next'
import productsData from '~/data/products.json'

const localePath = useLocalePath()
const route = useRoute()
const { addToCart } = useCart()
const { toggleWishlist, isInWishlist } = useWishlist()
const { success } = useToast()

const product = computed(() => productsData.find((p) => p.id === Number(route.params.id)))
const relatedProducts = computed(() => productsData.filter((p) => p.id !== Number(route.params.id) && p.category === product.value?.category).slice(0, 4))

const activeImage = ref(0)
const selectedVariant = ref('')
const qty = ref(1)

watchEffect(() => {
  if (product.value?.variants[0]) {
    selectedVariant.value = product.value.variants[0]
  }
})

useHead(() => ({
  title: product.value ? `${product.value.name} — APEX FITNESS` : 'Product — APEX FITNESS',
}))

const addProduct = () => {
  if (!product.value) return
  addToCart({
    id: product.value.id,
    name: product.value.name,
    nameAr: product.value.nameAr,
    price: product.value.price,
    image: product.value.images[0],
    category: product.value.category,
    variant: selectedVariant.value,
  }, qty.value)
  success(`${product.value.name} added to cart!`)
}
</script>
