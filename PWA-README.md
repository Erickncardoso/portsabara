# PWA - Hospital Sabará

## 📱 Progressive Web App Implementada

Esta aplicação foi transformada em uma **Progressive Web App (PWA)** completa, oferecendo uma experiência nativa em dispositivos móveis e desktop.

## ✨ Funcionalidades PWA

### 🔧 Funcionalidades Principais
- **Instalação**: App pode ser instalado no dispositivo
- **Offline**: Funciona sem conexão com internet
- **Cache Inteligente**: Carregamento rápido com estratégias de cache
- **Notificações Push**: Notificações em tempo real
- **Sincronização Background**: Sincroniza dados quando volta online
- **Atualizações Automáticas**: Detecta e instala atualizações

### 📋 Componentes Implementados

#### 1. Service Worker (`public/sw.js`)
- **Cache Strategies**: Cache First, Network First, Stale While Revalidate
- **Offline Support**: Funcionalidade offline completa
- **Push Notifications**: Suporte a notificações push
- **Background Sync**: Sincronização em background

#### 2. Manifest (`public/manifest.json`)
- **App Identity**: Nome, descrição, ícones
- **Display Mode**: Standalone (app nativo)
- **Theme Colors**: Cores do tema
- **Shortcuts**: Atalhos para áreas específicas
- **Screenshots**: Capturas de tela para app stores

#### 3. Hooks React (`src/hooks/usePWA.ts`)
- **Installation Management**: Gerencia instalação do app
- **Online/Offline Status**: Detecta status de conectividade
- **Notifications**: Gerencia permissões e envio de notificações
- **Push Subscriptions**: Registra para notificações push

#### 4. Componentes UI
- **PWAInstallPrompt**: Prompt de instalação elegante
- **OfflineIndicator**: Indicador de status offline

## 🚀 Como Usar

### Instalação do App
1. Acesse a aplicação no navegador
2. Aguarde o prompt de instalação aparecer (após 30 segundos)
3. Clique em "Instalar" para adicionar ao dispositivo
4. O app aparecerá na tela inicial como um app nativo

### Funcionalidades Offline
- **Cache Automático**: Páginas visitadas ficam disponíveis offline
- **Dados Locais**: Informações importantes são armazenadas localmente
- **Sincronização**: Dados são sincronizados quando volta online

### Notificações
```typescript
// Solicitar permissão
const permission = await requestNotificationPermission();

// Enviar notificação
sendNotification('Título', {
  body: 'Mensagem da notificação',
  icon: '/icons/icon-192x192.png'
});
```

## 🛠️ Configuração Técnica

### Estratégias de Cache

#### Cache First (Assets Estáticos)
- Imagens (PNG, JPG, SVG, etc.)
- CSS e JavaScript
- Ícones e recursos estáticos

#### Network First (Dados Dinâmicos)
- APIs (`/api/*`)
- Páginas de login
- Dados em tempo real

#### Stale While Revalidate (Páginas)
- Páginas da aplicação
- Conteúdo que pode ser atualizado em background

### Ícones Gerados
```
public/icons/
├── icon-16x16.png
├── icon-32x32.png
├── icon-72x72.png
├── icon-96x96.png
├── icon-128x128.png
├── icon-144x144.png
├── icon-152x152.png
├── icon-192x192.png
├── icon-384x384.png
├── icon-512x512.png
├── apple-touch-icon.png
├── favicon.ico
└── shortcut-*.png
```

## 📊 Monitoramento

### Cache Info
```typescript
import { getCacheInfo } from '@/utils/pwa';

const info = await getCacheInfo();
console.log('Caches:', info.caches);
console.log('Tamanho total:', info.totalSize);
```

### Status PWA
```typescript
import { isPWAInstalled } from '@/utils/pwa';

if (isPWAInstalled()) {
  console.log('App está rodando como PWA');
}
```

## 🔄 Atualizações

### Verificação Manual
```typescript
import { checkForUpdates } from '@/utils/pwa';

await checkForUpdates();
```

### Limpeza de Cache
```typescript
import { clearOldCaches } from '@/utils/pwa';

await clearOldCaches();
```

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 67+
- ✅ Firefox 63+
- ✅ Safari 11.1+
- ✅ Edge 79+

### Plataformas
- ✅ Android (Chrome, Firefox)
- ✅ iOS (Safari)
- ✅ Windows (Edge, Chrome)
- ✅ macOS (Safari, Chrome)
- ✅ Linux (Chrome, Firefox)

## 🔐 Segurança

### HTTPS Obrigatório
- PWAs requerem HTTPS em produção
- Service Workers só funcionam em contextos seguros

### Permissões
- **Notificações**: Solicitada quando necessário
- **Localização**: Não utilizada
- **Câmera/Microfone**: Não utilizada

## 🎯 Próximos Passos

### Melhorias Futuras
1. **Push Server**: Implementar servidor de push notifications
2. **Background Sync**: Melhorar sincronização de dados
3. **Offline Forms**: Formulários que funcionam offline
4. **App Store**: Publicar nas app stores
5. **Analytics**: Métricas de uso da PWA

### Otimizações
1. **Ícones Reais**: Converter SVG para PNG com sharp
2. **Screenshots**: Adicionar capturas de tela reais
3. **Precaching**: Melhorar estratégia de precache
4. **Compression**: Comprimir recursos

## 📞 Suporte

Para dúvidas sobre a PWA:
1. Verifique os logs do console
2. Teste em modo incógnito
3. Limpe o cache do navegador
4. Verifique se está em HTTPS

## 🏥 Hospital Sabará PWA

Transformando o atendimento hospitalar com tecnologia moderna e acessível! 