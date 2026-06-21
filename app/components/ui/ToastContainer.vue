<template>
  <Teleport to="body">
    <div class="fixed top-6 right-6 z-[200] flex flex-col gap-3 max-w-sm w-full">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="glass-strong rounded-sm px-4 py-3 flex items-center gap-3 shadow-xl"
          :style="{
            border: `1px solid ${toastColors[toast.type]}40`,
          }"
        >
          <component
            :is="toastIcons[toast.type]"
            class="w-5 h-5 flex-shrink-0"
            :style="{ color: toastColors[toast.type] }"
          />
          <p class="text-sm flex-1" :style="{ color: 'var(--color-text-primary)' }">
            {{ toast.message }}
          </p>
          <button
            class="w-5 h-5 flex items-center justify-center hover:opacity-60 transition-opacity"
            :style="{ color: 'var(--color-text-muted)' }"
            @click="removeToast(toast.id)"
          >
            <X class="w-4 h-4" />
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-vue-next'

const { toasts, removeToast } = useToast()

const toastColors = {
  success: '#00e676',
  error: '#ff1744',
  warning: '#ffd700',
  info: '#00d4ff',
}

const toastIcons = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
