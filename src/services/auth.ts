import type { User } from '../types/User'

const accounts: Array<User & { password: string }> = [
  { id: 1, name: 'Mariana Costa', email: 'cliente@studioas.com', password: 'cliente123', role: 'client' },
  { id: 99, name: 'Admin Studio', email: 'admin@studioas.com', password: 'admin123', role: 'admin' },
]

export function signIn(email: string, password: string): User {
  const account = accounts.find((item) => item.email === email.trim().toLowerCase() && item.password === password)
  if (!account) throw new Error('E-mail ou senha incorretos.')
  const { password: _password, ...user } = account
  return user
}