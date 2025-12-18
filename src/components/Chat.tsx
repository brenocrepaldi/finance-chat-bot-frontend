import { useState, useEffect, useRef } from 'react';
import { socketService } from '../services/socket';
import type { Message } from '../types';
import MessageBubble from './MessageBubble';

interface ChatProps {
  token: string;
  onLogout: () => void;
}

export default function Chat({ token, onLogout }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const socket = socketService.connect(token);

    // Verifica estado inicial da conexão
    setIsConnected(socket.connected);

    socket.on('connect', () => {
      console.log('Socket conectado');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Socket desconectado');
      setIsConnected(false);
    });

    socket.on('bot-message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
      setIsSending(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('bot-message');
    };
  }, [token]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputText.trim() || !isConnected || isSending) {
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsSending(true);

    const socket = socketService.getSocket();
    socket?.emit('user-message', { text: inputText.trim() });

    setInputText('');
  };

  return (
    <div className="flex flex-col h-dvh bg-gray-100 overflow-auto">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div>
            <h1 className="text-lg sm:text-xl font-semibold">
              🤖 Bot Financeiro
            </h1>
            <p className="text-xs sm:text-sm opacity-90">
              {isConnected ? '✅ Conectado' : '❌ Desconectado'}
            </p>
          </div>
          <button
            onClick={() => {
              if (confirm('Limpar todas as mensagens?')) {
                setMessages([]);
              }
            }}
            className="text-sm bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded mr-2"
          >
            Limpar
          </button>
          <button
            onClick={() => {
              if (confirm('Deseja sair?')) {
                onLogout();
              }
            }}
            className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
          >
            Sair
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 max-w-4xl w-full mx-auto">
        {messages.length === 0 && isConnected && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500 max-w-md">
              <div className="text-4xl mb-4">🤖</div>
              <h2 className="text-lg font-semibold mb-2">Bot Financeiro</h2>
              <p className="text-sm mb-4">
                Gerencie suas finanças de forma simples e rápida
              </p>
              <p className="text-xs bg-gray-100 rounded-lg p-3">
                💡 Digite <strong>"ajuda"</strong> ou <strong>"?"</strong> para ver todos os comandos disponíveis
              </p>
            </div>
          </div>
        )}

        {messages.length === 0 && !isConnected && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-400">
              <div className="animate-pulse text-4xl mb-4">⏳</div>
              <p className="text-sm">Conectando ao servidor...</p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-300 p-3 sm:p-4">
        <form
          onSubmit={sendMessage}
          className="flex gap-2 max-w-4xl mx-auto"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              isConnected
                ? 'Digite sua mensagem...'
                : 'Aguardando conexão...'
            }
            disabled={!isConnected || isSending}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!isConnected || !inputText.trim() || isSending}
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
          >
            {isSending ? '...' : 'Enviar'}
          </button>
        </form>
      </div>
    </div>
  );
}
