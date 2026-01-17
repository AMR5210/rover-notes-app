import { useState, useEffect } from 'react'

export default function NoteEditor({ note, onSave, onCancel, onDelete }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState('')
  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (note) {
      setTitle(note.title || '')
      setContent(note.content || '')
      setTags(note.tags ? note.tags.join(', ') : '')
    } else {
      setTitle('')
      setContent('')
      setTags('')
    }
    setHasChanges(false)
  }, [note])

  useEffect(() => {
    // Track if user made changes
    if (note) {
      const changed = 
        title !== (note.title || '') ||
        content !== (note.content || '') ||
        tags !== (note.tags ? note.tags.join(', ') : '')
      setHasChanges(changed)
    } else {
      setHasChanges(title.length > 0 || content.length > 0 || tags.length > 0)
    }
  }, [title, content, tags, note])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      const noteData = {
        title,
        content,
        tags: tags.split(',').map(t => t.trim()).filter(t => t),
      }
      await onSave(noteData)
      setHasChanges(false)
    } catch (error) {
      console.error('Error saving note:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
      try {
        await onDelete(note.id)
      } catch (error) {
        console.error('Error deleting note:', error)
      }
    }
  }

  const wordCount = content.trim().split(/\s+/).filter(w => w).length
  const charCount = content.length

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col p-6">
        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled Note"
          required
          className="text-3xl font-bold text-gray-900 border-none outline-none mb-4 placeholder-gray-300 focus:placeholder-gray-400"
          autoFocus={!note}
        />

        {/* Tags Input */}
        <div className="mb-4">
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Add tags (comma-separated)..."
            className="w-full text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
          />
          {tags && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.split(',').map(t => t.trim()).filter(t => t).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content Textarea */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your note here...

You can write anything - ideas, code snippets, meeting notes, or anything you want to remember!"
          required
          className="flex-1 text-gray-700 border border-gray-200 rounded-lg p-4 outline-none resize-none placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
          <div className="flex gap-4">
            <span>{wordCount} words</span>
            <span>{charCount} characters</span>
          </div>
          {hasChanges && (
            <span className="text-orange-500 font-medium">Unsaved changes</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6 pt-4 border-t">
          <button
            type="submit"
            disabled={saving || !hasChanges}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md font-medium"
          >
            {saving ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </span>
            ) : (
              note ? 'Update Note' : 'Create Note'
            )}
          </button>
          
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Cancel
            </button>
          )}

          {note && onDelete && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              className="ml-auto px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium shadow-sm hover:shadow-md"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
