# Andraia – Product Vision

**One-liner mission**  
Fluid, beautiful, AI-first personal workspace that feels like a creative co-pilot — not another chat window.

**Core identity**  
- Not a general-purpose chatbot  
- Not a code editor  
- Not a Notion clone  
→ A **dark, futuristic personal interface** where AI (Minimax + Mistral) actively augments your thinking, annotates your content, suggests next steps, and maintains state across sessions.

**Non-negotiable aesthetic & feel (do NOT change this)**  
- Dominant: deep dark (#0a0a0f – #111111 range)  
- Accents: glowing teal #00f0ff / neon pink #ff00aa  
- Secondary: metallic silver #c0c0c0 + subtle holographic gradients  
- Typography: modern geometric sans (Inter / Montserrat / similar) + slight glow on interactive elements  
- Animations: smooth but restrained (framer-motion style micro-interactions)  
- Mobile-first responsive + PWA installable

**Target user (who this is for)**  
- People who live in multiple apps but hate context switching  
- Writers / researchers / creators who want AI to feel embedded, not bolted-on  
- Users who prefer dark-mode everything and dislike flat/corporate UIs

**Must-have capabilities – Phase 1 north star**  
1. Central workspace canvas (rich-text / markdown / drag-drop blocks)  
2. Persistent AI control panel (API keys, model choice, quick-action buttons)  
3. Real-time AI suggestions / annotations / summaries on selected content  
4. Direct calls to:  
   - Minimax (abab6.5s-chat or latest equivalent)  
   - Mistral (mistral-large-latest or equivalent)  
   → **never** via third-party OpenAI proxies  
5. Supabase backend for: auth, realtime presence, saving annotations/versions  
6. Version carousel (simple undo/history preview)  
7. Offline fallback for UI + cached model responses where possible

**Explicit non-goals (things we will NOT do in v1)**  
- General web browsing agent  
- Image / video generation  
- Multi-user team collaboration (single-user realtime only)  
- Mobile native app (PWA only)  
- Overly complex plugin system

**Success looks like**  
When a returning user opens the app and thinks:  
"This feels like my second brain finally has good taste and isn't trying to sell me anything."

**Tech foundation reminders (enforce these)**  
- Next.js 15 app router + TypeScript  
- Tailwind + next-themes (dark mode)  
- Supabase (auth + realtime + postgres)  
- Environment variables: MINIMAX_API_KEY, MISTRAL_API_KEY, SUPABASE_URL, SUPABASE_ANON_KEY

Last updated: 2025-12-24  
This file is the single source of truth for "what Andraia is supposed to be".  
Any PR that contradicts this vision without updating VISION.md first should be rejected.