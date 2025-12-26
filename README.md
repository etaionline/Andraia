# 🌊 AndrAIa OS - Enhanced AI-Powered Personal Assistant

> **Live Demo:** https://fbp3otzdtg4q.space.minimax.io

AndrAIa OS is a sophisticated AI-powered personal assistant interface featuring a beautiful ocean-themed design with Mistral background integration. Built with modern web technologies and designed for fluid AI agent orchestration.

## 🚀 Features

### ✨ **Visual Excellence**
- **Mistral Ocean Background**: Stunning sunset ocean scene with animated elements
- **Glassmorphism UI**: Translucent panels with ocean-themed styling
- **Animated Particles**: Floating light orbs and ocean particles
- **Responsive Design**: Mobile-first approach with PWA capabilities

### 🤖 **Multi-Agent System**
- **Zeus Engine**: Advanced AI orchestration system
- **4 AI Agents**: Minimax, Mistral, GPT-4o, Grok with distinct personalities
- **Auto-routing**: Intelligent agent selection based on task context
- **Dev Mode**: Advanced controls for temperature and cost tracking

### 🎨 **Interactive Workspace**
- **BlackBoard Canvas**: Drag-and-drop workspace for organizing thoughts
- **Project Management**: KronoSave crate system for organizing projects
- **Real-time Collaboration**: Live cursors and annotations
- **Version Control**: Timeline with ghost layers and branching

### 💬 **Smart Chat Interface**
- **Agent Switching**: Seamless transition between AI personalities
- **Message Dragging**: Drag chat messages to canvas workspace
- **Auto-routing**: Intelligent task assignment to appropriate agents
- **Voice Ready**: Built-in microphone support for voice interactions

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - Modern React with hooks and concurrent features
- **TypeScript 5.6** - Type-safe development
- **Vite 6.0** - Fast build tool and dev server
- **Tailwind CSS 3.4** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Custom Glassmorphism** - Ocean-themed design system

### Development Tools
- **ESLint 9.15** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting
- **PostCSS & Autoprefixer** - CSS processing

## 🎯 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/etaionline/Andraia.git
cd Andraia

# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Environment Setup

Create a `.env.local` file for API keys (when implementing real AI integration):

```env
MINIMAX_API_KEY=your_minimax_api_key
MISTRAL_API_KEY=your_mistral_api_key
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   ├── chat/            # Chat interface components
│   ├── canvas/          # BlackBoard workspace
│   ├── kronosave/       # Crate system
│   └── orchestrator/    # Zeus engine
├── lib/                 # Utility functions
├── App.tsx             # Main application
├── App.css             # Ocean-themed styles
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🌊 Design System

### Color Palette
- **Ocean Deep**: `#002B4D` - Deep abyssal blue
- **Ocean Teal**: `#006D8F` - Rich teal/cyan
- **Ocean Coral**: `#FF9E85` - Rose gold/coral pink
- **Ocean Cream**: `#FFFACD` - Soft gold/warm cream
- **Ocean Pearl**: `#F2C4B3` - Pale rose

### Agent Colors
- **Minimax**: `#8B5CF6` - Purple (Deep Thinker)
- **Mistral**: `#14B8A6` - Teal (Creative Generalist)
- **GPT-4o**: `#3B82F6` - Blue (Rational Journalist)
- **Grok**: `#EC4899` - Pink (Deep Creator)

## 🎨 UI Components

### GlassPanel
Translucent container with ocean-themed styling and subtle animations.

```tsx
<GlassPanel title="Harbour" variant="default">
  {/* Your content */}
</GlassPanel>
```

### AndrAIaChat
Multi-agent chat interface with auto-routing and drag-and-drop support.

```tsx
<AndrAIaChat 
  onMessageDrag={(message) => {
    // Handle message drag to canvas
  }}
/>
```

### ZeusEngine
AI agent orchestration with status monitoring and dev controls.

```tsx
<ZeusEngine 
  devMode={true}
  onAgentChange={(agent) => {
    // Handle agent selection
  }}
/>
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Manual Build
```bash
# Build for production
pnpm build

# Preview build locally
pnpm preview
```

## 🔮 Roadmap

### Phase 1: Enhanced UI (✅ Complete)
- [x] Mistral ocean background integration
- [x] Glassmorphism design system
- [x] Animated ocean particles
- [x] Responsive layout

### Phase 2: Real AI Integration (🔄 In Progress)
- [ ] Direct Minimax API integration
- [ ] Mistral API for summarization
- [ ] Real-time chat responses
- [ ] Agent personality refinement

### Phase 3: Advanced Features (📋 Planned)
- [ ] Voice interaction with Web Speech API
- [ ] Real-time collaboration with WebRTC
- [ ] Advanced canvas with mind mapping
- [ ] Plugin system for custom agents

### Phase 4: Enterprise Features (📋 Planned)
- [ ] Multi-user workspaces
- [ ] Enterprise authentication
- [ ] Custom agent training
- [ ] Analytics and insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Mistral AI** for the beautiful ocean background inspiration
- **Tailwind CSS** for the utility-first design system
- **Radix UI** for accessible component primitives
- **Lucide** for the comprehensive icon library

---

**Built with ❤️ by the AndrAIa OS team**

*"Navigating the ocean of AI possibilities, one wave at a time."*

🌊 ⚡ 🤖