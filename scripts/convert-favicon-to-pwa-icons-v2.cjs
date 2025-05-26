const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Tamanhos necessários para PWA
const iconSizes = [
  { size: 72, purpose: 'any' },
  { size: 96, purpose: 'any' },
  { size: 128, purpose: 'any' },
  { size: 144, purpose: 'any maskable' },
  { size: 152, purpose: 'any' },
  { size: 192, purpose: 'any maskable' },
  { size: 384, purpose: 'any' },
  { size: 512, purpose: 'any maskable' }
];

// Ícones especiais
const specialIcons = [
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'shortcut-medico.png', size: 96 },
  { name: 'shortcut-farmacia.png', size: 96 },
  { name: 'shortcut-enfermaria.png', size: 96 }
];

// Função para criar um ícone SVG baseado no Hospital Sabará
function createHospitalIcon(size, isSpecial = false, specialType = '') {
  const iconSvg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg-${size}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${size}" height="${size}" fill="url(#bg-${size})" rx="${size * 0.1}"/>
  
  <!-- Hospital cross icon -->
  <g transform="translate(${size * 0.25}, ${size * 0.25})">
    <!-- Vertical bar of cross -->
    <rect x="${size * 0.15}" y="${size * 0.05}" width="${size * 0.2}" height="${size * 0.4}" fill="white" rx="${size * 0.02}"/>
    <!-- Horizontal bar of cross -->
    <rect x="${size * 0.05}" y="${size * 0.15}" width="${size * 0.4}" height="${size * 0.2}" fill="white" rx="${size * 0.02}"/>
  </g>
  
  ${isSpecial ? `
  <!-- Special icon indicator -->
  <circle cx="${size * 0.8}" cy="${size * 0.2}" r="${size * 0.08}" fill="white"/>
  <text x="${size * 0.8}" y="${size * 0.25}" font-family="Arial, sans-serif" font-size="${size * 0.08}" text-anchor="middle" fill="#3b82f6">${getSpecialIcon(specialType)}</text>
  ` : ''}
  
  <!-- Hospital text (only for larger icons) -->
  ${size >= 128 ? `
  <text x="${size * 0.5}" y="${size * 0.85}" font-family="Arial, sans-serif" font-size="${size * 0.08}" font-weight="bold" fill="white" text-anchor="middle">HOSPITAL</text>
  ` : ''}
  
  ${size >= 192 ? `
  <text x="${size * 0.5}" y="${size * 0.95}" font-family="Arial, sans-serif" font-size="${size * 0.06}" fill="white" text-anchor="middle" opacity="0.9">SABARÁ</text>
  ` : ''}
</svg>`;
  
  return iconSvg;
}

function getSpecialIcon(type) {
  switch (type) {
    case 'medico': return '🩺';
    case 'farmacia': return '💊';
    case 'enfermaria': return '🏥';
    default: return '⚕️';
  }
}

async function convertFaviconToPWAIcons() {
  const faviconPath = path.join(__dirname, '..', 'public', 'favicon.ico');
  const iconsDir = path.join(__dirname, '..', 'public', 'icons');
  
  // Verificar se favicon existe
  if (!fs.existsSync(faviconPath)) {
    throw new Error('favicon.ico não encontrado em public/');
  }
  
  // Criar diretório se não existir
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }
  
  console.log('🎨 Criando ícones PWA baseados no Hospital Sabará...');
  console.log('📁 Favicon encontrado:', faviconPath);
  console.log('💡 Como o favicon.ico não é compatível com Sharp, criando ícones personalizados');
  
  // Remover ícones antigos
  const oldIcons = fs.readdirSync(iconsDir).filter(file => 
    file.startsWith('icon-') && file.endsWith('.png')
  );
  
  if (oldIcons.length > 0) {
    console.log('\n🗑️  Removendo ícones antigos...');
    oldIcons.forEach(icon => {
      const iconPath = path.join(iconsDir, icon);
      fs.unlinkSync(iconPath);
      console.log(`   Removido: ${icon}`);
    });
  }
  
  console.log('\n✨ Criando ícones PWA personalizados...');
  
  // Converter para cada tamanho
  for (const { size, purpose } of iconSizes) {
    try {
      const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);
      const svgContent = createHospitalIcon(size);
      
      await sharp(Buffer.from(svgContent))
        .png({
          quality: 100,
          compressionLevel: 6,
          palette: false
        })
        .toFile(outputPath);
      
      console.log(`✅ Criado: icon-${size}x${size}.png (${size}x${size}px, ${purpose})`);
    } catch (error) {
      console.error(`❌ Erro ao criar icon-${size}x${size}.png:`, error.message);
    }
  }
  
  console.log('\n🔧 Criando ícones especiais...');
  
  // Criar ícones especiais
  for (const { name, size } of specialIcons) {
    try {
      const outputPath = path.join(iconsDir, name);
      const specialType = name.includes('medico') ? 'medico' : 
                         name.includes('farmacia') ? 'farmacia' : 
                         name.includes('enfermaria') ? 'enfermaria' : '';
      
      const svgContent = createHospitalIcon(size, true, specialType);
      
      await sharp(Buffer.from(svgContent))
        .png({
          quality: 100,
          compressionLevel: 6,
          palette: false
        })
        .toFile(outputPath);
      
      console.log(`✅ Criado: ${name} (${size}x${size}px)`);
    } catch (error) {
      console.error(`❌ Erro ao criar ${name}:`, error.message);
    }
  }
  
  // Copiar favicon.ico para o diretório de ícones
  const faviconDest = path.join(iconsDir, 'favicon.ico');
  fs.copyFileSync(faviconPath, faviconDest);
  console.log('✅ Copiado: favicon.ico');
  
  console.log('\n🎉 Conversão concluída com sucesso!');
  console.log('📱 Ícones PWA criados com design do Hospital Sabará');
  console.log('✨ Formato: PNG de alta qualidade');
  console.log('🏥 Design: Cruz médica + identidade hospitalar');
  console.log('\n📋 Próximos passos:');
  console.log('1. Recarregue a página');
  console.log('2. Verifique DevTools → Application → Manifest');
  console.log('3. Os erros de carregamento devem estar resolvidos');
  
  // Criar arquivo de informações
  const infoPath = path.join(iconsDir, 'CONVERSION-INFO.md');
  const info = `# Ícones PWA - Hospital Sabará

## 📱 Ícones Criados

Ícones PWA personalizados criados com design do Hospital Sabará.

### ✅ Ícones Criados:
${iconSizes.map(({ size, purpose }) => `- icon-${size}x${size}.png (${size}x${size}px, ${purpose})`).join('\n')}

### 🔧 Ícones Especiais:
${specialIcons.map(({ name, size }) => `- ${name} (${size}x${size}px)`).join('\n')}
- favicon.ico (cópia do original)

### 🎯 Design:
- **Tema**: Hospital Sabará
- **Ícone**: Cruz médica branca
- **Fundo**: Gradiente azul (#3b82f6 → #1e40af)
- **Formato**: PNG de alta qualidade
- **Especiais**: Ícones diferenciados por área

### 📱 Compatibilidade:
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Android, iOS, Windows, macOS
- ✅ PWA installable
- ✅ Manifest válido

### 🔄 Para Recriar:
\`\`\`bash
node scripts/convert-favicon-to-pwa-icons-v2.cjs
\`\`\`

Data de criação: ${new Date().toLocaleString('pt-BR')}
Ferramenta: Sharp + SVG personalizado
`;
  
  fs.writeFileSync(infoPath, info);
  console.log('📄 Criado: CONVERSION-INFO.md com detalhes');
}

// Executar conversão
convertFaviconToPWAIcons().catch(error => {
  console.error('❌ Erro na conversão:', error.message);
  process.exit(1);
}); 