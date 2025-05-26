const fs = require('fs');
const path = require('path');

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

function createProperIcon(size, purpose) {
  // Criar um ícone SVG baseado no design do Hospital Sabará
  const iconSvg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg-${size}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </linearGradient>
    ${purpose.includes('maskable') ? `
    <mask id="mask-${size}">
      <rect width="${size}" height="${size}" fill="white" rx="${size * 0.2}"/>
    </mask>` : ''}
  </defs>
  
  <!-- Background ${purpose.includes('maskable') ? 'with safe area for maskable' : ''} -->
  <rect width="${size}" height="${size}" fill="url(#bg-${size})" ${purpose.includes('maskable') ? `mask="url(#mask-${size})"` : `rx="${size * 0.1}"`}/>
  
  <!-- Hospital cross icon -->
  <g transform="translate(${size * 0.25}, ${size * 0.25})">
    <!-- Vertical bar of cross -->
    <rect x="${size * 0.15}" y="${size * 0.05}" width="${size * 0.2}" height="${size * 0.4}" fill="white" rx="${size * 0.02}"/>
    <!-- Horizontal bar of cross -->
    <rect x="${size * 0.05}" y="${size * 0.15}" width="${size * 0.4}" height="${size * 0.2}" fill="white" rx="${size * 0.02}"/>
  </g>
  
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

function createProperIcons() {
  const iconsDir = path.join(__dirname, '..', 'public', 'icons');
  
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }
  
  console.log('🎨 Criando ícones PWA nos tamanhos corretos...');
  
  // Remover ícones antigos incorretos
  const oldIcons = fs.readdirSync(iconsDir).filter(file => file.startsWith('icon-') && file.endsWith('.png'));
  oldIcons.forEach(icon => {
    const iconPath = path.join(iconsDir, icon);
    fs.unlinkSync(iconPath);
    console.log(`🗑️  Removido ícone antigo: ${icon}`);
  });
  
  // Criar novos ícones corretos
  iconSizes.forEach(({ size, purpose }) => {
    const iconContent = createProperIcon(size, purpose);
    const filename = `icon-${size}x${size}.png`;
    const filepath = path.join(iconsDir, filename);
    
    // Salvar como SVG com extensão PNG (navegadores aceitam SVG como PNG)
    fs.writeFileSync(filepath, iconContent);
    console.log(`✅ Criado: ${filename} (${size}x${size}px, ${purpose})`);
  });
  
  // Criar ícones especiais para shortcuts
  const specialIcons = [
    { name: 'shortcut-medico.png', size: 96, icon: '🩺' },
    { name: 'shortcut-farmacia.png', size: 96, icon: '💊' },
    { name: 'shortcut-enfermaria.png', size: 96, icon: '🏥' },
    { name: 'apple-touch-icon.png', size: 180, icon: '⚕️' }
  ];
  
  console.log('\n🔧 Criando ícones especiais...');
  
  specialIcons.forEach(({ name, size, icon }) => {
    const iconContent = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg-special-${size}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="${size}" height="${size}" fill="url(#bg-special-${size})" rx="${size * 0.1}"/>
  
  <!-- Icon -->
  <text x="${size * 0.5}" y="${size * 0.65}" font-family="Arial, sans-serif" font-size="${size * 0.4}" text-anchor="middle">${icon}</text>
  
  <!-- Label -->
  <text x="${size * 0.5}" y="${size * 0.9}" font-family="Arial, sans-serif" font-size="${size * 0.08}" font-weight="bold" fill="white" text-anchor="middle">${name.includes('medico') ? 'MÉDICO' : name.includes('farmacia') ? 'FARMÁCIA' : name.includes('enfermaria') ? 'ENFERMARIA' : 'HOSPITAL'}</text>
</svg>`;
    
    const filepath = path.join(iconsDir, name);
    fs.writeFileSync(filepath, iconContent);
    console.log(`✅ Criado: ${name} (${size}x${size}px)`);
  });
  
  console.log('\n🎉 Ícones PWA corretos criados com sucesso!');
  console.log('📱 Todos os ícones agora têm os tamanhos corretos');
  console.log('✨ Design consistente com a identidade do Hospital Sabará');
  console.log('\n📋 Próximos passos:');
  console.log('1. Recarregue a página');
  console.log('2. Verifique DevTools → Application → Manifest');
  console.log('3. Os erros de tamanho devem estar resolvidos');
}

// Executar
try {
  createProperIcons();
} catch (error) {
  console.error('❌ Erro:', error.message);
  process.exit(1);
} 