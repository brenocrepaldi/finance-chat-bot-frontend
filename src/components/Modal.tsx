import { X, AlertTriangle } from 'lucide-react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	description: string;
	confirmText?: string;
	cancelText?: string;
	variant?: 'danger' | 'warning';
}

export default function Modal({
	isOpen,
	onClose,
	onConfirm,
	title,
	description,
	confirmText = 'Confirmar',
	cancelText = 'Cancelar',
	variant = 'warning',
}: ModalProps) {
	if (!isOpen) return null;

	const handleConfirm = () => {
		onConfirm();
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

			{/* Modal */}
			<div className="relative bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl max-w-md w-full animate-slide-in">
				{/* Header */}
				<div className="flex items-center justify-between p-6 border-b border-gray-800">
					<div className="flex items-center gap-3">
						<div
							className={`w-10 h-10 rounded-xl flex items-center justify-center ${
								variant === 'danger'
									? 'bg-red-500/10 border border-red-500/20'
									: 'bg-yellow-500/10 border border-yellow-500/20'
							}`}
						>
							<AlertTriangle
								className={`w-5 h-5 ${variant === 'danger' ? 'text-red-400' : 'text-yellow-400'}`}
								strokeWidth={2}
							/>
						</div>
						<h2 className="text-lg font-semibold text-white">{title}</h2>
					</div>
					<button
						onClick={onClose}
						className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				{/* Body */}
				<div className="p-6">
					<p className="text-gray-300 text-sm leading-relaxed">{description}</p>
				</div>

				{/* Footer */}
				<div className="flex items-center justify-end gap-3 p-6 border-t border-gray-800 bg-gray-950/50">
					<button
						onClick={onClose}
						className="px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
					>
						{cancelText}
					</button>
					<button
						onClick={handleConfirm}
						className={`px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-all ${
							variant === 'danger'
								? 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/20'
								: 'bg-yellow-600 hover:bg-yellow-700 shadow-lg shadow-yellow-500/20'
						}`}
					>
						{confirmText}
					</button>
				</div>
			</div>
		</div>
	);
}
