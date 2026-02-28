/**
 * GitHub API Integration
 * Salva posts automaticamente no repositório via API
 */

class GitHubBlogPublisher {
    constructor(config) {
        this.owner = config.owner; // SEU-USUARIO-GITHUB
        this.repo = config.repo;   // SEU-BLOG-REPO
        this.token = config.token; // Personal Access Token
        this.branch = config.branch || 'main';
    }

    /**
     * Salvar post no GitHub
     */
    async savePost(slug, htmlContent) {
        const path = `posts/${slug}.html`;
        const message = `Add new blog post: ${slug}`;
        
        console.log(`📝 Salvando post no GitHub...`);
        console.log(`   Owner: ${this.owner}`);
        console.log(`   Repo: ${this.repo}`);
        console.log(`   Path: ${path}`);
        console.log(`   Branch: ${this.branch}`);
        
        try {
            // Verificar se arquivo já existe
            const existingFile = await this.getFile(path);
            
            if (existingFile) {
                console.log('📄 Arquivo já existe, atualizando...');
                // Atualizar arquivo existente
                return await this.updateFile(path, htmlContent, message, existingFile.sha);
            } else {
                console.log('📄 Criando novo arquivo...');
                // Criar novo arquivo
                return await this.createFile(path, htmlContent, message);
            }
        } catch (error) {
            console.error('❌ Erro ao salvar no GitHub:', error);
            console.error('   Detalhes completos:', error.message);
            throw error;
        }
    }

    /**
     * Verificar se arquivo existe
     */
    async getFile(path) {
        const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`;
        
        try {
            const response = await fetch(url, {
                headers: this.getHeaders()
            });
            
            if (response.status === 404) {
                return null; // Arquivo não existe
            }
            
            if (!response.ok) {
                throw new Error(`GitHub API error: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            if (error.message.includes('404')) {
                return null;
            }
            throw error;
        }
    }

    /**
     * Criar novo arquivo
     */
    async createFile(path, content, message) {
        const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`;
        
        console.log(`📤 PUT Request para: ${url}`);
        
        const response = await fetch(url, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({
                message: message,
                content: btoa(unescape(encodeURIComponent(content))), // Base64 encode
                branch: this.branch
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('❌ GitHub API Error:', error);
            throw new Error(`GitHub API error: ${error.message || response.status}`);
        }

        const result = await response.json();
        console.log('✅ Arquivo criado com sucesso!');
        console.log('   URL:', result.content?.html_url);
        return result;
    }

    /**
     * Atualizar arquivo existente
     */
    async updateFile(path, content, message, sha) {
        const url = `https://api.github.com/repos/${this.owner}/${this.repo}/contents/${path}`;
        
        console.log(`📤 PUT Request (UPDATE) para: ${url}`);
        console.log(`   SHA do arquivo: ${sha}`);
        
        const response = await fetch(url, {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify({
                message: message,
                content: btoa(unescape(encodeURIComponent(content))), // Base64 encode
                sha: sha, // SHA do arquivo existente
                branch: this.branch
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('❌ GitHub API Error (UPDATE):', error);
            throw new Error(`GitHub API error: ${error.message || response.status}`);
        }

        const result = await response.json();
        console.log('✅ Arquivo atualizado com sucesso!');
        console.log('   URL:', result.content?.html_url);
        return result;
    }

    /**
     * Headers para autenticação
     */
    getHeaders() {
        return {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json'
        };
    }

    /**
     * Obter URL pública do post
     */
    getPublicUrl(slug) {
        // GitHub Pages URL dinâmica baseada no repositório
        return `https://${this.owner}.github.io/${this.repo}/posts/${slug}.html`;
    }
}

/**
 * Configuração
 * IMPORTANTE: Guardar o token de forma segura!
 */
function initGitHubPublisher() {
    // Token deve ser configurado pelo usuário
    // Criar em: https://github.com/settings/tokens
    // Permissões: repo (full control)
    
    const token = localStorage.getItem('github_token');
    
    if (!token) {
        console.warn('⚠️ GitHub token não configurado');
        return null;
    }
    
    // Detecta automaticamente owner e repo do repositório atual
    return new GitHubBlogPublisher({
        owner: 'mediagrowthmkt-debug',
        repo: 'blog-template-md',
        token: token,
        branch: 'main'
    });
}

/**
 * Salvar token (primeira vez)
 */
function saveGitHubToken(token) {
    localStorage.setItem('github_token', token);
    console.log('✅ Token salvo com sucesso');
}

/**
 * Testar conexão com GitHub
 */
async function testGitHubConnection() {
    const publisher = initGitHubPublisher();
    
    if (!publisher) {
        throw new Error('Token não configurado');
    }
    
    try {
        // Testa fazendo uma requisição simples para verificar o repo
        const url = `https://api.github.com/repos/${publisher.owner}/${publisher.repo}`;
        
        const response = await fetch(url, {
            headers: publisher.getHeaders()
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Token inválido ou expirado');
            } else if (response.status === 404) {
                throw new Error('Repositório não encontrado');
            } else {
                const error = await response.json();
                throw new Error(error.message || `Erro ${response.status}`);
            }
        }
        
        const data = await response.json();
        console.log('✅ Conexão estabelecida com sucesso!');
        console.log('📦 Repositório:', data.full_name);
        console.log('🔗 URL:', data.html_url);
        
        return {
            success: true,
            repo: data.full_name,
            url: data.html_url,
            permissions: data.permissions
        };
        
    } catch (error) {
        console.error('❌ Erro ao testar conexão:', error);
        throw error;
    }
}

/**
 * Exemplo de uso
 */
async function publishPost(slug, htmlContent) {
    const publisher = initGitHubPublisher();
    
    if (!publisher) {
        throw new Error('GitHub token não configurado. Use saveGitHubToken() primeiro.');
    }
    
    try {
        await publisher.savePost(slug, htmlContent);
        const publicUrl = publisher.getPublicUrl(slug);
        return publicUrl;
    } catch (error) {
        console.error('Erro ao publicar:', error);
        throw error;
    }
}

// Exportar para uso global
window.GitHubBlogPublisher = GitHubBlogPublisher;
window.initGitHubPublisher = initGitHubPublisher;
window.saveGitHubToken = saveGitHubToken;
window.testGitHubConnection = testGitHubConnection;
window.publishPost = publishPost;
