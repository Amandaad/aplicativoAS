import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import AdminLayout from './layouts/AdminLayout'
import Admin from './pages/Admin'
import Agendamento from './pages/Agendamento'
import Asia from './pages/Asia'
import Financeiro from './pages/Financeiro'
import Home from './pages/Home'
import Login from './pages/Login'
import Relatorios from './pages/Relatorios'
import Servicos from './pages/Servicos'
import { authStore } from './store/authStore'
import type { User } from './types/User'

export default function App() {
  const [user, setUser] = useState<User | null>(() => authStore.get())
  function login(next: User) { authStore.set(next); setUser(next) }
  function logout() { authStore.set(null); setUser(null) }
  if (!user) return <Login onLogin={login} />
  return <BrowserRouter><Routes><Route element={<AppLayout user={user} onLogout={logout} />}><Route index element={user.role === 'admin' ? <Navigate to="/admin" replace /> : <Home user={user} />} /><Route path="servicos" element={<Servicos />} /><Route path="agendamento" element={<Agendamento user={user} />} /><Route path="asia" element={user.role === 'client' ? <Asia user={user} /> : <Navigate to="/admin" replace />} /><Route element={user.role === 'admin' ? <AdminLayout /> : <Navigate to="/" replace />}><Route path="admin" element={<Admin />} /><Route path="financeiro" element={<Financeiro />} /><Route path="relatorios" element={<Relatorios />} /></Route><Route path="*" element={<Navigate to="/" replace />} /></Route></Routes></BrowserRouter>
}
