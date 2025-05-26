#!/usr/bin/env node

console.log('🧪 Teste de Instalação PWA - PortAll');
console.log('=' .repeat(50));

console.log('\n📋 CHECKLIST PARA INSTALAÇÃO PWA:');

console.log('\n1️⃣  VERIFICAÇÕES BÁSICAS:');
console.log('   ✅ HTTPS ou localhost');
console.log('   ✅ Manifest.json válido');
console.log('   ✅ Service Worker registrado');
console.log('   ✅ Ícones 192x192 e 512x512 maskable');
console.log('   ✅ Nome da aplicação definido');

console.log('\n2️⃣  COMO TESTAR A INSTALAÇÃO:');

console.log('\n   🌐 MÉTODO 1 - Barra de Endereços:');
console.log('   • Procure pelo ícone de instalação (+) na barra de endereços');
console.log('   • Clique no ícone para instalar');

console.log('\n   🔧 MÉTODO 2 - DevTools:');
console.log('   • Abra DevTools (F12)');
console.log('   • Vá para Application > Manifest');
console.log('   • Clique em "Install" ou "Add to homescreen"');

console.log('\n   📱 MÉTODO 3 - Menu do Navegador:');
console.log('   • Chrome: Menu ⋮ → "Instalar PortAll..."');
console.log('   • Firefox: Menu ☰ → "Instalar esta página"');
console.log('   • Edge: Menu ⋯ → "Aplicativos" → "Instalar este site"');

console.log('\n   🎯 MÉTODO 4 - Botão no Site:');
console.log('   • Procure pelo botão "Instalar App" no menu de navegação');
console.log('   • Clique no botão para instalar');

console.log('\n3️⃣  TROUBLESHOOTING:');

console.log('\n   ❓ Se o botão de instalação não aparecer:');
console.log('   • Aguarde 5 segundos após carregar a página');
console.log('   • Verifique se está em HTTPS ou localhost');
console.log('   • Limpe o cache do navegador (Ctrl+Shift+R)');
console.log('   • Verifique se a PWA já não está instalada');

console.log('\n   🔄 Para forçar a verificação:');
console.log('   • Abra o console do navegador (F12)');
console.log('   • Digite: localStorage.removeItem("pwa-install-dismissed")');
console.log('   • Recarregue a página');

console.log('\n   🧹 Para limpar dados da PWA:');
console.log('   • DevTools > Application > Storage');
console.log('   • Clique em "Clear storage"');
console.log('   • Recarregue a página');

console.log('\n4️⃣  VERIFICAÇÃO PÓS-INSTALAÇÃO:');

console.log('\n   ✅ A PWA deve aparecer:');
console.log('   • Na área de trabalho (desktop)');
console.log('   • No menu de aplicativos');
console.log('   • Na tela inicial (mobile)');

console.log('\n   ✅ Funcionalidades esperadas:');
console.log('   • Abrir em janela própria (standalone)');
console.log('   • Funcionar offline (básico)');
console.log('   • Receber notificações');
console.log('   • Ícone do PortAll visível');

console.log('\n5️⃣  COMANDOS ÚTEIS:');

console.log('\n   📦 Verificar ícones:');
console.log('   npm run verify-pwa');

console.log('\n   🚀 Build de produção:');
console.log('   npm run build');

console.log('\n   🔍 Servir build local:');
console.log('   npm run preview');

console.log('\n' + '=' .repeat(50));
console.log('🎯 DICA IMPORTANTE:');
console.log('Em produção, o prompt de instalação aparece após 5 segundos.');
console.log('Em desenvolvimento, use o botão "Instalar App" no menu.');
console.log('\n🏥 PortAll - Sistema de Gestão Hospitalar');
console.log('=' .repeat(50)); 