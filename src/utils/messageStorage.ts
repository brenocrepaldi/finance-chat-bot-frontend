import { z } from 'zod';
import type { Message } from '../types';

// Schema Zod para validar mensagens
const MessageSchema = z.object({
  id: z.string(),
  text: z.string(),
  sender: z.enum(['user', 'bot']),
  timestamp: z.string(),
  pending: z.boolean().optional(),
});

const MessagesArraySchema = z.array(MessageSchema);

const STORAGE_KEY = 'chat-messages';

export const messageStorage = {
  /**
   * Salva mensagens no localStorage com validação Zod
   */
  save(messages: Message[]): void {
    try {
      const validated = MessagesArraySchema.parse(messages);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
    } catch (error) {
      console.error('❌ Erro ao salvar mensagens:', error);
    }
  },

  /**
   * Carrega mensagens do localStorage com validação Zod
   */
  load(): Message[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];

      const parsed = JSON.parse(stored);
      const validated = MessagesArraySchema.parse(parsed);
      
      // Remove mensagens pendentes antigas (não enviadas da sessão anterior)
      return validated.filter((msg) => !msg.pending);
    } catch (error) {
      console.error('❌ Erro ao carregar mensagens:', error);
      // Se houver erro, limpa o storage corrompido
      this.clear();
      return [];
    }
  },

  /**
   * Limpa todas as mensagens do localStorage
   */
  clear(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('🗑️ Histórico de mensagens limpo');
    } catch (error) {
      console.error('❌ Erro ao limpar mensagens:', error);
    }
  },
};
