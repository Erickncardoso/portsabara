#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando ícones PWA...');

const iconsDir = path.join(__dirname, '..', 'public', 'icons');
const manifestPath = path.join(__dirname, '..', 'public', 'manifest.json');

// Verificar se a pasta de ícones existe
if (!fs.existsSync(iconsDir)) {
  console.error('❌ Pasta public/icons não encontrada!');
  process.exit(1);
}

// Verificar se o manifest existe
if (!fs.existsSync(manifestPath)) {
  console.error('❌ Arquivo manifest.json não encontrado!');
  process.exit(1);
}

// Ler o manifest
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

console.log('📱 Verificando ícones do manifest...');

let allIconsValid = true;

manifest.icons.forEach((icon, index) => {
  const iconPath = path.join(__dirname, '..', 'public', icon.src);
  
  if (fs.existsSync(iconPath)) {
    const stats = fs.statSync(iconPath);
    console.log(`✅ ${icon.src} - ${icon.sizes} (${(stats.size / 1024).toFixed(1)}KB)`);
  } else {
    console.error(`❌ ${icon.src} - ARQUIVO NÃO ENCONTRADO!`);
    allIconsValid = false;
  }
});

// Verificar ícones obrigatórios para PWA
const requiredIcons = [
  { size: '192x192', purpose: 'any maskable' },
  { size: '512x512', purpose: 'any maskable' }
];

console.log('\n🎯 Verificando ícones obrigatórios para PWA...');

requiredIcons.forEach(required => {
  const found = manifest.icons.find(icon => 
    icon.sizes === required.size && 
    icon.purpose.includes('maskable')
  );
  
  if (found) {
    console.log(`✅ Ícone ${required.size} maskable encontrado`);
  } else {
    console.error(`❌ Ícone ${required.size} maskable NÃO encontrado!`);
    allIconsValid = false;
  }
});

// Verificar screenshots
console.log('\n📸 Verificando screenshots...');

if (manifest.screenshots && manifest.screenshots.length > 0) {
  manifest.screenshots.forEach(screenshot => {
    const screenshotPath = path.join(__dirname, '..', 'public', screenshot.src);
    
    if (fs.existsSync(screenshotPath)) {
      const stats = fs.statSync(screenshotPath);
      console.log(`✅ ${screenshot.src} - ${screenshot.sizes} (${(stats.size / 1024).toFixed(1)}KB)`);
    } else {
      console.error(`❌ ${screenshot.src} - ARQUIVO NÃO ENCONTRADO!`);
    }
  });
} else {
  console.log('⚠️  Nenhum screenshot encontrado no manifest');
}

// Verificar Service Worker
console.log('\n⚙️  Verificando Service Worker...');

const swPath = path.join(__dirname, '..', 'public', 'sw.js');
if (fs.existsSync(swPath)) {
  console.log('✅ Service Worker encontrado');
} else {
  console.error('❌ Service Worker NÃO encontrado!');
  allIconsValid = false;
}

// Verificar critérios PWA
console.log('\n🏆 Verificando critérios PWA...');

const checks = [
  { name: 'Nome da app', valid: manifest.name && manifest.name.length > 0 },
  { name: 'Nome curto', valid: manifest.short_name && manifest.short_name.length > 0 },
  { name: 'Start URL', valid: manifest.start_url && manifest.start_url.length > 0 },
  { name: 'Display mode', valid: manifest.display === 'standalone' },
  { name: 'Ícones suficientes', valid: manifest.icons && manifest.icons.length >= 2 },
  { name: 'Theme color', valid: manifest.theme_color && manifest.theme_color.length > 0 },
  { name: 'Background color', valid: manifest.background_color && manifest.background_color.length > 0 }
];

checks.forEach(check => {
  if (check.valid) {
    console.log(`✅ ${check.name}`);
  } else {
    console.error(`❌ ${check.name}`);
    allIconsValid = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allIconsValid) {
  console.log('🎉 Todos os ícones e configurações PWA estão corretos!');
  console.log('📱 Sua PWA deve ser instalável no navegador.');
  console.log('\n💡 Dicas para testar:');
  console.log('1. Abra o DevTools (F12)');
  console.log('2. Vá para Application > Manifest');
  console.log('3. Clique em "Install" ou procure o ícone + na barra de endereços');
} else {
  console.error('❌ Alguns problemas foram encontrados!');
  console.error('🔧 Corrija os erros acima para que a PWA funcione corretamente.');
  process.exit(1);
} 