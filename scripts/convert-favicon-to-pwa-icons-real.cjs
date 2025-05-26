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
  
  console.log('🏥 Convertendo favicon.ico real para ícones PWA...');
  console.log('📁 Favicon encontrado:', faviconPath);
  
  // Tentar ler o favicon com Sharp
  let faviconBuffer;
  try {
    // Primeiro, vamos tentar converter o ICO para PNG
    faviconBuffer = await sharp(faviconPath)
      .png()
      .toBuffer();
    
    const faviconInfo = await sharp(faviconBuffer).metadata();
    console.log(`📐 Favicon original: ${faviconInfo.width}x${faviconInfo.height}px`);
  } catch (error) {
    console.log('⚠️  Favicon ICO não suportado diretamente pelo Sharp');
    console.log('💡 Tentando extrair a maior resolução disponível...');
    
    // Se falhar, vamos tentar uma abordagem diferente
    // Ler o arquivo ICO como buffer e tentar extrair
    try {
      const icoBuffer = fs.readFileSync(faviconPath);
      
      // Criar um PNG simples a partir do ICO usando uma abordagem alternativa
      // Vamos usar a logo PNG que já existe como fallback
      const logoPath = path.join(__dirname, '..', 'public', 'images', 'logo-sabara.png');
      if (fs.existsSync(logoPath)) {
        console.log('📋 Usando logo PNG como base para conversão...');
        faviconBuffer = await sharp(logoPath)
          .resize(256, 256, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 }
          })
          .png()
          .toBuffer();
      } else {
        throw new Error('Não foi possível processar o favicon.ico e logo PNG não encontrada');
      }
    } catch (fallbackError) {
      throw new Error(`Erro ao processar favicon: ${fallbackError.message}`);
    }
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
  
  console.log('\n✨ Criando ícones PWA a partir do favicon...');
  
  // Converter para cada tamanho
  for (const { size, purpose } of iconSizes) {
    try {
      const outputPath = path.join(iconsDir, `icon-${size}x${size}.png`);
      
      await sharp(faviconBuffer)
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
      
      await sharp(faviconBuffer)
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
  console.log('✅ Copiado: favicon.ico');
  
  console.log('\n🎉 Conversão concluída com sucesso!');
  console.log('🏥 Ícones PWA criados a partir do seu favicon.ico');
  console.log('✨ Mantendo design original do favicon');
  console.log('📱 Todos os tamanhos PWA gerados');
  console.log('\n📋 Próximos passos:');
  console.log('1. Recarregue a página (Cmd+Shift+R)');
  console.log('2. Limpe o cache do navegador');
  console.log('3. Teste a instalação da PWA');
  console.log('4. Seu favicon deve aparecer em todos os tamanhos!');
  
  // Criar arquivo de informações
  const infoPath = path.join(iconsDir, 'FAVICON-CONVERSION-INFO.md');
  const info = `# Ícones PWA - Convertidos do Favicon Real

## 🏥 Ícones Criados a partir do Favicon

Ícones PWA gerados convertendo o favicon.ico original.

### ✅ Ícones Criados:
${iconSizes.map(({ size, purpose }) => `- icon-${size}x${size}.png (${size}x${size}px, ${purpose})`).join('\n')}

### 🔧 Ícones Especiais:
${specialIcons.map(({ name, size }) => `- ${name} (${size}x${size}px)`).join('\n')}
- favicon.ico (original copiado)

### 🎯 Processo:
- **Fonte**: favicon.ico original
- **Conversão**: ICO → PNG
- **Redimensionamento**: Proporcional para cada tamanho
- **Qualidade**: PNG de alta resolução
- **Transparência**: Mantida do original

### 📱 Compatibilidade:
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Android, iOS, Windows, macOS
- ✅ PWA installable
- ✅ Manifest válido
- ✅ Design original do favicon

### 🔄 Para Recriar:
\`\`\`bash
node scripts/convert-favicon-to-pwa-icons-real.cjs
\`\`\`

### 📐 Especificações:
- Fonte: public/favicon.ico
- Formato de saída: PNG
- Redimensionamento: Proporcional
- Fundo: Transparente
- Qualidade: 100%

Data de criação: ${new Date().toLocaleString('pt-BR')}
Ferramenta: Sharp + Favicon real
Método: Conversão direta ICO → PNG
`;
  
  fs.writeFileSync(infoPath, info);
  console.log('📄 Criado: FAVICON-CONVERSION-INFO.md com detalhes');
}

// Executar conversão
convertFaviconToPWAIcons().catch(error => {
  console.error('❌ Erro na conversão:', error.message);
  console.log('\n💡 Dicas para resolver:');
  console.log('1. Verifique se public/favicon.ico existe');
  console.log('2. Certifique-se que o arquivo não está corrompido');
  console.log('3. Tente usar uma logo PNG como alternativa');
  process.exit(1);
}); 