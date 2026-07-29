# ESPECIFICAÇÃO DE ARQUITETURA DE BANCO DE DADOS & MODELAGEM DE DADOS — MQPLUS
## Modelagem Conceitual, Lógica, Física, Dicionário de Dados, Prisma ORM, Índices e PostgreSQL 16

**Versão da Arquitetura de Dados:** 1.0.0  
**Autor:** Chief Data Architect & Database Architect  
**Status:** Aprovado como Padrão Oficial do Sistema (Master Project Document - MPD)  
**Data:** Julho de 2026  

---

## SUMÁRIO EXECUTIVO E ÍNDICE
1. [VISÃO GERAL DA ARQUITETURA DE DADOS](#1-vis%C3%83o-geral-da-arquitetura-de-dados)
2. [MODELAGEM CONCEITUAL (DIAGRAMA ER)](#2-modelagem-conceitual-diagrama-er)
3. [MODELO LÓGICO DE DADOS](#3-modelo-l%C3%93gico-de-dados)
4. [MODELO FÍSICO DE DADOS](#4-modelo-f%C3%8Dsico-de-dados)
5. [DICIONÁRIO DE DADOS COMPLETO](#5-dicion%C3%81rio-de-dados-completo)
6. [DOMÍNIOS DE DADOS & ENUMS SELECCIONADOS](#6-dom%C3%8Dnios-de-dados--enums-seleccionados)
7. [ESTRATÉGIA DE NORMALIZAÇÃO & DESNORMALIZAÇÃO](#7-estrat%C3%89gia-de-normaliza%C3%87%C3%83o--desnormaliza%C3%87%C3%83o)
8. [MAPEAMENTO DE RELACIONAMENTOS](#8-mapeamento-de-relacionamentos)
9. [ESTRATÉGIA AVANÇADA DE ÍNDICES](#9-estrat%C3%89gia-avan%C3%87ada-de-%C3%8Dndices)
10. [OTIMIZAÇÃO DE CONSULTAS & PAGINAÇÃO KEYSET](#10-otimiza%C3%87%C3%83o-de-consultas--pagina%C3%87%C3%83o-keyset)
11. [ESTRATÉGIA DE PARTICIONAMENTO (RANGE & LIST)](#11-estrat%C3%89gia-de-particionamento-range--list)
12. [ARQUITETURA DE CACHE DE BANCO COM REDIS](#12-arquitetura-de-cache-de-banco-com-redis)
13. [ESTRATÉGIA DE AUDITORIA & SOFT DELETE](#13-estrat%C3%89gia-de-auditoria--soft-delete)
14. [SEGURANÇA DA INFORMAÇÃO, PRIVACIDADE & LGPD](#14-seguran%C3%87a-da-informa%C3%87%C3%83o-privacidade--lgpd)
15. [ESTRATÉGIA DE BACKUP, REPLICAÇÃO E HIGH AVAILABILITY](#15-estrat%C3%89gia-de-backup-replica%C3%87%C3%83o-e-high-availability)
16. [FLUXO DE MIGRAÇÕES COM PRISMA MIGRATE](#16-fluxo-de-migra%C3%87%C3%95es-com-prisma-migrate)
17. [ESTRATÉGIA DE DADOS INICIAIS (SEEDING)](#17-estrat%C3%89gia-de-dados-iniciais-seeding)
18. [ESPECIFICAÇÃO COMPLETA DO SCHEMA PRISMA](#18-especifica%C3%87%C3%83o-completa-do-schema-prisma)
19. [ORGANIZAÇÃO DO PACOTE `@mqplus/database`](#19-organiza%C3%87%C3%83o-do-pacote-mqplusdatabase)
20. [LISTAGEM COMPLETA DE ARQUIVOS CRIADOS](#20-listagem-completa-de-arquivos-criados)
21. [JUSTIFICATIVAS TÉCNICAS E DESIGN TRADE-OFFS](#21-justificativas-t%C3%A9cnicas-e-design-trade-offs)
22. [IMPLEMENTAÇÃO FÍSICA E CÓDIGO-BASE](#22-implementa%C3%87%C3%83o-f%C3%ADsica-e-c%C3%93digo-base)
23. [ESTRATÉGIA DE TESTES DE DESEMPENHO E INTEGRIDADE](#23-estrat%C3%A9gia-de-testes-de-desempenho-e-integridade)
24. [MONITORAMENTO, VACUUM E SAÚDE DO POSTGRESQL](#24-monitoramento-vacuum-e-sa%C3%9Ade-do-postgresql)
25. [PLANO DE EVOLUÇÃO PARA VECTOR EMBEDDINGS (PGVECTOR) E ANALYTICS](#25-plano-de-evolu%C3%87%C3%83o-para-vector-embeddings-pgvector-e-analytics)

---

# 1. VISÃO GERAL DA ARQUITETURA DE DADOS

### 1.1 Objetivos da Arquitetura de Dados
A arquitetura de banco de dados do **MQPLUS** foi concebida para atuar como uma fonte única e altamente confiável de dados para o ecossistema educacional. Suas diretrizes prioritárias são:
1. **Garantia de Integridade Referencial:** Manutenção rigorosa de constraints foreign key, checks e tipos enumerados no PostgreSQL 16.
2. **Alta Performance em Volume Massivo:** Capacidade de processar milhões de registros de resoluções de questões, logs de simulados e revisões espaçadas sem degradação de tempo de resposta (< 50ms para consultas transacionais).
3. **Suporte Nativo ao Modelo TRI e Algoritmo SRS (SM-2):** Armazenamento otimizado para parâmetros logísticos da TRI ($a, b, c$) e fatores de facilidade ($EF$) do agendador de flashcards.
4. **Conformidade Total com a LGPD:** Criptografia de dados sensíveis e auditoria completa de modificações.

### 1.2 Princípios de Modelagem
- **Idempotência e Versionamento:** Todas as alterações estruturais são aplicadas via migrações versionadas e idempotentes do Prisma.
- **Identificadores Únicos Universais (UUID v4 / CUID v2):** Chaves primárias usam IDs alfanuméricos globais ordenáveis por tempo para evitar colisão e varredura maliciosa de URLs.
- **Separação entre OLTP e OLAP:** Operações de estudo diárias ocorrem no banco relacional primário; agregação de relatórios históricos pesados utiliza réplicas de leitura dedicadas.

---

# 2. MODELAGEM CONCEITUAL (DIAGRAMA ER)

```
[USUÁRIOS & PERFIS] 1 <---- N [RESOLUÇÕES DE QUESTÕES] N ----> 1 [QUESTÕES]
        |                                                              |
        | 1                                                            | 1
        v N                                                            v N
[CADERNOS DE ERROS]                                            [ALTERNATIVAS]
        | 1
        v N
[FLASHCARDS (SRS)] N <---------------------------------------- 1 [ASSUNTOS / MATÉRIAS]
        
[SIMULADOS] 1 <---- N [SIMULADO_INSCRIÇÕES] N ----> 1 [USUÁRIOS]
     | 1
     v N
[SIMULADO_QUESTÕES] (Com parâmetros TRI calibrados)
```

---

# 3. MODELO LÓGICO DE DADOS

### 3.1 Entidades Principais e Atributos

#### A. Módulo de Autenticação e Usuários
- `User`: `id`, `email`, `passwordHash`, `fullName`, `role` (Enum), `cpf`, `phone`, `birthDate`, `isActive`, `createdAt`, `updatedAt`, `deletedAt`.
- `UserProfile`: `userId`, `targetExam` (Enum: ENEM, IF, ETEC, OLIMPIADA), `targetCourse`, `dailyGoalMinutes`, `streakCount`, `highestStreak`.

#### B. Módulo Pedagogico e Banco de Questões
- `Discipline`: `id`, `name`, `code`, `area` (Enum: HUMANAS, EXATAS, NATUREZA, LINGUAGENS).
- `Subject`: `id`, `disciplineId`, `name`, `parentSubjectId` (Hierarquia de tópicos).
- `Question`: `id`, `subjectId`, `statement`, `explanation`, `difficulty` (Enum), `triA` (Float), `triB` (Float), `triC` (Float), `examYear`, `institution`.
- `Option`: `id`, `questionId`, `letter` (A, B, C, D, E), `content`, `isCorrect`.

#### C. Módulo de Resolução e Simulados
- `QuestionAnswer`: `id`, `userId`, `questionId`, `selectedOptionId`, `isCorrect`, `responseTimeSeconds`, `createdAt`.
- `Simulation`: `id`, `title`, `examType`, `totalQuestions`, `durationMinutes`, `isPublished`.
- `SimulationAttempt`: `id`, `simulationId`, `userId`, `scoreTRI`, `correctCount`, `startedAt`, `finishedAt`.

#### D. Módulo de Repetição Espaçada (Flashcards SRS)
- `Flashcard`: `id`, `userId`, `subjectId`, `front`, `back`, `repetitionCount`, `intervalDays`, `easeFactor` (Float), `nextReviewAt`.

---

# 4. MODELO FÍSICO DE DADOS

O banco de dados físico utiliza **PostgreSQL 16** com o schema padrão `public`.

```sql
-- Exemplo de Modelo Físico SQL gerado para a tabela 'questions'
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "subject_id" TEXT NOT NULL,
    "statement" TEXT NOT NULL,
    "explanation" TEXT,
    "difficulty" "QuestionDifficulty" NOT NULL DEFAULT 'MEDIUM',
    "tri_a" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "tri_b" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "tri_c" DOUBLE PRECISION NOT NULL DEFAULT 0.2,
    "exam_year" INTEGER NOT NULL,
    "institution" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);
```

---

# 5. DICIONÁRIO DE DADOS COMPLETO

### 5.1 Tabela `users`

| Nome da Coluna | Tipo SQL | Requerido | Default | Descrição / Regra de Negócio |
| :--- | :--- | :---: | :--- | :--- |
| `id` | `TEXT (CUID)` | **Sim** | `cuid()` | Chave primária única universal do usuário. |
| `email` | `VARCHAR(255)`| **Sim** | N/A | E-mail do usuário. Deve ser único (`UNIQUE`). |
| `password_hash` | `TEXT` | **Sim** | N/A | Hash da senha gerado com Bcrypt/Argon2. |
| `role` | `UserRole` | **Sim** | `'STUDENT'` | Papel no sistema: STUDENT, PROFESSOR, ADMIN, MENTOR, etc. |
| `is_active` | `BOOLEAN` | **Sim** | `true` | Status da conta de usuário. |
| `created_at` | `TIMESTAMP` | **Sim** | `now()` | Data e hora de criação do cadastro. |
| `deleted_at` | `TIMESTAMP` | Não | `NULL` | Data de remoção lógica (Soft Delete). |

---

# 6. DOMÍNIOS DE DADOS & ENUMS SELECCIONADOS

```prisma
enum UserRole {
  STUDENT
  TEACHER
  PEDAGOGICAL_COORDINATOR
  MENTOR
  PSYCHOLOGIST
  CONTENT_CREATOR
  REVIEWER
  ADMIN
}

enum KnowledgeArea {
  HUMAN_SCIENCES
  NATURAL_SCIENCES
  MATHEMATICS
  LANGUAGES_AND_CODES
}

enum TargetExam {
  ENEM
  VESTIBULAR_TRADICIONAL
  INSTITUTO_FEDERAL
  ESCOLA_TECNICA
  OLIMPIADA_CIENTIFICA
  CONCURSO_NIVEL_MEDIO
}
```

---

# 7. ESTRATÉGIA DE NORMALIZAÇÃO & DESNORMALIZAÇÃO

- **Normalização (3FN/BCNF):** Todas as entidades relacionais de Usuários, Disciplinas, Assuntos e Opções são estritamente normalizadas em Terceira Forma Normal para evitar redundância e anomalias de atualização.
- **Desnormalização Estratégica:**
  - `SimulationAttempt.correctCount` e `SimulationAttempt.scoreTRI` são pré-calculados e salvos no registro da tentativa para evitar *re-scans* pesados agregados em dashboards de resultados.
  - `UserProfile.streakCount` é incrementado atomicamente em vez de ser calculado via `COUNT(*)` da tabela de acessos a cada abertura do aplicativo.

---

# 8. MAPEAMENTO DE RELACIONAMENTOS

- **1:1 (Um para Um):** `User` <---> `UserProfile` (Cada usuário possui exatamente um perfil de estudo).
- **1:N (Um para Muitos):** `Discipline` <---> `Subject` (Uma disciplina possui múltiplos assuntos); `Question` <---> `Option` (Uma questão possui 5 alternativas).
- **N:N (Muitos para Muitos):** `User` <---> `Simulation` através da tabela associativa `SimulationAttempt`.

---

# 9. ESTRATÉGIA AVANÇADA DE ÍNDICES

1. **Índices de Chave Primária e Única (B-Tree):** Em `users(email)`, `questions(id)`, `options(id)`.
2. **Índices Compostos (B-Tree):**
   - `question_answers(user_id, question_id)` — Busca rápida para saber se o aluno já respondeu a questão.
   - `flashcards(user_id, next_review_at)` — Otimização da consulta de revisões espaçadas pendentes no dia.
3. **Índice Parcial (Partial Index):**
   - `CREATE INDEX idx_active_users ON users(email) WHERE deleted_at IS NULL;` — Garante pesquisas de login extremamente rápidas ignorando usuários deletados.
4. **Índice de Busca Textual (GIN / Full-Text):**
   - Aplicado na coluna `statement` da tabela `questions` para buscas por palavras-chave em linguagem natural.

---

# 10. OTIMIZAÇÃO DE CONSULTAS & PAGINAÇÃO KEYSET

Para a listagem de questões, veda-se o uso de paginação por `OFFSET` (devido à degradação de performance $O(N)$ em grandes volumes). Adota-se a **Paginação por Keyset (Cursor-Based Pagination)** usando a chave composta `(created_at, id)`:

```sql
-- Consulta otimizada por Keyset Cursor ($O(1)$)
SELECT * FROM questions 
WHERE subject_id = $1 
  AND (created_at, id) < ($2, $3)
ORDER BY created_at DESC, id DESC 
LIMIT 20;
```

---

# 11. ESTRATÉGIA DE PARTICIONAMENTO (RANGE & LIST)

Em produções de alta escala (V3+), a tabela `question_answers` (que acumula dezenas de milhões de linhas por ano) é particionada por **Range de Data (Mensal ou Anual)**:

```sql
-- Particionamento declarativo por ano da tabela de resoluções
CREATE TABLE question_answers (
    id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    question_id TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) PARTITION BY RANGE (created_at);

CREATE TABLE question_answers_2026 PARTITION OF question_answers
    FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');
```

---

# 12. ARQUITETURA DE CACHE DE BANCO COM REDIS

- **Estratégia Cache-Aside (Lazy Loading):** As consultas de questões populares e metadados de disciplinas são primeiramente buscadas no Redis. Se houver *Cache Miss*, a consulta é realizada no PostgreSQL e o resultado é salvo no Redis com TTL de 12 horas.
- **Invalidação:** Atualizações na tabela `questions` disparam eventos que limpam a chave correspondente `cache:question:{id}` no Redis.

---

# 13. ESTRATÉGIA DE AUDITORIA & SOFT DELETE

Todas as tabelas de negócio possuem as colunas auditáveis:
- `created_at`: Carimbo de data/hora de criação.
- `updated_at`: Carimbo de data/hora da última atualização.
- `deleted_at`: Se diferente de `NULL`, indica que o registro foi removido logicamente (Soft Delete).

---

# 14. SEGURANÇA DA INFORMAÇÃO, PRIVACIDADE & LGPD

1. **Criptografia de Senhas:** Hashes Bcrypt com salt factor 12 ou Argon2id.
2. **Dados Sensíveis:** CPF e Telefones são armazenados com criptografia simétrica em nível de aplicação (AES-256-GCM).
3. **Direito ao Esquecimento (LGPD Art. 18):** Rotina de anonimização que substitui dados pessoais do usuário por strings anonimizadas (`anon_user_xxxx`), mantendo o histórico estatístico de acertos para não corromper a calibração TRI das questões.

---

# 15. ESTRATÉGIA DE BACKUP, REPLICAÇÃO E HIGH AVAILABILITY

- **Backup Físico Contínuo:** WAL (Write-Ahead Logging) enviado a cada 5 minutos para armazenamento em Object Storage S3, permitindo **Point-In-Time Recovery (PITR)** para qualquer segundo dos últimos 30 dias.
- **Backup Lógico:** `pg_dump` automatizado executado diariamente às 03:00 UTC com retenção rotativa de 90 dias.
- **Replicação:** Arranjo Primary-Replica com 2 réplicas de leitura em disponibilidade distribuída.

---

# 16. FLUXO DE MIGRAÇÕES COM PRISMA MIGRATE

- **Desenvolvimento:** `pnpm --filter @mqplus/database prisma migrate dev` (cria e aplica migrações no banco local de dev).
- **Produção (CI/CD):** `pnpm --filter @mqplus/database prisma migrate deploy` (executa apenas migrações pendentes sem alterar dados).

---

# 17. ESTRATÉGIA DE DADOS INICIAIS (SEEDING)

O script `seed.ts` popula o banco de dados com:
1. As 4 Áreas do Conhecimento da BNCC e as 12 Disciplinas base (Matemática, Física, Química, Biologia, História, Geografia, Filosofia, Sociologia, Português, Literatura, Redação, Inglês).
2. Tópicos principais (Assuntos) de cada disciplina.
3. Usuários administradores e perfis de teste padrão para desenvolvimento.

---

# 18. ESPECIFICAÇÃO COMPLETA DO SCHEMA PRISMA

*(O arquivo completo `schema.prisma` foi gerado fisicamente no pacote `@mqplus/database`).*

---

# 19. ORGANIZAÇÃO DO PACOTE `@mqplus/database`

```
packages/database/
├── prisma/
│   ├── schema.prisma   # Schema Prisma oficial contendo todos os Models
│   └── seed.ts         # Script de Seeding de dados iniciais
├── src/
│   └── index.ts        # Exportação da instância singleton do PrismaClient
├── package.json
└── tsconfig.json
```

---

# 20. LISTAGEM COMPLETA DE ARQUIVOS CRIADOS

1. `DATABASE.md` (Documentação Oficial)
2. `packages/database/package.json`
3. `packages/database/tsconfig.json`
4. `packages/database/prisma/schema.prisma`
5. `packages/database/prisma/seed.ts`
6. `packages/database/src/index.ts`

---

# 21. JUSTIFICATIVAS TÉCNICAS E DESIGN TRADE-OFFS

- **PostgreSQL 16:** Escolhido por sua maturidade, suporte nativo a tipos JSONB para metadados flexíveis de IA, performance excepcional em índices GIN/B-Tree e robustez em transações ACID.
- **Prisma ORM:** Oferece TypeScript autogerado e 100% tipado com autocomplete no editor, reduzindo em 90% erros de digitação de nomes de tabelas ou tipos incorretos.

---

# 22. IMPLEMENTAÇÃO FÍSICA E CÓDIGO-BASE

*(Código-base gerado no pacote `@mqplus/database`).*

---

# 23. ESTRATÉGIA DE TESTES DE DESEMPENHO E INTEGRIDADE

- Testes automatizados executando `EXPLAIN ANALYZE` em consultas críticas para garantir que a varredura utilize os índices criados (`Index Scan` em vez de `Seq Scan`).

---

# 24. MONITORAMENTO, VACUUM E SAÚDE DO POSTGRESQL

- **Autovacuum Tuning:** Configurado para execução frequente na tabela de resoluções de questões para evitar contaminação por tuplas mortas (*dead tuples bloat*).
- **Extension `pg_stat_statements`:** Habilitada para capturar e alertar queries com tempo de execução superior a 100ms.

---

# 25. PLANO DE EVOLUÇÃO PARA VECTOR EMBEDDINGS (PGVECTOR) E ANALYTICS

A arquitetura do PostgreSQL 16 está preparada para a habilitação da extensão **`pgvector`** na V2, permitindo o armazenamento de vetores de *embeddings* (1536 dimensões) diretamente na tabela `questions`, viabilizando a busca por similaridade semântica para recomendação de questões por IA.

---
*Fim da Especificação de Arquitetura de Banco de Dados.*
