# 📂 PUBLICAÇÃO POR DIRETÓRIO (SEM TOKEN)

## 🎯 3 MÉTODOS ALTERNATIVOS

---

## ✅ MÉTODO 1: PASTA `drafts/` (MAIS SIMPLES)

### Como Funciona:
1. Você faz upload do arquivo `.html` para a pasta `drafts/`
2. GitHub Actions **automaticamente** move para `posts/`
3. Post fica disponível em `blog.SEU-DOMINIO.com/posts/nome.html`

### Passo a Passo:

#### 1. Gerar Post (no formulário):
- Preencher formulário normalmente
- Clicar em "Gerar Post"
- **Baixar** o arquivo `.html`

#### 2. Upload no GitHub:
1. Acesse: https://github.com/SEU-USUARIO-GITHUB/SEU-BLOG-REPO
2. Entre na pasta **`drafts/`** (se não existir, criar)
3. Clique em **"Add file"** → **"Upload files"**
4. Arraste o arquivo `.html` gerado
5. Commit: `"Add draft: nome-do-post"`
6. Clique em **"Commit changes"**

#### 3. Aguardar Publicação Automática:
- ⏱️ GitHub Actions processa em **30-60 segundos**
- 🤖 Move automaticamente de `drafts/` para `posts/`
- ✅ Post fica disponível na URL pública

### Vantagens:
- ✅ **Zero configuração**
- ✅ **Não precisa de token**
- ✅ Workflow visual (drag & drop)
- ✅ Automático após upload

---

## ✅ MÉTODO 2: GITHUB CLI (LINHA DE COMANDO)

### Instalar GitHub CLI:
```bash
# macOS
brew install gh

# Windows
winget install GitHub.cli

# Linux
sudo apt install gh
```

### Autenticar (UMA VEZ):
```bash
gh auth login
# Escolher: GitHub.com → HTTPS → Login via browser
```

### Publicar Post:
```bash
# 1. Ir para pasta do repositório local
cd /path/to/SEU-BLOG-REPO

# 2. Copiar arquivo HTML gerado para posts/
cp ~/Downloads/nome-do-post.html posts/

# 3. Commit e push
git add posts/nome-do-post.html
git commit -m "Add post: nome-do-post"
git push

# OU fazer tudo de uma vez:
gh repo clone SEU-USUARIO-GITHUB/SEU-BLOG-REPO
cd SEU-BLOG-REPO
cp ~/Downloads/nome-do-post.html posts/
git add posts/
git commit -m "Add post: nome-do-post"
git push
```

### Vantagens:
- ✅ Linha de comando (rápido)
- ✅ Não precisa abrir navegador
- ✅ Pode criar scripts
- ✅ Autenticação permanente

---

## ✅ MÉTODO 3: GITHUB DESKTOP (INTERFACE GRÁFICA)

### Instalar GitHub Desktop:
Download: https://desktop.github.com/

### Configurar (UMA VEZ):
1. Abrir GitHub Desktop
2. **File** → **Clone Repository**
3. Selecionar: `SEU-USUARIO-GITHUB/SEU-BLOG-REPO`
4. Local: `/Users/bruno/Documents/SEU-BLOG-REPO`
5. Clonar

### Publicar Post:
1. Copiar arquivo `.html` gerado para: `/Users/bruno/Documents/SEU-BLOG-REPO/posts/`
2. Abrir **GitHub Desktop**
3. Arquivo aparece em **"Changes"**
4. Escrever mensagem: `"Add post: nome-do-post"`
5. Clicar em **"Commit to main"**
6. Clicar em **"Push origin"**

### Vantagens:
- ✅ Interface visual
- ✅ Fácil de usar
- ✅ Ver histórico de commits
- ✅ Sem linha de comando

---

## ✅ MÉTODO 4: VSCODE + GIT (EDITOR INTEGRADO)

### Configurar (UMA VEZ):
1. Abrir **VS Code**
2. **Terminal** → **New Terminal**
3. Clonar repositório:
```bash
git clone https://github.com/SEU-USUARIO-GITHUB/SEU-BLOG-REPO.git
cd SEU-BLOG-REPO
```

### Publicar Post:
1. Copiar arquivo `.html` para pasta `posts/`
2. No VS Code, ver **Source Control** (ícone à esquerda)
3. Arquivo aparece em **"Changes"**
4. Clicar em **"+"** para stage
5. Escrever mensagem: `"Add post: nome"`
6. Clicar em **"✓ Commit"**
7. Clicar em **"..."** → **"Push"**

### Vantagens:
- ✅ Já usa VS Code
- ✅ Git integrado
- ✅ Ver preview do HTML
- ✅ Editar se necessário

---

## 📊 COMPARAÇÃO DOS MÉTODOS

| Método | Complexidade | Setup | Automação | Velocidade |
|--------|--------------|-------|-----------|------------|
| **Pasta drafts/** | ⭐ Muito Fácil | Zero | ✅ Total | ⏱️ 1-2 min |
| **GitHub CLI** | ⭐⭐ Médio | 5 min | ⚙️ Script | ⚡ 30 seg |
| **GitHub Desktop** | ⭐ Fácil | 5 min | ❌ Manual | ⏱️ 1 min |
| **VS Code + Git** | ⭐⭐ Médio | 5 min | ❌ Manual | ⏱️ 1 min |
| **Token API** | ⭐⭐⭐ Difícil | 10 min | ✅ Total | ⚡ 10 seg |

---

## 🎯 RECOMENDAÇÃO POR PERFIL

### 👤 Não Técnico:
→ **MÉTODO 1: Pasta `drafts/`**
- Arrasta arquivo no navegador
- GitHub faz o resto automaticamente

### 💻 Técnico (usa terminal):
→ **MÉTODO 2: GitHub CLI**
- Rápido
- Pode automatizar com scripts

### 🎨 Designer/Editor:
→ **MÉTODO 3: GitHub Desktop**
- Interface visual bonita
- Fácil de entender

### 👨‍💻 Desenvolvedor:
→ **MÉTODO 4: VS Code**
- Já usa no dia a dia
- Git integrado

---

## 📝 EXEMPLO COMPLETO (MÉTODO 1 - DRAFTS)

### Workflow Passo a Passo:

```
1. FORMULÁRIO
   └─ Preencher 9 blocos
   └─ Clicar "Gerar Post"
   └─ Baixar: como-instalar-granito.html

2. GITHUB WEB
   └─ Abrir: github.com/SEU-USUARIO-GITHUB/SEU-BLOG-REPO
   └─ Entrar em pasta: drafts/
   └─ Upload: arrastar como-instalar-granito.html
   └─ Commit: "Add draft"

3. AUTOMÁTICO (30-60 segundos)
   └─ GitHub Actions: detecta novo arquivo
   └─ Move de drafts/ para posts/
   └─ Commit: "Auto-publish"
   └─ Deploy: GitHub Pages rebuild

4. RESULTADO
   └─ URL: blog.SEU-DOMINIO.com/posts/como-instalar-granito.html
   └─ ✅ Post ao vivo!
```

---

## 🔧 CRIAR PASTA `drafts/`

### No GitHub Web:

1. Vá para: https://github.com/SEU-USUARIO-GITHUB/SEU-BLOG-REPO
2. Clique em **"Add file"** → **"Create new file"**
3. Nome: `drafts/.gitkeep`
4. Commit: `"Create drafts folder"`

Pronto! Agora pode fazer upload de posts em `drafts/`

---

## ⚙️ GITHUB ACTIONS (JÁ CONFIGURADO)

Arquivo: `.github/workflows/auto-publish-drafts.yml`

**Gatilho:** Qualquer push em `drafts/*.html`

**Ação:** Move para `posts/` automaticamente

**Status:** Ver em **Actions** tab no GitHub

---

## 🆘 TROUBLESHOOTING

### Arquivo não moveu de drafts/ para posts/
- Aguarde 1-2 minutos
- Veja **Actions** tab (pode ter erro)
- Arquivo precisa ter extensão `.html`

### Post não aparece no site
- GitHub Pages demora 2-3 minutos
- Limpe cache: Ctrl + Shift + R
- Verifique se arquivo está em `posts/`

### GitHub Actions falhou
- Veja logs em **Actions** tab
- Clique no workflow com ❌
- Ver erro detalhado

---

## 📞 LINKS ÚTEIS

- **Repositório:** https://github.com/SEU-USUARIO-GITHUB/SEU-BLOG-REPO
- **Blog ao vivo:** https://blog.SEU-DOMINIO.com
- **Actions:** https://github.com/SEU-USUARIO-GITHUB/SEU-BLOG-REPO/actions
- **GitHub CLI:** https://cli.github.com
- **GitHub Desktop:** https://desktop.github.com

---

## ✨ RESUMO

**Método Recomendado:** Upload em `drafts/` (zero config)

**Workflow:**
1. Gerar HTML no formulário
2. Download do arquivo
3. Upload em `drafts/` no GitHub
4. Aguardar 1 minuto
5. Post publicado automaticamente!

**SEM PRECISAR:**
- ❌ Token pessoal
- ❌ Linha de comando
- ❌ Configuração complexa
- ❌ Git local

**APENAS:**
- ✅ Arrastar arquivo no navegador
- ✅ GitHub Actions faz o resto

🚀 **Simples, seguro e automático!**
