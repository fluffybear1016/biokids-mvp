# bioKids MVP

Natural Growth Hormone Optimization Platform for Children (Prenatal - Age 25)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **AI:** OpenAI API (for Jarvis)

## Getting Started

### 1. Clone and Install

```bash
cd biokids-mvp
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the contents of `supabase-schema.sql`
3. Copy your project URL and anon key from Settings > API

### 3. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
OPENAI_API_KEY=your-openai-key  # For Jarvis
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
biokids-mvp/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── dashboard/
│   │   └── page.tsx          # Main dashboard
│   ├── protocol/
│   │   └── page.tsx          # Protocol tracking
│   ├── learn/
│   │   └── page.tsx          # Articles/Knowledge hub
│   ├── jarvis/
│   │   └── page.tsx          # AI chat assistant
│   ├── windows/
│   │   ├── sleep/page.tsx    # Golden Sleep Window
│   │   ├── height/page.tsx   # Height Opportunity
│   │   └── circadian/page.tsx # Circadian Alignment
│   ├── signup/
│   │   └── page.tsx          # Signup flow
│   └── login/
│       └── page.tsx          # Login page
├── components/
│   └── Nav.tsx               # Navigation component
├── lib/
│   └── supabase.ts           # Supabase client + types
└── supabase-schema.sql       # Database schema
```

## Features

### Dashboard
- Growth window status (empowerment framing)
- Three GH windows: Sleep, Height, Circadian
- Today's protocol checklist
- Jarvis quick access
- Daily growth secret

### Protocol
- High-leverage decisions (quick daily wins)
- Power Foods tracking (8 items)
- Lifestyle Optimizers tracking (8 items)
- Growth strategy overview

### Growth Windows
- Golden Sleep Window (sleep timing/architecture)
- Height Opportunity (growth plates/exercise)
- Circadian Alignment (light/dark cycles)

### Learn
- Category-filtered articles
- Deep dives into GH science
- Peer-reviewed citations

### Jarvis
- AI chat assistant
- GH optimization knowledge base
- Contextual responses per child

## Database Schema

### Tables
- `children` - Child profiles
- `measurements` - Height/weight tracking
- `daily_logs` - Daily protocol checklist
- `weekly_tracking` - Power foods + lifestyle tracking
- `growth_windows` - Window status per child
- `knowledge_chunks` - RAG content for Jarvis
- `articles` - Learn section content
- `chat_messages` - Jarvis conversation history

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Add environment variables in Vercel dashboard.

### Other Platforms

Build for production:

```bash
npm run build
npm start
```

## Next Steps

1. [ ] Wire up Supabase auth (signup/login)
2. [ ] Connect dashboard to real data
3. [ ] Implement protocol tracking persistence
4. [ ] Build Jarvis API route with RAG
5. [ ] Add child switcher functionality
6. [ ] Implement measurement tracking
7. [ ] Add social sharing for growth secrets
8. [ ] Build email notifications for protocol reminders

## Domain

Deploy to: **bioKids.me**

---

Built with 🌿 for parents who want to maximize their child's natural growth potential.

