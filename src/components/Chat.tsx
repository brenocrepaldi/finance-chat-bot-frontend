import { useState, useEffect, useRef } from 'react';
import { socketService } from '../services/socket';
import type { Message } from '../types';
import MessageBubble from './MessageBubble';
import Modal from './Modal';
import { Bot, Send, Trash2, LogOut, Wifi, WifiOff, Sparkles } from 'lucide-react';

interface ChatProps {
	token: string;
	onLogout: () => void;
}

export default function Chat({ token, onLogout }: ChatProps) {
	const [messages, setMessages] = useState<Message[]>([]);
	const [inputText, setInputText] = useState('');
	const [isConnected, setIsConnected] = useState(false);
	const [isSending, setIsSending] = useState(false);
	const [showClearModal, setShowClearModal] = useState(false);
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(() => {
		scrollToBottom();
	}, [messages]);

	useEffect(() => {
		const socket = socketService.connect(token);

		// Verifica estado inicial da conexão em um microtask
		Promise.resolve().then(() => {
			setIsConnected(socket.connected);
		});

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
			timestamp: new Date().toISOString(),
		};

		setMessages((prev) => [...prev, userMessage]);
		setIsSending(true);

		const socket = socketService.getSocket();
		socket?.emit('user-message', { text: inputText.trim() });

		setInputText('');
	};

	return (
		<div className="flex flex-col h-dvh bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
			{/* Header */}
			<div className="bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/50 shadow-xl">
				<div className="max-w-4xl mx-auto px-4 py-4">
					<div className="flex items-center justify-between">
						{/* Logo e Status */}
						<div className="flex items-center gap-3">
							<div className="relative">
								<div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
									<Bot className="w-6 h-6 text-white" strokeWidth={2} />
								</div>
								{/* Indicador de conexão */}
								<div
									className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-gray-950 ${
										isConnected ? 'bg-emerald-500' : 'bg-red-500'
									}`}
								/>
							</div>
							<div>
								<h1 className="text-base sm:text-lg font-semibold text-white">Bot Financeiro</h1>
								<div className="flex items-center gap-1.5 text-xs text-gray-400">
									{isConnected ? (
										<>
											<Wifi className="w-3 h-3" />
											<span>Conectado</span>
										</>
									) : (
										<>
											<WifiOff className="w-3 h-3" />
											<span>Desconectado</span>
										</>
									)}
								</div>
							</div>
						</div>

						{/* Ações */}
						<div className="flex items-center gap-2">
							<button
								onClick={() => setShowClearModal(true)}
								className="flex items-center gap-1.5 px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all text-sm"
								title="Limpar mensagens"
							>
								<Trash2 className="w-4 h-4" />
								<span className="hidden sm:inline">Limpar</span>
							</button>
							<button
								onClick={() => setShowLogoutModal(true)}
								className="flex items-center gap-1.5 px-3 py-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-sm"
								title="Sair"
							>
								<LogOut className="w-4 h-4" />
								<span className="hidden sm:inline">Sair</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Messages Area */}
			<div className="flex-1 overflow-y-auto p-4 max-w-4xl w-full mx-auto">
				{messages.length === 0 && isConnected && (
					<div className="flex items-center justify-center h-full">
						<div className="text-center max-w-md animate-fade-in">
							<div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-3xl mb-6 border border-emerald-500/20">
								<Sparkles className="w-10 h-10 text-emerald-400" strokeWidth={1.5} />
							</div>
							<h2 className="text-xl font-semibold text-white mb-3">Bem-vindo ao Bot Financeiro</h2>
							<p className="text-gray-400 text-sm mb-6 leading-relaxed">
								Gerencie suas finanças de forma simples e inteligente. Comece enviando uma mensagem
								abaixo.
							</p>
							<div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-4">
								<p className="text-xs text-gray-400 mb-2">💡 Dica</p>
								<p className="text-sm text-gray-300">
									Digite <span className="text-emerald-400 font-semibold">"ajuda"</span> ou{' '}
									<span className="text-emerald-400 font-semibold">"?"</span> para ver todos os
									comandos
								</p>
							</div>
						</div>
					</div>
				)}

				{messages.length === 0 && !isConnected && (
					<div className="flex items-center justify-center h-full">
						<div className="text-center animate-fade-in">
							<div className="relative w-16 h-16 mx-auto mb-4">
								<div className="absolute inset-0 bg-emerald-500/20 rounded-2xl animate-pulse" />
								<div className="absolute inset-2 bg-emerald-500/40 rounded-xl animate-pulse delay-75" />
								<div className="absolute inset-4 bg-emerald-500/60 rounded-lg animate-pulse delay-150" />
							</div>
							<p className="text-sm text-gray-400">Conectando ao servidor...</p>
						</div>
					</div>
				)}

				{messages.map((message) => (
					<MessageBubble key={message.id} message={message} />
				))}
				<div ref={messagesEndRef} />
			</div>

			{/* Input Area */}
			<div className="bg-gray-950/80 backdrop-blur-xl border-t border-gray-800/50 p-3 sm:p-4 shadow-2xl">
				<form onSubmit={sendMessage} className="flex gap-2 sm:gap-3 max-w-4xl mx-auto">
					<input
						type="text"
						value={inputText}
						onChange={(e) => setInputText(e.target.value)}
						placeholder={isConnected ? 'Digite sua mensagem...' : 'Aguardando conexão...'}
						disabled={!isConnected || isSending}
						className="flex-1 bg-gray-900/50 border border-gray-800/50 rounded-xl px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 disabled:bg-gray-900/30 disabled:cursor-not-allowed transition-all"
					/>
					<button
						type="submit"
						disabled={!isConnected || !inputText.trim() || isSending}
						className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 disabled:from-gray-800 disabled:to-gray-800 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 group"
					>
						{isSending ? (
							<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
						) : (
							<>
								<span className="hidden sm:inline">Enviar</span>
								<Send
									className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
									strokeWidth={2}
								/>
							</>
						)}
					</button>
				</form>
			</div>

			{/* Modals */}
			<Modal
				isOpen={showClearModal}
				onClose={() => setShowClearModal(false)}
				onConfirm={() => setMessages([])}
				title="Limpar mensagens"
				description="Tem certeza que deseja limpar todas as mensagens? Esta ação não pode ser desfeita."
				confirmText="Limpar tudo"
				cancelText="Cancelar"
				variant="warning"
			/>

			<Modal
				isOpen={showLogoutModal}
				onClose={() => setShowLogoutModal(false)}
				onConfirm={onLogout}
				title="Sair da conta"
				description="Tem certeza que deseja sair? Você precisará fazer login novamente para acessar."
				confirmText="Sair"
				cancelText="Cancelar"
				variant="danger"
			/>
		</div>
	);
}
