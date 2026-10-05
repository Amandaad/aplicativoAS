import { useMemo, useState, type FormEvent } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { bookAppointment } from '../services/agendamento'
import { api } from '../services/api'
import type { User } from '../types/User'

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30']

export default function Agendamento({ user }: { user: User }) {
  const navigate = useNavigate()
  const services = api.getServices()
  const [serviceId, setServiceId] = useState(Number(sessionStorage.getItem('studio-as-selected-service')) || services[0]?.id || 0)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const service = services.find((item) => item.id === serviceId)
  const busyTimes = useMemo(() => api.getAppointments().filter((item) => item.date === date && item.status !== 'Cancelado').map((item) => item.time), [date])
  function submit(event: FormEvent) {
    event.preventDefault()
    try {
      bookAppointment(user, serviceId, date, time)
      sessionStorage.removeItem('studio-as-selected-service')
      setError('')
      setDone(true)
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'Não foi possível reservar.') }
  }
  if (done && service) return <div className="success-screen"><div className="success-icon"><Check size={28} /></div><span className="eyebrow">AGENDAMENTO CONFIRMADO</span><h1>Esse momento<br />é seu<span className="heading-period">.</span></h1><p>{service.name} · {new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR', { dateStyle: 'long' })} às {time}</p><div><Link className="button button-primary" to="/asia">Ver meus horários <ArrowRight size={16} /></Link><button className="button button-quiet" onClick={() => navigate('/')}>Voltar ao início</button></div></div>
  return <div className="page booking-page"><div className="page-heading"><div><span className="eyebrow">SEU MOMENTO COMEÇA AQUI</span><h1>Agendar horário<span className="heading-period">.</span></h1><p>Escolha o serviço e o melhor horário para você.</p></div></div><form className="booking-grid" onSubmit={submit}><div className="booking-form"><section className="form-section"><div className="form-step"><span>01</span><div><h2>Escolha o serviço</h2><p>Um cuidado especial, do seu jeito.</p></div></div><div className="booking-service-list">{services.map((item) => <label className={`booking-service${serviceId === item.id ? ' chosen' : ''}`} key={item.id}><input type="radio" name="service" value={item.id} checked={serviceId === item.id} onChange={() => setServiceId(item.id)} /><span className="radio-indicator" /><span className="booking-service-name"><strong>{item.name}</strong><small>{item.durationMin} min · {item.category}</small></span><b>{item.price === null ? 'Sob consulta' : currency.format(item.price)}</b></label>)}</div></section><section className="form-section"><div className="form-step"><span>02</span><div><h2>Data e horário</h2><p>Atendemos de segunda a sábado.</p></div></div><label className="field-label" htmlFor="booking-date"><CalendarDays size={16} /> Data</label><input className="form-input" id="booking-date" type="date" min={new Date().toISOString().slice(0, 10)} value={date} onChange={(event) => { setDate(event.target.value); setTime('') }} required /><div className="field-label time-label"><Clock3 size={16} /> Horários disponíveis</div><div className="time-grid">{times.map((item) => <button type="button" key={item} disabled={!date || busyTimes.includes(item)} className={`time-option${time === item ? ' chosen' : ''}`} onClick={() => setTime(item)}>{item}</button>)}</div>{!date && <p className="field-hint">Selecione uma data para ver os horários.</p>}</section></div><aside className="booking-summary"><span className="eyebrow">RESUMO</span><h2>Seu próximo<br />ritual.</h2>{service && <><div className="summary-line"><span>{service.name}</span><strong>{service.price === null ? 'Sob consulta' : currency.format(service.price)}</strong></div><div className="summary-line muted"><span>Duração</span><span>{service.durationMin} min</span></div><div className="summary-total"><span>Total</span><strong>{service.price === null ? 'A combinar' : currency.format(service.price)}</strong></div></>}{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary summary-submit" type="submit" disabled={!date || !time || !serviceId}>Confirmar horário <ArrowRight size={16} /></button><p className="summary-policy">Precisa alterar? Você pode cancelar pelo menu “Meus horários”.</p><Link to="/servicos" className="text-link"><ArrowLeft size={14} /> Voltar aos serviços</Link></aside></form></div>
}