import { useState, type FormEvent } from 'react'
import { ArrowRight, Eye, EyeOff, Flower2, Sparkles } from 'lucide-react'
import { signIn } from '../services/auth'
import type { User } from '../types/User'

export default function Login({ onLogin }: { onLogin: (user: User) => void }) {
  const [email, setEmail] = useState('cliente@studioas.com')
  const [password, setPassword] = useState('cliente123')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  function submit(event: FormEvent) {
    event.preventDefault()
    try { onLogin(signIn(email, password)) } catch (cause) { setError(cause instanceof Error ? cause.message : 'Não foi possível entrar.') }
  }
  return <main className="login-page"><section className="login-image"><div className="image-wordmark"><span className="brand-symbol"><Sparkles size={17} /></span> STUDIO <b>AS</b></div><div className="image-caption"><span className="eyebrow">UM ESPAÇO PARA VOCÊ</span><h1>Beleza que<br /><i>floresce</i> de dentro.</h1><p>Seu momento de cuidado começa aqui.</p></div><span className="image-credit">CUIDADO COM INTENÇÃO · DESDE 2018</span></section><section className="login-panel"><div className="login-form-wrap"><div className="login-mobile-brand"><Flower2 size={22} /> STUDIO AS</div><span className="eyebrow">BEM-VINDA DE VOLTA</span><h2>Seu tempo.<br />Seu espaço.</h2><p className="muted">Entre na sua conta para continuar.</p><form onSubmit={submit}><label htmlFor="email">E-mail</label><input id="email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required /><label htmlFor="password">Senha</label><div className="password-field"><input id="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required /><button type="button" aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div>{error && <p className="form-error" role="alert">{error}</p>}<button type="submit" className="button button-primary login-submit">Entrar <ArrowRight size={17} /></button></form><div className="demo-access"><span className="eyebrow">ACESSO DE DEMONSTRAÇÃO</span><button type="button" onClick={() => { setEmail('cliente@studioas.com'); setPassword('cliente123') }}>Cliente <span>cliente@studioas.com / cliente123</span></button><button type="button" onClick={() => { setEmail('admin@studioas.com'); setPassword('admin123') }}>Admin <span>admin@studioas.com / admin123</span></button></div></div><div className="login-footer">Studio AS <span>·</span> Beleza, tecnologia e atendimento inteligente</div></section></main>
}