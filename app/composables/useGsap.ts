export function useGsap() {
  const gsap = ref<any>(null)
  const ScrollTrigger = ref<any>(null)

  const initGsap = async () => {
    if (process.client && !gsap.value) {
      const { gsap: g, ScrollTrigger: ST } = await import('~/plugins/gsap.client')
      gsap.value = g
      ScrollTrigger.value = ST
    }
  }

  const fadeInUp = (target: string | Element, options: any = {}) => {
    if (!gsap.value) return
    return gsap.value.fromTo(
      target,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', ...options }
    )
  }

  const fadeIn = (target: string | Element, options: any = {}) => {
    if (!gsap.value) return
    return gsap.value.fromTo(
      target,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out', ...options }
    )
  }

  const staggerFadeInUp = (target: string | Element, stagger = 0.1, options: any = {}) => {
    if (!gsap.value) return
    return gsap.value.fromTo(
      target,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger, ease: 'power3.out', ...options }
    )
  }

  const scaleIn = (target: string | Element, options: any = {}) => {
    if (!gsap.value) return
    return gsap.value.fromTo(
      target,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)', ...options }
    )
  }

  const createScrollTrigger = (animation: any, trigger: string | Element, options: any = {}) => {
    if (!ScrollTrigger.value) return
    return ScrollTrigger.value.create({
      trigger,
      start: 'top 80%',
      animation,
      ...options,
    })
  }

  return {
    gsap,
    ScrollTrigger,
    initGsap,
    fadeInUp,
    fadeIn,
    staggerFadeInUp,
    scaleIn,
    createScrollTrigger,
  }
}
