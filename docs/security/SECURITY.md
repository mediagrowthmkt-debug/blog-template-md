# 🔒 Segurança do Sistema de Blog

## Proteções Implementadas

### 1. XSS (Cross-Site Scripting)

#### Sanitização de Texto
Todos os inputs de texto são escapados antes de serem inseridos no HTML:

```javascript
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

**Protege contra**: Injeção de HTML e JavaScript em campos de texto

#### Sanitização de URLs
URLs são validadas para prevenir protocolos maliciosos:

```javascript
const sanitizeUrl = (url) => {
    const dangerousProtocols = /^(\s*)(javascript|data|vbscript|file|about):/i;
    if (dangerousProtocols.test(url)) {
        return '';
    }
    // Permite apenas http, https, mailto, e URLs relativas
    if (!/^(https?:\/\/|mailto:|\/|#)/i.test(url)) {
        return '';
    }
    return url;
};
```

**Protege contra**: JavaScript injection via URLs (javascript:, data:, etc.)

#### Sanitização de Conteúdo HTML
O conteúdo do post permite HTML mas remove elementos perigosos:

```javascript
const sanitizeHtmlContent = (html) => {
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/data:text\/html/gi, '');
};
```

**Remove**:
- Tags `<script>`
- Event handlers (onclick, onload, etc.)
- JavaScript protocol handlers
- Data URIs maliciosos

### 2. Validação de Entrada

#### Validação no Formulário
- Campos obrigatórios marcados com `required`
- Limites de caracteres (maxlength)
- Tipos de input específicos (url, email, datetime-local)

#### Validação no JavaScript
- Contagem de palavras e caracteres em tempo real
- Verificação de formato de slug
- Validação de URLs antes de processar

### 3. CSP (Content Security Policy)

Para adicionar mais proteção, adicione no `<head>` dos seus posts:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' https:; 
               font-src 'self' https://fonts.googleapis.com; 
               connect-src 'self';">
```

## Boas Práticas Recomendadas

### 1. Hospedagem
- Use HTTPS sempre
- Mantenha servidor atualizado
- Configure cabeçalhos de segurança

### 2. Backup
- Faça backup regular dos posts
- Versione os arquivos HTML gerados
- Mantenha cópia dos assets

### 3. Validação no Servidor
Se integrar com backend:
- Valide todas as entradas no servidor
- Use bibliotecas de sanitização (DOMPurify, etc.)
- Implemente rate limiting

### 4. Autenticação
Se adicionar área administrativa:
- Use autenticação forte
- Implemente CSRF tokens
- Adicione logs de auditoria

## Ferramentas de Teste

### Snyk Code
Usado para detectar vulnerabilidades no código:

```bash
# Escanear código JavaScript
snyk code test /caminho/para/BLOGS
```

### OWASP ZAP
Para testar XSS e outras vulnerabilidades web:
1. Baixe em https://www.zaproxy.org/
2. Configure proxy para interceptar tráfego
3. Execute scan automático

### Browser DevTools
Teste no console do navegador:

```javascript
// Teste XSS no título
document.querySelector('.post-title').innerHTML = '<script>alert("XSS")</script>';

// Deve não executar script (texto é escapado)
```

## Atualizações de Segurança

### Checklist Periódico
- [ ] Atualizar bibliotecas JavaScript
- [ ] Revisar código com Snyk
- [ ] Testar inputs maliciosos
- [ ] Verificar logs do servidor
- [ ] Atualizar documentação

### Como Reportar Vulnerabilidades

Se encontrar uma vulnerabilidade de segurança:

1. **NÃO** divulgue publicamente
2. Envie email para: security@SEU-DOMINIO.com
3. Inclua:
   - Descrição da vulnerabilidade
   - Passos para reproduzir
   - Impacto potencial
   - Sugestão de correção (se tiver)

### Histórico de Correções

#### v1.0.0 (Janeiro 2026)
- ✅ Implementada sanitização de HTML
- ✅ Implementada validação de URLs
- ✅ Removidos event handlers inline
- ✅ Adicionado escape de caracteres especiais
- ✅ Proteção contra JavaScript injection

## Limitações Conhecidas

### 1. Client-Side Only
Este sistema roda apenas no navegador. Considere:
- Adicionar validação server-side se integrar com backend
- Implementar autenticação se necessário

### 2. HTML Content
Posts permitem HTML no conteúdo. Portanto:
- Apenas usuários confiáveis devem criar posts
- Considere adicionar preview com sandbox
- Valide conteúdo antes de publicar

### 3. Storage
Posts são baixados como arquivos. Para produção:
- Implemente upload automático
- Adicione sistema de aprovação
- Mantenha logs de modificações

## Recursos Adicionais

### Leitura Recomendada
- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy](https://content-security-policy.com/)

### Ferramentas
- [Snyk](https://snyk.io/) - Análise de vulnerabilidades
- [DOMPurify](https://github.com/cure53/DOMPurify) - Sanitização HTML
- [helmet.js](https://helmetjs.github.io/) - Headers de segurança

---

🔒 **Lembre-se**: Segurança é um processo contínuo, não um estado final. Mantenha-se atualizado!

Última atualização: Janeiro 2026
