import { Bell, LogOut, Menu, Sparkles } from 'lucide-react'
import type { User } from '../types/User'

export default function Header({ user, onMenu, onLogout }: { user: User; onMenu: () => void; onLogout: () => void }) {
  const initials = user.name.split(' ').map((part) => part[0]).slice(0, 2).join('')
  return <header className="topbar"><button className="icon-button mobile-menu" aria-label="Abrir menu" onClick={onMenu}><Menu size={19} /></button><div className="topbar-brand"><span className="brand-symbol"><Sparkles size={16} /></span><span>STUDIO <b>AS</b></span></div><div className="topbar-right"><span className="today-label">{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(new Date())}</span><button className="icon-button" aria-label="Notificações"><Bell size={17} /><i className="notification-dot" /></button><div className="avatar">{initials}</div><button className="icon-button logout-button" aria-label="Sair" title="Sair" onClick={onLogout}><LogOut size={17} /></button></div></header>
}