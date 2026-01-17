from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

# Note Schemas
class NoteCreate(BaseModel):
    title: str
    content: str
    tags: Optional[List[str]] = []

class NoteUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[List[str]] = None

class NoteResponse(BaseModel):
    id: str
    user_id: str
    title: str
    content: str
    tags: List[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Chat Schemas
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    answer: str
    sources: List[str]  # Note IDs used as context

class ChatHistoryResponse(BaseModel):
    id: str
    question: str
    answer: str
    context_note_ids: List[str]
    created_at: datetime
    
    class Config:
        from_attributes = True
