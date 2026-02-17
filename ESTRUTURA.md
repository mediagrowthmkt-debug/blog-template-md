# 📁 Estrutura do Projeto

```
BLOG TEMPLATE MD/
│
├── 📄 00-LEIA-ME-PRIMEIRO.md ........ Informações iniciais importantes
├── 📄 README.md ..................... Documentação principal do projeto
├── 📄 index.html .................... Página inicial do blog
├── 📄 postin.html ................... Formulário de criação de posts
│
├── 📂 assets/ ....................... Recursos estáticos
│   ├── css/
│   │   ├── blog-post.css ........... Estilos dos posts
│   │   └── form-style.css .......... Estilos do formulário
│   ├── images/ .................... Imagens do projeto
│   └── js/
│       ├── blog-post.js ............ Scripts dos posts
│       └── form-script.js .......... Scripts do formulário
│
├── 📂 docs/ ......................... Documentação completa
│   ├── INDEX.md .................... Índice da documentação
│   ├── ACESSO-RAPIDO.md ............ Guia de acesso rápido
│   ├── QUICK-START.md .............. Início rápido completo
│   ├── QUICK-START-NEW-TEMPLATE.md . Início rápido para novo template
│   │
│   ├── 📂 guides/ .................. Guias de uso
│   │   ├── AUTO-PUBLISH-GUIDE.md ... Publicação automática
│   │   ├── AUTO-SAVE-GUIDE.md ...... Sistema de auto-save
│   │   ├── DIRECTORY-PUBLISH-GUIDE.md Publicação por diretório
│   │   ├── PUBLISH-BY-FOLDER.md .... Publicação por pasta
│   │   ├── IMAGE-LAYOUTS-GUIDE.md .. Layouts de imagens
│   │   ├── GOOGLE-DRIVE-IMAGES-GUIDE.md Google Drive
│   │   ├── CORRECAO-IMAGENS-INTERNAS.md Correção de imagens
│   │   └── GUIA-REPLICACAO-PROJETO.md Replicação do projeto
│   │
│   ├── 📂 security/ ................ Documentação de segurança
│   │   ├── SECURITY.md ............. Política de segurança
│   │   ├── SECURITY-REPORT-AUTO-SAVE.md Relatório auto-save
│   │   ├── SECURITY-SCAN-REPORT.md . Relatório de scan
│   │   └── URL-SECURITY-UPDATE.md .. Atualização de URLs
│   │
│   └── 📂 updates/ ................. Atualizações e mudanças
│       ├── CHANGELOG.md ............ Histórico de mudanças
│       ├── SUMMARY.md .............. Resumo das atualizações
│       ├── RESUMO-AJUSTES.md ....... Resumo de ajustes
│       ├── IMPLEMENTATION.md ....... Detalhes de implementação
│       └── GOOGLE-DRIVE-UPDATE.md .. Atualização Google Drive
│
├── 📂 drafts/ ....................... Rascunhos de posts
│   └── README.md
│
├── 📂 examples/ ..................... Exemplos e testes
│   ├── EXEMPLO-POST.md ............. Exemplo de post
│   ├── TESTE-IMAGENS-INTERNAS.md ... Teste de imagens
│   └── test-google-drive-conversion.html Teste Google Drive
│
├── 📂 posts/ ........................ Posts publicados
│   ├── index.html .................. Índice de posts
│   ├── README.md
│   └── [posts publicados].html
│
├── 📂 scripts/ ...................... Scripts e automações
│   ├── github-api.js ............... API do GitHub
│   └── github-actions-api.js ....... API GitHub Actions
│
└── 📂 templates/ .................... Templates de posts
    ├── post-template.html .......... Template base de post
    └── example-post-visual.html .... Exemplo visual completo

```

## 🎯 Propósito de Cada Pasta

### 📂 Raiz
Arquivos principais de configuração e páginas essenciais do blog.

### 📂 assets/
Todos os recursos estáticos: CSS, JavaScript e imagens.

### 📂 docs/
**Toda a documentação** organizada por categoria:
- **guides/** - Guias de uso e funcionalidades
- **security/** - Documentação de segurança
- **updates/** - Changelogs e histórico de atualizações

### 📂 drafts/
Armazena posts em rascunho antes da publicação.

### 📂 examples/
Exemplos práticos e arquivos de teste para desenvolvimento.

### 📂 posts/
Posts publicados e prontos para visualização.

### 📂 scripts/
Scripts de automação e integração com APIs externas.

### 📂 templates/
Templates reutilizáveis para criar novos posts.

## 🔍 Navegação Rápida

- **Começar a usar?** → [`docs/QUICK-START.md`](docs/QUICK-START.md)
- **Ver toda documentação?** → [`docs/INDEX.md`](docs/INDEX.md)
- **Criar um post?** → [`postin.html`](postin.html)
- **Ver exemplos?** → [`examples/`](examples/)
- **Templates?** → [`templates/`](templates/)

## 📝 Convenções

- ✅ Documentos de guias em `docs/guides/`
- ✅ Relatórios de segurança em `docs/security/`
- ✅ Changelogs em `docs/updates/`
- ✅ Scripts em `scripts/`
- ✅ Exemplos em `examples/`
- ✅ Posts publicados em `posts/`
