import { CalendarDays, ChartNoAxesCombined, CircleUserRound, CreditCard, Flower2, LayoutDashboard, Scissors } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import type { User } from '../types/User'

const clientLinks = [
  { to: '/', label: 'Visão geral', icon: LayoutDashboard, end: true },
  { to: '/servicos', label: 'Serviços', icon: Scissors },
  { to: '/agendamento', label: 'Agendar horário', icon: CalendarDays },
  { to: '/asia', label: 'Meus horários', icon: CircleUserRound },
]
const adminLinks = [
  { to: '/admin', label: 'Agenda', icon: CalendarDays, end: true },
  { to: '/servicos', label: 'Serviços', icon: Scissors },
  { to: '/financeiro', label: 'Financeiro', icon: CreditCard },
  { to: '/relatorios', label: 'Relatórios', icon: ChartNoAxesCombined },
]

export default function Sidebar({ user, close }: { user: User; close: () => void }) {
  const links = user.role === 'admin' ? adminLinks : clientLinks
  const initials = user.name.split(' ').map((part) => part[0]).slice(0, 2).join('')
  return <aside className="sidebar"><div className="sidebar-title">MENU</div><nav>{links.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} onClick={close} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}><Icon size={18} strokeWidth={1.8} /><span>{label}</span></NavLink>)}</nav><div className="sidebar-bottom"><div className="sidebar-note"><Flower2 size={17} /><span>Seu momento<br /><b>começa aqui.</b></span></div><div className="sidebar-user"><div className="avatar avatar-small">{initials}</div><div><strong>{user.name}</strong><span>{user.role === 'admin' ? 'Equipe Studio AS' : 'Cliente'}</span></div></div></div></aside>
}