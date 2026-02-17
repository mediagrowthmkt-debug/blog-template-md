# 🎨 BLOG TEMPLATE - Sistema Completo de Blog Estático

Este é um **template genérico e reutilizável** do sistema de blog desenvolvido originalmente para um cliente específico, mas agora completamente limpo e pronto para ser usado em **qualquer projeto**.

## ⚠️ IMPORTANTE - Antes de Usar

Este template foi **totalmente despersonalizado**. Todas as referências à empresa original foram removidas e substituídas por placeholders genéricos que você deve configurar:

### 🔄 Placeholders para Substituir

Antes de começar, faça busca e substituição global por:

| Placeholder | Substituir por |
|------------|----------------|
| `SEU-USUARIO-GITHUB` | Seu usuário do GitHub |
| `SEU-BLOG-REPO` | Nome do repositório do blog |
| `SEU-DOMINIO.com` | Domínio do seu cliente |
| `SUA EMPRESA` | Nome da empresa do cliente |
| `contato@SEU-DOMINIO.com` | Email de contato |
| `[CAMINHO-DO-SEU-BLOG]` | Caminho local do projeto |

### 📋 Como Fazer a Substituição

```bash
# Entre na pasta do seu novo projeto
cd /caminho/do/seu/novo/blog

# Substitua os placeholders (exemplo)
find . -type f \( -name "*.md" -o -name "*.html" -o -name "*.js" \) -exec sed -i '' 's/SEU-USUARIO-GITHUB/seu-usuario/g' {} \;
find . -type f \( -name "*.md" -o -name "*.html" -o -name "*.js" \) -exec sed -i '' 's/SEU-BLOG-REPO/nome-do-repo/g' {} \;
find . -type f \( -name "*.md" -o -name "*.html" -o -name "*.js" \) -exec sed -i '' 's/SEU-DOMINIO\.com/seudominio.com/g' {} \;
find . -type f \( -name "*.md" -o -name "*.html" -o -name "*.js" \) -exec sed -i '' 's/SUA EMPRESA/Nome da Empresa/g' {} \;
```

## 📚 Documentação Incluída

O template inclui documentação completa organizada na pasta `docs/`:

### Guias de Início
- **docs/QUICK-START.md** - Início rápido
- **docs/ACESSO-RAPIDO.md** - Guia de acesso rápido
- **docs/QUICK-START-NEW-TEMPLATE.md** - Início rápido para novo template

### Guias de Funcionalidades
- **docs/guides/AUTO-PUBLISH-GUIDE.md** - Sistema de publicação automática
- **docs/guides/AUTO-SAVE-GUIDE.md** - Sistema de auto-save
- **docs/guides/IMAGE-LAYOUTS-GUIDE.md** - Layouts de imagens
- **docs/guides/GOOGLE-DRIVE-IMAGES-GUIDE.md** - Integração com Google Drive
- **docs/guides/GUIA-REPLICACAO-PROJETO.md** - Guia completo de replicação

### Documentação de Segurança
- **docs/security/** - Políticas e relatórios de segurança

### Histórico e Atualizações
- **docs/updates/** - Changelogs e implementações

📖 **Ver índice completo:** [`docs/INDEX.md`](docs/INDEX.md)

## 🚀 Próximos Passos

1. **Copie** este template para a pasta do seu novo projeto
2. **Substitua** todos os placeholders com os dados reais
3. **Leia** o arquivo `docs/guides/GUIA-REPLICACAO-PROJETO.md`
4. **Consulte** a estrutura completa em `ESTRUTURA.md`
5. **Explore** a documentação organizada em `docs/INDEX.md`
4. **Configure** o repositório GitHub
5. **Personalize** o design e conteúdo

## 💡 Características

- ✅ Sistema de blog totalmente estático (HTML/CSS/JS)
- ✅ Editor de posts integrado
- ✅ Auto-save com LocalStorage
- ✅ Integração com GitHub para hospedagem
- ✅ Integração com Google Drive para imagens
- ✅ Sistema de publicação automática (drafts → posts)
- ✅ Layouts de imagens responsivos
- ✅ SEO otimizado
- ✅ Totalmente documentado

## 📞 Suporte

Este é um template standalone. Para dúvidas sobre implementação, consulte os arquivos de documentação incluídos.

---

**Versão do Template:** 1.0  
**Última Atualização:** Fevereiro 2026  
**Licença:** Uso interno para projetos de clientes
