-- PostgreSQL function for full-text search on notes
-- Run this in Supabase SQL Editor

CREATE OR REPLACE FUNCTION search_notes(
  search_query TEXT,
  user_uuid UUID,
  match_limit INT DEFAULT 5
)
RETURNS TABLE (
  id UUID,
  user_id UUID,
  title TEXT,
  content TEXT,
  tags TEXT[],
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    n.id,
    n.user_id,
    n.title,
    n.content,
    n.tags,
    n.created_at,
    n.updated_at
  FROM notes n
  WHERE n.user_id = user_uuid
  AND (
    to_tsvector('english', n.title || ' ' || n.content) @@ plainto_tsquery('english', search_query)
    OR n.title ILIKE '%' || search_query || '%'
    OR n.content ILIKE '%' || search_query || '%'
  )
  ORDER BY 
    ts_rank(to_tsvector('english', n.title || ' ' || n.content), plainto_tsquery('english', search_query)) DESC,
    n.updated_at DESC
  LIMIT match_limit;
END;
$$;
