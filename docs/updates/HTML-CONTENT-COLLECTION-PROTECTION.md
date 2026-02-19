# 🔒 Proteção: Coleta de Conteúdo HTML - Auto-Preenchimento

## ⚠️ CRITICAL: NÃO MODIFICAR SEM LER ESTE DOCUMENTO

Este documento descreve a lógica crítica de coleta de conteúdo HTML no auto-preenchimento do formulário.

---

## 📋 Problema Resolvido

**Situação anterior:** O campo "Conteúdo Principal" capturava apenas o primeiro `<h2>`, perdendo todo o resto do HTML.

**Causa:** A lógica parava de coletar HTML prematuramente ao encontrar linhas vazias ou outros campos.

**Solução:** Sistema de coleta contínua que só para ao encontrar explicitamente "Conclusão:" ou "Conclusion:".

---

## 🏗️ Arquitetura da Solução

### Arquivo Modificado
- **`assets/js/form-script.js`** (linhas ~2000-2280)

### Componentes Principais

#### 1. Flag de Controle
```javascript
let isCollectingHTML = false;
```
**Propósito:** Controla o estado de coleta de conteúdo HTML.  
**⚠️ NUNCA:** Modificar esta flag sem entender todo o fluxo.

#### 2. Detecção de HTML
```javascript
const hasHTML = /<(h[1-6]|p|ul|ol|li|div|span|strong|em|a)\b[^>]*>/i.test(line);
```
**Propósito:** Identifica se uma linha contém tags HTML.  
**Tags suportadas:** h1-h6, p, ul, ol, li, div, span, strong, em, a

#### 3. Início da Coleta
```javascript
if (hasHTML && !isCollectingHTML) {
    currentField = 'conteúdo principal';
    currentValue = line;
    isCollectingHTML = true;
    continue;
}
```
**Trigger:** Primeira linha com tag HTML detectada.  
**Ação:** Inicia coleta, define campo como "conteúdo principal".

#### 4. Continuação da Coleta
```javascript
if (hasHTML && isCollectingHTML) {
    currentValue += '\n' + line;
    continue;
}
```
**Propósito:** Adiciona linhas HTML subsequentes.  
**⚠️ CRITICAL:** Este bloco SEMPRE adiciona, sem condições extras.

#### 5. Coleta de Linhas Não-HTML
```javascript
if (isCollectingHTML) {
    // Verifica se é "Conclusão:"
    if (isConclusionField) {
        // Salva e para coleta
    }
    
    // Adiciona QUALQUER linha (texto puro, vazias, etc)
    currentValue += '\n' + line;
    continue;
}
```
**Propósito:** Captura texto puro entre tags, linhas vazias, etc.  
**⚠️ CRITICAL:** Necessário para preservar formatação HTML completa.

#### 6. Fim da Coleta
```javascript
const isConclusionField = (lowerLine.startsWith('conclus') || 
                           lowerLine.startsWith('conclusion')) && 
                           line.includes(':');
```
**Trigger único:** Linha que começa com "Conclusão:" ou "Conclusion:".  
**Ação:** Salva TODO o conteúdo coletado e desativa flag.

---

## 🛡️ Proteções Implementadas

### 1. Validação Automática
Após salvar, o sistema valida:
- ✅ Tamanho do conteúdo (alerta se < 100 caracteres)
- ✅ Presença de tags HTML esperadas
- ✅ Número de linhas capturadas

### 2. Logs Detalhados
Console mostra:
- 🎨 Início da coleta (linha onde detectou HTML)
- ➕ Cada linha HTML adicionada
- 📝 Cada linha de texto adicionada
- ✅ Confirmação de salvamento com estatísticas
- 📦 Primeiros 200 caracteres do conteúdo

### 3. Salvamento de Segurança
Se o loop terminar sem encontrar "Conclusão:", o sistema:
- ⚠️ Detecta e avisa no console
- 💾 Salva o conteúdo coletado até aquele ponto
- 📊 Mostra total de caracteres capturados

---

## 🚫 O QUE NÃO FAZER

### ❌ Nunca Adicionar Condições Extras
```javascript
// ❌ ERRADO - Vai quebrar a coleta
if (hasHTML && line.length > 10) {
    currentValue += '\n' + line;
}
```

```javascript
// ✅ CORRETO - Sempre adiciona
if (hasHTML && isCollectingHTML) {
    currentValue += '\n' + line;
    continue;
}
```

### ❌ Nunca Parar Coleta Prematuramente
```javascript
// ❌ ERRADO - Vai capturar só parte do HTML
if (isCollectingHTML && line.includes('Link')) {
    isCollectingHTML = false;
}
```

```javascript
// ✅ CORRETO - Só para em "Conclusão:"
if (isConclusionField) {
    isCollectingHTML = false;
}
```

### ❌ Nunca Pular Linhas Durante Coleta
```javascript
// ❌ ERRADO - Vai perder linhas vazias
if (isCollectingHTML && line) {
    currentValue += '\n' + line;
}
```

```javascript
// ✅ CORRETO - Adiciona TODAS as linhas
if (isCollectingHTML) {
    currentValue += '\n' + line;
}
```

---

## 📊 Fluxo de Execução

```
1. Usuário cola texto → PRÉ-PROCESSAMENTO (quebra HTML inline)
                        ↓
2. Loop por cada linha → Pula separadores (se não coletando)
                        ↓
3. Detecta HTML? → SIM → Inicia coleta (flag = true)
                → NÃO → Continua processando
                        ↓
4. Durante coleta → Adiciona TODAS as linhas
                  → Logs detalhados
                  → Continua até "Conclusão:"
                        ↓
5. Encontrou "Conclusão:" → Salva TODO o conteúdo
                          → Desativa flag
                          → Valida resultado
                        ↓
6. Fim do loop → Se ainda coletando, salva de segurança
               → Mostra estatísticas
               → Validação final
```

---

## 🧪 Como Testar

### Teste 1: Conteúdo HTML Completo
```html
Conteúdo Principal:

<h2>Seção 1</h2>
<p>Parágrafo 1</p>

<h2>Seção 2</h2>
<p>Parágrafo 2</p>

Conclusão:
Texto final aqui
```

**Esperado:** Todas as 5 linhas HTML capturadas.

### Teste 2: HTML com Linhas Vazias
```html
Conteúdo Principal:

<h2>Título</h2>

<p>Texto</p>

Conclusão:
```

**Esperado:** Preserva linhas vazias entre tags.

### Teste 3: HTML em Linha Única (da IA)
```html
Conteúdo Principal: <h2>Título</h2><p>Texto</p><h3>Sub</h3>
```

**Esperado:** Pré-processador quebra em linhas separadas, coleta captura tudo.

---

## 🔍 Debug

### Checklist se algo não funcionar:

1. ✅ Abriu o Console (F12)?
2. ✅ Vê a mensagem "🎨 HTML detectado na linha X"?
3. ✅ Vê múltiplas mensagens "➕ HTML linha" ou "📝 Texto linha"?
4. ✅ Vê a mensagem "✅ Conteúdo HTML completo salvo"?
5. ✅ A validação mostra tamanho > 100 caracteres?
6. ✅ Campo "Conteúdo Principal" no formulário está preenchido?

**Se qualquer resposta for NÃO:** Copie os logs do console e investigue.

---

## 📅 Histórico

**Data:** 19/02/2026  
**Problema:** Conteúdo Principal capturando apenas primeiro `<h2>`  
**Solução:** Sistema de coleta contínua com flag de controle  
**Status:** ✅ Testado e funcionando  
**Desenvolvedor:** GitHub Copilot

---

## ⚠️ AVISO FINAL

**ESTE CÓDIGO É CRÍTICO PARA O FUNCIONAMENTO DO AUTO-PREENCHIMENTO.**

Qualquer modificação deve:
1. Ser testada com múltiplos formatos de HTML
2. Validar no Console que todos os logs aparecem corretamente
3. Confirmar que campo "Conteúdo Principal" recebe TODO o HTML
4. Documentar mudanças neste arquivo

**Em caso de dúvida, NÃO MODIFICAR. Consulte este documento primeiro.**

---

## 🔗 Arquivos Relacionados

- **Código principal:** `assets/js/form-script.js` (linhas 2000-2280)
- **Documentação:** `docs/updates/HTML-INLINE-CORRECAO.md`
- **Documentação:** `docs/updates/HTML-COMPLETO-CORRECAO.md`
- **Este arquivo:** `docs/updates/HTML-CONTENT-COLLECTION-PROTECTION.md`
