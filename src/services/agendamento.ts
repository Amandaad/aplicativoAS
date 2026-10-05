import { api } from './api'
import type { User } from '../types/User'

export function bookAppointment(user: User, serviceId: number, date: string, time: string) {
  if (!serviceId || !date || !time) throw new Error('Preencha todos os campos do agendamento.')
  if (date < new Date().toISOString().slice(0, 10)) throw new Error('Escolha uma data a partir de hoje.')
  return api.createAppointment(user, serviceId, date, time)
}

export function cancelAppointment(id: number) {
  api.saveAppointments(api.getAppointments().map((item) => item.id === id ? { ...item, status: 'Cancelado' } : item))
}