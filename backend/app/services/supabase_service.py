from supabase import create_client, Client
from app.config import settings

class SupabaseService:
    def __init__(self):
        self.client: Client = create_client(
            settings.SUPABASE_URL, 
            settings.SUPABASE_KEY
        )
    
    def get_client(self) -> Client:
        return self.client

# Singleton instance
supabase_service = SupabaseService()

def get_supabase_client() -> Client:
    """Dependency to get Supabase client"""
    return supabase_service.get_client()
