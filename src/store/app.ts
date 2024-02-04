// Utilities
import { Planet } from '@/services/planets.api'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    pageTitle: 'Star Wars Planets',
    planets: [] as Planet[],
  }),
  actions: {
    setPageTitle(title: string) {
      this.pageTitle = title
    },
    setPlanets(planets: Planet[]) {
      this.planets = planets
    },
  },
})
