/**
 * GitHub Actions Integration
 * Usa GitHub Actions para publicar posts (sem precisar de token pessoal)
 */

class GitHubActionsPublisher {
    constructor(config) {
        this.owner = config.owner; // SEU-USUARIO-GITHUB
        this.repo = config.repo;   // SEU-BLOG-REPO
        this.token = config.token || null; // Opcional: usa GITHUB_TOKEN automático
    }

    /**
     * Publicar post via GitHub Actions Workflow
     */
    async publishPost(slug, htmlContent) {
        try {
            // Encode HTML em base64
            const base64Content = btoa(unescape(encodeURIComponent(htmlContent)));
            
            // Disparar workflow
            const response = await this.triggerWorkflow(slug, base64Content);
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            
            // Retornar URL do post
            return `https://blog.SEU-DOMINIO.com/posts/${slug}.html`;
        } catch (error) {
            console.error('Erro ao publicar via GitHub Actions:', error);
            throw error;
        }
    }

    /**
     * Disparar workflow do GitHub Actions
     */
    async triggerWorkflow(slug, base64Content) {
        const url = `https://api.github.com/repos/${this.owner}/${this.repo}/actions/workflows/publish-post.yml/dispatches`;
        
        const headers = {
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        };
        
        // Se tiver token, usar; senão, workflow público
        if (this.token) {
            headers['Authorization'] = `token ${this.token}`;
        }
        
        return await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                ref: 'main',
                inputs: {
                    slug: slug,
                    content: base64Content
                }
            })
        });
    }

    /**
     * Verificar status do workflow
     */
    async getWorkflowStatus() {
        const url = `https://api.github.com/repos/${this.owner}/${this.repo}/actions/runs?per_page=1`;
        
        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };
        
        if (this.token) {
            headers['Authorization'] = `token ${this.token}`;
        }
        
        const response = await fetch(url, { headers });
        
        if (!response.ok) {
            throw new Error('Erro ao verificar status');
        }
        
        const data = await response.json();
        return data.workflow_runs[0];
    }
}

/**
 * Método Alternativo: Criar Issue que dispara Action
 * Mais simples, sem precisar de token
 */
class GitHubIssuePublisher {
    constructor(config) {
        this.owner = config.owner;
        this.repo = config.repo;
    }

    /**
     * Criar issue com conteúdo do post
     * GitHub Action pega a issue e cria o post automaticamente
     */
    async publishViaIssue(slug, htmlContent) {
        const url = `https://api.github.com/repos/${this.owner}/${this.repo}/issues`;
        
        // Criar issue com formato especial
        const issueBody = `
**[AUTO-PUBLISH]**

Slug: \`${slug}\`

\`\`\`html
${htmlContent}
\`\`\`
        `.trim();
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: `[BLOG POST] ${slug}`,
                body: issueBody,
                labels: ['blog-post', 'auto-publish']
            })
        });
        
        if (!response.ok) {
            throw new Error('Erro ao criar issue');
        }
        
        const issue = await response.json();
        
        // Aguardar 10 segundos para Action processar
        await new Promise(resolve => setTimeout(resolve, 10000));
        
        return {
            issueUrl: issue.html_url,
            postUrl: `https://blog.SEU-DOMINIO.com/posts/${slug}.html`
        };
    }
}

/**
 * Método 3: Email-to-GitHub (mais simples)
 * Envia email para GitHub que cria commit automaticamente
 */
function generateEmailPublishInstructions(slug, htmlContent) {
    const instructions = `
📧 PUBLICAR POR EMAIL

1. Copie o conteúdo abaixo
2. Envie email para: reply+AAAA...@reply.github.com
   (Você pode encontrar seu email único em: Settings > Emails > Keep email private)
3. Assunto: [SEU-BLOG-REPO] Add post: ${slug}
4. Corpo do email:

---

${htmlContent}

---

O GitHub criará o commit automaticamente!
    `.trim();
    
    return instructions;
}

// Exportar
window.GitHubActionsPublisher = GitHubActionsPublisher;
window.GitHubIssuePublisher = GitHubIssuePublisher;
window.generateEmailPublishInstructions = generateEmailPublishInstructions;
