export default function NoteCard({ note, isSelected, onClick }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return 'Today'
    } else if (diffInHours < 48) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      })
    }
  }

  const truncateContent = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border ${
        isSelected
          ? 'bg-blue-50 border-blue-500 shadow-md scale-[1.02]'
          : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm hover:scale-[1.01]'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 truncate flex-1">{note.title}</h3>
        {isSelected && (
          <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
        )}
      </div>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
        {truncateContent(note.content)}
      </p>
      
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {note.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {note.tags.length > 2 && (
            <span className="px-2 py-0.5 text-gray-500 text-xs">
              +{note.tags.length - 2}
            </span>
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-400">
          {formatDate(note.updated_at)}
        </div>
        <div className="text-xs text-gray-400">
          {note.content.split(/\s+/).filter(w => w).length} words
        </div>
      </div>
    </div>
  )
}
