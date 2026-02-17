# 📖 GUIA COMPLETO - Sistema de Blog com GitHub Pages# 📖 GUIA COMPLETO - Sistema de Blog com GitHub Pages# 📖 GUIA COMPLETO - Sistema de Blog com GitHub Pages



> **Versão 4.1 - Sistema com 5 versões de teste e publicação automática**



---> **Documentação para replicar este projeto em outros diretórios**> **Documentação para replicar este projeto em outros diretórios**



## 📋 ÍNDICE



1. [Visão Geral do Projeto](#-visão-geral-do-projeto)------

2. [Estrutura de Arquivos](#-estrutura-de-arquivos)

3. [Hierarquia de URLs/Slugs](#-hierarquia-de-urlsslugs)

4. [Página de Formulário (postin.html)](#-página-de-formulário-postinhtml)

5. [Os 8 Blocos do Formulário](#-os-8-blocos-do-formulário)## 📋 ÍNDICE## 📋 ÍNDICE

6. [Botões e Funcionalidades](#-botões-e-funcionalidades)

7. [Integração com GitHub](#-integração-com-github)

8. [Processo de Publicação](#-processo-de-publicação)

9. [Como Replicar o Projeto](#-como-replicar-o-projeto)1. [Visão Geral do Projeto](#-visão-geral-do-projeto)1. [Visão Geral do Projeto](#-visão-geral-do-projeto)

10. [Troubleshooting](#-troubleshooting)

2. [Estrutura de Arquivos](#-estrutura-de-arquivos)2. [Estrutura de Arquivos](#-estrutura-de-arquivos)

---

3. [Hierarquia de URLs/Slugs](#-hierarquia-de-urlsslugs)3. [Hierarquia de URLs/Slugs](#-hierarquia-de-urlsslugs)

## 🎯 VISÃO GERAL DO PROJETO

4. [Página de Formulário (postin.html)](#-página-de-formulário-postinhtml)4. [Página de Formulário (postin.html)](#-página-de-formulário-postinhtml)

Sistema **100% estático** de blog hospedado no **GitHub Pages**, sem necessidade de servidor backend (PHP, Node, etc).

5. [Integração com GitHub](#-integração-com-github)5. [Integração com GitHub](#-integração-com-github)

### Arquitetura

6. [Processo de Publicação](#-processo-de-publicação)6. [Processo de Publicação](#-processo-de-publicação)

```

┌─────────────────────────────────────────────────────────────┐7. [Como Replicar o Projeto](#-como-replicar-o-projeto)7. [Como Replicar o Projeto](#-como-replicar-o-projeto)

│                      NAVEGADOR                              │

├─────────────────────────────────────────────────────────────┤

│  /postin.html  →  Formulário de criação de posts            │

│  /index.html   →  Lista de posts (home do blog)             │------

│  /posts/*.html →  Posts publicados                          │

├─────────────────────────────────────────────────────────────┤

│                    GITHUB PAGES                             │

│              (Hospedagem estática gratuita)                 │## 🎯 VISÃO GERAL DO PROJETO## 🎯 VISÃO GERAL DO PROJETO

└─────────────────────────────────────────────────────────────┘

```



### TecnologiasSistema **100% estático** de blog hospedado no **GitHub Pages**, sem necessidade de servidor backend (PHP, Node, etc).Sistema **100% estático** de blog hospedado no **GitHub Pages**, sem necessidade de servidor backend (PHP, Node, etc).



| Componente | Tecnologia |

|------------|------------|

| Frontend | HTML5, CSS3, JavaScript Vanilla |### Arquitetura### Arquitetura

| Hospedagem | GitHub Pages |

| Armazenamento | GitHub Repository |

| Integração | GitHub API v3 (opcional) |

| SEO | Schema.org, Open Graph, Twitter Cards |``````



---┌─────────────────────────────────────────────────────────────┐┌─────────────────────────────────────────────────────────────┐



## 📁 ESTRUTURA DE ARQUIVOS│                      NAVEGADOR                              ││                      NAVEGADOR                              │



```├─────────────────────────────────────────────────────────────┤├─────────────────────────────────────────────────────────────┤

BLOGS/

├── index.html              # Home do blog│  /postin.html  →  Formulário de criação de posts            ││  /postin.html  →  Formulário de criação de posts            │

├── postin.html             # Formulário de criação

├── github-api.js           # Integração com GitHub API│  /index.html   →  Lista de posts (home do blog)             ││  /index.html   →  Lista de posts (home do blog)             │

├── assets/

│   ├── css/│  /posts/*.html →  Posts publicados                          ││  /posts/*.html →  Posts publicados                          │

│   │   ├── form-style.css      # Estilos do formulário

│   │   └── blog-post.css       # Estilos dos posts├─────────────────────────────────────────────────────────────┤├─────────────────────────────────────────────────────────────┤

│   ├── js/

│   │   ├── form-script.js      # Lógica do formulário + 5 versões teste│                    GITHUB PAGES                             ││                    GITHUB PAGES                             │

│   │   └── blog-post.js        # Funcionalidades dos posts

│   └── images/                 # Imagens estáticas│              (Hospedagem estática gratuita)                 ││              (Hospedagem estática gratuita)                 │

├── posts/

│   ├── index.html              # Lista de posts└─────────────────────────────────────────────────────────────┘└─────────────────────────────────────────────────────────────┘

│   └── *.html                  # Posts publicados

├── drafts/``````

│   └── *.html                  # Posts em rascunho

├── templates/

│   └── post-template.html      # Template base

└── .github/### Tecnologias### Tecnologias

    └── workflows/

        └── auto-publish-drafts.yml   # GitHub Action

```

| Componente | Tecnologia || Componente | Tecnologia |

---

|------------|------------||------------|------------|

## 🔗 HIERARQUIA DE URLs/SLUGS

| Frontend | HTML5, CSS3, JavaScript Vanilla || Frontend | HTML5, CSS3, JavaScript Vanilla |

```

https://seusite.com/| Hospedagem | GitHub Pages || Hospedagem | GitHub Pages |

├── /                           → index.html (Home)

├── /postin.html                → Formulário| Armazenamento | GitHub Repository || Armazenamento | GitHub Repository |

├── /posts/                     → Lista de posts

└── /posts/nome-do-post.html    → Post individual| Integração | GitHub API v3 (opcional) || Integração | GitHub API v3 (opcional) |

```

| SEO | Schema.org, Open Graph, Twitter Cards || SEO | Schema.org, Open Graph, Twitter Cards |

### Convenção de Slugs



| ✅ Correto | ❌ Evitar |

|-----------|----------|------

| `guia-granito-cozinha` | `Guia_Granito_Cozinha` |

| `como-instalar-pedra` | `como instalar pedra` |

| `5-dicas-limpeza` | `5DicasLimpeza` |

## 📁 ESTRUTURA DE ARQUIVOS## 📁 ESTRUTURA DE ARQUIVOS

---



## 📝 PÁGINA DE FORMULÁRIO (postin.html)

``````

O formulário está dividido em **8 blocos principais** + **1 bloco de IA**.

SEU-BLOG-REPO/SEU-BLOG-REPO/

### Fluxo do Formulário

││

```

[Preencher Campos] ├── 📄 index.html              # Home do blog (lista de posts)├── 📄 index.html              # Home do blog (lista de posts)

       ↓

[Pré-visualizar] ─→ [Ajustar se necessário]├── 📄 postin.html             # Formulário de criação (URL secreta)├── 📄 postin.html             # Formulário de criação (URL secreta)

       ↓

[Gerar Post]││

       ↓

  ┌────┴────┐├── 📂 assets/├── 📂 assets/

  │         │

Token?    Sem Token│   ├── 📂 css/│   ├── 📂 css/

  │         │

  ↓         ↓│   │   ├── blog-post.css      # Estilos dos posts publicados│   │   ├── blog-post.css      # Estilos dos posts publicados

GitHub    Download

  API      .html│   │   └── form-style.css     # Estilos do formulário│   │   └── form-style.css     # Estilos do formulário

  │         │

  ↓         ↓│   └── 📂 js/│   └── 📂 js/

Auto     Manual

Publish  Upload│       ├── blog-post.js       # JavaScript dos posts│       ├── blog-post.js       # JavaScript dos posts

```

│       └── form-script.js     # Lógica do formulário (1300+ linhas)│       └── form-script.js     # Lógica do formulário (1300+ linhas)

---

││

## 🧱 OS 8 BLOCOS DO FORMULÁRIO

├── 📂 drafts/                 # ⭐ RASCUNHOS - coloque aqui os .html baixados!├── 📂 drafts/                 # ⭐ RASCUNHOS - coloque aqui os .html baixados!

### 🧱 BLOCO 1: Identidade do Post

│   └── README.md              # Instruções│   └── README.md              # Instruções

| Campo | Obrigatório | Descrição |

|-------|-------------|-----------|││

| Título Principal (H1) | ✅ | Máx. 60 caracteres |

| Slug/URL | Auto | Gerado do título |├── 📂 posts/                  # ✅ PUBLICADOS - movidos automaticamente├── 📂 posts/                  # ✅ PUBLICADOS - movidos automaticamente

| Categoria | ✅ | Guia, Tutorial, Blog, Vlog, Dicas, Novidades |

| Autor | ✅ | Nome do autor |│   ├── index.html             # Listagem alternativa de posts│   ├── index.html             # Listagem alternativa de posts

| Avatar do Autor | ❌ | URL da imagem |

| Data de Publicação | Auto | Usa data atual se vazio |│   └── *.html                 # Posts publicados (vem de /drafts/)│   └── *.html                 # Posts publicados (vem de /drafts/)

| Tempo de Leitura | Auto | Calculado automaticamente |

││

### 🧠 BLOCO 2: SEO Essencial

├── 📂 templates/├── 📂 templates/

| Campo | Obrigatório | Descrição |

|-------|-------------|-----------|│   └── post-template.html     # Template base para novos posts│   └── post-template.html     # Template base para novos posts

| Palavra-chave Principal | ✅ | Base do post inteiro |

| Palavras-chave Secundárias | ❌ | 3-5, separadas por vírgula |││

| Meta Title | ✅ | Até 60 caracteres |

| Meta Description | ✅ | 140-160 caracteres |├── 📄 github-api.js           # Integração com GitHub API├──  github-api.js           # Integração com GitHub API

| Intenção de Busca | ✅ | Informacional/Comercial/Navegacional/Transacional |

├── 📄 github-actions-api.js   # API para GitHub Actions├── 📄 github-actions-api.js   # API para GitHub Actions

### 🖼️ BLOCO 3: Imagens

││

| Campo | Obrigatório | Descrição |

|-------|-------------|-----------|├── 📂 .github/workflows/├── 📂 .github/workflows/

| URL da Imagem de Capa | ✅ | 1200x630px recomendado |

| Alt Text Principal | ✅ | Descritivo com keyword |│   ├── auto-publish-drafts.yml  # ⭐ Move drafts → posts automaticamente│   ├── auto-publish-drafts.yml  # ⭐ Move drafts → posts automaticamente

| Legenda da Imagem | ❌ | Caption opcional |

| Imagens Internas | ✅ | Mínimo 2 (URL + Alt) |│   └── publish-post.yml│   └── publish-post.yml



### ✍️ BLOCO 4: Conteúdo do Post││



| Campo | Obrigatório | Descrição |└── 📄 *.md                    # Documentações└── 📄 *.md                    # Documentações

|-------|-------------|-----------|

| Introdução | ✅ | 100-150 palavras |``````

| Conteúdo Principal | ✅ | HTML formatado (H2, H3, P, UL) |

| Conclusão | ✅ | Resumo + CTA leve |



### 🔗 BLOCO 5: Links### Fluxo de Pastas### Fluxo de Pastas



| Campo | Obrigatório | Descrição |

|-------|-------------|-----------|

| Links Internos | ❌ | 2-4 por post (URL + Anchor) |``````

| Links Externos | ❌ | 1-2 sites confiáveis |

/drafts/  ──(GitHub Action)──▶  /posts/  ──(GitHub Pages)──▶  🌐 Online/drafts/  ──(GitHub Action)──▶  /posts/  ──(GitHub Pages)──▶  🌐 Online

### 🏷️ BLOCO 6: Tags e Organização

``````

| Campo | Obrigatório | Descrição |

|-------|-------------|-----------|

| Tags do Post | ✅ | 3-6, separadas por vírgula |

| Posts Relacionados | ❌ | URLs separados por vírgula |------



### 🚀 BLOCO 7: Engajamento (CTA)



| Campo | Obrigatório | Descrição |## 🔗 HIERARQUIA DE URLs/SLUGS## 🔗 HIERARQUIA DE URLs/SLUGS

|-------|-------------|-----------|

| Título CTA | ✅ | Ex: "Precisa de ajuda?" |

| Texto CTA | ✅ | Descrição do call-to-action |

| Link CTA | ✅ | URL de destino |### Estrutura de URLs### Estrutura de URLs

| Texto Botão | ✅ | Ex: "Solicitar Orçamento" |



### ⚙️ BLOCO 8: Configurações

``````

| Campo | Descrição |

|-------|-----------|seusite.github.io/seusite.github.io/

| URL Base | URL principal do site |

| URL Logo | Para Schema.org |││

| Comentários | Habilitar/Desabilitar |

| Compartilhamento | Botões sociais |├── /                    → index.html (Home do blog)├── /                    → index.html (Home do blog)



---├── /postin              → postin.html (Formulário - URL secreta!)├── /postin              → postin.html (Formulário - URL secreta!)



## 🔘 BOTÕES E FUNCIONALIDADES││



### Header do Formulário└── /posts/└── /posts/



| Botão | Função | Efeito |    ├── /                → posts/index.html (Lista de posts)    ├── /                → posts/index.html (Lista de posts)

|-------|--------|--------|

| 🧪 **Preencher Teste** | Preenche com dados fictícios | **Alterna entre 5 versões** a cada clique |    └── /slug-do-post.html → Post individual    └── /slug-do-post.html → Post individual

| 🗑️ **Limpar Campos** | Limpa formulário + localStorage | Com confirmação |

| ⚙️ **Configurar GitHub** | Abre modal de token | Para publicação direta |``````



### 🧪 Botão "Preencher Teste" - 5 Versões



O botão **alterna entre 5 versões diferentes** de conteúdo a cada clique:### Exemplo Prático### Exemplo Prático



```

1º clique → Versão 1: Marble vs Granite

2º clique → Versão 2: Kitchen Island Ideas| URL | Arquivo | Descrição || URL | Arquivo | Descrição |

3º clique → Versão 3: Quartz vs Granite

4º clique → Versão 4: Bathroom Vanity|-----|---------|-----------||-----|---------|-----------|

5º clique → Versão 5: How to Care for Granite

6º clique → Volta para Versão 1 (ciclo)| `blog.exemplo.com/` | `index.html` | Página inicial || `blog.exemplo.com/` | `index.html` | Página inicial |

```

| `blog.exemplo.com/postin` | `postin.html` | Formulário admin || `blog.exemplo.com/postin` | `postin.html` | Formulário admin |

**⚠️ IMPORTANTE:** Para outros nichos, edite o array `testDataVersions` em `assets/js/form-script.js`.

| `blog.exemplo.com/posts/guia-granito.html` | `posts/guia-granito.html` | Post publicado || `blog.exemplo.com/posts/guia-granito.html` | `posts/guia-granito.html` | Post publicado |

### Rodapé do Formulário



| Botão | Função | Efeito |

|-------|--------|--------|### Geração de Slug### Geração de Slug

| 👁️ **Pré-visualizar** | Abre modal de preview | Mostra como ficará |

| ✨ **Gerar Post** | Gera HTML e publica/download | Salva arquivo |



### Funcionalidades AutomáticasO slug é gerado automaticamente a partir do título:O slug é gerado automaticamente a partir do título:



| Funcionalidade | Descrição |

|----------------|-----------|

| 💾 **Auto-Save** | Salva no localStorage a cada 2s |```javascript```javascript

| 📊 **Contador de Caracteres** | Mostra limite em tempo real |

| 📝 **Contador de Palavras** | Para introdução/conteúdo/conclusão |// Entrada: "Como Instalar Granito na Cozinha em 5 Passos"// Entrada: "Como Instalar Granito na Cozinha em 5 Passos"

| 🔄 **Geração de Slug** | Automática ao digitar título |

| ⏱️ **Tempo de Leitura** | Calculado automaticamente |// Saída:   "instalar-granito-cozinha-5-passos"// Saída:   "instalar-granito-cozinha-5-passos"

| 🔗 **Conversão Google Drive** | URLs do Drive convertidas automaticamente |



---

// Regras aplicadas:// Regras aplicadas:

## 🔌 INTEGRAÇÃO COM GITHUB

// 1. Converte para minúsculas// 1. Converte para minúsculas

### Opção 1: Download Manual

// 2. Remove acentos// 2. Remove acentos

```

1. Preencher formulário// 3. Remove stopwords (o, a, de, da, em, etc.)// 3. Remove stopwords (o, a, de, da, em, etc.)

2. Clicar "Gerar Post"

3. Baixar arquivo .html// 4. Substitui espaços por hífens// 4. Substitui espaços por hífens

4. Mover para pasta /posts/

5. git add . && git commit -m "novo post" && git push// 5. Remove caracteres especiais// 5. Remove caracteres especiais

```

``````

### Opção 2: GitHub API (Automático) ⭐



```javascript

// Configuração inicial (uma vez)------

1. Criar token em: github.com/settings/tokens

2. Permissão: "repo" (full control)

3. Colar no modal "Configurar GitHub"

## 📝 PÁGINA DE FORMULÁRIO (postin.html)## 📝 PÁGINA DE FORMULÁRIO (postin.html)

// Uso

- O post é enviado diretamente para o repositório

- GitHub Pages publica automaticamente

```### Visão Geral### Visão Geral



### Arquivo github-api.js



```javascriptO formulário está dividido em **9 blocos organizados**:O formulário está dividido em **8 blocos organizados**:

class GitHubBlogPublisher {

    constructor(config) {

        this.owner = 'usuario';      // Dono do repo

        this.repo = 'nome-repo';     // Nome do repo### 🧱 BLOCO 1: Identidade do Post### 🧱 BLOCO 1: Identidade do Post

        this.token = 'ghp_xxx';      // Token de acesso

        this.branch = 'main';        // Branch principal

    }

| Campo | Obrigatório | Descrição || Campo | Obrigatório | Descrição |

    // Métodos principais:

    async savePost(slug, htmlContent)  // Salva/atualiza post|-------|-------------|-----------||-------|-------------|-----------|

    async getFile(path)                // Verifica se existe

    async createFile(path, content)    // Cria novo arquivo| Título (H1) | ✅ | Máx. 60 caracteres || Título (H1) | ✅ | Máx. 60 caracteres |

    async updateFile(path, content)    // Atualiza existente

}| Slug | Auto | Gerado do título, editável || Slug | Auto | Gerado do título, editável |

```

| Categoria | ✅ | Guia, Tutorial, Blog, Dicas, etc. || Categoria | ✅ | Guia, Tutorial, Blog, Dicas, etc. |

---

| Autor | ✅ | Nome do autor || Autor | ✅ | Nome do autor |

## 📤 PROCESSO DE PUBLICAÇÃO

| Avatar | ❌ | URL da foto do autor || Avatar | ❌ | URL da foto do autor |

### Fluxo com GitHub Token (Automático)

| Data | Auto | Data de publicação || Data | Auto | Data de publicação |

```

┌──────────────┐     ┌─────────────┐     ┌──────────────┐| Tempo de Leitura | Auto | Calculado automaticamente || Tempo de Leitura | Auto | Calculado automaticamente |

│   Formulário │ ──→ │ GitHub API  │ ──→ │ GitHub Pages │

│   postin.html│     │ (Direto)    │     │   (Live)     │

└──────────────┘     └─────────────┘     └──────────────┘

       ↓                    ↓                   ↓### 🧠 BLOCO 2: SEO Essencial### 🧠 BLOCO 2: SEO Essencial

   Preencher           POST /posts/       Publicado em

   campos              slug.html          ~30 segundos

```

| Campo | Obrigatório | Descrição || Campo | Obrigatório | Descrição |

### Fluxo Manual (Download)

|-------|-------------|-----------||-------|-------------|-----------|

```

┌──────────────┐     ┌─────────────┐     ┌──────────────┐| Keyword Principal | ✅ | Palavra-chave foco || Keyword Principal | ✅ | Palavra-chave foco |

│   Formulário │ ──→ │  Download   │ ──→ │  git push    │

│   postin.html│     │   .html     │     │              │| Keywords Secundárias | ❌ | 3-5, separadas por vírgula || Keywords Secundárias | ❌ | 3-5, separadas por vírgula |

└──────────────┘     └─────────────┘     └──────────────┘

       ↓                    ↓                   ↓| Meta Title | ✅ | Até 60 caracteres || Meta Title | ✅ | Até 60 caracteres |

   Preencher          Salvar em            Publicado

   campos             /posts/| Meta Description | ✅ | 140-160 caracteres || Meta Description | ✅ | 140-160 caracteres |

```

| Intenção de Busca | ✅ | Informacional, Comercial, etc. || Intenção de Busca | ✅ | Informacional, Comercial, etc. |

---



## 🔄 COMO REPLICAR O PROJETO

### 🖼️ BLOCO 3: Imagens### 🖼️ BLOCO 3: Imagens

### Checklist de Replicação



```

☐ 1. Clonar repositório| Campo | Obrigatório | Descrição || Campo | Obrigatório | Descrição |

☐ 2. Atualizar github-api.js (owner, repo)

☐ 3. Atualizar postin.html (URLs, logos)|-------|-------------|-----------||-------|-------------|-----------|

☐ 4. Personalizar testDataVersions para o nicho

☐ 5. Atualizar templates/post-template.html| Imagem de Capa | ✅ | URL da imagem principal (1200x630) || Imagem de Capa | ✅ | URL da imagem principal (1200x630) |

☐ 6. Configurar GitHub Pages no repositório

☐ 7. Habilitar GitHub Actions (Settings > Actions)| Alt Text Capa | ✅ | Texto alternativo com keyword || Alt Text Capa | ✅ | Texto alternativo com keyword |

☐ 8. Testar publicação com as 5 versões de teste

```| Legenda | ❌ | Legenda opcional || Legenda | ❌ | Legenda opcional |



### Passo 1: Clonar Repositório| Imagens Internas | ❌ | Botão para adicionar múltiplas || Imagens Internas | ❌ | Botão para adicionar múltiplas |



```bash

git clone https://github.com/SEU-USUARIO/SEU-REPO.git

cd SEU-REPO### ✍️ BLOCO 4: Conteúdo### ✍️ BLOCO 4: Conteúdo

```



### Passo 2: Atualizar github-api.js

| Campo | Obrigatório | Descrição || Campo | Obrigatório | Descrição |

```javascript

// Linha 5-10|-------|-------------|-----------||-------|-------------|-----------|

this.owner = 'seu-usuario';

this.repo = 'seu-repositorio';| Introdução | ✅ | 100-150 palavras || Introdução | ✅ | 100-150 palavras |

this.branch = 'main';

```| Conteúdo Principal | ✅ | Aceita HTML (h2, h3, p, ul, ol) || Conteúdo Principal | ✅ | Aceita HTML (h2, h3, p, ul, ol) |



### Passo 3: Personalizar 5 Versões de Teste| Conclusão | ✅ | Resumo final do post || Conclusão | ✅ | Resumo + CTA |



Edite `assets/js/form-script.js`:



```javascript**Toolbar de Edição:****Toolbar de Edição:**

const testDataVersions = [

    {- Botões: `H2` | `H3` | `Parágrafo` | `Lista` | `Negrito` | `Itálico`- Botões: `H2` | `H3` | `Parágrafo` | `Lista` | `Negrito` | `Itálico`

        h1Title: 'Título do Post 1 para SEU NICHO',

        slug: 'slug-do-post-1',

        category: 'Guia',

        // ... demais campos### 🔗 BLOCO 5: Links### 🔗 BLOCO 5: Links

    },

    // ... mais 4 versões

];

```| Campo | Descrição || Campo | Descrição |



### Passo 4: Habilitar GitHub Actions|-------|-----------||-------|-----------|



```| Links Internos | 2-4 por post (URL + Anchor) || Links Internos | 2-4 por post (URL + Anchor) |

1. Vá em Settings → Actions → General

2. Em "Workflow permissions": | Links Externos | 1-2 sites confiáveis || Links Externos | 1-2 sites confiáveis |

   ✅ Read and write permissions

3. Salvar

```

### 🏷️ BLOCO 6: Tags### 🏷️ BLOCO 6: Tags

---



## 🔧 TROUBLESHOOTING

| Campo | Obrigatório | Descrição || Campo | Obrigatório | Descrição |

### Erro: "Post não publicou"

|-------|-------------|-----------||-------|-------------|-----------|

1. Verifique se o token tem permissão `repo`

2. Verifique se o repositório está correto em `github-api.js`| Tags | ✅ | 3-6, separadas por vírgula || Tags | ✅ | 3-6, separadas por vírgula |

3. Teste a conexão no modal "Configurar GitHub"

| Posts Relacionados | ❌ | URLs separadas por vírgula || Posts Relacionados | ❌ | URLs separadas por vírgula |

### Erro: "GitHub Actions não executa"



1. Vá em Settings → Actions → General

2. Marque "Allow all actions and reusable workflows"### 🚀 BLOCO 7: Engajamento (CTA)### 🚀 BLOCO 7: Engajamento (CTA)

3. Em Workflow permissions, marque "Read and write permissions"



### Erro: "Categoria não selecionada"

| Campo | Obrigatório | Descrição || Campo | Obrigatório | Descrição |

O teste usa categorias do dropdown HTML:

- Guia, Tutorial, Blog, Vlog, Dicas, Novidades|-------|-------------|-----------||-------|-------------|-----------|



Não use categorias personalizadas como "Granite Countertops".| Título CTA | ✅ | Ex: "Precisa de ajuda?" || Título CTA | ✅ | Ex: "Precisa de ajuda?" |



### Erro: "Imagens não carregam"| Texto CTA | ✅ | Descrição do call-to-action || Texto CTA | ✅ | Descrição do call-to-action |



- Use URLs públicas (https://)| Link CTA | ✅ | URL de destino || Link CTA | ✅ | URL de destino |

- Para Google Drive, use o formato de visualização direta

- Unsplash recomendado para testes| Texto Botão | ✅ | Ex: "Solicitar Orçamento" || Texto Botão | ✅ | Ex: "Solicitar Orçamento" |



---



## 📊 VERSÕES DO SISTEMA### ⚙️ BLOCO 8: Configurações### ⚙️ BLOCO 8: Configurações



| Versão | Data | Mudanças |

|--------|------|----------|

| 4.1 | 2026-01 | 5 versões de teste, publicação automática || Campo | Descrição || Campo | Descrição |

| 4.0 | 2026-01 | Removido PHP, GitHub Pages only |

| 3.0 | 2025-12 | Auto-save, GitHub API ||-------|-----------||-------|-----------|

| 2.0 | 2025-11 | Template IA, 8 blocos |

| 1.0 | 2025-10 | Versão inicial || URL Base | URL principal do site || URL Base | URL principal do site |



---| URL Logo | Para Schema.org || URL Logo | Para Schema.org |



## 📞 SUPORTE| Comentários | Habilitar/Desabilitar || Comentários | Habilitar/Desabilitar |



- **Repositório:** github.com/SEU-USUARIO-GITHUB/SEU-BLOG-REPO| Compartilhamento | Botões sociais || Compartilhamento | Botões sociais |

- **Documentação:** Este arquivo

- **Issues:** Via GitHub Issues



---### 🤖 BLOCO 9: Template para IA (Copiar e Colar)---



*Última atualização: Janeiro 2026*


O formulário inclui um **template completo para usar com ChatGPT/Claude** que gera todo o conteúdo do post automaticamente.## 🔘 BOTÕES E FUNCIONALIDADES



**Como usar:**### Header do Formulário

1. Role até o **BLOCO 9: 🤖 Assistente IA**

2. Preencha os campos `[ENTRE COLCHETES]` no template| Botão | Função | Efeito |

3. Clique em **"📋 Copiar Template Completo"**|-------|--------|--------|

4. Cole no ChatGPT, Claude ou outra IA| 🧪 **Preencher Teste** | Preenche com dados fictícios | Para testar rapidamente |

5. A IA retorna todos os campos preenchidos| 🗑️ **Limpar Campos** | Limpa formulário + localStorage | Com confirmação |

6. Copie os valores e cole no formulário| ⚙️ **Configurar GitHub** | Abre modal de token | Para publicação direta |



**Geração de Imagens com IA:**### Rodapé do Formulário



O template inclui instruções automáticas para gerar prompts de imagens:| Botão | Função | Efeito |

|-------|--------|--------|

```| 👁️ **Pré-visualizar** | Abre modal de preview | Mostra como ficará |

🖼️ BLOCO 3: IMAGENS| ✨ **Gerar Post** | Gera HTML e oferece download | Salva arquivo |



URL da Imagem de Capa:### Funcionalidades Automáticas

[GERAR PROMPT para imagem de capa 1200x630px relacionada ao tema]

| Funcionalidade | Descrição |

URL da Imagem Interna 1:|----------------|-----------|

[GERAR PROMPT para imagem interna 800x600px relacionada ao tema]| 💾 **Auto-Save** | Salva no localStorage a cada 2s |

| 📊 **Contador de Caracteres** | Mostra limite em tempo real |

URL da Imagem Interna 2:| 📝 **Contador de Palavras** | Para introdução/conteúdo/conclusão |

[GERAR PROMPT para imagem interna 800x600px relacionada ao tema]| 🔄 **Geração de Slug** | Automática ao digitar título |

| ⏱️ **Tempo de Leitura** | Calculado automaticamente |

URL da Imagem Interna 3:| 🔗 **Conversão Google Drive** | URLs do Drive convertidas automaticamente |

[GERAR PROMPT para imagem interna 800x600px relacionada ao tema]

```---



**Workflow:**## 🔌 INTEGRAÇÃO COM GITHUB

1. A IA lê o tema do post

2. Gera **4 prompts otimizados** para DALL-E/Midjourney### Opção 1: Download Manual (Recomendado)

3. Você copia cada prompt e gera a imagem

4. Cola a URL da imagem no formulário```

1. Preencher formulário

---2. Clicar "Gerar Post"

3. Baixar arquivo .html

## 🔘 BOTÕES E FUNCIONALIDADES4. Mover para pasta /posts/

5. git add . && git commit -m "novo post" && git push

### Header do Formulário```



| Botão | Função | Efeito |### Opção 2: GitHub API (Automático)

|-------|--------|--------|

| 🧪 **Preencher Teste** | Preenche TODOS os campos com 5 versões diferentes | Alterna entre 5 posts pré-prontos a cada clique |```javascript

| 🗑️ **Limpar Campos** | Limpa formulário + localStorage | Com confirmação |// Configuração inicial (uma vez)

| ⚙️ **Configurar GitHub** | Abre modal de token | Para publicação automática |1. Criar token em: github.com/settings/tokens

2. Permissão: "repo" (full control)

### 🧪 Botão "Preencher Teste" - 5 Versões de Conteúdo3. Colar no modal "Configurar GitHub"



O botão **alterna entre 5 versões diferentes** de conteúdo de teste a cada clique. Isso permite testar rapidamente múltiplos posts sem precisar preencher manualmente.// Uso

- O post é enviado diretamente para o repositório

#### Como Funciona- GitHub Pages publica automaticamente

```

```

1º clique → Versão 1### Arquivo github-api.js

2º clique → Versão 2

3º clique → Versão 3```javascript

4º clique → Versão 4class GitHubBlogPublisher {

5º clique → Versão 5    constructor(config) {

6º clique → Volta para Versão 1 (ciclo)        this.owner = 'usuario';      // Dono do repo

```        this.repo = 'nome-repo';     // Nome do repo

        this.token = 'ghp_xxx';      // Token de acesso

#### ⚠️ IMPORTANTE: Personalizar para seu Nicho        this.branch = 'main';        // Branch principal

    }

**As 5 versões de teste devem ser personalizadas para o nicho do seu cliente.** Ao usar este projeto, edite o array `testDataVersions` no arquivo `assets/js/form-script.js`:

    // Métodos principais:

```javascript    async savePost(slug, htmlContent)  // Salva/atualiza post

// Localização: assets/js/form-script.js (linha ~150)    async getFile(path)                // Verifica se existe

const testDataVersions = [    async createFile(path, content)    // Cria novo arquivo

    {    async updateFile(path, content)    // Atualiza existente

        h1Title: 'Título do Post 1 para SEU NICHO',}

        slug: 'slug-do-post-1',```

        category: 'Categoria',

        // ... demais campos### GitHub Actions (Workflows)

    },

    {**auto-publish-drafts.yml** ⭐ (Principal):

        h1Title: 'Título do Post 2 para SEU NICHO',- Dispara quando há push em `drafts/*.html`

        // ... - Move automaticamente para `/posts/`

    },- Faz commit e push automático

    // ... até 5 versões- Resultado: post publicado no GitHub Pages

];

```**publish-post.yml:**

- Workflow alternativo para publicar posts via Actions

#### Estrutura das 5 Versões de Teste

---

| # | O que incluir | Exemplo para Granito |

|---|---------------|----------------------|## 📤 PROCESSO DE PUBLICAÇÃO

| 1 | Post introdutório/dicas | "5 Dicas para Escolher Granito Premium" |

| 2 | Post sobre produto/serviço principal | "Granito vs Mármore: Guia Completo" |### Fluxo Completo (Atual)

| 3 | Post sobre datas especiais/ocasiões | "Como Renovar sua Cozinha para o Verão" |

| 4 | Post sobre diferencial/qualidade | "Por que Escolher SUA EMPRESA" |```

| 5 | Post comparativo/benefícios | "Bancadas de Granito: Vale o Investimento?" |┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐

│  1. PREENCHER   │ ──▶ │  2. GERAR HTML  │ ──▶ │  3. DOWNLOAD    │

#### Campos Preenchidos em Cada Versão│   Formulário    │     │   Click botão   │     │   Arquivo .html │

└─────────────────┘     └─────────────────┘     └─────────────────┘

**BLOCO 1 - Identidade:**                                                        │

- Título H1, Slug, Categoria, Autor, Data, Avatar, Tempo de leitura                                                        ▼

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐

**BLOCO 2 - SEO:**│  6. PUBLICADO!  │ ◀── │  5. GITHUB      │ ◀── │  4. MOVER PARA  │

- Palavra-chave principal e secundárias, Meta Title, Meta Description, Intenção de busca│   GitHub Pages  │     │     ACTION      │     │  pasta /drafts/ │

│   em /posts/    │     │   (automático)  │     │   + git push    │

**BLOCO 3 - Imagens:**└─────────────────┘     └─────────────────┘     └─────────────────┘

- Imagem de capa + Alt text + 2 imagens internas com alt texts```



**BLOCO 4 - Conteúdo:**### Como Funciona

- Introdução, Conteúdo principal (com H2, H3, listas), Conclusão

1. **Você baixa o HTML** gerado pelo formulário

**BLOCO 5 - Links:**2. **Move para `/drafts/`** (não para /posts/ diretamente)

- 2 links internos + 1 link externo com anchor texts3. **Faz commit e push** para o GitHub

4. **GitHub Action detecta** o novo arquivo em `/drafts/`

**BLOCO 6 - Tags:**5. **Automaticamente move** de `/drafts/` para `/posts/`

- Tags do post + Posts relacionados6. **GitHub Pages publica** o post



**BLOCO 7 - CTA:**### Comandos Git

- Título, Descrição, Link, Texto do Botão

```bash

**BLOCO 8 - Configurações:**# 1. Mover arquivo baixado para drafts

- URL base, Logo, Checkboxes habilitadosmv ~/Downloads/nome-do-post.html drafts/



### Rodapé do Formulário# 2. Commit e push

git add drafts/

| Botão | Função | Efeito |git commit -m "draft: novo post - Nome do Post"

|-------|--------|--------|git push origin main

| 👁️ **Pré-visualizar** | Abre modal de preview | Mostra como ficará |

| ✨ **Gerar Post** | Gera HTML e publica | Ver seção "Publicação Automática" |# 3. PRONTO! O GitHub Action faz o resto automaticamente

#    - Move de /drafts/ para /posts/

### Funcionalidades Automáticas#    - Faz commit automático

#    - GitHub Pages publica

| Funcionalidade | Descrição |```

|----------------|-----------|

| 💾 **Auto-Save** | Salva no localStorage a cada 2s |### GitHub Action: auto-publish-drafts.yml

| 📊 **Contador de Caracteres** | Mostra limite em tempo real |

| 📝 **Contador de Palavras** | Para introdução/conteúdo/conclusão |```yaml

| 🔄 **Geração de Slug** | Automática ao digitar título |# Dispara quando há push em drafts/*.html

| ⏱️ **Tempo de Leitura** | Calculado automaticamente |on:

| 🔗 **Conversão Google Drive** | URLs do Drive convertidas automaticamente |  push:

    paths:

---      - 'drafts/*.html'



## 🔌 INTEGRAÇÃO COM GITHUB# O que faz:

# 1. Move todos os .html de /drafts/ para /posts/

### 🚀 Publicação Automática (COM Token)# 2. Faz commit automático

# 3. Push para o repositório

Quando você configura o GitHub API Token, os posts são **publicados automaticamente** no GitHub ao clicar em "✨ Gerar Post":```



```### Vantagens deste Fluxo

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐

│  1. PREENCHER   │ ──▶ │  2. GERAR POST  │ ──▶ │  3. PUBLICADO!  │| Benefício | Descrição |

│   Formulário    │     │   Click botão   │     │   Automático!   │|-----------|-----------|

└─────────────────┘     └─────────────────┘     └─────────────────┘| 📝 **Revisão** | Você pode revisar em `/drafts/` antes de publicar |

```| 🤖 **Automático** | Não precisa mover manualmente para `/posts/` |

| 📊 **Histórico** | Git mostra quando foi draft e quando foi publicado |

**Como configurar (uma única vez):**| 🔄 **Simples** | Apenas um push e o resto é automático |



1. Clique em **"⚙️ Configurar GitHub"** no formulário---

2. Acesse: `github.com/settings/tokens`

3. Clique em **"Generate new token" → "Generate new token (classic)"**## 🔄 COMO REPLICAR O PROJETO

4. Nome: `SEU-BLOG-REPO` (use o nome do seu blog)

5. Marque a permissão: **✅ repo** (full control)### Passo 1: Clonar/Copiar Estrutura

6. Clique em **"Generate token"**

7. Copie o token (você só verá uma vez!)```bash

8. Cole no campo do modal e clique em **"💾 Salvar Token"**# Opção A: Clonar repo existente

9. (Opcional) Clique em **"🧪 Testar Conexão"** para validargit clone https://github.com/SEU-USER/SEU-BLOG-REPO.git novo-blog

cd novo-blog

**Depois de configurar:**

- Preencha o formulário normalmente# Opção B: Copiar pasta local

- Clique em **"✨ Gerar Post"**cp -r /caminho/SEU-BLOG-REPO /caminho/novo-blog

- **O post é enviado automaticamente para `/posts/`**cd novo-blog

- GitHub Pages publica em 1-2 minutosrm -rf .git  # Remove histórico antigo

- Você recebe a URL pública do postgit init     # Inicia novo repo

```

### 📥 Download Manual (SEM Token)

### Passo 2: Configurar Novo Repositório

Se você não configurar o token, o sistema continua funcionando com download manual:

```bash

```# Criar repo no GitHub (via interface ou CLI)

1. Preencher formuláriogh repo create nome-novo-blog --public

2. Clicar "Gerar Post"

3. Baixar arquivo .html# Vincular

4. Mover para pasta /drafts/git remote add origin https://github.com/SEU-USER/nome-novo-blog.git

5. git add . && git commit -m "novo post" && git push```

6. GitHub Action move automaticamente para /posts/

```### Passo 3: Personalizar Configurações



### Comportamento InteligenteEditar os seguintes arquivos:



| Cenário | Comportamento |**1. `github-api.js`** (linhas 140-150):

|---------|---------------|```javascript

| ✅ Token configurado | Publica automaticamente no GitHub |return new GitHubBlogPublisher({

| ❌ Sem token | Oferece download manual |    owner: 'SEU-USUARIO',      // ← Alterar

| ⚠️ Erro na publicação | Mostra erro + fallback para download |    repo: 'NOME-DO-REPO',      // ← Alterar

    token: token,

### Arquivo github-api.js    branch: 'main'

});

```javascript```

class GitHubBlogPublisher {

    constructor(config) {**2. `index.html`** - Títulos e descrições

        this.owner = 'SEU-USUARIO-GITHUB';  // ⚠️ Alterar para seu usuário

        this.repo = 'SEU-BLOG-REPO';            // ⚠️ Alterar para seu repo**3. `templates/post-template.html`** - URLs e branding

        this.token = token;                    // Token de acesso

        this.branch = 'main';                  // Branch principal**4. `assets/css/*.css`** - Cores e estilos

    }

### Passo 4: Ativar GitHub Pages

    // Métodos principais:

    async savePost(slug, htmlContent)  // Salva/atualiza post1. Vá em: `Settings` → `Pages`

    async getFile(path)                // Verifica se existe2. Source: `Deploy from a branch`

    async createFile(path, content)    // Cria novo arquivo3. Branch: `main` / `/ (root)`

    async updateFile(path, content)    // Atualiza existente4. Save

    

    // ⚠️ IMPORTANTE: Alterar também getPublicUrl()### Passo 5: ⚠️ Ativar GitHub Actions (IMPORTANTE!)

    getPublicUrl(slug) {

        return `https://blog.SEU-DOMINIO.com/posts/${slug}.html`;Para a automação `/drafts/` → `/posts/` funcionar, você precisa:

    }

}**5.1. Habilitar Actions no Repositório:**

```1. Vá em: `Settings` → `Actions` → `General`

2. Em **"Actions permissions"**, selecione:

### GitHub Actions (Workflows)   - ✅ `Allow all actions and reusable workflows`

3. Clique em `Save`

**auto-publish-drafts.yml** ⭐ (Principal):

- Dispara quando há push em `drafts/*.html`**5.2. Dar Permissão de Escrita ao Workflow:**

- Move automaticamente para `/posts/`1. Na mesma página, role até **"Workflow permissions"**

- Faz commit e push automático2. Selecione:

- Resultado: post publicado no GitHub Pages   - ✅ `Read and write permissions`

3. Marque também:

**publish-post.yml:**   - ✅ `Allow GitHub Actions to create and approve pull requests` (opcional)

- Workflow alternativo para publicar posts via Actions4. Clique em `Save`



---```

⚠️ SEM ESSAS CONFIGURAÇÕES, O WORKFLOW NÃO CONSEGUE:

## 📤 PROCESSO DE PUBLICAÇÃO   - Fazer commit automático

   - Mover arquivos de /drafts/ para /posts/

### Fluxo COM Token GitHub (Automático) ⭐ RECOMENDADO   - Push das alterações

```

```

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐**Caminho visual:**

│  1. PREENCHER   │ ──▶ │  2. GERAR POST  │ ──▶ │  3. PUBLICADO!  │```

│   Formulário    │     │   Click botão   │     │   Em /posts/    │GitHub Repo → Settings → Actions → General

│   (ou IA)       │     │                 │     │   Automático!   │                           ↓

└─────────────────┘     └─────────────────┘     └─────────────────┘              ┌─────────────────────────────┐

                                                        │              │ Actions permissions         │

                                                        ▼              │ ✅ Allow all actions        │

                                          ┌─────────────────────────┐              ├─────────────────────────────┤

                                          │  URL Pública Pronta:    │              │ Workflow permissions        │

                                          │  github.io/.../posts/   │              │ ✅ Read and write           │

                                          │  slug-do-post.html      │              └─────────────────────────────┘

                                          └─────────────────────────┘```

```

### Passo 6: Primeiro Commit

**Passo a passo:**

1. Configure o token uma vez (⚙️ Configurar GitHub)```bash

2. Preencha o formulário (ou use 🧪 Preencher Teste)git add .

3. Clique em **✨ Gerar Post**git commit -m "feat: setup inicial do blog"

4. **PRONTO!** O post é publicado automaticamentegit push -u origin main

5. Aguarde 1-2 minutos para o GitHub Pages atualizar```



### Fluxo SEM Token (Download Manual)---



```## 📋 CHECKLIST PARA NOVO PROJETO

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐

│  1. PREENCHER   │ ──▶ │  2. GERAR HTML  │ ──▶ │  3. DOWNLOAD    │```

│   Formulário    │     │   Click botão   │     │   Arquivo .html │☐ Clonar/copiar estrutura de arquivos

└─────────────────┘     └─────────────────┘     └─────────────────┘☐ Criar repositório no GitHub

                                                        │☐ Vincular remote origin

                                                        ▼☐ Editar github-api.js (owner, repo)

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐☐ Editar index.html (título, descrição)

│  6. PUBLICADO!  │ ◀── │  5. GITHUB      │ ◀── │  4. MOVER PARA  │☐ Editar templates/post-template.html (URLs)

│   GitHub Pages  │     │     ACTION      │     │  pasta /drafts/ │☐ Personalizar CSS (cores, fontes)

│   em /posts/    │     │   (automático)  │     │   + git push    │☐ Ativar GitHub Pages (Settings → Pages)

└─────────────────┘     └─────────────────┘     └─────────────────┘☐ ⚠️ Ativar GitHub Actions (Settings → Actions → General)

```☐ ⚠️ Workflow permissions: "Read and write" (OBRIGATÓRIO!)

☐ Fazer primeiro commit e push

### Como Funciona☐ Testar criação de post via /postin

☐ Testar fluxo: baixar HTML → mover para /drafts/ → push

1. **Você baixa o HTML** gerado pelo formulário☐ Verificar se Action moveu para /posts/ (aba Actions no GitHub)

2. **Move para `/drafts/`** (não para /posts/ diretamente)☐ Verificar publicação no GitHub Pages

3. **Faz commit e push** para o GitHub```

4. **GitHub Action detecta** o novo arquivo em `/drafts/`

5. **Automaticamente move** de `/drafts/` para `/posts/`---

6. **GitHub Pages publica** o post

## 🚀 RESUMO RÁPIDO (TL;DR)

### Comandos Git

```bash

```bash# 1. Criar post no formulário

# 1. Mover arquivo baixado para draftsabrir: seusite.github.io/postin

mv ~/Downloads/nome-do-post.html drafts/

# 2. Baixar HTML gerado

# 2. Commit e pushclicar: "Gerar Post" → Download

git add drafts/

git commit -m "draft: novo post - Nome do Post"# 3. Mover para drafts e publicar

git push origin mainmv ~/Downloads/meu-post.html drafts/

git add drafts/

# 3. PRONTO! O GitHub Action faz o resto automaticamentegit commit -m "draft: meu novo post"

#    - Move de /drafts/ para /posts/git push

#    - Faz commit automático

#    - GitHub Pages publica# 4. PRONTO! GitHub Action faz o resto

```# - Move de /drafts/ para /posts/

# - Publica automaticamente

### GitHub Action: auto-publish-drafts.yml```



```yaml---

# Dispara quando há push em drafts/*.html

on:## 📚 ARQUIVOS DE DOCUMENTAÇÃO

  push:

    paths:| Arquivo | Descrição |

      - 'drafts/*.html'|---------|-----------|

| `README.md` | Documentação geral |

# O que faz:| `QUICK-START.md` | Guia rápido de uso |

# 1. Move todos os .html de /drafts/ para /posts/| `AUTO-SAVE-GUIDE.md` | Sistema de auto-save |

# 2. Faz commit automático| `GOOGLE-DRIVE-IMAGES-GUIDE.md` | Usar imagens do Drive |

# 3. Push para o repositório| `IMAGE-LAYOUTS-GUIDE.md` | Layouts de imagens |

```| `SECURITY.md` | Práticas de segurança |

| `CHANGELOG.md` | Histórico de mudanças |

### Vantagens deste Fluxo

---

| Benefício | Descrição |

|-----------|-----------|## 🔒 SEGURANÇA

| 📝 **Revisão** | Você pode revisar em `/drafts/` antes de publicar |

| 🤖 **Automático** | Não precisa mover manualmente para `/posts/` |- URL `/postin` é "secreta" (não indexada)

| 📊 **Histórico** | Git mostra quando foi draft e quando foi publicado |- Token GitHub fica apenas no localStorage do navegador

| 🔄 **Simples** | Apenas um push e o resto é automático |- Sem backend = menos vulnerabilidades

- CORS não é problema (tudo estático)

---

---

## 🔄 COMO REPLICAR O PROJETO

## ✅ VANTAGENS DESTE SISTEMA

### Passo 1: Clonar/Copiar Estrutura

| Vantagem | Descrição |

```bash|----------|-----------|

# Opção A: Clonar repo existente| 💰 **Gratuito** | GitHub Pages é free |

git clone https://github.com/SEU-USER/SEU-BLOG-REPO.git novo-blog| 🚀 **Rápido** | Sites estáticos são ultra-rápidos |

cd novo-blog| 🔒 **Seguro** | Sem servidor = menos ataques |

| 📱 **Responsivo** | CSS mobile-first |

# Opção B: Copiar pasta local| 🎯 **SEO Otimizado** | Schema.org, OG, meta tags |

cp -r /caminho/SEU-BLOG-REPO /caminho/novo-blog| 💾 **Versionado** | Git mantém histórico |

cd novo-blog| 🌍 **CDN Global** | GitHub distribui mundialmente |

rm -rf .git  # Remove histórico antigo

git init     # Inicia novo repo---

```

**Última atualização:** Janeiro 2026  

### Passo 2: Configurar Novo Repositório**Versão:** 2.0 (GitHub Pages Only)


```bash
# Criar repo no GitHub (via interface ou CLI)
gh repo create nome-novo-blog --public

# Vincular
git remote add origin https://github.com/SEU-USER/nome-novo-blog.git
```

### Passo 3: Personalizar Configurações

Editar os seguintes arquivos:

**1. `github-api.js`** (linhas 140-150):
```javascript
return new GitHubBlogPublisher({
    owner: 'SEU-USUARIO',      // ← Alterar
    repo: 'NOME-DO-REPO',      // ← Alterar
    token: token,
    branch: 'main'
});
```

**2. `index.html`** - Títulos e descrições

**3. `templates/post-template.html`** - URLs e branding

**4. `assets/css/*.css`** - Cores e estilos

### ⚠️ Passo 3.1: CONFIGURAÇÕES CRÍTICAS - NÃO ESQUECER!

> **IMPORTANTE:** Sempre que replicar este projeto para um novo cliente, você DEVE alterar as seguintes configurações para evitar que posts sejam publicados no repositório/domínio errado!

#### 📁 Arquivo: `github-api.js`

| Linha | O que alterar | Exemplo |
|-------|---------------|---------|
| ~8 | `this.repo` (comentário) | `// NOME-DO-SEU-REPO` |
| ~130 | `getPublicUrl()` - URL completa | `https://blogs.seudominio.com.br/posts/${slug}.html` |
| ~148 | `repo:` na configuração | `'NOME-DO-SEU-REPO'` |

```javascript
// ANTES (errado - aponta para projeto anterior):
getPublicUrl(slug) {
    return `https://usuario.github.io/repo-antigo/posts/${slug}.html`;
}

// DEPOIS (correto - aponta para seu novo projeto):
getPublicUrl(slug) {
    return `https://blogs.seudominio.com.br/posts/${slug}.html`;
}
```

```javascript
// ANTES (errado):
return new GitHubBlogPublisher({
    owner: 'seu-usuario',
    repo: 'repo-antigo',  // ❌ Repositório antigo!
    ...
});

// DEPOIS (correto):
return new GitHubBlogPublisher({
    owner: 'seu-usuario',
    repo: 'NOME-DO-SEU-NOVO-REPO',  // ✅ Seu novo repositório!
    ...
});
```

#### 📁 Arquivo: `CNAME`

```plaintext
# Alterar para o subdomínio do novo cliente:
blogs.novodominio.com.br
```

#### 📁 Arquivo: `index.html`

- Alterar URL da API do GitHub para buscar posts:
```javascript
// Linha ~225 (aproximadamente)
const response = await fetch('https://api.github.com/repos/SEU-USER/SEU-REPO/contents/posts');
```

#### 📁 Arquivo: `posts/index.html`

- Mesma alteração da URL da API:
```javascript
const response = await fetch('https://api.github.com/repos/SEU-USER/SEU-REPO/contents/posts');
```

#### 🔍 Busca Rápida para Verificar

Execute estes comandos para encontrar referências ao projeto anterior:

```bash
# Buscar nome do repo antigo (substitua pelo nome do repo que você copiou)
grep -r "nome-repo-antigo" --include="*.js" --include="*.html"

# Buscar domínio antigo (substitua pelo domínio do projeto anterior)
grep -r "dominio-antigo" --include="*.js" --include="*.html" --include="*.css"

# Buscar URL do GitHub Pages antigo
grep -r "github.io" --include="*.js" --include="*.html"
```

Se encontrar qualquer resultado, **SUBSTITUA** pelo novo repositório/domínio!

---

### Passo 4: Ativar GitHub Pages

1. Vá em: `Settings` → `Pages`
2. Source: `Deploy from a branch`
3. Branch: `main` / `/ (root)`
4. Save

### Passo 5: ⚠️ Ativar GitHub Actions (IMPORTANTE!)

Para a automação `/drafts/` → `/posts/` funcionar, você precisa:

**5.1. Habilitar Actions no Repositório:**
1. Vá em: `Settings` → `Actions` → `General`
2. Em **"Actions permissions"**, selecione:
   - ✅ `Allow all actions and reusable workflows`
3. Clique em `Save`

**5.2. Dar Permissão de Escrita ao Workflow:**
1. Na mesma página, role até **"Workflow permissions"**
2. Selecione:
   - ✅ `Read and write permissions`
3. Marque também:
   - ✅ `Allow GitHub Actions to create and approve pull requests` (opcional)
4. Clique em `Save`

```
⚠️ SEM ESSAS CONFIGURAÇÕES, O WORKFLOW NÃO CONSEGUE:
   - Fazer commit automático
   - Mover arquivos de /drafts/ para /posts/
   - Push das alterações
```

**Caminho visual:**
```
GitHub Repo → Settings → Actions → General
                           ↓
              ┌─────────────────────────────┐
              │ Actions permissions         │
              │ ✅ Allow all actions        │
              ├─────────────────────────────┤
              │ Workflow permissions        │
              │ ✅ Read and write           │
              └─────────────────────────────┘
```

### Passo 6: Primeiro Commit

```bash
git add .
git commit -m "feat: setup inicial do blog"
git push -u origin main
```

---

## 📋 CHECKLIST PARA NOVO PROJETO

```
☐ Clonar/copiar estrutura de arquivos
☐ Criar repositório no GitHub
☐ Vincular remote origin
☐ Editar github-api.js (owner, repo)
☐ Editar index.html (título, descrição)
☐ Editar templates/post-template.html (URLs)
☐ Personalizar CSS (cores, fontes)
☐ Ativar GitHub Pages (Settings → Pages)
☐ ⚠️ Ativar GitHub Actions (Settings → Actions → General)
☐ ⚠️ Workflow permissions: "Read and write" (OBRIGATÓRIO!)
☐ Fazer primeiro commit e push
☐ Testar criação de post via /postin
☐ Testar fluxo: baixar HTML → mover para /drafts/ → push
☐ Verificar se Action moveu para /posts/ (aba Actions no GitHub)
☐ Verificar publicação no GitHub Pages
```

---

## 🚀 RESUMO RÁPIDO (TL;DR)

### Opção 1: Publicação Automática (COM Token) ⭐

```bash
# 1. Configurar token (uma vez)
Clicar: ⚙️ Configurar GitHub → Seguir instruções → Salvar Token

# 2. Criar e publicar post
Abrir: seusite.github.io/postin
Preencher formulário (ou usar 🧪 Preencher Teste)
Clicar: ✨ Gerar Post

# 3. PRONTO! Post publicado automaticamente!
URL: seusite.github.io/nome-do-seu-blog/posts/slug-do-post.html
```

### Opção 2: Download Manual (SEM Token)

```bash
# 1. Criar post no formulário
abrir: seusite.github.io/postin

# 2. Baixar HTML gerado
clicar: "Gerar Post" → Download

# 3. Mover para drafts e publicar
mv ~/Downloads/meu-post.html drafts/
git add drafts/
git commit -m "draft: meu novo post"
git push

# 4. GitHub Action faz o resto
# - Move de /drafts/ para /posts/
# - Publica automaticamente
```

### Opção 3: Usar IA para Gerar Conteúdo

```bash
# 1. Copiar template
Abrir: postin.html → BLOCO 9: 🤖 Assistente IA
Clicar: 📋 Copiar Template Completo

# 2. Colar no ChatGPT/Claude
# A IA preenche tudo incluindo prompts de imagem

# 3. Gerar imagens
Copiar cada [GERAR PROMPT...]
Colar no DALL-E/Midjourney
Gerar imagem → Copiar URL

# 4. Preencher formulário
Colar os valores gerados pela IA
Colar as URLs das imagens
Clicar: ✨ Gerar Post
```

---

## 📚 ARQUIVOS DE DOCUMENTAÇÃO

| Arquivo | Descrição |
|---------|-----------|
| `README.md` | Documentação geral |
| `QUICK-START.md` | Guia rápido de uso |
| `AUTO-SAVE-GUIDE.md` | Sistema de auto-save |
| `GOOGLE-DRIVE-IMAGES-GUIDE.md` | Usar imagens do Drive |
| `IMAGE-LAYOUTS-GUIDE.md` | Layouts de imagens |
| `SECURITY.md` | Práticas de segurança |
| `CHANGELOG.md` | Histórico de mudanças |

---

## 🔒 SEGURANÇA

- URL `/postin` é "secreta" (não indexada)
- Token GitHub fica apenas no localStorage do navegador
- Sem backend = menos vulnerabilidades
- CORS não é problema (tudo estático)

---

## ✅ VANTAGENS DESTE SISTEMA

| Vantagem | Descrição |
|----------|-----------|
| 💰 **Gratuito** | GitHub Pages é free |
| 🚀 **Rápido** | Sites estáticos são ultra-rápidos |
| 🔒 **Seguro** | Sem servidor = menos ataques |
| 📱 **Responsivo** | CSS mobile-first |
| 🎯 **SEO Otimizado** | Schema.org, OG, meta tags |
| 💾 **Versionado** | Git mantém histórico |
| 🌍 **CDN Global** | GitHub distribui mundialmente |

---

**Última atualização:** 14 de Janeiro de 2026  
**Versão:** 4.1 (Publicação Automática via GitHub API + 5 Versões de Teste)

### Changelog v4.1:
- ✅ **Publicação automática via GitHub API** quando token configurado
- ✅ **5 versões de conteúdo de teste** ao invés de apenas 1
- ✅ **Alternância automática** a cada clique em "Preencher Teste"
- ✅ **Feedback visual** mostrando qual versão foi usada
- ✅ **Documentação** de como personalizar para outros nichos

### Changelog v3.0:
- ✅ **Botão "Preencher Teste"** preenche TODOS os campos obrigatórios
- ✅ **Template para IA** com geração de prompts de imagens
- ✅ **4 campos de imagem** no template (1 capa + 3 internas)
- ✅ **Fix localStorage** que não sobrescreve o template atualizado

---

## 🔄 PERSONALIZAÇÃO PARA CADA PROJETO

### Ao Duplicar o Projeto

Quando você replicar este projeto para um novo cliente, lembre-se de:

1. **Alterar as 5 versões de teste** em `assets/js/form-script.js`
2. **Alterar as categorias** em `postin.html`
3. **Alterar os textos padrão** do CTA
4. **Alterar as cores/branding** no CSS
5. **Alterar o CNAME** com o domínio do cliente
6. **Alterar o github-api.js** com repo e URL corretos

### Editando as 5 Versões de Teste

Localize o array `testDataVersions` no arquivo `assets/js/form-script.js` (aproximadamente linha 150):

```javascript
const testDataVersions = [
    // VERSÃO 1
    {
        h1Title: 'Título do Post 1 para SEU NICHO',
        slug: 'slug-post-1-seu-nicho',
        category: 'Categoria do Nicho',
        author: 'Nome do Autor/Empresa',
        primaryKeyword: 'palavra-chave principal',
        secondaryKeywords: 'kw1, kw2, kw3',
        metaTitle: 'Meta Title para SEO',
        metaDescription: 'Meta description de até 160 caracteres...',
        introduction: 'Introdução do post...',
        contentBody: '<h2>Seção 1</h2><p>Conteúdo...</p>',
        conclusion: 'Conclusão do post...',
        tags: 'tag1, tag2, tag3',
        ctaTitle: 'CTA do Post',
        ctaText: 'Descrição persuasiva...',
        ctaButtonText: 'Texto do Botão',
        siteUrl: 'https://seusite.com.br',
        // ... demais campos
    },
    // VERSÃO 2, 3, 4, 5...
];
```

### Exemplos de Versões por Nicho

> **Nota:** Os exemplos abaixo são apenas sugestões. Adapte os títulos, categorias e conteúdos para o nicho específico do seu cliente.

#### Exemplo: SEU SEGMENTO
| # | Título | Categoria |
|---|--------|-----------|
| 1 | 5 Dicas para Escolher Granito Premium | Dicas |
| 2 | Granito vs Mármore: Guia Completo | Guia |
| 3 | Como Renovar sua Cozinha para o Verão | Tutorial |
| 4 | Por que Escolher SUA EMPRESA | Novidades |
| 5 | Bancadas de Granito: Vale o Investimento? | Blog |

#### Exemplo: Contabilidade
| # | Título | Categoria |
|---|--------|-----------|
| 1 | Como Regularizar Sua Empresa | Regularização |
| 2 | Impostos para MEI: Guia Completo | Impostos |
| 3 | Declaração de IR: Passo a Passo | IRPF |
| 4 | Benefícios de Contratar um Contador | Serviços |
| 5 | Erros Fiscais que Podem Quebrar Sua Empresa | Dicas |

#### Exemplo: Advocacia
| # | Título | Categoria |
|---|--------|-----------|
| 1 | Direitos Trabalhistas que Você Não Conhece | Trabalhista |
| 2 | Como Funciona o Divórcio Consensual | Família |
| 3 | Indenização por Danos Morais | Civil |
| 4 | Direitos do Consumidor Online | Consumidor |
| 5 | Quando Contratar um Advogado | Dicas |
