import { ArrowUpRight, Clock3 } from 'lucide-react'
import type { Service } from '../types/Service'

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export default function ServiceCard({ service, onSelect }: { service: Service; onSelect: (service: Service) => void }) {
  return <article className="service-row"><div className="service-mark" aria-hidden="true">{service.name.slice(0, 1)}</div><div className="service-copy"><span className="eyebrow">{service.category}</span><h3>{service.name}</h3><p>{service.description}</p></div><div className="service-meta"><strong>{service.price === null ? 'Sob consulta' : currency.format(service.price)}</strong><span><Clock3 size={14} /> {service.durationMin} min</span></div><button className="icon-button service-action" aria-label={`Agendar ${service.name}`} onClick={() => onSelect(service)}><ArrowUpRight size={17} /></button></article>
}