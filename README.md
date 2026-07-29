# 🎓 MQPLUS — Ecossistema Educacional Inteligente

[![Status](https://img.shields.io/badge/Status-Fase_de_Arquitetura_de_Banco_de_Dados_(Database)-blue.svg)]()
[![Target](https://img.shields.io/badge/Foco-ENEM_|_Vestibulares_|_IFs_|_ETECs_|_Olimp%C3%ADadas-green.svg)]()
[![Database](https://img.shields.io/badge/Database-PostgreSQL_16_|_Prisma_ORM-blue.svg)](./DATABASE.md)
[![Architecture](https://img.shields.io/badge/Arquitetura-Mon%C3%B3lito_Modular_|_DDD_|_Clean_Arch-purple.svg)](./ARCHITECTURE.md)
[![Design System](https://img.shields.io/badge/Design_System-@mqplus/ui_v1.0-indigo.svg)](./DESIGN_SYSTEM.md)
[![PRD](https://img.shields.io/badge/Documenta%C3%A7%C3%A3o-Oficial_CPO-orange.svg)](./DOCUMENTACAO_OFICIAL_PRODUTO.md)

> **MQPLUS** é uma plataforma educacional de alta performance desenvolvida para estudantes do Ensino Médio, vestibulandos e candidatos a Institutos Federais e Escolas Técnicas. O produto integra **Aprendizado Ativo (TRI)**, **Repetição Espaçada (SRS/Anki)**, **Inteligência Artificial Socrática (RAG)** e **Gestão de Saúde Mental** em uma experiência 360° unificada.

---

## 📌 Documentos de Referência Oficial (Master Project Document — MPD)

1. 📄 **[DOCUMENTACAO_OFICIAL_PRODUTO.md](./DOCUMENTACAO_OFICIAL_PRODUTO.md)** — Estratégia de Produto (PRD), Visão, BMC, VPC, Personas, Regras de Negócio, Requisitos e Roadmap de 3 anos.
2. 🎨 **[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)** — Identidade Visual, Paleta de Cores, Design Tokens, Acessibilidade (WCAG 2.2 AA) e Especificação de Componentes.
3. 🏗️ **[ARCHITECTURE.md](./ARCHITECTURE.md)** — Arquitetura Técnica Corporativa, DDD, Monólito Modular, Diagramas C4 Model, ADRs, Segurança, Cache Redis e Convenções.
4. 🗄️ **[DATABASE.md](./DATABASE.md)** — Especificação da Arquitetura de Dados, Modelagem Conceitual/Lógica/Física, Dicionário de Dados, Prisma ORM, Índices e Otimização PostgreSQL 16.

---

## 🏗️ Arquitetura do Monorepo (`pnpm` + `Turborepo`)

```
mqplus/
├── apps/
│   ├── api/             # Backend NestJS REST API (Clean Arch / DDD) [@mqplus/api]
│   └── web/             # Frontend Next.js 14 App Router [@mqplus/web]
├── packages/
│   ├── ui/              # Design System React & Tailwind CSS [@mqplus/ui]
│   ├── core/            # Primitivos de Domínio DDD & Regras Puras [@mqplus/core]
│   └── database/        # Cliente Prisma ORM & Schemas PostgreSQL [@mqplus/database]
├── infra/
│   └── docker/          # Docker Compose (PostgreSQL 16, Redis 7, Meilisearch)
├── pnpm-workspace.yaml
├── turbo.json
└── package.json
```

---

## 🚀 Como Executar o Ambiente Local

### Pré-requisitos
- Node.js 18+ ou 20+
- pnpm `v8.15.0` (ou superior)
- Docker Desktop

### Passo a Passo

1. **Iniciar os Serviços de Infraestrutura (PostgreSQL, Redis, Meilisearch):**
```bash
docker compose -f infra/docker/docker-compose.yml up -d
```

2. **Instalar as Dependências do Monorepo:**
```bash
pnpm install
```

3. **Gerar os Clientes do Prisma ORM & Executar Seeding:**
```bash
pnpm --filter @mqplus/database db:generate
pnpm --filter @mqplus/database db:push
```

4. **Executar o Ambiente de Desenvolvimento Unificado (Turborepo):**
```bash
pnpm dev
```

- **Frontend Web:** [http://localhost:3000](http://localhost:3000)
- **Backend API REST:** [http://localhost:4000/api/v1](http://localhost:4000/api/v1)
- **Documentação Swagger:** [http://localhost:4000/api/docs](http://localhost:4000/api/docs)

---

## 📜 Licença e Propriedade

Este projeto e toda a sua documentação técnica e estratégica são de propriedade da equipe **MQPLUS**. Todos os direitos reservados.
