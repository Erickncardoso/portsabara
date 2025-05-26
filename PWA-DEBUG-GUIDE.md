# 🔧 Guia do PWA Debug Panel - Hospital Sabará

## 📱 Visão Geral

O PWA Debug Panel é uma ferramenta de desenvolvimento que aparece **apenas em modo de desenvolvimento** para facilitar o teste e debug da Progressive Web App.

## 🎯 Localização

- **Posição**: Canto inferior esquerdo da tela
- **Visibilidade**: Apenas em `npm run dev` (desenvolvimento)
- **Oculto**: Em produção (`npm run build`)

## 📊 Informações Exibidas

### Status da PWA
- **Online/Offline**: Conectividade atual
- **Instalado/Não instalado**: Status de instalação
- **Instalável**: Se o prompt de instalação está disponível

### Critérios de Instalação PWA
- ✅ **HTTPS/Localhost**: Protocolo seguro
- ✅ **Manifest**: Arquivo manifest.json válido
- ✅ **Service Worker**: SW registrado e ativo
- ✅ **Ícones**: Ícones PWA disponíveis

## 🔧 Botões e Funcionalidades

### 1. **Testar Instalação** 
- **Função**: Tenta instalar a PWA
- **Comportamento**:
  - Se prompt nativo disponível → Mostra prompt do navegador
  - Se não disponível → Exibe instruções detalhadas
  - Em desenvolvimento → Sempre mostra instruções

### 2. **Instalar via DevTools**
- **Função**: Abre instruções para instalação manual
- **Quando aparece**: Quando todos os critérios PWA estão atendidos
- **Instruções**: Guia passo-a-passo para DevTools

### 3. **Forçar Prompt** ⚡
- **Função**: Força exibição do prompt de instalação
- **Uso**: Para testar o componente PWAInstallPrompt
- **Modo**: Apenas desenvolvimento

### 4. **Testar Notificação** 🔔
- **Função**: Testa notificações push
- **Processo**: 
  1. Solicita permissão
  2. Envia notificação de teste
  3. Mostra resultado no console

### 5. **Atualizar SW** 🔄
- **Função**: Força atualização do Service Worker
- **Uso**: Para testar novas versões do SW
- **Log**: Resultado no console

## 🚀 Como Usar para Testar Instalação

### Método 1: Botão "Testar Instalação"
1. Clique no botão
2. Siga as instruções exibidas
3. Escolha um dos métodos sugeridos

### Método 2: DevTools (Recomendado)
1. Clique em "Instalar via DevTools"
2. Abra DevTools (F12)
3. Vá para **Application** → **Manifest**
4. Clique em **"Install"** ou **"Add to homescreen"**

### Método 3: Menu do Navegador
- **Chrome**: Menu ⋮ → "Instalar Hospital Sabará..."
- **Firefox**: Menu ☰ → "Instalar esta página"
- **Edge**: Menu ⋯ → "Aplicativos" → "Instalar este site"

### Método 4: Barra de Endereços
- Procure pelo ícone de instalação (+) na barra de endereços

## 🐛 Troubleshooting

### ❌ "Instalável: Não"
**Possíveis causas:**
- Service Worker não registrado
- Manifest inválido ou ausente
- Ícones não encontrados
- Não está em HTTPS/localhost

**Solução:**
1. Verifique os critérios no painel
2. Corrija itens marcados com ❌
3. Recarregue a página

### ❌ Botão "Testar Instalação" não funciona
**Motivo:** Prompt nativo não disponível

**Soluções:**
1. Use "Instalar via DevTools"
2. Aguarde o navegador oferecer automaticamente
3. Use o menu do navegador
4. Procure ícone na barra de endereços

### ❌ Critérios não atendidos
**Verificações:**
- [ ] Está rodando em `localhost` ou `https://`
- [ ] Arquivo `/manifest.json` existe e é válido
- [ ] Service Worker está registrado
- [ ] Ícones existem em `/icons/`

## 📝 Logs e Debug

### Console do Navegador
- Abra DevTools → Console
- Procure por mensagens com prefixo `🔧 DEV MODE:`
- Logs de instalação, SW e notificações

### Mensagens Importantes
```
🔧 DEV MODE: Simulando disponibilidade de instalação PWA
PWA install prompt available
PWA foi instalada
Service Worker atualizado
```

## 🎯 Cenários de Teste

### 1. Primeira Instalação
1. Abra a aplicação
2. Aguarde 3 segundos (simulação em dev)
3. Verifique se "Instalável: Sim"
4. Teste instalação via DevTools

### 2. Teste de Notificações
1. Clique "Testar Notificação"
2. Aceite permissão quando solicitado
3. Verifique notificação na área de trabalho

### 3. Teste Offline
1. Abra DevTools → Network
2. Marque "Offline"
3. Verifique se status muda para "Offline"
4. Teste funcionalidades offline

### 4. Atualização do Service Worker
1. Modifique algum arquivo
2. Clique "Atualizar SW"
3. Verifique logs no console

## 🔄 Fluxo Completo de Teste

1. **Iniciar desenvolvimento**
   ```bash
   npm run dev
   ```

2. **Verificar critérios**
   - Todos devem estar ✅

3. **Testar instalação**
   - Use método preferido
   - Confirme instalação

4. **Testar funcionalidades**
   - Notificações
   - Modo offline
   - Atualizações

5. **Verificar em produção**
   ```bash
   npm run build
   npm run preview
   ```

## 💡 Dicas Importantes

- **Debug Panel só aparece em desenvolvimento**
- **Em produção, use DevTools para debug**
- **Teste em diferentes navegadores**
- **Verifique permissões de notificação**
- **Teste em dispositivos móveis reais**

---

**Última atualização**: ${new Date().toLocaleString('pt-BR')}
**Status**: ✅ PWA Debug Panel totalmente funcional 