# 💬 Finance Chat Bot - Frontend

> A modern, real-time chat interface for managing personal finances through conversational AI, powered by Google Sheets integration.

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=flat-square)](https://finance-chat-bot-frontend.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [Mobile Access](#-mobile-access)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

Finance Chat Bot Frontend is a responsive web application that provides an intuitive chat interface for managing personal finances. Users can interact with an AI-powered bot to track expenses, income, and budgets through natural language conversations. All data is seamlessly synchronized with Google Sheets for easy access and analysis.

### ✨ Features

- 💬 **Real-time Chat Interface** - Instant messaging with WebSocket support
- 📱 **Mobile-First Design** - Optimized for all screen sizes
- 🔄 **Pull-to-Refresh** - Mobile gesture support for refreshing conversations
- 🎨 **Modern UI/UX** - Clean, intuitive design with Tailwind CSS
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🔌 **Auto-Reconnection** - Robust WebSocket handling with automatic reconnection
- 🎯 **TypeScript** - Fully typed for enhanced developer experience
- 📊 **Google Sheets Integration** - Direct synchronization with your financial data

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| [React](https://react.dev/) | UI Framework | 19.2.0 |
| [TypeScript](https://www.typescriptlang.org/) | Type Safety | 5.9.3 |
| [Vite](https://vitejs.dev/) | Build Tool | 7.2.4 |
| [Tailwind CSS](https://tailwindcss.com/) | Styling | 3.4.1 |
| [Socket.IO Client](https://socket.io/) | Real-time Communication | 4.6.1 |
| [Lucide React](https://lucide.dev/) | Icons | 0.562.0 |
| [Zod](https://zod.dev/) | Schema Validation | 4.2.1 |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x (or yarn/pnpm)
- Backend API running (see backend repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/brenocrepaldi/finance-chat-bot-frontend.git
   cd finance-chat-bot-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   VITE_SOCKET_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:5173](http://localhost:5173)

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_SOCKET_URL` | Backend WebSocket server URL | `http://localhost:3000` | ✅ Yes |

### Example Configurations

**Local Development:**
```env
VITE_SOCKET_URL=http://localhost:3000
```

**Production:**
```env
VITE_SOCKET_URL=https://api.yourbackend.com
```

---

## 📱 Mobile Access

### Access from Mobile Devices (Same Network)

1. **Find your computer's local IP address**

   **macOS/Linux:**
   ```bash
   ipconfig getifaddr en0  # macOS
   # or
   ifconfig | grep "inet "  # Linux
   ```

   **Windows:**
   ```bash
   ipconfig
   # Look for IPv4 Address under your active network adapter
   ```

2. **Update your `.env` file**
   ```env
   VITE_SOCKET_URL=http://192.168.1.XXX:3000
   ```
   Replace `192.168.1.XXX` with your computer's IP address.

3. **Restart the development server**
   ```bash
   npm run dev
   ```

4. **Access from your mobile device**
   
   Open your mobile browser and navigate to:
   ```
   http://192.168.1.XXX:5173
   ```

> **Note:** Ensure both devices are connected to the same WiFi network and your firewall allows local network connections.

---

## 📂 Project Structure

```
finance-chat-bot-frontend/
├── src/
│   ├── components/           # React components
│   │   ├── Chat.tsx         # Main chat container component
│   │   └── MessageBubble.tsx # Individual message bubble
│   ├── services/            # External service integrations
│   │   └── socket.ts        # Socket.IO client service
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts         # Shared types and interfaces
│   ├── App.tsx              # Root application component
│   ├── App.css              # Application-specific styles
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles + Tailwind directives
├── public/                  # Static assets
├── .env.example             # Environment variables template
├── index.html               # HTML entry point
├── package.json             # Project dependencies
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── vite.config.ts           # Vite configuration
```

---

## 🏗️ Architecture

### Component Overview

#### `Chat.tsx`
The main chat component that orchestrates the entire conversation interface.

**Responsibilities:**
- Managing message state
- Handling Socket.IO connection lifecycle
- Processing user input
- Auto-scrolling to latest messages
- Error handling and connection status

**Key Features:**
- Real-time message updates
- Message history persistence
- Typing indicators (future enhancement)

#### `MessageBubble.tsx`
A reusable message display component with responsive design.

**Props:**
- `message`: Message text content
- `timestamp`: Message creation time
- `isUser`: Boolean to differentiate user/bot messages

**Features:**
- Dynamic styling based on sender
- Timestamp formatting
- Mobile-optimized layout

#### `socket.ts`
A singleton service managing WebSocket connections.

**Features:**
- Automatic reconnection on disconnect
- Event listener management
- Connection status monitoring
- Singleton pattern for single connection instance

**Events:**
- `connect` - Successful connection
- `disconnect` - Connection lost
- `message` - Incoming message from bot
- `error` - Connection or message errors

---

## 🎨 Design System

### Color Palette

| Element | Color | Tailwind Class |
|---------|-------|----------------|
| User Messages | Blue | `bg-blue-500` |
| Bot Messages | Gray | `bg-gray-200` |
| Background | Light Gray | `bg-gray-100` |
| Text (User) | White | `text-white` |
| Text (Bot) | Dark Gray | `text-gray-800` |

### Responsive Breakpoints

Following Tailwind CSS default breakpoints:

- **sm:** 640px - Small tablets
- **md:** 768px - Tablets
- **lg:** 1024px - Desktops
- **xl:** 1280px - Large desktops

---

## 💻 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint for code quality
npm run lint

# Type-check without emitting files
npm run type-check
```

### Development Workflow

1. Create a feature branch from `main`
2. Make your changes with clear, atomic commits
3. Run linting: `npm run lint`
4. Test thoroughly on multiple screen sizes
5. Build and preview: `npm run build && npm run preview`
6. Submit a pull request

### Code Style

This project uses:
- **ESLint** for code quality
- **TypeScript** for type safety
- **Prettier** (recommended) for formatting

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Deployment Platforms

This project is ready to deploy on:

- **Vercel** (Recommended) - [Live Demo](https://finance-chat-bot-frontend.vercel.app)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

### Vercel Deployment

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Set environment variables in Vercel dashboard

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Steps to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🔗 Links

- **Live Demo:** [https://finance-chat-bot-frontend.vercel.app](https://finance-chat-bot-frontend.vercel.app)
- **Backend Repository:** [Link to backend repo]
- **Issues:** [GitHub Issues](https://github.com/brenocrepaldi/finance-chat-bot-frontend/issues)

---

## 📧 Contact

**Breno Crepaldi** - [@brenocrepaldi](https://github.com/brenocrepaldi)

Project Link: [https://github.com/brenocrepaldi/finance-chat-bot-frontend](https://github.com/brenocrepaldi/finance-chat-bot-frontend)

---

<div align="center">
  Made with ❤️ by Breno Crepaldi
</div>
