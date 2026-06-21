<template>
  <div>
    <section class="pt-40 pb-20 relative overflow-hidden hero-grid" style="background: var(--color-bg)">
      <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 50% 50%, var(--color-accent), transparent 60%)" />
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 text-center">
        <p class="section-subtitle mb-4">{{ $t('bmi.subtitle') }}</p>
        <h1 class="section-title">{{ $t('bmi.title') }}</h1>
      </div>
    </section>

    <section class="py-16" style="background: var(--color-bg)">
      <div class="max-w-2xl mx-auto px-4">
        <div class="card-glass rounded-sm p-8">
          <!-- Unit Toggle -->
          <div class="flex gap-2 mb-8 p-1 rounded-sm" style="background: var(--color-surface-raised)">
            <button
              v-for="unit in ['metric', 'imperial']"
              :key="unit"
              class="flex-1 py-2 text-sm font-heading font-semibold uppercase tracking-widest rounded-sm transition-all duration-300"
              :style="{
                background: unitSystem === unit ? 'var(--color-accent)' : 'transparent',
                color: unitSystem === unit ? '#000' : 'var(--color-text-muted)',
              }"
              @click="unitSystem = unit"
            >
              {{ $t(`bmi.${unit}`) }}
            </button>
          </div>

          <!-- Inputs -->
          <div class="grid grid-cols-2 gap-6 mb-6">
            <!-- Gender -->
            <div class="col-span-2">
              <label class="block text-xs font-heading font-semibold uppercase tracking-widest mb-3" style="color: var(--color-text-secondary)">
                {{ $t('bmi.gender') }}
              </label>
              <div class="flex gap-3">
                <button
                  v-for="g in ['male', 'female']"
                  :key="g"
                  class="flex-1 py-3 text-sm font-heading font-semibold uppercase tracking-widest rounded-sm transition-all duration-200 flex items-center justify-center gap-2"
                  :style="{
                    background: gender === g ? 'var(--color-accent)' : 'var(--color-surface)',
                    color: gender === g ? '#000' : 'var(--color-text-secondary)',
                    border: `1px solid ${gender === g ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  }"
                  @click="gender = g"
                >
                  <component :is="g === 'male' ? User : UserX" class="w-4 h-4" />
                  {{ $t(`bmi.${g}`) }}
                </button>
              </div>
            </div>

            <!-- Age -->
            <div>
              <label class="block text-xs font-heading font-semibold uppercase tracking-widest mb-3" style="color: var(--color-text-secondary)">
                {{ $t('bmi.age') }}
              </label>
              <input
                v-model.number="age"
                type="number"
                min="1"
                max="120"
                class="w-full px-4 py-3 rounded-sm text-base outline-none transition-all duration-300"
                style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)"
              />
            </div>

            <!-- Weight -->
            <div>
              <label class="block text-xs font-heading font-semibold uppercase tracking-widest mb-3" style="color: var(--color-text-secondary)">
                {{ $t('bmi.weight') }} ({{ unitSystem === 'metric' ? $t('bmi.kg') : $t('bmi.lbs') }})
              </label>
              <input
                v-model.number="weight"
                type="number"
                class="w-full px-4 py-3 rounded-sm text-base outline-none transition-all duration-300"
                style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)"
              />
            </div>

            <!-- Height -->
            <div class="col-span-2">
              <label class="block text-xs font-heading font-semibold uppercase tracking-widest mb-3" style="color: var(--color-text-secondary)">
                {{ $t('bmi.height') }} ({{ unitSystem === 'metric' ? $t('bmi.cm') : $t('bmi.ft') }})
              </label>
              <input
                v-model.number="height"
                type="number"
                class="w-full px-4 py-3 rounded-sm text-base outline-none transition-all duration-300"
                style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)"
              />
            </div>
          </div>

          <button class="btn-primary w-full py-4 text-base" @click="calculate">
            {{ $t('bmi.calculate') }}
          </button>

          <!-- Result -->
          <Transition name="fade-up">
            <div v-if="bmiResult" class="mt-8 text-center">
              <div class="mb-6">
                <div
                  class="font-display text-8xl mb-2"
                  :style="{ color: bmiColor }"
                >
                  {{ bmiResult.toFixed(1) }}
                </div>
                <div class="font-heading font-bold text-xl uppercase tracking-widest" :style="{ color: bmiColor }">
                  {{ $t(`bmi.${bmiCategory}`) }}
                </div>
              </div>

              <!-- BMI Scale -->
              <div class="relative h-4 rounded-full overflow-hidden mb-4" style="background: var(--color-surface-raised)">
                <div
                  class="absolute inset-y-0 left-0 transition-all duration-1000"
                  :style="{
                    width: `${Math.min((bmiResult / 40) * 100, 100)}%`,
                    background: bmiColor,
                  }"
                />
              </div>
              <div class="flex justify-between text-xs" style="color: var(--color-text-muted)">
                <span>Underweight<br>&lt;18.5</span>
                <span>Normal<br>18.5-24.9</span>
                <span>Overweight<br>25-29.9</span>
                <span>Obese<br>&gt;30</span>
              </div>

              <!-- Recommendation -->
              <div
                class="mt-8 p-6 rounded-sm text-left"
                style="background: var(--color-surface); border: 1px solid var(--color-border)"
              >
                <h4 class="font-heading font-bold text-sm uppercase tracking-widest mb-2" style="color: var(--color-text-primary)">
                  {{ $t('bmi.recommendation') }}
                </h4>
                <p class="text-sm" style="color: var(--color-text-secondary)">{{ recommendation }}</p>
                <NuxtLink :to="localePath('/membership')" class="btn-primary mt-4 inline-flex items-center gap-2 text-sm py-2 px-6">
                  Get Personalized Plan
                  <ArrowRight class="w-4 h-4" />
                </NuxtLink>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { User, UserX, ArrowRight } from 'lucide-vue-next'

useHead({ title: 'BMI Calculator — APEX FITNESS' })
const localePath = useLocalePath()

const unitSystem = ref<'metric' | 'imperial'>('metric')
const gender = ref('male')
const age = ref(25)
const weight = ref(70)
const height = ref(175)
const bmiResult = ref<number | null>(null)

const bmiCategory = computed(() => {
  if (!bmiResult.value) return ''
  if (bmiResult.value < 18.5) return 'underweight'
  if (bmiResult.value < 25) return 'normal'
  if (bmiResult.value < 30) return 'overweight'
  return 'obese'
})

const bmiColor = computed(() => {
  const cat = bmiCategory.value
  if (cat === 'underweight') return '#00d4ff'
  if (cat === 'normal') return '#00e676'
  if (cat === 'overweight') return '#ffd700'
  return '#ff1744'
})

const recommendation = computed(() => {
  if (bmiCategory.value === 'underweight') {
    return 'Your BMI suggests you may be underweight. Our nutrition team can help you build a healthy weight through proper nutrition and strength training.'
  }
  if (bmiCategory.value === 'normal') {
    return 'Great job! You\'re in the healthy weight range. Our programs can help you maintain this and continue building strength and fitness.'
  }
  if (bmiCategory.value === 'overweight') {
    return 'Our HIIT and cardio programs combined with nutrition guidance can help you reach your ideal weight range safely and effectively.'
  }
  return 'Our comprehensive transformation programs combine personalized training, nutrition coaching, and ongoing support to help you achieve lasting results.'
})

const calculate = () => {
  let w = weight.value
  let h = height.value

  if (unitSystem.value === 'imperial') {
    w = w * 0.453592
    h = h * 30.48
  }

  const heightM = h / 100
  bmiResult.value = w / (heightM * heightM)
}
</script>

<style scoped>
.fade-up-enter-active { transition: all 0.5s ease; }
.fade-up-enter-from { opacity: 0; transform: translateY(20px); }
</style>
