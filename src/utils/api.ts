// Detecta automaticamente o host - se acessar por IP, usa o mesmo IP para o backend
export const getApiUrl = () => {
  if (import.meta.env.VITE_SOCKET_URL) {
    return import.meta.env.VITE_SOCKET_URL;
  }
  
  // Desenvolvimento: usa o mesmo host com porta 3000
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  
  // Se está rodando localmente, adiciona :3000
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.')) {
    return `${protocol}//${hostname}:3000`;
  }
  
  // Em produção, usa a mesma URL sem porta
  return `${protocol}//${hostname}`;
};
