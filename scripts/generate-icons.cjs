const fs = require('fs');
const path = require('path');

// Tamanhos de ícones necessários para PWA
const iconSizes = [
  16, 32, 57, 60, 72, 76, 96, 114, 120, 128, 144, 152, 180, 192, 256, 384, 512
];

// Template SVG base
const svgTemplate = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="512" height="512" rx="64" fill="#3b82f6"/>
  
  <!-- Hospital Cross -->
  <rect x="206" y="128" width="100" height="256" rx="8" fill="white"/>
  <rect x="128" y="206" width="256" height="100" rx="8" fill="white"/>
  
  <!-- Heart Symbol -->
  <path d="M256 180c-20-40-80-40-80 0c0 40 80 80 80 80s80-40 80-80c0-40-60-40-80 0z" fill="#ef4444"/>
  
  <!-- Hospital Building -->
  <rect x="180" y="320" width="152" height="120" rx="4" fill="#1e40af"/>
  <rect x="200" y="340" width="20" height="20" rx="2" fill="white"/>
  <rect x="240" y="340" width="20" height="20" rx="2" fill="white"/>
  <rect x="280" y="340" width="20" height="20" rx="2" fill="white"/>
  <rect x="200" y="380" width="20" height="20" rx="2" fill="white"/>
  <rect x="240" y="380" width="20" height="20" rx="2" fill="white"/>
  <rect x="280" y="380" width="20" height="20" rx="2" fill="white"/>
  
  <!-- Door -->
  <rect x="240" y="400" width="32" height="40" rx="4" fill="white"/>
</svg>`;

// Função para criar um ícone PNG simples usando Canvas (simulado com SVG)
function createIcon(size) {
  const svg = svgTemplate(size);
  const filename = `icon-${size}x${size}.png`;
  const filepath = path.join(__dirname, '..', 'public', 'icons', filename);
  
  // Para este exemplo, vamos salvar como SVG renomeado para PNG
  // Em um ambiente real, você usaria uma biblioteca como sharp ou canvas para converter
  const svgFilename = `icon-${size}x${size}.svg`;
  const svgFilepath = path.join(__dirname, '..', 'public', 'icons', svgFilename);
  
  fs.writeFileSync(svgFilepath, svg);
  console.log(`Criado: ${svgFilename}`);
  
  // Criar um arquivo PNG placeholder (você pode usar sharp ou canvas para conversão real)
  const pngPlaceholder = `<!-- PNG placeholder for ${size}x${size} -->
<!-- In production, use a proper image conversion tool -->
${svg}`;
  
  fs.writeFileSync(filepath, pngPlaceholder);
  console.log(`Criado: ${filename}`);
}

// Criar diretório se não existir
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Gerar todos os ícones
console.log('Gerando ícones PWA...');
iconSizes.forEach(size => {
  createIcon(size);
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
  const svg = svgTemplate(icon.size);
  const filepath = path.join(iconsDir, icon.name);
  fs.writeFileSync(filepath, svg);
  console.log(`Criado: ${icon.name}`);
});

console.log('Ícones PWA gerados com sucesso!');
console.log('\nNota: Os arquivos PNG são placeholders SVG.');
console.log('Para produção, use uma ferramenta como sharp ou canvas para converter SVG para PNG real.');
console.log('\nComandos para instalar sharp (opcional):');
console.log('npm install sharp');
console.log('ou');
console.log('yarn add sharp'); 