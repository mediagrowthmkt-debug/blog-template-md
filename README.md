# 📝 Sistema de Blog MediaGrowth - Template Completo

Sistema automatizado para criar e publicar posts de blog otimizados para SEO, com publicação direta no GitHub Pages.

**Versão:** 2.0 | **Status:** ✅ Produção | **Custo:** $0.00 (GitHub Pages gratuito)

---

## 🚀 INÍCIO RÁPIDO

### Criar um Post (5 minutos)

1. Acesse [`postin.html`](postin.html)
2. Preencha formulário completo
3. Clique em "👁️ Visualizar Preview"
4. Revise tudo
5. Clique em "🚀 Publicar Post"
6. ✅ Post online em 1-3 minutos!

**[📖 Ver guia detalhado →](docs/QUICK-START.md)**

### Replicar para Novo Cliente (30-45 minutos)

1. Fork do repositório
2. Ativar GitHub Pages
3. Personalizar (logo/cores/textos)
4. Testar tudo
5. Treinar cliente

**[🚀 Ver checklist completo →](docs/GUIA-REPLICACAO-CLIENTE.md)**

---

## ✨ FUNCIONALIDADES

- ✅ **Interface Visual Intuitiva** - Formulário completo para criar posts
- ✅ **Preview em Tempo Real** - Veja antes de publicar
- ✅ **Publicação Automatizada** - Direto no GitHub via API
- ✅ **📤 Upload de Imagens** - Do computador direto para GitHub (NOVO!)
- ✅ **Sistema de 3 Imagens** - Layouts adaptativos (full/left/left)
- ✅ **Formulário de Leads** - Captura de contatos com webhook
- ✅ **Posts Relacionados** - Carregamento dinâmico automático
- ✅ **SEO Completo** - Meta tags, Schema.org, Open Graph, Twitter Cards
- ✅ **Multilíngue** - Detecção automática PT/EN
- ✅ **Design Responsivo** - Mobile-first, dark theme profissional
- ✅ **Header & Footer** - Logo da empresa em todas as páginas

---

## 📚 DOCUMENTAÇÃO COMPLETA

### 🟧 **Central de Documentação para Replicação**
**[📂 REPLICAR PARA_OUTRO_CLIENTE/ →](🟧REPLICAR%20PARA_OUTRO_CLIENTE/)**

| Guia | Descrição | Tempo | Dificuldade |
|------|-----------|-------|-------------|
| **[� Guia de Replicação](🟧REPLICAR%20PARA_OUTRO_CLIENTE/GUIA-REPLICACAO-CLIENTE.md)** | Setup completo para novo cliente | 30-45 min | ⭐⭐☆☆☆ |
| **[� Upload de Imagens](🟧REPLICAR%20PARA_OUTRO_CLIENTE/UPLOAD-IMAGENS-GUIDE.md)** ⭐ | Sistema de upload para GitHub | 15 min | ⭐⭐☆☆☆ |
| **[� Doc Completa](🟧REPLICAR%20PARA_OUTRO_CLIENTE/DOCUMENTACAO-COMPLETA.md)** | Arquitetura técnica detalhada | 2-3 horas | ⭐⭐⭐☆☆ |
| **[❓ FAQ](🟧REPLICAR%20PARA_OUTRO_CLIENTE/FAQ-TROUBLESHOOTING.md)** | Problemas comuns e soluções | Consulta | ⭐☆☆☆☆ |
| **[📊 Fluxogramas](🟧REPLICAR%20PARA_OUTRO_CLIENTE/FLUXOGRAMA-SISTEMA.md)** | Diagramas visuais dos fluxos | 10 min | ⭐☆☆☆☆ |

### 📖 **Guias Rápidos (docs/)**

| Documento | Descrição | Tempo |
|-----------|-----------|-------|
| **[⚡ Quick Start](docs/QUICK-START.md)** | Criar primeiro post em 5 minutos | 5 min |
| **[📑 Índice Completo](docs/INDEX.md)** | Todos os documentos organizados | 2 min |

---

## 🏗️ ARQUITETURA

```
Stack Tecnológico:
├── Frontend:    HTML5 + CSS3 + JavaScript (Vanilla)
├── Hospedagem:  GitHub Pages (gratuito)
├── API:         GitHub REST API v3
├── Build:       Jekyll (automático)
├── CDN:         GitHub CDN global
└── SSL:         Let's Encrypt (automático)
```

### Fluxo Simplificado

```
┌─────────────┐
│ FORMULÁRIO  │ → Preenche dados (postin.html)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ PREVIEW     │ → Revisa visual
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ GITHUB API  │ → Publica via API
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ ONLINE      │ → 1-3 minutos
└─────────────┘
```

---

## 📁 ESTRUTURA DO PROJETO

```
blog-template-md/
├── index.html              # Página principal (lista posts)
├── postin.html            # Interface de criação
├── _config.yml            # Config Jekyll (URLs limpas)
│
├── assets/
│   ├── css/               # Estilos
│   ├── js/                # Lógica (3230 linhas)
│   └── images/            # Logo e favicon
│
├── posts/                 # Posts publicados
│
└── docs/                  # 📚 Documentação completa
    ├── DOCUMENTACAO-COMPLETA.md
    ├── GUIA-REPLICACAO-CLIENTE.md
    ├── FLUXOGRAMA-SISTEMA.md
    ├── FAQ-TROUBLESHOOTING.md
    ├── guides/
    ├── security/
    └── updates/
```

---

## 💡 POR QUE USAR ESTE SISTEMA?

### Vantagens

✅ **Zero Custo** - GitHub Pages 100% gratuito  
✅ **Zero Servidor** - Tudo client-side  
✅ **Zero Manutenção** - GitHub gerencia tudo  
✅ **Escalável** - CDN global automático  
✅ **Seguro** - HTTPS automático  
✅ **Versionado** - Git nativo  
✅ **Backup Automático** - Histórico Git completo  

### Ideal Para

✅ Blogs corporativos  
✅ Sites de conteúdo  
✅ Documentação  
✅ Landing pages  
✅ Portfolios  

---

## 🎓 GUIAS RÁPIDOS

### Criação de Conteúdo
- [Como criar um post](docs/DOCUMENTACAO-COMPLETA.md#passo-2-preencher-o-formulário)
- [Sistema de imagens](docs/DOCUMENTACAO-COMPLETA.md#sistema-de-imagens)
- [Formulário de leads](docs/DOCUMENTACAO-COMPLETA.md#formulário-de-captura-de-leads)
- [SEO e meta tags](docs/DOCUMENTACAO-COMPLETA.md#seo-e-meta-tags)

### Publicação
- [Publicar no GitHub](docs/DOCUMENTACAO-COMPLETA.md#publicação-no-github)
- [Configurar domínio](docs/GUIA-REPLICACAO-CLIENTE.md#fase-6-configurar-domínio-customizado)
- [Preview antes de publicar](docs/DOCUMENTACAO-COMPLETA.md#passo-3-visualizar-preview)

### Personalização
- [Trocar logo e cores](docs/GUIA-REPLICACAO-CLIENTE.md#fase-4-personalização-visual)
- [Editar textos](docs/GUIA-REPLICACAO-CLIENTE.md#43-textos-e-links)
- [Configurar webhook](docs/FAQ-TROUBLESHOOTING.md#formulário-de-leads)

### Manutenção
- [Editar post existente](docs/FAQ-TROUBLESHOOTING.md#q-posso-editar-um-post-depois-de-publicado)
- [Deletar post](docs/FAQ-TROUBLESHOOTING.md#q-como-deleto-um-post)
- [Fazer backup](docs/FAQ-TROUBLESHOOTING.md#backup-e-restore-completo)
- [Resolver problemas](docs/FAQ-TROUBLESHOOTING.md)

---

## 🔗 LINKS IMPORTANTES

### Produção
- **Blog:** https://mediagrowthmkt-debug.github.io/blog-template-md/
- **Criar Post:** https://mediagrowthmkt-debug.github.io/blog-template-md/postin.html
- **GitHub Repo:** https://github.com/mediagrowthmkt-debug/blog-template-md

### Ferramentas
- **GitHub Token:** https://github.com/settings/tokens
- **Search Console:** https://search.google.com/search-console
- **TinyPNG:** https://tinypng.com (comprimir imagens)
- **Webhook Test:** https://webhook.site (testar webhooks)

---

## 📊 ESTATÍSTICAS

```
Linhas de Código:    ~5.400
Funções JavaScript:  45+
Classes CSS:         150+
Layouts de Imagem:   3 tipos
Idiomas:             2 (PT/EN)
Tempo de Deploy:     1-3 minutos
Custo Hospedagem:    $0.00
```

---

## 🆕 VERSÃO 2.0 - Fevereiro 2026

### Últimas Atualizações

- ✅ Header e footer com logo em todas as páginas
- ✅ Sistema de 3 imagens otimizado (full/left/left)
- ✅ Prevenção de imagens duplicadas
- ✅ Layout compacto (900px max-width)
- ✅ Navegação simplificada (2 links)
- ✅ URLs limpas (sem .html)
- ✅ Tags não-clicáveis
- ✅ Documentação completa

**[Ver changelog completo →](docs/updates/CHANGELOG.md)**

---

## 📞 SUPORTE

### MediaGrowth

- **Site:** https://mediagrowth.com.br
- **Email:** contato@mediagrowth.com.br
- **GitHub:** https://github.com/mediagrowthmkt-debug

### Comunidade

- **Issues:** https://github.com/mediagrowthmkt-debug/blog-template-md/issues
- **Discussions:** https://github.com/mediagrowthmkt-debug/blog-template-md/discussions

---

## 📝 LICENÇA

Desenvolvido pela **MediaGrowth** para uso interno e de clientes.

**Permissões:**
- ✅ Usar para projetos de clientes
- ✅ Modificar e personalizar
- ✅ Criar backups

**Restrições:**
- ❌ Revender como produto standalone
- ❌ Remover créditos da MediaGrowth

---

**Desenvolvido por:** MediaGrowth Development Team  
**Última atualização:** 22 de fevereiro de 2026  
**Versão:** 2.0

