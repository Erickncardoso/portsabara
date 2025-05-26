const fs = require('fs');
const path = require('path');

// Função para criar um ícone PNG simples usando data URL
function createSimpleIcon(size) {
  // Criar um canvas simples via data URL
  const canvas = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" rx="${size * 0.125}" fill="#3b82f6"/>
    <rect x="${size * 0.4}" y="${size * 0.25}" width="${size * 0.2}" height="${size * 0.5}" rx="${size * 0.015}" fill="white"/>
    <rect x="${size * 0.25}" y="${size * 0.4}" width="${size * 0.5}" height="${size * 0.2}" rx="${size * 0.015}" fill="white"/>
    <circle cx="${size * 0.5}" cy="${size * 0.35}" r="${size * 0.08}" fill="#ef4444"/>
  </svg>`;
  
  // Converter SVG para data URL
  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(canvas).toString('base64')}`;
  
  return dataUrl;
}

// Tamanhos necessários
const sizes = [16, 32, 57, 60, 72, 76, 96, 114, 120, 128, 144, 152, 180, 192, 256, 384, 512];

// Criar diretório
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

console.log('Criando ícones PNG simples...');

// Gerar ícones
sizes.forEach(size => {
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" rx="${Math.round(size * 0.125)}" fill="#3b82f6"/>
    <rect x="${Math.round(size * 0.4)}" y="${Math.round(size * 0.25)}" width="${Math.round(size * 0.2)}" height="${Math.round(size * 0.5)}" rx="${Math.round(size * 0.015)}" fill="white"/>
    <rect x="${Math.round(size * 0.25)}" y="${Math.round(size * 0.4)}" width="${Math.round(size * 0.5)}" height="${Math.round(size * 0.2)}" rx="${Math.round(size * 0.015)}" fill="white"/>
    <circle cx="${Math.round(size * 0.5)}" cy="${Math.round(size * 0.35)}" r="${Math.round(size * 0.08)}" fill="#ef4444"/>
  </svg>`;
  
  const filename = `icon-${size}x${size}.png`;
  const filepath = path.join(iconsDir, filename);
  
  // Salvar como SVG com extensão PNG (browsers modernos aceitam)
  fs.writeFileSync(filepath, svg);
  console.log(`Criado: ${filename}`);
});

// Criar ícones especiais
const specialIcons = [
  { name: 'favicon.ico', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'shortcut-medico.png', size: 96 },
  { name: 'shortcut-farmacia.png', size: 96 },
  { name: 'shortcut-enfermaria.png', size: 96 }
];

specialIcons.forEach(icon => {
  const svg = `<svg width="${icon.size}" height="${icon.size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${icon.size}" height="${icon.size}" rx="${Math.round(icon.size * 0.125)}" fill="#3b82f6"/>
    <rect x="${Math.round(icon.size * 0.4)}" y="${Math.round(icon.size * 0.25)}" width="${Math.round(icon.size * 0.2)}" height="${Math.round(icon.size * 0.5)}" rx="${Math.round(icon.size * 0.015)}" fill="white"/>
    <rect x="${Math.round(icon.size * 0.25)}" y="${Math.round(icon.size * 0.4)}" width="${Math.round(icon.size * 0.5)}" height="${Math.round(icon.size * 0.2)}" rx="${Math.round(icon.size * 0.015)}" fill="white"/>
    <circle cx="${Math.round(icon.size * 0.5)}" cy="${Math.round(icon.size * 0.35)}" r="${Math.round(icon.size * 0.08)}" fill="#ef4444"/>
  </svg>`;
  
  const filepath = path.join(iconsDir, icon.name);
  fs.writeFileSync(filepath, svg);
  console.log(`Criado: ${icon.name}`);
});

console.log('\n✅ Ícones criados com sucesso!');
console.log('📝 Nota: Os ícones são SVGs com extensão PNG para compatibilidade.');
console.log('🔄 Recarregue a página para ver as mudanças.'); 