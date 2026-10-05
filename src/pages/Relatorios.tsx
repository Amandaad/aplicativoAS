import { useMemo } from 'react'
import { ArrowUpRight, CalendarDays, Scissors } from 'lucide-react'
import { api } from '../services/api'

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function Relatorios() {
  const services = api.getServices()
  const appointments = api.getAppointments().filter((item) => item.status !== 'Cancelado')
  const byService = useMemo(() => services.map((service) => ({ ...service, count: appointments.filter((item) => item.serviceId === service.id).length })).filter((service) => service.count).sort((a, b) => b.count - a.count), [appointments, services])
  const max = Math.max(1, ...byService.map((item) => item.count))
  const revenue = appointments.filter((item) => item.status === 'Concluído').reduce((sum, item) => sum + (services.find((service) => service.id === item.serviceId)?.price ?? 0), 0)
  return <div className="page"><div className="page-heading"><div><span className="eyebrow">NÚMEROS QUE CONTAM HISTÓRIAS</span><h1>Relatórios<span className="heading-period">.</span></h1><p>Um retrato simples da rotina do Studio AS.</p></div></div><div className="report-highlights"><div><span><CalendarDays size={16} /> Agendamentos registrados</span><strong>{appointments.length.toString().padStart(2, '0')}</strong><small>cancelamentos não incluídos</small></div><div><span><Scissors size={16} /> Serviço mais procurado</span><strong className="report-highlight-name">{byService[0]?.name ?? 'Sem dados'}</strong><small>{byService[0]?.count ?? 0} agendamentos</small></div><div><span><ArrowUpRight size={16} /> Receita concluída</span><strong>{currency.format(revenue)}</strong><small>com base nos atendimentos concluídos</small></div></div><section className="report-chart"><div className="section-heading"><div><span className="eyebrow">DESEMPENHO</span><h2>Serviços por procura</h2></div><span className="chart-period">Todo o período</span></div>{byService.length ? <div className="bar-list">{byService.map((item) => <div className="bar-row" key={item.id}><span>{item.name}</span><div className="bar-track"><i style={{ width: `${item.count / max * 100}%` }} /></div><strong>{item.count}</strong></div>)}</div> : <div className="empty-state">Ainda não há dados para exibir.</div>}<p className="report-note">Os dados são calculados a partir dos agendamentos salvos neste dispositivo.</p></section></div>
}