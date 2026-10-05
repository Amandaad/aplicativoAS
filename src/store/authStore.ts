import type { User } from '../types/User'

const key = 'studio-as-user'

export const authStore = {
  get(): User | null {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) as User : null
    } catch {
      return null
    }
  },
  set(user: User | null) {
    if (user) localStorage.setItem(key, JSON.stringify(user))
    else localStorage.removeItem(key)
  },
}