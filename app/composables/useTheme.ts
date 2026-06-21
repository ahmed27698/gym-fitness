export type Theme = 'dark' | 'light' | 'neon' | 'gold' | 'crimson' | 'emerald'

const THEMES: Theme[] = ['dark', 'light', 'neon', 'gold', 'crimson', 'emerald']

const theme = ref<Theme>('dark')

export function useTheme() {
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    if (process.client) {
      document.documentElement.setAttribute('data-theme', newTheme)
      localStorage.setItem('apex-theme', newTheme)
    }
  }

  const initTheme = () => {
    if (process.client) {
      const saved = localStorage.getItem('apex-theme') as Theme | null
      if (saved && THEMES.includes(saved)) {
        setTheme(saved)
      } else {
        setTheme('dark')
      }
    }
  }

  const toggleTheme = () => {
    const currentIndex = THEMES.indexOf(theme.value)
    const nextIndex = (currentIndex + 1) % THEMES.length
    setTheme(THEMES[nextIndex])
  }

  const themeLabel = computed(() => {
    const labels: Record<Theme, string> = {
      dark: 'Dark',
      light: 'Light',
      neon: 'Neon',
      gold: 'Gold',
      crimson: 'Crimson',
      emerald: 'Emerald',
    }
    return labels[theme.value]
  })

  return {
    theme: readonly(theme),
    themes: THEMES,
    setTheme,
    initTheme,
    toggleTheme,
    themeLabel,
  }
}
