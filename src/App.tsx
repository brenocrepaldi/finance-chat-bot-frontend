import { useState, useEffect } from 'react';
import Chat from './components/Chat';
import Login from './components/Login';

export default function App() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Verifica se já tem token salvo
    const savedToken = localStorage.getItem('auth_token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogin = (newToken: string) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
    window.location.reload();
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  return <Chat token={token} onLogout={handleLogout} />;
}
