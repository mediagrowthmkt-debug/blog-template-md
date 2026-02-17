# 🔧 Teste de Imagens Internas - Google Drive

## ✅ Correções Aplicadas

1. **Adicionada visualização de imagens internas no preview**
2. **Conversão automática de URLs do Google Drive**
3. **Logs de debug no console para rastreamento**

---

## 🧪 Como Testar

### Passo 1: Abrir o Sistema
1. Abra o arquivo: `[CAMINHO-DO-SEU-BLOG]/index.html`
2. Abra o Console do navegador (F12 ou Cmd+Option+I no Mac)

### Passo 2: Preencher o Formulário
1. Preencha os campos obrigatórios (Título, Categoria, etc)
2. Na seção **"🖼️ BLOCO 3: Imagens"**
3. Clique em **"+ Adicionar Imagem"** nas Imagens Internas
4. Cole um link do Google Drive no formato:
   ```
   https://drive.google.com/file/d/1ABC123XYZ/view?usp=sharing
   ```

### Passo 3: Verificar Preview
1. Clique no botão **"👁️ Pré-visualizar"**
2. As imagens internas devem aparecer em uma seção separada
3. Verifique o console para mensagens de debug:
   - `✅ Google Drive URL convertida:` - mostra a conversão
   - `📸 Imagens Internas no Preview:` - mostra o array de imagens
   - `🔗 URLs convertidas:` - mostra as URLs finais

---

## 🐛 Debug no Console

Se as imagens não aparecerem, verifique:

### 1. URLs sendo coletadas?
```javascript
📸 Imagens Internas no Preview: [{url: "...", alt: "..."}, ...]
```

### 2. Conversão do Google Drive funcionando?
```javascript
✅ Google Drive URL convertida: https://drive.google.com/file/d/... -> https://drive.google.com/uc?export=view&id=...
```

### 3. Imagem não carrega?
- Verifique se o arquivo no Google Drive está com **compartilhamento público**
- Clique com botão direito na imagem no preview > "Inspecionar"
- Veja se o atributo `src` está correto

---

## 📋 Formatos Suportados

### ✅ Aceitos (conversão automática):
```
https://drive.google.com/file/d/FILE_ID/view?usp=sharing
https://drive.google.com/open?id=FILE_ID
https://drive.google.com/uc?id=FILE_ID
```

### ✅ Outros URLs (passam direto):
```
https://exemplo.com/imagem.jpg
https://i.imgur.com/imagem.png
```

---

## 🎯 Resultado Esperado

No preview, você verá:

```
┌─────────────────────────────┐
│  [Título do Post]           │
│  [Imagem de Capa]           │
│  [Introdução]               │
│  [Conteúdo]                 │
│                             │
│  📸 Imagens Internas:       │
│  ┌───────────────────┐      │
│  │ [Imagem 1]        │      │
│  │ Alt text...       │      │
│  └───────────────────┘      │
│  ┌───────────────────┐      │
│  │ [Imagem 2]        │      │
│  │ Alt text...       │      │
│  └───────────────────┘      │
│                             │
│  [Conclusão]                │
│  [Tags]                     │
│  [CTA]                      │
└─────────────────────────────┘
```

---

## ⚠️ Importante: Permissões do Google Drive

Para as imagens funcionarem, o arquivo no Google Drive precisa:

1. **Compartilhamento público ativado**
2. **"Qualquer pessoa com o link pode visualizar"**

### Como configurar:
1. Clique com botão direito no arquivo no Google Drive
2. Escolha **"Compartilhar"**
3. Em **"Acesso geral"**, selecione **"Qualquer pessoa com o link"**
4. Permissão: **"Leitor"**
5. Copie o link

---

## 📞 Suporte

Se ainda não funcionar:
1. Tire um print do console (F12)
2. Copie as mensagens de erro
3. Verifique se o link do Google Drive está correto
