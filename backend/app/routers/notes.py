from fastapi import APIRouter, Depends, HTTPException, Query
from supabase import Client
from app.services.supabase_service import get_supabase_client
from app.dependencies import get_current_user
from app.models.schemas import NoteCreate, NoteUpdate, NoteResponse
from typing import List

router = APIRouter(prefix="/api/notes", tags=["notes"])

@router.get("/", response_model=List[NoteResponse])
async def get_notes(
    user_id: str = Depends(get_current_user),
    supabase_client: Client = Depends(get_supabase_client)
):
    """Get all notes for the current user"""
    try:
        response = supabase_client.table("notes").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching notes: {str(e)}")

@router.get("/{note_id}", response_model=NoteResponse)
async def get_note(
    note_id: str,
    user_id: str = Depends(get_current_user),
    supabase_client: Client = Depends(get_supabase_client)
):
    """Get a single note by ID"""
    try:
        response = supabase_client.table("notes").select("*").eq("id", note_id).eq("user_id", user_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Note not found")
        
        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching note: {str(e)}")

@router.post("/", response_model=NoteResponse, status_code=201)
async def create_note(
    note: NoteCreate,
    user_id: str = Depends(get_current_user),
    supabase_client: Client = Depends(get_supabase_client)
):
    """Create a new note"""
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
        raise HTTPException(status_code=500, detail=f"Error creating note: {str(e)}")

@router.put("/{note_id}", response_model=NoteResponse)
async def update_note(
    note_id: str,
    note: NoteUpdate,
    user_id: str = Depends(get_current_user),
    supabase_client: Client = Depends(get_supabase_client)
):
    """Update an existing note"""
    try:
        # First verify the note belongs to the user
        check_response = supabase_client.table("notes").select("id").eq("id", note_id).eq("user_id", user_id).execute()
        
        if not check_response.data:
            raise HTTPException(status_code=404, detail="Note not found")
        
        # Build update data (only include fields that are not None)
        update_data = {}
        if note.title is not None:
            update_data["title"] = note.title
        if note.content is not None:
            update_data["content"] = note.content
        if note.tags is not None:
            update_data["tags"] = note.tags
        
        if not update_data:
            raise HTTPException(status_code=400, detail="No fields to update")
        
        response = supabase_client.table("notes").update(update_data).eq("id", note_id).eq("user_id", user_id).execute()
        return response.data[0]
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating note: {str(e)}")

@router.delete("/{note_id}", status_code=204)
async def delete_note(
    note_id: str,
    user_id: str = Depends(get_current_user),
    supabase_client: Client = Depends(get_supabase_client)
):
    """Delete a note"""
    try:
        # Verify note exists and belongs to user
        check_response = supabase_client.table("notes").select("id").eq("id", note_id).eq("user_id", user_id).execute()
        
        if not check_response.data:
            raise HTTPException(status_code=404, detail="Note not found")
        
        supabase_client.table("notes").delete().eq("id", note_id).eq("user_id", user_id).execute()
        return None
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting note: {str(e)}")

@router.get("/search/", response_model=List[NoteResponse])
async def search_notes(
    q: str = Query(..., min_length=1, description="Search query"),
    user_id: str = Depends(get_current_user),
    supabase_client: Client = Depends(get_supabase_client)
):
    """Search notes by content or title"""
    try:
        # Use Supabase's full-text search if available
        # For now, we'll use a simple ILIKE search
        response = supabase_client.table("notes").select("*").eq("user_id", user_id).or_(
            f"title.ilike.%{q}%,content.ilike.%{q}%"
        ).execute()
        
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching notes: {str(e)}")
