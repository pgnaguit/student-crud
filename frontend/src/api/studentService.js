import axios from 'axios'

// Handle base URL cleanly: works with proxy in dev, and with full Render backend URL in prod
const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || ''
const BASE_URL = rawBaseUrl
  ? (rawBaseUrl.endsWith('/naguit/students')
      ? rawBaseUrl
      : `${rawBaseUrl.replace(/\/+$/, '')}/naguit/students`)
  : '/naguit/students'

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

export default studentService
