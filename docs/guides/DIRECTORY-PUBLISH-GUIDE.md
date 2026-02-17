# 📂 PUBLICAÇÃO POR DIRETÓRIO (GitHub Actions)

## 🎯 Método Alternativo - Sem Token Local

Ao invés de usar token no navegador, você pode:
1. **Salvar HTML na pasta `drafts/`** do repositório
2. **GitHub Actions automaticamente move para `posts/`**
3. **Deploy automático no GitHub Pages**

---

## 🚀 COMO FUNCIONA

```
1. Gerar HTML no formulário
2. Baixar arquivo
3. Colocar em /drafts/ no repositório (Git local)
4. Fazer commit e push
5. GitHub Actions detecta novo arquivo
6. Move automaticamente de /drafts/ para /posts/
7. GitHub Pages faz deploy
8. Post fica disponível em blog.SEU-DOMINIO.com/posts/
```

---

## 📁 ESTRUTURA

```
SEU-BLOG-REPO/
├── .github/
│   └── workflows/
│       └── publish-post.yml    ← Automação
├── drafts/                     ← Você coloca aqui
│   └── novo-post.html
├── posts/                      ← GitHub Actions move para cá
│   └── novo-post.html
└── index.html
```

---

## ⚙️ CONFIGURAÇÃO (Já está pronta!)

O arquivo `.github/workflows/publish-post.yml` já foi criado e faz:

```yaml
1. Detecta quando novo arquivo aparece em drafts/
2. Move automaticamente para posts/
3. Faz commit e push automático
4. GitHub Pages rebuild
```

**Você não precisa configurar nada!** ✅

---

## 📝 WORKFLOW SIMPLES

### Método 1: Git Local (Recomendado)

```bash
# 1. Clonar repositório (primeira vez)
git clone https://github.com/SEU-USUARIO-GITHUB/SEU-BLOG-REPO.git
cd SEU-BLOG-REPO

# 2. Gerar post no formulário → Baixar HTML

# 3. Copiar para drafts/
cp ~/Downloads/meu-post.html drafts/

# 4. Commit e push
git add drafts/
git commit -m "Add new post: meu-post"
git push

# 5. Aguardar 1-2 minutos
# GitHub Actions move para posts/ automaticamente
```

### Método 2: GitHub Web Interface

```
1. Gerar HTML no formulário → Baixar
2. Ir em: https://github.com/SEU-USUARIO-GITHUB/SEU-BLOG-REPO
3. Clicar na pasta "drafts"
4. Clicar "Add file" → "Upload files"
5. Arrastar arquivo HTML
6. Commit changes
7. GitHub Actions processa automaticamente
```

---

## 🎯 VANTAGENS vs Token Local

| Característica | Token Local | Diretório (Actions) |
|----------------|-------------|---------------------|
| **Setup** | Configurar token uma vez | Nenhum setup necessário |
| **Segurança** | Token no navegador | Token no GitHub (mais seguro) |
| **Velocidade** | Imediato | 1-2 minutos (Actions) |
| **Complexidade** | Médio | Simples |
| **Rastreamento** | Commit direto | 2 commits (draft + publish) |
| **Offline** | Não funciona | Funciona (via git local) |

---

## 🔄 FLUXO COMPLETO

### 1. Primeira Publicação

```bash
# Clonar repo
git clone https://github.com/SEU-USUARIO-GITHUB/SEU-BLOG-REPO.git
cd SEU-BLOG-REPO

# Gerar post no formulário → Baixar como "granito-cozinha.html"

# Copiar para drafts
cp ~/Downloads/granito-cozinha.html drafts/

# Commit
git add drafts/granito-cozinha.html
git commit -m "Draft: Guia de granito para cozinha"
git push

# Aguardar GitHub Actions
# Verificar em: https://github.com/SEU-USUARIO-GITHUB/SEU-BLOG-REPO/actions

# Após 1-2min:
# ✅ Arquivo movido para posts/
# ✅ Disponível em: blog.SEU-DOMINIO.com/posts/granito-cozinha.html
```

### 2. Próximas Publicações

```bash
# Já está dentro do repo
cd SEU-BLOG-REPO

# Pull das mudanças
git pull

# Adicionar novo post
cp ~/Downloads/novo-post.html drafts/

# Commit e push
git add drafts/
git commit -m "Draft: Novo post sobre quartzo"
git push

# GitHub Actions faz o resto automaticamente
```

---

## 🛠️ MODIFICAR O FORMULÁRIO (Opcional)

Podemos adicionar um botão para salvar direto em `drafts/` local:

```javascript
// Adicionar no form-script.js
function saveToLocalDrafts(html, slug) {
    // Salva HTML localmente
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug}.html`;
    a.click();
    
    // Mostrar instruções
    alert(`
        ✅ Post salvo: ${slug}.html
        
        📋 Próximos passos:
        1. Mova o arquivo para a pasta drafts/ do repositório
        2. Faça commit e push
        3. GitHub Actions publicará automaticamente
        
        Ou use: cp ~/Downloads/${slug}.html /path/to/SEU-BLOG-REPO/drafts/
    `);
}
```

---

## 📊 MONITORAR PUBLICAÇÕES

### Ver Actions em Execução

```
https://github.com/SEU-USUARIO-GITHUB/SEU-BLOG-REPO/actions
```

### Ver Logs

```
1. Clique na action "Auto Publish Blog Post"
2. Veja os passos:
   ✓ Checkout repository
   ✓ Move draft to posts
   ✓ Commit and push
3. Verificar erros (se houver)
```

### Ver Commits Automáticos

```
https://github.com/SEU-USUARIO-GITHUB/SEU-BLOG-REPO/commits/main

Mensagem: "Auto-publish: Move drafts to posts"
Autor: GitHub Action
```

---

## 🔧 PERSONALIZAR ACTIONS

### Editar Workflow

```bash
# Local
nano .github/workflows/publish-post.yml

# Ou no GitHub
# Settings → Actions → Edit workflow
```

### Exemplo: Adicionar notificação

```yaml
- name: Notify on success
  run: |
    echo "✅ Post publicado com sucesso!"
    echo "URL: https://blog.SEU-DOMINIO.com/posts/$filename"
```

---

## 🆘 TROUBLESHOOTING

### ❌ Action não executou

**Solução:**
```bash
# Verificar se arquivo está em drafts/
git status

# Ver branches
git branch

# Verificar Actions habilitadas
# Settings → Actions → General → Allow all actions
```

### ❌ Post não moveu para posts/

**Solução:**
```bash
# Verificar permissões do workflow
# Settings → Actions → General → Workflow permissions
# Marcar: Read and write permissions
```

### ❌ GitHub Pages não atualizou

**Solução:**
```bash
# Forçar rebuild
git commit --allow-empty -m "Trigger rebuild"
git push

# Verificar Pages settings
# Settings → Pages → Source: Deploy from branch (main)
```

---

## 🎓 EXEMPLO PRÁTICO

```bash
# 1. Setup inicial (primeira vez)
cd ~/Documents/PROJETOS
git clone https://github.com/SEU-USUARIO-GITHUB/SEU-BLOG-REPO.git
cd SEU-BLOG-REPO

# 2. Criar post no formulário
# Preencher campos → Gerar Post → Baixar HTML

# 3. Adicionar ao repo
cp ~/Downloads/como-limpar-granito.html drafts/
git add drafts/como-limpar-granito.html
git commit -m "Draft: Guia de limpeza de granito"
git push origin main

# 4. Verificar Actions
# https://github.com/SEU-USUARIO-GITHUB/SEU-BLOG-REPO/actions
# Status: ✅ Auto Publish Blog Post

# 5. Aguardar 1-2 minutos

# 6. Verificar publicação
# https://blog.SEU-DOMINIO.com/posts/como-limpar-granito.html

# ✅ Sucesso!
```

---

## 📋 CHECKLIST

- [ ] Repositório clonado localmente
- [ ] Workflow `.github/workflows/publish-post.yml` existe
- [ ] Pastas `drafts/` e `posts/` criadas
- [ ] Actions habilitadas no repo
- [ ] Permissões de escrita ativas para Actions
- [ ] GitHub Pages configurado (branch main)
- [ ] Post gerado no formulário
- [ ] HTML baixado
- [ ] Copiado para `drafts/`
- [ ] Commit e push feitos
- [ ] Action executada com sucesso
- [ ] Post disponível na URL pública

---

## 🚀 RESUMO

### Método Token (Anterior)
- ✅ Imediato
- ⚠️ Token no navegador
- 🔧 Setup necessário

### Método Diretório (Novo)
- ✅ Mais seguro
- ✅ Sem setup
- ⏱️ 1-2min delay
- ✅ Rastreamento completo
- ✅ Funciona offline (git local)

**Ambos funcionam! Escolha o que preferir.** 🎯
