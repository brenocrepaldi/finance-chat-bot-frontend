import { io, Socket } from 'socket.io-client';
import { getApiUrl } from '../utils/api';

const SOCKET_URL = getApiUrl();

class SocketService {
  private socket: Socket | null = null;

  connect(token: string) {
    if (this.socket?.connected) {
      return this.socket;
    }

    this.socket = io(SOCKET_URL, {
      auth: {
        token
      },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    this.socket.on('connect', () => {
      console.log('✅ Conectado ao servidor');
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Desconectado do servidor');
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Erro de conexão:', error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket() {
    return this.socket;
  }

  isConnected() {
    return this.socket?.connected || false;
  }
}

export const socketService = new SocketService();
