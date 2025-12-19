export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
  pending?: boolean; // Mensagem aguardando envio (offline)
}
