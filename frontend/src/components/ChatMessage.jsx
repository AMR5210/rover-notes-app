import ReactMarkdown from 'react-markdown'

export default function ChatMessage({ message, isUser }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 group`}>
      <div
        className={`max-w-[85%] rounded-lg px-4 py-3 shadow-sm ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-900 border border-gray-200'
        }`}
      >
        {/* Render markdown for AI messages, plain text for user */}
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
        ) : (
          <div className="text-sm leading-relaxed prose prose-sm max-w-none prose-headings:mt-3 prose-headings:mb-2 prose-p:my-2">
            <ReactMarkdown
              components={{
                // Custom styling for markdown elements
                p: ({node, ...props}) => <p className="my-1" {...props} />,
                strong: ({node, ...props}) => <strong className="font-bold" {...props} />,
                em: ({node, ...props}) => <em className="italic" {...props} />,
                code: ({node, inline, ...props}) => 
                  inline ? 
                    <code className="bg-gray-200 px-1 rounded text-xs" {...props} /> :
                    <code className="block bg-gray-200 p-2 rounded my-2 text-xs" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc ml-4 my-2" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal ml-4 my-2" {...props} />,
                li: ({node, ...props}) => <li className="my-1" {...props} />,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
        
        {/* Timestamp */}
        <div className={`text-xs mt-2 opacity-70 ${isUser ? 'text-blue-100' : 'text-gray-500'}`}>
          {formatTime(message.timestamp)}
        </div>
        
        {/* Show sources for AI messages */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-300">
            <p className="text-xs text-gray-600 font-semibold mb-2">📚 Sources used:</p>
            <div className="flex flex-wrap gap-1">
              {message.sources.map((source, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white text-gray-700 text-xs rounded-md border border-gray-300 shadow-sm"
                  title={`Note ID: ${source}`}
                >
                  Note {index + 1}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
