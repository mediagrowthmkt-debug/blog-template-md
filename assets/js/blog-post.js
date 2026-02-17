// Blog Post - Funcionalidades Interativas
// SUA EMPRESA

document.addEventListener('DOMContentLoaded', function() {
    // Back to Top Button
    initBackToTop();
    
    // Share Functionality
    initShareButton();
    
    // Smooth Scroll
    initSmoothScroll();
    
    // Reading Progress Bar (opcional)
    initReadingProgress();
    
    // Table of Contents (opcional)
    // initTableOfContents();
});

// ======================
// BACK TO TOP
// ======================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    // Mostra/esconde o botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Clique no botão
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ======================
// SHARE BUTTON
// ======================
function initShareButton() {
    const shareBtn = document.querySelector('.share-btn');
    
    if (!shareBtn) return;
    
    shareBtn.addEventListener('click', async function() {
        // Sanitiza o título para prevenir XSS
        const titleElement = document.querySelector('.post-title');
        const title = titleElement ? String(titleElement.textContent).trim() : String(document.title).trim();
        
        // Sanitiza URL - usa apenas origin + pathname, descarta query/hash potencialmente maliciosos
        const url = window.location.origin + window.location.pathname;
        
        // Tenta usar Web Share API (mobile)
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    url: url
                });
            } catch (err) {
                console.log('Share cancelled or error:', err);
            }
        } else {
            // Fallback: copia URL para clipboard
            copyToClipboard(url);
            showNotification('Link copiado para área de transferência! 📋');
        }
    });
}

function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback para navegadores antigos
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    // Sanitiza a mensagem para prevenir XSS
    notification.textContent = String(message).replace(/[<>]/g, '');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #2c3e50;
        color: white;
        padding: 15px 30px;
        border-radius: 25px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideUp 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ======================
// SMOOTH SCROLL
// ======================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ======================
// READING PROGRESS BAR
// ======================
function initReadingProgress() {
    // Cria barra de progresso
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #3498db, #2ecc71);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.prepend(progressBar);
    
    // Atualiza progresso no scroll
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        progressBar.style.width = progress + '%';
    });
}

// ======================
// TABLE OF CONTENTS (Opcional)
// ======================
function initTableOfContents() {
    const contentArea = document.querySelector('.post-content');
    if (!contentArea) return;
    
    const headings = contentArea.querySelectorAll('h2, h3');
    if (headings.length < 3) return; // Só cria TOC se tiver 3+ headings
    
    // Cria container do TOC
    const toc = document.createElement('nav');
    toc.className = 'table-of-contents';
    toc.innerHTML = '<h3>Neste Artigo</h3><ul></ul>';
    
    const tocList = toc.querySelector('ul');
    
    // Adiciona headings ao TOC
    headings.forEach((heading, index) => {
        // Adiciona ID ao heading se não tiver
        if (!heading.id) {
            heading.id = `section-${index}`;
        }
        
        const li = document.createElement('li');
        li.className = heading.tagName.toLowerCase();
        
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        
        li.appendChild(link);
        tocList.appendChild(li);
    });
    
    // Insere TOC após a introdução
    const intro = document.querySelector('.post-intro');
    if (intro) {
        intro.after(toc);
    }
    
    // Estilo do TOC
    const style = document.createElement('style');
    style.textContent = `
        .table-of-contents {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 8px;
            margin: 30px 0;
            border-left: 4px solid #3498db;
        }
        
        .table-of-contents h3 {
            font-size: 1.2rem;
            margin-bottom: 15px;
            color: #2c3e50;
        }
        
        .table-of-contents ul {
            list-style: none;
            margin: 0;
        }
        
        .table-of-contents li {
            margin-bottom: 8px;
        }
        
        .table-of-contents li.h3 {
            margin-left: 20px;
        }
        
        .table-of-contents a {
            color: #3498db;
            text-decoration: none;
            transition: color 0.2s;
        }
        
        .table-of-contents a:hover {
            color: #2c3e50;
            text-decoration: underline;
        }
    `;
    document.head.appendChild(style);
}

// ======================
// LAZY LOADING IMAGES
// ======================
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// ======================
// COPY CODE BLOCKS
// ======================
function initCodeCopy() {
    document.querySelectorAll('pre code').forEach(block => {
        const pre = block.parentElement;
        
        // Adiciona botão de copiar
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-code-btn';
        copyBtn.textContent = 'Copiar';
        copyBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 5px 10px;
            background: rgba(255,255,255,0.2);
            color: white;
            border: 1px solid rgba(255,255,255,0.3);
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.8rem;
        `;
        
        pre.style.position = 'relative';
        pre.appendChild(copyBtn);
        
        copyBtn.addEventListener('click', function() {
            copyToClipboard(block.textContent);
            copyBtn.textContent = '✓ Copiado!';
            setTimeout(() => {
                copyBtn.textContent = 'Copiar';
            }, 2000);
        });
    });
}

// ======================
// EXTERNAL LINKS
// ======================
function initExternalLinks() {
    document.querySelectorAll('.post-content a[href^="http"]').forEach(link => {
        if (!link.href.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Adiciona ícone de link externo
            if (!link.querySelector('.external-icon')) {
                const icon = document.createElement('span');
                icon.className = 'external-icon';
                icon.innerHTML = ' ↗';
                icon.style.fontSize = '0.8em';
                link.appendChild(icon);
            }
        }
    });
}

// Inicializa funções adicionais
initExternalLinks();
// initLazyLoading();
// initCodeCopy();

// ======================
// ANALYTICS (Tempo de leitura)
// ======================
let startTime = Date.now();
let maxScroll = 0;

window.addEventListener('scroll', function() {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
    }
});

window.addEventListener('beforeunload', function() {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    
    // Aqui você pode enviar para Google Analytics ou outro serviço
    console.log('Tempo no post:', timeSpent, 'segundos');
    console.log('Scroll máximo:', Math.round(maxScroll), '%');
    
    // Exemplo com Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', 'article_engagement', {
            time_spent: timeSpent,
            scroll_depth: Math.round(maxScroll)
        });
    }
});

// Adiciona estilos de animação
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translate(-50%, 20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, 20px);
        }
    }
`;
document.head.appendChild(animationStyles);
