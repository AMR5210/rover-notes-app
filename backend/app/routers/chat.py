from fastapi import APIRouter, Depends, HTTPException
from supabase import Client
from app.services.supabase_service import get_supabase_client
from app.services.llm_service import get_llm_service, LLMService
from app.dependencies import get_current_user
from app.models.schemas import ChatRequest, ChatResponse, ChatHistoryResponse
from typing import List
import traceback

router = APIRouter(prefix="/api/chat", tags=["chat"])

@router.post("/", response_model=ChatResponse)
async def send_message(
    request: ChatRequest,
    user_id: str = Depends(get_current_user),
    supabase_client: Client = Depends(get_supabase_client),
    llm_service: LLMService = Depends(get_llm_service)
):
    """Send a message to the AI assistant"""
    try:
        print(f"Chat request from user {user_id}: {request.message}")
        
        # Get AI response with context from notes
        result = await llm_service.get_ai_response(
            supabase_client=supabase_client,
            user_id=user_id,
            message=request.message
        )
        
        print(f"AI response received, sources: {result['sources']}")
        
        # Save to chat history
        chat_data = {
            "user_id": user_id,
            "question": request.message,
            "answer": result["answer"],
            "context_note_ids": result["sources"]
        }
        
        supabase_client.table("chat_history").insert(chat_data).execute()
        
        return ChatResponse(
            answer=result["answer"],
            sources=result["sources"]
        )
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")

@router.get("/history", response_model=List[ChatHistoryResponse])
async def get_chat_history(
    limit: int = 50,
    user_id: str = Depends(get_current_user),
    supabase_client: Client = Depends(get_supabase_client)
):
    """Get chat history for the current user"""
    try:
        response = supabase_client.table("chat_history").select("*").eq("user_id", user_id).order("created_at", desc=True).limit(limit).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching chat history: {str(e)}")
