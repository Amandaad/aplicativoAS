import { useState } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import { api } from '../services/api'
import type { Service } from '../types/Service'

export default function Servicos() {
  const [category, setCategory] = useState('Todos')
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const services = api.getServices()
  const categories = ['Todos', ...new Set(services.map((service) => service.category))]
  const visible = services.filter((service) => (category === 'Todos' || service.category === category) && `${service.name} ${service.description}`.toLowerCase().includes(query.toLowerCase()))
  function select(service: Service) { sessionStorage.setItem('studio-as-selected-service', String(service.id)); navigate('/agendamento') }
  return <div className="page"><div className="page-heading"><div><span className="eyebrow">CUIDADO FEITO PARA VOCÊ</span><h1>Nossos serviços<span className="heading-period">.</span></h1><p>Encontre seu próximo ritual de beleza.</p></div></div><div className="catalog-toolbar"><div className="filter-tabs">{categories.map((item) => <button key={item} className={`filter-tab${category === item ? ' selected' : ''}`} onClick={() => setCategory(item)}>{item}</button>)}</div><label className="search-field"><Search size={16} /><input aria-label="Buscar serviços" placeholder="Buscar serviço" value={query} onChange={(event) => setQuery(event.target.value)} /></label></div><div className="catalog-list">{visible.map((service) => <ServiceCard key={service.id} service={service} onSelect={select} />)}{visible.length === 0 && <p className="empty-state">Nenhum serviço encontrado para esta busca.</p>}</div></div>
}