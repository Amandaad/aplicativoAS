import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import type { User } from '../types/User'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

export default function AppLayout({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <div className="app-shell"><Header user={user} onMenu={() => setMenuOpen(!menuOpen)} onLogout={onLogout} /><div className="app-body"><div className={`sidebar-wrap${menuOpen ? ' sidebar-open' : ''}`}><Sidebar user={user} close={() => setMenuOpen(false)} /></div>{menuOpen && <button className="mobile-scrim" aria-label="Fechar menu" onClick={() => setMenuOpen(false)} />}<main className="main-content"><Outlet /></main></div></div>
}