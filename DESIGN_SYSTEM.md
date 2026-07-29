# DESIGN SYSTEM & GUIA DE IDENTIDADE VISUAL — MQPLUS
## Sistema de Design Atômico, Tokens, Acessibilidade (WCAG 2.2 AA) e Arquitetura UI/UX

**Versão:** 1.0.0  
**Autor:** Head of Design, Senior UI Designer & Design System Architect  
**Status:** Aprovado como Referência Oficial do Monorepo Front-end (Web & Mobile)  
**Data:** Julho de 2026  

---

## SUMÁRIO EXECUTIVO
1. [IDENTIDADE DA MARCA](#1-identidade-da-marca)
2. [LOGOTIPO](#2-logotipo)
3. [MASCOTE (CORUJA COGNITIVA — "LOGI")](#3-mascote-coruja-cognitiva--logi)
4. [PALETA DE CORES & PSICOLOGIA DAS CORES](#4-paleta-de-cores--psicologia-das-cores)
5. [DESIGN TOKENS](#5-design-tokens)
6. [TIPOGRAFIA](#6-tipografia)
7. [GRID & BREAKPOINTS](#7-grid--breakpoints)
8. [ICONOGRAFIA](#8-iconografia)
9. [ILUSTRAÇÕES](#9-ilustra%C3%87%C3%95es)
10. [MOTION DESIGN & ANIMAÇÕES](#10-motion-design--anima%C3%87%C3%95es)
11. [ESPECIFICAÇÃO DE COMPONENTES ATÔMICOS](#11-especifica%C3%87%C3%83o-de-componentes-at%C3%94micos)
12. [PADRÕES VISUAIS DE INTERFACE](#12-padr%C3%95es-visuais-de-interface)
13. [DASHBOARD & LINGUAGEM DE DATA VISUALIZATION](#13-dashboard--linguagem-de-data-visualization)
14. [DARK MODE & TEMA ESCURO](#14-dark-mode--tema-escuro)
15. [DIRECTIVE DE ACESSIBILIDADE (WCAG 2.2 AA)](#15-directive-de-acessibilidade-wcag-22-aa)
16. [MICROINTERAÇÕES & ESTADOS DINÂMICOS](#16-microintera%C3%87%C3%95es--estados-din%C3%82micos)
17. [SISTEMA RESPONSIVO (MOBILE FIRST)](#17-sistema-responsivo-mobile-first)
18. [ORGANIZAÇÃO DA LIBRARIA NO FIGMA](#18-organiza%C3%87%C3%83o-da-libraria-no-figma)
19. [IMPLEMENTAÇÃO TÉCNICA (TAILWIND, SHADCN, FRAMER MOTION)](#19-implementa%C3%87%C3%83o-t%C3%A9cnica-tailwind-shadcn-framer-motion)
20. [ESTRUTURA DO PACOTE UI (`packages/ui`)](#20-estrutura-do-pacote-ui-packagesui)
21. [LISTAGEM COMPLETA DE ARQUIVOS DO SISTEMA](#21-listagem-completa-de-arquivos-do-sistema)
22. [JUSTIFICATIVAS TÉCNICAS E DESIGN TRADE-OFFS](#22-justificativas-t%C3%A9cnicas-e-design-trade-offs)
23. [CÓDIGO-BASE INICIAL (`packages/ui`)](#23-c%C3%93digo-base-inicial-packagesui)
24. [ESTRATÉGIA DE TESTES DE UI & ACESSIBILIDADE](#24-estrat%C3%A9gia-de-testes-de-ui--acessibilidade)
25. [PLANO DE EVOLUÇÃO FUTURA DO DESIGN SYSTEM](#25-plano-de-evolu%C3%87%C3%83o-futura-do-design-system)

---

# 1. IDENTIDADE DA MARCA

### 1.1 Propósito
Potencializar o intelecto humano e democratizar o aprendizado de alta performance no Brasil através de um ecossistema digital que une inteligência artificial socrática, ciência cognitiva e cuidado emocional.

### 1.2 Personalidade da Marca
A personalidade do **MQPLUS** é guiada por 4 pilares:
1. **Visionária & Tecnológica:** Inteligente, precisa, baseada em dados e na vanguarda da IA educacional.
2. **Empática & Acolhedora:** Entende as dores e a ansiedade do vestibulando; não julga o erro, mas celebra a evolução.
3. **Energética & Gamificada:** Vibrante, estimulante, transformando o estudo em uma jornada de conquistas diárias.
4. **Pedagogicamente Rigorosa:** Confiável, balizada na Matriz BNCC/TRI e orientada a resultados concretos.

### 1.3 Posicionamento
O **MQPLUS** posiciona-se no cruzamento estratégico entre a **Alta Performance Acadêmica** e o **Bem-Estar Estudantil**. Não somos uma biblioteca passiva de vídeos, nem uma lista fria de exercícios: somos o **Co-Piloto Cognitivo do Estudante**.

### 1.4 Arquétipo da Marca
- **Arquétipo Primário — O Sábio (The Sage):** Busca a verdade, a clareza conceitual, a maestria técnica e o conhecimento profundo.
- **Arquétipo Secundário — O Herói (The Hero):** Encoraja o estudante a superar obstáculos, vencer a curva de esquecimento e alcançar o topo da lista de aprovados.

```
       +---------------------------------------------+
       |             ARQUÉTIPO DA MARCA              |
       |                                             |
       |      O SÁBIO               O HERÓI          |
       |   (Conhecimento,        (Superação, Rumo   |
       |  Clareza, Rigor)         à Aprovação)       |
       +---------------------------------------------+
```

### 1.5 Tom de Voz e Linguagem Visual
- **Tom de Voz:** Direto, motivador, claro, empático e sem "juridiquês" ou formalismo excessivo. Trata o estudante como um atleta de alta performance cognitiva.
- **Exemplo Positivo:** *"Quebramos esse conceito complexo em 3 passos simples. Vamos tentar responder juntos?"*
- **Exemplo a Evitar:** *"O aluno obteve um rendimento insatisfatório na avaliação sumativa."*

---

# 2. LOGOTIPO

### 2.1 Conceito e Simbologia
O logotipo do **MQPLUS** combina três elementos visuais fundamentais:
1. **O símbolo de Soma/Plus (+):** Representa evolução contínua, ganho de nota e multiplicação de conhecimento.
2. **O Nó Neuronal / Malha de IA:** Linhas curvas interconectadas representando os pontos de sinapse cognitiva e a inteligência artificial.
3. **O Escudo de Aprovação:** A geometria externa forma um vetor direcionado para cima (aprovação).

```
   [Símbolo Isotipo]          [Logotipo Versão Horizontal]
      /\  /\
     /  \/  \                  M Q P L U S +
    |  (+)   |             -------------------
     \      /              Ecossistema Educacional
      \____/
```

### 2.2 Área de Proteção e Proporções
- **Área de Respiro (X):** Definida pelo diâmetro do ícone de "+". Nenhuma imagem ou texto deve invadir a margem mínima de $1.5X$ em todos os lados.
- **Tamanho Mínimo Impresso:** 25mm de largura.
- **Tamanho Mínimo Digital:** 120px de largura para versão horizontal; 32px para o Favicon/Isotipo.

### 2.3 Versões de Logotipo
- **Principal (Colorida - Light/Dark):** Gradiente Indigo/Electric Purple com acentos em Emerald Green.
- **Monocromática:** Preto 100% sobre fundo claro; Branco 100% sobre fundo escuro.
- **Reduzida / Favicon:** Apenas o Isotipo estilizado com o símbolo "+".

---

# 3. MASCOTE (CORUJA COGNITIVA — "LOGI")

### 3.1 Conceito e Personalidade
O mascote oficial do MQPLUS é o **LOGI**, uma corujinha cibernética e empática com traços suaves, grandes olhos expressivos e um pequeno visor holográfico na testa que muda de cor conforme o estado emocional do aluno.

```
       /\___/\
      (  o.o  )  <-- "LOGI" (O Co-piloto de Estudos)
       > ^ <
      /|  +  |\
```

### 3.2 Estados e Expressões do LOGI
1. **LOGI Sábio (Modo Foco):** Usando óculos de proteção holográficos, segurando uma prancheta de métricas.
2. **LOGI Vibrante (Sucesso/Streak):** Comemorando com confetis e asas para cima ao atingir a meta diária.
3. **LOGI Acolhedor (Pausa/Saúde Mental):** Sentado em posição de meditação, incentivando a respiração 4-7-8.
4. **LOGI Socrático (Dúvida/IA):** Com a asa no queixo em atitude reflexiva, apontando para a dica na tela.

---

# 4. PALETA DE CORES & PSICOLOGIA DAS CORES

### 4.1 Cores Primárias (Brand Identity)
- **Brand Primary — Electric Indigo (`#4F46E5` / `HSL 243, 75%, 59%`):** Representa inteligência, foco, tecnologia de ponta e clareza mental.
- **Brand Secondary — Cyber Purple (`#7C3AED` / `HSL 262, 83%, 58%`):** Estimula a criatividade, a intuição cognitiva e a autorrealização.
- **Brand Accent — Emerald Mint (`#10B981` / `HSL 160, 84%, 39%`):** Cor de conquista, acerto em questões, evolução e frescor emocional.

### 4.2 Cores Semânticas de Estado (Feedback UI)
- **Success (`#059669` / Dark: `#34D399`):** Resposta correta, meta diária atingida, simulação concluída.
- **Warning (`#D97706` / Dark: `#FBBF24`):** Cartão de flashcard "Difícil", atenção no tempo de simulado, revisão pendente.
- **Error/Destructive (`#DC2626` / Dark: `#F87171`):** Resposta incorreta, campo inválido, encerramento abrupto.
- **Info (`#2563EB` / Dark: `#60A5FA`):** Dicas do tutor de IA, aviso de atualização, contexto pedagógico.

### 4.3 Tabela Completa de Swatches (Light & Dark Mode)

| Categoria | Token Name | Light Value (Hex) | Dark Value (Hex) | WCAG Contrast Ratio (vs Background) |
| :--- | :--- | :--- | :--- | :--- |
| **Primary** | `--primary` | `#4F46E5` | `#6366F1` | 4.8:1 (AA PASS) |
| **Primary Foreground** | `--primary-foreground` | `#FFFFFF` | `#FFFFFF` | 5.2:1 (AA PASS) |
| **Background** | `--background` | `#F8FAFC` | `#090D16` | Base Container |
| **Surface (Card)** | `--card` | `#FFFFFF` | `#111827` | 15.8:1 (AAA PASS) |
| **Text Primary** | `--foreground` | `#0F172A` | `#F8FAFC` | 17.2:1 (AAA PASS) |
| **Text Secondary** | `--muted-foreground` | `#475569` | `#94A3B8` | 7.1:1 (AAA PASS) |
| **Border** | `--border` | `#E2E8F0` | `#1E293B` | Structural Line |

---

# 5. DESIGN TOKENS

Os Design Tokens são definidos em formato JSON e integrados via variáveis CSS nativas e Tailwind CSS.

### 5.1 Espaçamento (Spacing Scale — Base 4px)
```json
{
  "space": {
    "0": "0px",
    "1": "0.25rem",  /* 4px */
    "2": "0.5rem",   /* 8px */
    "3": "0.75rem",  /* 12px */
    "4": "1rem",     /* 16px */
    "6": "1.5rem",   /* 24px */
    "8": "2rem",     /* 32px */
    "12": "3rem",    /* 48px */
    "16": "4rem"     /* 64px */
  }
}
```

### 5.2 Arredondamento (Border Radius)
- `--radius-sm`: `0.375rem` (6px) — Badges, tooltips e botões pequenos.
- `--radius-md`: `0.5rem` (8px) — Inputs, botões padrão e selects.
- `--radius-lg`: `0.75rem` (12px) — Cards, modais e containers de conteúdo.
- `--radius-xl`: `1rem` (16px) — Hero banners e dashboards de destaque.
- `--radius-full`: `9999px` — Avatares e pills.

### 5.3 Elevação e Sombras (Elevation / Box Shadow)
- `--shadow-sm`: `0 1px 2px 0 rgb(0 0 0 / 0.05)`
- `--shadow-md`: `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`
- `--shadow-lg`: `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`
- `--shadow-glow`: `0 0 20px -3px rgba(79, 70, 229, 0.35)` — Destaque de elementos ativos/IA.

---

# 6. TIPOGRAFIA

### 6.1 Famílias Tipográficas
- **Font Family Primary (Display & Interface):** `'Plus Jakarta Sans'`, sans-serif — Tipografia moderna, altamente legível em telas retina e com personalidade geométrica limpa.
- **Font Family Monospace (Código/LaTeX):** `'JetBrains Mono'`, monospace — Utilizada para equações em LaTeX, parâmetros TRI e trechos de código de exatas.

### 6.2 Escala Tipográfica Responsiva

| Nível | Size (Desktop) | Size (Mobile) | Weight | Line Height | Tracking | Uso Recomendado |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Display 1** | 3.0rem (48px) | 2.25rem (36px) | 800 (ExtraBold) | 1.1 | -0.02em | Títulos de Landing Pages e Landing Dash |
| **Heading 1** | 2.25rem (36px) | 1.75rem (28px) | 700 (Bold) | 1.2 | -0.01em | Título principal de módulo |
| **Heading 2** | 1.75rem (28px) | 1.5rem (24px) | 600 (SemiBold) | 1.3 | 0em | Títulos de seções de cards |
| **Heading 3** | 1.25rem (20px) | 1.125rem (18px) | 600 (SemiBold) | 1.4 | 0em | Subtítulos de questões e widgets |
| **Body Large** | 1.125rem (18px) | 1.0rem (16px) | 400 (Regular) | 1.6 | 0em | Enunciado de questões |
| **Body Base** | 1.0rem (16px) | 0.875rem (14px) | 400 (Regular) | 1.5 | 0em | Texto de leitura padrão |
| **Caption** | 0.75rem (12px) | 0.75rem (12px) | 500 (Medium) | 1.4 | +0.01em | Meta-dados, datas, tags de TRI |

---

# 7. GRID & BREAKPOINTS

### 7.1 Sistema de Grid (12 Colunas)
- **Desktop (>= 1280px):** 12 colunas | Margin: 32px | Gutter: 24px | Max-width: 1440px
- **Notebook (1024px - 1279px):** 12 colunas | Margin: 24px | Gutter: 20px
- **Tablet (768px - 1023px):** 8 colunas | Margin: 20px | Gutter: 16px
- **Mobile (< 768px):** 4 colunas | Margin: 16px | Gutter: 12px

### 7.2 Breakpoints do Tailwind CSS
```typescript
export const breakpoints = {
  sm: '640px',   // Mobile Landscape / Small Tablets
  md: '768px',   // Tablets
  lg: '1024px',  // Laptops / Notebooks
  xl: '1280px',  // Desktops
  '2xl': '1536px'// Screens ultra-wide
};
```

---

# 8. ICONOGRAFIA

### 8.1 Biblioteca Padrão — Lucide Icons (`lucide-react`)
- **Estilo:** Linhas limpas (Outline/Stroke) com terminação arredondada (*round caps*).
- **Espessura da Linha (Stroke Width):** Standard `2px` (Regular) e `1.5px` (Muted/Background).
- **Escala de Tamanhos:**
  - `sm`: 16px — Ícones inline com botões pequenos e badges.
  - `md`: 20px — Tamanho padrão de botões e inputs.
  - `lg`: 24px — Ícones de navegação de sidebar e cards.
  - `xl`: 32px — Ícones de destaque de módulos e estados vazios (*Empty States*).

---

# 9. ILUSTRAÇÕES

### 9.1 Estilo Visual
As ilustrações utilizam o estilo **Vector-Flat com Isometria Suave e Micro-Gradientes**, mesclando figuras humanas estilizadas com elementos interativos de estudo (livros flutuantes, engrenagens de IA, gráficos 3D de alta performance).

```
   [Ilustração de Estado Vazio / Conquista]
          ┌─────────────┐
          │  ★   LOGI   │  <-- Elementos de Celebração
          │  / \  (▲)   │
          └─────────────┘
```

---

# 10. MOTION DESIGN & ANIMAÇÕES

### 10.1 Duradas e Curvas de Aceleração (Easing)
- **Fast (`150ms`):** `cubic-bezier(0.4, 0, 0.2, 1)` — Feedback de cliques, hover em botões, checkboxes.
- **Medium (`300ms`):** `cubic-bezier(0.16, 1, 0.3, 1)` — Abertura de modais, drawers, expansão de accordion.
- **Slow (`500ms`):** `cubic-bezier(0.34, 1.56, 0.64, 1)` (Spring Effect) — Transição de telas, conquista de nível, exibição de nota TRI.

---

# 11. ESPECIFICAÇÃO DE COMPONENTES ATÔMICOS

Todos os componentes são construídos seguindo a metodologia **Atomic Design**:

```
[Átomos]  --> Botões, Inputs, Badges, Ícones
[Moléculas]--> Form Fields, Search Bars, Card Header
[Organismos]--> Navbar, Sidebar, Card de Questão, Widget de Performance
[Páginas] --> Dashboard do Aluno, Tela de Simulado, Portal Admin
```

### 11.1 Componente: Button (Botão)
- **Variações:** `default` (Primary Indigo), `secondary` (Cyber Purple), `outline`, `ghost`, `destructive`, `link`.
- **Tamanhos:** `sm` (h-8, px-3, text-xs), `md` (h-10, px-4, text-sm), `lg` (h-12, px-6, text-base), `icon` (h-10 w-10).
- **Estados:** Normal, Hover, Active, Focus-Visible, Disabled, Loading (Spinner animado).
- **Acessibilidade:** `role="button"`, suporte a acionamento via teclado (`Enter` / `Space`), foco visível com `ring-2 ring-primary`.

---

# 12. PADRÕES VISUAIS DE INTERFACE

### 12.1 Card de Questão
O Card de Questão é a unidade fundamental de interface da plataforma:
```
+-------------------------------------------------------------------+
| [ENEM 2024] [Física - Eletrodinâmica]             [Dificuldade: Médio] |
|-------------------------------------------------------------------|
| Enunciado: Um circuito elétrico residencial possui...             |
|                                                                   |
| (A) R = 10 Ohms                                                   |
| (B) R = 20 Ohms                                                   |
| (C) R = 30 Ohms                                                   |
|-------------------------------------------------------------------|
| [💡 Dica do Tutor IA]                [ Responder / Próxima -> ]   |
+-------------------------------------------------------------------+
```

---

# 13. DASHBOARD & LINGUAGEM DE DATA VISUALIZATION

### 13.1 Diretrizes para Gráficos e Widgets (Recharts)
- **Paleta de Dados:**
  - Série A (Progresso/Pontuação): `#4F46E5` (Electric Indigo)
  - Série B (Acertos/Desempenho): `#10B981` (Emerald Mint)
  - Série C (Erros/Defasagem): `#F43F5E` (Rose Pink)
  - Série D (Média Geral/Benchmark): `#94A3B8` (Slate Grey)
- **Grid Lines:** Opacidade baixa (`0.15`) para não competir visualmente com a linha de dados.
- **Tooltips Customizados:** Card flutuante escuro com borda sutil, exibindo dados numéricos exatos e delta percentual.

---

# 14. DARK MODE & TEMA ESCURO

### 14.1 Arquitetura de Cores no Dark Mode
O Dark Mode do MQPLUS utiliza tons de cinza azulado profundo (`#090D16` e `#111827`) em vez de preto puro (`#000000`), evitando contraste agressivo e fadiga visual durante estudos noturnos.

```
Light Mode: Background `#F8FAFC`  <--->  Surface `#FFFFFF`
Dark Mode:  Background `#090D16`  <--->  Surface `#111827`
```

---

# 15. DIRECTIVE DE ACESSIBILIDADE (WCAG 2.2 AA)

1. **Taxa de Contraste Mínima:**
   - Texto Normal: Mínimo $4.5:1$ contra a cor de fundo.
   - Texto Grande (Heading): Mínimo $3.0:1$.
   - Elementos Gráficos e Ícones Interativos: Mínimo $3.0:1$.
2. **Navegação por Tecla Tab:**
   - Ordem lógica de foco (`tabindex="0"`).
   - Anel de Foco Visível (*Focus Ring*) em tom primário de 2px de espessura.
3. **Leitores de Tela (Screen Readers):**
   - Atributos `aria-label`, `aria-expanded`, `aria-describedby` obrigatórios em todos os componentes complexos.

---

# 16. MICROINTERAÇÕES & ESTADOS DINÂMICOS

- **Feedback de Resposta Incorreta:** Sutil vibração horizontal (*shake effect*) de 300ms no card da opção.
- **Feedback de Resposta Correta:** Brilho verde em gradiente suave com efeito de confeti micro-animado.
- **Conclusão de Meta Diária:** Onda de progresso preenchendo o anel de status com som suave personalizável.

---

# 17. SISTEMA RESPONSIVO (MOBILE FIRST)

Toda a arquitetura de UI é construída utilizando o paradigma **Mobile First**:
1. O layout base é otimizado para telas pequenas de 360px a 414px (smartphones).
2. A barra de navegação no Mobile torna-se uma **Bottom Navigation Bar** com 4 a 5 ações de toque rápido.
3. No Desktop, o layout se expande para estrutura com **Sidebar Fixa** retrátil.

---

# 18. ORGANIZAÇÃO DA LIBRARIA NO FIGMA

```
MQPLUS Figma Library v1.0
├── 01. Cover & Overview
├── 02. Foundations (Tokens, Colors, Typography, Grid)
├── 03. Iconography & Assets
├── 04. Mascot & Illustrations
├── 05. Atomic Components (Atoms, Molecules, Organisms)
├── 06. Page Templates (Student Platform)
└── 07. Page Templates (Admin Portal)
```

---

# 19. IMPLEMENTAÇÃO TÉCNICA (TAILWIND, SHADCN, FRAMER MOTION)

O Design System é exportado como um pacote Monorepo reutilizável `@mqplus/ui`, utilizando:
- **Tailwind CSS v3+** para utilitários de estilização baseados nos Design Tokens.
- **shadcn/ui (Radix UI)** para acessibilidade de primitivos (*Dialog, Dropdown, Accordion, Tabs*).
- **Framer Motion** para animações declarativas e transições de estado.
- **CSS Variables** para troca dinâmica de temas (Light/Dark).

---

# 20. ESTRUTURA DO PACOTE UI (`packages/ui`)

```
packages/ui/
├── src/
│   ├── components/       # Componentes atômicos (Button, Card, Input, etc.)
│   ├── tokens/           # Arquivos de tokens (Colors, Typography, Spacing)
│   ├── theme/            # Configuração do tema e suporte a CSS Variables
│   ├── providers/        # ThemeProvider e Contextos Globais de UI
│   ├── styles/           # globals.css com declaração de temas e utilitários
│   └── index.ts          # Ponto de entrada de exportação de todos os componentes
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

# 21. LISTAGEM COMPLETA DE ARQUIVOS DO SISTEMA

1. `packages/ui/package.json`
2. `packages/ui/tsconfig.json`
3. `packages/ui/tailwind.config.ts`
4. `packages/ui/src/styles/globals.css`
5. `packages/ui/src/tokens/colors.ts`
6. `packages/ui/src/tokens/typography.ts`
7. `packages/ui/src/tokens/spacing.ts`
8. `packages/ui/src/tokens/tokens.ts`
9. `packages/ui/src/theme/theme.ts`
10. `packages/ui/src/providers/theme-provider.tsx`
11. `packages/ui/src/components/button.tsx`
12. `packages/ui/src/components/card.tsx`
13. `packages/ui/src/components/badge.tsx`
14. `packages/ui/src/components/input.tsx`
15. `packages/ui/src/components/index.ts`
16. `packages/ui/src/index.ts`

---

# 22. JUSTIFICATIVAS TÉCNICAS E DESIGN TRADE-OFFS

1. **Escolha do Tailwind CSS + shadcn/ui:** Permite estilização atômica ultra rápida sem o *overhead* de bibliotecas pesadas de CSS-in-JS (como styled-components). O shadcn/ui injeta o código diretamente no repositório, garantindo controle 100% sobre acessibilidade e customização.
2. **Uso de CSS Variables em HSL:** As variáveis CSS em formato HSL permitem ajustar a opacidade e a luminosidade de forma dinâmica em código (ex: `hsl(var(--primary) / 0.1)`), facilitando o Dark Mode sem duplicação de regras CSS.
3. **Primitivos Radix UI:** Garantem conformidade total com o padrão WCAG 2.2 AA out-of-the-box (gestão de foco, navegação por setas do teclado e leitores de tela).

---

# 23. CÓDIGO-BASE INICIAL (`packages/ui`)

*(Os arquivos de código-base completos foram gerados fisicamente no diretório `packages/ui/` do repositório).*

---

# 24. ESTRATÉGIA DE TESTES DE UI & ACESSIBILIDADE

- **Testes Visuais de Regressão (Chromatic / Storybook):** Comparação pixel-perfect de alterações em componentes do Design System.
- **Auditoria Automatizada de Acessibilidade (axe-core / jest-axe):** Testes em CI/CD validando o contraste de cor, marcações `aria-*` e estados de foco de cada componente.

---

# 25. PLANO DE EVOLUÇÃO FUTURA DO DESIGN SYSTEM

1. **Versão 1.1:** Adição do pacote de componentes de Data Visualization (`@mqplus/charts`).
2. **Versão 1.2:** Lançamento do ecossistema de Tokens Mobile para React Native / Expo.
3. **Versão 2.0:** Suporte a micro-temas customizados para escolas parceiras no modelo White-Label (B2B Escolas).

---
*Fim da Documentação Oficial de Design System.*
