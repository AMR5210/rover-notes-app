# 🐕 Rover Notes

> **AI-Powered Personal Knowledge Management System**

A full-stack web application that combines note-taking with intelligent AI assistance - inspired by the beloved Windows XP search companion, Rover the dog. Upload your notes and ask Rover to help you find information using advanced RAG (Retrieval-Augmented Generation) technology.

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://rover-notes-app-jet.vercel.app)
[![API Docs](https://img.shields.io/badge/API-Docs-blue?style=for-the-badge)](https://rover-notes-api.onrender.com/docs)

## 🚀 Live Demo

🔗 **Live App:** [https://rover-notes-app-jet.vercel.app/](https://rover-notes-app-jet.vercel.app/)
---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Live Demo](#live-demo)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Development Journey](#development-journey)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Overview

**Rover Notes** is a comprehensive knowledge management platform that combines traditional note-taking with cutting-edge AI technology. Users can create, organize, and search through their notes, while Rover - the AI assistant - helps find information using intelligent context-aware search.

### The Problem It Solves

Traditional note-taking apps force users to manually search and browse through notes. Rover Notes uses AI to understand your questions in natural language and automatically finds relevant information across all your notes, making knowledge retrieval effortless.

### Key Innovation

**RAG (Retrieval-Augmented Generation)**: When you ask Rover a question, the system:
1. Searches your entire knowledge base using full-text search
2. Retrieves the most relevant notes
3. Uses those notes as context for the AI
4. Generates accurate, personalized answers based on YOUR information

---

## ✨ Features

### 📝 Smart Note Management
- **Create & Edit** - Rich text editor with title, content, and tags
- **Organization** - Tag-based categorization for easy filtering
- **Full-Text Search** - PostgreSQL-powered search across all notes
- **Real-time Updates** - Instant sync across all your devices
- **Word & Character Count** - Track your writing metrics
- **Unsaved Changes Warning** - Never lose your work

### 🤖 AI-Powered Assistant (Rover)
- **Context-Aware Responses** - Rover uses your notes as context
- **Natural Language Queries** - Ask questions like you would a colleague
- **Source Citations** - See which notes were used to answer your question
- **Conversation History** - All chats are saved and persist across sessions
- **Markdown Rendering** - Beautiful formatting for code, lists, and emphasis

### 🔐 Security & Authentication
- **Supabase Auth** - Secure email/password authentication
- **JWT Tokens** - Industry-standard token-based auth
- **Row Level Security** - Database-level access control
- **Protected Routes** - Client and server-side route protection
- **Email Verification** - Confirm email addresses before access

### 🎨 User Experience
- **Beautiful UI** - Modern design with Tailwind CSS
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Toast Notifications** - Real-time feedback for all actions
- **Loading States** - Skeleton loaders and spinners
- **Empty States** - Helpful guidance when starting out
- **Dark Mode Ready** - Architecture supports theming (future enhancement)

---

## 🛠 Technology Stack

### Backend (Python)
| Technology | Purpose | Version |
|------------|---------|---------|
| FastAPI | REST API Framework | 0.128.0 |
| PostgreSQL | Relational Database | Latest |
| Supabase | Backend-as-a-Service | 2.27.2 |
| OpenAI API | LLM Integration | 1.59.8 |
| PyJWT | JWT Authentication | 2.10.1 |
| Pydantic | Data Validation | 2.12.5 |
| Uvicorn | ASGI Server | 0.40.0 |

### Frontend (JavaScript)
| Technology | Purpose | Version |
|------------|---------|---------|
| React | UI Framework | 18.x |
| Vite | Build Tool | 5.x |
| Tailwind CSS | Styling Framework | 3.4.17 |
| React Router | Client-side Routing | 6.x |
| Axios | HTTP Client | Latest |
| React Markdown | Markdown Rendering | Latest |

### Database
| Component | Technology |
|-----------|------------|
| Database | PostgreSQL 15+ |
| Hosting | Supabase |
| ORM | Supabase Client SDK |
| Search | PostgreSQL Full-Text Search (tsvector) |
| Security | Row Level Security (RLS) Policies |

### AI/ML
| Component | Technology |
|-----------|------------|
| LLM Model | GPT-4.1-nano (OpenAI) |
| Search Algorithm | PostgreSQL ts_rank |
| Context Window | 2000 tokens |

### DevOps
| Component | Technology |
|-----------|------------|
| Version Control | Git + GitHub |
| CI/CD | GitHub Actions |
| Backend Hosting | Render |
| Frontend Hosting | Vercel |
| Container | Docker (optional) |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                              │
│                    React 18 + Vite + Tailwind CSS                    │
│                                                                       │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────────────────┐    │
│  │   Login/    │  │    Notes    │  │      AI Chat Panel       │    │
│  │  Register   │  │   Manager   │  │   (Ask Rover Anything)   │    │
│  └─────────────┘  └─────────────┘  └──────────────────────────┘    │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               │ HTTPS/REST API
                               │
┌──────────────────────────────▼──────────────────────────────────────┐
│                      BACKEND (FastAPI)                               │
│                         Port: 8000                                   │
│                                                                       │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────────┐    │
│  │   Auth       │  │    Notes     │  │       Chat             │    │
│  │  Middleware  │  │    CRUD      │  │   (LLM Service)        │    │
│  │  (JWT)       │  │  + Search    │  │                        │    │
│  └──────────────┘  └──────────────┘  └────────────────────────┘    │
│                                                                       │
│  Dependencies:                                                        │
│  • JWT verification                                                   │
│  • Pydantic validation                                                │
│  • CORS middleware                                                    │
└──────────────┬────────────────────────┬─────────────────────────────┘
               │                        │
               ▼                        ▼
┌──────────────────────────┐   ┌──────────────────────────────────────┐
│   Supabase (PostgreSQL)  │   │      OpenAI API                      │
│                          │   │                                      │
│  Tables:                 │   │  Model: GPT-4.1-nano                │
│  • profiles              │   │  Purpose: RAG-based Q&A             │
│  • notes                 │   │  Max Tokens: 2000                   │
│  • chat_history          │   │  Temperature: 0.7                   │
│                          │   │                                      │
│  Features:               │   │  Flow:                              │
│  • Row Level Security    │   │  1. Retrieve relevant notes         │
│  • Full-text search      │   │  2. Build context prompt            │
│  • User auth             │   │  3. Generate response               │
│  • Real-time updates     │   │  4. Return with citations           │
└──────────────────────────┘   └──────────────────────────────────────┘
```

---

## 🌐 Live Demo

### Try It Out!

**Frontend**: [https://rover-notes-app-jet.vercel.app](https://rover-notes-app-jet.vercel.app)  
**API Docs**: [https://rover-notes-api.onrender.com/docs](https://rover-notes-api.onrender.com/docs)

**Test Account:**
- Create your own account or use the demo below
- Note: Emails require verification (check spam folder!)

---

## 📥 Installation

### Prerequisites

- **Python** 3.10+ ([Download](https://python.org/))
- **Node.js** 20+ ([Download](https://nodejs.org/))
- **Supabase Account** ([Sign up](https://supabase.com))
- **OpenAI API Key** ([Get one](https://platform.openai.com/))
- **Git** ([Download](https://git-scm.com/))

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/rover-notes.git
cd rover-notes

# Setup Backend
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your credentials
uvicorn app.main:app --reload

# Setup Frontend (new terminal)
cd ../frontend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

Visit `http://localhost:5173` 🚀

---

## ⚙️ Configuration

### Backend Environment Variables

Create `backend/.env`:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret

# OpenAI Configuration
OPENAI_API_KEY=sk-proj-...

# CORS Configuration
FRONTEND_URL=http://localhost:5173
```

**Where to find Supabase credentials:**
1. Supabase Dashboard → Settings → API
2. Copy **Project URL**, **service_role key**, and **JWT Secret**

### Frontend Environment Variables

Create `frontend/.env`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key

# Backend API URL
VITE_API_URL=http://localhost:8000
```

### Database Setup

Run this SQL in Supabase SQL Editor (`backend/supabase_search_function.sql`):

```sql
-- Creates the search_notes function for intelligent note retrieval
CREATE OR REPLACE FUNCTION search_notes(
  search_query TEXT,
  user_uuid UUID,
  match_limit INT DEFAULT 5
) RETURNS TABLE (...);
```

See the full SQL file in the repository.

---

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # Windows: venv\Scripts\activate
uvicorn app.main:app --reload
```
Backend runs at: `http://localhost:8000`  
API docs at: `http://localhost:8000/docs`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs at: `http://localhost:5173`

---

## 📚 API Documentation

### Interactive Swagger UI

Once the backend is running, access the interactive API documentation at:

```
http://localhost:8000/docs
```

### Key Endpoints

#### Notes Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/notes` | Get all user notes | ✅ |
| GET | `/api/notes/{id}` | Get single note | ✅ |
| POST | `/api/notes` | Create new note | ✅ |
| PUT | `/api/notes/{id}` | Update note | ✅ |
| DELETE | `/api/notes/{id}` | Delete note | ✅ |
| GET | `/api/notes/search?q=` | Search notes | ✅ |

#### AI Chat
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/chat` | Send message to Rover | ✅ |
| GET | `/api/chat/history` | Get chat history | ✅ |

#### System
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | Health check | ❌ |
| GET | `/` | API info | ❌ |

---

## 🚢 Deployment

### Backend Deployment (Render)

**Platform**: Render.com  
**URL**: https://rover-notes-api.onrender.com

**Configuration:**
- Runtime: Python 3.10
- Build: `pip install -r requirements.txt`
- Start: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
- Root Directory: `backend`

**Environment Variables:**
```
SUPABASE_URL, SUPABASE_KEY, SUPABASE_JWT_SECRET, 
OPENAI_API_KEY, FRONTEND_URL
```

### Frontend Deployment (Vercel)

**Platform**: Vercel  
**URL**: https://rover-notes-app-jet.vercel.app

**Configuration:**
- Framework: Vite
- Build: `npm run build`
- Output: `dist`
- Root Directory: `frontend`

**Environment Variables:**
```
VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_API_URL
```

### CI/CD Pipeline

**GitHub Actions** workflow automatically:
- ✅ Tests backend on every push
- ✅ Tests frontend build
- ✅ Validates code quality
- ✅ Auto-deploys to Render & Vercel

See `.github/workflows/deploy.yml` for details.

---

## 📁 Project Structure

```
rover-notes/
├── 📂 backend/                     # FastAPI Backend
│   ├── app/
│   │   ├── main.py                 # FastAPI app entry point
│   │   ├── config.py               # Environment configuration
│   │   ├── dependencies.py         # Auth middleware (JWT)
│   │   ├── routers/
│   │   │   ├── notes.py            # Notes CRUD endpoints
│   │   │   ├── chat.py             # AI chat endpoints
│   │   │   └── test.py             # Testing endpoints
│   │   ├── services/
│   │   │   ├── supabase_service.py # Database client
│   │   │   └── llm_service.py      # OpenAI integration + RAG
│   │   └── models/
│   │       └── schemas.py          # Pydantic models
│   ├── requirements.txt            # Python dependencies
│   ├── Dockerfile                  # Container configuration
│   ├── railway.json                # Railway config
│   ├── nixpacks.toml              # Nixpacks config
│   └── .env.example
│
├── 📂 frontend/                    # React Frontend
│   ├── src/
│   │   ├── App.jsx                 # Main app with routing
│   │   ├── main.jsx                # Entry point
│   │   ├── index.css               # Global styles + Tailwind
│   │   ├── components/
│   │   │   ├── NoteCard.jsx        # Note preview component
│   │   │   ├── NoteEditor.jsx      # Note creation/editing
│   │   │   ├── ChatPanel.jsx       # AI chat interface
│   │   │   ├── ChatMessage.jsx     # Message display
│   │   │   ├── SearchBar.jsx       # Search functionality
│   │   │   ├── Toast.jsx           # Notifications
│   │   │   └── LoadingStates.jsx   # Skeletons
│   │   ├── pages/
│   │   │   ├── Login.jsx           # Login page
│   │   │   ├── Register.jsx        # Registration + email verification
│   │   │   ├── Dashboard.jsx       # Main 3-panel interface
│   │   │   └── NotFound.jsx        # 404 page
│   │   ├── context/
│   │   │   └── AuthContext.jsx     # Authentication state
│   │   ├── services/
│   │   │   ├── supabase.js         # Supabase client
│   │   │   └── api.js              # Axios + API calls
│   │   └── hooks/
│   │       └── useNotes.js         # Notes management hook
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── .env.example
│
├── 📂 .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD pipeline
│
├── README.md                       # This file
├── .gitignore
└── LICENSE
```

---

## 💡 Development Journey

This project was built as a demonstration of full-stack development capabilities, with emphasis on:

### Technical Achievements

1. **Clean Architecture** - Separated concerns with routers, services, and models
2. **Type Safety** - Pydantic models for all API requests/responses
3. **Security First** - JWT auth, RLS policies, CORS configuration
4. **AI Integration** - Implemented RAG pattern for context-aware responses
5. **Production Ready** - Deployed with proper configs, error handling, logging

### Challenges Overcome

- **JWT Verification** - Implemented dual-verification system (Supabase + manual)
- **CORS Configuration** - Proper setup for cross-origin requests
- **AI Context Building** - Optimized note retrieval and prompt engineering
- **Real-time Updates** - Managed state across components efficiently
- **Email Verification UX** - Clear user guidance for spam folder checks

### Development Time

- **Planning & Design**: 1 hour
- **Backend Development**: 4 hours
- **Frontend Development**: 5 hours
- **AI Integration**: 2 hours
- **Deployment & CI/CD**: 1 hour
- **Total**: ~13 hours

---

## 🔮 Future Enhancements

### Planned Features
- [ ] **Rich Text Editor** - Markdown support in note editor
- [ ] **File Attachments** - Upload images/PDFs to notes
- [ ] **Collaborative Notes** - Share notes with other users
- [ ] **Voice Input** - Dictate notes and chat with Rover
- [ ] **Mobile Apps** - Native iOS/Android applications
- [ ] **Advanced Search** - Filters by date, tags, content type
- [ ] **Export Options** - PDF/Markdown export
- [ ] **Dark Mode** - Full dark theme support
- [ ] **Offline Mode** - Progressive Web App capabilities
- [ ] **Analytics Dashboard** - Usage statistics and insights

### Technical Improvements
- [ ] **Claude API Option** - Alternative to OpenAI
- [ ] **Vector Database** - Embeddings for semantic search
- [ ] **Caching Layer** - Redis for performance
- [ ] **Webhooks** - Real-time notifications
- [ ] **Rate Limiting** - API throttling
- [ ] **Automated Testing** - Unit and integration tests

---

## 🧪 Testing

### Manual Testing

All features have been manually tested:
- ✅ User authentication flow
- ✅ Notes CRUD operations
- ✅ Search functionality
- ✅ AI chat with context retrieval
- ✅ Chat history persistence
- ✅ Responsive design on multiple screen sizes

### Automated Testing

CI/CD pipeline tests:
- ✅ Backend dependency installation
- ✅ Python syntax validation
- ✅ Frontend build process
- ✅ TypeScript compilation (if using TS)

---

## 🎓 Key Learnings

### Technical Skills Demonstrated

1. **Full-Stack Development** - Complete ownership from database to UI
2. **API Design** - RESTful principles with proper status codes
3. **Authentication** - Industry-standard JWT implementation
4. **Database Design** - Normalized schema with proper relationships
5. **AI Integration** - Practical application of LLMs with RAG
6. **DevOps** - CI/CD pipeline and cloud deployment
7. **UI/UX Design** - User-centered design with accessibility in mind

### Best Practices Applied

- Clean code with separation of concerns
- Environment-based configuration
- Proper error handling and logging
- Security-first approach (RLS, JWT, input validation)
- Responsive and accessible UI
- Git workflow with meaningful commits
- Documentation at code and API level

---

## 🤝 Contributing

This is a personal project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

---

## 🙏 Acknowledgments

- **Inspired by**: Rover, the Windows XP search companion 🐕
- **Built with**: Modern web technologies and AI
- **Purpose**: Research Assistant application for Northeastern University

---


---

## ⚠️ Disclaimer

This is an educational project demonstrating full-stack development capabilities. The AI responses are generated by language models and should not replace professional advice in critical decision-making scenarios.

---

