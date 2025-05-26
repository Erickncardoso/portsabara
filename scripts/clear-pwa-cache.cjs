const fs = require('fs');
const path = require('path');

console.log('🧹 Script para Limpar Cache PWA - Hospital Sabará');
console.log('================================================\n');

// Verificar se os ícones existem
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
const manifestPath = path.join(__dirname, '..', 'public', 'manifest.json');

console.log('📋 Verificando arquivos PWA...');

if (fs.existsSync(iconsDir)) {
  const icons = fs.readdirSync(iconsDir).filter(file => file.endsWith('.png'));
  console.log(`✅ Encontrados ${icons.length} ícones PNG`);
  
  // Verificar tamanhos dos ícones principais
  const mainIcons = ['icon-192x192.png', 'icon-512x512.png'];
  mainIcons.forEach(iconName => {
    const iconPath = path.join(iconsDir, iconName);
    if (fs.existsSync(iconPath)) {
      const stats = fs.statSync(iconPath);
      console.log(`   ${iconName}: ${Math.round(stats.size / 1024)}KB`);
    }
  });
} else {
  console.log('❌ Diretório de ícones não encontrado');
}

if (fs.existsSync(manifestPath)) {
  console.log('✅ Manifest.json encontrado');
} else {
  console.log('❌ Manifest.json não encontrado');
}

console.log('\n🔧 Para resolver problemas de cache do ícone:');
console.log('');
console.log('1. 🌐 No Chrome:');
console.log('   - Pressione Ctrl+Shift+R (ou Cmd+Shift+R no Mac)');
console.log('   - Ou F12 → Application → Storage → Clear storage');
console.log('   - Ou Settings → Privacy → Clear browsing data');
console.log('');
console.log('2. 🔍 DevTools:');
console.log('   - F12 → Application → Manifest');
console.log('   - Verifique se os ícones carregam sem erro');
console.log('   - Application → Service Workers → Unregister');
console.log('');
console.log('3. 📱 Teste de Instalação:');
console.log('   - Chrome: Endereço → Ícone de instalação');
console.log('   - Ou DevTools → Application → Manifest → Install');
console.log('');
console.log('4. 🔄 Se ainda não funcionar:');
console.log('   - Feche completamente o navegador');
console.log('   - Reabra e acesse localhost:8085');
console.log('   - Aguarde alguns segundos para cache atualizar');
console.log('');
console.log('5. 🧪 Teste em modo incógnito:');
console.log('   - Ctrl+Shift+N (Chrome)');
console.log('   - Acesse localhost:8085');
console.log('   - Teste a instalação');
console.log('');

// Verificar se o servidor está rodando
console.log('🌐 Verificação do servidor:');
console.log('   URL: http://localhost:8085');
console.log('   Manifest: http://localhost:8085/manifest.json');
console.log('   Ícone principal: http://localhost:8085/icons/icon-192x192.png');
console.log('');

console.log('💡 Dicas importantes:');
console.log('   - O ícone pode demorar alguns segundos para aparecer');
console.log('   - Certifique-se que está em HTTPS ou localhost');
console.log('   - Alguns navegadores cachiam agressivamente');
console.log('   - Teste em diferentes navegadores se necessário');
console.log('');

console.log('✅ Script concluído!');
console.log('   Execute os passos acima para limpar o cache');
console.log('   O ícone melhorado deve aparecer na instalação'); 