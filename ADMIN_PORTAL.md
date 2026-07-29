# ESPECIFICAÇÃO DE ARQUITETURA E ENGENHARIA DO PORTAL ADMINISTRATIVO — MQPLUS
## Next.js (App Router), Enterprise Dashboard, RBAC de 12 Perfis, Reusable DataTables & CMS Pedagógico

**Versão da Arquitetura do Portal Admin:** 1.0.0  
**Autor:** Principal Frontend Architect & Enterprise Systems Specialist  
**Status:** Aprovado como Padrão Oficial do Portal Administrativo (Master Project Document - MPD)  
**Data:** Julho de 2026  

---

## SUMÁRIO EXECUTIVO E ÍNDICE
1. [VISÃO GERAL DO PORTAL ADMINISTRATIVO](#1-vis%C3%83o-geral-do-portal-administrativo)
2. [MATRIZ DE PERFIS DE ACESSO & PERMISSÕES (RBAC - 12 PERFIS)](#2-matriz-de-perfis-de-acesso--permiss%C3%95es-rbac---12-perfis)
3. [MAPEAMENTO DE MÓDULOS DO PORTAL ADMIN](#3-mapeamento-de-m%C3%93dulos-do-portal-admin)
4. [ESTRUTURA DE PASTAS DO PORTAL ADMIN (`apps/admin/src/`)](#4-estrutura-de-pastas-do-portal-admin-appsadminsrc)
5. [ARQUITETURA DE COMPONENTES CORPORATIVOS (SHADCN/UI & DATATABLE)](#5-arquitetura-de-componentes-corporativos-shadcnui--datatable)
6. [DASHBOARD EXECUTIVO & PAINEL DE ANÁLISES](#6-dashboard-executivo--painel-de-an%C3%81lises)
7. [ARQUITETURA DE CRUD GENÉRICO REUTILIZÁVEL (`<DataTable<T> />`)](#7-arquitetura-de-crud-gen%C3%89rico-reutiliz%C3%81vel-datatablet--)
8. [GERENCIAMENTO DE ESTADO ADMIN (ZUSTAND & TANSTACK QUERY)](#8-gerenciamento-de-estado-admin-zustand--tanstack-query)
9. [FORMULÁRIOS ADMINISTRATIVOS (REACT HOOK FORM & ZOD)](#9-formul%C3%81rios-administrativos-react-hook-form--zod)
10. [AUTENTICAÇÃO SEGRA, SESSÃO & PROTEÇÃO DE ROTAS ADMIN](#10-autentica%C3%87%C3%83o-segra-sess%C3%83o--prote%C3%87%C3%83o-de-rotas-admin)
11. [ARQUITETURA DE SEGURANÇA E AUDITORIA DE AÇÕES (AUDIT LOGS)](#11-arquitetura-de-seguran%C3%87a-e-auditoria-de-a%C3%87%C3%95es-audit-logs)
12. [DIRETRIZES DE UX E PRODUTIVIDADE CORPORATIVA](#12-diretrizes-de-ux-e-produtividade-corporativa)
13. [RESPONSIVIDADE CORPORATIVA (DESKTOP / NOTEBOOK / TABLET)](#13-responsividade-corporativa-desktop--notebook--tablet)
14. [DIRETRIZES DE ACESSIBILIDADE (WCAG 2.2 AA)](#14-diretrizes-de-acessibilidade-wcag-22-aa)
15. [DESEMPENHO & VIRTUALIZAÇÃO DE GRANDES CONJUNTOS DE DADOS](#15-desempenho--virtualiza%C3%87%C3%83o-de-grandes-conjuntos-de-dados)
16. [ESTRATÉGIA DE TESTES AUTOMATIZADOS ADMIN](#16-estrat%C3%89gia-de-testes-automatizados-admin)
17. [PADRÕES DE NOMENCLATURA E CONVENÇÕES DE CÓDIGO](#17-padr%C3%95es-de-nomenclatura-e-conven%C3%87%C3%95es-de-c%C3%B3digo)
18. [LISTAGEM COMPLETA DE ARQUIVOS DO PORTAL ADMIN](#18-listagem-completa-de-arquivos-do-portal-admin)
19. [JUSTIFICATIVAS TÉCNICAS E DESIGN TRADE-OFFS](#19-justificativas-t%C3%A9cnicas-e-design-trade-offs)
20. [CÓDIGO-BASE IMPLEMENTADO NO PORTAL ADMIN (`apps/admin`)](#20-c%C3%93digo-base-implementado-no-portal-admin-appsadmin)
21. [GUIA DE EXECUÇÃO LOCAL E VALIDAÇÃO DE PERMISSÕES](#21-guia-de-execu%C3%87%C3%83o-local-e-valida%C3%87%C3%83o-de-permiss%C3%95es)
22. [PLANO DE EVOLUÇÃO PARA MULTI-TENANT E WORKFLOWS COM IA](#22-plano-de-evolu%C3%87%C3%83o-para-multi-tenant-e-workflows-com-ia)

---

# 1. VISÃO GERAL DO PORTAL ADMINISTRATIVO

### 1.1 Propósito Arquitetural
O **Portal Administrativo do MQPLUS (`@mqplus/admin`)** é uma aplicação web corporativa de alta produtividade projetada para orquestrar toda a operação pedagógica, financeira, de suporte e de moderação da plataforma educacional. Ele foi desenvolvido sobre a infraestrutura **Next.js 14 App Router** reutilizando o Design System **`@mqplus/ui`** e o pacote de primitivos **`@mqplus/core`**.

```
+-----------------------------------------------------------------------------------+
|                        ARQUITETURA DO PORTAL ADMINISTRATIVO                       |
+-----------------------------------------------------------------------------------+
|  [ Operadores / Gestores / Professores / Revisores ]                              |
|                            | (Autenticação RBAC por Função)                       |
|                            v                                                      |
|  [ Admin App: Next.js (App Router / Client Components / TanStack Query) ]         |
|        ├── Módulo CMS: Cadastros Pedagógicos (Questões, TRI, Simulados)          |
|        ├── Módulo B2B: Gestão de Turmas, Escolas e Relatórios Coordenadores     |
|        ├── Módulo Operacional: Suporte, Atendimento, Mentoria & Saúde Mental    |
|        └── Módulo Executivo: Financeiro, Assinaturas, Métricas & Auditoria       |
|                            |                                                      |
|                            v (REST API HTTPS / Bearer Token)                      |
|  [ MQPLUS Core API / NestJS Backend ]                                             |
+-----------------------------------------------------------------------------------+
```

---

# 2. MATRIZ DE PERFIS DE ACESSO & PERMISSÕES (RBAC - 12 PERFIS)

A segurança do Portal Admin é regulada por uma **Matriz Matricial de Controle de Acesso Baseado em Funções (RBAC)**:

| Perfil de Acesso | Permissões Principais | Restrições / Escopo de Acesso |
| :--- | :--- | :--- |
| **Administrador Geral** | Acesso total irrestrito (CRUD de usuários, parametrizações globais, logs de auditoria e financeiro). | Nenhuma restrição. |
| **Administrador** | Gestão operacional, criação de colaboradores e moderação de conteúdo. | Sem permissão de alteração de chaves globais do sistema. |
| **Coordenador Pedagógico** | Montagem de simulados, relatórios de turmas B2B e métricas de desempenho. | Acesso restrito aos dados das turmas e escolas associadas. |
| **Professor** | Cadastro de questões, elaboração de listas e acompanhamento de dúvidas. | Acesso de edição restrito aos conteúdos de sua disciplina. |
| **Conteudista** | Redação de itens, resoluções comentadas e elaboração de flashcards. | Não pode publicar diretamente (requer aprovação do Revisor). |
| **Revisor Pedagógico** | Homologação de questões, validação de parâmetros TRI e aprovação de gabaritos. | Sem permissão de exclusão definitiva de registros. |
| **Mentor Educacional** | Visualização da rotina de estudo dos mentorados e agendamento de reuniões. | Acesso apenas aos dados de estudantes vinculados à sua mentoria. |
| **Psicólogo** | Acompanhamento de relatórios de ansiedade autorizados e agenda de suporte. | Dados clínicos sensíveis (SIGILO) — sem acesso a notas/financeiro. |
| **Atendimento / Suporte** | Chamados de usuários, reset de senhas e auxílio no uso da plataforma. | Sem acesso a edições pedagógicas ou relatórios financeiros globais. |
| **Marketing** | Gestão de cupons de desconto, banners de aviso e campanhas de e-mail. | Sem acesso ao banco de dados pedagógico. |
| **Financeiro** | Gestão de assinaturas, inadimplência, repasses e faturamento SaaS B2B. | Acesso exclusivo ao módulo financeiro. |

---

# 3. MAPEAMENTO DE MÓDULOS DO PORTAL ADMIN

```
Portal Admin Modules
├── 01. Dashboard Executivo & Operacional
├── 02. Gestão de Usuários & Matriz RBAC
├── 03. CMS Pedagógico (Banco de Questões, TRI, Alternativas)
├── 04. Editor de Simulados & Validação de Matriz
├── 05. Gestão de Flashcards & Decks SRS
├── 06. Portal B2B Escolas (Turmas, Alunos, Coordenadores)
├── 07. Atendimento, Suporte & Chamados
├── 08. Módulo de Mentoria & Acompanhamento Emocional
├── 09. Financeiro & Faturamento SaaS B2B/B2C
└── 10. Auditoria, Logs de Sistema & Configurações
```

---

# 4. ESTRUTURA DE PASTAS DO PORTAL ADMIN (`apps/admin/src/`)

```
apps/admin/src/
├── app/                        # Next.js App Router (Rotas Admin Protegidas)
│   ├── (auth)/                 # Login do Operador/Admin
│   ├── (dashboard)/            # Dashboard Executivo e Módulos
│   │   ├── dashboard/          # Painel Principal KPIs
│   │   ├── questions/          # CMS de Gestão de Questões
│   │   ├── users/              # Gestão de Usuários e RBAC
│   │   ├── simulations/        # Cadastro e montagem de Simulados
│   │   └── layout.tsx          # Layout com Sidebar Admin + Topbar Operacional
│   ├── layout.tsx              # Root Layout Admin
│   └── page.tsx                # Redirecionador automático para /login
├── components/                 # Componentes genéricos de UI Admin
│   ├── common/                 # DataTable<T>, FilterBar, StatusBadge, PageHeader
│   └── layout/                 # AdminSidebar, AdminTopbar
├── features/                   # Funcionalidades isoladas por contexto
│   ├── questions-cms/          # Formulários de Ingestão de Questões e Parâmetros TRI
│   └── users-rbac/             # Tabela de Usuários e Editor de Permissões
├── hooks/                      # Custom Hooks (useAdminAuth, useDataTable)
├── lib/                        # Client HTTP (api-client.ts) e RBAC Evaluator
├── providers/                  # Provedores React
├── store/                      # Zustand Store de Sessão Admin (`useAdminAuthStore`)
└── types/                      # Tipagens TypeScript do Admin
```

---

# 5. ARQUITETURA DE COMPONENTES CORPORATIVOS (SHADCN/UI & DATATABLE)

O Portal Admin adota componentes corporativos de altíssima densidade de informação:
- **`AdminSidebar`:** Menu lateral sanfonado com agrupação por módulos e badges com contador de pendências (ex: *"5 Questões para Revisão"*).
- **`DataTable<T>`:** Componente genérico construído sobre `@tanstack/react-table` com ordenação por coluna, seleção múltipla de linhas, paginação via servidor e exportação para CSV/Excel.

---

# 6. DASHBOARD EXECUTIVO & PAINEL DE ANÁLISES

O Dashboard Executivo apresenta 4 indicadores estratégicos em tempo real:
1. **MRR / ARR (Faturamento SaaS):** Total de receita recorrente mensal e anual.
2. **MAU / DAU (Usuários Ativos):** Volume de estudantes estudando ativamente na plataforma no dia.
3. **Fila de Revisão Pedagógica:** Questões submetidas por conteudistas aguardando aprovação do Revisor.
4. **Volume de Resoluções TRI:** Total de questões respondidas nas últimas 24 horas.

---

# 7. ARQUITETURA DE CRUD GENÉRICO REUTILIZÁVEL (`<DataTable<T> />`)

Para evitar duplicação de código de listagem, o componente `<DataTable<T> />` encapsula:
- Estado de busca (*Search Input* com debounce).
- Filtros dinâmicos configuráveis por coluna.
- Ações em lote (*Bulk Actions* como ativar, desativar ou exportar selecionados).

---

# 8. GERENCIAMENTO DE ESTADO ADMIN (ZUSTAND & TANSTACK QUERY)

- **`useAdminAuthStore` (Zustand):** Armazena o token JWT do operador, nome, foto, perfil de acesso (`role`) e lista de permissões específicas.
- **TanStack Query:** Gerencia o estado dos CRUDs com invalidação automática ao concluir mutações (*Create / Update / Delete*).

---

# 9. FORMULÁRIOS ADMINISTRATIVOS (REACT HOOK FORM & ZOD)

Formulários complexos (como a inserção de questões com 5 alternativas e parâmetros TRI $a, b, c$) utilizam schemas Zod com mensagens de erro validadas em tempo real antes da submissão à API.

---

# 10. AUTENTICAÇÃO SEGRA, SESSÃO & PROTEÇÃO DE ROTAS ADMIN

O acesso ao Portal Admin exige o papel de usuário diferente de `STUDENT`. Caso um aluno tente acessar a URL do portal admin, a guarda de rotas intercepta a requisição e exibe uma tela de **Acesso Negado (HTTP 403 Forbidden)**.

---

# 11. ARQUITETURA DE SEGURANÇA E AUDITORIA DE AÇÕES (AUDIT LOGS)

Todas as ações destrutivas (exclusão de usuários, alteração de gabarito ou alteração de permissão) disparam chamadas registradas no log de auditoria do backend contendo: `operatorId`, `actionType`, `targetEntity`, `previousState` e `newState`.

---

# 12. DIRETRIZES DE UX E PRODUTIVIDADE CORPORATIVA

- **Teclas de Atalho:** Suporte a atalhos de teclado (ex: `Ctrl + K` ou `Cmd + K` para abrir a barra de busca rápida global no admin).
- **Densidade de Dados:** Tabelas com altura de linha otimizada (compact mode) para exibição de mais dados por tela.

---

# 13. RESPONSIVIDADE CORPORATIVA (DESKTOP / NOTEBOOK / TABLET)

O Portal Admin é otimizado prioritariamente para telas de alta resolução (Desktop 1920x1080 e Notebooks 1366x768), oferecendo adaptação responsiva com menu retrátil para uso em Tablets (iPad / Galaxy Tab).

---

# 14. DIRETRIZES DE ACESSIBILIDADE (WCAG 2.2 AA)

Conformidade total com leitores de tela nas tabelas de dados através de atributos `aria-sort`, `aria-selected` e atalhos de teclado para navegação entre células.

---

# 15. DESEMPENHO & VIRTUALIZAÇÃO DE GRANDES CONJUNTOS DE DADOS

Listagens com mais de 1.000 itens por página utilizam virtualização de lista (`@tanstack/react-virtual`), garantindo que apenas as linhas visíveis na tela sejam renderizadas na DOM.

---

# 16. ESTRATÉGIA DE TESTES AUTOMATIZADOS ADMIN

- **Testes de Componentes:** Validação de filtros e paginação da `<DataTable />`.
- **Testes de Permissão (RBAC):** Validação de ocultação de botões de exclusão quando o usuário está logado com perfil de Revisor ou Conteudista.

---

# 17. PADRÕES DE NOMENCLATURA E CONVENÇÕES DE CÓDIGO

- **Componentes Admin:** PascalCase com sufixo descritivo (`QuestionCmsTable.tsx`, `UserRoleBadge.tsx`).
- **Features Admin:** Kebab-case (`questions-cms`, `users-rbac`).

---

# 18. LISTAGEM COMPLETA DE ARQUIVOS DO PORTAL ADMIN

1. `ADMIN_PORTAL.md` (Documentação Oficial)
2. `apps/admin/package.json`
3. `apps/admin/tsconfig.json`
4. `apps/admin/src/lib/api-client.ts`
5. `apps/admin/src/store/use-admin-auth-store.ts`
6. `apps/admin/src/components/layout/admin-sidebar.tsx`
7. `apps/admin/src/components/common/data-table.tsx`
8. `apps/admin/src/app/(auth)/login/page.tsx`
9. `apps/admin/src/app/(dashboard)/layout.tsx`
10. `apps/admin/src/app/(dashboard)/dashboard/page.tsx`
11. `apps/admin/src/app/(dashboard)/questions/page.tsx`

---

# 19. JUSTIFICATIVAS TÉCNICAS E DESIGN TRADE-OFFS

- **Compartilhamento de Pacotes (`@mqplus/ui` e `@mqplus/database`):** Mantém a identidade visual idêntica e elimina a duplicidade de interfaces de dados entre a plataforma do estudante e o portal admin.
- **TanStack Table v8:** Selecionado como motor de tabelas por sua flexibilidade total sem estilos opinativos (Headless UI), permitindo estilização direta com Tailwind CSS.

---

# 20. CÓDIGO-BASE IMPLEMENTADO NO PORTAL ADMIN (`apps/admin`)

*(Os componentes e estruturas de código do Portal Admin foram implementados no projeto `apps/admin`).*

---

# 21. GUIA DE EXECUÇÃO LOCAL E VALIDAÇÃO DE PERMISSÕES

1. Iniciar Docker e Backend API.
2. Executar Portal Admin: `pnpm --filter @mqplus/admin dev -p 3001`
3. Acessar Portal Admin: [http://localhost:3001](http://localhost:3001)

---

# 22. PLANO DE EVOLUÇÃO PARA MULTI-TENANT E WORKFLOWS COM IA

O Portal Admin está estruturado para suportar a adição de **Multi-Tenancy** na V3 (permitindo que gestores de Redes de Ensino B2B acessem sub-painéis customizados da sua própria escola) e workflows de inteligência artificial para moderação automática de dados.

---
*Fim da Especificação do Portal Administrativo.*
