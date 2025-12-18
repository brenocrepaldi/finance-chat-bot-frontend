# 🎨 Finance Bot - Frontend

Interface de chat web para o bot de controle financeiro integrado com Google Sheets.

## 🚀 Como usar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Edite `.env` com a URL do backend:

```env
VITE_SOCKET_URL=http://localhost:3000
```

### 3. Executar

**Desenvolvimento:**
```bash
npm run dev
```

Acesse: http://localhost:5173

**Build para produção:**
```bash
npm run build
```

**Preview do build:**
```bash
npm run preview
```

## 📱 Acesso via Mobile

### Mesma rede WiFi

1. Descubra o IP do seu computador:
   ```bash
   ipconfig getifaddr en0  # Mac
   # ou
   ifconfig | grep "inet "  # Linux
   ```

2. Configure `.env`:
   ```env
   VITE_SOCKET_URL=http://192.168.1.XXX:3000
   ```

3. Reinicie o dev server

4. No celular, acesse: `http://192.168.1.XXX:5173`

## 🎨 Tecnologias

- **React 19** - Framework UI
- **TypeScript** - Tipagem estática
- **TailwindCSS** - Estilização
- **Socket.IO Client** - WebSocket
- **Vite** - Build tool

## 📂 Estrutura

```
src/
├── components/
│   ├── Chat.tsx              # Componente principal do chat
│   └── MessageBubble.tsx     # Bolha de mensagem individual
├── services/
│   └── socket.ts             # Serviço Socket.IO
├── types/
│   └── index.ts              # Tipos TypeScript
├── App.tsx                   # App principal
├── App.css                   # Estilos do App
├── main.tsx                  # Entrada do React
└── index.css                 # Estilos globais + Tailwind
```

## 🎯 Componentes

### Chat.tsx
Componente principal que gerencia:
- Estado das mensagens
- Conexão Socket.IO
- Input de texto
- Envio de mensagens
- Auto-scroll

### MessageBubble.tsx
Componente de mensagem individual:
- Exibe texto da mensagem
- Mostra timestamp
- Estilo diferente para usuário/bot
- Responsivo

### socket.ts
Serviço que gerencia:
- Conexão com backend
- Reconexão automática
- Events listeners
- Singleton pattern

## 🎨 Estilos

### Cores
- **Azul:** Mensagens do usuário (`bg-blue-500`)
- **Cinza:** Mensagens do bot (`bg-gray-200`)
- **Fundo:** `bg-gray-100`

### Responsividade
- **Mobile-first:** Otimizado para celular
- **Breakpoints:** Tailwind padrão (sm, md, lg)
- **Texto:** Adapta tamanho em mobile/desktop

## 🔧 Scripts

```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
npm run lint     # Lint do código
```

## 🐛 Troubleshooting

### Não conecta ao backend

**Verifique:**
1. Backend está rodando? (`npm run dev:server` no backend)
2. URL em `.env` está correta?
3. Console do navegador (F12) mostra erros?

**Teste:**
```bash
curl http://localhost:3000/health
```

### Build falha

```bash
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### Erro de CORS

Verifique se `FRONTEND_URL` no backend `.env` está configurado:
```env
FRONTEND_URL=http://localhost:5173
```

## 📖 Documentação Adicional

- [README Principal](../README.md)
- [Instruções do Chat](../CHAT_INSTRUCTIONS.md)
- [Comandos Úteis](../COMMANDS.md)
- [Checklist](../CHECKLIST.md)
- [Guia de Deploy](../DEPLOY_GUIDE.md)

## 🎯 Customização

### Mudar cores

Edite [Chat.tsx](src/components/Chat.tsx):

```tsx
// Mensagens do usuário
bg-blue-500  →  bg-green-500

// Mensagens do bot
bg-gray-200  →  bg-purple-200
```

### Adicionar funcionalidades

1. **Salvar histórico:**
   ```tsx
   useEffect(() => {
     localStorage.setItem('messages', JSON.stringify(messages));
   }, [messages]);
   ```

2. **Tema escuro:**
   ```tsx
   const [dark, setDark] = useState(false);
   ```

3. **Notificações:**
   ```tsx
   if (Notification.permission === 'granted') {
     new Notification('Nova mensagem', {
       body: message.text
     });
   }
   ```

## 📄 Licença

MIT
