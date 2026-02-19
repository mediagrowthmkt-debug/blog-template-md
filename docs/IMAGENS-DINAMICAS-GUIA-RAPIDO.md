# 🚀 Guia Rápido: Imagens Dinâmicas no Blog

## Como Usar

### 1️⃣ No Formulário
1. Preencha o conteúdo principal (`contentBody`)
2. Adicione suas imagens internas usando os botões **"+ Adicionar Imagem"**
3. Para cada imagem:
   - **URL:** Link da imagem (Unsplash, Google Drive, etc.)
   - **Alt Text:** Descrição da imagem (importante para SEO!)

### 2️⃣ Preview
- Clique em **"👁️ Pré-visualizar Post"**
- As imagens aparecerão **distribuídas ao longo do conteúdo**
- Layouts alternam automaticamente: esquerda → direita → largura total

### 3️⃣ Publicar
- Clique em **"🚀 Gerar Post HTML"**
- O arquivo final terá as imagens integradas no conteúdo
- Faça upload para GitHub e pronto!

---

## 📐 Os Três Layouts

### 🔹 Image Left (Esquerda)
```
┌──────┐ Lorem ipsum dolor sit amet,
│ IMG  │ consectetur adipiscing elit.
│      │ Sed do eiusmod tempor incid
└──────┘ idunt ut labore et dolore.
```
- Imagem à esquerda (45% largura)
- Texto flui ao redor

### 🔹 Image Right (Direita)
```
Lorem ipsum dolor sit amet,  ┌──────┐
consectetur adipiscing elit. │ IMG  │
Sed do eiusmod tempor incid  │      │
idunt ut labore et dolore.   └──────┘
```
- Imagem à direita (45% largura)
- Texto flui ao redor

### 🔹 Image Full (Largura Total)
```
──────────────────────────────────
│                                │
│           IMAGEM 16:9          │
│                                │
──────────────────────────────────
```
- Ocupa 100% da largura
- Formato panorâmico (16:9)

---

## 📱 Responsivo

### Desktop (> 768px)
- 3 layouts diferentes
- Texto flui ao redor das imagens

### Mobile (< 768px)
- Todas as imagens ficam 100% largura
- Empilhadas verticalmente
- Melhor legibilidade

---

## 💡 Dicas

### ✅ Boas Práticas
- Use **3-5 imagens** por post (ideal)
- Escreva **alt text descritivo** (SEO!)
- Use imagens de **alta qualidade**
- Teste sempre o **preview** antes de publicar

### ❌ Evite
- Muitas imagens seguidas (sem texto entre elas)
- Alt text vazio ou genérico
- Imagens muito pequenas (< 800px largura)
- URLs inválidas ou quebradas

---

## 🎨 Exemplos de Alt Text

### ❌ Ruim
```
Alt: "imagem1"
Alt: "foto"
Alt: "IMG_1234"
```

### ✅ Bom
```
Alt: "Cozinha moderna com bancada de granito preto"
Alt: "Processo de instalação de mármore em banheiro"
Alt: "Comparação antes e depois de reforma de cozinha"
```

---

## 🔧 Personalização Avançada

### Forçar Layout Específico
Edite manualmente o HTML gerado:
```html
<!-- Forçar image-full -->
<figure class="internal-image image-full">
    <img src="..." alt="...">
</figure>

<!-- Forçar image-left -->
<figure class="internal-image image-left">
    <img src="..." alt="...">
</figure>
```

### Adicionar Imagem Manualmente no Conteúdo
No campo `contentBody`, adicione diretamente:
```html
<h2>Meu Título</h2>
<p>Texto antes da imagem...</p>

<figure class="internal-image image-right">
    <img src="https://exemplo.com/foto.jpg" 
         alt="Descrição da imagem" 
         loading="lazy">
    <figcaption>Legenda opcional</figcaption>
</figure>

<p>Texto depois da imagem...</p>
```

---

## 🐛 Troubleshooting

### Imagem não aparece
- ✅ Verifique se a URL está correta
- ✅ Teste a URL diretamente no navegador
- ✅ Certifique-se que não há espaços extras
- ✅ Use URLs diretas (não páginas HTML)

### Imagem aparece no final (não distribuída)
- ✅ Certifique-se que há conteúdo suficiente (mínimo 3-4 parágrafos)
- ✅ Verifique se o `contentBody` tem tags HTML (`<h2>`, `<p>`, etc.)
- ✅ Confira o console do navegador (F12) para erros

### Layout quebrado no mobile
- ✅ Teste com DevTools em modo responsivo
- ✅ Verifique se o CSS `blog-post.css` está carregando
- ✅ Certifique-se que o viewport meta tag está presente

---

## 📊 Quantas Imagens Usar?

### Por Tamanho de Post

| Tamanho do Post | Palavras | Imagens Recomendadas |
|----------------|----------|----------------------|
| Curto          | 300-500  | 1-2 imagens         |
| Médio          | 500-1000 | 3-4 imagens         |
| Longo          | 1000-2000| 5-7 imagens         |
| Extenso        | 2000+    | 8-10 imagens        |

---

## 🎯 Checklist Antes de Publicar

- [ ] Preview testado e aprovado
- [ ] Todas as imagens carregam corretamente
- [ ] Alt text preenchido em todas as imagens
- [ ] Conteúdo revisado (gramática, ortografia)
- [ ] Testado em mobile (responsivo)
- [ ] Links funcionando (CTA, tags, etc.)
- [ ] Meta description otimizada
- [ ] Keywords relevantes incluídas

---

## 🆘 Suporte

Encontrou algum problema? Verifique:

1. **Console do Navegador** (F12 → Console)
2. **Documentação Completa:** `docs/updates/DYNAMIC-IMAGES-UPDATE.md`
3. **Guia de Layouts:** `docs/guides/IMAGE-LAYOUTS-GUIDE.md`

---

**Última atualização:** 19 de fevereiro de 2026
