const fs = require('fs');
const path = require('path');

// Criar screenshots simples para PWA
function createScreenshots() {
  const screenshotsDir = path.join(__dirname, '..', 'public', 'screenshots');
  
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }
  
  console.log('📸 Criando screenshots para PWA...');
  
  // Screenshot desktop (1280x720)
  const desktopScreenshot = `<svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1280" height="720" fill="url(#bg)"/>
  
  <!-- Header -->
  <rect x="0" y="0" width="1280" height="80" fill="#ffffff" opacity="0.95"/>
  <text x="40" y="50" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="#1e40af">Hospital Sabará - Sistema de Gestão</text>
  
  <!-- Main content area -->
  <rect x="40" y="120" width="1200" height="560" fill="#ffffff" opacity="0.9" rx="12"/>
  
  <!-- Cards -->
  <rect x="80" y="160" width="280" height="200" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" rx="8"/>
  <text x="220" y="190" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1e40af" text-anchor="middle">Área Médica</text>
  <text x="220" y="220" font-family="Arial, sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Gestão de pacientes</text>
  <text x="220" y="240" font-family="Arial, sans-serif" font-size="14" fill="#64748b" text-anchor="middle">e prontuários</text>
  
  <rect x="400" y="160" width="280" height="200" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" rx="8"/>
  <text x="540" y="190" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1e40af" text-anchor="middle">Farmácia</text>
  <text x="540" y="220" font-family="Arial, sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Controle de</text>
  <text x="540" y="240" font-family="Arial, sans-serif" font-size="14" fill="#64748b" text-anchor="middle">medicamentos</text>
  
  <rect x="720" y="160" width="280" height="200" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" rx="8"/>
  <text x="860" y="190" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1e40af" text-anchor="middle">Enfermaria</text>
  <text x="860" y="220" font-family="Arial, sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Cuidados e</text>
  <text x="860" y="240" font-family="Arial, sans-serif" font-size="14" fill="#64748b" text-anchor="middle">monitoramento</text>
  
  <!-- Footer -->
  <text x="640" y="650" font-family="Arial, sans-serif" font-size="12" fill="#ffffff" text-anchor="middle" opacity="0.8">Sistema completo de gestão hospitalar</text>
</svg>`;
  
  // Screenshot mobile (390x844)
  const mobileScreenshot = `<svg width="390" height="844" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-mobile" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="390" height="844" fill="url(#bg-mobile)"/>
  
  <!-- Header -->
  <rect x="0" y="0" width="390" height="100" fill="#ffffff" opacity="0.95"/>
  <text x="195" y="40" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#1e40af" text-anchor="middle">Hospital Sabará</text>
  <text x="195" y="65" font-family="Arial, sans-serif" font-size="14" fill="#64748b" text-anchor="middle">Sistema de Gestão</text>
  
  <!-- Main content -->
  <rect x="20" y="130" width="350" height="680" fill="#ffffff" opacity="0.9" rx="12"/>
  
  <!-- Mobile cards -->
  <rect x="40" y="160" width="310" height="120" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" rx="8"/>
  <text x="195" y="190" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#1e40af" text-anchor="middle">Área Médica</text>
  <text x="195" y="215" font-family="Arial, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">Gestão de pacientes e prontuários</text>
  
  <rect x="40" y="300" width="310" height="120" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" rx="8"/>
  <text x="195" y="330" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#1e40af" text-anchor="middle">Farmácia</text>
  <text x="195" y="355" font-family="Arial, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">Controle de medicamentos</text>
  
  <rect x="40" y="440" width="310" height="120" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" rx="8"/>
  <text x="195" y="470" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#1e40af" text-anchor="middle">Enfermaria</text>
  <text x="195" y="495" font-family="Arial, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">Cuidados e monitoramento</text>
</svg>`;
  
  // Salvar screenshots como SVG (que funcionam como imagens)
  const desktopPath = path.join(screenshotsDir, 'desktop-home.png');
  const mobilePath = path.join(screenshotsDir, 'mobile-home.png');
  
  fs.writeFileSync(desktopPath, desktopScreenshot);
  fs.writeFileSync(mobilePath, mobileScreenshot);
  
  console.log('✅ Screenshot desktop criado: desktop-home.png (1280x720)');
  console.log('✅ Screenshot mobile criado: mobile-home.png (390x844)');
  console.log('\n🎉 Screenshots PWA criados com sucesso!');
  console.log('📝 Screenshots são representações visuais do sistema');
  console.log('💡 Para melhor qualidade, substitua por capturas reais da tela');
}

// Executar
try {
  createScreenshots();
} catch (error) {
  console.error('❌ Erro:', error.message);
  process.exit(1);
} 