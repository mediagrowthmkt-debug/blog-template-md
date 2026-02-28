/**
 * GitHub Image Uploader
 * Sistema de upload de imagens para repositório GitHub dedicado
 * 
 * Funcionalidades:
 * - Upload de imagem de capa por post
 * - Upload de imagens internas por post
 * - Upload de avatar do autor (único e reutilizável)
 * - Otimização automática (resize + compressão)
 * - Auto-criação do repositório se não existir
 * 
 * @version 2.0
 * @date 2026-02-27
 */

class GitHubImageUploader {
    constructor(token, username, repoName = 'blog-images') {
        this.token = token;
        this.username = username;
        this.repoName = repoName;
        this.apiBase = 'https://api.github.com';
        this.rawBase = 'https://raw.githubusercontent.com';
    }

    /**
     * Upload principal de imagem
     * @param {File} file - Arquivo de imagem
     * @param {string} postSlug - Slug do post (opcional para avatar)
     * @param {string} imageType - Tipo: 'cover', 'internal-1', 'internal-2', 'internal-3', 'avatar'
     * @returns {Promise<string>} URL da imagem no GitHub
     */
    async uploadImage(file, postSlug = null, imageType = 'cover') {
        try {
            // Garante que o repositório existe
            await this.ensureRepository();

            // Otimiza a imagem
            const optimizedBlob = await this.optimizeImage(file);

            // Converte para base64
            const base64Content = await this.blobToBase64(optimizedBlob);

            // Define o path baseado no tipo
            let path;
            let filename;

            if (imageType === 'avatar') {
                // Avatar é único e fica na raiz
                path = 'avatar.jpg';
                filename = 'avatar.jpg';
            } else {
                // Imagens do post vão em pastas por slug
                if (!postSlug) {
                    throw new Error('postSlug é obrigatório para imagens de posts');
                }
                filename = `${imageType}.jpg`;
                path = `posts/${postSlug}/${filename}`;
            }

            // Verifica se o arquivo já existe (importante para avatar)
            let sha = null;
            try {
                const existingFile = await this.getFile(path);
                sha = existingFile.sha;
                console.log(`Arquivo ${path} já existe. Atualizando...`);
            } catch (error) {
                console.log(`Arquivo ${path} não existe. Criando novo...`);
            }

            // Faz o upload
            const response = await fetch(
                `${this.apiBase}/repos/${this.username}/${this.repoName}/contents/${path}`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `token ${this.token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: sha 
                            ? `Update: ${filename}` 
                            : `Upload: ${filename}`,
                        content: base64Content,
                        ...(sha && { sha }) // Inclui SHA se estiver atualizando
                    })
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`GitHub API Error: ${error.message}`);
            }

            const data = await response.json();
            
            // Retorna URL raw para acesso direto
            const imageUrl = `${this.rawBase}/${this.username}/${this.repoName}/main/${path}`;
            
            console.log(`✅ Upload concluído: ${imageUrl}`);
            return imageUrl;

        } catch (error) {
            console.error('Erro no upload:', error);
            throw error;
        }
    }

    /**
     * Busca URL do avatar existente ou retorna null
     * @returns {Promise<string|null>} URL do avatar ou null se não existir
     */
    async getAvatarUrl() {
        try {
            await this.ensureRepository();
            const file = await this.getFile('avatar.jpg');
            const avatarUrl = `${this.rawBase}/${this.username}/${this.repoName}/main/avatar.jpg`;
            console.log(`✅ Avatar encontrado: ${avatarUrl}`);
            return avatarUrl;
        } catch (error) {
            console.log('ℹ️ Avatar ainda não existe no repositório');
            return null;
        }
    }

    /**
     * Busca arquivo do repositório
     * @param {string} path - Caminho do arquivo
     * @returns {Promise<object>} Dados do arquivo
     */
    async getFile(path) {
        const response = await fetch(
            `${this.apiBase}/repos/${this.username}/${this.repoName}/contents/${path}`,
            {
                headers: {
                    'Authorization': `token ${this.token}`,
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Arquivo não encontrado: ${path}`);
        }

        return await response.json();
    }

    /**
     * Garante que o repositório existe, criando se necessário
     */
    async ensureRepository() {
        try {
            const response = await fetch(
                `${this.apiBase}/repos/${this.username}/${this.repoName}`,
                {
                    headers: {
                        'Authorization': `token ${this.token}`,
                    }
                }
            );

            if (response.ok) {
                console.log(`✅ Repositório ${this.repoName} já existe`);
                return true;
            }

            if (response.status === 404) {
                console.log(`📦 Criando repositório ${this.repoName}...`);
                return await this.createRepository();
            }

            throw new Error(`Erro ao verificar repositório: ${response.status}`);

        } catch (error) {
            console.error('Erro ao verificar repositório:', error);
            throw error;
        }
    }

    /**
     * Cria novo repositório no GitHub
     */
    async createRepository() {
        try {
            const response = await fetch(
                `${this.apiBase}/user/repos`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `token ${this.token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: this.repoName,
                        description: 'Armazenamento de imagens do blog',
                        private: false,
                        auto_init: true
                    })
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(`Erro ao criar repositório: ${error.message}`);
            }

            console.log(`✅ Repositório ${this.repoName} criado com sucesso!`);
            
            // Aguarda 2 segundos para o GitHub inicializar o repo
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            return true;

        } catch (error) {
            console.error('Erro ao criar repositório:', error);
            throw error;
        }
    }

    /**
     * Otimiza imagem (resize + compressão)
     * @param {File} file - Arquivo original
     * @returns {Promise<Blob>} Imagem otimizada
     */
    async optimizeImage(file) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const reader = new FileReader();

            reader.onload = (e) => {
                img.src = e.target.result;
            };

            img.onload = () => {
                // Configurações de otimização
                const MAX_WIDTH = 1920;
                const MAX_HEIGHT = 1080;
                const QUALITY = 0.85;

                let width = img.width;
                let height = img.height;

                // Calcula proporções mantendo aspect ratio
                if (width > MAX_WIDTH || height > MAX_HEIGHT) {
                    const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
                    width = Math.floor(width * ratio);
                    height = Math.floor(height * ratio);
                }

                // Cria canvas e redimensiona
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Converte para blob com compressão
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            console.log(`📦 Imagem otimizada: ${file.size} → ${blob.size} bytes (${Math.round(blob.size / file.size * 100)}%)`);
                            resolve(blob);
                        } else {
                            reject(new Error('Falha ao criar blob da imagem'));
                        }
                    },
                    'image/jpeg',
                    QUALITY
                );
            };

            img.onerror = () => {
                reject(new Error('Falha ao carregar imagem'));
            };

            reader.onerror = () => {
                reject(new Error('Falha ao ler arquivo'));
            };

            reader.readAsDataURL(file);
        });
    }

    /**
     * Converte Blob para Base64
     * @param {Blob} blob - Blob da imagem
     * @returns {Promise<string>} String base64 (sem prefixo)
     */
    async blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onloadend = () => {
                // Remove o prefixo "data:image/jpeg;base64,"
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }
}

// ======================
// CONFIGURAÇÃO GLOBAL
// ======================

/**
 * Inicializa o uploader com token do localStorage
 * @param {boolean} showPrompt - Se deve mostrar prompt para username (padrão: false)
 * @returns {GitHubImageUploader|null}
 */
function initUploader(showPrompt = false) {
    const token = localStorage.getItem('github_token');
    
    if (!token) {
        console.error('❌ Token do GitHub não configurado');
        console.log('Configure com: localStorage.setItem("github_token", "SEU_TOKEN")');
        return null;
    }

    // Busca username do localStorage
    let username = localStorage.getItem('github_username');
    
    // Se não existir E showPrompt for true, pergunta
    if (!username && showPrompt) {
        username = prompt('Digite seu username do GitHub:');
        if (username) {
            localStorage.setItem('github_username', username);
        }
    }
    
    // Se ainda não tiver username, retorna null
    if (!username) {
        console.warn('⚠️ Username do GitHub não configurado. Configure via botão "⚙️ Configurar GitHub API"');
        return null;
    }

    return new GitHubImageUploader(token, username);
}

// ======================
// HANDLERS DE UPLOAD
// ======================

/**
 * Configura handlers para os botões de upload
 */
function setupImageUploadHandlers() {
    console.log('🔧 Configurando handlers de upload de imagens...');

    // Handler: Upload de Capa
    const coverUploadBtn = document.getElementById('coverImageUpload');
    if (coverUploadBtn) {
        coverUploadBtn.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                await handleImageUpload(file, 'cover', document.getElementById('coverImage'));
            }
        });
        console.log('✅ Handler de capa configurado');
    }

    // Handler: Upload de Avatar (COM CACHE)
    const avatarUploadBtn = document.getElementById('avatarUpload');
    if (avatarUploadBtn) {
        // Ao carregar a página, tenta buscar avatar existente
        loadExistingAvatar();

        avatarUploadBtn.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                await handleAvatarUpload(file);
            }
        });
        console.log('✅ Handler de avatar configurado');
    }

    // Handler: Upload de Imagens Internas (delegação de evento)
    document.addEventListener('change', async (e) => {
        if (e.target.classList.contains('internalImageUpload')) {
            const file = e.target.files[0];
            if (file) {
                const container = e.target.closest('.internal-image-item');
                const urlInput = container.querySelector('input[name="internalImageUrl[]"]');
                
                // Determina o índice da imagem
                const allContainers = document.querySelectorAll('.internal-image-item');
                const index = Array.from(allContainers).indexOf(container) + 1;
                const imageType = `internal-${index}`;
                
                await handleImageUpload(file, imageType, urlInput);
            }
        }
    });
    console.log('✅ Handler de imagens internas configurado');
}

/**
 * Carrega avatar existente do GitHub
 */
async function loadExistingAvatar() {
    // Não mostra prompt ao carregar página (showPrompt = false)
    const uploader = initUploader(false);
    if (!uploader) {
        console.log('ℹ️ Configure username via botão "⚙️ Configurar GitHub API" para auto-carregar avatar');
        return;
    }

    const avatarInput = document.getElementById('authorAvatar');
    const statusElement = document.getElementById('avatarUploadStatus');

    try {
        if (statusElement) {
            statusElement.textContent = '🔍 Buscando avatar existente...';
            statusElement.classList.add('show');
        }

        const avatarUrl = await uploader.getAvatarUrl();
        
        if (avatarUrl && avatarInput) {
            avatarInput.value = avatarUrl;
            if (statusElement) {
                statusElement.textContent = '✅ Avatar carregado do GitHub';
                statusElement.classList.add('upload-success');
                
                setTimeout(() => {
                    statusElement.classList.remove('show');
                }, 3000);
            }
            console.log('✅ Avatar existente carregado automaticamente');
        } else {
            if (statusElement) {
                statusElement.textContent = 'ℹ️ Nenhum avatar salvo ainda';
                statusElement.classList.remove('show');
            }
        }
    } catch (error) {
        console.log('ℹ️ Avatar ainda não foi feito upload');
        if (statusElement) {
            statusElement.classList.remove('show');
        }
    }
}

/**
 * Handler específico para upload de avatar
 * @param {File} file - Arquivo de imagem
 */
async function handleAvatarUpload(file) {
    // Mostra prompt se necessário (showPrompt = true)
    const uploader = initUploader(true);
    if (!uploader) {
        alert('❌ Configuração incompleta!\n\n1. Configure o Token via botão "⚙️ Configurar GitHub API"\n2. Ou configure manualmente:\n   - localStorage.setItem("github_token", "SEU_TOKEN")\n   - localStorage.setItem("github_username", "SEU_USERNAME")');
        return;
    }

    const avatarInput = document.getElementById('authorAvatar');
    const statusElement = document.getElementById('avatarUploadStatus');

    try {
        // Validação de tipo
        if (!file.type.startsWith('image/')) {
            throw new Error('Por favor, selecione um arquivo de imagem válido');
        }

        // Validação de tamanho (10MB)
        const MAX_SIZE = 10 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            throw new Error('Imagem muito grande. Máximo: 10MB');
        }

        // Feedback: Processando
        if (statusElement) {
            statusElement.textContent = '📦 Processando imagem...';
            statusElement.classList.add('show');
            statusElement.classList.remove('upload-success', 'upload-error');
        }

        await new Promise(resolve => setTimeout(resolve, 500));

        // Feedback: Fazendo upload
        if (statusElement) {
            statusElement.textContent = '📤 Fazendo upload para GitHub...';
        }

        // Upload (sem postSlug, tipo 'avatar')
        const imageUrl = await uploader.uploadImage(file, null, 'avatar');

        // Preenche o campo automaticamente
        if (avatarInput) {
            avatarInput.value = imageUrl;
        }

        // Feedback: Sucesso
        if (statusElement) {
            statusElement.textContent = '✅ Avatar salvo! Será usado em todos os posts';
            statusElement.classList.add('upload-success');
            
            setTimeout(() => {
                statusElement.classList.remove('show');
            }, 5000);
        }

        console.log('✅ Avatar salvo com sucesso:', imageUrl);

    } catch (error) {
        console.error('❌ Erro no upload do avatar:', error);
        
        if (statusElement) {
            statusElement.textContent = `❌ Erro: ${error.message}`;
            statusElement.classList.add('upload-error');
            statusElement.classList.add('show');
            
            setTimeout(() => {
                statusElement.classList.remove('show');
            }, 5000);
        }

        alert(`Erro no upload:\n${error.message}`);
    }
}

/**
 * Handler genérico para upload de imagens de posts
 * @param {File} file - Arquivo de imagem
 * @param {string} imageType - Tipo da imagem
 * @param {HTMLElement} targetInput - Campo de input de destino
 */
async function handleImageUpload(file, imageType, targetInput) {
    // Mostra prompt se necessário (showPrompt = true)
    const uploader = initUploader(true);
    if (!uploader) {
        alert('❌ Configuração incompleta!\n\n1. Configure o Token via botão "⚙️ Configurar GitHub API"\n2. Ou configure manualmente:\n   - localStorage.setItem("github_token", "SEU_TOKEN")\n   - localStorage.setItem("github_username", "SEU_USERNAME")');
        return;
    }

    // Busca o slug do post
    const slugInput = document.getElementById('slug');
    const postSlug = slugInput ? slugInput.value : null;

    if (!postSlug) {
        alert('❌ Por favor, preencha o título do post primeiro para gerar o slug!');
        return;
    }

    // Determina elemento de status
    let statusElement;
    if (imageType === 'cover') {
        statusElement = document.getElementById('coverImageUploadStatus');
    } else {
        const container = targetInput.closest('.internal-image-item');
        statusElement = container?.querySelector('.upload-progress');
    }

    try {
        // Validação de tipo
        if (!file.type.startsWith('image/')) {
            throw new Error('Por favor, selecione um arquivo de imagem válido');
        }

        // Validação de tamanho (10MB)
        const MAX_SIZE = 10 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            throw new Error('Imagem muito grande. Máximo: 10MB');
        }

        // Feedback: Processando
        if (statusElement) {
            statusElement.textContent = '📦 Processando imagem...';
            statusElement.classList.add('show');
            statusElement.classList.remove('upload-success', 'upload-error');
        }

        await new Promise(resolve => setTimeout(resolve, 500));

        // Feedback: Fazendo upload
        if (statusElement) {
            statusElement.textContent = '📤 Fazendo upload para GitHub...';
        }

        // Upload
        const imageUrl = await uploader.uploadImage(file, postSlug, imageType);

        // Preenche o campo automaticamente
        if (targetInput) {
            targetInput.value = imageUrl;
        }

        // Feedback: Sucesso
        if (statusElement) {
            statusElement.textContent = '✅ Upload concluído!';
            statusElement.classList.add('upload-success');
            
            setTimeout(() => {
                statusElement.classList.remove('show');
            }, 3000);
        }

        console.log(`✅ Upload de ${imageType} concluído:`, imageUrl);

    } catch (error) {
        console.error(`❌ Erro no upload de ${imageType}:`, error);
        
        if (statusElement) {
            statusElement.textContent = `❌ Erro: ${error.message}`;
            statusElement.classList.add('upload-error');
            statusElement.classList.add('show');
            
            setTimeout(() => {
                statusElement.classList.remove('show');
            }, 5000);
        }

        alert(`Erro no upload:\n${error.message}`);
    }
}

// ======================
// INICIALIZAÇÃO
// ======================

// Aguarda DOM carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupImageUploadHandlers);
} else {
    setupImageUploadHandlers();
}

console.log('📤 GitHub Image Uploader v2.0 carregado');
