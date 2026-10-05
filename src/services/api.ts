import type { Appointment } from '../types/Agendamento'
import type { Service } from '../types/Service'
import type { User } from '../types/User'

const serviceKey = 'studio-as-services'
const appointmentKey = 'studio-as-appointments'

export const initialServices: Service[] = [
  { id: 1, name: 'Escova P', description: 'Escova para cabelos curtos', price: 25, durationMin: 30, category: 'Cabelo' },
  { id: 2, name: 'Escova M', description: 'Escova para cabelos médios', price: 30, durationMin: 40, category: 'Cabelo' },
  { id: 3, name: 'Escova G', description: 'Escova para cabelos longos', price: 35, durationMin: 50, category: 'Cabelo' },
  { id: 4, name: 'Corte + Escova', description: 'Corte e escova modelada', price: 50, durationMin: 60, category: 'Cabelo' },
  { id: 5, name: 'Selagem P', description: 'Selagem para cabelos curtos', price: 150, durationMin: 120, category: 'Cabelo' },
  { id: 6, name: 'Selagem M', description: 'Selagem para cabelos médios', price: 200, durationMin: 150, category: 'Cabelo' },
  { id: 7, name: 'Selagem G', description: 'Selagem para cabelos longos', price: 250, durationMin: 180, category: 'Cabelo' },
  { id: 8, name: 'Hidratação', description: 'Hidratação para brilho e maciez', price: 25, durationMin: 40, category: 'Cabelo' },
  { id: 9, name: 'Reconstrução', description: 'Reconstrução dos fios danificados', price: 50, durationMin: 60, category: 'Cabelo' },
  { id: 10, name: 'Coloração', description: 'Coloração completa', price: 50, durationMin: 90, category: 'Cabelo' },
  { id: 11, name: 'Mechas P', description: 'Mechas para cabelos curtos', price: 150, durationMin: 180, category: 'Cabelo' },
  { id: 12, name: 'Mechas M', description: 'Mechas para cabelos médios', price: 200, durationMin: 210, category: 'Cabelo' },
  { id: 13, name: 'Mechas G', description: 'Mechas para cabelos longos', price: 250, durationMin: 240, category: 'Cabelo' },
  { id: 14, name: 'Sobrancelha', description: 'Design e cuidado das sobrancelhas', price: 20, durationMin: 30, category: 'Sobrancelhas e cílios' },
  { id: 15, name: 'Henna', description: 'Aplicação de henna nas sobrancelhas', price: 30, durationMin: 40, category: 'Sobrancelhas e cílios' },
  { id: 16, name: 'Henna — combo à vista', description: 'Combo de henna com pagamento à vista', price: 35, durationMin: 50, category: 'Sobrancelhas e cílios' },
  { id: 17, name: 'Cílios', description: 'Atendimento para realçar os cílios', price: 70, durationMin: 90, category: 'Sobrancelhas e cílios' },
  { id: 18, name: 'Micropigmentação', description: 'Micropigmentação de sobrancelhas', price: 250, durationMin: 120, category: 'Sobrancelhas e cílios' },
  { id: 19, name: 'Axila', description: 'Depilação de axilas', price: 20, durationMin: 20, category: 'Depilação' },
  { id: 20, name: 'Perna completa', description: 'Depilação de perna completa', price: 40, durationMin: 50, category: 'Depilação' },
  { id: 21, name: 'Meia perna', description: 'Depilação de meia perna', price: 20, durationMin: 30, category: 'Depilação' },
  { id: 22, name: 'Buço', description: 'Depilação de buço', price: 10, durationMin: 15, category: 'Depilação' },
  { id: 23, name: 'Face', description: 'Depilação facial', price: 50, durationMin: 30, category: 'Depilação' },
  { id: 24, name: 'Penteado', description: 'Penteado para ocasiões especiais', price: 70, durationMin: 60, category: 'Outros' },
  { id: 25, name: 'Make', description: 'Maquiagem — consulte o valor no Studio AS', price: null, durationMin: 60, category: 'Outros' },
]

const sampleAppointments: Appointment[] = [
  { id: 101, userId: 1, clientName: 'Mariana Costa', serviceId: 4, date: '2026-10-06', time: '09:00', status: 'Confirmado' },
  { id: 102, userId: 2, clientName: 'Camila Oliveira', serviceId: 8, date: '2026-10-06', time: '10:30', status: 'Confirmado' },
  { id: 103, userId: 3, clientName: 'Fernanda Lima', serviceId: 10, date: '2026-10-06', time: '13:00', status: 'Confirmado' },
  { id: 104, userId: 1, clientName: 'Mariana Costa', serviceId: 5, date: '2026-10-07', time: '14:00', status: 'Confirmado' },
  { id: 105, userId: 2, clientName: 'Camila Oliveira', serviceId: 1, date: '2026-10-05', time: '11:00', status: 'Concluído' },
]

function read<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) as T : fallback
  } catch {
    return fallback
  }
}

export const api = {
  getServices: (): Service[] => read(serviceKey, initialServices),
  saveServices: (services: Service[]) => localStorage.setItem(serviceKey, JSON.stringify(services)),
  getAppointments: (): Appointment[] => read(appointmentKey, sampleAppointments),
  saveAppointments: (appointments: Appointment[]) => localStorage.setItem(appointmentKey, JSON.stringify(appointments)),
  createAppointment(user: User, serviceId: number, date: string, time: string): Appointment {
    const appointments = this.getAppointments()
    if (appointments.some((item) => item.date === date && item.time === time && item.status !== 'Cancelado')) {
      throw new Error('Este horário já foi reservado. Escolha outro horário.')
    }
    const appointment: Appointment = { id: Date.now(), userId: user.id, clientName: user.name, serviceId, date, time, status: 'Confirmado' }
    this.saveAppointments([...appointments, appointment])
    return appointment
  },
}