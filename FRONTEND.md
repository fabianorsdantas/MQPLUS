# ESPECIFICAÇÃO DE ARQUITETURA E ENGENHARIA DE FRONTEND WEB — MQPLUS
## Next.js (App Router), React, TypeScript, Tailwind CSS, TanStack Query, Zustand & Atomic Design

**Versão da Arquitetura de Frontend:** 1.0.0  
**Autor:** Principal Frontend Engineer & UI Architect  
**Status:** Aprovado como Padrão Oficial do Frontend Web (Master Project Document - MPD)  
**Data:** Julho de 2026  

---

## SUMÁRIO EXECUTIVO E ÍNDICE
1. [VISÃO GERAL DO FRONTEND WEB](#1-vis%C3%83o-geral-do-frontend-web)
2. [ARQUITETURA DE PASTAS BASEADA EM FEATURES (`apps/web/src/`)](#2-arquitetura-de-pastas-baseada-em-features-appswebsrc)
3. [MAPEAMENTO COMPLETO DAS TELAS & ROTAS (APP ROUTER)](#3-mapeamento-completo-das-telas--rotas-app-router)
4. [ARQUITETURA DE COMPONENTES (ATOMIC DESIGN + SHADCN/UI)](#4-arquitetura-de-componentes-atomic-design--shadcnui)
5. [COMPONENTES REUTILIZÁVEIS DA PLATAFORMA](#5-componentes-reutiliz%C3%81veis-da-plataforma)
6. [ESTRATÉGIA DE GERENCIAMENTO DE ESTADO (ZUSTAND & TANSTACK QUERY)](#6-estrat%C3%89gia-de-gerenciamento-de-estado-zustand--tanstack-query)
7. [INTEGRAÇÃO DE API RESTFUL, QUERY CLIENT & AUTO REFRESH](#7-integra%C3%87%C3%83o-de-api-restful-query-client--auto-refresh)
8. [FORMULÁRIOS DE ALTA PERFORMANCE (REACT HOOK FORM & ZOD)](#8-formul%C3%81rios-de-alta-performance-react-hook-form--zod)
9. [FLUXO DE AUTENTICAÇÃO, ROTAS PROTEGIDAS & SESSÃO](#9-fluxo-de-autentica%C3%87%C3%83o-rotas-protegidas--sess%C3%83o)
10. [DIRETRIZES DE UX, ESTADOS DE INTERFACE E MICROINTERAÇÕES](#10-diretrizes-de-ux-estados-de-interface-e-microintera%C3%87%C3%95es)
11. [ARQUITETURA RESPONSIVA (PARADIGMA MOBILE FIRST)](#11-arquitetura-responsiva-paradigma-mobile-first)
12. [ACESSIBILIDADE DE ACORDO COM WCAG 2.2 AA](#12-acessibilidade-de-acordo-com-wcag-22-aa)
13. [OTIMIZAÇÃO DE PERFORMANCE WEB (CORE WEB VITALES)](#13-otimiza%C3%87%C3%83o-de-performance-web-core-web-vitales)
14. [ESTRATÉGIA DE SEO & ESTRUTURA DE METADADOS](#14-estrat%C3%89gia-de-seo--estrutura-de-metadados)
15. [ARQUITETURA PWA (PROGRESSIVE WEB APP)](#15-arquitetura-pwa-progressive-web-app)
16. [ESTRATÉGIA DE TESTES (JEST, REACT TESTING LIBRARY, PLAYWRIGHT)](#16-estrat%C3%89gia-de-testes-jest-react-testing-library-playwright)
17. [PADRÕES DE NOMENCLATURA E CONVENÇÕES DE CÓDIGO](#17-padr%C3%95es-de-nomenclatura-e-conven%C3%87%C3%95es-de-c%C3%B3digo)
18. [LISTAGEM DE ARQUIVOS CRIADOS NO FRONTEND](#18-listagem-de-arquivos-criados-no-frontend)
19. [JUSTIFICATIVAS TÉCNICAS E DESIGN TRADE-OFFS](#19-justificativas-t%C3%A9cnicas-e-design-trade-offs)
20. [CÓDIGO-BASE IMPLEMENTADO NO FRONTEND (`apps/web`)](#20-c%C3%93digo-base-implementado-no-frontend-appsweb)
21. [GUIA DE EXECUÇÃO LOCAL E CONEXÃO COM A API BACKEND](#21-guia-de-execu%C3%87%C3%83o-local-e-conex%C3%83o-com-a-api-backend)
22. [PLANO DE EVOLUÇÃO PARA PWA OFFLINE E WEBSOCKETS](#22-plano-de-evolu%C3%87%C3%83o-para-pwa-offline-e-websockets)

---

# 1. VISÃO GERAL DO FRONTEND WEB

### 1.1 Arquitetura da Aplicação
O Frontend Web do **MQPLUS** foi construído utilizando **Next.js 14 com App Router**, aproveitando o modelo de **React Server Components (RSC)** e **Client Components (RCC)** para otimização de performance, carregamento por streaming e renderização de SEO. O projeto é totalmente integrado ao Design System `@mqplus/ui` e consumirá os endpoints REST da API NestJS.

```
+-----------------------------------------------------------------------------------+
|                           FLUXO DE ARQUITETURA FRONTEND                           |
+-----------------------------------------------------------------------------------+
|  [ User Browser / Device ]                                                        |
|             |                                                                     |
|             v                                                                     |
|  [ Next.js App Router Layouts / Middleware ] (Route Guard / Auth Session Check)   |
|             |                                                                     |
|             +-----------------------+-----------------------+                     |
|             |                       |                       |                     |
|             v                       v                       v                     |
|  [ React Server Components ]   [ Client Components ]    [ Zustand Global Store ]  |
|  (Initial Data Fetching)       (Form Validation / UI)   (User Token & Streaks)    |
|                                     |                                             |
|                                     v                                             |
|                        [ TanStack Query Client ]                                  |
|                        (HTTP Caching, Invalidation & Retry)                       |
|                                     |                                             |
|                                     v  (HTTP / Axios API Client)                  |
|                        [ MQPLUS Core API / NestJS ]                               |
+-----------------------------------------------------------------------------------+
```

### 1.2 Estratégia de Organização: Feature-Based Architecture
Em vez de organizar componentes por tipo genérico em uma única pasta gigante, a aplicação adota **Feature-Based Architecture**. Cada contexto de negócio (Autenticação, Banco de Questões, Simulados TRI, Flashcards SRS, IA Tutor, Saúde Mental) possui sua pasta isolada contendo seus componentes, hooks, services e tipos.

---

# 2. ARQUITETURA DE PASTAS BASEADA EM FEATURES (`apps/web/src/`)

```
apps/web/src/
├── app/                        # Next.js App Router (Rotas e Layouts)
│   ├── (auth)/                 # Grupo de rotas públicas de autenticação
│   │   ├── login/              # Tela de Login
│   │   ├── register/           # Tela de Cadastro
│   │   └── layout.tsx          # Layout de telas de Auth
│   ├── (dashboard)/            # Grupo de rotas autenticadas do estudante
│   │   ├── dashboard/          # Home / Dashboard principal do estudante
│   │   ├── questions/          # Resolução de questões e busca
│   │   ├── simulations/        # Simulados e cálculo TRI
│   │   ├── flashcards/         # Revisão espaçada SRS
│   │   ├── ai-tutor/           # Chat com Tutor Socrático
│   │   ├── mental-health/      # Saúde mental e descompressão
│   │   └── layout.tsx          # Layout com Sidebar + Topbar + BottomBar
│   ├── layout.tsx              # Root Layout da aplicação
│   └── page.tsx                # Landing Page oficial
├── components/                 # Componentes genéricos de UI da aplicação
│   ├── layout/                 # Sidebar, Topbar, Footer, MobileNav
│   └── feedback/               # LoadingScreen, ErrorState, EmptyState
├── features/                   # Módulos isolados por funcionalidade (Feature-Based)
│   ├── auth/                   # Components, Services, Hooks de Auth
│   ├── questions/              # Components (QuestionCard, OptionButton, SocraticHint)
│   ├── simulations/            # Components (SimulationTimer, TRIReportCard)
│   └── flashcards/             # Components (FlashcardFlip, SRSRatingBar)
├── hooks/                      # Custom React Hooks globais (useMediaQuery, useDebounce)
├── lib/                        # Clientes HTTP, utilitários (api-client.ts, utils.ts)
├── providers/                  # Provedores React (QueryProvider, ThemeProvider)
├── store/                      # Zustand Stores (useAuthStore.ts, useStudyStore.ts)
└── types/                      # Tipagens universais TypeScript do Frontend
```

---

# 3. MAPEAMENTO COMPLETO DAS TELAS & ROTAS (APP ROUTER)

| Rota Next.js | Tipo de Rota | Descrição da Tela / Funcionalidade |
| :--- | :--- | :--- |
| `/` | Pública (RSC) | Landing Page oficial com apresentação do produto e propostas de valor. |
| `/login` | Pública (RCC) | Form de login com e-mail/senha e autenticação social. |
| `/register` | Pública (RCC) | Form de cadastro de novo estudante com escolha do objetivo de exame. |
| `/dashboard` | Protegida (RCC) | Painel Principal: Streaks, Metas Diárias, Tarefas do Dia e Acesso Rápido. |
| `/questions` | Protegida (RCC) | Banco de Questões com Filtros Avançados, Renderização LaTeX e Dica Socrática. |
| `/simulations` | Protegida (RCC) | Ambiente de prova cronometrado e relatório preditivo com nota TRI. |
| `/flashcards` | Protegida (RCC) | Interface de revisão de cartões de memória com algoritmo de repetição espaçada. |
| `/ai-tutor` | Protegida (RCC) | Interface de chat com IA educacional treinada em RAG socrático. |
| `/mental-health` | Protegida (RCC) | Módulo de descompressão emocional, triagem GAD-7 e respiração 4-7-8. |
| `/profile` | Protegida (RCC) | Gestão de dados pessoais, meta diária de estudos e histórico de conquistas. |

---

# 4. ARQUITETURA DE COMPONENTES (ATOMIC DESIGN + SHADCN/UI)

```
[ATOMS]       --> Button, Input, Badge, Avatar, Icon, Skeleton (Via @mqplus/ui)
[MOLECULES]   --> OptionButton, SearchInputFilter, StatCard, FormField
[ORGANISMS]   --> QuestionCard, SocraticHintDrawer, SimulationTimerBar, StudentSidebar
[TEMPLATES]   --> AuthLayoutTemplate, DashboardLayoutTemplate, ExamModeTemplate
[PAGES]       --> DashboardPage, QuestionsPage, FlashcardsReviewPage
```

---

# 5. COMPONENTES REUTILIZÁVEIS DA PLATAFORMA

- **`QuestionCard`:** Organismo responsável por renderizar a questão, tratar o clique nas alternativas (A, B, C, D, E), acionar o estado de carregamento e disparar o drawer da Dica Socrática.
- **`StatCard`:** Card de KPI com valor numérico, variação percentual (delta), ícone semântico e indicador de tendência.

---

# 6. ESTRATÉGIA DE GERENCIAMENTO DE ESTADO (ZUSTAND & TANSTACK QUERY)

1. **Zustand (`useAuthStore`):** Utilizado exclusivamente para estado global do cliente (Token de acesso JWT, dados do usuário logado, status do menu lateral e estado do tema).
2. **TanStack Query (React Query v5):** Utilizado para todo o estado de servidor (Server State). Gerencia requisições HTTP, cache automático, re-tentativas (*retries* em caso de falha de rede), revalidação em segundo plano (*stale-while-revalidate*) e mutações com atualizações otimistas (*Optimistic Updates*).

---

# 7. INTEGRAÇÃO DE API RESTFUL, QUERY CLIENT & AUTO REFRESH

O cliente HTTP `api-client.ts` é baseado na Fetch API nativa com invólucro customizado:
- **Requisições de Saída:** Injeta automaticamente o cabeçalho `Authorization: Bearer <token>` a partir da store Zustand.
- **Intercepção de Resposta 401 (Unauthorized):** Tenta realizar o refresh token via cookie HttpOnly de forma transparente. Se o refresh falhar, limpa a sessão Zustand e redireciona para `/login`.

---

# 8. FORMULÁRIOS DE ALTA PERFORMANCE (REACT HOOK FORM & ZOD)

Todos os formulários da aplicação utilizam a combinação **React Hook Form** + **Zod Schema Resolver**:
- Renders extremamente eficientes (sem re-renderizar a página inteira a cada caractere digitado).
- Validações síncronas fortemente tipadas no client-side espelhando as regras do backend.

---

# 9. FLUXO DE AUTENTICAÇÃO, ROTAS PROTEGIDAS & SESSÃO

As rotas dentro do grupo `(dashboard)` são protegidas pelo layout base que verifica a presença de sessão válida. Se o estado de autenticação estiver nulo ou expirado, o usuário é redirecionado instantaneamente para `/login` via cliente Next.js.

---

# 10. DIRETRIZES DE UX, ESTADOS DE INTERFACE E MICROINTERAÇÕES

Para cada tela ou componente dinâmico da plataforma, é obrigatória a implementação de 4 estados visuais:
1. **Loading State:** Exibição de Skeletons animados no padrão exato do componente final (evitando layout shift - CLS).
2. **Empty State:** Ilustração do mascote LOGI com mensagem clara e botão de ação primária (ex: *"Nenhum flashcard para revisar hoje! Que tal resolver 5 questões?"*).
3. **Error State:** Card de erro amigável com opção de tentar novamente (*Retry button*).
4. **Success State:** Micro-animação com confetes (Framer Motion) e toast de notificação positivo.

---

# 11. ARQUITETURA RESPONSIVA (PARADIGMA MOBILE FIRST)

```
[DISPOSITIVO MOBILE (< 768px)]
 ├── Layout em Coluna Única (4 colunas de grid)
 ├── Topbar Simplificada com Isotipo LOGI
 └── Bottom Navigation Bar com 4 Ícones Fixos (Home, Questões, Flashcards, Perfil)

[DISPOSITIVO DESKTOP (>= 1024px)]
 ├── Sidebar Esquerda Retrátil com Submenus
 ├── Grid Principal de 12 Colunas
 └── Widget Lateral de Desempenho e IA Tutor
```

---

# 12. ACESSIBILIDADE DE ACORDO COM WCAG 2.2 AA

- **Foco Teclado:** Todo elemento interativo possui anel de foco `ring-2 ring-primary` visível.
- **Marcação Semântica:** Uso estrito de tags HTML5 (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`).
- **Suporte a Screen Readers:** Textos alternativos `aria-label` em botões de apenas ícone e regiões dinâmicas marcadas com `aria-live="polite"`.

---

# 13. OTIMIZAÇÃO DE PERFORMANCE WEB (CORE WEB VITALES)

- **FCP (First Contentful Paint):** `< 1.2s` através do pré-carregamento dos componentes do Design System.
- **LCP (Largest Contentful Paint):** `< 2.0s` com otimização automática de imagens via `next/image`.
- **CLS (Cumulative Layout Shift):** `< 0.05` pela utilização de tamanhos fixos para containers e skeletons.

---

# 14. ESTRATÉGIA DE SEO & ESTRUTURA DE METADADOS

Páginas públicas utilizam a API de Metadados do Next.js App Router para injeção dinâmica de tags `title`, `description`, `openGraph` e dados estruturados em JSON-LD (`schema.org/EducationalOrganization`).

---

# 15. ARQUITETURA PWA (PROGRESSIVE WEB APP)

O frontend conta com os arquivos `manifest.json` e ícones de alta resolução configurados no diretório `public/`, preparando o app para instalação na tela inicial (*Add to Home Screen*) e suporte a notificações push nativas em atualizações futuras.

---

# 16. ESTRATÉGIA DE TESTES (JEST, REACT TESTING LIBRARY, PLAYWRIGHT)

- **Testes de Componentes (RTL):** Validação de renderização de estados do `QuestionCard` (seleção de alternativa, exibição de gabarito).
- **Testes E2E (Playwright):** Automação do fluxo completo do aluno: Login -> Seleção de Matéria -> Resolução de Questão -> Visualização de XP no Dashboard.

---

# 17. PADRÕES DE NOMENCLATURA E CONVENÇÕES DE CÓDIGO

- **Componentes:** PascalCase (`QuestionCard.tsx`, `OptionButton.tsx`).
- **Custom Hooks:** camelCase com prefixo 'use' (`useQuestions.ts`, `useAuth.ts`).
- **Stores Zustand:** Kebab-case ou camelCase com sufixo '-store' (`use-auth-store.ts`).

---

# 18. LISTAGEM DE ARQUIVOS CRIADOS NO FRONTEND

1. `FRONTEND.md` (Documentação Oficial)
2. `apps/web/src/lib/api-client.ts`
3. `apps/web/src/store/use-auth-store.ts`
4. `apps/web/src/features/questions/components/question-card.tsx`
5. `apps/web/src/features/auth/components/login-form.tsx`
6. `apps/web/src/app/(auth)/login/page.tsx`
7. `apps/web/src/app/(dashboard)/dashboard/page.tsx`
8. `apps/web/src/app/(dashboard)/questions/page.tsx`
9. `apps/web/src/app/layout.tsx`
10. `apps/web/src/app/page.tsx`

---

# 19. JUSTIFICATIVAS TÉCNICAS E DESIGN TRADE-OFFS

- **Next.js App Router:** Escolhido pela arquitetura moderna de React Server Components que reduz o bundle JavaScript enviado ao navegador do aluno em até 60% comparado ao Pages Router tradicional.
- **Zustand vs Redux:** Zustand selecionado por sua simplicidade minimalista, sem *boilerplate*, excelente performance e integração perfeita com SSR sem problemas de hidratação.

---

# 20. CÓDIGO-BASE IMPLEMENTADO NO FRONTEND (`apps/web`)

*(Os artefatos de código completos foram implementados no projeto `apps/web`).*

---

# 21. GUIA DE EXECUÇÃO LOCAL E CONEXÃO COM A API BACKEND

1. Certificar que o Backend NestJS está rodando em `http://localhost:4000`.
2. Executar Frontend Web: `pnpm --filter @mqplus/web dev`
3. Acessar aplicação: [http://localhost:3000](http://localhost:3000)

---

# 22. PLANO DE EVOLUÇÃO PARA PWA OFFLINE E WEBSOCKETS

Na versão V2, adicionará a estratégia de Service Workers via `next-pwa` com suporte a armazenamento local (IndexedDB) de questões ativas para permitir a resolução de simulados sem conexão com a internet.

---
*Fim da Especificação de Engenharia de Frontend Web.*
