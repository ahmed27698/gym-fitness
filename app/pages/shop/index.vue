<template>
  <div>
    <!-- Hero -->
    <section class="pt-40 pb-16 relative overflow-hidden hero-grid" style="background: var(--color-bg)">
      <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 70% 50%, var(--color-accent), transparent 60%)" />
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div class="flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <p class="section-subtitle mb-4">{{ $t('shop.subtitle') }}</p>
            <h1 class="section-title">{{ $t('shop.title') }}</h1>
          </div>

          <!-- Search -->
          <div class="relative mt-6 md:mt-0 w-full md:w-80">
            <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" :style="{ color: 'var(--color-text-muted)' }" />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('shop.search')"
              class="w-full pl-12 pr-4 py-3 rounded-sm text-sm outline-none"
              style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="py-10" style="background: var(--color-bg)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div class="flex flex-col lg:flex-row gap-10">
          <!-- Sidebar Filters -->
          <aside class="lg:w-64 flex-shrink-0">
            <div class="card-glass rounded-sm p-6 sticky top-28">
              <h3 class="font-heading font-bold text-sm uppercase tracking-widest mb-6" style="color: var(--color-text-primary)">
                <Filter class="w-4 h-4 inline mr-2" />
                {{ $t('shop.filter') }}
              </h3>

              <!-- Categories -->
              <div class="mb-6">
                <p class="text-xs font-heading uppercase tracking-widest mb-3" style="color: var(--color-text-muted)">Category</p>
                <div class="space-y-2">
                  <label
                    v-for="cat in allCategories"
                    :key="cat"
                    class="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      :value="cat"
                      v-model="selectedCategories"
                      class="hidden"
                    />
                    <div
                      class="w-4 h-4 rounded-sm border flex items-center justify-center transition-all duration-200"
                      :style="{
                        borderColor: selectedCategories.includes(cat) ? 'var(--color-accent)' : 'var(--color-border)',
                        background: selectedCategories.includes(cat) ? 'var(--color-accent)' : 'transparent',
                      }"
                      @click="toggleCategory(cat)"
                    >
                      <Check v-if="selectedCategories.includes(cat)" class="w-2.5 h-2.5 text-black" />
                    </div>
                    <span
                      class="text-sm transition-colors duration-200"
                      :style="{ color: selectedCategories.includes(cat) ? 'var(--color-accent)' : 'var(--color-text-secondary)' }"
                    >
                      {{ cat }}
                    </span>
                  </label>
                </div>
              </div>

              <!-- Price Range -->
              <div class="mb-6">
                <p class="text-xs font-heading uppercase tracking-widest mb-3" style="color: var(--color-text-muted)">Price Range</p>
                <div class="flex items-center gap-3">
                  <input v-model.number="priceMin" type="number" placeholder="Min" class="w-full px-3 py-2 rounded-sm text-sm outline-none" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)" />
                  <span style="color: var(--color-text-muted)">–</span>
                  <input v-model.number="priceMax" type="number" placeholder="Max" class="w-full px-3 py-2 rounded-sm text-sm outline-none" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)" />
                </div>
              </div>

              <!-- In Stock -->
              <div>
                <label class="flex items-center gap-3 cursor-pointer">
                  <div
                    class="w-4 h-4 rounded-sm border flex items-center justify-center transition-all duration-200"
                    :style="{
                      borderColor: inStockOnly ? 'var(--color-accent)' : 'var(--color-border)',
                      background: inStockOnly ? 'var(--color-accent)' : 'transparent',
                    }"
                    @click="inStockOnly = !inStockOnly"
                  >
                    <Check v-if="inStockOnly" class="w-2.5 h-2.5 text-black" />
                  </div>
                  <span class="text-sm" style="color: var(--color-text-secondary)">In Stock Only</span>
                </label>
              </div>
            </div>
          </aside>

          <!-- Products Grid -->
          <div class="flex-1">
            <!-- Sort Bar -->
            <div class="flex items-center justify-between mb-6">
              <p class="text-sm" style="color: var(--color-text-muted)">
                {{ filteredProducts.length }} products
              </p>
              <select
                v-model="sortBy"
                class="px-4 py-2 rounded-sm text-sm outline-none"
                style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)"
              >
                <option value="featured">{{ $t('shop.sort_featured') }}</option>
                <option value="price-low">{{ $t('shop.sort_price_low') }}</option>
                <option value="price-high">{{ $t('shop.sort_price_high') }}</option>
                <option value="newest">{{ $t('shop.sort_newest') }}</option>
                <option value="rating">{{ $t('shop.sort_rating') }}</option>
              </select>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              <div
                v-for="product in filteredProducts"
                :key="product.id"
                class="group card-glass rounded-sm overflow-hidden relative"
              >
                <!-- Badge -->
                <div
                  v-if="product.badge"
                  class="absolute top-3 left-3 z-10 text-xs font-heading font-bold uppercase tracking-widest px-2 py-1 rounded-sm text-black"
                  :style="{ background: 'var(--color-accent)' }"
                >
                  {{ product.badge }}
                </div>

                <!-- Wishlist -->
                <button
                  class="absolute top-3 right-3 z-10 w-8 h-8 glass rounded-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
                  @click="toggleWishlist({ id: product.id, name: product.name, nameAr: product.nameAr, price: product.price, image: product.images[0], category: product.category, rating: product.rating })"
                >
                  <Heart
                    class="w-4 h-4"
                    :style="{
                      color: isInWishlist(product.id) ? '#ff1744' : 'var(--color-text-secondary)',
                      fill: isInWishlist(product.id) ? '#ff1744' : 'none',
                    }"
                  />
                </button>

                <!-- Image -->
                <div class="relative overflow-hidden" style="aspect-ratio: 1">
                  <img
                    :src="product.images[0]"
                    :alt="product.name"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div
                    class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style="background: rgba(0,0,0,0.4)"
                  >
                    <button
                      class="text-xs font-heading font-bold uppercase tracking-widest px-4 py-2 rounded-sm text-black"
                      style="background: var(--color-accent)"
                    >
                      {{ $t('shop.quick_view') }}
                    </button>
                  </div>
                </div>

                <!-- Info -->
                <div class="p-5">
                  <p class="text-xs font-heading uppercase tracking-widest mb-1" style="color: var(--color-text-muted)">{{ product.category }}</p>
                  <h3 class="font-heading font-bold text-base uppercase tracking-wider mb-2" style="color: var(--color-text-primary)">{{ product.name }}</h3>

                  <!-- Rating -->
                  <div class="flex items-center gap-2 mb-3">
                    <div class="flex gap-0.5">
                      <Star v-for="i in 5" :key="i" class="w-3 h-3" :style="{ color: i <= Math.round(product.rating) ? '#ffd700' : 'var(--color-border)', fill: i <= Math.round(product.rating) ? '#ffd700' : 'none' }" />
                    </div>
                    <span class="text-xs" style="color: var(--color-text-muted)">({{ product.reviews }})</span>
                  </div>

                  <!-- Price + Add to cart -->
                  <div class="flex items-center justify-between">
                    <div class="flex items-baseline gap-2">
                      <span class="font-display text-2xl" style="color: var(--color-accent)">${{ product.price }}</span>
                      <span v-if="product.discount > 0" class="text-xs line-through" style="color: var(--color-text-muted)">${{ product.originalPrice }}</span>
                    </div>
                    <button
                      class="w-9 h-9 rounded-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style="background: var(--color-accent)"
                      :disabled="product.stock === 0"
                      @click="addProduct(product)"
                    >
                      <ShoppingCart class="w-4 h-4 text-black" />
                    </button>
                  </div>

                  <div v-if="product.stock === 0" class="mt-2">
                    <span class="text-xs font-heading font-semibold uppercase" style="color: #ff1744">{{ $t('shop.out_of_stock') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Search, Filter, Heart, ShoppingCart, Star, Check } from 'lucide-vue-next'
import productsData from '~/data/products.json'

useHead({ title: 'Shop — APEX FITNESS' })

const { addToCart } = useCart()
const { toggleWishlist, isInWishlist } = useWishlist()
const { success } = useToast()

const searchQuery = ref('')
const sortBy = ref('featured')
const selectedCategories = ref<string[]>([])
const priceMin = ref<number | undefined>(undefined)
const priceMax = ref<number | undefined>(undefined)
const inStockOnly = ref(false)

const allCategories = [...new Set(productsData.map((p) => p.category))]

const toggleCategory = (cat: string) => {
  const i = selectedCategories.value.indexOf(cat)
  if (i > -1) selectedCategories.value.splice(i, 1)
  else selectedCategories.value.push(cat)
}

const filteredProducts = computed(() => {
  let products = [...productsData]

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    products = products.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
  }

  if (selectedCategories.value.length > 0) {
    products = products.filter((p) => selectedCategories.value.includes(p.category))
  }

  if (priceMin.value !== undefined) {
    products = products.filter((p) => p.price >= priceMin.value!)
  }

  if (priceMax.value !== undefined) {
    products = products.filter((p) => p.price <= priceMax.value!)
  }

  if (inStockOnly.value) {
    products = products.filter((p) => p.stock > 0)
  }

  if (sortBy.value === 'price-low') products.sort((a, b) => a.price - b.price)
  else if (sortBy.value === 'price-high') products.sort((a, b) => b.price - a.price)
  else if (sortBy.value === 'rating') products.sort((a, b) => b.rating - a.rating)

  return products
})

const addProduct = (product: any) => {
  addToCart({
    id: product.id,
    name: product.name,
    nameAr: product.nameAr,
    price: product.price,
    image: product.images[0],
    category: product.category,
  })
  success(`${product.name} added to cart!`)
}
</script>
