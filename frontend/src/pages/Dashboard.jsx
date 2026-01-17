import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useNotes } from '../hooks/useNotes'
import NoteCard from '../components/NoteCard'
import NoteEditor from '../components/NoteEditor'
import ChatPanel from '../components/ChatPanel'
import SearchBar from '../components/SearchBar'
import { useToast, ToastContainer } from '../components/Toast'
import { NoteCardSkeleton } from '../components/LoadingStates'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const { notes, loading, createNote, updateNote, deleteNote, searchNotes, refreshNotes } = useNotes()
  const { toasts, toast, removeToast } = useToast()
  
  const [selectedNote, setSelectedNote] = useState(null)
  const [isCreatingNew, setIsCreatingNew] = useState(false)

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch (error) {
      toast.error('Error signing out')
      console.error('Error signing out:', error)
    }
  }

  const handleCreateNew = () => {
    setSelectedNote(null)
    setIsCreatingNew(true)
  }

  const handleNoteClick = (note) => {
    setSelectedNote(note)
    setIsCreatingNew(false)
  }

  const handleSaveNote = async (noteData) => {
    try {
      if (selectedNote) {
        await updateNote(selectedNote.id, noteData)
        toast.success('Note updated successfully!')
      } else {
        const newNote = await createNote(noteData)
        setSelectedNote(newNote)
        toast.success('Note created successfully!')
      }
      setIsCreatingNew(false)
    } catch (error) {
      toast.error('Failed to save note')
      console.error('Error saving note:', error)
    }
  }

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId)
      setSelectedNote(null)
      setIsCreatingNew(false)
      toast.success('Note deleted successfully!')
    } catch (error) {
      toast.error('Failed to delete note')
      console.error('Error deleting note:', error)
    }
  }

  const handleSearch = (query) => {
    searchNotes(query)
  }

  const handleClearSearch = () => {
    refreshNotes()
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b h-16 flex-shrink-0">
        <div className="h-full px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐕</span>
            <h1 className="text-xl font-bold text-gray-900">Rover Notes</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 hidden sm:block">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content - 3 Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Notes List */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-gray-200">
            <button
              onClick={handleCreateNew}
              className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow-sm hover:shadow-md"
            >
              + New Note
            </button>
          </div>

          <div className="p-4">
            <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
            {loading ? (
              // Loading skeletons
              <>
                <NoteCardSkeleton />
                <NoteCardSkeleton />
                <NoteCardSkeleton />
              </>
            ) : notes.length === 0 ? (
              // Empty state
              <div className="text-center text-gray-400 mt-12 px-4">
                <div className="text-5xl mb-4">📝</div>
                <p className="font-medium text-gray-600 mb-2">No notes yet</p>
                <p className="text-sm">Click "New Note" above to create your first note!</p>
              </div>
            ) : (
              // Notes list
              notes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  isSelected={selectedNote?.id === note.id}
                  onClick={() => handleNoteClick(note)}
                />
              ))
            )}
          </div>
        </div>

        {/* Center - Note Editor */}
        <div className="flex-1 p-6 overflow-auto">
          {selectedNote || isCreatingNew ? (
            <NoteEditor
              note={selectedNote}
              onSave={handleSaveNote}
              onCancel={() => {
                setSelectedNote(null)
                setIsCreatingNew(false)
              }}
              onDelete={handleDeleteNote}
            />
          ) : (
            // Empty state for editor
            <div className="h-full flex items-center justify-center bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="text-center text-gray-400 px-8">
                <div className="text-6xl mb-4">✍️</div>
                <p className="text-xl font-medium text-gray-600 mb-2">No note selected</p>
                <p className="text-sm">Select a note from the sidebar to view or edit</p>
                <p className="text-sm mt-1">Or click "New Note" to create one</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - AI Chat */}
        <div className="w-96 p-6 pl-0 flex-shrink-0 hidden lg:block">
          <ChatPanel toast={toast} />
        </div>
      </div>

      {/* Mobile Chat Toggle Button (for responsive) */}
      <button
        className="lg:hidden fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center text-2xl"
        onClick={() => toast.info('Mobile chat coming soon!')}
      >
        💬
      </button>
    </div>
  )
}
