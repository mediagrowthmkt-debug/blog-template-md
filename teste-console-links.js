// 🧪 TESTE DIRETO NO CONSOLE - COLE ESTE CÓDIGO NO CONSOLE DO NAVEGADOR

console.log('🧪 INICIANDO TESTE DE LINKS...');

// Simula dados de teste
const testData = {
    h1Title: 'Teste de Links',
    contentBody: 'Este é um teste',
    internalLinks: [
        { url: 'https://exemplo.com/post1', anchor: 'Post 1' }
    ],
    externalLinks: [
        { url: 'https://www.localfalcon.com', anchor: 'Local Falcon' }
    ]
};

console.log('📦 Dados de teste:', testData);

// Testa se a função existe
if (typeof generateLinksSection === 'function') {
    console.log('✅ Função generateLinksSection encontrada!');
    
    // Executa a função
    const resultado = generateLinksSection(testData);
    
    console.log('📄 HTML gerado:');
    console.log(resultado);
    
    // Mostra o HTML em uma div temporária
    const testDiv = document.createElement('div');
    testDiv.innerHTML = resultado;
    testDiv.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 99999; background: white; padding: 20px; border: 3px solid red; max-width: 80%; max-height: 80%; overflow: auto;';
    document.body.appendChild(testDiv);
    
    console.log('✅ Teste concluído! Verifique a caixa vermelha na tela.');
    console.log('📏 Tamanho do HTML:', resultado.length, 'caracteres');
    
    // Remove após 10 segundos
    setTimeout(() => {
        testDiv.remove();
        console.log('🗑️ Div de teste removida.');
    }, 10000);
    
} else {
    console.error('❌ ERRO: Função generateLinksSection NÃO ENCONTRADA!');
    console.log('Funções disponíveis:', Object.keys(window).filter(key => key.includes('generate')));
}
