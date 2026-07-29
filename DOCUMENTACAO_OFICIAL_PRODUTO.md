# DOCUMENTAÇÃO OFICIAL DE ESTRATÉGIA E ESPECIFICAÇÃO DE PRODUTO (PRD)
## Ecossistema Educacional Inteligente para o Ensino Médio, Vestibulares, IFFs, ETECs e Olimpíadas

**Versão da Documentação:** 1.0.0  
**Autor:** Chief Product Officer (CPO) & Head of Product Strategy  
**Status:** Aprovado para Referência Oficial de Arquitetura, UX/UI, Engenharia e QA  
**Data:** Julho de 2026  

---

## SUMÁRIO EXECUTIVO E ESTRUTURA DO DOCUMENTO
1. [VISÃO DO PRODUTO](#1-vis%C3%83o-do-produto)
2. [BUSINESS MODEL CANVAS (BMC)](#2-business-model-canvas-bmc)
3. [VALUE PROPOSITION CANVAS (VPC)](#3-value-proposition-canvas-vpc)
4. [PESQUISA DE MERCADO](#4-pesquisa-de-mercado)
5. [BENCHMARKING COMPETITIVO](#5-benchmarking-competitivo)
6. [PERSONAS DIVERSIFICADAS](#6-personas-diversificadas)
7. [MAPAS DE EMPATIA](#7-mapas-de-empatia)
8. [JORNADAS DO USUÁRIO (USER JOURNEYS)](#8-jornadas-do-usu%C3%81rio-user-journeys)
9. [MATRIZ DE FUNCIONALIDADES & PRIORIZAÇÃO](#9-matriz-de-funcionalidades--prioriza%C3%87%C3%83o)
10. [DETALHAMENTO DE MÓDULOS DO SISTEMA](#10-detalhamento-de-m%C3%93dulos-do-sistema)
11. [REGRAS DE NEGÓCIO (RN)](#11-regras-de-neg%C3%93cio-rn)
12. [REQUISITOS FUNCIONAIS (RF)](#12-requisitos-funcionais-rf)
13. [REQUISITOS NÃO FUNCIONAIS (RNF)](#13-requisitos-n%C3%83o-funcionais-rnf)
14. [DEFINIÇÃO DETALHADA DO MVP (MINIMUM VIABLE PRODUCT)](#14-defini%C3%87%C3%83o-detalhada-do-mvp)
15. [ROADMAP MULTIANUAL DE PRODUTO (3 ANOS / MVP A V5)](#15-roadmap-multianual-de-produto-3-anos--mvp-a-v5)
16. [ESTRUTURAÇÃO DO BACKLOG DE PRODUTO (EPICS -> SUBTASKS)](#16-estrutura%C3%87%C3%83o-do-backlog-de-produto)
17. [KEY PERFORMANCE INDICATORS (KPIS)](#17-key-performance-indicators-kpis)
18. [MATRIZ DE GESTÃO DE RISCOS & MITIGAÇÃO](#18-matriz-de-gest%C3%83o-de-riscos--mitiga%C3%87%C3%83o)
19. [PLANO DE EVOLUÇÃO ESTRATÉGICA (5 ANOS)](#19-plano-de-evolu%C3%87%C3%83o-estrat%C3%89gica-5-anos)
20. [DOCUMENTO EXECUTIVO (EXECUTIVE SUMMARY)](#20-documento-executivo-executive-summary)

---

# 1. VISÃO DO PRODUTO

### 1.1 Problema Resolvido
O estudante brasileiro do Ensino Médio enfrenta uma jornada educacional marcada por quatro grandes gargalos sistêmicos:

1. **Fragmentação de Ferramentas de Estudo:** Os alunos utilizam múltiplas plataformas desconectadas (um site de questões, um app de flashcards, cadernos de papel, vídeos aleatórios no YouTube e cronogramas estáticos em PDF), gerando alto custo cognitivo de organização e perda de histórico de desempenho.
2. **Falta de Hiperpersonalização e Inteligência Pedagógica:** A maioria dos cursinhos preparatórios adota um modelo "one-size-fits-all", ignorando a curva de esquecimento individual, as lacunas conceituais específicas do estudante e a Teoria de Resposta ao Item (TRI).
3. **Ansiedade e Desgaste Emocional sem Suporte Integrado:** O nível de estresse e *burnout* entre vestibulandos atingiu patamares críticos. A falta de acompanhamento de saúde mental e a cobrança excessiva levam ao abandono ou queda vertiginosa de rendimento.
4. **Subatendimento de Segmentos Estratégicos:** Alunos que buscam exames para Institutos Federais (IFs), Escolas Técnicas (ETECs), Concursos Níveis Médios e Olimpíadas do Conhecimento (OBMEP, OBF, OBQ, etc.) sofrem com a escassez de material especializado e preditivo.

### 1.2 Público-Alvo
* **Secundaristas e Vestibulandos (B2C Direto):** Estudantes do 1º ao 3º ano do Ensino Médio e egressos que se preparam para o ENEM, vestibulares tradicionais (FUVEST, UNICAMP, VUNESP, UERJ, etc.) e vestibulares regionais.
* **Candidatos a Escolas Técnicas e IFs:** Estudantes do 9º ano do Ensino Fundamental e 1º ano do Ensino Médio focados no ingresso em Institutos Federais e Colégios Técnicos.
* **Estudantes Olímpicos:** Jovens de alto desempenho focados em olimpíadas científicas nacionais e internacionais.
* **Escolas e Redes de Ensino (B2B/B2B2C):** Instituições privadas e públicas que demandam um ambiente digital integrado para gestão de simulados, diagnóstico de turmas e suporte ao Novo Ensino Médio.
* **Pais e Responsáveis:** Financiadors que buscam relatórios transparentes sobre o progresso e o bem-estar dos filhos.

### 1.3 Mercado
* **TAM (Total Addressable Market):** R$ 18.5 bilhões no Brasil — total investido anualmente por famílias brasileiras em educação complementar, material didático e tecnologia educacional privada no segmento de Ensino Médio e Pré-Vestibular.
* **SAM (Serviceable Addressable Market):** R$ 4.2 bilhões — mercado digital de EdTechs preparatórias, plataformas de questões e cursinhos online focados no ENEM e vestibulares.
* **SOM (Serviceable Obtainable Market):** R$ 380 milhões em 3 anos — meta de captura de mercado considerando a fatia de estudantes digitais ativos B2C e parcerias com redes B2B de ensino médio.

### 1.4 Diferenciais Competitivos
* **Ecossistema 360° Unificado:** Uma única conta reúne Questões com TRI, Flashcards com SRS (Spaced Repetition System), Trilhas Adaptativas, Tutor de IA com RAG Pedagógico, Saúde Mental e Guia de Carreiras.
* **Motor de IA Pedagogicamente Balizado:** IA contextualizada que não fornece a resposta pronta, mas aplica o método socrático para guiar o aluno até a resolução.
* **Trilhas Específicas para IFs, ETECs e Olimpíadas:** Conteúdo curado e estatisticamente calibrado para exames frequentemente ignorados pelas grande edtechs genéricas.
* **Protocolo de Saúde Mental Integrado ao Cronograma:** Sistema preditivo que detecta sinais de exaustão através do padrão de erros e tempo de resposta, ajustando a carga horária automaticamente.

### 1.5 Objetivos do Produto
* Alcançar 100.000 usuários ativos mensais (MAU) nos primeiros 12 meses pós-lançamento.
* Obter uma taxa de retenção acumulada no Mês 3 (M3 Retention) superior a 45%.
* Aumentar a pontuação média do aluno no ENEM em pelo menos 140 pontos após 6 meses de uso ativo contínuo da plataforma.
* Alcançar Net Promoter Score (NPS) constante acima de 75 (Zona de Excelência).

### 1.6 Missão, Visão e Valores
* **Missão:** Democratizar a aprovação e o aprendizado de alta performance, integrando inteligência artificial, suporte emocional e métodos pedagógicos cientificamente comprovados.
* **Visão:** Tornar-se a principal plataforma de inteligência educacional da América Latina até 2030, sendo o ecossistema indispensável na transição da educação básica para a vida universitária e profissional.
* **Valores:** Rigor Pedagógico, Empatia com o Estudante, Aprendizado Personalizado, Inovação Ética em IA e Transparência de Resultados.

### 1.7 Posicionamento de Mercado
A plataforma se posiciona como o **"Co-piloto de Aprendizagem do Estudante de Alta Performance e Bem-estar"**. Diferente dos cursinhos tradicionais que focam apenas em vídeo-aulas passivas ou bancos de questões brutos, nosso ecossistema integra a tecnologia cognitiva de aprendizagem adaptativa ao cuidado humano e emocional.

### 1.8 Proposta de Valor
> *"Aprovação garantida pelo método certo, no seu ritmo, com IA ao seu lado e sem destruir sua saúde mental."*

---

# 2. BUSINESS MODEL CANVAS (BMC)

| Bloco BMC | Detalhamento Estratégico |
| :--- | :--- |
| **Parceiros-Chave** | • Redes de Escolas e Colégios Privados.<br>• Secretarias Estaduais/Municipais de Educação (B2G).<br>• Criadores de Conteúdo Educacional e Professores Influenciadores.<br>• Psicólogos e Consultores de Carreira Educacional.<br>• Olimpíadas Científicas (parcerias institucionais). |
| **Atividades-Chave** | • Curadoria e elaboração contínua de questões com parâmetros TRI.<br>• Treinamento e ajuste fino (*Fine-Tuning*) do motor de IA Pedagógico.<br>• Desenvolvimento de software Web e Mobile com alta usabilidade.<br>• Produção de resumos sintéticos e trilhas interativas.<br>• Suporte ao cliente e moderação da comunidade. |
| **Recursos-Chave** | • Banco de dados proprietário com +150.000 questões classificadas por habilidades BNCC e TRI.<br>• Algoritmo proprietário de Repetição Espaçada e Recomendação Adaptativa.<br>• Infraestrutura Cloud escalável e segura.<br>• Equipe multidisciplinar (Pedagogia, UX, IA, Eng. Software, Psicologia). |
| **Proposta de Valor** | • Preparação integrada para ENEM, Vestibulares, IFs, ETECs e Olimpíadas.<br>• Tutor Inteligente 24/7 com método socrático.<br>• Dashboard com diagnóstico preciso de defasagens e predição TRI.<br>• Suporte emocional e técnicas de estudo integradas à rotina.<br>• Economia de tempo pela unificação de ferramentas de estudo. |
| **Relacionamento** | • Atendimento automatizado de primeiro nível via IA Tutor.<br>• Comunidade exclusiva de alunos e mentorias coletivas ao vivo.<br>• Suporte humanizado para questões financeiras e pedagógicas complexas.<br>• Relatórios periódicos automatizados para os Pais/Responsáveis. |
| **Canais** | • Plataforma Web (Desktop/Mobile Web).<br>• Aplicativos Nativos iOS e Android.<br>• Redes Sociais (TikTok, Instagram, YouTube Shorts) focadas em Growth Orgânico.<br>• Canal Direto B2B para Escolas. |
| **Segmentos de Clientes** | • **B2C Alunos:** Estudantes de EM (público e privado), Vestibulandos, Candidatos a IFs/ETECs.<br>• **B2C Pais:** Financiadors interessados na evolução dos filhos.<br>• **B2B Escolas:** Gestores pedagógicos buscando tecnologia de simulados e analytics.<br>• **B2C Premium:** Alunos buscando mentorias 1:1 e apoio psicológico dedicado. |
| **Estrutura de Custos** | • Custos de Infraestrutura Cloud, Hospedagem e Tokens de APIs de IA.<br>• Pagamento de Conteudistas, Revisores Pedagógicos e Mentores.<br>• Custos de Aquisição de Clientes (CAC - Mídia paga, SEO, Inbound).<br>• Salários de Engenharia, Produto, Design e Suporte.<br>• Taxas de Gateway de Pagamento e Licenciamento de Softwares. |
| **Fontes de Receita** | • Assinatura B2C Mensal/Anual (Planos *Basic*, *Pro* e *Elite*).<br>• Licenciamento B2B por aluno (*SaaS B2B Escolas*).<br>• Add-ons avulsos (Sessões de Psicologia 1:1, Correção VIP de Redação, Mentorias Avançadas).<br>• Parcerias e Patrocinadores para Simulados Abertos Nacionais. |

---

# 3. VALUE PROPOSITION CANVAS (VPC)

### 3.1 Perfil do Cliente (Customer Profile)

```
+-----------------------------------------------------------------------------------+
|                                 CUSTOMER PROFILE                                 |
+-----------------------------------------------------------------------------------+
|  CUSTOMER JOBS:                                                                  |
|  - Passar no ENEM / Vestibular desejado / IF / ETEC / Concurso.                  |
|  - Organizar uma rotina de estudos eficiente sem perder tempo montando planilhas.|
|  - Consolidar conteúdos aprendidos na escola/cursinho.                           |
|  - Monitorar seu próprio desempenho e identificar pontos fracos.                 |
|  - Manter o equilíbrio emocional durante o ano de vestibular.                    |
|                                                                                   |
|  PAINS (DORES):                                                                   |
|  - Sensação contínua de estar esquecendo a matéria aprendida há meses.            |
|  - Falta de clareza sobre quais matérias priorizar no cronograma.                |
|  - Ansiedade extrema, medo de falhar e esgotamento mental (*burnout*).            |
|  - Respostas genéricas em resoluções de questões que não sanam a dúvida exata.   |
|  - Dispersão de atenção entre múltiplos apps (Anki, PDF, YouTube, Notion, etc.). |
|                                                                                   |
|  GAINS (GANHOS DESEJADOS):                                                        |
|  - Sensação diária de progresso e domínio do conteúdo.                            |
|  - Feedback imediato nas dúvidas de exatas, humanas e redação.                   |
|  - Previsibilidade da nota no ENEM via TRI antes da prova oficial.                |
|  - Orientação clara sobre qual carreira escolher baseada no perfil e aptidão.     |
|  - Ambiente motivador gamificado que torna o estudo satisfatório.               |
+-----------------------------------------------------------------------------------+
```

### 3.2 Mapa de Valor (Value Map)

```
+-----------------------------------------------------------------------------------+
|                                    VALUE MAP                                      |
+-----------------------------------------------------------------------------------+
|  PRODUTOS E SERVIÇOS:                                                             |
|  - Ecossistema Educacional Inteligente Web & Mobile.                              |
|  - Banco de Questões com TRI + Simulados Programados + Flashcards SRS Integrados.|
|  - Tutor de IA Socrático 24/7 + Trilhas Adaptativas por Matéria.                 |
|  - Módulo de Saúde Mental (Técnicas de Respiração, Gestão de Estresse, Sessões). |
|  - Guia de Carreiras com Teste Vocacional Dinâmico.                               |
|                                                                                   |
|  PAIN RELIEVERS (ALIVIADORES DE DOR):                                             |
|  - Cronograma Adaptativo Automático que reajusta as matérias em caso de atraso.  |
|  - Algoritmo de Repetição Espaçada que agenda revisões antes do esquecimento.     |
|  - IA que explica resoluções passo a passo sem entregar a resposta direta.        |
|  - Módulo de Saúde Mental com alertas preventivos de sobrecarga cognitiva.        |
|  - Centralização de todas as ferramentas de estudo em um único login.             |
|                                                                                   |
|  GAIN CREATORS (CRIADORES DE GANHO):                                             |
|  - Simulados preditivos com nota estimada na escala TRI oficial do Inep.          |
|  - Gamificação com elementos de RPG, conquistas e racha de conhecimento seguro.   |
|  - Relatórios visuais intuitivos de lacunas de aprendizado por tópico.           |
|  - Módulo exclusivo preparatório para IFs, ETECs e Olimpíadas.                   |
+-----------------------------------------------------------------------------------+
```

---

# 4. PESQUISA DE MERCADO

### 4.1 Tendências Globais e Nacionais em EdTech
1. **Inteligência Artificial Genômico-Pedagógica:** Migração do modelo de busca por resoluções em vídeo para diálogo iterativo socrático via IA.
2. **Microlearning e Nanocredenciais:** Preferência marcante do estudante Z/Alpha por módulos condensados de 10 a 15 minutos, focados em resolução ativa de problemas.
3. **Spaced Repetition System (SRS) Automatizado:** Crescimento de mais de 300% na busca por metodologias estilo *Anki*, exigindo integração nativa em plataformas de estudo.
4. **Bem-estar Integrado à Aprendizagem (Social-Emotional Learning - SEL):** Reconhecimento de que a capacidade cognitiva é diretamente limitada pelo estado emocional e ansiedade do estudante.
5. **Transição para Avaliações Digitais e Matriz BNCC:** Mudanças estruturais nos exames nacionais exigindo maior foco em interpretação, interdisciplinaridade e raciocínio lógico.

### 4.2 Oportunidades Não Atendidas
* **Falta de Preparatórios Específicos para Institutos Federais (IFs) e ETECs:** Grande parte do mercado foca unicamente no ENEM, deixando desassistidos mais de 1.5 milhão de alunos que realizam vestibulinhos de ensino técnico anualmente.
* **Olimpíadas do Conhecimento:** Crescimento do uso de medalhas olímpicas como forma de ingresso direto em universidades de elite (UNICAMP, USP, UNIFEI), criando demanda por preparatórios focados em OBMEP, OBQ, OBF, etc.
* **Inteligência Artificial com Restrição Socrática:** Alunos que usam ChatGPT tradicional frequentemente copiam respostas sem aprender; a oportunidade reside em uma IA ajustada com travas pedagógicas.

### 4.3 Ameaças e Barreiras de Entrada
* **Altos Custos de Licenciamento e Ingestão de IA:** A dependência excessiva de APIs de LLM sem otimização de cache/RAG pode comprometer as margens do negócio.
* **Curva de Churn Pós-Exames:** Queda sazonal acentuada no uso entre os meses de dezembro e fevereiro (pós-ENEM), exigindo produtos de retenção contínua (ex: transição para faculdade ou vestibulinhos de meio de ano).
* **Barreira Pedagógica de Banco de Dados:** Exigência de um acervo massivo de questões categorizadas com gabaritos comentados e parâmetros TRI calibrados.

---

# 5. BENCHMARKING COMPETITIVO

| Plataforma | Pontos Fortes | Pontos Fracos | Modelo de Negócio | UX/Diferencial | Oportunidade de Inovação |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Descomplica** | • Marca forte.<br>• Excelente marketing.<br>• Acervo amplo de videoaulas. | • Foco passivo em vídeos.<br>• Pouca personalização real.<br>• Sem SRS de flashcards. | Assinatura B2C (Mensal/Anual) | UX colorida e descontraída, mas poluída. | Substituir a dependência de vídeo passivo por aprendizado ativo baseado em questões e IA. |
| **Qconcursos / Gran** | • Banco de questões gigantesco.<br>• Comunidade ativa nos comentários. | • Interface datada.<br>• Pouco foco em Ensino Médio/ENEM.<br>• Sem gestão de ansiedade. | Freemium / Assinatura Mensal | UX focada em concursos de adultos, rígida e fria. | Oferecer UX hipermoderna, gamificada e ajustada à linguagem da Geração Z/Alpha. |
| **Anki (Ecossistema)** | • Algoritmo de SRS impecável.<br>• Gratuito e ultra eficiente. | • Interface arcaica.<br>• Alta barreira de entrada.<br>• Sem conteúdo nativo. | Open-source / App iOS Pago | UX utilitária e complexa para leigos. | Integrar o poder do algoritmo SRS em uma interface moderna e com decks de flashcards pré-criados. |
| **Khan Academy** | • Domínio pedagógico de Exatas.<br>• 100% Gratuito.<br>• Gamificação básica. | • Conteúdo restrito para matrizes de vestibulares brasileiros (ENEM/TRI). | Filantrópico / Doações | UX limpa, focada em maestria sequencial. | Adaptar a estrutura de maestria da Khan para o modelo competitivo de TRI e vestibulares locais. |
| **Quizlet** | • Interface intuitiva.<br>• Recursos de estudo colaborativo. | • Conteúdo gerado por usuários sem validação pedagógica confiável. | Freemium / Assinatura Premium | UX leve, interativa e mobile-first. | Garantir a facilidade do Quizlet com a chancela e revisão de professores qualificados. |

---

# 6. PERSONAS DIVERSIFICADAS

### Persona 1: Lucas "O Focado no ENEM"
* **Idade:** 17 anos | **Escolaridade:** 3º ano do Ensino Médio (Escola Pública)
* **Objetivo:** Aprovação em Medicina via SISU/ENEM.
* **Dores:** Estuda 6 horas por dia mas sente que esquece matérias antigas; não sabe calcular sua evolução real pela TRI; sofre de insônia e ansiedade antes de simulados.
* **Necessidades:** Algoritmo de repetição espaçada, preditor de nota TRI e rotinas de descompressão emocional.
* **Hábitos Digitais:** Usuário intenso de TikTok e Discord, estuda prioritariamente pelo Notebook, mas faz revisões rápidas pelo Smartphone.

### Persona 2: Beatriz "A Candidata a IF/ETEC"
* **Idade:** 14 anos | **Escolaridade:** 9º ano do Ensino Fundamental (Escola Pública)
* **Objetivo:** Passar no Vestibulinho de Informática para a ETEC / Instituto Federal.
* **Dores:** Achou o conteúdo do 9º ano fraco; não sabe como resolver questões no formato de vestibulinho; falta de foco nos estudos individuais.
* **Necessidades:** Trilhas de aprendizagem guiadas passo a passo, linguagem altamente gamificada e desafios curtos.
* **Hábitos Digitais:** 100% Smartphone (*Mobile Native*), consome tutoriais no YouTube e usa redes sociais para estudo.

### Persona 3: Gabriel "O Olímpico de Exatas"
* **Idade:** 16 anos | **Escolaridade:** 2º ano do Ensino Médio (Escola Privada)
* **Objetivo:** Medalha de Ouro na OBMEP e aprovação no ITA/IME.
* **Dores:** Acha as questões tradicionais de escola muito fáceis; fica entediado com revisões básicas; quer métricas avançadas de tempo e raciocínio.
* **Necessidades:** Banco de questões de altíssima dificuldade, análises estatísticas profundas e IA Tutor que discuta resoluções avançadas.
* **Hábitos Digitais:** Utiliza Desktop com múltiplos monitores, participa de fóruns no Reddit e repositórios GitHub de estudo.

### Persona 4: Profª Helena "A Coordenadora Pedagógica B2B"
* **Idade:** 44 anos | **Cargo:** Coordenadora de Ensino Médio em Colégio Privado (400 alunos)
* **Objetivo:** Elevar o ranking da escola no ENEM e reduzir o *churn* de alunos para cursinhos concorrentes.
* **Dores:** Dificuldade em identificar precocemente alunos com defasagem; gasto excessivo de tempo na diagramação e correção manual de simulados.
* **Necessidades:** Dashboard de Analytics com visão da turma/aluno, gerador automático de provas por matriz de habilidades e relatórios para os pais.

### Persona 5: Dra. Camila "A Psicóloga e Mentora Educacional"
* **Idade:** 35 anos | **Cargo:** Mentora Vocacional e Psicóloga Escolar
* **Objetivo:** Guiar alunos na escolha de carreira e apoiar o manejo do estresse nos exames.
* **Dores:** Falta de dados objetivos sobre a rotina real de estudos do aluno; dificuldade em engajar o aluno em consultas de acompanhamento.
* **Necessidades:** Portal para acompanhamento de diagnósticos emocionais autorizados pelos alunos e ferramentas de teste vocacional estruturadas.

---

# 7. MAPAS DE EMPATIA

### 7.1 Mapa de Empatia — Lucas (Vestibulando de Medicina)

```
+-----------------------------------------------------------------------------------+
|  O QUE PENSE E SENTE?                                                             |
|  - "Tenho medo de decepcionar meus pais e perder mais um ano no cursinho."       |
|  - Sente-se pressionado pelo tempo escasso e sobrecarregado pela quantidade.      |
|  - Deseja sentir a segurança de que o método escolhido realmente funciona.        |
+-----------------------------------------------------------------------------------+
|  O QUE OUVE?                                   |  O QUE VÊ?                       |
|  - Professores dizendo que precisa estudar 10h.|  - Colegas postando rotinas no   |
|  - Pais perguntando se já estudou hoje.        |    Studygram que parecem perfeitas|
|  - Amigos dizendo que o ENEM está chegando.    |  - Notícias sobre concorrência.  |
+-----------------------------------------------------------------------------------+
|  O QUE FALA E FAZ?                                                                |
|  - Diz que está estudando muito, mas às vezes passa 1h distraído no celular.     |
|  - Acumula apostilas impressas que raramente consegue ler até o fim.             |
|  - Estuda até tarde da noite consumindo bebidas energéticas.                      |
+-----------------------------------------------------------------------------------+
|  DORES / FRUSTRAÇÕES:                          |  GANHOS / NECESSIDADES:          |
|  - Esquece matérias estudadas há 2 meses.      |  - Saber exatamente o que revisar.|
|  - Fica paralisado em questões difíceis.       |  - Ter apoio emocional de noite. |
+-----------------------------------------------------------------------------------+
```

---

# 8. JORNADAS DO USUÁRIO (USER JOURNEYS)

### 8.1 Jornada do Aluno — Ciclo Diário de Estudo Adaptativo

```
[1. DESCOBERTA / ONBOARDING] 
  --> Realiza Teste Diagnóstico inicial por TRI
  --> Define Meta (Ex: Medicina - UFRJ / Nota Alvo: 790)
  --> Sistema gera o Cronograma Adaptativo Automático

[2. ROTINA DIÁRIA DE ESTUDO]
  --> Notificação inteligente no Smartphone: "Hoje temos 30 min de Física + 15 Flashcards"
  --> Abre a Plataforma Web/Mobile --> Visualiza o Dashboard Diário

[3. EXECUÇÃO ATIVA & IA SOCRÁTICA]
  --> Resolve Lista Adaptativa de Questões do dia
  --> Trava em questão complexa de Eletrodinâmica
  --> Aciona o IA Tutor: "Não entendi por que a corrente se divide aqui."
  --> IA responde socraticamente: "Observe os nós A e B. Qual é a DDP entre eles?"
  --> Aluno compreende o conceito e acerta a questão!

[4. CONSOLIDACAO VIA REPETIÇÃO ESPAÇADA]
  --> Questões erradas alimentam automaticamente o Caderno de Erros
  --> Algoritmo SRS agenda os Flashcards correspondentes para D+1, D+7 e D+30

[5. MONITORAMENTO EMOCIONAL & FECHAMENTO]
  --> Plataforma identifica padrão de fadiga (queda de taxa de acerto no final do bloco)
  --> Exibe card sugestivo de Saúde Mental: "Que tal 5 minutos de respiração guiada?"
  --> Aluno conclui a meta diária, ganha XP, mantém a sequência de dias (Streak) e encerra com sentimento de dever cumprido!
```

### 8.2 Jornada do Coordenador Pedagógico — Gestão de Simulados B2B

```
[1. PLANEJAMENTO] 
  --> Define calendário de simulados da escola para o 3º ano.
[2. MONTAGEM AUTOMÁTICA]
  --> Acessa o Portal Administrativo -> Seleciona Matriz ENEM -> Filtra questões inéditas ou TRI.
  --> Gera a prova em PDF para impressão ou disponibiliza para realização digital na plataforma.
[3. APLICAÇÃO E PROCESSAMENTO]
  --> Alunos realizam o simulado digitalmente ou preenchem o gabarito via leitura óptica no app.
  --> Sistema calcula instantaneamente as notas pela matriz de Teoria de Resposta ao Item (TRI).
[4. ANÁLISE PREDITIVA E AÇÃO CORRETIVA]
  --> Coordenador acessa o Dashboard de Analytics: Identifica que 68% da Turma B errou questões de "Frequência e Período de Ondas".
  --> Envia alerta direto para o Professor da matéria agendar uma aula de reforço focada.
```

---

# 9. MATRIZ DE FUNCIONALIDADES & PRIORIZAÇÃO

| Módulo | Funcionalidade | MVP | V2 | V3 | Longo Prazo |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Autenticação** | Cadastro, Login (Email, Social), RBAC, LGPD consentimento | **X** | | | |
| **Questões** | Banco de Questões com Filtros Avançados e Gabarito Comentado | **X** | | | |
| **Questões** | Caderno de Erros Automático e Anotações Privadas | **X** | | | |
| **Simulados** | Engine de Simulados Modulados e Simulados Oficiais ENEM/IF | **X** | | | |
| **Simulados** | Cálculo de Nota com Algoritmo TRI (Teoria de Resposta ao Item) | **X** | | | |
| **Flashcards** | Sistema de Repetição Espaçada (SRS/Algoritmo SM2 adaptado) | **X** | | | |
| **IA Tutor** | Chat Socrático com IA treinado em Matriz BNCC (RAG) | **X** | | | |
| **IA Tutor** | Corretor Inteligente de Redação com Critérios ENEM | | **X** | | |
| **Cronograma** | Gerador de Plano de Estudos Adaptativo Automático | **X** | | | |
| **Gamificação** | XP, Níveis, Streaks (Sequência de Dias) e Badges básicas | **X** | | | |
| **Gamificação** | Racha de Conhecimento Multiplayer (Duelo de Questões 1v1) | | **X** | | |
| **Saúde Mental** | Testes de Ansiedade (GAD-7), Exercícios de Respiração Guiada | | **X** | | |
| **Saúde Mental** | Agendamento de Consultas 1:1 com Psicólogos Credenciados | | | **X** | |
| **Carreiras** | Guia de Profissões e Calculadora de Corte SISU/Prouni | | **X** | | |
| **Carreiras** | Teste Vocacional Inteligente com Matching de Perfil | | **X** | | |
| **Olimpíadas** | Trilhas e Questões Específicas para OBMEP, OBF, OBQ, OBA | | **X** | | |
| **B2B Escolas** | Dashboard do Coordenador, Gerador de Provas e Gestão de Turmas | | | **X** | |
| **Comunidade** | Fórum de Dúvidas Moderado com Upvotes estilo StackOverflow | | | **X** | |
| **Concursos** | Trilha Preparatória para Concursos de Nível Médio | | | | **X** |
| **Internacional** | Suporte Multilíngue e Exames Internacionais (SAT/BAC) | | | | **X** |

---

# 10. DETALHAMENTO DE MÓDULOS DO SISTEMA

```
+-----------------------------------------------------------------------------------+
|                               ARQUITETURA DE MÓDULOS                              |
+-----------------------------------------------------------------------------------+
| [M01] Autenticação e Perfis (RBAC)         [M09] Saúde Mental e Bem-Estar        |
| [M02] Banco de Questões Inteligente        [M10] Engine de Gamificação            |
| [M03] Simulados e Calibração TRI           [M11] Portal Administrativo / CMS     |
| [M04] Flashcards & SRS (Repetição Espaçada)[M12] Analytics & BI Pedagógico        |
| [M05] Trilhas e Resumos Dinâmicos          [M13] Financeiro e Assinaturas (SaaS)  |
| [M06] IA Pedagógica & Tutor Socrático      [M14] Marketing, Growth & Referral     |
| [M07] Planejador de Estudos Adaptativo     [M15] Comunidade e Aprendizagem Social |
| [M08] Guia de Carreiras & Teste Vocacional                                        |
+-----------------------------------------------------------------------------------+
```

### Detalhamento dos Módulos Críticos

* **Módulo 02 — Banco de Questões Inteligente:** Permite ao aluno filtrar questões por Ano, Banca, Instituição, Matéria, Tópico, Dificuldade, Estilo de Questão (Múltipla Escolha, Certo/Errado, Discursiva) e Presença de Imagens. Suporta modo noturno, modo foco sem distração e marcação temporária para revisão posterior.
* **Módulo 03 — Simulados e Calibração TRI:** Permite a execução de provas completas ou minissimulados com cronômetro regressivo ajustado às condições reais de prova. Utiliza parâmetros de discriminação ($a$), dificuldade ($b$) e acerto ao acaso ($c$) da Teoria de Resposta ao Item para estimar com precisão estatística a nota final do aluno.
* **Módulo 04 — Flashcards & SRS:** Sistema de cartões de memória com frente (pergunta/conceito) e verso (resposta/explicação), que utiliza o algoritmo SM-2 customizado. O aluno classifica sua facilidade de resposta em: "Errei", "Difícil", "Bom" ou "Fácil", determinando o intervalo exato para a próxima exibição.
* **Módulo 06 — IA Pedagógica & Tutor Socrático:** Integrado a uma arquitetura de Retrieval-Augmented Generation (RAG) abastecida com a Matriz de Referência do ENEM e BNCC. A IA é estritamente configurada para atuar como tutor: quando o aluno envia uma dúvida, ela responde fazendo perguntas guia, apontando a regra gramatical ou fórmula matemática relevante sem fornecer a alternativa correta diretamente.
* **Módulo 09 — Saúde Mental & Bem-Estar:** Oferece triagem emocional por escalas validadas (ex: GAD-7 para ansiedade e PHQ-9 para sintomas depressivos), diário de humor com tags de contexto e ferramentas imediatas de descompressão (técnica 4-7-8 de respiração, meditações guiadas curtas e rotinas de higiene do sono).

---

# 11. REGRAS DE NEGÓCIO (RN)

| ID | Nome da Regra | Módulo | Descrição / Condição da Regra | Ação do Sistema |
| :--- | :--- | :--- | :--- | :--- |
| **RN-001** | Validação de Acesso por Plano | Auth / Fin | Aluno com assinatura inativa ou inadimplente tentando acessar conteúdos *Premium*. | Bloquear resolução de questões além do limite *Free* (10/dia) e redirecionar para tela de checkout. |
| **RN-002** | Cálculo da Prova por TRI | Simulados | Conclusão de simulado modelo ENEM contendo mínimo de 45 questões por área. | Aplicar modelo logístico de 3 parâmetros da TRI. Não permitir atribuição de nota baseada unicamente em porcentagem simples de acertos. |
| **RN-003** | Algoritmo de Repetição Espaçada | Flashcards | Aluno responde flashcard como "Errei". | Reagendar a exibição do cartão para o mesmo dia em até 10 minutos e resetar o fator de facilidade ($EF$). |
| **RN-004** | Restrição Socrática do Tutor IA | IA Tutor | Aluno envia mensagem solicitando: "Qual é o gabarito da questão X?". | Prompt do sistema bloqueia revelação do gabarito e força a IA a retornar uma dica conceitual ou pergunta norteadora. |
| **RN-005** | Reajuste Automático do Cronograma| Cronograma | Aluno acumula mais de 3 dias seguidos sem cumprir as metas de estudo agendadas. | Disparar modal de recalibragem: redistribuir as matérias pendentes nas semanas futuras sem sobrecarregar a carga diária máxima. |
| **RN-006** | Alerta de Fadiga Mental | Saúde Mental | Aluno apresenta tempo de resposta 50% abaixo da sua média com taxa de erro 3x superior nas últimas 15 questões. | Pausar a sessão temporariamente com mensagem empática sugerindo 10 minutos de intervalo. |
| **RN-007** | Consentimento de Menores (LGPD) | Autenticação | Cadastro de usuário com idade inferior a 16 anos completos. | Exigir inserção de e-mail do responsável legal e aceite de consentimento para tratamento de dados pessoais conforme a LGPD. |
| **RN-008** | Manutenção da Sequência (Streak) | Gamificação | Conclusão de ao menos 1 meta diária de estudo até às 23:59:59 do fuso horário local do usuário. | Incrementar o contador de dias seguidos (Streak) em +1. Caso falhe, zerar o contador (a menos que possua um item "Congelamento de Streak"). |
| **RN-009** | Submissão de Redação | IA / Pedag. | Envio de imagem ou texto digitado da redação pelo aluno no Plano Pro/Elite. | Encaminhar para o motor OCR/IA ou banca de corretores humanos. Prazo máximo de devolução: 24h para IA, 72h para humano. |
| **RN-010** | Moderação de Conteúdo da Comunidade | Comunidade | Inserção de comentário ou post contendo termos de ódio, ofensas ou spam. | Ocultar postagem instantaneamente via filtro de linguagem ofensiva e enviar para fila de revisão do Administrador. |

---

# 12. REQUISITOS FUNCIONAIS (RF)

### Módulo 01: Autenticação e Gestão de Usuários
* **RF-001:** O sistema deve permitir o cadastro de novos alunos via e-mail/senha e autenticação social (Google, Apple ID).
* **RF-002:** O sistema deve suportar controle de acesso baseado em funções (RBAC) para os perfis: Aluno, Professor, Coordenador, Mentor, Psicólogo e Administrador Geral.
* **RF-003:** O sistema deve disponibilizar funcionalidade de recuperação de senha via token seguro enviado por e-mail com validade de 15 minutos.

### Módulo 02: Banco de Questões e Resolução
* **RF-004:** O sistema deve permitir a busca e filtragem de questões por disciplina, assunto, subassunto, banca, ano, instituição e nível de dificuldade.
* **RF-005:** O sistema deve permitir a resolução individual de questões com renderização perfeita de textos complexos, fórmulas em LaTeX e imagens em alta resolução.
* **RF-006:** O sistema deve fornecer gabarito comentado detalhado (em texto e/ou vídeo) após a confirmação da resposta pelo aluno.
* **RF-007:** O sistema deve incluir automaticamente a questão errada no "Caderno de Erros" do aluno com opção de inserção de anotação pessoal.

### Módulo 03: Simulados e Engine TRI
* **RF-008:** O sistema deve permitir a realização de simulados cronometrados com interface idêntica ao ambiente de exame oficial.
* **RF-009:** O sistema deve processar as respostas do simulado e apresentar um relatório completo de desempenho, contendo a nota estimada na escala TRI oficial (200 a 1000).
* **RF-010:** O sistema deve exibir gráfico comparativo do desempenho do aluno em relação à média geral dos participantes do simulado.

### Módulo 04: Flashcards e Repetição Espaçada
* **RF-011:** O sistema deve permitir a criação de baralhos (*decks*) de flashcards privados pelo aluno e acesso a decks oficiais criados pelos conteudistas.
* **RF-012:** O sistema deve executar a rotina de revisão diária baseada no algoritmo SRS, apresentando os cartões devidos no dia.

### Módulo 06: IA Educacional e Tutor Inteligente
* **RF-013:** O sistema deve disponibilizar um chat de IA acessível dentro da tela de resolução de questões.
* **RF-014:** O tutor de IA deve utilizar o histórico de erros do aluno para adaptar o tom da explicação e identificar lacunas de pré-requisito (ex: detectar falta de domínio em frações durante aula de física).

---

# 13. REQUISITOS NÃO FUNCIONAIS (RNF)

* **RNF-001 (Segurança):** Todo o tráfego de dados deve ser criptografado via HTTPS/TLS 1.3. Dados sensíveis (senhas e tokens) devem ser armazenados com hashing forte (bcrypt/Argon2).
* **RNF-002 (Performance/Latência):** O tempo de carregamento inicial da página Web (*First Contentful Paint*) deve ser inferior a 1.5 segundos em conexões 4G padrão. A latência de resposta do motor de IA não deve exceder 3.0 segundos para o primeiro token.
* **RNF-003 (Escalabilidade):** A arquitetura deve suportar picos de acessos concorrentes de até 50.000 usuários simultâneos durante a realização de Simulados Nacionais sem degradação de performance.
* **RNF-004 (Disponibilidade):** O sistema deve ter um Service Level Agreement (SLA) de disponibilidade de 99.9% de tempo de atividade (Uptime) medido mensalmente.
* **RNF-005 (Acessibilidade):** A interface Web e Mobile deve estar em conformidade estrita com as diretrizes WCAG 2.1 no nível AA, garantindo navegação por teclado, suporte a leitores de tela e contraste adequado.
* **RNF-006 (Conformidade LGPD):** O sistema deve fornecer painel transparente de privacidade, permitindo ao usuário exportar todos os seus dados pessoais ou solicitar a exclusão definitiva de sua conta (*Right to be forgotten*).
* **RNF-007 (Usabilidade/Design System):** A interface deve seguir um Design System exclusivo com componentes reutilizáveis, garantindo consistência visual e suporte nativo a modo escuro (*Dark Mode*).
* **RNF-008 (Backup e Resiliência):** Devem ser realizados backups automáticos diários do banco de dados relacional com retenção de 30 dias e RPO (Recovery Point Objective) inferior a 15 minutos.

---

# 14. DEFINIÇÃO DETALHADA DO MVP

### 14.1 Escopo do MVP (Web Launch)
O MVP será uma aplicação Web direcionada prioritariamente para vestibulandos do ENEM e alunos de Ensino Médio, contendo o núcleo fundamental de aprendizagem ativa:

1. **Módulo Autenticação:** Login/Cadastro + Escolha do Objetivo de Prova.
2. **Módulo Banco de Questões:** 30.000 questões cadastradas (Foco em ENEM e principais vestibulares) com filtros por Matéria/Assunto e Gabarito em texto.
3. **Módulo Simulados:** 4 Simulados Completos ENEM com cálculo de nota TRI aproximado.
4. **Módulo Flashcards SRS:** Funcionalidade básica de revisão espaçada com Decks Oficiais da plataforma.
5. **Módulo IA Tutor (Socrático Básico):** Chat de auxílio na resolução de questões com restrição socrática.
6. **Módulo Cronograma:** Gerador simples de metas semanais de estudo.
7. **Portal Administrativo Básico:** CMS para cadastro/edição de questões e acompanhamento de usuários ativos.

```
+-----------------------------------------------------------------------------------+
|                               ESCOPO DO MVP WEB                                   |
+-----------------------------------------------------------------------------------+
|  [ Autenticação ] --> [ Banco de 30k Questões ] --> [ IA Tutor Socrático (RAG) ]  |
|         |                      |                             |                    |
|         v                      v                             v                    |
|  [ Dashboard ]  --> [ Simulados com TRI ]  --> [ Flashcards SRS Automáticos ]    |
+-----------------------------------------------------------------------------------+
```

### 14.2 Trade-offs e Exclusões Deliberadas no MVP
* **Fora do MVP:** Apps Nativos Mobile (utilizar-se-á Web responsiva PWA no lançamento), Módulo B2B para Escolas, Módulo Avançado de Saúde Mental com consultas, Rachas Multiplayer de Gamificação e Módulo de Concursos.
* **Justificativa Estratégica:** Validar primeiramente o engajamento do aluno com a IA Socrática e o algoritmo de Repetição Espaçada. Investir em recursos B2B ou aplicativos nativos antes da validação da retenção do estudante traria alto risco de desperdício de capital.

---

# 15. ROADMAP MULTIANUAL DE PRODUTO (3 ANOS / MVP A V5)

```
2026 (Ano 1)                    2027 (Ano 2)                    2028 (Ano 3)
Q1   Q2   Q3   Q4             Q1   Q2   Q3   Q4             Q1   Q2   Q3   Q4
|----|----|----|----|         |----|----|----|----|         |----|----|----|----|
[=== MVP WEB ===]             [==== V3 B2B ====]             [==== V5 INT ====]
     [=== V2 MOBILE ===]           [==== V4 CONCURSOS ===]
```

### 15.1 Detalhamento por Versão

#### MVP — Mês 1 ao Mês 4: Lançamento do Core Web
* Lançamento da Plataforma Web responsiva.
* Implementação do Banco de Questões, Simulados TRI, Flashcards SRS e IA Tutor.
* Validação das métricas de retenção inicial e satisfação (NPS).

#### Versão 2 (V2) — Mês 5 ao Mês 8: Expansão Mobile & Gamificação
* Lançamento dos Aplicativos Nativos iOS e Android.
* Implementação do Módulo de Saúde Mental V1 (Diário de Humor, GAD-7 e Exercícios de Respiração).
* Módulo de Gamificação Avançada (Ligas Semanais, Conquistas, Loja de Avatares).
* Lançamento do Módulo de Carreiras e Teste Vocacional.

#### Versão 3 (V3) — Mês 9 ao Mês 14: Ecossistema B2B Escolas & IFs/ETECs
* Lançamento do Portal B2B para Coordenadores e Professores de Redes de Ensino.
* Inclusão de Trilhas Específicas para Vestibulinhos de IFs, ETECs e Olimpíadas Científicas.
* Módulo de Corretor de Redação com visão comparativa de critérios ENEM.

#### Versão 4 (V4) — Mês 15 ao Mês 22: Aprendizagem Social & Concursos Nível Médio
* Módulo de Comunidade e Fórum de Dúvidas P2P com sistema de moderação e reputação.
* Rachas de Conhecimento Multiplayer (Duelos 1v1 ao vivo).
* Expansão do catálogo de conteúdos para Concursos Públicos de Nível Médio (Caixa, Correios, Banco do Brasil, TJ).

#### Versão 5 (V5) — Mês 23 ao Mês 36: Plataforma Global & IA Generativa Total
* IA Predictor Avançada (Previsão de probabilidade exata de aprovação por curso/universidade).
* Expansão Internacional para América Latina (Mercado de Habla Hispana - exames de ingresso no México, Colômbia e Argentina).

---

# 16. ESTRUTURAÇÃO DO BACKLOG DE PRODUTO

### EPIC 01: Engine de Aprendizagem Adaptativa e Questões

#### Feature 1.1: Resolução Ativa e IA Socrática
* **USER STORY 1.1.1:**
  * **Como** Aluno do Ensino Médio,
  * **Quero** acionar o Tutor de IA diretamente na tela de uma questão que errei,
  * **Para que** eu possa entender o conceito subjacente sem receber a resposta pronta de imediato.
  * **Prioridade:** Alta (Must Have / MVP)
  * **Dependências:** RF-004, RF-013, Infraestrutura RAG configurada.
  * **Critérios de Aceite (BDD):**
    * **GIVEN** que o aluno está resolvendo uma questão de Matemática e selecionou uma alternativa incorreta,
    * **WHEN** ele clicar no botão "Pedir Dica à IA",
    * **THEN** o sistema deve abrir a janela de chat do Tutor e gerar uma resposta em formato socrático (pergunta de orientação) em menos de 3 segundos, sem mencionar qual é a alternativa correta (A, B, C, D ou E).

#### Tasks e Subtasks da Story 1.1.1:
* **TASK 01:** Modelagem do Prompt Socrático e Testes de Guardrails no LLM.
  * *Subtask 1.1:* Escrever prompt base com regras de proibição de divulgação do gabarito.
  * *Subtask 1.2:* Executar testes automatizados com 50 questões de exatas para validar se o LLM "vaza" a resposta.
* **TASK 02:** Desenvolvimento do Componente de UI do Chat do Tutor.
  * *Subtask 2.1:* Criar drawer/modal lateral responsivo de chat integrado à tela da questão.
  * *Subtask 2.2:* Adicionar suporte à renderização de fórmulas matemáticas (KaTeX) nas mensagens do chat.
* **TASK 03:** Integração da API de IA com o Histórico do Usuário.
  * *Subtask 3.1:* Enviar no contexto da API a questão atual, o histórico recente de erros do aluno no mesmo tópico e a alternativa que ele marcou incorretamente.

---

# 17. KEY PERFORMANCE INDICATORS (KPIS)

```
+-----------------------------------------------------------------------------------+
|                                 MATRIZ DE KPIS                                    |
+-----------------------------------------------------------------------------------+
|  KPIS DE APRENDIZAGEM & QUALIDADE PEDAGÓGICA                                       |
|  - Ganho Médio de Pontuação TRI (Delta de pontos entre 1º e último simulado).     |
|  - Taxa de Retenção de Conhecimento SRS (% de cartões lembrados na data devida).  |
|  - Índice de Solução Autônoma via IA (% de alunos que acertam a questão após dica)|
+-----------------------------------------------------------------------------------+
|  KPIS DE ENGAJAMENTO & PRODUTO                                                    |
|  - DAU / MAU Ratio (Stickiness) - Meta: > 40%.                                    |
|  - Tempo Médio de Estudo Ativo Diário (Meta: 45 a 75 minutos).                    |
|  - M3 User Retention Rate (Meta: > 45%).                                          |
+-----------------------------------------------------------------------------------+
|  KPIS FINANCEIROS & GROWTH (SAAS)                                                 |
|  - Monthly Recurring Revenue (MRR) e Annual Recurring Revenue (ARR).              |
|  - Customer Acquisition Cost (CAC) vs. Lifetime Value (LTV) - Meta: LTV/CAC > 3.5.|
|  - Free-to-Paid Conversion Rate (Meta: > 4.2%).                                   |
|  - Net Promoter Score (NPS) - Meta: > 75.                                         |
+-----------------------------------------------------------------------------------+
```

---

# 18. MATRIZ DE GESTÃO DE RISCOS & MITIGAÇÃO

| Risco Identificado | Categoria | Prob. | Impacto | Estratégia de Mitigação |
| :--- | :--- | :---: | :---: | :--- |
| **Alucinação do Modelo de IA em Matérias Exatas** | Técnico / Pedagógico | Média | Alto | Implementar arquitetura RAG rigorosa abastecida apenas com conteúdos pedagógicos verificados; utilizar código Python em background para resolução de cálculos matemáticos complexos. |
| **Alta Volatilidade de Custos de API de LLM** | Financeiro | Média | Alto | Utilizar sistema de cache de respostas frequentes (*Semantic Caching*); utilizar modelos de código aberto menores (*Fine-Tuned Small Language Models*) para tarefas simples. |
| **Violação de Dados de Menores de Idade (LGPD)** | Jurídico | Baixa | Altíssimo | Arquitetura *Privacy by Design*; anonimização de dados; armazenamento encriptado; governança estrita de consentimento dos pais/responsáveis. |
| **Desmotivação do Aluno e Abandono do App** | Negócio / UX | Alta | Alto | Implementar onboarding gamificado curto; notificações inteligentes baseadas no hábito do aluno; alertas preventivos de fadiga e suporte de saúde mental. |
| **Rejeição por Professores/Escolas no B2B** | Negócio / Comercial| Média | Média | Posicionar a ferramenta como *aliada e otimizadora do trabalho do professor* (geração automática de listas/provas), nunca como substituta do docente. |

---

# 19. PLANO DE EVOLUÇÃO ESTRATÉGICA (5 ANOS)

```
[HORIZONTE 1: ANOS 1 & 2]  --> Dominância no Preparatório Digital ENEM/Vestibulares B2C no Brasil.
[HORIZONTE 2: ANOS 3 & 4]  --> Consolidação do Ecossistema B2B Escolas e Expansão para Concursos de Nível Médio.
[HORIZONTE 3: ANO 5+]      --> Internacionalização na América Latina e Plataforma Universal de Inteligência Aprendiz.
```

1. **Horizonte 1 (Anos 1 e 2) — Excelência no B2C Brasil:** Consolidar o produto como a melhor e mais recomendada ferramenta de estudo individual para o ENEM, vestibulares e IFs. Foco absoluto em retenção, efeito rede orgânico e otimização do algoritmo pedagógico.
2. **Horizonte 2 (Anos 3 e 4) — Expansão B2B e Concursos:** Escalar a plataforma como o sistema operacional pedagógico oficial de redes privadas e públicas de Ensino Médio no Brasil. Abrir a vertical de Concursos Públicos de Nível Médio aproveitando o mesmo banco de dados e engine de estudo adaptativo.
3. **Horizonte 3 (Ano 5+) — Plataforma Cognitiva Global:** Expandir o modelo para exames internacionais da América Latina e mercados emergentes. Transformar a infraestrutura de IA em uma API educacional aberta (*Education-as-a-Service*) para terceiros.

---

# 20. DOCUMENTO EXECUTIVO (EXECUTIVE SUMMARY)

### Visão Geral do Produto
O produto documentado nesta especificação é um **Ecossistema Educacional Inteligente e Adaptativo** projetado especificamente para suprir as demandas pedagógicas, de alta performance e de bem-estar emocional de estudantes do Ensino Médio, Vestibulandos e candidatos a Escolas Técnicas e Institutos Federais.

### O Valor do Negócio
Trata-se de uma oportunidade única no mercado de EdTechs da América Latina: unir o poder do **Aprendizado Ativo (Questões + Simulados TRI)** com a **Repetição Espaçada (SRS)**, a **Inteligência Artificial Socrática (RAG)** e a **Gestão de Saúde Mental**. A plataforma preenche a lacuna deixada por cursinhos tradicionais focados em consumo passivo de vídeo e por ferramentas genéricas desprovidas de suporte emocional.

### Garantia de Execução Técnica e Próximos Passos
Esta documentação serve como **Manual de Referência Oficial e Imutável de Negócio** para as próximas stacks do projeto:
* **Arquitetura & Engenharia:** Devem respeitar os Requisitos Não-Funcionais de latência, segurança e SLA de 99.9%.
* **UX/UI Design:** Devem construir o Design System focado nas Personas e Jornadas mapeadas.
* **Inteligência Artificial:** Deve implementar a Restrição Socrática (RN-004) e a arquitetura RAG balizada na BNCC.
* **QA & Testes:** Devem utilizar as Regras de Negócio (RNs) e Critérios de Aceite em BDD para a criação das suítes de teste automatizadas.

---
*Fim da Documentação Oficial de Estratégia de Produto.*
