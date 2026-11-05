import axios from 'axios'

// Fallback deployed Render backend URL
const PROD_BACKEND_URL = 'https://student-backend-mv4v.onrender.com'

// Determine base URL dynamically:
// 1. Priority to import.meta.env.VITE_API_BASE_URL if explicitly provided
// 2. Fallback to deployed Render backend URL in production environments
// 3. In development (without VITE_API_BASE_URL), default to '/naguit/students' (handled by Vite proxy)
const getBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_BASE_URL
  const rawUrl = envUrl || (import.meta.env.PROD ? PROD_BACKEND_URL : '')

  if (!rawUrl) {
    return '/naguit/students'
  }

  const trimmed = rawUrl.replace(/\/+$/, '')
  return trimmed.endsWith('/naguit/students')
    ? trimmed
    : `${trimmed}/naguit/students`
}

const BASE_URL = getBaseUrl()

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const studentService = {
  // Fetch all students
  getAll: async () => {
    const response = await apiClient.get('')
    return response.data
  },

  // Fetch a single student by id
  getById: async (id) => {
    const response = await apiClient.get(`/${id}`)
    return response.data
  },

  // Create a new student
  create: async (studentData) => {
    const response = await apiClient.post('', studentData)
    return response.data
  },

  // Update existing student
  update: async (id, studentData) => {
    const response = await apiClient.put(`/${id}`, studentData)
    return response.data
  },

  // Delete student by id
  delete: async (id) => {
    const response = await apiClient.delete(`/${id}`)
    return response.data
  },
}

export { BASE_URL }
export default studentService
