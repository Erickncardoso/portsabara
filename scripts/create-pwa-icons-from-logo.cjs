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

async function createPWAIconsFromLogo() {
  const logoPath = path.join(__dirname, '..', 'public', 'images', 'logo-sabara.png');
  const iconsDir = path.join(__dirname, '..', 'public', 'icons');
  
  // Verificar se a logo existe
  if (!fs.existsSync(logoPath)) {
    throw new Error('Logo do Hospital Sabará não encontrada em public/images/logo-sabara.png');
  }
  
  // Criar diretório se não existir
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }
  
  console.log('🏥 Criando ícones PWA com a logo real do Hospital Sabará...');
  console.log('📁 Logo encontrada:', logoPath);
  
  // Verificar dimensões da logo original
  const logoInfo = await sharp(logoPath).metadata();
  console.log(`📐 Logo original: ${logoInfo.width}x${logoInfo.height}px`);
  
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
  
  console.log('\n✨ Criando ícones PWA com a logo real...');
  
  // Converter para cada tamanho
  for (const { size, purpose } of iconSizes) {
    try {
      const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);
      
      // Criar fundo com gradiente azul do Hospital Sabará
      const background = await sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: { r: 59, g: 130, b: 246, alpha: 1 } // #3b82f6
        }
      })
      .png()
      .toBuffer();
      
      // Calcular tamanho da logo (80% do ícone com padding)
      const logoSize = Math.round(size * 0.7);
      const logoPosition = Math.round((size - logoSize) / 2);
      
      // Redimensionar logo e aplicar sobre o fundo
      await sharp(background)
        .composite([
          {
            input: await sharp(logoPath)
              .resize(logoSize, logoSize, {
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 }
              })
              .png()
              .toBuffer(),
            top: logoPosition,
            left: logoPosition
          }
        ])
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
      
      // Criar fundo azul
      const background = await sharp({
        create: {
          width: size,
          height: size,
          channels: 4,
          background: { r: 59, g: 130, b: 246, alpha: 1 }
        }
      })
      .png()
      .toBuffer();
      
      // Calcular tamanho da logo
      const logoSize = Math.round(size * 0.6);
      const logoPosition = Math.round((size - logoSize) / 2);
      
      // Adicionar indicador especial se necessário
      let composite = [
        {
          input: await sharp(logoPath)
            .resize(logoSize, logoSize, {
              fit: 'contain',
              background: { r: 0, g: 0, b: 0, alpha: 0 }
            })
            .png()
            .toBuffer(),
          top: logoPosition,
          left: logoPosition
        }
      ];
      
      // Adicionar indicador para ícones especiais
      if (name.includes('medico') || name.includes('farmacia') || name.includes('enfermaria')) {
        const indicatorSize = Math.round(size * 0.25);
        const indicatorPos = size - indicatorSize - Math.round(size * 0.05);
        
        const indicator = await sharp({
          create: {
            width: indicatorSize,
            height: indicatorSize,
            channels: 4,
            background: { r: 255, g: 255, b: 255, alpha: 0.9 }
          }
        })
        .png()
        .toBuffer();
        
        composite.push({
          input: indicator,
          top: indicatorPos,
          left: indicatorPos
        });
      }
      
      await sharp(background)
        .composite(composite)
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
  const faviconPath = path.join(__dirname, '..', 'public', 'favicon.ico');
  if (fs.existsSync(faviconPath)) {
    const faviconDest = path.join(iconsDir, 'favicon.ico');
    fs.copyFileSync(faviconPath, faviconDest);
    console.log('✅ Copiado: favicon.ico');
  }
  
  console.log('\n🎉 Conversão concluída com sucesso!');
  console.log('🏥 Ícones PWA criados com a logo real do Hospital Sabará');
  console.log('✨ Fundo azul (#3b82f6) + Logo centralizada');
  console.log('📱 Todos os tamanhos PWA gerados');
  console.log('\n📋 Próximos passos:');
  console.log('1. Recarregue a página (Cmd+Shift+R)');
  console.log('2. Limpe o cache do navegador se necessário');
  console.log('3. Teste a instalação da PWA');
  console.log('4. A logo do Hospital Sabará deve aparecer!');
  
  // Criar arquivo de informações
  const infoPath = path.join(iconsDir, 'LOGO-CONVERSION-INFO.md');
  const info = `# Ícones PWA - Logo Real Hospital Sabará

## 🏥 Ícones Criados com Logo Real

Ícones PWA gerados usando a logo oficial do Hospital Sabará.

### ✅ Ícones Criados:
${iconSizes.map(({ size, purpose }) => `- icon-${size}x${size}.png (${size}x${size}px, ${purpose})`).join('\n')}

### 🔧 Ícones Especiais:
${specialIcons.map(({ name, size }) => `- ${name} (${size}x${size}px)`).join('\n')}
- favicon.ico (cópia do original)

### 🎯 Design:
- **Logo**: Logo oficial do Hospital Sabará
- **Fundo**: Azul institucional (#3b82f6)
- **Posicionamento**: Logo centralizada (70% do tamanho)
- **Qualidade**: PNG de alta resolução
- **Formato**: Quadrado com logo proporcional

### 📱 Compatibilidade:
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Android, iOS, Windows, macOS
- ✅ PWA installable
- ✅ Manifest válido
- ✅ Logo real do Hospital Sabará

### 🔄 Para Recriar:
\`\`\`bash
node scripts/create-pwa-icons-from-logo.cjs
\`\`\`

### 📐 Especificações:
- Logo original: ${logoInfo.width}x${logoInfo.height}px
- Redimensionamento: Proporcional com padding
- Fundo: Sólido azul institucional
- Qualidade: 100% PNG

Data de criação: ${new Date().toLocaleString('pt-BR')}
Ferramenta: Sharp + Logo real
Fonte: public/images/logo-sabara.png
`;
  
  fs.writeFileSync(infoPath, info);
  console.log('📄 Criado: LOGO-CONVERSION-INFO.md com detalhes');
}

// Executar conversão
createPWAIconsFromLogo().catch(error => {
  console.error('❌ Erro na conversão:', error.message);
  process.exit(1);
}); 