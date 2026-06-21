<template>
  <div>
    <section class="pt-40 pb-20 relative overflow-hidden hero-grid" style="background: var(--color-bg)">
      <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 40% 50%, var(--color-accent), transparent 60%)" />
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12 text-center">
        <p class="section-subtitle mb-4">{{ $t('contact.subtitle') }}</p>
        <h1 class="section-title">{{ $t('contact.title') }}</h1>
      </div>
    </section>

    <section class="py-16" style="background: var(--color-bg)">
      <div class="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">
        <div class="grid lg:grid-cols-2 gap-16">
          <!-- Form -->
          <div>
            <div class="card-glass rounded-sm p-8">
              <div class="grid grid-cols-2 gap-6 mb-6">
                <div class="col-span-2 md:col-span-1">
                  <label class="block text-xs font-heading font-semibold uppercase tracking-widest mb-2" style="color: var(--color-text-secondary)">{{ $t('contact.name') }}</label>
                  <input v-model="form.name" type="text" class="w-full px-4 py-3 rounded-sm text-sm outline-none" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)" />
                </div>
                <div class="col-span-2 md:col-span-1">
                  <label class="block text-xs font-heading font-semibold uppercase tracking-widest mb-2" style="color: var(--color-text-secondary)">{{ $t('contact.email') }}</label>
                  <input v-model="form.email" type="email" class="w-full px-4 py-3 rounded-sm text-sm outline-none" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)" />
                </div>
                <div class="col-span-2">
                  <label class="block text-xs font-heading font-semibold uppercase tracking-widest mb-2" style="color: var(--color-text-secondary)">{{ $t('contact.phone') }}</label>
                  <input v-model="form.phone" type="tel" class="w-full px-4 py-3 rounded-sm text-sm outline-none" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)" />
                </div>
                <div class="col-span-2">
                  <label class="block text-xs font-heading font-semibold uppercase tracking-widest mb-2" style="color: var(--color-text-secondary)">{{ $t('contact.subject') }}</label>
                  <select v-model="form.subject" class="w-full px-4 py-3 rounded-sm text-sm outline-none" style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)">
                    <option value="">Select a topic...</option>
                    <option value="membership">Membership Inquiry</option>
                    <option value="training">Personal Training</option>
                    <option value="classes">Group Classes</option>
                    <option value="nutrition">Nutrition</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div class="col-span-2">
                  <label class="block text-xs font-heading font-semibold uppercase tracking-widest mb-2" style="color: var(--color-text-secondary)">{{ $t('contact.message') }}</label>
                  <textarea
                    v-model="form.message"
                    rows="5"
                    class="w-full px-4 py-3 rounded-sm text-sm outline-none resize-none"
                    style="background: var(--color-surface); border: 1px solid var(--color-border); color: var(--color-text-primary)"
                  />
                </div>
              </div>

              <button class="btn-primary w-full py-4" :disabled="sending" @click="send">
                <span v-if="!sending" class="flex items-center justify-center gap-2">
                  {{ $t('contact.send') }}
                  <Send class="w-4 h-4" />
                </span>
                <span v-else>Sending...</span>
              </button>

              <Transition name="fade">
                <div v-if="sent" class="mt-4 flex items-center gap-2 text-sm" style="color: var(--color-accent)">
                  <CheckCircle2 class="w-4 h-4" />
                  {{ $t('contact.success') }}
                </div>
              </Transition>
            </div>
          </div>

          <!-- Info -->
          <div class="space-y-6">
            <div
              v-for="info in contactInfo"
              :key="info.label"
              class="card-glass rounded-sm p-6 flex gap-4"
            >
              <div
                class="w-12 h-12 flex-shrink-0 rounded-sm flex items-center justify-center"
                style="background: var(--color-surface-raised)"
              >
                <component :is="info.icon" class="w-5 h-5" :style="{ color: 'var(--color-accent)' }" />
              </div>
              <div>
                <p class="text-xs font-heading font-semibold uppercase tracking-widest mb-1" style="color: var(--color-accent)">{{ $t(info.label) }}</p>
                <p class="text-sm" style="color: var(--color-text-secondary)">{{ info.value }}</p>
              </div>
            </div>

            <!-- Map placeholder -->
            <div
              class="rounded-sm overflow-hidden flex items-center justify-center"
              style="height: 250px; background: var(--color-surface); border: 1px solid var(--color-border)"
            >
              <div class="text-center">
                <MapPin class="w-8 h-8 mx-auto mb-2" :style="{ color: 'var(--color-accent)' }" />
                <p class="text-sm" style="color: var(--color-text-muted)">Interactive Map</p>
                <p class="text-xs" style="color: var(--color-text-muted)">Dubai, UAE</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Send, CheckCircle2, MapPin, Phone, Mail, Clock } from 'lucide-vue-next'

useHead({ title: 'Contact — APEX FITNESS' })
const { success } = useToast()

const form = ref({ name: '', email: '', phone: '', subject: '', message: '' })
const sending = ref(false)
const sent = ref(false)

const contactInfo = [
  { label: 'contact.address', icon: MapPin, value: 'Downtown Dubai, Sheikh Zayed Rd, Dubai, UAE' },
  { label: 'contact.phone_label', icon: Phone, value: '+971 4 123 4567' },
  { label: 'contact.email_label', icon: Mail, value: 'hello@apexfitness.com' },
  { label: 'contact.hours', icon: Clock, value: 'Mon–Fri: 5am–11pm | Sat–Sun: 7am–9pm' },
]

const send = async () => {
  if (!form.value.name || !form.value.email) return
  sending.value = true
  await new Promise((r) => setTimeout(r, 1500))
  sending.value = false
  sent.value = true
  success('Message sent successfully!')
}
</script>
