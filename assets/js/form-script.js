// Sistema de Criação de Posts - Blog SUA EMPRESA
// Autor: SUA EMPRESA
// Data: 2026

// ======================
// AUTO-SAVE SYSTEM
// ======================

const AUTO_SAVE_KEY = 'blog_template_form_data';
let autoSaveTimeout = null;

// Salva os dados do formulário no LocalStorage
function saveFormToLocalStorage() {
    const formData = {};
    const form = document.getElementById('blogForm');
    
    // Salva todos os inputs e textareas (exceto aiTemplate)
    form.querySelectorAll('input, textarea, select').forEach(field => {
        if (field.type === 'button' || field.type === 'submit') return;
        if (field.id === 'aiTemplate') return; // Não salvar o template de IA
        
        if (field.type === 'checkbox') {
            formData[field.id || field.name] = field.checked;
        } else if (field.name && field.name.includes('[]')) {
            // Campos múltiplos (arrays)
            if (!formData[field.name]) formData[field.name] = [];
            formData[field.name].push(field.value);
        } else {
            formData[field.id || field.name] = field.value;
        }
    });
    
    localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(formData));
    updateAutoSaveStatus();
}

// Carrega os dados salvos do LocalStorage
function loadFormFromLocalStorage() {
    const savedData = localStorage.getItem(AUTO_SAVE_KEY);
    if (!savedData) return;
    
    try {
        const formData = JSON.parse(savedData);
        const form = document.getElementById('blogForm');
        
        // Restaura valores de campos simples
        Object.keys(formData).forEach(key => {
            // Pula campos array por enquanto
            if (key.includes('[]')) return;
            // Não restaurar o template de IA
            if (key === 'aiTemplate') return;
            
            const field = form.querySelector(`#${key}`) || form.querySelector(`[name="${key}"]`);
            
            if (field) {
                if (field.type === 'checkbox') {
                    field.checked = formData[key];
                } else {
                    field.value = formData[key];
                }
            }
        });
        
        // Restaura campos múltiplos (arrays) - usando método diferente
        Object.keys(formData).forEach(key => {
            if (key.includes('[]') && Array.isArray(formData[key])) {
                // Busca todos os campos com esse name usando getAttribute
                const allFields = Array.from(form.querySelectorAll('input')).filter(
                    input => input.getAttribute('name') === key
                );
                
                formData[key].forEach((value, index) => {
                    if (allFields[index]) {
                        allFields[index].value = value;
                    } else {
                        // Se não existe campo suficiente, cria novos
                        if (key === 'internalImageUrl[]' && index > 0) {
                            document.getElementById('addInternalImage').click();
                            setTimeout(() => {
                                const newFields = Array.from(form.querySelectorAll('input')).filter(
                                    input => input.getAttribute('name') === key
                                );
                                if (newFields[index]) newFields[index].value = value;
                            }, 100);
                        }
                    }
                });
            }
        });
        
        console.log('✅ Dados carregados do auto-save');
        updateAutoSaveStatus('Dados restaurados');
    } catch (error) {
        console.error('❌ Erro ao carregar dados salvos:', error);
    }
}

// Auto-save com debounce (aguarda 2 segundos sem digitação)
function scheduleAutoSave() {
    if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
    }
    
    autoSaveTimeout = setTimeout(() => {
        saveFormToLocalStorage();
    }, 2000); // 2 segundos
}

// Atualiza o status visual do auto-save
function updateAutoSaveStatus(customMessage = null) {
    const statusDiv = document.getElementById('autoSaveStatus');
    if (!statusDiv) return;
    
    const now = new Date();
    const timeString = now.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    statusDiv.textContent = customMessage || `💾 Salvo às ${timeString}`;
    statusDiv.style.opacity = '1';
    
    // Fade out após 3 segundos
    setTimeout(() => {
        statusDiv.style.opacity = '0.5';
    }, 3000);
}

// Limpa o formulário e o LocalStorage
function clearFormData() {
    if (confirm('⚠️ Tem certeza que deseja limpar TODOS os campos? Esta ação não pode ser desfeita.')) {
        // Limpa o formulário
        document.getElementById('blogForm').reset();
        
        // Limpa o LocalStorage
        localStorage.removeItem(AUTO_SAVE_KEY);
        
        // Feedback visual
        const statusDiv = document.getElementById('autoSaveStatus');
        if (statusDiv) {
            statusDiv.textContent = '🗑️ Campos limpos';
            statusDiv.style.opacity = '1';
            setTimeout(() => {
                statusDiv.style.opacity = '0';
            }, 2000);
        }
        
        console.log('🗑️ Formulário e cache limpos');
    }
}

// ======================
// 5 VERSÕES DE TESTE
// ======================
// Alterna entre 5 versões de conteúdo a cada clique do botão "Preencher Teste"
// Personalize para o nicho do seu cliente!

let currentTestVersion = 0;

const testDataVersions = [
    // VERSÃO 1: Marble vs Granite
    {
        h1Title: 'Marble vs Granite: Complete Guide for Worcester Homes',
        slug: 'marble-or-granite-guide-for-your-home-in-worcester',
        metaDescription: 'Discover the pros and cons of marble and granite countertops. Expert comparison guide for Worcester homeowners making the right choice.',
        category: 'Guia',
        author: 'Equipe Editorial',
        primaryKeyword: 'marble vs granite',
        secondaryKeywords: 'granite countertops, marble countertops, kitchen renovation, Worcester countertops',
        metaTitle: 'Marble vs Granite: Which is Best for Your Home?',
        searchIntent: 'Informacional',
        coverImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200',
        coverImageAlt: 'Beautiful granite countertop installation in modern kitchen',
        coverImageCaption: 'Professional granite countertop installation',
        internalImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        internalImageAlt: 'Professional granite installation process in Worcester home',
        introduction: 'Choosing between marble and granite countertops is one of the most important decisions for your Worcester home renovation. Both materials offer unique benefits and aesthetic appeal, but understanding their differences is crucial for making the right choice.',
        contentBody: '<h2>Understanding Marble Countertops</h2><p>Marble is a classic choice known for its elegant veining and timeless beauty. It\'s perfect for homeowners who want a sophisticated look in their kitchen or bathroom.</p><h3>Advantages of Marble</h3><ul><li>Unique veining patterns</li><li>Cool surface temperature</li><li>Increases home value</li></ul><h2>Why Choose Granite</h2><p>Granite is incredibly durable and comes in hundreds of color options. It\'s the perfect choice for busy Worcester families who need a practical yet beautiful solution.</p><h3>Benefits of Granite</h3><ul><li>Extremely durable</li><li>Heat resistant</li><li>Low maintenance</li><li>Variety of colors</li></ul>',
        conclusion: 'Both marble and granite are excellent choices for Worcester homes. The decision ultimately depends on your lifestyle, budget, and aesthetic preferences. Contact SUA EMPRESA today for a free consultation.',
        tags: 'granite, marble, countertops, kitchen renovation, Worcester',
        ctaTitle: 'Ready to Transform Your Kitchen?',
        ctaText: 'Get a free consultation and quote from Worcester\'s trusted countertop experts!',
        ctaButtonText: 'Schedule Free Consultation',
        ctaLink: 'https://www.SEU-DOMINIO.com/contact'
    },
    // VERSÃO 2: Kitchen Island Ideas
    {
        h1Title: 'Kitchen Island Ideas: Granite Countertops Guide',
        slug: 'kitchen-island-ideas-granite-countertops-guide',
        metaDescription: 'Transform your kitchen with stunning granite island ideas. Expert tips for choosing colors, edges, and styles for Worcester homes.',
        category: 'Dicas',
        author: 'Equipe Editorial',
        primaryKeyword: 'kitchen island granite',
        secondaryKeywords: 'granite island, kitchen countertops, island design, countertop edges',
        metaTitle: 'Kitchen Island Ideas with Granite Countertops',
        searchIntent: 'Comercial',
        coverImage: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200',
        coverImageAlt: 'Modern kitchen island with granite countertop',
        coverImageCaption: 'Elegant kitchen island with premium granite',
        internalImageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
        internalImageAlt: 'Kitchen island edge profiles and granite colors',
        introduction: 'A kitchen island with a stunning granite countertop can completely transform your cooking space. Whether you\'re renovating or building new, the right island design enhances functionality and adds thousands to your home value.',
        contentBody: '<h2>Popular Kitchen Island Shapes</h2><p>The shape of your island depends on your kitchen layout and cooking needs. L-shaped islands work great for open floor plans, while rectangular islands suit galley kitchens.</p><h3>Granite Color Selection</h3><ul><li>Black Galaxy - dramatic and modern</li><li>Santa Cecilia - warm gold tones</li><li>Bianco Romano - elegant white with gray veining</li><li>Blue Pearl - unique blue sparkle</li></ul><h2>Edge Profile Options</h2><p>The edge profile adds personality to your island. Popular choices include bullnose, beveled, and ogee edges.</p>',
        conclusion: 'Your kitchen island is the heart of your home. Let SUA EMPRESA help you design the perfect centerpiece with premium materials and expert craftsmanship.',
        tags: 'kitchen island, granite, countertops, kitchen design, home renovation',
        ctaTitle: 'Design Your Dream Kitchen Island',
        ctaText: 'Our experts will help you choose the perfect granite for your island. Free in-home consultation!',
        ctaButtonText: 'Get Free Design Consultation',
        ctaLink: 'https://www.SEU-DOMINIO.com/contact'
    },
    // VERSÃO 3: Quartz vs Granite
    {
        h1Title: 'Quartz vs Granite: Pros and Cons for 2026',
        slug: 'quartz-vs-granite-pros-and-cons-2026',
        metaDescription: 'Complete comparison of quartz and granite countertops. Learn which material is best for your budget, lifestyle, and design preferences.',
        category: 'Tutorial',
        author: 'Equipe Editorial',
        primaryKeyword: 'quartz vs granite',
        secondaryKeywords: 'quartz countertops, engineered stone, natural stone, countertop comparison',
        metaTitle: 'Quartz vs Granite: Complete 2026 Comparison',
        searchIntent: 'Informacional',
        coverImage: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200',
        coverImageAlt: 'Quartz and granite countertop samples side by side',
        coverImageCaption: 'Comparing quartz and granite materials',
        internalImageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        internalImageAlt: 'Modern kitchen with quartz countertop installation',
        introduction: 'The quartz vs granite debate is one of the most common questions we hear from homeowners. Both materials are excellent choices, but they have distinct differences that may make one better suited for your specific needs.',
        contentBody: '<h2>What is Granite?</h2><p>Granite is a natural stone quarried from the earth. Each slab is unique with natural variations in color and pattern. It\'s been a premium countertop choice for decades.</p><h2>What is Quartz?</h2><p>Quartz countertops are engineered from natural quartz crystals mixed with resins. This creates a consistent, non-porous surface with predictable patterns.</p><h3>Durability Comparison</h3><ul><li>Granite: Heat resistant, requires annual sealing</li><li>Quartz: Scratch resistant, maintenance-free</li></ul><h3>Cost Comparison</h3><ul><li>Granite: $50-100 per square foot installed</li><li>Quartz: $60-120 per square foot installed</li></ul>',
        conclusion: 'Both quartz and granite are excellent investments for your home. Consider your lifestyle, design preferences, and budget when making your decision. SUA EMPRESA offers both options with expert installation.',
        tags: 'quartz, granite, countertops, comparison, kitchen',
        ctaTitle: 'Need Help Choosing?',
        ctaText: 'Visit our showroom to see quartz and granite samples in person. Our experts will guide you to the perfect choice.',
        ctaButtonText: 'Schedule Showroom Visit',
        ctaLink: 'https://www.SEU-DOMINIO.com/showroom'
    },
    // VERSÃO 4: Bathroom Vanity Countertops
    {
        h1Title: 'Bathroom Vanity Countertops: Best Stone Options',
        slug: 'bathroom-vanity-countertops-best-stone-options',
        metaDescription: 'Upgrade your bathroom with premium stone vanity countertops. Compare marble, granite, and quartz for bathroom installations.',
        category: 'Blog',
        author: 'Equipe Editorial',
        primaryKeyword: 'bathroom vanity countertops',
        secondaryKeywords: 'bathroom granite, vanity marble, bathroom renovation, stone countertops',
        metaTitle: 'Best Stone Countertops for Bathroom Vanities',
        searchIntent: 'Comercial',
        coverImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200',
        coverImageAlt: 'Luxury bathroom with marble vanity countertop',
        coverImageCaption: 'Elegant marble bathroom vanity',
        internalImageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800',
        internalImageAlt: 'Modern bathroom vanity with granite countertop',
        introduction: 'Your bathroom vanity is more than just a sink base—it\'s a design statement. The right stone countertop can transform your bathroom from ordinary to extraordinary while adding lasting value to your home.',
        contentBody: '<h2>Best Stones for Bathrooms</h2><p>Unlike kitchens, bathroom countertops don\'t face heat from cooking. This opens up more material options including delicate marble that might not be suitable for kitchen use.</p><h3>Marble Vanity Tops</h3><ul><li>Luxurious, timeless elegance</li><li>Perfect for low-traffic bathrooms</li><li>Requires sealing and care</li></ul><h3>Granite Vanity Tops</h3><ul><li>Extremely durable</li><li>Wide variety of colors</li><li>Resists water and stains</li></ul><h2>Sizing Considerations</h2><p>Standard vanity countertops range from 22-25 inches deep. We custom cut every piece to fit your exact specifications.</p>',
        conclusion: 'A premium stone vanity countertop is an investment that pays dividends in beauty and home value. Contact SUA EMPRESA for bathroom countertop installation in Worcester.',
        tags: 'bathroom, vanity, countertops, marble, granite',
        ctaTitle: 'Transform Your Bathroom',
        ctaText: 'Get a free quote for your bathroom vanity countertop project. We handle everything from template to installation.',
        ctaButtonText: 'Request Bathroom Quote',
        ctaLink: 'https://www.SEU-DOMINIO.com/contact'
    },
    // VERSÃO 5: How to Care for Granite
    {
        h1Title: 'How to Care for Granite Countertops: Pro Tips',
        slug: 'how-to-care-for-granite-countertops-pro-tips',
        metaDescription: 'Keep your granite countertops looking new with these expert care tips. Learn proper cleaning, sealing, and maintenance from the pros.',
        category: 'Dicas',
        author: 'Equipe Editorial',
        primaryKeyword: 'granite care tips',
        secondaryKeywords: 'granite maintenance, clean granite, seal granite, countertop care',
        metaTitle: 'How to Care for Granite Countertops | Pro Tips',
        searchIntent: 'Informacional',
        coverImage: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200',
        coverImageAlt: 'Cleaning granite countertop with microfiber cloth',
        coverImageCaption: 'Proper granite cleaning technique',
        internalImageUrl: 'https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800',
        internalImageAlt: 'Granite sealing products and tools',
        introduction: 'Granite countertops are one of the most durable surfaces for your kitchen, but proper care ensures they stay beautiful for decades. These professional tips will help you maintain your investment and keep your countertops looking brand new.',
        contentBody: '<h2>Daily Cleaning Routine</h2><p>For everyday cleaning, use warm water with a few drops of dish soap. Wipe with a soft microfiber cloth and dry to prevent water spots.</p><h3>What NOT to Use</h3><ul><li>Vinegar or acidic cleaners</li><li>Bleach or ammonia</li><li>Abrasive scrubbers</li><li>Generic multipurpose cleaners</li></ul><h2>Sealing Your Granite</h2><p>Most granite should be sealed annually. To test if you need sealing, place a few drops of water on the surface. If it absorbs within 5 minutes, it\'s time to seal.</p><h3>Sealing Steps</h3><ol><li>Clean surface thoroughly</li><li>Apply sealer evenly</li><li>Wait 15-20 minutes</li><li>Wipe off excess</li><li>Allow 24 hours to cure</li></ol>',
        conclusion: 'With proper care, your granite countertops will look stunning for 30+ years. SUA EMPRESA offers professional sealing services and care products for all our customers.',
        tags: 'granite care, maintenance, cleaning, sealing, countertops',
        ctaTitle: 'Need Professional Sealing?',
        ctaText: 'Our team provides professional granite sealing and restoration services. Mantenha seu investimento protegido!',
        ctaButtonText: 'Book Sealing Service',
        ctaLink: 'https://www.SEU-DOMINIO.com/services'
    }
];

// Preenche formulário com dados fictícios para teste (alterna entre 5 versões)
function fillTestData() {
    // Formata data corretamente para datetime-local (YYYY-MM-DDTHH:MM)
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const dateTimeLocal = `${year}-${month}-${day}T${hours}:${minutes}`;
    
    // Pega versão atual e prepara próxima
    const testData = { ...testDataVersions[currentTestVersion] };
    testData.datePublished = dateTimeLocal;
    
    const versionNumber = currentTestVersion + 1;
    
    // Avança para próxima versão (ciclo 1-5)
    currentTestVersion = (currentTestVersion + 1) % testDataVersions.length;
    
    // Preenche os campos
    Object.keys(testData).forEach(key => {
        if (key === 'internalImageUrl' || key === 'internalImageAlt') return; // Trata separadamente
        
        const field = document.getElementById(key);
        if (field) {
            field.value = testData[key];
            // Dispara evento para atualizar contadores de caracteres
            field.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });
    
    // Preenche imagem interna (primeira)
    const internalImageUrl = document.querySelector('[name="internalImageUrl[]"]');
    const internalImageAlt = document.querySelector('[name="internalImageAlt[]"]');
    if (internalImageUrl && testData.internalImageUrl) {
        internalImageUrl.value = testData.internalImageUrl;
        internalImageUrl.dispatchEvent(new Event('input', { bubbles: true }));
    }
    if (internalImageAlt && testData.internalImageAlt) {
        internalImageAlt.value = testData.internalImageAlt;
        internalImageAlt.dispatchEvent(new Event('input', { bubbles: true }));
    }
    
    // Feedback visual com número da versão
    const statusDiv = document.getElementById('autoSaveStatus');
    if (statusDiv) {
        statusDiv.textContent = `🧪 Versão ${versionNumber}/5 carregada`;
        statusDiv.style.opacity = '1';
        statusDiv.style.color = '#28a745';
        setTimeout(() => {
            statusDiv.style.opacity = '0.5';
            statusDiv.style.color = '';
        }, 3000);
    }
    
    console.log(`✅ Formulário preenchido com dados de teste (Versão ${versionNumber}/5)`);
}

// ======================
// UTILITY FUNCTIONS
// ======================

// Gera slug automaticamente a partir do título
function generateSlug(text) {
    if (!text || typeof text !== 'string') {
        console.warn('⚠️ generateSlug recebeu texto inválido:', text);
        return '';
    }
    
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
        .replace(/\s+/g, '-') // Substitui espaços por hífen
        .replace(/--+/g, '-') // Remove hífens duplicados
        .replace(/^-+|-+$/g, ''); // Remove hífens do início e fim
}

// Remove stopwords do slug
function removeStopwords(slug) {
    const stopwords = ['o', 'a', 'os', 'as', 'um', 'uma', 'de', 'do', 'da', 'dos', 'das', 
                       'em', 'no', 'na', 'nos', 'nas', 'por', 'para', 'com', 'sem', 'sob'];
    const words = slug.split('-');
    const filtered = words.filter(word => !stopwords.includes(word));
    return filtered.join('-');
}

// Conta caracteres
function updateCharCounter(input, counter) {
    const count = input.value.length;
    const max = input.getAttribute('maxlength');
    counter.textContent = `${count}/${max} caracteres`;
    
    if (count > max * 0.9) {
        counter.style.color = '#e74c3c';
    } else {
        counter.style.color = '#7f8c8d';
    }
}

// Conta palavras
function countWords(text) {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

// Atualiza contador de palavras
function updateWordCounter(textarea, counter) {
    const words = countWords(textarea.value);
    counter.textContent = `${words} palavras`;
}

// Calcula tempo de leitura (média 200 palavras/minuto)
function calculateReadTime(text) {
    const words = countWords(text);
    return Math.ceil(words / 200);
}

// Formata data para ISO 8601
function formatDateISO(date) {
    return date.toISOString();
}

// Formata data para exibição em português
function formatDatePTBR(date) {
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    }).format(date);
}

// Escapa HTML para prevenir XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ======================
// GOOGLE DRIVE CONVERTER
// ======================

/**
 * Converte URL do Google Drive em URL de imagem direta
 * Suporta formatos:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 * 
 * @param {string} url - URL original do Google Drive
 * @returns {string} - URL direta da imagem ou URL original se não for do Google Drive
 */
function convertGoogleDriveUrl(url) {
    if (!url || typeof url !== 'string') {
        return url;
    }
    
    url = url.trim();
    
    // Verifica se é uma URL do Google Drive
    if (!url.includes('drive.google.com')) {
        return url; // Não é do Google Drive, retorna URL original
    }
    
    let fileId = null;
    
    // Padrão 1: https://drive.google.com/file/d/FILE_ID/view?usp=sharing
    const pattern1 = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match1 = url.match(pattern1);
    if (match1) {
        fileId = match1[1];
    }
    
    // Padrão 2: https://drive.google.com/open?id=FILE_ID
    const pattern2 = /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/;
    const match2 = url.match(pattern2);
    if (match2) {
        fileId = match2[1];
    }
    
    // Padrão 3: https://drive.google.com/uc?id=FILE_ID
    const pattern3 = /drive\.google\.com\/uc\?id=([a-zA-Z0-9_-]+)/;
    const match3 = url.match(pattern3);
    if (match3) {
        fileId = match3[1];
    }
    
    // Se encontrou o ID, converte para URL direta
    if (fileId) {
        const convertedUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
        console.log('✅ Google Drive URL convertida:', url, '->', convertedUrl);
        return convertedUrl;
    }
    
    // Se não encontrou nenhum padrão, retorna a URL original
    console.warn('⚠️ Não foi possível extrair o ID do arquivo do Google Drive:', url);
    return url;
}

/**
 * Processa todas as URLs de imagem em um texto HTML, convertendo Google Drive
 * @param {string} html - Conteúdo HTML com possíveis URLs do Google Drive
 * @returns {string} - HTML com URLs convertidas
 */
function processImagesInHtml(html) {
    if (!html) return html;
    
    // Procura por tags img com src
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    
    return html.replace(imgRegex, (match, srcUrl) => {
        const convertedUrl = convertGoogleDriveUrl(srcUrl);
        return match.replace(srcUrl, convertedUrl);
    });
}

// ======================
// FORM INITIALIZATION
// ======================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('blogForm');
    const h1TitleInput = document.getElementById('h1Title');
    const slugInput = document.getElementById('slug');
    const primaryKeywordInput = document.getElementById('primaryKeyword');
    
    // ======================
    // AUTO-SAVE SETUP
    // ======================
    
    // Carrega dados salvos ao carregar a página
    loadFormFromLocalStorage();
    
    // Auto-save em todos os campos do formulário
    form.querySelectorAll('input, textarea, select').forEach(field => {
        if (field.type !== 'button' && field.type !== 'submit') {
            field.addEventListener('input', scheduleAutoSave);
            field.addEventListener('change', scheduleAutoSave);
        }
    });
    
    // Botão de limpar campos
    const clearBtn = document.getElementById('clearForm');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearFormData);
    }
    
    // Botão de preencher dados de teste
    const fillTestBtn = document.getElementById('fillTestData');
    if (fillTestBtn) {
        fillTestBtn.addEventListener('click', fillTestData);
    }
    
    // Salva antes de sair da página
    window.addEventListener('beforeunload', function() {
        saveFormToLocalStorage();
    });
    
    console.log('✅ Sistema de auto-save ativado');
    
    // ======================
    // FORM BEHAVIORS
    // ======================
    
    // Auto-gera slug quando o título muda
    h1TitleInput.addEventListener('input', function() {
        const slug = removeStopwords(generateSlug(this.value));
        slugInput.value = slug;
        
        // Atualiza contador de caracteres
        const counter = this.parentElement.querySelector('.char-counter');
        updateCharCounter(this, counter);
    });
    
    // Auto-preenche meta title com H1 se estiver vazio
    h1TitleInput.addEventListener('blur', function() {
        const metaTitleInput = document.getElementById('metaTitle');
        if (!metaTitleInput.value && this.value) {
            metaTitleInput.value = this.value;
        }
    });
    
    // Sugere alt text baseado na keyword
    primaryKeywordInput.addEventListener('blur', function() {
        const coverAltInput = document.getElementById('coverImageAlt');
        if (!coverAltInput.value && this.value) {
            const h1 = h1TitleInput.value;
            if (h1) {
                coverAltInput.value = h1;
            }
        }
    });
    
    // Contadores de caracteres
    document.querySelectorAll('input[maxlength], textarea[maxlength]').forEach(input => {
        const counter = input.parentElement.querySelector('.char-counter');
        if (counter) {
            input.addEventListener('input', () => updateCharCounter(input, counter));
        }
    });
    
    // Contadores de palavras
    document.querySelectorAll('textarea:not([maxlength])').forEach(textarea => {
        const counter = textarea.parentElement.querySelector('.word-counter');
        if (counter) {
            textarea.addEventListener('input', () => updateWordCounter(textarea, counter));
        }
    });
    
    // Botões de adicionar campos dinâmicos
    setupDynamicFields();
    
    // Editor toolbar buttons
    setupEditorToolbar();
    
    // Preview button
    document.getElementById('previewBtn').addEventListener('click', showPreview);
    
    // Form submit
    form.addEventListener('submit', handleFormSubmit);
    
    // Modal close
    setupModals();
});

// ======================
// DYNAMIC FIELDS
// ======================

function setupDynamicFields() {
    // Adicionar imagens internas
    document.getElementById('addInternalImage').addEventListener('click', function() {
        const container = document.getElementById('internalImagesContainer');
        const newItem = document.createElement('div');
        newItem.className = 'internal-image-item';
        newItem.innerHTML = `
            <input type="url" name="internalImageUrl[]" placeholder="URL da imagem">
            <input type="text" name="internalImageAlt[]" placeholder="Alt text descritivo">
            <button type="button" class="btn-remove">✕</button>
        `;
        container.appendChild(newItem);
        
        newItem.querySelector('.btn-remove').addEventListener('click', function() {
            newItem.remove();
        });
    });
    
    // Adicionar links internos
    document.getElementById('addInternalLink').addEventListener('click', function() {
        const container = document.getElementById('internalLinksContainer');
        const newItem = document.createElement('div');
        newItem.className = 'link-item';
        newItem.innerHTML = `
            <input type="url" name="internalLinkUrl[]" placeholder="URL interna">
            <input type="text" name="internalLinkAnchor[]" placeholder="Texto âncora">
            <button type="button" class="btn-remove">✕</button>
        `;
        container.appendChild(newItem);
        
        newItem.querySelector('.btn-remove').addEventListener('click', function() {
            newItem.remove();
        });
    });
    
    // Adicionar links externos
    document.getElementById('addExternalLink').addEventListener('click', function() {
        const container = document.getElementById('externalLinksContainer');
        const newItem = document.createElement('div');
        newItem.className = 'link-item';
        newItem.innerHTML = `
            <input type="url" name="externalLinkUrl[]" placeholder="URL externa">
            <input type="text" name="externalLinkAnchor[]" placeholder="Texto âncora">
            <button type="button" class="btn-remove">✕</button>
        `;
        container.appendChild(newItem);
        
        newItem.querySelector('.btn-remove').addEventListener('click', function() {
            newItem.remove();
        });
    });
    
    // Remove buttons existentes
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            this.parentElement.remove();
        });
    });
}

// ======================
// EDITOR TOOLBAR
// ======================

function setupEditorToolbar() {
    const toolbar = document.querySelector('.editor-toolbar');
    const contentBody = document.getElementById('contentBody');
    
    toolbar.querySelectorAll('.editor-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tag = this.getAttribute('data-tag');
            insertTag(contentBody, tag);
        });
    });
}

function insertTag(textarea, tag) {
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const beforeText = textarea.value.substring(0, start);
    const afterText = textarea.value.substring(end);
    
    let insertText = '';
    
    switch(tag) {
        case 'h2':
            insertText = `\n<h2>${selectedText || 'Título da Seção'}</h2>\n`;
            break;
        case 'h3':
            insertText = `\n<h3>${selectedText || 'Subtítulo'}</h3>\n`;
            break;
        case 'p':
            insertText = `\n<p>${selectedText || 'Seu parágrafo aqui...'}</p>\n`;
            break;
        case 'ul':
            insertText = `\n<ul>\n  <li>${selectedText || 'Item 1'}</li>\n  <li>Item 2</li>\n</ul>\n`;
            break;
        case 'strong':
            insertText = `<strong>${selectedText || 'texto em negrito'}</strong>`;
            break;
        case 'em':
            insertText = `<em>${selectedText || 'texto em itálico'}</em>`;
            break;
    }
    
    textarea.value = beforeText + insertText + afterText;
    textarea.focus();
}

// ======================
// PREVIEW
// ======================

function showPreview() {
    const formData = collectFormData();
    
    // Debug: mostra quantas imagens internas foram coletadas
    console.log('📸 Imagens Internas no Preview:', formData.internalImages);
    console.log('🔗 URLs convertidas:', formData.internalImages.map(img => img.url));
    
    const previewHtml = generateFullPreviewPage(formData);
    
    // Open preview in new window
    const previewWindow = window.open('', '_blank');
    previewWindow.document.open();
    previewWindow.document.write(previewHtml);
    previewWindow.document.close();
}

function generateFullPreviewPage(data) {
    // Gera HTML das imagens internas
    const internalImagesHtml = data.internalImages && data.internalImages.length > 0 
        ? `<div class="internal-images" style="margin: 30px 0;">
            <h3 style="margin-bottom: 20px;">📸 Imagens Internas:</h3>
            ${data.internalImages.map(img => `
                <figure style="margin: 20px 0;">
                    <img src="${img.url}" alt="${img.alt}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    ${img.alt ? `<figcaption style="margin-top: 8px; font-size: 14px; color: #666; font-style: italic;">${img.alt}</figcaption>` : ''}
                </figure>
            `).join('')}
           </div>`
        : '';
    
    return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pré-visualização: ${data.h1Title || 'Novo Post'}</title>
    <link href="https://api.fontshare.com/v2/css?f[]=mazzard-h@400,700&f[]=mazzard-m@400,600&display=swap" rel="stylesheet">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Mazzard M', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #000;
            color: #fff;
            line-height: 1.6;
            padding: 40px 20px;
        }
        .preview-container {
            max-width: 900px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 50px;
            border-radius: 24px;
        }
        .preview-header {
            margin-bottom: 40px;
            padding-bottom: 30px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .category-badge {
            display: inline-block;
            padding: 6px 16px;
            background: #EB7A3D;
            color: #fff;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        h1 {
            font-family: 'Mazzard H', sans-serif;
            font-size: 2.5rem;
            color: #fff;
            margin-bottom: 20px;
            line-height: 1.2;
        }
        .meta {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.95rem;
        }
        .meta-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .cover-image {
            width: 100%;
            border-radius: 16px;
            margin: 30px 0;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        }
        .content {
            font-size: 1.1rem;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.9);
        }
        .content p {
            margin-bottom: 20px;
        }
        .internal-images figure {
            margin: 30px 0;
        }
        .internal-images img {
            width: 100%;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }
        .internal-images figcaption {
            margin-top: 12px;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.5);
            font-style: italic;
            text-align: center;
        }
        .tags {
            margin: 40px 0;
            padding-top: 30px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .tag {
            display: inline-block;
            padding: 6px 14px;
            background: rgba(235, 122, 61, 0.15);
            color: #EB7A3D;
            border: 1px solid rgba(235, 122, 61, 0.3);
            border-radius: 20px;
            font-size: 0.85rem;
            margin-right: 10px;
            margin-bottom: 10px;
        }
        .preview-notice {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(235, 122, 61, 0.95);
            color: #fff;
            padding: 12px 24px;
            border-radius: 30px;
            font-weight: 600;
            font-size: 0.9rem;
            box-shadow: 0 4px 20px rgba(235, 122, 61, 0.4);
            z-index: 1000;
        }
    </style>
</head>
<body>
    <div class="preview-notice">📸 Modo Pré-visualização</div>
    <div class="preview-container">
        <div class="preview-header">
            <span class="category-badge">${data.category || 'Categoria'}</span>
            <h1>${data.h1Title || 'Título do Post'}</h1>
            <div class="meta">
                <span class="meta-item">✍️ Por ${data.author || 'Autor'}</span>
                <span class="meta-item">📅 ${data.datePublishedFormatted || new Date().toLocaleDateString('pt-BR')}</span>
                <span class="meta-item">⏱️ ${data.readTime || '5'} min de leitura</span>
            </div>
        </div>
        
        ${data.coverImage ? `
            <img src="${data.coverImage}" alt="${data.coverImageAlt || ''}" class="cover-image">
            ${data.coverImageCaption ? `<p style="text-align: center; margin-top: -20px; margin-bottom: 30px; font-size: 0.9rem; color: rgba(255,255,255,0.5); font-style: italic;">${data.coverImageCaption}</p>` : ''}
        ` : ''}
        
        <div class="content">
            ${data.introduction ? `<div class="introduction" style="font-size: 1.2rem; font-weight: 500; margin-bottom: 30px; padding-left: 20px; border-left: 4px solid #EB7A3D;">${data.introduction.replace(/\n/g, '<br>')}</div>` : ''}
            
            ${data.contentBody ? `<div class="main-content">${data.contentBody.replace(/\n/g, '<br>')}</div>` : '<p>Conteúdo do post será exibido aqui...</p>'}
            
            ${internalImagesHtml}
            
            ${data.conclusion ? `<div class="conclusion" style="margin-top: 40px; padding: 20px; background: rgba(255,255,255,0.03); border-radius: 12px;">${data.conclusion.replace(/\n/g, '<br>')}</div>` : ''}
        </div>
        
        ${data.secondaryKeywords ? `
            <div class="tags">
                ${data.secondaryKeywords.split(',').map(tag => 
                    `<span class="tag">#${tag.trim()}</span>`
                ).join('')}
            </div>
        ` : ''}
        
        ${data.formTitle ? `
            <div class="lead-form" style="margin-top: 50px; padding: 40px; background: linear-gradient(135deg, rgba(235, 122, 61, 0.15), rgba(214, 106, 46, 0.15)); border: 2px solid rgba(235, 122, 61, 0.3); border-radius: 20px;">
                <h3 style="font-size: 2rem; margin-bottom: 15px; text-align: center; color: #EB7A3D;">${data.formTitle}</h3>
                <p style="font-size: 1.1rem; margin-bottom: 30px; text-align: center; opacity: 0.9;">${data.formSubtitle || ''}</p>
                
                <form id="leadCaptureForm" style="max-width: 500px; margin: 0 auto;">
                    ${data.formCollectName ? `
                        <div style="margin-bottom: 20px;">
                            <input type="text" name="name" required placeholder="Seu Nome *" style="width: 100%; padding: 15px; border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; background: rgba(0,0,0,0.3); color: #fff; font-size: 1rem;">
                        </div>
                    ` : ''}
                    
                    ${data.formCollectEmail ? `
                        <div style="margin-bottom: 20px;">
                            <input type="email" name="email" required placeholder="Seu E-mail *" style="width: 100%; padding: 15px; border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; background: rgba(0,0,0,0.3); color: #fff; font-size: 1rem;">
                        </div>
                    ` : ''}
                    
                    ${data.formCollectPhone ? `
                        <div style="margin-bottom: 20px;">
                            <input type="tel" name="phone" required placeholder="Seu Telefone *" style="width: 100%; padding: 15px; border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; background: rgba(0,0,0,0.3); color: #fff; font-size: 1rem;">
                        </div>
                    ` : ''}
                    
                    ${data.qualifiedQuestion ? `
                        <div style="margin-bottom: 20px;">
                            <input type="text" name="qualified_answer" placeholder="${data.qualifiedQuestion}" style="width: 100%; padding: 15px; border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; background: rgba(0,0,0,0.3); color: #fff; font-size: 1rem;">
                        </div>
                    ` : ''}
                    
                    <button type="submit" style="width: 100%; padding: 16px; background: #EB7A3D; color: #fff; border: none; border-radius: 30px; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: all 0.3s;" onmouseover="this.style.background='#d66a2e'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 5px 20px rgba(235,122,61,0.4)'" onmouseout="this.style.background='#EB7A3D'; this.style.transform='translateY(0)'; this.style.boxShadow='none'">
                        ${data.formButtonText || 'Enviar'}
                    </button>
                </form>
                
                <div id="formMessage" style="margin-top: 20px; text-align: center; font-weight: 600; display: none;"></div>
            </div>
            
            <script>
            document.getElementById('leadCaptureForm').addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const formButton = this.querySelector('button[type="submit"]');
                const formMessage = document.getElementById('formMessage');
                
                // Disable button
                formButton.disabled = true;
                formButton.textContent = 'Enviando...';
                
                // Prepare webhook data
                const webhookData = {
                    email: formData.get('email') || '',
                    phone: formData.get('phone') || '',
                    name: formData.get('name') || '',
                    campaign_name: '${data.campaignName || ''}',
                    page_name: '${data.h1Title || ''}',
                    FONTE: window.location.href,
                    PLATAFORMA: 'BLOG',
                    ${data.qualifiedQuestion ? `Qualified_question: formData.get('qualified_answer') || '',` : ''}
                };
                
                try {
                    const response = await fetch('${data.webhookUrl}', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(webhookData)
                    });
                    
                    if (response.ok) {
                        formMessage.style.display = 'block';
                        formMessage.style.color = '#4ade80';
                        formMessage.textContent = '✅ Mensagem enviada com sucesso! Entraremos em contato em breve.';
                        this.reset();
                    } else {
                        throw new Error('Erro no envio');
                    }
                } catch (error) {
                    formMessage.style.display = 'block';
                    formMessage.style.color = '#ef4444';
                    formMessage.textContent = '❌ Erro ao enviar. Tente novamente.';
                } finally {
                    formButton.disabled = false;
                    formButton.textContent = '${data.formButtonText || 'Enviar'}';
                }
            });
            </script>
        ` : ''}
    </div>
</body>
</html>`;
}

// ======================
// FORM SUBMIT
// ======================

// Variável global para armazenar o último HTML gerado
let lastGeneratedHtml = null;
let lastGeneratedSlug = null;

async function handleFormSubmit(e) {
    e.preventDefault();
    
    // Mostra loading
    showLoading();
    
    try {
        // Coleta dados do formulário
        const formData = collectFormData();
        
        console.log('📦 Dados coletados:', formData);
        console.log('🖼️ Imagens internas:', formData.internalImages);
        
        // Gera HTML do post
        const postHtml = await generatePostHtml(formData);
        
        console.log('📄 HTML gerado, tamanho:', postHtml.length, 'caracteres');
        console.log('📄 Primeiros 100 chars do HTML:', postHtml.substring(0, 100));
        
        // Salva HTML globalmente para permitir download posterior
        lastGeneratedHtml = postHtml;
        lastGeneratedSlug = formData.slug;
        
        console.log('💾 HTML salvo globalmente!');
        console.log('💾 lastGeneratedHtml length:', lastGeneratedHtml.length);
        console.log('💾 lastGeneratedSlug:', lastGeneratedSlug);
        
        // Gera o post para download (GitHub Pages workflow)
        const result = await savePostToServer(postHtml, formData.slug);
        
        // Mostra sucesso (mesmo que tenha sido download)
        showSuccess(formData.slug, result);
        
    } catch (error) {
        console.error('❌ Erro ao gerar post:', error);
        alert('Erro ao gerar o post: ' + error.message);
    } finally {
        hideLoading();
    }
}

async function savePostToServer(html, slug) {
    // Verifica se há token GitHub configurado
    const githubToken = localStorage.getItem('github_token');
    
    if (githubToken) {
        // ✅ Token configurado - publica automaticamente no GitHub
        console.log('🚀 Token GitHub encontrado! Publicando automaticamente...');
        
        try {
            const publisher = window.initGitHubPublisher();
            
            if (publisher) {
                console.log('📤 Enviando post para GitHub /posts/...');
                await publisher.savePost(slug, html);
                const publicUrl = publisher.getPublicUrl(slug);
                
                console.log('✅ Post publicado com sucesso!');
                console.log('🔗 URL:', publicUrl);
                
                return {
                    success: true,
                    method: 'github-api',
                    filename: slug + '.html',
                    url: publicUrl,
                    message: '✅ Post publicado automaticamente no GitHub!'
                };
            }
        } catch (error) {
            console.error('❌ Erro ao publicar no GitHub:', error);
            console.warn('⚠️ Fallback para download manual...');
            // Continua para download manual como fallback
        }
    }
    
    // ❌ Sem token ou erro - usa download manual
    console.log('📥 Preparando post para download manual...');
    return savePostAsDownload(html, slug);
}

function savePostAsDownload(html, slug) {
    console.log('📥 Preparando download do post...');
    console.log('📏 Tamanho do HTML:', html.length, 'caracteres');
    
    if (!html || html.trim().length === 0) {
        console.error('❌ HTML vazio!');
        throw new Error('HTML está vazio');
    }
    
    // Download será feito manualmente pelo botão no modal
    // Depois, o arquivo deve ser commitado no GitHub
    
    return {
        success: true,
        method: 'download',
        filename: slug + '.html',
        message: '✅ Post gerado! Use o botão "📥 Baixar HTML" para baixar e depois faça commit no GitHub.'
    };
}


function collectFormData() {
    const form = document.getElementById('blogForm');
    const formData = new FormData(form);
    
    // Data de publicação
    let datePublished = formData.get('datePublished');
    if (!datePublished) {
        datePublished = new Date();
    } else {
        datePublished = new Date(datePublished);
    }
    
    // Tempo de leitura
    let readTime = formData.get('readTime');
    if (!readTime) {
        const allText = formData.get('introduction') + ' ' + 
                       formData.get('contentBody') + ' ' + 
                       formData.get('conclusion');
        readTime = calculateReadTime(allText);
    }
    
    // Processa arrays
    const internalImages = [];
    const internalImageUrls = formData.getAll('internalImageUrl[]');
    const internalImageAlts = formData.getAll('internalImageAlt[]');
    
    console.log('🔍 Debug - URLs coletadas:', internalImageUrls);
    console.log('🔍 Debug - Alts coletados:', internalImageAlts);
    
    for (let i = 0; i < internalImageUrls.length; i++) {
        const rawUrl = internalImageUrls[i];
        const url = rawUrl ? rawUrl.trim() : '';
        
        console.log(`🔍 Imagem ${i+1}:`, {
            rawUrl: rawUrl,
            rawUrlType: typeof rawUrl,
            rawUrlValue: JSON.stringify(rawUrl),
            trimmedUrl: url,
            length: url.length,
            isEmpty: !url || url.length === 0
        });
        
        if (url && url.length > 0) {
            const convertedUrl = convertGoogleDriveUrl(url);
            internalImages.push({
                url: convertedUrl,
                alt: internalImageAlts[i] || ''
            });
            console.log(`✅ Imagem ${i+1} adicionada:`, convertedUrl);
        } else {
            console.log(`⚠️ Imagem ${i+1} ignorada (vazia ou inválida)`);
        }
    }
    
    console.log('📦 Total de imagens internas processadas:', internalImages.length);
    
    const internalLinks = [];
    const internalLinkUrls = formData.getAll('internalLinkUrl[]');
    const internalLinkAnchors = formData.getAll('internalLinkAnchor[]');
    for (let i = 0; i < internalLinkUrls.length; i++) {
        if (internalLinkUrls[i]) {
            internalLinks.push({
                url: internalLinkUrls[i],
                anchor: internalLinkAnchors[i] || ''
            });
        }
    }
    
    const externalLinks = [];
    const externalLinkUrls = formData.getAll('externalLinkUrl[]');
    const externalLinkAnchors = formData.getAll('externalLinkAnchor[]');
    for (let i = 0; i < externalLinkUrls.length; i++) {
        if (externalLinkUrls[i]) {
            externalLinks.push({
                url: externalLinkUrls[i],
                anchor: externalLinkAnchors[i] || ''
            });
        }
    }
    
    // Tags
    const tagsString = formData.get('tags');
    const tagsArray = tagsString.split(',').map(t => t.trim()).filter(t => t);
    
    // Keywords
    const allKeywords = [
        formData.get('primaryKeyword'),
        ...formData.get('secondaryKeywords').split(',').map(k => k.trim()).filter(k => k)
    ].join(', ');
    
    const slug = formData.get('slug');
    const siteUrl = formData.get('siteUrl').replace(/\/$/, '');
    const categorySlug = generateSlug(formData.get('category'));
    
    return {
        // Bloco 1
        h1Title: formData.get('h1Title'),
        slug: slug,
        category: formData.get('category'),
        categorySlug: categorySlug,
        author: formData.get('author'),
        authorAvatar: formData.get('authorAvatar') || 'https://via.placeholder.com/100',
        datePublished: datePublished,
        datePublishedISO: formatDateISO(datePublished),
        datePublishedFormatted: formatDatePTBR(datePublished),
        dateModifiedISO: formatDateISO(new Date()),
        readTime: readTime,
        
        // Bloco 2
        primaryKeyword: formData.get('primaryKeyword'),
        secondaryKeywords: formData.get('secondaryKeywords'),
        keywords: allKeywords,
        metaTitle: formData.get('metaTitle'),
        metaDescription: formData.get('metaDescription'),
        searchIntent: formData.get('searchIntent'),
        
        // Bloco 3
        coverImage: convertGoogleDriveUrl(formData.get('coverImage')), // Converte Google Drive
        coverImageAlt: formData.get('coverImageAlt'),
        coverImageCaption: formData.get('coverImageCaption') || '',
        internalImages: internalImages,
        
        // Bloco 4
        introduction: processImagesInHtml(formData.get('introduction')), // Converte URLs do Drive no HTML
        contentBody: processImagesInHtml(formData.get('contentBody')),   // Converte URLs do Drive no HTML
        conclusion: processImagesInHtml(formData.get('conclusion')),     // Converte URLs do Drive no HTML
        
        // Bloco 5
        internalLinks: internalLinks,
        externalLinks: externalLinks,
        
        // Bloco 6
        tags: tagsString,
        tagsArray: tagsArray,
        relatedPosts: formData.get('relatedPosts'),
        
        // Bloco 7 - Formulário
        formTitle: formData.get('formTitle'),
        formSubtitle: formData.get('formSubtitle'),
        formButtonText: formData.get('formButtonText'),
        webhookUrl: formData.get('webhookUrl'),
        campaignName: formData.get('campaignName'),
        qualifiedQuestion: formData.get('qualifiedQuestion') || '',
        formCollectEmail: formData.get('formCollectEmail') === 'on',
        formCollectPhone: formData.get('formCollectPhone') === 'on',
        formCollectName: formData.get('formCollectName') === 'on',
        
        // Bloco 8
        siteUrl: siteUrl,
        siteLogo: formData.get('siteLogo') || `${siteUrl}/logo.png`,
        enableComments: formData.get('enableComments') === 'on',
        enableShare: formData.get('enableShare') === 'on',
        
        // URLs
        canonicalUrl: `${siteUrl}/blog/${slug}`,
        blogUrl: `${siteUrl}/blog`,
        categoryUrl: `${siteUrl}/blog/${categorySlug}`
    };
}

async function generatePostHtml(data) {
    console.log('📥 Carregando template...');
    
    try {
        // Carrega o template
        const response = await fetch('templates/post-template.html');
        
        console.log('📡 Status do fetch template:', response.status);
        
        if (!response.ok) {
            throw new Error(`Erro ao carregar template: ${response.status} ${response.statusText}`);
        }
        
        let template = await response.text();
        console.log('✅ Template carregado, tamanho:', template.length, 'caracteres');
        
        // Sanitiza URLs para prevenir JavaScript injection
        const sanitizeUrl = (url) => {
            if (!url) return '';
            const urlStr = String(url).trim();
            // Remove javascript:, data:, vbscript:, and other dangerous protocols
            const dangerousProtocols = /^(\s*)(javascript|data|vbscript|file|about):/i;
            if (dangerousProtocols.test(urlStr)) {
                return '';
            }
            // Only allow http, https, mailto, and relative URLs
            if (!/^(https?:\/\/|mailto:|\/|#)/i.test(urlStr)) {
                return '';
            }
            return urlStr;
        };
    
    // Substitui placeholders com sanitização
    template = template.replace(/{{META_TITLE}}/g, escapeHtml(data.metaTitle));
    template = template.replace(/{{META_DESCRIPTION}}/g, escapeHtml(data.metaDescription));
    template = template.replace(/{{KEYWORDS}}/g, escapeHtml(data.keywords));
    template = template.replace(/{{AUTHOR}}/g, escapeHtml(data.author));
    template = template.replace(/{{CANONICAL_URL}}/g, sanitizeUrl(data.canonicalUrl));
    template = template.replace(/{{COVER_IMAGE_URL}}/g, sanitizeUrl(data.coverImage));
    template = template.replace(/{{DATE_PUBLISHED}}/g, data.datePublishedISO);
    template = template.replace(/{{DATE_MODIFIED}}/g, data.dateModifiedISO);
    template = template.replace(/{{CATEGORY}}/g, escapeHtml(data.category));
    template = template.replace(/{{TAGS}}/g, escapeHtml(data.tags));
    template = template.replace(/{{H1_TITLE}}/g, escapeHtml(data.h1Title));
    template = template.replace(/{{SITE_LOGO_URL}}/g, sanitizeUrl(data.siteLogo));
    template = template.replace(/{{SITE_URL}}/g, sanitizeUrl(data.siteUrl));
    template = template.replace(/{{CATEGORY_SLUG}}/g, data.categorySlug);
    template = template.replace(/{{READ_TIME}}/g, data.readTime);
    template = template.replace(/{{AUTHOR_AVATAR}}/g, sanitizeUrl(data.authorAvatar));
    template = template.replace(/{{DATE_PUBLISHED_FORMATTED}}/g, data.datePublishedFormatted);
    template = template.replace(/{{COVER_IMAGE_ALT}}/g, escapeHtml(data.coverImageAlt));
    template = template.replace(/{{COVER_IMAGE_CAPTION}}/g, escapeHtml(data.coverImageCaption));
    
    // Para conteúdo HTML, permitimos tags HTML mas escapamos scripts
    const sanitizeHtmlContent = (html) => {
        if (!html) return '';
        // Remove scripts e event handlers
        return html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/data:text\/html/gi, '');
    };
    
    template = template.replace(/{{INTRODUCTION}}/g, sanitizeHtmlContent(data.introduction));
    template = template.replace(/{{CONTENT_BODY}}/g, sanitizeHtmlContent(data.contentBody));
    template = template.replace(/{{CONCLUSION}}/g, sanitizeHtmlContent(data.conclusion));
    
    // Tags HTML
    const tagsHtml = data.tagsArray.map(tag => 
        `<a href="${sanitizeUrl(data.siteUrl)}/blog/tag/${generateSlug(tag)}" class="tag">#${escapeHtml(tag)}</a>`
    ).join(' ');
    template = template.replace(/{{TAGS_HTML}}/g, tagsHtml);
    
    // CTA
    template = template.replace(/{{CTA_TITLE}}/g, escapeHtml(data.ctaTitle));
    template = template.replace(/{{CTA_TEXT}}/g, escapeHtml(data.ctaText));
    template = template.replace(/{{CTA_LINK}}/g, sanitizeUrl(data.ctaLink));
    template = template.replace(/{{CTA_BUTTON_TEXT}}/g, escapeHtml(data.ctaButtonText));
    
    // Related posts (placeholder por enquanto)
    template = template.replace(/{{RELATED_POSTS_HTML}}/g, '<!-- Posts relacionados serão adicionados automaticamente -->');
    
    return template;
    
    } catch (error) {
        console.error('❌ Erro ao gerar HTML do template:', error);
        throw error;
    }
}

function downloadPost(html, slug) {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ======================
// MODALS
// ======================

function setupModals() {
    // Close modal buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Click outside modal
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Success modal buttons
    document.getElementById('openPost')?.addEventListener('click', function() {
        // Abre o post gerado
        const slug = document.getElementById('postPath').textContent.split('/').pop().replace('.html', '');
        window.open(`posts/${slug}.html`, '_blank');
    });
    
    document.getElementById('createAnother')?.addEventListener('click', function() {
        document.getElementById('successModal').style.display = 'none';
        document.getElementById('blogForm').reset();
        window.scrollTo(0, 0);
    });
}

function showSuccess(slug, result) {
    console.log('🎉 showSuccess chamado!');
    console.log('🎉 slug:', slug);
    console.log('🎉 result:', result);
    console.log('🎉 lastGeneratedHtml disponível?', !!lastGeneratedHtml);
    console.log('🎉 lastGeneratedSlug:', lastGeneratedSlug);
    
    const modal = document.getElementById('successModal');
    const pathElement = document.getElementById('postPath');
    
    // GitHub Pages workflow - mostra onde o arquivo deve ser salvo
    const postPath = `posts/${slug}.html`;
    pathElement.textContent = postPath;
    
    // Mostra mensagem adicional baseada no método usado
    const messageElement = document.querySelector('.success-message') || document.createElement('p');
    if (!document.querySelector('.success-message')) {
        messageElement.className = 'success-message';
        messageElement.style.marginTop = '10px';
        messageElement.style.fontSize = '0.9em';
        messageElement.style.color = '#666';
        messageElement.style.padding = '10px';
        messageElement.style.backgroundColor = '#f0f0f0';
        messageElement.style.borderRadius = '5px';
        modal.querySelector('.modal-content').appendChild(messageElement);
    }
    
    if (result && result.method === 'github-api') {
        // ✅ Publicado automaticamente via GitHub API
        messageElement.innerHTML = '🚀 <strong>Post publicado automaticamente no GitHub!</strong><br>O post já está online em <code>/posts/</code>. Aguarde ~1 minuto para o GitHub Pages atualizar.';
        messageElement.style.backgroundColor = '#d4edda';
        messageElement.style.color = '#155724';
        messageElement.style.fontWeight = 'bold';
        
        // Se tiver URL, mostra
        if (result.url) {
            messageElement.innerHTML += `<br><br>🔗 <a href="${result.url}" target="_blank" style="color: #155724;">${result.url}</a>`;
        }
    } else if (result && result.method === 'download') {
        messageElement.innerHTML = '✅ <strong>Post gerado com sucesso!</strong><br>Baixe o HTML e faça commit na pasta <code>posts/</code> do GitHub.';
        messageElement.style.backgroundColor = '#fff3cd';
        messageElement.style.color = '#856404';
        messageElement.style.fontWeight = 'bold';
    } else {
        messageElement.textContent = '✅ Post gerado com sucesso!';
        messageElement.style.backgroundColor = '#d4edda';
        messageElement.style.color = '#155724';
    }
    
    // Adiciona ou atualiza botão de download do HTML
    let downloadBtn = document.getElementById('downloadHtmlBtn');
    if (!downloadBtn) {
        downloadBtn = document.createElement('button');
        downloadBtn.id = 'downloadHtmlBtn';
        downloadBtn.className = 'btn-secondary';
        downloadBtn.style.marginTop = '15px';
        downloadBtn.style.padding = '10px 20px';
        downloadBtn.style.backgroundColor = '#007bff';
        downloadBtn.style.color = 'white';
        downloadBtn.style.border = 'none';
        downloadBtn.style.borderRadius = '5px';
        downloadBtn.style.cursor = 'pointer';
        downloadBtn.style.fontSize = '14px';
        downloadBtn.innerHTML = '📥 Baixar HTML Completo';
        
        modal.querySelector('.modal-content').appendChild(downloadBtn);
    }
    
    // Sempre atualiza o evento onclick para garantir que funcione
    downloadBtn.onclick = function() {
        console.log('🔍 Debug - Botão clicado!');
        console.log('🔍 Debug - lastGeneratedHtml existe?', !!lastGeneratedHtml);
        console.log('🔍 Debug - lastGeneratedSlug:', lastGeneratedSlug);
        
        if (lastGeneratedHtml && lastGeneratedSlug) {
            console.log('📥 Iniciando download manual do HTML...');
            console.log('📏 Tamanho:', lastGeneratedHtml.length, 'caracteres');
            
            try {
                const blob = new Blob([lastGeneratedHtml], { type: 'text/html; charset=utf-8' });
                console.log('📦 Blob criado, tamanho:', blob.size, 'bytes');
                
                const url = URL.createObjectURL(blob);
                console.log('🔗 URL criada:', url.substring(0, 50) + '...');
                
                const link = document.createElement('a');
                link.href = url;
                link.download = lastGeneratedSlug + '.html';
                
                console.log('📎 Link criado, filename:', link.download);
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
                console.log('✅ Download concluído!');
                alert('✅ Download iniciado! Verifique sua pasta de downloads.');
            } catch (error) {
                console.error('❌ Erro ao criar download:', error);
                alert('❌ Erro ao criar download: ' + error.message);
            }
        } else {
            console.error('❌ HTML não disponível!');
            console.log('lastGeneratedHtml:', lastGeneratedHtml ? 'existe' : 'null');
            console.log('lastGeneratedSlug:', lastGeneratedSlug ? lastGeneratedSlug : 'null');
            alert('❌ Erro: HTML não disponível. Gere o post novamente.');
        }
    };
    
    modal.style.display = 'flex';
}

function showLoading() {
    // Você pode adicionar um spinner aqui
    document.body.style.cursor = 'wait';
}

function hideLoading() {
    document.body.style.cursor = 'default';
}

// ======================
// TEMPLATE PARA IA
// ======================

// Botão copiar template
document.getElementById('copyTemplate')?.addEventListener('click', function() {
    const template = document.getElementById('aiTemplate');
    const status = document.getElementById('copyStatus');
    
    if (template) {
        const templateText = template.value;
        
        // Copia usando a API moderna
        if (navigator.clipboard) {
            navigator.clipboard.writeText(templateText).then(() => {
                // Mostra feedback de sucesso
                status.textContent = '✅ Template copiado!';
                status.style.color = '#27ae60';
                
                setTimeout(() => {
                    status.textContent = '';
                }, 3000);
            }).catch(err => {
                status.textContent = '❌ Erro ao copiar. Tente novamente.';
                status.style.color = '#e74c3c';
                console.error('Erro ao copiar:', err);
            });
        } else {
            // Fallback para navegadores antigos
            template.select();
            
            try {
                document.execCommand('copy');
                status.textContent = '✅ Template copiado!';
                status.style.color = '#27ae60';
            } catch (err) {
                status.textContent = '❌ Erro ao copiar. Tente novamente.';
                status.style.color = '#e74c3c';
                console.error('Erro ao copiar:', err);
            }
            
            setTimeout(() => {
                status.textContent = '';
            }, 3000);
        }
    }
});

// ======================
// EXPORT FUNCTIONS
// ======================

// ======================
// GITHUB INTEGRATION
// ======================

// Modal de configuração do GitHub
const githubModal = document.getElementById('githubModal');
const configBtn = document.getElementById('configGitHub');
const closeGithubModal = document.getElementById('closeGithubModal');
const saveTokenBtn = document.getElementById('saveToken');
const testTokenBtn = document.getElementById('testToken');
const githubTokenInput = document.getElementById('githubToken');
const tokenStatus = document.getElementById('tokenStatus');

// Abrir modal
configBtn?.addEventListener('click', () => {
    githubModal.style.display = 'flex';
    // Carregar token salvo (mascarado)
    const savedToken = localStorage.getItem('github_token');
    if (savedToken) {
        githubTokenInput.value = '••••••••••••••••••••';
        tokenStatus.textContent = '✅ Token já configurado';
        tokenStatus.className = 'success';
    }
});

// Fechar modal
closeGithubModal?.addEventListener('click', () => {
    githubModal.style.display = 'none';
});

// Salvar token
saveTokenBtn?.addEventListener('click', () => {
    const token = githubTokenInput.value.trim();
    
    if (!token || token === '••••••••••••••••••••') {
        tokenStatus.textContent = '❌ Digite um token válido';
        tokenStatus.className = 'error';
        return;
    }
    
    if (!token.startsWith('ghp_') && !token.startsWith('github_pat_')) {
        tokenStatus.textContent = '❌ Token inválido. Deve começar com ghp_ ou github_pat_';
        tokenStatus.className = 'error';
        return;
    }
    
    localStorage.setItem('github_token', token);
    tokenStatus.textContent = '✅ Token salvo com sucesso!';
    tokenStatus.className = 'success';
    
    // Mascarar token
    setTimeout(() => {
        githubTokenInput.value = '••••••••••••••••••••';
    }, 1000);
});

// Testar conexão
testTokenBtn?.addEventListener('click', async () => {
    const token = localStorage.getItem('github_token');
    
    if (!token) {
        tokenStatus.textContent = '❌ Nenhum token configurado';
        tokenStatus.className = 'error';
        return;
    }
    
    tokenStatus.textContent = '🔄 Testando conexão...';
    tokenStatus.className = '';
    
    try {
        const response = await fetch('https://api.github.com/repos/SEU-USUARIO-GITHUB/SEU-BLOG-REPO', {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        if (response.ok) {
            tokenStatus.textContent = '✅ Conexão bem-sucedida! Pronto para publicar.';
            tokenStatus.className = 'success';
        } else {
            tokenStatus.textContent = '❌ Erro de autenticação. Verifique o token.';
            tokenStatus.className = 'error';
        }
    } catch (error) {
        tokenStatus.textContent = '❌ Erro de rede: ' + error.message;
        tokenStatus.className = 'error';
    }
});

// ======================
// EXPORT FUNCTIONS
// ======================

// Permite usar estas funções em outros arquivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateSlug,
        removeStopwords,
        calculateReadTime,
        formatDateISO,
        formatDatePTBR
    };
}
