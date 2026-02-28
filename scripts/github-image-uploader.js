/**
 * GitHub Image Uploader v3.0
 * Sistema de upload de imagens LOCAL com publicação no GitHub
 * 
 * FLUXO CORRETO:
 * 1. Usuário seleciona imagem → Converte para Base64 (LOCAL)
 * 2. Base64 é usado no preview local
 * 3. Ao clicar "Publicar" → Faz upload para GitHub e substitui URLs
 * 
 * @version 3.0
 * @date 2026-02-27
 */

// ======================
// ARMAZENAMENTO LOCAL
// ======================

// Cache de imagens aguardando publicação
window.pendingImages = {
    avatar: null,      // { file, base64, filename }
    cover: null,       // { file, base64, filename, postSlug }
    internals: []      // [{ file, base64, filename, postSlug, index }]
};

// ======================
// CONVERSÃO PARA BASE64
// ======================

/**
 * Otimiza e converte imagem para Base64
 * @param {File} file - Arquivo original
 * @returns {Promise<{blob: Blob, base64: string}>}
 */
async function optimizeAndConvert(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.src = e.target.result;
        };

        img.onload = () => {
            const MAX_WIDTH = 1920;
            const MAX_HEIGHT = 1080;
            const QUALITY = 0.85;

            let width = img.width;
            let height = img.height;

            if (width > MAX_WIDTH || height > MAX_HEIGHT) {
                const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
                width = Math.floor(width * ratio);
                height = Math.floor(height * ratio);
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        // Converte blob para base64
                        const blobReader = new FileReader();
                        blobReader.onloadend = () => {
                            resolve({
                                blob: blob,
                                base64: blobReader.result // data:image/jpeg;base64,/9j/4AAQ...
                            });
                        };
                        blobReader.onerror = reject;
                        blobReader.readAsDataURL(blob);
                    } else {
                        reject(new Error('Falha ao otimizar imagem'));
                    }
                },
                'image/jpeg',
                QUALITY
            );
        };

        img.onerror = reject;
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// ======================
// HANDLERS DE UPLOAD LOCAL
// ======================

/**
 * Handler para upload de avatar (LOCAL - Base64)
 * NÃO FAZ UPLOAD PARA GITHUB - APENAS CONVERTE PARA BASE64
 */
async function handleAvatarUpload(file) {
    console.log('🖼️ Avatar: Processamento LOCAL iniciado (SEM GitHub)');
    
    const avatarInput = document.getElementById('authorAvatar');
    const statusElement = document.getElementById('avatarUploadStatus');

    try {
        // Validação
        if (!file.type.startsWith('image/')) {
            throw new Error('Selecione um arquivo de imagem válido');
        }

        const MAX_SIZE = 10 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            throw new Error('Imagem muito grande. Máximo: 10MB');
        }

        // Feedback
        if (statusElement) {
            statusElement.textContent = '📦 Processando localmente...';
            statusElement.classList.add('show');
            statusElement.classList.remove('upload-success', 'upload-error');
        }

        // Otimiza e converte
        const {blob, base64} = await optimizeAndConvert(file);

        // Salva no cache
        window.pendingImages.avatar = {
            file: new File([blob], 'avatar.jpg', { type: 'image/jpeg' }),
            base64: base64,
            filename: 'avatar.jpg'
        };

        // Preenche campo com Base64
        if (avatarInput) {
            avatarInput.value = base64;
        }

        // Feedback
        if (statusElement) {
            statusElement.textContent = '✅ Pronta! Será enviada ao publicar';
            statusElement.classList.add('upload-success');
            
            setTimeout(() => {
                statusElement.classList.remove('show');
            }, 3000);
        }

        console.log('✅ Avatar preparado (Base64 local)');

    } catch (error) {
        console.error('❌ Erro ao processar avatar:', error);
        
        if (statusElement) {
            statusElement.textContent = `❌ Erro: ${error.message}`;
            statusElement.classList.add('upload-error');
            statusElement.classList.add('show');
        }
    }
}

/**
 * Handler para upload de capa (LOCAL - Base64)
 * NÃO FAZ UPLOAD PARA GITHUB - APENAS CONVERTE PARA BASE64
 */
async function handleCoverUpload(file) {
    console.log('🖼️ Capa: Processamento LOCAL iniciado (SEM GitHub)');
    
    const coverInput = document.getElementById('coverImage');
    const statusElement = document.getElementById('coverUploadStatus');

    try {
        if (!file.type.startsWith('image/')) {
            throw new Error('Selecione um arquivo de imagem válido');
        }

        const MAX_SIZE = 10 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            throw new Error('Imagem muito grande. Máximo: 10MB');
        }

        if (statusElement) {
            statusElement.textContent = '📦 Processando localmente...';
            statusElement.classList.add('show');
            statusElement.classList.remove('upload-success', 'upload-error');
        }

        const {blob, base64} = await optimizeAndConvert(file);

        // Busca slug do post
        const slugInput = document.getElementById('slug');
        const postSlug = slugInput ? slugInput.value : 'post';

        window.pendingImages.cover = {
            file: new File([blob], 'cover.jpg', { type: 'image/jpeg' }),
            base64: base64,
            filename: 'cover.jpg',
            postSlug: postSlug
        };

        if (coverInput) {
            coverInput.value = base64;
        }

        if (statusElement) {
            statusElement.textContent = '✅ Pronta! Será enviada ao publicar';
            statusElement.classList.add('upload-success');
            
            setTimeout(() => {
                statusElement.classList.remove('show');
            }, 3000);
        }

        console.log('✅ Capa preparada (Base64 local)');

    } catch (error) {
        console.error('❌ Erro ao processar capa:', error);
        
        if (statusElement) {
            statusElement.textContent = `❌ Erro: ${error.message}`;
            statusElement.classList.add('upload-error');
            statusElement.classList.add('show');
        }
    }
}

/**
 * Handler para upload de imagens internas (LOCAL - Base64)
 * NÃO FAZ UPLOAD PARA GITHUB - APENAS CONVERTE PARA BASE64
 */
async function handleInternalImageUpload(file, targetInput, index) {
    console.log(`🖼️ Imagem interna ${index}: Processamento LOCAL iniciado (SEM GitHub)`);
    
    const container = targetInput.closest('.internal-image-item');
    let statusElement = container?.querySelector('.upload-status');
    
    // Cria elemento de status se não existir
    if (!statusElement) {
        statusElement = document.createElement('small');
        statusElement.className = 'upload-status upload-progress';
        container?.appendChild(statusElement);
    }

    try {
        if (!file.type.startsWith('image/')) {
            throw new Error('Selecione um arquivo de imagem válido');
        }

        const MAX_SIZE = 10 * 1024 * 1024;
        if (file.size > MAX_SIZE) {
            throw new Error('Imagem muito grande. Máximo: 10MB');
        }

        statusElement.textContent = '📦 Processando localmente...';
        statusElement.classList.add('show');
        statusElement.classList.remove('upload-success', 'upload-error');

        const {blob, base64} = await optimizeAndConvert(file);

        const slugInput = document.getElementById('slug');
        const postSlug = slugInput ? slugInput.value : 'post';

        // Remove imagem antiga desse índice
        window.pendingImages.internals = window.pendingImages.internals.filter(img => img.index !== index);

        // Adiciona nova
        window.pendingImages.internals.push({
            file: new File([blob], `internal-${index}.jpg`, { type: 'image/jpeg' }),
            base64: base64,
            filename: `internal-${index}.jpg`,
            postSlug: postSlug,
            index: index
        });

        targetInput.value = base64;

        statusElement.textContent = '✅ Pronta!';
        statusElement.classList.add('upload-success');
        
        setTimeout(() => {
            statusElement.classList.remove('show');
        }, 3000);

        console.log(`✅ Imagem interna ${index} preparada (Base64 local)`);

    } catch (error) {
        console.error(`❌ Erro ao processar imagem interna ${index}:`, error);
        
        statusElement.textContent = `❌ ${error.message}`;
        statusElement.classList.add('upload-error');
        statusElement.classList.add('show');
    }
}

// ======================
// CONFIGURAÇÃO DE HANDLERS
// ======================

function setupImageUploadHandlers() {
    console.log('🔧 Configurando handlers de upload LOCAL (Base64)...');
    console.log('🔍 Estado do DOM:', {
        avatarInput: !!document.getElementById('avatarUploadInput'),
        coverInput: !!document.getElementById('coverUploadInput'),
        internalUploads: document.querySelectorAll('.internal-image-upload').length
    });

    // Handler: Avatar
    const avatarUploadInput = document.getElementById('avatarUploadInput');
    if (avatarUploadInput) {
        avatarUploadInput.addEventListener('change', async (e) => {
            console.log('🖼️ Avatar upload iniciado!');
            const file = e.target.files[0];
            if (file) {
                console.log('📦 Arquivo selecionado:', file.name, file.size, 'bytes');
                await handleAvatarUpload(file);
            }
        });
        console.log('✅ Handler de avatar configurado (ID: avatarUploadInput)');
    } else {
        console.warn('⚠️ Elemento avatarUploadInput não encontrado!');
    }

    // Handler: Capa
    const coverUploadInput = document.getElementById('coverUploadInput');
    if (coverUploadInput) {
        coverUploadInput.addEventListener('change', async (e) => {
            console.log('🖼️ Capa upload iniciada!');
            const file = e.target.files[0];
            if (file) {
                console.log('📦 Arquivo selecionado:', file.name, file.size, 'bytes');
                await handleCoverUpload(file);
            }
        });
        console.log('✅ Handler de capa configurado (ID: coverUploadInput)');
    } else {
        console.warn('⚠️ Elemento coverUploadInput não encontrado!');
    }

    // Handler: Imagens Internas (event delegation)
    document.addEventListener('change', async (e) => {
        if (e.target.classList.contains('internal-image-upload')) {
            console.log('🖼️ Imagem interna upload iniciada!');
            const file = e.target.files[0];
            if (file) {
                console.log('📦 Arquivo selecionado:', file.name, file.size, 'bytes');
                const container = e.target.closest('.internal-image-item');
                const urlInput = container?.querySelector('.internal-image-url');
                
                if (urlInput) {
                    const allContainers = document.querySelectorAll('.internal-image-item');
                    const index = Array.from(allContainers).indexOf(container) + 1;
                    
                    await handleInternalImageUpload(file, urlInput, index);
                } else {
                    console.error('❌ Input de URL não encontrado!');
                }
            }
        }
    });
    console.log('✅ Handler de imagens internas configurado (class: internal-image-upload)');
    console.log('');
}

// ======================
// PUBLICAÇÃO NO GITHUB
// ======================

/**
 * Faz upload de todas as imagens pendentes para o GitHub
 * CHAMADO PELO github-api.js ao publicar post
 * 
 * @returns {Promise<Object>} URLs das imagens no GitHub
 */
async function uploadPendingImagesToGitHub(postSlug) {
    const token = localStorage.getItem('github_token');
    const username = localStorage.getItem('github_username');
    
    if (!token || !username) {
        console.warn('⚠️ Token ou username não configurado. Imagens permanecerão em Base64.');
        return {
            avatar: window.pendingImages.avatar?.base64 || null,
            cover: window.pendingImages.cover?.base64 || null,
            internals: window.pendingImages.internals.map(img => img.base64)
        };
    }

    const repoName = 'blog-images';
    const apiBase = 'https://api.github.com';
    const rawBase = 'https://raw.githubusercontent.com';
    const results = {
        avatar: null,
        cover: null,
        internals: []
    };

    try {
        console.log('📤 Iniciando upload de imagens para GitHub...');
        console.log('📝 Post slug:', postSlug);
        
        // Garante que repositório existe
        await ensureGitHubRepository(token, username, repoName, apiBase);

        // Upload Avatar
        if (window.pendingImages.avatar) {
            console.log('📤 Enviando avatar...');
            await uploadFileToGitHub(
                token, username, repoName, apiBase,
                'avatar.jpg',
                window.pendingImages.avatar.file
            );
            results.avatar = `${rawBase}/${username}/${repoName}/main/avatar.jpg`;
            console.log('✅ Avatar enviado:', results.avatar);
        }

        // Upload Capa
        if (window.pendingImages.cover) {
            console.log('📤 Enviando capa...');
            await uploadFileToGitHub(
                token, username, repoName, apiBase,
                `posts/${postSlug}/cover.jpg`,
                window.pendingImages.cover.file
            );
            results.cover = `${rawBase}/${username}/${repoName}/main/posts/${postSlug}/cover.jpg`;
            console.log('✅ Capa enviada:', results.cover);
        }

        // Upload Imagens Internas
        if (window.pendingImages.internals && window.pendingImages.internals.length > 0) {
            console.log(`📤 Enviando ${window.pendingImages.internals.length} imagens internas...`);
            for (let i = 0; i < window.pendingImages.internals.length; i++) {
                const img = window.pendingImages.internals[i];
                await uploadFileToGitHub(
                    token, username, repoName, apiBase,
                    `posts/${postSlug}/internal-${i + 1}.jpg`,
                    img.file
                );
                const url = `${rawBase}/${username}/${repoName}/main/posts/${postSlug}/internal-${i + 1}.jpg`;
                results.internals.push(url);
                console.log(`✅ Imagem interna ${i + 1} enviada:`, url);
            }
        }

        console.log('🎉 Todas as imagens enviadas para o GitHub!');
        console.log('📊 Resumo:', results);
        
        // Limpa cache após sucesso
        window.pendingImages = {
            avatar: null,
            cover: null,
            internals: []
        };
        
        return results;

    } catch (error) {
        console.error('❌ Erro ao enviar imagens para GitHub:', error);
        // Retorna Base64 como fallback
        return {
            avatar: window.pendingImages.avatar?.base64 || null,
            cover: window.pendingImages.cover?.base64 || null,
            internals: window.pendingImages.internals.map(img => img.base64)
        };
    }
}

/**
 * Garante que repositório existe no GitHub
 */
async function ensureGitHubRepository(token, username, repoName, apiBase) {
    try {
        const response = await fetch(`${apiBase}/repos/${username}/${repoName}`, {
            headers: { 'Authorization': `token ${token}` }
        });

        if (response.ok) {
            console.log(`✅ Repositório ${repoName} existe`);
            return true;
        }

        if (response.status === 404) {
            console.log(`📦 Criando repositório ${repoName}...`);
            const createResponse = await fetch(`${apiBase}/user/repos`, {
                method: 'POST',
                headers: {
                    'Authorization': `token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: repoName,
                    description: 'Armazenamento de imagens do blog',
                    private: false,
                    auto_init: true
                })
            });

            if (!createResponse.ok) {
                throw new Error('Falha ao criar repositório');
            }

            console.log('✅ Repositório criado! Aguardando inicialização...');
            await new Promise(resolve => setTimeout(resolve, 3000));
            return true;
        }

        throw new Error(`Erro ao verificar repositório: ${response.status}`);
    } catch (error) {
        console.error('Erro ao garantir repositório:', error);
        throw error;
    }
}

/**
 * Faz upload de arquivo individual para GitHub
 */
async function uploadFileToGitHub(token, username, repoName, apiBase, path, file) {
    // Converte File para Base64
    const base64Content = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

    // Verifica se arquivo já existe (para pegar SHA)
    let sha = null;
    try {
        const existingResponse = await fetch(
            `${apiBase}/repos/${username}/${repoName}/contents/${path}`,
            { headers: { 'Authorization': `token ${token}` } }
        );
        if (existingResponse.ok) {
            const data = await existingResponse.json();
            sha = data.sha;
            console.log(`  ℹ️ Arquivo ${path} já existe, atualizando...`);
        }
    } catch (error) {
        // Arquivo não existe, ok
    }

    // Faz upload
    const response = await fetch(
        `${apiBase}/repos/${username}/${repoName}/contents/${path}`,
        {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: sha ? `Update: ${path}` : `Upload: ${path}`,
                content: base64Content,
                ...(sha && { sha })
            })
        }
    );

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Upload failed: ${error.message}`);
    }

    return await response.json();
}

// ======================
// INICIALIZAÇÃO
// ======================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('📄 DOM carregado, configurando handlers...');
        setupImageUploadHandlers();
    });
} else {
    console.log('📄 DOM já carregado, configurando handlers imediatamente...');
    setupImageUploadHandlers();
}

// ======================
// EXPORTAR FUNÇÕES GLOBALMENTE
// ======================

window.uploadPendingImagesToGitHub = uploadPendingImagesToGitHub;
window.handleAvatarUpload = handleAvatarUpload;
window.handleCoverUpload = handleCoverUpload;
window.handleInternalImageUpload = handleInternalImageUpload;

console.log('📤 GitHub Image Uploader v3.1 carregado');
console.log('   ✅ Upload LOCAL (Base64) - SEM prompt de username');
console.log('   ✅ Preview funciona instantaneamente');
console.log('   ✅ Upload GitHub APENAS ao clicar "Publicar"');
console.log('   ⚠️  Se aparecer prompt, limpe o cache do navegador (Ctrl+Shift+Delete)');
console.log('');
console.log('🔍 Para debugar: Abra console e clique nos botões de upload');
console.log('   - Avatar: Procure por "🖼️ Avatar upload iniciado!"');
console.log('   - Capa: Procure por "🖼️ Capa upload iniciada!"');
console.log('   - Interna: Procure por "🖼️ Imagem interna upload iniciada!"');
