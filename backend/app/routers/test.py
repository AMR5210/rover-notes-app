from fastapi import APIRouter, Depends
from supabase import Client
from app.services.supabase_service import get_supabase_client
from app.models.schemas import NoteCreate, NoteResponse

router = APIRouter(prefix="/api/test", tags=["testing"])

@router.post("/notes-no-auth", response_model=NoteResponse)
async def create_test_note(
    note: NoteCreate,
    user_id: str,  # Pass user_id as a query parameter for testing
    supabase_client: Client = Depends(get_supabase_client)
):
    """
    TEST ONLY: Create a note without authentication
    Pass your Supabase User UID as user_id parameter
    """
    try:
        note_data = {
            "user_id": user_id,
            "title": note.title,
            "content": note.content,
            "tags": note.tags or []
        }
        
        response = supabase_client.table("notes").insert(note_data).execute()
        return response.data[0]
    except Exception as e:
        raise Exception(f"Error: {str(e)}")

@router.get("/notes-no-auth")
async def get_test_notes(
    user_id: str,  # Pass user_id as a query parameter
    supabase_client: Client = Depends(get_supabase_client)
):
    """TEST ONLY: Get notes without authentication"""
    try:
        response = supabase_client.table("notes").select("*").eq("user_id", user_id).execute()
        return response.data
    except Exception as e:
        raise Exception(f"Error: {str(e)}")
