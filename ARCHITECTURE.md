# ESPECIFICAÇÃO DE ARQUITETURA TÉCNICA E ENGENHARIA DE SISTEMAS — MQPLUS
## Arquitetura Hexagonal, Monólito Modular, Domain-Driven Design (DDD), Clean Architecture & Monorepo

**Versão da Arquitetura:** 1.0.0  
**Autor:** Chief Software Architect & Enterprise Architect  
**Status:** Aprovado como Padrão Oficial do Sistema (Master Project Document - MPD)  
**Data:** Julho de 2026  

---

## SUMÁRIO EXECUTIVO E ÍNDICE
1. [VISÃO GERAL DA ARQUITETURA](#1-vis%C3%83o-geral-da-arquitetura)
2. [JUSTIFICATIVA DA ARQUITETURA & ANÁLISE COMPARATIVA](#2-justificativa-da-arquitetura--an%C3%81lise-comparativa)
3. [DOMAIN-DRIVEN DESIGN (DDD) — MODELAGEM DE DOMÍNIO](#3-domain-driven-design-ddd--modelagem-de-dom%C3%ADnio)
4. [MÓDULOS DA APLICAÇÃO & MAPA DE CONTEXTOS](#4-m%C3%93dulos-da-aplica%C3%87%C3%83o--mapa-de-contextos)
5. [C4 MODEL (PLANTUML & DIAGRAMAS DE ARQUITETURA)](#5-c4-model-plantuml--diagramas-de-arquitetura)
6. [ARQUITETURA DO MONOREPO](#6-arquitetura-do-monorepo)
7. [PADRÕES DE PROJETO (DESIGN PATTERNS)](#7-padr%C3%95es-de-projeto-design-patterns)
8. [CLEAN ARCHITECTURE & ARQUITETURA HEXAGONAL](#8-clean-architecture--arquitetura-hexagonal)
9. [ORGANIZAÇÃO DOS PACOTES DO MONOREPO](#9-organiza%C3%87%C3%83o-dos-pacotes-do-monorepo)
10. [ESPECIFICAÇÃO DE API RESTFUL & CONTRATOS](#10-especifica%C3%87%C3%83o-de-api-restful--contratos)
11. [ARQUITETURA DE SEGURANÇA, AUTENTICAÇÃO E COMPLIANCE](#11-arquitetura-de-seguran%C3%87a-autentica%C3%87%C3%83o-e-compliance)
12. [ESTRATÉGIA DE CACHE & INVALIDAÇÃO (REDIS)](#12-estrat%C3%89gia-de-cache--invalida%C3%87%C3%83o-redis)
13. [ARQUITETURA DE EVENTOS E ASINCRONISMO](#13-arquitetura-de-eventos-e-assincronismo)
14. [OBSERVABILIDADE, TELEMETRIA E LOGS ESTRUTURADOS](#14-observabilidade-telemetria-e-logs-estruturados)
15. [ESTRATÉGIA DE ESCALABILIDADE E HIGH AVAILABILITY](#15-estrat%C3%89gia-de-escalabilidade-e-high-availability)
16. [ESTRATÉGIA DE TESTES AUTOMATIZADOS E QUALIDADE DE CÓDIGO](#16-estrat%C3%89gia-de-testes-automatizados-e-qualidade-de-c%C3%93digo)
17. [CONVENÇÕES DE CÓDIGO, COMMITS E GIT FLOW](#17-conven%C3%87%C3%95es-de-c%C3%93digo-commits-e-git-flow)
18. [ARCHITECTURAL DECISION RECORDS (ADRS)](#18-architectural-decision-records-adrs)
19. [ESTRUTURA DE PASTAS DO MONOREPO COMPLETO](#19-estrutura-de-pastas-do-monorepo-completo)
20. [LISTAGEM DE ARQUIVOS DE INFRAESTRUTURA E ESTRUTURA INICIAL](#20-listagem-de-arquivos-de-infraestrutura-e-estrutura-inicial)
21. [JUSTIFICATIVAS TÉCNICAS E DESIGN TRADE-OFFS](#21-justificativas-t%C3%A9cnicas-e-design-trade-offs)
22. [IMPLEMENTAÇÃO INICIAL DA ESTRUTURA DO PROJETO](#22-implementa%C3%87%C3%83o-inicial-da-estrutura-do-projeto)
23. [ESTRATÉGIA DE TESTES E VALIDAÇÃO DE ARQUITETURA](#23-estrat%C3%A9gia-de-testes-e-valida%C3%A7%C3%83o-de-arquitetura)
24. [PLANO DE EVOLUÇÃO ESTRATÉGICA E PREPARAÇÃO PARA MICROSSERVIÇOS](#24-plano-de-evolu%C3%87%C3%83o-estrat%C3%89gica-e-prepara%C3%87%C3%83o-para-microsservi%C3%87os)

---

# 1. VISÃO GERAL DA ARQUITETURA

### 1.1 Visão Arquitetural
A arquitetura do **MQPLUS** é projetada como um **Monólito Modular Baseado em Monorepo**, aplicando os princípios do **Domain-Driven Design (DDD)**, **Clean Architecture** e **Arquitetura Hexagonal (Ports & Adapters)**. Esta escolha garante desacoplamento estrito entre os contextos de negócio (Questões, Simulados TRI, IA, Flashcards SRS, Saúde Mental, B2B Escolas), permitindo evolução independente dos módulos sem a complexidade operacional prematura de uma rede distribuída de microsserviços.

```
+-----------------------------------------------------------------------------------+
|                            VISÃO GERAL DA ARQUITETURA                             |
+-----------------------------------------------------------------------------------+
|  [ FRONTEND (Next.js / App Router / React / Tailwind / @mqplus/ui) ]              |
|                                     |  (REST API / HTTPS / TLS 1.3)               |
|                                     v                                             |
|  [ BACKEND (NestJS / Modular Monolith / TypeScript / Clean Architecture) ]        |
|     ├── Bounded Context: Auth & Identity                                          |
|     ├── Bounded Context: Questions & Item Bank (TRI Engine)                       |
|     ├── Bounded Context: Spaced Repetition (SRS Engine / SM-2)                    |
|     ├── Bounded Context: Socratic AI & Pedagogy (RAG)                             |
|     └── Bounded Context: Mental Health & Analytics                                |
|                                     |                                             |
|     +-------------------------------+-------------------------------+             |
|     |                               |                               |             |
|     v                               v                               v             |
| [ PostgreSQL 16 ]            [ Redis 7 Cache ]              [ Meilisearch ]       |
| (Relational Data & TRI)     (Queue, Session, RateLimit)    (Fulltext Questions)   |
+-----------------------------------------------------------------------------------+
```

### 1.2 Objetivos Arquiteturais
* **Escalabilidade Sustentável:** Suportar picos de 50.000 usuários simultâneos durante a realização de Simulados Nacionais através de réplicas de leitura e filas assíncronas.
* **Testabilidade Elevada:** Permitir cobertura de testes unitários superior a 85% no Domínio do Backend através de injeção de dependência e inversão de controle.
* **Resiliência a Mudanças:** Isolamento completo de dependências externas (ex: APIs de LLM, gateways de pagamento, envio de e-mail) via Adaptadores e Portas de abstração.
* **Manutenibilidade e Coesão:** Código limpo (*Clean Code*) com regras de negócio puras, livres de qualquer acoplamento com frameworks ou ORMs.

### 1.3 Princípios Fundamentais
1. **Separation of Concerns (SoC):** Cada camada possui responsabilidade estrita. A camada de Domínio nunca acessa o banco de dados diretamente.
2. **Dependency Inversion Principle (DIP):** Módulos de alto nível dependem de abstrações (interfaces), não de implementações concretas de infraestrutura.
3. **Domain-Centric:** O modelo de domínio reflete com precisão os processos da educação brasileira (TRI, Matriz ENEM, BNCC, SRS).

---

# 2. JUSTIFICATIVA DA ARQUITETURA & ANÁLISE COMPARATIVA

### 2.1 Matriz Comparativa de Opções Arquiteturais

| Critério de Comparação | Monólito Tradicional | Microsserviços Distribuidos | Serverless (FaaS) | **Monólito Modular (Escolha MQPLUS)** |
| :--- | :--- | :--- | :--- | :--- |
| **Complexidade Operacional** | Baixa | Altíssima | Média | **Baixa a Média** |
| **Fronteiras de Domínio** | Fracas (Riscos de Spaghetti) | Fortes | Fragmentadas | **Fortes (Módulos Isolados)** |
| **Custo de Infraestrutura** | Baixo | Alto (K8s, Service Mesh) | Variável (Alto em pico) | **Otimizado (Container Docker)** |
| **Velocidade de Deploy** | Rápida no início, lenta depois | Independente (Complexa) | Independente | **Rápida e Unificada** |
| **Facilidade de Migração Futura** | Difícil | N/A | Dificultada por Lock-in | **Trivial (Extração de Módulos)** |

### 2.2 Justificativa da Escolha do Monólito Modular
A adoção de microsserviços no Estágio MVP / V2 imporia uma sobrecarga desnecessária de observabilidade distribuída (Distributed Tracing, Eventual Consistency, Latência de Rede e Kubernetes Orchestration). O **Monólito Modular** com Clean Architecture permite o **isolamento lógico completo** dos módulos dentro do mesmo processo NestJS, viabilizando a futura extração de qualquer subdomínio (ex: *Engine de IA* ou *Engine de TRI*) para um microsserviço independente sem reescrever as regras de negócio de domínio.

---

# 3. DOMAIN-DRIVEN DESIGN (DDD) — MODELAGEM DE DOMÍNIO

### 3.1 Bounded Contexts (Contextos Delimitados) e Subdomínios

```
+-----------------------------------------------------------------------------------+
|                              MAPA DE BOUNDED CONTEXTS                             |
+-----------------------------------------------------------------------------------+
|  [ CORE DOMAIN: Aprendizagem Ativa ]                                             |
|   ├── Bounded Context: Banco de Questões & TRI                                    |
|   └── Bounded Context: Repetição Espaçada (SRS Engine)                            |
|                                                                                   |
|  [ SUPPORTING DOMAIN: Inteligência & Orientação ]                                 |
|   ├── Bounded Context: Tutor de IA Socrático (RAG)                                |
|   ├── Bounded Context: Guia de Carreiras & Teste Vocacional                       |
|   └── Bounded Context: Saúde Mental & Bem-Estar                                   |
|                                                                                   |
|  [ GENERIC DOMAIN: Gestão & Operação ]                                            |
|   ├── Bounded Context: Autenticação, Identidade & RBAC                            |
|   ├── Bounded Context: Assinaturas & Financeiro (SaaS Billing)                    |
|   └── Bounded Context: Gamificação & Engajamento                                  |
+-----------------------------------------------------------------------------------+
```

### 3.2 Linguagem Ubíqua (Ubiquitous Language)
- **Item / Questão:** Unidade fundamental de avaliação contendo enunciado, alternativas, distratores e parâmetros TRI ($a, b, c$).
- **Parâmetro TRI $b$ (Dificuldade):** Valor numérico que posiciona o nível de exigência conceitual do item na escala do Inep.
- **Fator de Facilidade ($EF$):** Multiplicador numérico do algoritmo SM-2 que ajusta o intervalo de exibição de um flashcard.
- **Dica Socrática:** Resposta gerada pela IA contendo orientação metacognitiva sem revelar a alternativa correta.
- **Streak:** Sequência diária ininterrupta de metas de estudo concluídas.

### 3.3 Exemplo de Agregado e Entidade de Domínio (TypeScript Pure)

```typescript
// Domain Entity: Question (Pure DDD Domain)
export interface QuestionParams {
  id: string;
  stem: string;
  options: Option[];
  disciplineId: string;
  triParameters: TRIParameters;
  createdAt: Date;
}

export class Question {
  private props: QuestionParams;

  constructor(props: QuestionParams) {
    this.validate(props);
    this.props = props;
  }

  private validate(props: QuestionParams): void {
    if (props.options.length < 2) {
      throw new Error('Uma questão deve possuir no mínimo 2 alternativas.');
    }
  }

  public get id(): string { return this.props.id; }
  public get triParameters(): TRIParameters { return this.props.triParameters; }

  public isCorrect(optionId: string): boolean {
    const option = this.props.options.find(o => o.id === optionId);
    return option ? option.isCorrect : false;
  }
}
```

---

# 4. MÓDULOS DA APLICAÇÃO & MAPA DE CONTEXTOS

| Módulo Backend (NestJS) | Bounded Context | Responsabilidade Principal |
| :--- | :--- | :--- |
| `AuthModule` | Identity & Access | Login, JWT Token Refresh, RBAC e validação de consentimento LGPD. |
| `UsersModule` | User Profile | Gestão de dados cadastrais do aluno, preferências e histórico de metas. |
| `QuestionsModule` | Item Bank & TRI | Ingestão, categorização por habilidades BNCC e cálculo de nota por TRI. |
| `SimulationsModule` | Evaluation Engine | Execução cronometrada de simulados e geração de relatórios preditivos. |
| `FlashcardsModule` | Spaced Repetition | Algoritmo SM-2 de agendamento de revisões espaçadas ativas. |
| `AiTutorModule` | Socrative Pedagogy | Orquestração do RAG, integração com LLMs e salvaguardas socráticas. |
| `MentalHealthModule` | Student Wellbeing | Diário de humor, triagem GAD-7 e gatilhos de alerta de exaustão mental. |
| `GamificationModule` | Engagement | Contadores de Streaks, atribuição de XP, Ligas e desbloqueio de Badges. |
| `AnalyticsModule` | Business & Pedagogy BI | Métricas de engajamento, retenção cohort e relatórios para escolas. |

---

# 5. C4 MODEL (DIAGRAMAS ARQUITETURAIS VIA PLANTUML)

### 5.1 Nível 1: Diagrama de Contexto (Context Diagram)

```plantuml
@startuml ContextDiagram
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Context.puml

Person(student, "Estudante", "Aluno do Ensino Médio ou Vestibulando")
Person(coordinator, "Coordenador Escolar", "Gestor pedagógico B2B")

System(mqplus, "Plataforma MQPLUS", "Ecossistema Inteligente de Aprendizagem e Preparação")

System_Ext(openAI, "API de LLM / IA", "Tutor Cognitivo Socrático")
System_Ext(paymentGateway, "Gateway de Pagamento", "Processamento de assinaturas SaaS")

Rel(student, mqplus, "Resolve questões, simulados, estuda via flashcards e consulta IA")
Rel(coordinator, mqplus, "Gera provas, acompanha métricas e turmas")
Rel(mqplus, openAI, "Envia prompts socráticos e recebe dicas com contexto RAG")
Rel(mqplus, paymentGateway, "Processa pagamentos de planos de assinatura")
@enduml
```

### 5.2 Nível 2: Diagrama de Contêineres (Container Diagram)

```
+-----------------------------------------------------------------------------------+
|                              DIAGRAMA DE CONTÊINERES                              |
+-----------------------------------------------------------------------------------+
|  [ Web Client: Next.js (App Router) ]   <--->   [ Mobile Client: React Native ]  |
|                         \                             /                           |
|                          \                           /                            |
|                           v                         v                             |
|                   +---------------------------------------+                       |
|                   |  API Gateway & Core API (NestJS App)  |                       |
|                   +---------------------------------------+                       |
|                     /            |             |        \                         |
|                    v             v             v         v                        |
|            [ PostgreSQL ]   [ Redis Cache ]  [ BullMQ ] [ Meilisearch ]           |
|            (Dados e TRI)    (Sessões & Rate) (Fila/IA)  (Full-text Search)        |
+-----------------------------------------------------------------------------------+
```

---

# 6. ARQUITETURA DO MONOREPO

O Monorepo utiliza **Turborepo** + **pnpm Workspaces** para compartilhamento eficiente de código:

```
mqplus/ (Monorepo Root)
├── apps/
│   ├── api/             # Aplicação Backend NestJS (REST API)
│   └── web/             # Aplicação Frontend Next.js (App Router)
├── packages/
│   ├── ui/              # Design System React & Tailwind (@mqplus/ui)
│   ├── core/            # Entidades puras de Domínio e Casos de Uso (@mqplus/core)
│   ├── config/          # Eslint, Prettier, TSConfig compartilhados (@mqplus/config)
│   └── database/        # Cliente Prisma ORM e Schemas (@mqplus/database)
├── infra/               # Dockerfile, Docker Compose, Nginx, Helm Charts
└── turbo.json           # Configuração de pipelines do Turborepo
```

---

# 7. PADRÕES DE PROJETO (DESIGN PATTERNS)

1. **Repository Pattern:** Desacopla as regras de domínio da tecnologia de perssitência (Prisma ORM / PostgreSQL).
2. **Strategy Pattern:** Utilizado na Engine de Cálculo da TRI e no Algoritmo de Repetição Espaçada (facilidade de trocar a versão do algoritmo sem impactar o uso).
3. **Factory Pattern:** Instanciação de Agregados complexos de Domínio a partir de dados brutos do banco de dados.
4. **Adapter Pattern:** Adaptação de serviços de terceiros (envio de e-mail SendGrid, OpenAI API, Meilisearch) para interfaces internas.
5. **Decorator Pattern:** Utilizado no NestJS para validação de DTOs (`class-validator`) e guarda de autenticação (`@UseGuards(JwtAuthGuard)`).
6. **Command/Mediator Pattern:** Utilizado no orquestrador CQRS para separação entre comandos de escrita e queries de leitura.

---

# 8. CLEAN ARCHITECTURE & ARQUITETURA HEXAGONAL

```
+-------------------------------------------------------------------+
|                        CLEAN ARCHITECTURE                         |
+-------------------------------------------------------------------+
| [ PREVENTATION LAYER ] Controllers / GraphQL / DTOs               |
|   ↓                                                               |
| [ APPLICATION LAYER ] Use Cases / Commands / Queries / DTOs       |
|   ↓                                                               |
| [ DOMAIN LAYER ] Entities / Value Objects / Domain Events / Ports |
|   ↑                                                               |
| [ INFRASTRUCTURE LAYER ] Prisma ORM / Redis / OpenAI / Mailer     |
+-------------------------------------------------------------------+
```

- **Camada de Domínio (Enterprise Business Rules):** Totalmente isolada. Não importará dependências do NestJS ou Prisma.
- **Camada de Aplicação (Application Business Rules):** Contém os Casos de Uso (ex: `SubmitAnswerUseCase`, `CalculateTRINoteUseCase`).
- **Camada de Infraestrutura:** Implementa os Repositórios de Domínio (`PrismaQuestionRepository implements QuestionRepository`).

---

# 9. ORGANIZAÇÃO DOS PACOTES DO MONOREPO

- `@mqplus/core`: Pacote compartilhado contendo Value Objects (ex: `Email`, `CPF`), DTOs de contrato, tipos universais e validações de domínio.
- `@mqplus/database`: Pacote isolado com o schema Prisma, arquivos de migração e fábrica de instâncias do cliente PostgreSQL.
- `@mqplus/ui`: Pacote com os componentes atômicos React, Tailwind CSS e provedores de tema.

---

# 10. ESPECIFICAÇÃO DE API RESTFUL & CONTRATOS

### 10.1 Padrão de Resposta Unificado JSON
```json
{
  "success": true,
  "data": {
    "questionId": "q_987654321",
    "isCorrect": true,
    "earnedXP": 15,
    "currentStreak": 7
  },
  "meta": {
    "timestamp": "2026-07-29T15:00:00.000Z",
    "apiVersion": "v1"
  }
}
```

### 10.2 Tratamento Padrão de Erro (RFC 7807 Problem Details)
```json
{
  "success": false,
  "error": {
    "code": "QUESTION_NOT_FOUND",
    "message": "A questão solicitada não existe ou foi arquivada.",
    "details": []
  },
  "meta": {
    "timestamp": "2026-07-29T15:00:00.000Z"
  }
}
```

---

# 11. ARQUITETURA DE SEGURANÇA, AUTENTICAÇÃO E COMPLIANCE

1. **JWT & Refresh Tokens em Cookie HttpOnly:** Access Token com expiração de 15 minutos e Refresh Token rotativo armazenado no Redis com expiração de 7 dias.
2. **RBAC (Role-Based Access Control):** Hierarquia estrita de permissões via Decorators (`@Roles(Role.STUDENT, Role.ADMIN)`).
3. **Proteção contra Ataques:** Rate Limiting via `@nestjs/throttler` e Redis (máximo 100 requisições/minuto por IP), proteção CSRF via tokens SameSite=Strict e cabeçalhos de segurança com `helmet`.

---

# 12. ESTRATÉGIA DE CACHE & INVALIDAÇÃO (REDIS)

- **Cache de Questões e Gabaritos:** TTL de 24 horas. Chave: `questions:{id}`.
- **Invalidação:** Atualização via Evento de Domínio (`QuestionUpdatedEvent`) que limpa o cache específico no Redis.
- **Cache de Ranking e Streaks:** Estrutura de dados `Sorted Sets` do Redis para alta performance de rankings em tempo real.

---

# 13. ARQUITETURA DE EVENTOS E ASINCRONISMO

Para tarefas pesadas (envio de e-mails, processamento de simulado, correção de redação por IA), utiliza-se o **BullMQ** alimentado pelo Redis como Broker de Mensagens.

```
[ NestJS Core App ] --(Publica Evento)--> [ Redis BullMQ Queue ] 
                                                   |
                                                   v
                                        [ Background Worker Process ]
                                        (Processa TRI / Envia E-mail)
```

---

# 14. OBSERVABILIDADE, TELEMETRIA E LOGS ESTRUTURADOS

- **Logs Estruturados:** Formato JSON via `pino` contendo `traceId`, `userId`, `context` e `durationMs`.
- **Métricas:** Exposição de endpoint `/metrics` para raspagem do Prometheus.
- **Health Checks:** Probes de Liveness e Readiness acessíveis via `/health`.

---

# 15. ESTRATÉGIA DE ESCALABILIDADE E HIGH AVAILABILITY

- **Escalabilidade Horizontal:** Aplicações NestJS totalmente *stateless*. As instâncias podem ser dimensionadas via Docker/Kubernetes atrás de um Nginx/Load Balancer.
- **Banco de Dados (PostgreSQL):** Instância Principal para Operações de Escrita (Primary Write) e Read Replicas para Consultas de Questões e Relatórios.

---

# 16. ESTRATÉGIA DE TESTES AUTOMATIZADOS E QUALIDADE DE CÓDIGO

```
               /  E2E Tests (Playwright)  \          -> Cobertura: ~15%
              / Integration (Supertest)    \         -> Cobertura: ~30%
             / Unit Tests (Jest / Vitest)   \        -> Cobertura: ~85%
```

---

# 17. CONVENÇÕES DE CÓDIGO, COMMITS E GIT FLOW

- **Commits:** Padrão Conventional Commits (ex: `feat(questions): adiciona suporte ao parâmetro TRI b`).
- **Branches:** `main` (Produção), `develop` (Staging), `feature/nome-da-feature`.

---

# 18. ARCHITECTURAL DECISION RECORDS (ADRS)

### ADR 001: Adoção do Monólito Modular no Lugar de Microsserviços
- **Status:** Aprovado  
- **Contexto:** Necessidade de alta velocidade de entrega inicial mantendo baixo custo operacional sem comprometer o desacoplamento de código.  
- **Decisão:** Adotar a arquitetura de Monólito Modular com Clean Architecture e DDD em um Monorepo pnpm.  
- **Consequências:** Simplificação do deploy, eliminação da latência de rede entre serviços, permitindo extração futura de microsserviços se necessário.

### ADR 002: Escolha do PostgreSQL 16 com Prisma ORM
- **Status:** Aprovado  
- **Contexto:** Necessidade de integridade relacional estrita para o modelo de questões, usuários e simulados.  
- **Decisão:** Utilizar o PostgreSQL 16 como banco primário e o Prisma ORM como ferramenta de migração e consulta.

---

# 19. ESTRUTURA DE PASTAS DO MONOREPO COMPLETO

```
mqplus/
├── apps/
│   ├── api/
│   │   ├── src/
│   │   │   ├── modules/       # Módulos de Bounded Context (Auth, Questions, etc.)
│   │   │   ├── shared/        # Interceptadores, Guards e Filtros globais
│   │   │   ├── main.ts        # Ponto de entrada NestJS
│   │   │   └── app.module.ts  # Módulo Raiz
│   │   ├── test/              # Testes de Integração e E2E
│   │   └── package.json
│   └── web/
│       ├── src/               # Aplicação Next.js App Router
│       └── package.json
├── packages/
│   ├── core/                  # Domínio puro e regras DDD
│   ├── database/              # Schema Prisma e Migrações
│   └── ui/                    # Design System React
├── infra/
│   └── docker/                # Dockerfiles e Docker Compose
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

---

# 20. LISTAGEM DE ARQUIVOS DE INFRAESTRUTURA E ESTRUTURA INICIAL

1. `package.json` (Root Monorepo Config)
2. `pnpm-workspace.yaml`
3. `turbo.json`
4. `.gitignore`
5. `infra/docker/docker-compose.yml`
6. `apps/api/package.json`
7. `apps/api/tsconfig.json`
8. `apps/api/src/main.ts`
9. `apps/api/src/app.module.ts`
10. `apps/web/package.json`
11. `apps/web/tsconfig.json`
12. `packages/core/package.json`
13. `packages/core/src/index.ts`

---

# 21. JUSTIFICATIVAS TÉCNICAS E DESIGN TRADE-OFFS

1. **pnpm + Turborepo:** Escolhido por oferecer cache de build inteligente e gestão de dependências via links simbólicos extremamente rápida, economizando espaço em disco e acelerando pipelines de CI/CD.
2. **NestJS no Backend:** Oferece uma estrutura opinativa inspirada na arquitetura corporativa, simplificando a implementação de injeção de dependência, guards e módulos desacoplados.

---

# 22. IMPLEMENTAÇÃO INICIAL DA ESTRUTURA DO PROJETO

*(Os arquivos de configuração do Monorepo, Docker Compose, NestJS backend e Next.js frontend foram gerados fisicamente na raiz do repositório).*

---

# 23. ESTRATÉGIA DE TESTES E VALIDAÇÃO DE ARQUITETURA

- Validação estática de dependências de código entre camadas garantindo que arquivos em `domain` nunca importem módulos de `infrastructure`.

---

# 24. PLANO DE EVOLUÇÃO ESTRATÉGICA E PREPARAÇÃO PARA MICROSSERVIÇOS

A separação dos módulos por pastas independentes no NestJS garante que, caso a demanda pelo motor de IA ou cálculo TRI atinja volumes que exijam infraestrutura dedicada, o módulo poderá ser desacoplado para um repositório isolado e exposto via gRPC ou evento assíncrono em menos de 1 semana de trabalho técnico.

---
*Fim da Especificação de Arquitetura Técnica.*
