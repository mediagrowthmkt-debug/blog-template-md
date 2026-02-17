# 🖼️ Guia de Layouts de Imagens no Blog

Este guia explica como distribuir imagens no conteúdo do blog usando diferentes layouts.

## 📋 Layouts Disponíveis

### 1. Imagem à Esquerda (image-left)
Posiciona a imagem à esquerda do texto, que flui ao redor dela.

```html
<img src="url-da-imagem.jpg" alt="Descrição" class="image-left">
<p>Seu texto aqui continua ao lado da imagem...</p>
```

**Uso ideal:**
- Imagens verticais ou quadradas
- Quando você quer manter o fluxo de leitura
- Para ilustrar pontos específicos do texto

### 2. Imagem à Direita (image-right)
Posiciona a imagem à direita do texto, que flui ao redor dela.

```html
<img src="url-da-imagem.jpg" alt="Descrição" class="image-right">
<p>Seu texto aqui continua ao lado da imagem...</p>
```

**Uso ideal:**
- Complementar o texto sem interrompê-lo
- Destacar detalhes ou exemplos
- Variar o layout do artigo

### 3. Imagem Largura Total (image-full)
Exibe a imagem ocupando toda a largura disponível.

```html
<img src="url-da-imagem.jpg" alt="Descrição" class="image-full">
```

**Uso ideal:**
- Imagens panorâmicas
- Fotos de impacto visual
- Separar seções do artigo
- Imagem de capa ou hero

### 4. Grid de Imagens (image-grid)
Cria uma grade de imagens que se ajusta automaticamente.

```html
<div class="image-grid">
    <img src="imagem1.jpg" alt="Descrição 1">
    <img src="imagem2.jpg" alt="Descrição 2">
    <img src="imagem3.jpg" alt="Descrição 3">
    <img src="imagem4.jpg" alt="Descrição 4">
</div>
```

**Uso ideal:**
- Galeria de produtos
- Antes e depois
- Diferentes ângulos do mesmo projeto
- Portfolio de trabalhos

### 5. Clearfix
Limpa os floats quando necessário, para que o próximo conteúdo comece em uma nova linha.

```html
<img src="imagem.jpg" alt="Descrição" class="image-left">
<p>Texto que flui ao lado...</p>
<div class="clearfix"></div>
<h2>Próxima seção começa aqui</h2>
```

## 📝 Exemplo Completo no BLOCO 3

### Exemplo 1: Misturando Layouts

```html
<h2>Tipos de Granito para Cozinha</h2>

<img src="granito-preto.jpg" alt="Granito preto" class="image-left">
<p>O granito preto São Gabriel é uma das opções mais elegantes para cozinhas modernas. 
Sua cor profunda traz sofisticação ao ambiente e combina perfeitamente com armários claros.</p>
<p>Além disso, esse tipo de granito é extremamente resistente a manchas e riscos...</p>

<div class="clearfix"></div>

<img src="granito-branco.jpg" alt="Granito branco" class="image-right">
<p>Já o granito branco Dallas oferece luminosidade ao espaço. É perfeito para cozinhas 
pequenas que precisam parecer maiores e mais arejadas.</p>
<p>Sua manutenção é simples e o resultado estético é incomparável...</p>

<div class="clearfix"></div>

<h3>Galeria de Instalações</h3>
<div class="image-grid">
    <img src="cozinha1.jpg" alt="Cozinha com granito preto">
    <img src="cozinha2.jpg" alt="Cozinha com granito branco">
    <img src="cozinha3.jpg" alt="Cozinha com granito cinza">
    <img src="cozinha4.jpg" alt="Cozinha com granito marrom">
</div>

<h2>Processo de Instalação</h2>
<img src="instalacao-completa.jpg" alt="Processo completo de instalação" class="image-full">
<p>A imagem acima mostra o processo completo de instalação...</p>
```

### Exemplo 2: Artigo com 3-4 Imagens

```html
<h2>Passo a Passo da Instalação</h2>

<img src="passo1.jpg" alt="Medição do espaço" class="image-left">
<h3>1. Medição Precisa</h3>
<p>O primeiro passo é realizar medições exatas do espaço onde o granito será instalado...</p>
<div class="clearfix"></div>

<img src="passo2.jpg" alt="Preparação da base" class="image-right">
<h3>2. Preparação da Base</h3>
<p>Os armários devem estar perfeitamente nivelados e reforçados...</p>
<div class="clearfix"></div>

<h3>3. Instalação</h3>
<img src="processo-instalacao.jpg" alt="Processo de instalação" class="image-full">
<p>A instalação propriamente dita requer técnica e equipamentos profissionais...</p>

<img src="resultado-final.jpg" alt="Resultado final" class="image-right">
<h3>4. Acabamento Final</h3>
<p>Por fim, realizamos o acabamento e impermeabilização do granito...</p>
```

## 📱 Comportamento Responsivo

### Desktop
- `image-left`: 45% de largura, texto flui à direita
- `image-right`: 45% de largura, texto flui à esquerda
- `image-full`: 100% de largura
- `image-grid`: Grid automático (min 250px por coluna)

### Mobile (telas menores que 768px)
- Todas as imagens ficam com 100% de largura
- Layouts `image-left` e `image-right` se tornam full width
- Grid vira coluna única
- Melhor legibilidade em dispositivos móveis

## 🎨 Boas Práticas

### ✅ Faça
- Use alt text descritivo em todas as imagens
- Alterne entre diferentes layouts para variar o visual
- Use `clearfix` antes de novos títulos após imagens flutuantes
- Otimize imagens antes do upload (compressão)
- Mantenha proporções adequadas (16:9 para panorâmicas, 4:3 para standard)

### ❌ Evite
- Muitas imagens seguidas sem texto
- Imagens muito pequenas em `image-full`
- Esquecer o clearfix (texto pode ficar bagunçado)
- Imagens sem alt text (prejudica SEO e acessibilidade)
- Usar layouts de grid com apenas 1 ou 2 imagens

## 🚀 Dicas Avançadas

### Combinar com Blockquotes
```html
<img src="depoimento.jpg" alt="Cliente satisfeito" class="image-left">
<blockquote>
    "A instalação foi perfeita! Equipe profissional e resultado impecável."
    - Maria Silva, cliente desde 2023
</blockquote>
<div class="clearfix"></div>
```

### Seção de Galeria Completa
```html
<h2>Nossos Trabalhos Recentes</h2>
<div class="image-grid">
    <img src="projeto1.jpg" alt="Projeto residencial em São Paulo">
    <img src="projeto2.jpg" alt="Cozinha comercial em Miami">
    <img src="projeto3.jpg" alt="Banheiro luxuoso em Orlando">
    <img src="projeto4.jpg" alt="Área gourmet em Tampa">
    <img src="projeto5.jpg" alt="Bancada de escritório">
    <img src="projeto6.jpg" alt="Ilha de cozinha moderna">
</div>
```

### Destacar Imagem Importante
```html
<h2>O Resultado Final</h2>
<img src="antes.jpg" alt="Cozinha antes da reforma" class="image-left">
<img src="depois.jpg" alt="Cozinha depois da reforma" class="image-right">
<p>Compare o antes e depois da reforma completa desta cozinha. 
A transformação foi incrível!</p>
<div class="clearfix"></div>

<img src="resultado-destaque.jpg" alt="Foto de destaque do resultado" class="image-full">
```

## 📊 Quando Usar Cada Layout

| Situação | Layout Recomendado |
|----------|-------------------|
| Texto longo com ilustração | `image-left` ou `image-right` |
| Foto de impacto/hero | `image-full` |
| Portfolio/galeria | `image-grid` |
| Passo a passo tutorial | Alternar `image-left` e `image-right` |
| Comparação antes/depois | `image-left` + `image-right` lado a lado |
| Imagem panorâmica | `image-full` |
| Múltiplos produtos | `image-grid` |

## 🔧 Troubleshooting

### Problema: Texto não flui ao redor da imagem
**Solução:** Certifique-se de que a classe está escrita corretamente (`image-left` ou `image-right`)

### Problema: Próximo título aparece ao lado da imagem
**Solução:** Adicione `<div class="clearfix"></div>` antes do próximo título

### Problema: Grid não está alinhado
**Solução:** Verifique se todas as imagens estão dentro da `<div class="image-grid">`

### Problema: Layout quebrado no mobile
**Solução:** Os layouts já são responsivos automaticamente. Teste em diferentes dispositivos.

---

**Última atualização:** Janeiro 2026
**Versão:** 1.0
