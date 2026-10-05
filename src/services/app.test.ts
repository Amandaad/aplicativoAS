import { beforeEach, describe, expect, it, vi } from 'vitest'
import { api } from './api'
import { bookAppointment } from './agendamento'
import { signIn } from './auth'

function createStorage() {
  const values = new Map<string, string>()
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
    removeItem: (key: string) => values.delete(key),
  }
}

describe('Studio AS local flows', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createStorage())
  })

  it('accepts the demo client account and rejects invalid credentials', () => {
    expect(signIn('cliente@studioas.com', 'cliente123').role).toBe('client')
    expect(() => signIn('cliente@studioas.com', 'errada')).toThrow('E-mail ou senha incorretos.')
  })

  it('includes the supplied service prices and leaves Make as quote-only', () => {
    const services = api.getServices()
    expect(services).toHaveLength(25)
    expect(services.find((service) => service.name === 'Escova P')?.price).toBe(25)
    expect(services.find((service) => service.name === 'Micropigmentação')?.price).toBe(250)
    expect(services.find((service) => service.name === 'Make')?.price).toBeNull()
  })

  it('persists a booking and prevents reserving the same time twice', () => {
    const client = signIn('cliente@studioas.com', 'cliente123')
    const appointment = bookAppointment(client, 4, '2099-03-02', '09:00')

    expect(api.getAppointments()).toContainEqual(appointment)
    expect(() => bookAppointment(client, 8, '2099-03-02', '09:00')).toThrow('Este horário já foi reservado.')
  })
})