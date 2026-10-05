# Studio AS Web

Aplicação web de demonstração para atendimento e agendamento de um estúdio de beleza. O projeto foi criado em React + TypeScript com Vite, separado do aplicativo Android Jetpack Compose que permanece na pasta `StudioAS/`.

> **Estado dos dados:** esta versão não possui backend. Catálogo, autenticação demonstrativa e agendamentos são mantidos no `localStorage` do navegador. Portanto, cada navegador/dispositivo tem seus próprios dados; alterações não são compartilhadas entre clientes ou computadores.

## Requisitos

- Node.js 20.19+ ou 22.12+ (Node.js 24 também funciona).
- npm incluído com o Node.js.

## Executar localmente

No PowerShell, na raiz do workspace:

```powershell
cd .\studio-as
npm install
npm run dev
```

Abra o endereço mostrado pelo Vite, normalmente `http://localhost:5173`. Para disponibilizar o servidor a outros dispositivos da rede local, inicie com `npm run dev -- --host 0.0.0.0`.

Verifique uma versão de produção:

```powershell
npm run build
npm run preview
```

O resultado compilado é gravado em `dist/`.

Execute os testes de comportamento:

```powershell
npm test
```

## Contas de demonstração

| Perfil | E-mail | Senha |
| --- | --- | --- |
| Cliente | `cliente@studioas.com` | `cliente123` |
| Administrador | `admin@studioas.com` | `admin123` |

As credenciais são públicas e estão implementadas no cliente. Elas servem somente para demonstração local: **não use este mecanismo para proteger dados reais**.

## Funcionalidades

- Login demonstrativo, sessão local persistida e navegação conforme perfil.
- Início do cliente com serviços em destaque e próximo horário.
- Catálogo de serviços com busca e filtros por categoria.
- Agendamento por serviço, data e horário, bloqueando horários já ocupados.
- Consulta e cancelamento de agendamentos do cliente.
- Agenda administrativa por dia e marcação de atendimento como concluído.
- Resumo financeiro, listagem de atendimentos concluídos e impressão.
- Relatório de serviços mais agendados e receita concluída.
- Layout responsivo para desktop e celular.

Os registros iniciais são dados de exemplo. O administrador compartilha o mesmo armazenamento do navegador do usuário atual; não há sincronização remota.

### Catálogo atual

O catálogo inicial usa os valores informados para cabelo, sobrancelhas e cílios, depilação e outros serviços. A duração aparece como estimativa operacional para permitir o bloqueio de horários; confirme os tempos reais com o Studio. O preço de `Make` não foi informado e aparece como **Sob consulta** até ser definido.

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| React 18 | Componentes e interface de usuário. |
| TypeScript 5 | Tipos para usuários, serviços e agendamentos. |
| Vite 5 | Servidor de desenvolvimento e build de produção. |
| Vitest 2 | Testes de autenticação demonstrativa e regras de agendamento. |
| React Router 6 | Rotas da área de cliente e da administração. |
| Tailwind CSS 3 | Base de estilos/utilitários, processada por PostCSS. O visual principal usa CSS próprio em `src/index.css`. |
| PostCSS + Autoprefixer | Processamento e compatibilidade dos estilos. |
| Lucide React | Ícones da interface. |
| Web Storage API | Persistência local de sessão, catálogo e agendamentos via `localStorage`/`sessionStorage`. |
| Google Fonts | DM Sans e Playfair Display, com fontes locais de fallback. |

As versões exatas das dependências ficam registradas em `package-lock.json` após `npm install`.

## Organização

```text
studio-as/
├── src/
│   ├── components/   # Botões, cabeçalho, menu, carregamento e serviço
│   ├── layouts/      # Layout compartilhado e estrutura administrativa
│   ├── pages/        # Login, início, serviços, agenda e relatórios
│   ├── services/     # Autenticação demonstrativa e persistência local
│   ├── store/        # Acesso ao estado persistido
│   ├── types/        # Tipos de domínio
│   ├── App.tsx       # Rotas e controle de sessão
│   ├── main.tsx      # Inicialização React
│   └── index.css     # Identidade visual e responsividade
├── public/
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Próximos passos para produção

1. Criar uma API com autenticação real e banco de dados compartilhado.
2. Mover credenciais e autorização para o servidor; validar disponibilidade e conflitos de horário também no backend.
3. Definir regras de expediente, folgas, duração combinada de serviços, pagamentos e políticas de cancelamento.
4. Configurar testes automatizados, HTTPS, variáveis de ambiente e pipeline de deploy.

Até esses passos serem feitos, não use os valores exibidos no financeiro nem os dados de demonstração como registros comerciais.