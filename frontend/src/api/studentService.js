import axios from 'axios'

// If VITE_API_BASE_URL is provided, use it; otherwise use the relative path (handled by Vite proxy)
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/naguit/students'

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
