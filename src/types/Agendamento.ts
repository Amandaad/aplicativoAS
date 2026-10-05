export type Appointment = {
  id: number
  userId: number
  clientName: string
  serviceId: number
  date: string
  time: string
  status: 'Confirmado' | 'Concluído' | 'Cancelado'
}