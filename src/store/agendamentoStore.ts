import { api } from '../services/api'
import type { Appointment } from '../types/Agendamento'

export const agendamentoStore = {
  all: (): Appointment[] => api.getAppointments(),
  forUser: (userId: number): Appointment[] => api.getAppointments().filter((item) => item.userId === userId),
}