import type { Message } from '../types';
import { User, Bot } from 'lucide-react';

interface MessageBubbleProps {
	message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
	const isUser = message.sender === 'user';
	const time = new Date(message.timestamp).toLocaleTimeString('pt-BR', {
		hour: '2-digit',
		minute: '2-digit',
	});

	return (
		<div
			className={`flex flex-col mb-4 animate-slide-in ${
				isUser ? 'items-end' : 'items-start'
			}`}
		>
			{/* Avatar acima */}
			<div className="flex items-center gap-2 mb-1.5">
				<div
					className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center ${
						isUser
							? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20'
							: 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20'
					}`}
				>
					{isUser ? (
						<User className="w-3.5 h-3.5 text-white" strokeWidth={2} />
					) : (
						<Bot className="w-3.5 h-3.5 text-white" strokeWidth={2} />
					)}
				</div>
				<span className="text-xs font-medium text-gray-400">
					{isUser ? 'Você' : 'Bot Financeiro'}
				</span>
			</div>

			{/* Message Bubble */}
			<div className="flex flex-col max-w-[85%] sm:max-w-[75%] min-w-0">
				<div
					className={`rounded-2xl px-4 py-2.5 shadow-lg overflow-hidden transition-opacity duration-300 ${
						message.pending ? 'opacity-50' : 'opacity-100'
					} ${
						isUser
							? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-tr-sm'
							: 'bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 text-gray-100 rounded-tl-sm'
					}`}
				>
					<div className="whitespace-pre-wrap break-words text-sm sm:text-base leading-relaxed overflow-wrap-anywhere">
						{message.text}
					</div>
				</div>
				<div className={`text-xs mt-1.5 px-1 ${isUser ? 'text-gray-500 text-right' : 'text-gray-600'}`}>
					{time}
				</div>
			</div>
		</div>
	);
}
