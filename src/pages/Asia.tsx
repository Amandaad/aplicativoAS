import { useState } from 'react'
import { CalendarDays, Clock3, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { cancelAppointment } from '../services/agendamento'
import { api } from '../services/api'
import type { User } from '../types/User'

export default function Asia({ user }: { user: User }) {
  const [version, setVersion] = useState(0)
  const appointments = api.getAppointments().filter((item) => item.userId === user.id).sort((a, b) => `${b.date}${b.time}`.localeCompare(`${a.date}${a.time}`))
  return <div className="page"><div className="page-heading"><div><span className="eyebrow">SEUS MOMENTOS DE CUIDADO</span><h1>Meus horários<span className="heading-period">.</span></h1><p>Acompanhe seus agendamentos em um só lugar.</p></div><Link className="button button-primary heading-action" to="/agendamento">Novo horário</Link></div><div className="appointments-list" key={version}>{appointments.map((item) => { const service = api.getServices().find((entry) => entry.id === item.serviceId); return <article className="client-appointment" key={item.id}><div className="appointment-date compact"><span>{new Date(`${item.date}T12:00:00`).toLocaleDateString('pt-BR', { weekday: 'short' })}</span><strong>{new Date(`${item.date}T12:00:00`).getDate()}</strong><span>{new Date(`${item.date}T12:00:00`).toLocaleDateString('pt-BR', { month: 'short' })}</span></div><div className="client-appointment-main"><span className="eyebrow">{new Date(`${item.date}T12:00:00`).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</span><h2>{service?.name ?? 'Serviço'}</h2><p>{service?.description}</p><span className="appointment-time"><Clock3 size={14} /> {item.time} · {service?.durationMin} min</span></div><div className="client-appointment-actions"><span className={`status status-${item.status.toLowerCase()}`}>{item.status}</span>{item.status === 'Confirmado' && <Button variant="quiet" onClick={() => { cancelAppointment(item.id); setVersion(version + 1) }}><X size={15} /> Cancelar</Button>}</div></article> })}{appointments.length === 0 && <div className="empty-state"><CalendarDays size={22} /><p>Você ainda não tem horários por aqui.</p></div>}</div></div>
}