# 📤 GUIA COMPLETO - SISTEMA DE UPLOAD DE IMAGENS

> **Sistema automatizado de upload de imagens para GitHub com otimização e repositório dedicado**

---

## 📋 ÍNDICE

1. [Visão Geral](#visão-geral)
2. [Requisitos](#requisitos)
3. [Configuração Inicial](#configuração-inicial)
4. [Como Usar](#como-usar)
5. [Arquitetura do Sistema](#arquitetura-do-sistema)
6. [Troubleshooting](#troubleshooting)
7. [Replicação para Clientes](#replicação-para-clientes)

---

## 🎯 VISÃO GERAL

### **O que é?**
Sistema que permite fazer upload de imagens **diretamente do computador** para o GitHub, sem necessidade de hospedar em serviços externos.

### **Funcionalidades**
✅ Upload direto do computador para GitHub  
✅ Otimização automática (resize + compressão)  
✅ Repositório dedicado (`blog-images`) criado automaticamente  
✅ Organização por slug do post  
✅ Preview visual antes de publicar  
✅ Feedback de progresso em tempo real  

### **Vantagens**
- 🆓 **Gratuito:** Usa GitHub como CDN
- ⚡ **Rápido:** Imagens otimizadas (max 1920x1080, 85% quality)
- 🔒 **Seguro:** Controle total via GitHub API
- 📁 **Organizado:** Estrutura clara por post
- 🌐 **Global:** CDN do GitHub entrega rápido mundialmente

---

## 🔧 REQUISITOS

### **1. Token do GitHub**
- Necessário para autenticar uploads via API
- Permissões: `repo` (acesso completo a repositórios)

### **2. Arquivos Necessários**
```
projeto/
├── postin.html                          # Interface com botões de upload
├── scripts/
│   └── github-image-uploader.js         # Core do sistema de upload
├── assets/
│   ├── js/
│   │   └── form-script.js               # Handlers dos botões
│   └── css/
│       └── form-style.css               # Estilos dos botões
```

### **3. Navegador**
- Chrome/Edge/Firefox/Safari (suporte a FileReader API)
- JavaScript habilitado

---

## ⚙️ CONFIGURAÇÃO INICIAL

### **PASSO 1: Gerar Token do GitHub**

1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token"** → **"Generate new token (classic)"**
3. Configure:
   ```
   Note: Blog Image Uploader
   Expiration: No expiration (ou escolha período)
   Scopes: ✅ repo (marcar tudo em "repo")
   ```
4. Clique em **"Generate token"**
5. **COPIE O TOKEN** (só aparece uma vez!)

### **PASSO 2: Configurar no Navegador**

1. Abra `postin.html` no navegador local
2. Abra o **Console do Navegador** (F12)
3. Execute o comando:
   ```javascript
   localStorage.setItem('github_token', 'SEU_TOKEN_AQUI');
   ```
4. Recarregue a página (F5)

### **PASSO 3: Verificar Configuração**

Execute no console:
```javascript
console.log(localStorage.getItem('github_token') ? '✅ Token configurado' : '❌ Token ausente');
```

---

## 🚀 COMO USAR

### **1️⃣ Upload do Avatar do Autor** ⭐ NOVO!

![Avatar Upload](https://via.placeholder.com/600x100/4ade80/FFFFFF?text=UPLOAD+AVATAR+-+UMA+VEZ)

**🎯 Upload uma vez, usa sempre!**

1. Localize o campo **"Avatar do Autor (URL)"**
2. Clique no botão laranja **"📤 UPLOAD AVATAR"**
3. Selecione a foto do autor do seu computador
4. Aguarde o feedback:
   - 🔍 **"Buscando avatar existente..."** → Verificando se já existe
   - 📦 **"Processando imagem..."** → Otimizando
   - 📤 **"Fazendo upload para GitHub..."** → Enviando
   - 🟢 **"✅ Avatar salvo! Será usado em todos os posts"** → Sucesso!

**💡 Comportamento inteligente:**
- ✅ **Primeira vez:** Faz upload e salva como `avatar.jpg`
- ✅ **Próximas vezes:** Carrega automaticamente ao abrir a página
- ✅ **Para atualizar:** Selecione nova imagem (sobrescreve a anterior)
- ✅ **Reutilização:** Não precisa fazer upload novamente em novos posts

### **2️⃣ Upload da Imagem de Capa**

![Exemplo de botão de upload](https://via.placeholder.com/600x100/EB7A3D/FFFFFF?text=UPLOAD+IMAGEM)

1. Localize o campo **"Imagem Principal (Cover)"**
2. Clique no botão laranja **"📤 UPLOAD IMAGEM"**
3. Selecione a imagem do seu computador
4. Aguarde o feedback:
   - 🟠 **"Processando imagem..."** → Otimizando
   - 🟠 **"Fazendo upload..."** → Enviando para GitHub
   - 🟢 **"✅ Upload concluído!"** → Sucesso!
5. A URL será preenchida automaticamente no campo

### **3️⃣ Upload de Imagens Internas**

![Exemplo de botão pequeno](https://via.placeholder.com/50x50/EB7A3D/FFFFFF?text=📤)

1. Em cada campo de **"Imagens Internas"**
2. Clique no botão pequeno **📤** (ao lado do botão remover)
3. Selecione a imagem
4. Aguarde o processamento
5. URL preenchida automaticamente

### **4️⃣ Estrutura de Armazenamento**

As imagens são salvas no repositório `blog-images`:

```
blog-images/
├── avatar.jpg                     # ⭐ Avatar do autor (único e reutilizável)
└── posts/
    └── [slug-do-post]/
        ├── cover.jpg              # Imagem de capa
        ├── internal-1.jpg         # 1ª imagem interna
        ├── internal-2.jpg         # 2ª imagem interna
        └── internal-3.jpg         # 3ª imagem interna
```

**Exemplo real:**
```
blog-images/
├── avatar.jpg                     # ← Usado em TODOS os posts
└── posts/
    ├── instalacao-granito-cozinha/
    │   ├── cover.jpg
    │   ├── internal-1.jpg
    │   └── internal-2.jpg
    └── reforma-cozinha-moderna/
        ├── cover.jpg
        └── internal-1.jpg
```

**URLs geradas:**
```
# Avatar (permanente)
https://raw.githubusercontent.com/[usuario]/blog-images/main/avatar.jpg

# Imagens do post
https://raw.githubusercontent.com/[usuario]/blog-images/main/posts/instalacao-granito-cozinha/cover.jpg
```

---

## 🏗️ ARQUITETURA DO SISTEMA

### **Fluxo de Upload**

```
┌─────────────────┐
│  Usuário clica  │
│   em Upload     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  FileReader API │  ← Lê arquivo local
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Canvas API    │  ← Redimensiona/Comprime
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Base64 Encoding │  ← Converte para texto
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  GitHub API     │  ← PUT /repos/{owner}/{repo}/contents/{path}
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  URL Retornada  │  ← Preenche campo automaticamente
└─────────────────┘
```

### **Componentes do Código**

#### **1. github-image-uploader.js** (~650 linhas) ⭐ ATUALIZADO

```javascript
class GitHubImageUploader {
    constructor(token, username, repoName = 'blog-images') { ... }
    
    // Métodos principais:
    uploadImage(file, postSlug, imageType)     // Upload principal
    getAvatarUrl()                             // ⭐ Busca avatar existente
    getFile(path)                              // Busca arquivo do repo
    ensureRepository()                         // Cria repo se não existir
    createRepository()                         // Cria novo repositório
    optimizeImage(file)                        // Resize + compress
}

// Handlers globais:
setupImageUploadHandlers()                     // Configura todos os botões
loadExistingAvatar()                           // ⭐ Carrega avatar ao abrir página
handleAvatarUpload(file)                       // ⭐ Upload específico de avatar
handleImageUpload(file, type, input)          // Upload de imagens de posts
```

**⭐ NOVA FUNCIONALIDADE - Avatar Persistente:**

```javascript
// Ao abrir a página, busca avatar existente
async function loadExistingAvatar() {
    const avatarUrl = await uploader.getAvatarUrl();
    if (avatarUrl) {
        document.getElementById('authorAvatar').value = avatarUrl;
        // ✅ Avatar preenchido automaticamente!
    }
}

// Upload do avatar (com sobrescrita se existir)
async function handleAvatarUpload(file) {
    // 1. Busca SHA do arquivo existente (se houver)
    // 2. Faz upload com SHA para sobrescrever
    // 3. Salva sempre como 'avatar.jpg' na raiz
    const url = await uploader.uploadImage(file, null, 'avatar');
}
```

**Otimizações aplicadas:**
- Max width: 1920px
- Max height: 1080px
- Quality: 85%
- Formato: JPEG

#### **2. form-script.js** (handlers)

```javascript
// Configuração dos eventos
function setupImageUploadHandlers() {
    // Botão de capa
    document.getElementById('coverImageUpload')?.addEventListener('change', ...);
    
    // Botões de imagens internas (delegação)
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('internalImageUpload')) { ... }
    });
}

// Upload individual
async function handleImageUpload(file, type, targetInput) {
    // 1. Validação
    // 2. Criação do uploader
    // 3. Upload
    // 4. Preenchimento do campo
    // 5. Feedback
}
```

#### **3. form-style.css** (estilos)

```css
/* Botão principal (capa) */
.btn-upload {
    background: linear-gradient(135deg, #EB7A3D 0%, #d4692e 100%);
    box-shadow: 0 4px 12px rgba(235, 122, 61, 0.3);
    text-transform: uppercase;
    /* + animações hover */
}

/* Botão pequeno (internas) */
.btn-upload-small {
    border: 2px solid #EB7A3D;
    background: rgba(235, 122, 61, 0.15);
    /* + tooltip hover */
}

/* Estados de feedback */
.upload-progress { color: #EB7A3D; animation: pulse; }
.upload-success { color: #4ade80; }
.upload-error { color: #ef4444; animation: shake; }
```

### **GitHub API Endpoints Utilizados**

#### **1. Criar Repositório**
```http
POST https://api.github.com/user/repos
Authorization: token {GITHUB_TOKEN}
Content-Type: application/json

{
  "name": "blog-images",
  "description": "Armazenamento de imagens do blog",
  "private": false,
  "auto_init": true
}
```

#### **2. Upload de Arquivo**
```http
PUT https://api.github.com/repos/{owner}/blog-images/contents/posts/{slug}/{filename}
Authorization: token {GITHUB_TOKEN}
Content-Type: application/json

{
  "message": "Upload: {filename}",
  "content": "{BASE64_CONTENT}"
}
```

#### **3. Verificar Repositório**
```http
GET https://api.github.com/repos/{owner}/blog-images
Authorization: token {GITHUB_TOKEN}
```

---

## 🐛 TROUBLESHOOTING

### ❌ **"Token não configurado"**

**Problema:** Token ausente no localStorage

**Solução:**
```javascript
// No console do navegador (F12)
localStorage.setItem('github_token', 'ghp_XXXXXXXXXXXXXXXXXXXXX');
location.reload();
```

---

### ❌ **"Erro ao criar repositório: 422"**

**Problema:** Repositório `blog-images` já existe

**Solução:** 
- Normal! O sistema detecta e usa o existente
- Se persistir, verifique permissões do token

---

### ❌ **"Imagem muito grande"**

**Problema:** Arquivo > 10MB

**Solução:**
- Sistema otimiza automaticamente
- Se falhar, reduza qualidade da imagem original
- Use ferramentas como TinyPNG antes do upload

---

### ❌ **"Upload falhou - Network error"**

**Problema:** Limite de rate do GitHub (5000 req/hora)

**Solução:**
- Aguarde 1 minuto e tente novamente
- Verifique conexão com internet
- Teste: `fetch('https://api.github.com/rate_limit')`

---

### ❌ **"URL não preenche automaticamente"**

**Problema:** JavaScript não encontra campo

**Solução:**
1. Abra console (F12) e procure erros
2. Verifique se IDs estão corretos:
   - `coverImage` (campo da capa)
   - `coverImageUpload` (botão da capa)
   - `authorAvatar` (campo do avatar) ⭐
   - `avatarUpload` (botão do avatar) ⭐
3. Limpe cache (Ctrl+Shift+Delete)

---

### ❓ **"Avatar não carrega automaticamente"** ⭐ NOVO

**Problema:** Avatar não aparece ao abrir página

**Solução:**
1. Verifique se já fez upload do avatar antes
2. Abra console e veja se há mensagem: `"✅ Avatar encontrado"`
3. Verifique se o repositório `blog-images` existe
4. Teste manualmente:
   ```javascript
   const uploader = initUploader();
   uploader.getAvatarUrl().then(url => console.log(url));
   ```

---

### ❓ **"Como atualizar o avatar?"** ⭐ NOVO

**Problema:** Quero trocar a foto do avatar

**Solução:**
1. Clique em **"📤 UPLOAD AVATAR"** normalmente
2. Selecione nova imagem
3. Sistema detecta que já existe e sobrescreve automaticamente
4. URL continua a mesma (`avatar.jpg`)
5. ✅ Todos os posts usarão novo avatar automaticamente!

---

### ❓ **"Avatar aparece em todos os posts?"** ⭐ NOVO

**Resposta:** SIM! 🎉

- Avatar é salvo como `avatar.jpg` na raiz do repositório
- Não é vinculado a nenhum post específico
- URL permanente: `https://raw.githubusercontent.com/{user}/blog-images/main/avatar.jpg`
- Aparece automaticamente em TODOS os posts (novos e antigos)
- Para mudar, basta fazer upload de nova imagem

---

### ✅ **Verificar Estado do Sistema**

Execute no console:

```javascript
// 1. Token
console.log('Token:', localStorage.getItem('github_token') ? '✅' : '❌');

// 2. Classe uploader
console.log('Uploader:', typeof GitHubImageUploader !== 'undefined' ? '✅' : '❌');

// 3. Handlers
console.log('Handler Capa:', document.getElementById('coverImageUpload') ? '✅' : '❌');
console.log('Handler Avatar:', document.getElementById('avatarUpload') ? '✅' : '❌'); // ⭐

// 4. Rate limit
fetch('https://api.github.com/rate_limit', {
    headers: { 'Authorization': `token ${localStorage.getItem('github_token')}` }
})
.then(r => r.json())
.then(d => console.log('Rate Limit:', d.rate.remaining, '/', d.rate.limit));
```

---

## 🔄 REPLICAÇÃO PARA CLIENTES

### **CHECKLIST DE CONFIGURAÇÃO**

```markdown
- [ ] 1. Copiar arquivos:
      - scripts/github-image-uploader.js
      - Trechos de assets/js/form-script.js (handlers)
      - Estilos de assets/css/form-style.css
      - HTML de postin.html (botões)

- [ ] 2. Gerar token do cliente:
      - GitHub Settings → Developer settings → Personal access tokens
      - Scope: repo (full control)

- [ ] 3. Configurar token no navegador do cliente:
      localStorage.setItem('github_token', 'TOKEN_AQUI');

- [ ] 4. Testar upload:
      - Imagem de capa
      - Imagem interna
      - Verificar repositório blog-images criado

- [ ] 5. Documentar para o cliente:
      - Como gerar novo token se expirar
      - Onde encontrar imagens (GitHub → blog-images)
      - Como excluir imagens antigas
```

### **PERSONALIZAÇÃO POR CLIENTE**

#### **Mudar Nome do Repositório**

Em `github-image-uploader.js`:
```javascript
// Linha ~10
class GitHubImageUploader {
    constructor(token, username, repoName = 'imagens-cliente') { // ← Mude aqui
        this.token = token;
        this.username = username;
        this.repoName = repoName;
    }
}
```

#### **Mudar Estrutura de Pastas**

Em `github-image-uploader.js`, método `uploadImage`:
```javascript
// Linha ~60
const path = `assets/${postSlug}/${filename}`; // ← Mude estrutura aqui
```

#### **Ajustar Otimização**

Em `github-image-uploader.js`, método `optimizeImage`:
```javascript
// Linhas ~150-155
const MAX_WIDTH = 1920;   // ← Ajuste
const MAX_HEIGHT = 1080;  // ← Ajuste
const QUALITY = 0.85;     // ← Ajuste (0.0 a 1.0)
```

#### **Cores dos Botões**

Em `form-style.css`:
```css
.btn-upload {
    background: linear-gradient(135deg, #EB7A3D 0%, #d4692e 100%); /* ← Mude cores */
    box-shadow: 0 4px 12px rgba(235, 122, 61, 0.3); /* ← Ajuste sombra */
}

.btn-upload-small {
    border: 2px solid #EB7A3D; /* ← Mude cor da borda */
    color: #EB7A3D; /* ← Mude cor do texto */
}
```

---

## 📊 ESTATÍSTICAS E LIMITES

### **GitHub API Limits**

| Recurso | Autenticado | Não autenticado |
|---------|-------------|-----------------|
| Requests/hora | 5000 | 60 |
| Tamanho arquivo | 100 MB | - |
| Repositórios | Ilimitado | - |

### **Tamanhos Recomendados**

| Tipo | Dimensões Originais | Após Otimização | Tamanho Final |
|------|---------------------|-----------------|---------------|
| Capa | Qualquer | Max 1920x1080 | ~200-500 KB |
| Interna | Qualquer | Max 1920x1080 | ~150-400 KB |

### **Performance**

- ⏱️ **Upload típico:** 2-5 segundos
- 📦 **Compressão:** ~60-80% do tamanho original
- 🌐 **CDN GitHub:** Entrega global < 200ms

---

## 📝 CHANGELOG

### **v2.0.0** (27/02/2026) ⭐ MAJOR UPDATE
- ✨ **Sistema de Avatar Persistente** - Upload uma vez, usa sempre!
  - Avatar salvo como `avatar.jpg` na raiz do repositório
  - Auto-carregamento ao abrir página (`loadExistingAvatar()`)
  - Sobrescrita inteligente com SHA
  - Reutilização automática em todos os posts
- 🔄 Método `getAvatarUrl()` para buscar avatar existente
- 🔄 Método `getFile()` para buscar arquivos do repo
- 📦 Sistema completo com 650 linhas de código
- 📖 Documentação atualizada com seção de Avatar

### **v1.0.0** (27/02/2026)
- ✨ Sistema completo de upload implementado
- 🎨 Design dos botões melhorado (gradiente laranja)
- 🔄 Auto-criação do repositório blog-images
- ⚡ Otimização automática de imagens
- 📱 Suporte a múltiplas imagens internas
- 🎯 Feedback visual de progresso/sucesso/erro
- 📖 Documentação completa criada

---

## 🔗 REFERÊNCIAS

- **GitHub REST API:** https://docs.github.com/en/rest
- **FileReader API:** https://developer.mozilla.org/en-US/docs/Web/API/FileReader
- **Canvas API:** https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- **Base64 Encoding:** https://developer.mozilla.org/en-US/docs/Glossary/Base64

---

## 💡 DICAS AVANÇADAS

### **Upload Múltiplo (Batch)**

Para fazer upload de várias imagens de uma vez:

```javascript
async function uploadMultiple(files, postSlug) {
    const uploader = new GitHubImageUploader(
        localStorage.getItem('github_token'),
        'seu-usuario'
    );
    
    const results = await Promise.all(
        files.map((file, index) => 
            uploader.uploadImage(file, postSlug, `internal-${index + 1}`)
        )
    );
    
    return results;
}
```

### **Deletar Imagens Antigas**

```javascript
async function deleteImage(postSlug, filename) {
    const token = localStorage.getItem('github_token');
    const path = `posts/${postSlug}/${filename}`;
    
    // 1. Pegar SHA do arquivo
    const response = await fetch(
        `https://api.github.com/repos/${username}/blog-images/contents/${path}`,
        { headers: { Authorization: `token ${token}` } }
    );
    const data = await response.json();
    
    // 2. Deletar
    await fetch(
        `https://api.github.com/repos/${username}/blog-images/contents/${path}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: `token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Delete: ${filename}`,
                sha: data.sha
            })
        }
    );
}
```

### **Migrar Imagens Existentes**

Se você já tem imagens em outro lugar e quer migrar:

```javascript
async function migrateFromURL(imageUrl, postSlug, imageType) {
    // 1. Baixar imagem
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    
    // 2. Criar File object
    const file = new File([blob], `${imageType}.jpg`, { type: 'image/jpeg' });
    
    // 3. Upload
    const uploader = new GitHubImageUploader(
        localStorage.getItem('github_token'),
        'seu-usuario'
    );
    
    return await uploader.uploadImage(file, postSlug, imageType);
}
```

---

## 📧 SUPORTE

Se encontrar problemas:

1. ✅ Verifique o console do navegador (F12)
2. ✅ Confirme que o token tem permissão `repo`
3. ✅ Teste o rate limit da API
4. ✅ Verifique se os arquivos JS estão carregando
5. 📧 Entre em contato com suporte técnico

---

**🎉 Sistema pronto para uso! Bom upload!**
