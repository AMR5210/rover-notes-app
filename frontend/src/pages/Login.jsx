import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      navigate('/dashboard')
    } catch (err) {
      // Check if it's an email verification error
      const errorMessage = err.message || 'Failed to sign in'
      
      if (errorMessage.toLowerCase().includes('email') && 
          (errorMessage.toLowerCase().includes('confirm') || 
           errorMessage.toLowerCase().includes('verify') ||
           errorMessage.toLowerCase().includes('not confirmed'))) {
        setError('email_not_verified')
      } else {
        setError(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <span className="text-4xl">🐕</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rover Notes</h1>
          <p className="text-gray-600">Your personal AI-powered knowledge base</p>
        </div>

        {/* Success message from registration */}
        {location.state?.message && (
          <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-lg mb-6 animate-slide-in">
            <div className="flex items-center gap-2">
              <span className="text-xl">✅</span>
              <p className="text-sm">{location.state.message}</p>
            </div>
          </div>
        )}

        {/* Email Not Verified Alert */}
        {error === 'email_not_verified' && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-900 px-4 py-3 rounded-lg mb-6 animate-slide-in">
            <div className="flex items-start gap-2">
              <span className="text-xl">📧</span>
              <div className="flex-1">
                <p className="text-sm font-semibold mb-2">Email Not Verified</p>
                <p className="text-xs mb-2">Please verify your email before signing in.</p>
                <ul className="text-xs space-y-1 ml-4 list-disc">
                  <li>Check your inbox for the verification email</li>
                  <li><strong>Check your spam/junk folder</strong> - it might be there!</li>
                  <li>Click the verification link in the email</li>
                  <li>Then come back and sign in</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* General Error Alert */}
        {error && error !== 'email_not_verified' && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6 animate-slide-in">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-50 disabled:cursor-not-allowed"
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
              Create one for free
            </Link>
          </p>
        </div>

        {/* Features */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center mb-3">What you'll get:</p>
          <div className="space-y-2">
            {['📝 Organize your notes', '🔍 Powerful search', '🤖 AI-powered insights'].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
