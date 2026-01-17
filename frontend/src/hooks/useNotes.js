import { useState, useEffect } from 'react'
import { notesAPI } from '../services/api'

export function useNotes() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchNotes = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await notesAPI.getAll()
      setNotes(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to fetch notes')
      console.error('Error fetching notes:', err)
    } finally {
      setLoading(false)
    }
  }

  const createNote = async (noteData) => {
    try {
      const response = await notesAPI.create(noteData)
      setNotes([response.data, ...notes])
      setError(null)
      return response.data
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to create note'
      setError(errorMsg)
      throw new Error(errorMsg)
    }
  }

  const updateNote = async (id, noteData) => {
    try {
      const response = await notesAPI.update(id, noteData)
      setNotes(notes.map(note => note.id === id ? response.data : note))
      setError(null)
      return response.data
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to update note'
      setError(errorMsg)
      throw new Error(errorMsg)
    }
  }

  const deleteNote = async (id) => {
    try {
      await notesAPI.delete(id)
      setNotes(notes.filter(note => note.id !== id))
      setError(null)
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to delete note'
      setError(errorMsg)
      throw new Error(errorMsg)
    }
  }

  const searchNotes = async (query) => {
    try {
      setLoading(true)
      setError(null)
      const response = await notesAPI.search(query)
      setNotes(response.data)
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to search notes')
      console.error('Error searching notes:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  return {
    notes,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
    searchNotes,
    refreshNotes: fetchNotes,
  }
}
