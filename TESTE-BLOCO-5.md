# 🔍 GUIA DE TESTE - BLOCO 5 (LINKS)

## 📋 Passo a Passo para Testar

### 1️⃣ Abra o postin.html
- Abra o arquivo `postin.html` no navegador
- Pressione **F12** ou **Cmd+Option+I** para abrir o Console do DevTools

### 2️⃣ Preencha APENAS o essencial + BLOCO 5

#### Campos Obrigatórios Mínimos:
- **BLOCO 1:**
  - Título Principal (H1): `Teste de Links`
  - Slug: `teste-links`
  - Categoria: `Testes`
  - Autor: `Bruno`
  
- **BLOCO 2:**
  - Palavra-chave Principal: `teste`
  - Meta Title: `Teste`
  - Meta Description: `Teste de links`
  
- **BLOCO 5 - LINKS (O QUE ESTAMOS TESTANDO):**
  - **Link Interno 1:**
    - URL: `https://exemplo.com/post1`
    - Anchor: `Artigo Relacionado 1`
  
  - **Link Interno 2:**
    - URL: `https://exemplo.com/post2`
    - Anchor: `Artigo Relacionado 2`
  
  - **Link Externo 1:**
    - URL: `https://google.com`
    - Anchor: `Google`
  
  - **Link Externo 2:**
    - URL: `https://github.com`
    - Anchor: `GitHub`

- **BLOCO 6:**
  - Tags: `teste, links`

### 3️⃣ Clique em "👁️ Visualizar Preview"

### 4️⃣ Verifique o Console

Você DEVE ver estes logs:

```
========================================
🔍 DEBUG PREVIEW - BLOCO 5 LINKS
========================================
📦 formData completo: {internalLinks: Array(2), externalLinks: Array(2), ...}
🔗 formData.internalLinks: [{url: "https://exemplo.com/post1", anchor: "Artigo Relacionado 1"}, ...]
🌐 formData.externalLinks: [{url: "https://google.com", anchor: "Google"}, ...]
========================================
🔗 generateLinksSection chamada com: {internalLinks: Array(2), externalLinks: Array(2)}
🔗 Verificação: {hasInternalLinks: true, hasExternalLinks: true}
📌 Links internos válidos: [{...}, {...}]
🌐 Links externos válidos: [{...}, {...}]
✅ HTML de links gerado, tamanho: 1234
```

### 5️⃣ Verifique no Preview Visual

Na página de preview, você DEVE ver:

```
[Conclusão do post]

━━━━━━━━━━━━━━━━━━━━━━━━
🔗 Links Úteis
━━━━━━━━━━━━━━━━━━━━━━━━

📌 Artigos Relacionados
  → Artigo Relacionado 1
  → Artigo Relacionado 2

🌐 Recursos Externos
  🔗 Google ↗
  🔗 GitHub ↗

━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🚨 Se NÃO APARECER:

### Verifique no Console:

1. **Se aparecer:** `⚠️ Nenhum link encontrado, retornando vazio`
   - **Problema:** Os links não estão sendo coletados do formulário
   - **Solução:** Verifique se preencheu os campos corretamente

2. **Se aparecer:** `<!-- LINKS SECTION: EMPTY (no links provided) -->`
   - **Problema:** O código detectou que não há links
   - **Solução:** Adicione links nos campos do BLOCO 5

3. **Se NÃO aparecer nenhum log de generateLinksSection:**
   - **Problema:** A função não está sendo chamada
   - **Solução:** Me avise e vou investigar o fluxo

4. **Se aparecer erro de JavaScript:**
   - **Problema:** Há um erro no código
   - **Solução:** Copie o erro completo e me envie

---

## 📝 Checklist de Debug:

- [ ] Abriu o Console (F12)
- [ ] Preencheu o BLOCO 5 com links
- [ ] Clicou em "Visualizar Preview"
- [ ] Verificou os logs no Console
- [ ] Procurou a seção "🔗 Links Úteis" no preview
- [ ] Verificou se há comentário HTML `<!-- LINKS SECTION: EMPTY -->`

---

## 💡 Dica:

Use **Cmd+F** (Mac) ou **Ctrl+F** (Windows) para procurar por "Links Úteis" ou "LINKS SECTION" no código-fonte da página de preview (Cmd+U ou Ctrl+U).

---

## 📞 Me envie:

Se não funcionar, me envie uma screenshot do:
1. **Console do navegador** (com os logs)
2. **Campos do BLOCO 5** preenchidos
3. **Preview** onde deveria aparecer os links
