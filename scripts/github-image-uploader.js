/**
 * GitHub Image Uploader v4.0
 * Upload IMEDIATO de imagens para GitHub
 * @version 4.0
 * @date 2026-03-01
 */

var IMAGE_REPO_NAME = 'blog-images';
var API_BASE = 'https://api.github.com';
var RAW_BASE = 'https://raw.githubusercontent.com';

window.uploadedImageUrls = {
    avatar: null,
    cover: null,
    internals: []
};

async function getGitHubCredentials() {
    var token = localStorage.getItem('github_token');
    var username = localStorage.getItem('github_username');
    
    if (!token) {
        throw new Error('Token GitHub nao configurado.');
    }
    
    if (!username) {
        console.log('Buscando username via API...');
        var response = await fetch(API_BASE + '/user', {
            headers: { 'Authorization': 'token ' + token }
        });
        
        if (!response.ok) {
            throw new Error('Token GitHub invalido.');
        }
        
        var userData = await response.json();
        username = userData.login;
        localStorage.setItem('github_username', username);
        console.log('Username detectado: ' + username);
    }
    
    return { token: token, username: username };
}

async function ensureImageRepository(token, username) {
    console.log('Verificando repositorio ' + IMAGE_REPO_NAME);
    
    var checkResponse = await fetch(API_BASE + '/repos/' + username + '/' + IMAGE_REPO_NAME, {
        headers: { 'Authorization': 'token ' + token }
    });
    
    if (checkResponse.ok) {
        console.log('Repositorio existe');
        return true;
    }
    
    if (checkResponse.status === 404) {
        console.log('Criando repositorio ' + IMAGE_REPO_NAME);
        
        var createResponse = await fetch(API_BASE + '/user/repos', {
            method: 'POST',
            headers: {
                'Authorization': 'token ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: IMAGE_REPO_NAME,
                description: 'Imagens do blog',
                private: false,
                auto_init: true
            })
        });
        
        if (!createResponse.ok) {
            var error = await createResponse.json();
            throw new Error('Falha ao criar repositorio: ' + error.message);
        }
        
        console.log('Repositorio criado!');
        await new Promise(function(resolve) { setTimeout(resolve, 3000); });
        return true;
    }
    
    throw new Error('Erro ao verificar repositorio');
}

async function optimizeImage(file, maxWidth, maxHeight, quality) {
    maxWidth = maxWidth || 1920;
    maxHeight = maxHeight || 1080;
    quality = quality || 0.85;
    
    return new Promise(function(resolve, reject) {
        var img = new Image();
        var reader = new FileReader();
        
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        
        img.onload = function() {
            var width = img.width;
            var height = img.height;
            
            if (width > maxWidth || height > maxHeight) {
                var ratio = Math.min(maxWidth / width, maxHeight / height);
                width = Math.floor(width * ratio);
                height = Math.floor(height * ratio);
            }
            
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            
            canvas.toBlob(function(blob) {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Falha ao otimizar'));
                }
            }, 'image/jpeg', quality);
        };
        
        img.onerror = function() { reject(new Error('Falha ao carregar')); };
        reader.onerror = function() { reject(new Error('Falha ao ler')); };
        reader.readAsDataURL(file);
    });
}

async function blobToBase64(blob) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onloadend = function() {
            var base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

async function uploadImageToGitHub(token, username, filePath, blob) {
    console.log('Enviando: ' + filePath);
    
    var base64Content = await blobToBase64(blob);
    var sha = null;
    
    try {
        var checkResponse = await fetch(
            API_BASE + '/repos/' + username + '/' + IMAGE_REPO_NAME + '/contents/' + filePath,
            { headers: { 'Authorization': 'token ' + token } }
        );
        
        if (checkResponse.ok) {
            var data = await checkResponse.json();
            sha = data.sha;
            console.log('Arquivo existe, atualizando...');
        }
    } catch (e) {}
    
    var requestBody = {
        message: 'Upload: ' + filePath,
        content: base64Content,
        branch: 'main'
    };
    if (sha) requestBody.sha = sha;
    
    var uploadResponse = await fetch(
        API_BASE + '/repos/' + username + '/' + IMAGE_REPO_NAME + '/contents/' + filePath,
        {
            method: 'PUT',
            headers: {
                'Authorization': 'token ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }
    );
    
    if (!uploadResponse.ok) {
        var error = await uploadResponse.json();
        throw new Error('Falha no upload: ' + error.message);
    }
    
    var publicUrl = RAW_BASE + '/' + username + '/' + IMAGE_REPO_NAME + '/main/' + filePath;
    console.log('Enviado: ' + publicUrl);
    return publicUrl;
}

async function handleAvatarUpload(file) {
    console.log('Avatar: Upload para GitHub...');
    
    var avatarInput = document.getElementById('authorAvatar');
    var statusElement = document.getElementById('avatarUploadStatus');
    var previewElement = document.getElementById('avatarPreview');
    
    try {
        if (!file.type.startsWith('image/')) {
            throw new Error('Selecione uma imagem valida');
        }
        
        if (file.size > 10 * 1024 * 1024) {
            throw new Error('Imagem muito grande. Max: 10MB');
        }
        
        if (statusElement) {
            statusElement.textContent = 'Enviando para GitHub...';
            statusElement.style.color = '#f59e0b';
            statusElement.classList.add('show');
        }
        
        var localPreview = URL.createObjectURL(file);
        if (previewElement) {
            previewElement.src = localPreview;
            previewElement.style.display = 'block';
        }
        
        var credentials = await getGitHubCredentials();
        await ensureImageRepository(credentials.token, credentials.username);
        
        // Usa o slug do post para organizar as imagens por post
        var slugInput = document.getElementById('slug');
        var postSlug = slugInput ? slugInput.value : 'post';
        postSlug = postSlug.startsWith('/') ? postSlug.substring(1) : postSlug;
        
        // Avatar salvo na pasta do post (não mais sobrescreve outros posts)
        var filePath = 'posts/' + postSlug + '/avatar.jpg';
        var optimizedBlob = await optimizeImage(file, 400, 400, 0.9);
        var githubUrl = await uploadImageToGitHub(credentials.token, credentials.username, filePath, optimizedBlob);
        
        window.uploadedImageUrls.avatar = githubUrl;
        
        if (avatarInput) {
            avatarInput.value = githubUrl;
        }
        
        if (previewElement) {
            previewElement.src = githubUrl + '?t=' + Date.now();
        }
        
        if (statusElement) {
            statusElement.textContent = 'Avatar enviado!';
            statusElement.style.color = '#22c55e';
        }
        
        console.log('Avatar enviado:', githubUrl);
        updateImagesLoadedIndicator();
        
    } catch (error) {
        console.error('Erro ao enviar avatar:', error);
        if (statusElement) {
            statusElement.textContent = 'Erro: ' + error.message;
            statusElement.style.color = '#ef4444';
        }
    }
}

async function handleCoverUpload(file) {
    console.log('Capa: Upload para GitHub...');
    
    var coverInput = document.getElementById('coverImage');
    var statusElement = document.getElementById('coverUploadStatus');
    var previewElement = document.getElementById('coverPreview');
    
    try {
        if (!file.type.startsWith('image/')) {
            throw new Error('Selecione uma imagem valida');
        }
        
        if (file.size > 10 * 1024 * 1024) {
            throw new Error('Imagem muito grande. Max: 10MB');
        }
        
        if (statusElement) {
            statusElement.textContent = 'Enviando para GitHub...';
            statusElement.style.color = '#f59e0b';
            statusElement.classList.add('show');
        }
        
        var localPreview = URL.createObjectURL(file);
        if (previewElement) {
            previewElement.src = localPreview;
            previewElement.style.display = 'block';
        }
        
        var credentials = await getGitHubCredentials();
        await ensureImageRepository(credentials.token, credentials.username);
        
        var slugInput = document.getElementById('slug');
        var postSlug = slugInput ? slugInput.value : 'post';
        postSlug = postSlug.startsWith('/') ? postSlug.substring(1) : postSlug;
        
        var filePath = 'posts/' + postSlug + '/cover.jpg';
        var optimizedBlob = await optimizeImage(file, 1200, 630, 0.85);
        var githubUrl = await uploadImageToGitHub(credentials.token, credentials.username, filePath, optimizedBlob);
        
        window.uploadedImageUrls.cover = githubUrl;
        
        if (coverInput) {
            coverInput.value = githubUrl;
        }
        
        if (previewElement) {
            previewElement.src = githubUrl + '?t=' + Date.now();
        }
        
        if (statusElement) {
            statusElement.textContent = 'Capa enviada!';
            statusElement.style.color = '#22c55e';
        }
        
        console.log('Capa enviada:', githubUrl);
        updateImagesLoadedIndicator();
        
    } catch (error) {
        console.error('Erro ao enviar capa:', error);
        if (statusElement) {
            statusElement.textContent = 'Erro: ' + error.message;
            statusElement.style.color = '#ef4444';
        }
    }
}

async function handleInternalImageUpload(file, targetInput, index) {
    console.log('Imagem interna ' + index + ': Upload para GitHub...');
    
    var container = targetInput.closest('.internal-image-item');
    var statusElement = container ? container.querySelector('.upload-status') : null;
    
    if (!statusElement && container) {
        statusElement = document.createElement('small');
        statusElement.className = 'upload-status';
        container.appendChild(statusElement);
    }
    
    try {
        if (!file.type.startsWith('image/')) {
            throw new Error('Selecione uma imagem valida');
        }
        
        if (file.size > 10 * 1024 * 1024) {
            throw new Error('Imagem muito grande. Max: 10MB');
        }
        
        if (statusElement) {
            statusElement.textContent = 'Enviando...';
            statusElement.style.color = '#f59e0b';
            statusElement.classList.add('show');
        }
        
        var credentials = await getGitHubCredentials();
        await ensureImageRepository(credentials.token, credentials.username);
        
        var slugInput = document.getElementById('slug');
        var postSlug = slugInput ? slugInput.value : 'post';
        postSlug = postSlug.startsWith('/') ? postSlug.substring(1) : postSlug;
        
        var filePath = 'posts/' + postSlug + '/image-' + index + '.jpg';
        var optimizedBlob = await optimizeImage(file, 1920, 1080, 0.85);
        var githubUrl = await uploadImageToGitHub(credentials.token, credentials.username, filePath, optimizedBlob);
        
        while (window.uploadedImageUrls.internals.length < index) {
            window.uploadedImageUrls.internals.push(null);
        }
        window.uploadedImageUrls.internals[index - 1] = githubUrl;
        
        if (targetInput) {
            targetInput.value = githubUrl;
        }
        
        if (statusElement) {
            statusElement.textContent = 'Enviada!';
            statusElement.style.color = '#22c55e';
        }
        
        console.log('Imagem interna ' + index + ' enviada:', githubUrl);
        updateImagesLoadedIndicator();
        
    } catch (error) {
        console.error('Erro ao enviar imagem interna ' + index + ':', error);
        if (statusElement) {
            statusElement.textContent = 'Erro: ' + error.message;
            statusElement.style.color = '#ef4444';
        }
    }
}

function updateImagesLoadedIndicator() {
    var indicator = document.getElementById('imagesLoadedIndicator');
    var countElement = document.getElementById('imagesLoadedCount');
    
    if (!indicator || !countElement) return;
    
    var count = 0;
    if (window.uploadedImageUrls.avatar) count++;
    if (window.uploadedImageUrls.cover) count++;
    count += window.uploadedImageUrls.internals.filter(function(url) { return url; }).length;
    
    if (count > 0) {
        countElement.textContent = count;
        indicator.style.display = 'block';
    } else {
        indicator.style.display = 'none';
    }
    
    console.log('Imagens no GitHub: ' + count);
}

function setupImageUploadHandlers() {
    console.log('Configurando handlers de upload IMEDIATO para GitHub...');
    
    var avatarUploadInput = document.getElementById('avatarUploadInput');
    if (avatarUploadInput) {
        avatarUploadInput.addEventListener('change', async function(e) {
            console.log('Avatar upload iniciado!');
            var file = e.target.files[0];
            if (file) {
                console.log('Arquivo:', file.name, file.size, 'bytes');
                await handleAvatarUpload(file);
            }
        });
        console.log('Handler de avatar configurado');
    }
    
    var coverUploadInput = document.getElementById('coverUploadInput');
    if (coverUploadInput) {
        coverUploadInput.addEventListener('change', async function(e) {
            console.log('Capa upload iniciada!');
            var file = e.target.files[0];
            if (file) {
                console.log('Arquivo:', file.name, file.size, 'bytes');
                await handleCoverUpload(file);
            }
        });
        console.log('Handler de capa configurado');
    }
    
    document.addEventListener('change', async function(e) {
        if (e.target.classList.contains('internal-image-upload')) {
            console.log('Imagem interna upload iniciada!');
            var file = e.target.files[0];
            if (file) {
                console.log('Arquivo:', file.name, file.size, 'bytes');
                var container = e.target.closest('.internal-image-item');
                var urlInput = container ? container.querySelector('.internal-image-url') : null;
                
                if (urlInput) {
                    var allContainers = document.querySelectorAll('.internal-image-item');
                    var index = Array.from(allContainers).indexOf(container) + 1;
                    await handleInternalImageUpload(file, urlInput, index);
                }
            }
        }
    });
    console.log('Handler de imagens internas configurado');
}

function getUploadedImageUrls() {
    return {
        avatar: window.uploadedImageUrls.avatar,
        cover: window.uploadedImageUrls.cover,
        internals: window.uploadedImageUrls.internals.filter(function(url) { return url; })
    };
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupImageUploadHandlers);
} else {
    console.log('DOM ja carregado, configurando handlers...');
    setupImageUploadHandlers();
}

window.getUploadedImageUrls = getUploadedImageUrls;
window.handleAvatarUpload = handleAvatarUpload;
window.handleCoverUpload = handleCoverUpload;
window.handleInternalImageUpload = handleInternalImageUpload;

console.log('');
console.log('GitHub Image Uploader v4.0 carregado');
console.log('  Upload IMEDIATO para GitHub ao selecionar imagem');
console.log('  Preview usa URL do GitHub');
console.log('  Post publicado ja tem URLs corretas');
console.log('');
