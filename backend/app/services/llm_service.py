from openai import OpenAI
from app.config import settings
from typing import List, Dict, Any
from supabase import Client
import traceback

class LLMService:
    def __init__(self):
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = "gpt-4.1-nano"  # Cheapest model for testing
    
    async def search_relevant_notes(
        self, 
        supabase_client: Client, 
        user_id: str, 
        query: str,
        limit: int = 5
    ) -> List[Dict[str, Any]]:
        """Search for notes relevant to the query using full-text search"""
        try:
            print(f"Searching notes for user {user_id} with query: {query}")
            
            # Try using the search function first
            try:
                response = supabase_client.rpc(
                    "search_notes",
                    {
                        "search_query": query,
                        "user_uuid": user_id,
                        "match_limit": limit
                    }
                ).execute()
                
                if response.data:
                    print(f"Found {len(response.data)} notes via search function")
                    return response.data
            except Exception as search_error:
                print(f"Search function failed: {search_error}, using fallback")
            
            # Fallback: get all notes
            response = supabase_client.table("notes").select("*").eq("user_id", user_id).limit(limit).execute()
            print(f"Fallback: Retrieved {len(response.data) if response.data else 0} notes")
            return response.data if response.data else []
            
        except Exception as e:
            print(f"Error in search_relevant_notes: {str(e)}")
            print(traceback.format_exc())
            return []
    
    def build_context(self, notes: List[Dict[str, Any]]) -> str:
        """Build context string from notes"""
        if not notes:
            return "No relevant notes found in the user's knowledge base."
        
        context = "User's Knowledge Base:\n\n"
        for note in notes:
            context += f"Title: {note['title']}\n"
            context += f"Content: {note['content']}\n"
            if note.get('tags'):
                context += f"Tags: {', '.join(note['tags'])}\n"
            context += "\n---\n\n"
        
        return context
    
    async def get_ai_response(
        self,
        supabase_client: Client,
        user_id: str,
        message: str
    ) -> Dict[str, Any]:
        """Get AI response using OpenAI API with user's notes as context"""
        
        try:
            print(f"Getting AI response for message: {message}")
            
            # Search for relevant notes
            relevant_notes = await self.search_relevant_notes(supabase_client, user_id, message)
            print(f"Using {len(relevant_notes)} notes as context")
            
            # Build context from notes
            context = self.build_context(relevant_notes)
            
            # Build system prompt
            system_prompt = f"""You are a helpful AI assistant with access to the user's personal knowledge base.
Answer questions based on the information provided in their notes below.
If the answer isn't in their notes, say so clearly and provide general help if appropriate.
Always cite which specific note(s) you used when answering from the knowledge base.

{context}
"""
            
            print("Calling OpenAI API...")
            
            # Call OpenAI API
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": message}
                ],
                max_tokens=2000,
                temperature=0.7
            )
            
            # Extract text from response
            answer = response.choices[0].message.content
            print(f"OpenAI response received, length: {len(answer)}")
            
            # Get source note IDs
            source_ids = [note['id'] for note in relevant_notes]
            
            return {
                "answer": answer,
                "sources": source_ids
            }
            
        except Exception as e:
            print(f"Error in get_ai_response: {str(e)}")
            print(traceback.format_exc())
            raise

# Singleton instance
llm_service = LLMService()

def get_llm_service() -> LLMService:
    """Dependency to get LLM service"""
    return llm_service
