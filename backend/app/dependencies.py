from fastapi import Header, HTTPException, Depends
from supabase import Client
from app.services.supabase_service import get_supabase_client
from app.config import settings
import jwt
from typing import Optional

async def get_current_user(
    authorization: Optional[str] = Header(None),
    supabase_client: Client = Depends(get_supabase_client)
) -> str:
    """
    Extract and verify JWT token from Authorization header
    Returns the user ID if valid, raises HTTPException if invalid
    """
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization header")
    
    # Extract token from "Bearer <token>" format
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid authentication scheme")
    except ValueError:
        raise HTTPException(status_code=401, detail="Invalid authorization header format")
    
    # Verify JWT token using Supabase
    try:
        # Use Supabase to verify the token
        user_response = supabase_client.auth.get_user(token)
        
        if not user_response.user:
            raise HTTPException(status_code=401, detail="Invalid token: user not found")
        
        return user_response.user.id
        
    except Exception as e:
        # Fallback to manual JWT verification
        try:
            payload = jwt.decode(
                token,
                settings.SUPABASE_JWT_SECRET,
                algorithms=["HS256"],
                options={"verify_aud": False}  # Supabase tokens may not have standard audience
            )
            
            user_id = payload.get("sub")
            if not user_id:
                raise HTTPException(status_code=401, detail="Invalid token: missing user ID")
            
            return user_id
            
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token has expired")
        except jwt.InvalidTokenError as e:
            raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")
        except Exception as e:
            raise HTTPException(status_code=401, detail=f"Authentication error: {str(e)}")
