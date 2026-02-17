# Drafts

Esta pasta é usada para colocar novos posts em HTML antes de serem publicados.

## Como usar:

1. Gere seu post no formulário
2. Baixe o arquivo HTML
3. Coloque nesta pasta `drafts/`
4. Faça commit e push
5. GitHub Actions moverá automaticamente para `posts/`

## Automação

O workflow `.github/workflows/publish-post.yml` detecta novos arquivos aqui e move para `posts/` automaticamente.
