from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.routers import notes, chat, test

# Initialize FastAPI app
app = FastAPI(
    title="Rover Notes API",
    description="Personal knowledge management with AI-powered search companion",
    version="1.0.0"
)

# Configure CORS - Allow Vercel frontend
allowed_origins = [
    settings.FRONTEND_URL,
    settings.FRONTEND_URL.rstrip('/'),  # Remove trailing slash
    "https://rover-notes-app-jet.vercel.app",
    "https://ai-knowledge-hub-jet.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(notes.router)
app.include_router(chat.router)
app.include_router(test.router)  # Testing endpoints

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Rover Notes API",
        "version": "1.0.0"
    }

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Rover Notes API - Woof!",
        "docs": "/docs",
        "health": "/health"
    }

# Optional: Startup event to validate configuration
@app.on_event("startup")
async def startup_event():
    """Validate configuration on startup"""
    print("Starting Rover Notes API... 🐕")
    print(f"Supabase URL: {settings.SUPABASE_URL}")
    print(f"Frontend URL: {settings.FRONTEND_URL}")
    print("API is ready!")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
