# AI Knowledge Hub - Backend

FastAPI backend for the AI Knowledge Hub application.

## Setup

### 1. Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables
Create a `.env` file in the backend directory:
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_service_key
SUPABASE_JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
FRONTEND_URL=http://localhost:5173
```

### 4. Set Up Supabase Database
1. Go to your Supabase project SQL Editor
2. Run the `supabase_search_function.sql` script to create the search function

### 5. Run the Development Server
```bash
uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Notes
- `GET /api/notes` - Get all notes
- `GET /api/notes/{id}` - Get single note
- `POST /api/notes` - Create note
- `PUT /api/notes/{id}` - Update note
- `DELETE /api/notes/{id}` - Delete note
- `GET /api/notes/search?q=query` - Search notes

### Chat
- `POST /api/chat` - Send message to AI
- `GET /api/chat/history` - Get chat history

### Health
- `GET /health` - Health check

## Authentication

All API endpoints (except /health and /) require a valid Supabase JWT token in the Authorization header:
```
Authorization: Bearer <your_supabase_jwt_token>
```

## Project Structure
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app setup
│   ├── config.py               # Configuration
│   ├── dependencies.py         # Auth middleware
│   ├── routers/
│   │   ├── notes.py           # Notes endpoints
│   │   └── chat.py            # Chat endpoints
│   ├── services/
│   │   ├── supabase_service.py # Supabase client
│   │   └── llm_service.py      # Claude API integration
│   └── models/
│       └── schemas.py          # Pydantic models
├── requirements.txt
├── Dockerfile
└── .env
```
