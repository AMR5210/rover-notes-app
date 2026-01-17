import { useState, useEffect } from 'react'

let toastId = 0

export function useToast() {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'info') => {
    const id = toastId++
    setToasts(prev => [...prev, { id, message, type }])
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      removeToast(id)
    }, 4000)
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  const toast = {
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error'),
    info: (msg) => addToast(msg, 'info'),
  }

  return { toasts, toast, removeToast }
}

export function ToastContainer({ toasts, onRemove }) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map(({ id, message, type }) => (
        <div
          key={id}
          className={`px-6 py-3 rounded-lg shadow-lg text-white min-w-[300px] max-w-md animate-slide-in ${
            type === 'success' ? 'bg-green-500' :
            type === 'error' ? 'bg-red-500' :
            'bg-blue-500'
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium">{message}</p>
            <button
              onClick={() => onRemove(id)}
              className="text-white hover:text-gray-200 transition"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
