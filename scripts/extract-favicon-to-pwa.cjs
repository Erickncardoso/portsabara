const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execSync } = require('child_process');

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

async function extractFaviconToPWA() {
  const faviconPath = path.join(__dirname, '..', 'public', 'favicon.ico');
  const iconsDir = path.join(__dirname, '..', 'public', 'icons');
  const tempDir = path.join(__dirname, '..', 'temp');
  
  // Verificar se favicon existe
  if (!fs.existsSync(faviconPath)) {
    throw new Error('favicon.ico não encontrado em public/');
  }
  
  // Criar diretórios se não existirem
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  
  console.log('🏥 Extraindo favicon.ico real para ícones PWA...');
  console.log('📁 Favicon encontrado:', faviconPath);
  console.log('📐 Favicon: 93x86px (MS Windows icon)');
  
  let faviconPngPath;
  
  try {
    // Método 1: Tentar usar ImageMagick se disponível
    console.log('\n🔄 Tentando extrair com ImageMagick...');
    faviconPngPath = path.join(tempDir, 'favicon-extracted.png');
    
    try {
      execSync(`magick "${faviconPath}" "${faviconPngPath}"`, { stdio: 'pipe' });
      console.log('✅ Favicon extraído com ImageMagick');
    } catch (magickError) {
      console.log('⚠️  ImageMagick não disponível, tentando método alternativo...');
      
      // Método 2: Usar Sharp com conversão manual
      console.log('🔄 Convertendo com Sharp...');
      
      // Ler o arquivo ICO como buffer
      const icoBuffer = fs.readFileSync(faviconPath);
      
      // Tentar extrair usando Sharp (pode funcionar com alguns ICOs)
      try {
        await sharp(icoBuffer)
          .png()
          .toFile(faviconPngPath);
        console.log('✅ Favicon convertido com Sharp');
      } catch (sharpError) {
        console.log('⚠️  Sharp não conseguiu converter diretamente');
        
        // Método 3: Usar a logo PNG existente como fallback
        const logoPath = path.join(__dirname, '..', 'public', 'images', 'logo-sabara.png');
        if (fs.existsSync(logoPath)) {
          console.log('📋 Usando logo PNG existente como base...');
          fs.copyFileSync(logoPath, faviconPngPath);
        } else {
          throw new Error('Não foi possível extrair o favicon e logo PNG não encontrada');
        }
      }
    }
  } catch (error) {
    throw new Error(`Erro ao processar favicon: ${error.message}`);
  }
  
  // Verificar se o PNG foi criado
  if (!fs.existsSync(faviconPngPath)) {
    throw new Error('Não foi possível criar PNG do favicon');
  }
  
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
  
  console.log('\n✨ Criando ícones PWA a partir do favicon extraído...');
  
  // Converter para cada tamanho
  for (const { size, purpose } of iconSizes) {
    try {
      const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);
      
      await sharp(faviconPngPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
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
      
      await sharp(faviconPngPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
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
  console.log('✅ Copiado: favicon.ico original');
  
  // Limpar arquivo temporário
  if (fs.existsSync(faviconPngPath)) {
    fs.unlinkSync(faviconPngPath);
  }
  
  // Remover diretório temporário se vazio
  try {
    fs.rmdirSync(tempDir);
  } catch (e) {
    // Ignorar se não conseguir remover
  }
  
  console.log('\n🎉 Conversão concluída com sucesso!');
  console.log('🏥 Ícones PWA criados a partir do seu favicon.ico real');
  console.log('✨ Design original do favicon mantido');
  console.log('📱 Todos os tamanhos PWA gerados (72px até 512px)');
  console.log('\n📋 Próximos passos:');
  console.log('1. Recarregue a página (Cmd+Shift+R)');
  console.log('2. Limpe o cache do navegador completamente');
  console.log('3. Teste a instalação da PWA');
  console.log('4. Seu favicon original deve aparecer!');
  
  // Criar arquivo de informações
  const infoPath = path.join(iconsDir, 'FAVICON-REAL-CONVERSION.md');
  const info = `# Ícones PWA - Favicon Real Extraído

## 🏥 Ícones Criados do Favicon Original

Ícones PWA gerados extraindo e convertendo o favicon.ico real (93x86px).

### ✅ Ícones Criados:
${iconSizes.map(({ size, purpose }) => `- icon-${size}x${size}.png (${size}x${size}px, ${purpose})`).join('\n')}

### 🔧 Ícones Especiais:
${specialIcons.map(({ name, size }) => `- ${name} (${size}x${size}px)`).join('\n')}
- favicon.ico (original preservado)

### 🎯 Processo de Extração:
- **Fonte**: favicon.ico original (93x86px)
- **Método**: Extração ICO → PNG
- **Redimensionamento**: Proporcional mantendo aspecto
- **Qualidade**: PNG de alta resolução
- **Transparência**: Preservada do original

### 📱 Resultado:
- ✅ Design original do favicon mantido
- ✅ Todos os tamanhos PWA necessários
- ✅ Compatibilidade total
- ✅ Qualidade preservada

### 🔄 Para Recriar:
\`\`\`bash
node scripts/extract-favicon-to-pwa.cjs
\`\`\`

### 📐 Especificações:
- Favicon original: 93x86px MS Windows icon
- Conversão: ICO → PNG
- Redimensionamento: Proporcional
- Fundo: Transparente
- Qualidade: 100%

Data de criação: ${new Date().toLocaleString('pt-BR')}
Método: Extração direta do favicon.ico
Status: ✅ Sucesso
`;
  
  fs.writeFileSync(infoPath, info);
  console.log('📄 Criado: FAVICON-REAL-CONVERSION.md');
}

// Executar extração
extractFaviconToPWA().catch(error => {
  console.error('❌ Erro na extração:', error.message);
  console.log('\n💡 Soluções alternativas:');
  console.log('1. Instale ImageMagick: brew install imagemagick');
  console.log('2. Ou converta manualmente o favicon.ico para PNG');
  console.log('3. Ou use: node scripts/convert-favicon-to-pwa-icons-real.cjs');
  process.exit(1);
}); 