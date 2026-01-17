# AI Knowledge Hub - Frontend

React + Vite frontend for the AI Knowledge Hub application.

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the frontend directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:8000
```

Get these from your Supabase Dashboard → Settings → API

### 3. Run Development Server
```bash
npm run dev
```

The app will be available at http://localhost:5173

## Features

- 🔐 Authentication (Login/Register with Supabase)
- 📝 Notes Management (Create, Read, Update, Delete)
- 🔍 Search Notes
- 💬 AI Chat with context from your notes
- 🎨 Beautiful UI with Tailwind CSS

## Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── ChatMessage.jsx
│   │   ├── ChatPanel.jsx
│   │   ├── NoteCard.jsx
│   │   ├── NoteEditor.jsx
│   │   └── SearchBar.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── supabase.js
│   ├── hooks/
│   │   └── useNotes.js
│   ├── App.jsx
│   └── main.jsx
├── .env
├── package.json
└── tailwind.config.js
```

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router
- Supabase (Auth + Database)
- Axios (API calls)
