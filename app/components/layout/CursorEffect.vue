<template>
  <ClientOnly>
    <div>
      <div ref="dotRef" class="cursor-dot" style="opacity: 0" />
      <div ref="ringRef" class="cursor-ring" style="opacity: 0" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const dotRef = ref<HTMLElement | null>(null)
const ringRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (!dotRef.value || !ringRef.value) return

  const dot = dotRef.value
  const ring = ringRef.value

  let mouseX = 0
  let mouseY = 0
  let ringX = 0
  let ringY = 0
  let isHovering = false
  let rafId: number

  // Hide default system cursor
  document.documentElement.style.cursor = 'none'

  const onMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX
    mouseY = e.clientY

    // Show cursors on first move
    dot.style.opacity = '1'
    ring.style.opacity = '0.6'

    // Dot follows instantly — center it on cursor (dot is 8×8, offset = 4)
    dot.style.left = `${mouseX}px`
    dot.style.top = `${mouseY}px`
  }

  document.addEventListener('mousemove', onMouseMove)

  // Smooth ring follows with lerp — no offset in lerp target, only in render
  const animateRing = () => {
    ringX += (mouseX - ringX) * 0.12
    ringY += (mouseY - ringY) * 0.12
    // Center ring on cursor (ring is 40×40, offset = 20)
    ring.style.left = `${ringX}px`
    ring.style.top = `${ringY}px`
    rafId = requestAnimationFrame(animateRing)
  }
  animateRing()

  // Attach hover effects to interactive elements (use event delegation)
  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement
    if (target.closest('a, button, [data-cursor="pointer"]')) {
      if (!isHovering) {
        isHovering = true
        ring.style.width = '64px'
        ring.style.height = '64px'
        ring.style.borderColor = 'var(--color-accent)'
        ring.style.opacity = '0.4'
        dot.style.transform = 'translate(-50%, -50%) scale(2.5)'
      }
    } else {
      if (isHovering) {
        isHovering = false
        ring.style.width = '40px'
        ring.style.height = '40px'
        ring.style.opacity = '0.6'
        dot.style.transform = 'translate(-50%, -50%) scale(1)'
      }
    }
  })

  // Hide cursors when mouse leaves window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0'
    ring.style.opacity = '0'
  })
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1'
    ring.style.opacity = '0.6'
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove)
    cancelAnimationFrame(rafId)
    document.documentElement.style.cursor = ''
  })
})
</script>
