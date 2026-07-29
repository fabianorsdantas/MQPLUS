# ESPECIFICAÇÃO DE ENGENHARIA DE BACKEND & APIS RESTFUL — MQPLUS
## NestJS, Clean Architecture, Domain-Driven Design (DDD), JWT/RBAC, Prisma ORM & Redis Cache

**Versão da Arquitetura de Backend:** 1.0.0  
**Autor:** Principal Backend Engineer & Tech Lead  
**Status:** Aprovado como Padrão Oficial do Backend (Master Project Document - MPD)  
**Data:** Julho de 2026  

---

## SUMÁRIO EXECUTIVO E ÍNDICE
1. [VISÃO GERAL DO BACKEND](#1-vis%C3%83o-geral-do-backend)
2. [ORGANIZAÇÃO DOS MÓDULOS DA APLICAÇÃO](#2-organiza%C3%87%C3%83o-dos-m%C3%93dulos-da-aplica%C3%87%C3%83o)
3. [ESTRUTURA DE PASTAS DA API (`apps/api/src/`)](#3-estrutura-de-pastas-da-api-appsapisrc)
4. [PADRÕES DE CÓDIGO E ARTEFATOS SWAGGER/NESTJS](#4-padr%C3%95es-de-c%C3%93digo-e-artefatos-swaggernestjs)
5. [ARQUITETURA DE AUTENTICAÇÃO (JWT, REFRESH TOKEN, RBAC)](#5-arquitetura-de-autentica%C3%87%C3%83o-jwt-refresh-token-rbac)
6. [ESPECIFICAÇÃO DE API RESTFUL, RESPOSTA PADRÃO & SWAGGER](#6-especifica%C3%87%C3%83o-de-api-restful-resposta-padr%C3%83o--swagger)
7. [REGRAS DE NEGÓCIO POR DOMÍNIO](#7-regras-de-neg%C3%93cio-por-dom%C3%ADnio)
8. [VALIDAÇÃO DE DADOS (CLASS-VALIDATOR & DTOs)](#8-valida%C3%87%C3%83o-de-dados-class-validator--dtos)
9. [SEGURANÇA DA INFORMAÇÃO, RATE LIMITING & COMPLIANCE](#9-seguran%C3%87a-da-informa%C3%87%C3%83o-rate-limiting--compliance)
10. [INTEGRAÇÃO DE CACHE DE ALTA PERFORMANCE COM REDIS](#10-integra%C3%87%C3%83o-de-cache-de-alta-performance-com-redis)
11. [ARQUITETURA DE EVENTOS & FILAS COM BULLMQ](#11-arquitetura-de-eventos--filas-com-bullmq)
12. [OBSERVABILIDADE, METRICAS E HEALTH CHECKS](#12-observabilidade-metricas-e-health-checks)
13. [DOCUMENTAÇÃO SWAGGER / OPENAPI](#13-documenta%C3%87%C3%83o-swagger--openapi)
14. [ESTRATÉGIA DE TESTES AUTOMATIZADOS (JEST & SUPERTEST)](#14-estrat%C3%89gia-de-testes-automatizados-jest--supertest)
15. [ESTRATÉGIA DE TRATAMENTO DE ERROS (EXCEPTIONS & FILTERS)](#15-estrat%C3%89gia-de-tratamento-de-erros-exceptions--filters)
16. [CONFIGURAÇÃO DE AMBIENTE & VARIÁVEIS (.ENV)](#16-configura%C3%87%C3%83o-de-ambiente--vari%C3%81veis-env)
17. [PADRÕES DE NOMENCLATURA E CONVENÇÕES](#17-padr%C3%95es-de-nomenclatura-e-conven%C3%87%C3%95es)
18. [LISTAGEM DE ARQUIVOS CRIADOS NO BACKEND](#18-listagem-de-arquivos-criados-no-backend)
19. [JUSTIFICATIVAS TÉCNICAS E DESIGN TRADE-OFFS](#19-justificativas-t%C3%A9cnicas-e-design-trade-offs)
20. [CÓDIGO-BASE IMPLEMENTADO NO BACKEND (`apps/api`)](#20-c%C3%93digo-base-implementado-no-backend-appsapi)
21. [GUIA DE EXECUÇÃO LOCAL E TESTES DE INTEGRAÇÃO](#21-guia-de-execu%C3%87%C3%83o-local-e-testes-de-integra%C3%87%C3%83o)
22. [PLANO DE EVOLUÇÃO PARAPLUG-INS DE IA, MOBILE E MICROSSERVIÇOS](#22-plano-de-evolu%C3%87%C3%83o-paraplug-ins-de-ia-mobile-e-microsservi%C3%87os)

---

# 1. VISÃO GERAL DO BACKEND

### 1.1 Arquitetura da Solução
O backend do **MQPLUS** foi desenvolvido como uma API RESTful corporativa com **NestJS (v10)**, fundamentada em **Clean Architecture** e **Domain-Driven Design (DDD)**. Ele atua como a única camada de serviço de negócios para os clientes Web (Next.js) e Mobile (React Native / Expo), além do Portal Administrativo B2B.

```
+-----------------------------------------------------------------------------------+
|                            FLUXO DE REQUISIÇÃO BACKEND                            |
+-----------------------------------------------------------------------------------+
|  [ Client (Web / Mobile) ]                                                        |
|             |  (HTTPS / REST / Bearer JWT)                                        |
|             v                                                                     |
|  [ Global Guards ] (Helmet -> Throttler/RateLimit -> CORS -> JwtAuthGuard)       |
|             |                                                                     |
|             v                                                                     |
|  [ Controllers ] (Transform DTO Validation Pipe -> Route Resolution)              |
|             |                                                                     |
|             v                                                                     |
|  [ Application Layer / Use Cases ] (Orquestração de Regras de Negócio)             |
|             |                                                                     |
|             v                                                                     |
|  [ Domain Layer / Entities ] (Regras Puras DDD)                                   |
|             |                                                                     |
|             v                                                                     |
|  [ Infrastructure Layer ] (Prisma Repository / Redis Service / OpenAI Adapter)     |
|             |                                                                     |
|             v                                                                     |
|  [ Data Sources ] (PostgreSQL 16 Primary/Replicas & Redis 7)                      |
+-----------------------------------------------------------------------------------+
```

### 1.2 Comunicação Inter-Módulos
Os módulos do NestJS comunicam-se no mesmo processo via **Injeção de Dependências (DI)** orientada a interfaces abstratas. Para comunicação desacoplada assíncrona entre contextos (ex: atualização de pontuação no módulo de Gamificação ao responder uma questão no módulo de Questões), utiliza-se o emissor interno de eventos `@nestjs/event-emitter`.

---

# 2. ORGANIZAÇÃO DOS MÓDULOS DA APLICAÇÃO

| Módulo NestJS | Escopo e Responsabilidades |
| :--- | :--- |
| `AuthModule` | Autenticação JWT, Refresh Tokens, Hash de senha e Validação de RBAC. |
| `UsersModule` | Cadastro, atualização de perfis de estudantes e acompanhamento de Streaks. |
| `QuestionsModule` | Ingestão, busca com filtros, entrega de questões e cálculo estatístico TRI. |
| `SimulationsModule` | Geração de simulados, cronometragem e processamento da nota TRI final. |
| `FlashcardsModule` | Algoritmo SM-2 de Repetição Espaçada (SRS), agendamento e revisão de cards. |
| `AiTutorModule` | Motor RAG Socrático, geração de dicas conceituais e restrição de gabarito. |
| `MentalHealthModule` | Triagem de estresse/ansiedade (GAD-7) e alertas preventivos de fadiga. |
| `GamificationModule` | Atribuição de XP, controle de níveis, emissão de badges e ranking semanal. |
| `AdminModule` | CMS de moderação de questões, gestão de usuários B2B e relatórios para escolas. |

---

# 3. ESTRUTURA DE PASTAS DA API (`apps/api/src/`)

```
apps/api/src/
├── common/                # Utilitários compartilhados, Decorators, Guards, Pipes, Interceptors
│   ├── decorators/        # @Roles(), @CurrentUser(), @Public()
│   ├── filters/           # GlobalExceptionFilter (RFC 7807)
│   ├── guards/            # JwtAuthGuard, RolesGuard, ThrottlerGuard
│   ├── interceptors/      # ResponseTransformInterceptor, LoggingInterceptor
│   └── pipes/             # ZodValidationPipe, ParseCuidPipe
├── config/                # Módulos de configuração de ambiente e segredos (env.ts)
├── modules/               # Bounded Contexts da aplicação
│   ├── auth/              # Controllers, UseCases, DTOs, Strategies de Autenticação
│   ├── users/             # Módulo de Usuários e Perfis
│   ├── questions/         # Módulo de Questões e TRI
│   ├── simulations/       # Módulo de Simulados
│   ├── flashcards/        # Módulo SRS / SM-2
│   └── ai-tutor/          # Módulo do Tutor de IA Socrático
├── shared/                # Serviços transversais (PrismaModule, RedisModule)
├── app.module.ts          # Módulo Raiz da aplicação NestJS
└── main.ts                # Bootstrap, Swagger, CORS, Helmet e Pipes globais
```

---

# 4. PADRÕES DE CÓDIGO E ARTEFATOS SWAGGER/NESTJS

- **Controllers:** Exclusivamente responsáveis pela rota HTTP, anotações do Swagger (`@ApiOperation`, `@ApiResponse`), acionamento do Pipe de validação e delegação imediata para o Use Case.
- **Use Cases / Application Services:** Contêm a orquestração do fluxo de execução. Retornam instâncias da camada de Domínio ou objetos de resposta DTO.
- **Repositories:** Implementam as interfaces declaradas no `@mqplus/core` consumindo o Prisma Client.

---

# 5. ARQUITETURA DE AUTENTICAÇÃO (JWT, REFRESH TOKEN, RBAC)

### 5.1 Fluxo de Autenticação
1. **Login (`POST /api/v1/auth/login`):** O usuário envia `email` e `password`.
2. **Validação:** O `AuthService` valida as credenciais contra a tabela `users` do PostgreSQL via Bcrypt.
3. **Emissão de Tokens:**
   - **Access Token:** JWT assinado com chave privada RS256/HS256, expiração em 15 minutos. Contém `sub`, `email` e `role`.
   - **Refresh Token:** Token aleatório de alta entropia armazenado no Redis com TTL de 7 dias, retornado em um cookie seguro `Set-Cookie: refreshToken=...; HttpOnly; Secure; SameSite=Strict`.

```
[ Client ] --(POST /auth/login)--> [ AuthController ]
                                           |
                                   (Valida Bcrypt)
                                           v
[ Client ] <-- (JSON AccessToken + Cookie RefreshToken) -- [ AuthResponse ]
```

---

# 6. ESPECIFICAÇÃO DE API RESTFUL, RESPOSTA PADRÃO & SWAGGER

### 6.1 Formato de Resposta Unificado (`ApiResponse<T>`)

```typescript
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    timestamp: string;
  };
}
```

---

# 7. REGRAS DE NEGÓCIO POR DOMÍNIO

1. **Trava Socrática da IA (RN-004):** O `AiTutorService` filtra o prompt antes de enviar à LLM. Se a mensagem solicitar o gabarito explícito, o backend injeta uma instrução de sistema forçando a IA a devolver apenas uma pergunta condutora.
2. **Repetição Espaçada SM-2 (RN-003):** O cálculo da próxima data de revisão de um flashcard segue a fórmula $EF' = EF + (0.1 - (5 - q) \times (0.08 + (5 - q) \times 0.02))$, onde $q$ é a nota atribuída pelo estudante (0 a 5).

---

# 8. VALIDAÇÃO DE DADOS (CLASS-VALIDATOR & DTOs)

Todos os DTOs utilizam anotações estritas do `class-validator` e `class-transformer`:

```typescript
export class CreateQuestionDto {
  @ApiProperty({ description: 'ID do assunto relacionado' })
  @IsString()
  @IsNotEmpty()
  subjectId: string;

  @ApiProperty({ description: 'Enunciado completo da questão' })
  @IsString()
  @IsNotEmpty()
  statement: string;

  @ApiProperty({ enum: QuestionDifficulty })
  @IsEnum(QuestionDifficulty)
  difficulty: QuestionDifficulty;

  @ApiProperty({ description: 'Ano de aplicação da prova', example: 2024 })
  @IsInt()
  @Min(2000)
  @Max(2030)
  examYear: number;
}
```

---

# 9. SEGURANÇA DA INFORMAÇÃO, RATE LIMITING & COMPLIANCE

- **Helmet:** Proteção de cabeçalhos HTTP contra XSS, Clickjacking e MIME Sniffing.
- **Throttler (Rate Limit):** Configurado globalmente para permitir no máximo **100 requisições por minuto** por endereço IP (armazenado e validado via Redis).

---

# 10. INTEGRAÇÃO DE CACHE DE ALTA PERFORMANCE COM REDIS

- **`RedisModule`:** Módulo compartilhado no backend que expõe o `RedisService`.
- **Estratégia de Cache:**
  - Consulta de Questões por ID: `questions:{id}` (TTL: 86400s / 24h).
  - Listagem de Disciplinas: `disciplines:all` (TTL: 604800s / 7d).

---

# 11. ARQUITETURA DE EVENTOS & FILAS COM BULLMQ

As filas de segundo plano são gerenciadas pelo BullMQ:
- **`queue-correction`:** Fila de alta prioridade para processamento de correções de simulados por TRI.
- **`queue-ai-embeddings`:** Fila de background para vetorização de novas questões via API OpenAI.

---

# 12. OBSERVABILIDADE, METRICAS E HEALTH CHECKS

- **Endpoint de Health Check (`GET /api/v1/health`):** Retorna a integridade das conexões com o PostgreSQL e Redis.
- **Logs Estruturados:** Formato JSON com carimbos ISO-8601 e identificador único de rastreamento (`x-trace-id`).

---

# 13. DOCUMENTAÇÃO SWAGGER / OPENAPI

A documentação interativa Swagger é montada automaticamente na rota `/api/docs`, incluindo schemas de entrada/saída, códigos de status HTTP e suporte a autenticação por Bearer Token.

---

# 14. ESTRATÉGIA DE TESTES AUTOMATIZADOS (JEST & SUPERTEST)

- **Testes Unitários:** Focados em Use Cases e Services utilizando Mocks do Repositório (`PrismaServiceMock`).
- **Testes E2E:** Testes de integração em banco de dados isolado validando o ciclo completo de cadastro, login e resolução de questões.

---

# 15. ESTRATÉGIA DE TRATAMENTO DE ERROS (EXCEPTIONS & FILTERS)

O `GlobalExceptionFilter` intercepta todas as exceções da aplicação e formata no padrão RFC 7807:

```typescript
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException 
      ? exception.getStatus() 
      : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      success: false,
      error: {
        code: exception instanceof HttpException ? exception.name : 'INTERNAL_SERVER_ERROR',
        message: exception instanceof HttpException ? exception.message : 'Erro interno no servidor.',
      },
      meta: { timestamp: new Date().toISOString() },
    });
  }
}
```

---

# 16. CONFIGURAÇÃO DE AMBIENTE & VARIÁVEIS (.ENV)

Variavéis validadas rigorosamente na inicialização do NestJS:
- `PORT`: Porta de execução (Default: 4000)
- `DATABASE_URL`: String de conexão PostgreSQL
- `REDIS_URL`: String de conexão Redis
- `JWT_SECRET`: Chave secreta de assinatura JWT
- `JWT_EXPIRES_IN`: Tempo de expiração do Access Token (ex: `15m`)

---

# 17. PADRÕES DE NOMENCLATURA E CONVENÇÕES

- **Arquivos:** Kebab-case (`question.controller.ts`, `get-question-by-id.use-case.ts`).
- **Classes:** PascalCase (`QuestionsController`, `GetQuestionByIdUseCase`).
- **Interfaces:** PascalCase sem prefixo 'I' (`QuestionRepository`).

---

# 18. LISTAGEM DE ARQUIVOS CRIADOS NO BACKEND

1. `BACKEND.md` (Documentação Oficial)
2. `apps/api/src/main.ts`
3. `apps/api/src/app.module.ts`
4. `apps/api/src/common/filters/global-exception.filter.ts`
5. `apps/api/src/common/interceptors/response-transform.interceptor.ts`
6. `apps/api/src/common/decorators/roles.decorator.ts`
7. `apps/api/src/common/guards/roles.guard.ts`
8. `apps/api/src/modules/auth/auth.module.ts`
9. `apps/api/src/modules/auth/auth.controller.ts`
10. `apps/api/src/modules/auth/auth.service.ts`
11. `apps/api/src/modules/auth/dto/login.dto.ts`
12. `apps/api/src/modules/questions/questions.module.ts`
13. `apps/api/src/modules/questions/questions.controller.ts`
14. `apps/api/src/modules/questions/questions.service.ts`
15. `apps/api/src/modules/questions/dto/create-question.dto.ts`

---

# 19. JUSTIFICATIVAS TÉCNICAS E DESIGN TRADE-OFFS

- **NestJS com Express:** Oferece máxima compatibilidade com ecossistema de middleware Node.js (Helmet, Passport), documentação Swagger nativa e injeção de dependência madura.
- **Fastify (Alternativa):** Considerado para ganho de performance pura, mas descartado no MVP para manter 100% de compatibilidade com os plugins padrão do NestJS sem complexidade extra de integração.

---

# 20. CÓDIGO-BASE IMPLEMENTADO NO BACKEND (`apps/api`)

*(Os artefatos de código completos foram implementados no projeto `apps/api`).*

---

# 21. GUIA DE EXECUÇÃO LOCAL E TESTES DE INTEGRAÇÃO

1. Iniciar Docker: `docker compose -f infra/docker/docker-compose.yml up -d`
2. Executar Backend: `pnpm --filter @mqplus/api dev`
3. Acessar Swagger: [http://localhost:4000/api/docs](http://localhost:4000/api/docs)

---

# 22. PLANO DE EVOLUÇÃO PARA PLUG-INS DE IA, MOBILE E MICROSSERVIÇOS

O backend está 100% preparado para consumo mobile via HTTPS REST e tokens JWT rotativos. As rotas para o plugin de IA educacional estão desacopladas no `AiTutorModule`, permitindo escalabilidade transparente.

---
*Fim da Especificação de Engenharia de Backend.*
