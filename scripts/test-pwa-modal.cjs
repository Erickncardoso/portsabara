#!/usr/bin/env node

console.log('🧪 Teste do Modal de Instalação PWA - PortAll');
console.log('=' .repeat(50));

console.log('\n📋 FUNCIONALIDADES DO MODAL:');

console.log('\n1️⃣  BOTÕES ESPECÍFICOS:');
console.log('   🤖 Botão Android: Verde com ícone do Android');
console.log('   🍎 Botão iOS: Branco com ícone da Apple');
console.log('   📱 Detecta automaticamente o dispositivo');

console.log('\n2️⃣  QUANDO APARECE:');
console.log('   ✅ Sempre na página /tipo-cadastro (após 1 segundo)');
console.log('   ✅ Em outras páginas a cada 3 visitas');
console.log('   ✅ Respeita intervalo de 5 minutos entre exibições');
console.log('   ✅ Não aparece se já está instalado');

console.log('\n3️⃣  CONTROLES DO USUÁRIO:');
console.log('   ⏰ "Agora não": Fecha e pode aparecer novamente em 5 min');
console.log('   🚫 "Não mostrar mais": Nunca mais aparece');
console.log('   ❌ Botão X: Mesmo comportamento de "Agora não"');

console.log('\n4️⃣  COMPORTAMENTO POR DISPOSITIVO:');

console.log('\n   🤖 ANDROID:');
console.log('   • Tenta instalação nativa via beforeinstallprompt');
console.log('   • Fallback para instruções via DevTools');
console.log('   • Botão verde destacado');

console.log('\n   🍎 iOS:');
console.log('   • Mostra instruções específicas do Safari');
console.log('   • Explica como usar "Adicionar à Tela de Início"');
console.log('   • Botão com borda');

console.log('\n5️⃣  INFORMAÇÕES EXIBIDAS:');
console.log('   📱 Ícone do smartphone no topo');
console.log('   📝 Título "Instalar PortAll"');
console.log('   💡 Lista de benefícios do app');
console.log('   🎨 Design moderno com gradiente azul');

console.log('\n6️⃣  COMO TESTAR:');

console.log('\n   🔧 DESENVOLVIMENTO:');
console.log('   • npm run dev');
console.log('   • Acesse http://localhost:5173/tipo-cadastro');
console.log('   • Modal aparece após 1 segundo');

console.log('\n   🌐 PRODUÇÃO:');
console.log('   • npm run build && npm run preview');
console.log('   • Acesse http://localhost:4173/tipo-cadastro');
console.log('   • Modal aparece após 1.5 segundos');

console.log('\n   🧹 LIMPAR DADOS PARA TESTE:');
console.log('   • Abra DevTools (F12)');
console.log('   • Console: localStorage.clear()');
console.log('   • Recarregue a página');

console.log('\n7️⃣  CHAVES DO LOCALSTORAGE:');
console.log('   • pwa-install-dont-show: "true" se não mostrar mais');
console.log('   • pwa-install-last-shown: timestamp da última exibição');
console.log('   • pwa-install-visit-count: contador de visitas');

console.log('\n8️⃣  COMANDOS ÚTEIS PARA DEBUG:');

console.log('\n   📦 Verificar PWA:');
console.log('   localStorage.getItem("pwa-install-dont-show")');

console.log('\n   🔄 Resetar modal:');
console.log('   localStorage.removeItem("pwa-install-dont-show")');
console.log('   localStorage.removeItem("pwa-install-last-shown")');

console.log('\n   ⏰ Ver última exibição:');
console.log('   new Date(parseInt(localStorage.getItem("pwa-install-last-shown")))');

console.log('\n   🔢 Ver contador de visitas:');
console.log('   localStorage.getItem("pwa-install-visit-count")');

console.log('\n9️⃣  TROUBLESHOOTING:');

console.log('\n   ❓ Modal não aparece:');
console.log('   • Verifique se PWA já está instalada');
console.log('   • Limpe localStorage');
console.log('   • Aguarde 5 minutos se foi mostrado recentemente');
console.log('   • Verifique console para logs de debug');

console.log('\n   🔧 Forçar exibição:');
console.log('   • localStorage.clear()');
console.log('   • Recarregue /tipo-cadastro');

console.log('\n🔟 PÁGINAS QUE MOSTRAM O MODAL:');
console.log('   🎯 /tipo-cadastro: Sempre (respeitando intervalo)');
console.log('   🏠 /: A cada 3 visitas');
console.log('   🔐 /login-*: A cada 3 visitas');
console.log('   📝 /cadastro-*: A cada 3 visitas');

console.log('\n' + '=' .repeat(50));
console.log('🎯 DICA IMPORTANTE:');
console.log('O modal é inteligente e não incomoda o usuário.');
console.log('Ele aparece no momento certo e respeita as preferências.');
console.log('\n🏥 PortAll - Modal de Instalação PWA');
console.log('=' .repeat(50)); 