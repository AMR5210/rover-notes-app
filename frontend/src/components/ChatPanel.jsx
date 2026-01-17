import { useState, useRef, useEffect } from 'react'
import { chatAPI } from '../services/api'
import ChatMessage from './ChatMessage'
import { ChatSkeleton } from './LoadingStates'

export default function ChatPanel({ toast }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(true)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Load chat history on mount
  useEffect(() => {
    loadChatHistory()
  }, [])

  const loadChatHistory = async () => {
    try {
      setLoadingHistory(true)
      const response = await chatAPI.getHistory(20) // Load last 20 messages
      
      // Convert history to message format
      const historyMessages = response.data.flatMap(item => [
        {
          content: item.question,
          isUser: true,
          timestamp: new Date(item.created_at),
        },
        {
          content: item.answer,
          isUser: false,
          sources: item.context_note_ids,
          timestamp: new Date(item.created_at),
        }
      ])
      
      setMessages(historyMessages)
    } catch (error) {
      console.error('Error loading chat history:', error)
      // Don't show error toast for history loading failure
    } finally {
      setLoadingHistory(false)
    }
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = {
      content: input,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages([...messages, userMessage])
    const currentInput = input
    setInput('')
    setLoading(true)

    try {
      const response = await chatAPI.send(currentInput)
      const aiMessage = {
        content: response.data.answer,
        isUser: false,
        sources: response.data.sources,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      toast?.error('Failed to get AI response')
      const errorMessage = {
        content: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleClearChat = () => {
    if (window.confirm('Clear all chat history? This cannot be undone.')) {
      setMessages([])
      toast?.success('Chat cleared')
    }
  }

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">🐕 Ask Rover</h2>
          <p className="text-sm text-gray-500">Your friendly search companion</p>
        </div>
        {messages.length > 0 && (
          <button
            onClick={handleClearChat}
            className="text-xs text-gray-500 hover:text-red-600 transition"
            title="Clear chat"
          >
            Clear
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {loadingHistory ? (
          // Loading history
          <>
            <ChatSkeleton />
            <ChatSkeleton />
          </>
        ) : messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center text-gray-400">
            <div>
              <div className="text-5xl mb-4">💬</div>
              <p className="font-medium text-gray-600 mb-2">Woof! Ready to help</p>
              <p className="text-sm">Ask Rover to find information from your notes</p>
              <div className="mt-6 text-left bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-sm mx-auto">
                <p className="text-xs font-semibold text-blue-900 mb-2">Try asking:</p>
                <ul className="text-xs text-blue-800 space-y-1">
                  <li>• "What are my notes about?"</li>
                  <li>• "Summarize my Python notes"</li>
                  <li>• "What did I write about Java?"</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} isUser={msg.isUser} />
          ))
        )}
        
        {loading && <ChatSkeleton />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Rover anything about your notes..."
            disabled={loading}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-gray-100 bg-white"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending
              </span>
            ) : (
              'Send'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
