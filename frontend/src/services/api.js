import axios from 'axios'
import { supabase } from './supabase'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession()
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`
  }
  return config
})

// Notes API
export const notesAPI = {
  getAll: () => api.get('/api/notes'),
  getOne: (id) => api.get(`/api/notes/${id}`),
  create: (data) => api.post('/api/notes', data),
  update: (id, data) => api.put(`/api/notes/${id}`, data),
  delete: (id) => api.delete(`/api/notes/${id}`),
  search: (query) => api.get(`/api/notes/search/?q=${query}`),
}

// Chat API
export const chatAPI = {
  send: (message) => api.post('/api/chat', { message }),
  getHistory: (limit = 50) => api.get(`/api/chat/history?limit=${limit}`),
}

export default api
