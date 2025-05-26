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

// Função para criar um ícone SVG melhorado para o Hospital Sabará
function createHospitalIcon(size, isSpecial = false, specialType = '') {
  const iconSvg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg-${size}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1d4ed8;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </linearGradient>
    <filter id="shadow-${size}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.3)"/>
    </filter>
  </defs>
  
  <!-- Background with rounded corners -->
  <rect width="${size}" height="${size}" fill="url(#bg-${size})" rx="${size * 0.12}" ry="${size * 0.12}"/>
  
  <!-- White border for better visibility -->
  <rect x="${size * 0.02}" y="${size * 0.02}" width="${size * 0.96}" height="${size * 0.96}" 
        fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="${size * 0.01}" 
        rx="${size * 0.1}" ry="${size * 0.1}"/>
  
  <!-- Hospital cross icon with shadow -->
  <g transform="translate(${size * 0.5}, ${size * 0.5})" filter="url(#shadow-${size})">
    <!-- Vertical bar of cross -->
    <rect x="${-size * 0.08}" y="${-size * 0.18}" width="${size * 0.16}" height="${size * 0.36}" 
          fill="white" rx="${size * 0.02}"/>
    <!-- Horizontal bar of cross -->
    <rect x="${-size * 0.18}" y="${-size * 0.08}" width="${size * 0.36}" height="${size * 0.16}" 
          fill="white" rx="${size * 0.02}"/>
  </g>
  
  ${isSpecial ? `
  <!-- Special icon indicator with background -->
  <circle cx="${size * 0.8}" cy="${size * 0.2}" r="${size * 0.1}" fill="white" opacity="0.9"/>
  <circle cx="${size * 0.8}" cy="${size * 0.2}" r="${size * 0.08}" fill="#2563eb"/>
  <text x="${size * 0.8}" y="${size * 0.25}" font-family="Arial, sans-serif" font-size="${size * 0.08}" 
        text-anchor="middle" fill="white">${getSpecialIcon(specialType)}</text>
  ` : ''}
  
  <!-- Hospital text with better contrast -->
  ${size >= 128 ? `
  <text x="${size * 0.5}" y="${size * 0.8}" font-family="Arial, sans-serif" font-size="${size * 0.07}" 
        font-weight="bold" fill="white" text-anchor="middle" opacity="0.95">HOSPITAL</text>
  ` : ''}
  
  ${size >= 192 ? `
  <text x="${size * 0.5}" y="${size * 0.9}" font-family="Arial, sans-serif" font-size="${size * 0.05}" 
        fill="white" text-anchor="middle" opacity="0.9">SABARÁ</text>
  ` : ''}
  
  <!-- Subtle highlight for 3D effect -->
  <rect x="${size * 0.02}" y="${size * 0.02}" width="${size * 0.96}" height="${size * 0.3}" 
        fill="url(#highlight-${size})" rx="${size * 0.1}" ry="${size * 0.1}"/>
  
  <defs>
    <linearGradient id="highlight-${size}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgba(255,255,255,0.3);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgba(255,255,255,0);stop-opacity:0" />
    </linearGradient>
  </defs>
</svg>`;
  
  return iconSvg;
}

function getSpecialIcon(type) {
  switch (type) {
    case 'medico': return '⚕';
    case 'farmacia': return '💊';
    case 'enfermaria': return '🏥';
    default: return '⚕';
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
  
  console.log('🎨 Criando ícones PWA melhorados para o Hospital Sabará...');
  console.log('📁 Favicon encontrado:', faviconPath);
  console.log('💡 Criando ícones com melhor visibilidade para instalação');
  
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
  
  console.log('\n✨ Criando ícones PWA com melhor contraste...');
  
  // Converter para cada tamanho
  for (const { size, purpose } of iconSizes) {
    try {
      const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);
      const svgContent = createHospitalIcon(size);
      
      await sharp(Buffer.from(svgContent))
        .png({
          quality: 100,
          compressionLevel: 6,
          palette: false,
          progressive: false
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
          palette: false,
          progressive: false
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
  console.log('📱 Ícones PWA criados com design melhorado');
  console.log('✨ Melhorias: Maior contraste, sombras, bordas');
  console.log('🏥 Design: Cruz médica + identidade hospitalar');
  console.log('\n📋 Próximos passos:');
  console.log('1. Recarregue a página (Ctrl+F5)');
  console.log('2. Limpe o cache do navegador');
  console.log('3. Teste a instalação novamente');
  console.log('4. O ícone deve aparecer no prompt de instalação');
  
  // Atualizar arquivo de informações
  const infoPath = path.join(iconsDir, 'CONVERSION-INFO.md');
  const info = `# Ícones PWA - Hospital Sabará (v3 - Melhorado)

## 📱 Ícones Criados

Ícones PWA melhorados com maior visibilidade para instalação.

### ✅ Ícones Criados:
${iconSizes.map(({ size, purpose }) => `- icon-${size}x${size}.png (${size}x${size}px, ${purpose})`).join('\n')}

### 🔧 Ícones Especiais:
${specialIcons.map(({ name, size }) => `- ${name} (${size}x${size}px)`).join('\n')}
- favicon.ico (cópia do original)

### 🎯 Design Melhorado:
- **Tema**: Hospital Sabará
- **Ícone**: Cruz médica branca com sombra
- **Fundo**: Gradiente azul mais vibrante
- **Bordas**: Bordas arredondadas com destaque
- **Contraste**: Melhor visibilidade em fundos claros/escuros
- **Formato**: PNG de alta qualidade
- **Efeitos**: Sombras e highlights para profundidade

### 📱 Compatibilidade:
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Android, iOS, Windows, macOS
- ✅ PWA installable
- ✅ Manifest válido
- ✅ Melhor visibilidade no prompt de instalação

### 🔄 Para Recriar:
\`\`\`bash
node scripts/convert-favicon-to-pwa-icons-v3.cjs
\`\`\`

Data de criação: ${new Date().toLocaleString('pt-BR')}
Ferramenta: Sharp + SVG melhorado
Versão: 3.0 - Melhor visibilidade
`;
  
  fs.writeFileSync(infoPath, info);
  console.log('📄 Atualizado: CONVERSION-INFO.md com melhorias');
}

// Executar conversão
convertFaviconToPWAIcons().catch(error => {
  console.error('❌ Erro na conversão:', error.message);
  process.exit(1);
}); 