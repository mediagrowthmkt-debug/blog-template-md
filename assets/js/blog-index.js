// ========================================
// BLOG INDEX - MediaGrowth
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize blog
    initBlog();
});

// ========================================
// BLOG INITIALIZATION
// ========================================

let allPosts = [];
let currentCategory = 'all';
let currentSearchTerm = '';

async function initBlog() {
    try {
        // Load posts from posts folder
        await loadPosts();
        
        // Setup search
        setupSearch();
        
        // Setup category filter
        setupCategoryFilter();
        
        // Render posts
        renderPosts();
    } catch (error) {
        console.error('Erro ao inicializar blog:', error);
        showEmptyState();
    }
}

// ========================================
// LOAD POSTS
// ========================================

async function loadPosts() {
    try {
        // Get all HTML files from posts folder
        const response = await fetch('posts/');
        const text = await response.text();
        
        // Parse HTML files (simple approach)
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const links = doc.querySelectorAll('a[href$=".html"]');
        
        const postPromises = Array.from(links)
            .filter(link => !link.href.includes('index.html'))
            .map(link => loadPostMetadata(link.href));
        
        allPosts = await Promise.all(postPromises);
        allPosts = allPosts.filter(post => post !== null);
        
        // Sort by date (newest first)
        allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        
    } catch (error) {
        console.error('Erro ao carregar posts:', error);
        // Fallback: use example post
        allPosts = getExamplePosts();
    }
}

async function loadPostMetadata(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Extract metadata from post
        const title = doc.querySelector('h1')?.textContent || doc.querySelector('title')?.textContent || 'Post sem título';
        const description = doc.querySelector('meta[name="description"]')?.content || 
                          doc.querySelector('p')?.textContent.substring(0, 150) || '';
        const image = doc.querySelector('meta[property="og:image"]')?.content || 
                     doc.querySelector('img')?.src || '';
        const category = doc.querySelector('meta[name="category"]')?.content || 'Geral';
        const author = doc.querySelector('meta[name="author"]')?.content || 'MediaGrowth';
        const dateStr = doc.querySelector('meta[name="publish-date"]')?.content || 
                       doc.querySelector('time')?.getAttribute('datetime') || 
                       new Date().toISOString();
        
        return {
            title: title.trim(),
            excerpt: description.trim(),
            image: image,
            category: category.trim(),
            author: author.trim(),
            date: dateStr,
            url: url
        };
    } catch (error) {
        console.error('Erro ao carregar post:', url, error);
        return null;
    }
}

function getExamplePosts() {
    // Example posts for testing
    return [
        {
            title: 'Como Acelerar o Crescimento da Sua Empresa com Growth Marketing',
            excerpt: 'Descubra as estratégias de growth marketing que estão transformando empresas e acelerando resultados de forma exponencial.',
            image: '../assets/images/logo-mediagrowth.webp',
            category: 'Growth',
            author: 'MediaGrowth',
            date: '2026-02-15',
            url: 'posts/marble-or-granite-guide-for-your-home-in-worcester.html'
        },
        {
            title: 'SEO em 2026: Estratégias Essenciais para Ranquear no Google',
            excerpt: 'As melhores práticas de SEO atualizadas para garantir visibilidade orgânica e conquistar as primeiras posições.',
            image: '../assets/images/logo-mediagrowth.webp',
            category: 'SEO',
            author: 'MediaGrowth',
            date: '2026-02-10',
            url: 'posts/marble-or-granite-guide-for-your-home-in-worcester.html'
        },
        {
            title: 'Automação de Marketing: Como Escalar Sem Perder Qualidade',
            excerpt: 'Aprenda a implementar automações inteligentes que economizam tempo e aumentam a conversão dos seus leads.',
            image: '../assets/images/logo-mediagrowth.webp',
            category: 'Automação',
            author: 'MediaGrowth',
            date: '2026-02-05',
            url: 'posts/marble-or-granite-guide-for-your-home-in-worcester.html'
        }
    ];
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    let searchTimeout;
    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            currentSearchTerm = e.target.value.toLowerCase();
            renderPosts();
        }, 300);
    });
}

// ========================================
// CATEGORY FILTER
// ========================================

function setupCategoryFilter() {
    // Get unique categories
    const categories = ['all', ...new Set(allPosts.map(post => post.category))];
    
    // Create category buttons
    const categoryFilter = document.getElementById('categoryFilter');
    categoryFilter.innerHTML = categories.map(cat => `
        <button class="category-btn ${cat === 'all' ? 'active' : ''}" data-category="${cat}">
            ${cat === 'all' ? 'Todos' : cat}
        </button>
    `).join('');
    
    // Add click listeners
    categoryFilter.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            categoryFilter.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update current category and render
            currentCategory = this.dataset.category;
            renderPosts();
        });
    });
}

// ========================================
// RENDER POSTS
// ========================================

function renderPosts() {
    const postsGrid = document.getElementById('postsGrid');
    const emptyState = document.getElementById('emptyState');
    
    // Filter posts
    let filteredPosts = allPosts;
    
    // Filter by category
    if (currentCategory !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.category === currentCategory);
    }
    
    // Filter by search term
    if (currentSearchTerm) {
        filteredPosts = filteredPosts.filter(post => 
            post.title.toLowerCase().includes(currentSearchTerm) ||
            post.excerpt.toLowerCase().includes(currentSearchTerm) ||
            post.category.toLowerCase().includes(currentSearchTerm)
        );
    }
    
    // Show empty state if no posts
    if (filteredPosts.length === 0) {
        postsGrid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }
    
    // Hide empty state
    emptyState.style.display = 'none';
    
    // Render posts
    postsGrid.innerHTML = filteredPosts.map(post => createPostCard(post)).join('');
}

function createPostCard(post) {
    const date = formatDate(post.date);
    
    return `
        <a href="${post.url}" class="post-card">
            <img src="${post.image}" alt="${post.title}" class="post-image" loading="lazy" onerror="this.src='../assets/images/logo-mediagrowth.webp'">
            <div class="post-content">
                <span class="post-category">${post.category}</span>
                <h2 class="post-title">${post.title}</h2>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-meta">
                    <span class="post-author">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        ${post.author}
                    </span>
                    <span class="post-date">${date}</span>
                </div>
            </div>
        </a>
    `;
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
}

function showEmptyState() {
    const postsGrid = document.getElementById('postsGrid');
    const emptyState = document.getElementById('emptyState');
    
    postsGrid.innerHTML = '';
    emptyState.style.display = 'block';
}

// ========================================
// SMOOTH SCROLL
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
