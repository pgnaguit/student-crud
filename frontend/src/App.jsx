import React, { useState, useEffect, useMemo } from 'react'
import studentService from './api/studentService'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import StudentTable from './components/StudentTable'
import StudentModal from './components/StudentModal'
import DeleteConfirmModal from './components/DeleteConfirmModal'
import Toast from './components/Toast'
import { AlertCircle, RefreshCw } from 'lucide-react'
import './App.css'

export default function App() {
  const [students, setStudents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Filters & search
  const [searchTerm, setSearchTerm] = useState('')
  const [courseFilter, setCourseFilter] = useState('')

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState('add') // 'add' | 'edit'
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Delete modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [studentToDelete, setStudentToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  // Toast notification
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  // Load students from API
  const fetchStudents = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await studentService.getAll()
      // Spring Boot might return an array or Iterable
      const list = Array.isArray(data) ? data : []
      setStudents(list)
    } catch (err) {
      console.error('Failed to fetch students:', err)
      const message =
        err.response?.data?.message ||
        err.message ||
        'Unable to connect to the Student API backend (http://localhost:8080).'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  // Extract unique courses for filter dropdown
  const courses = useMemo(() => {
    const set = new Set()
    students.forEach((s) => {
      if (s.course && s.course.trim()) {
        set.add(s.course.trim())
      }
    })
    return Array.from(set).sort()
  }, [students])

  // Filter students based on searchTerm and courseFilter
  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const query = searchTerm.toLowerCase().trim()
      const matchesSearch =
        !query ||
        String(student.id).includes(query) ||
        (student.firstname && student.firstname.toLowerCase().includes(query)) ||
        (student.lastname && student.lastname.toLowerCase().includes(query)) ||
        (student.course && student.course.toLowerCase().includes(query)) ||
        (student.section && student.section.toLowerCase().includes(query))

      const matchesCourse =
        !courseFilter || (student.course && student.course.trim() === courseFilter)

      return matchesSearch && matchesCourse
    })
  }, [students, searchTerm, courseFilter])

  // Open modal for adding
  const handleOpenAddModal = () => {
    setSelectedStudent(null)
    setModalMode('add')
    setIsModalOpen(true)
  }

  // Open modal for editing
  const handleOpenEditModal = (student) => {
    setSelectedStudent(student)
    setModalMode('edit')
    setIsModalOpen(true)
  }

  // Submit Add or Edit
  const handleModalSubmit = async (formData) => {
    setIsSubmitting(true)
    try {
      if (modalMode === 'add') {
        const created = await studentService.create(formData)
        setStudents((prev) => [...prev, created])
        showToast(
          `Student "${created.firstname} ${created.lastname}" created successfully!`,
          'success'
        )
      } else {
        const updated = await studentService.update(selectedStudent.id, formData)
        setStudents((prev) =>
          prev.map((s) => (s.id === selectedStudent.id ? updated : s))
        )
        showToast(
          `Student "${updated.firstname} ${updated.lastname}" updated successfully!`,
          'success'
        )
      }
      setIsModalOpen(false)
    } catch (err) {
      console.error('Error saving student:', err)
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Failed to save student details.'
      showToast(msg, 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Open Delete confirmation
  const handleOpenDeleteModal = (student) => {
    setStudentToDelete(student)
    setIsDeleteModalOpen(true)
  }

  // Confirm delete
  const handleDeleteConfirm = async () => {
    if (!studentToDelete) return
    setIsDeleting(true)
    try {
      await studentService.delete(studentToDelete.id)
      setStudents((prev) => prev.filter((s) => s.id !== studentToDelete.id))
      showToast(
        `Student "${studentToDelete.firstname} ${studentToDelete.lastname}" deleted successfully.`,
        'success'
      )
      setIsDeleteModalOpen(false)
      setStudentToDelete(null)
    } catch (err) {
      console.error('Error deleting student:', err)
      const msg =
        err.response?.data ||
        err.message ||
        'Failed to delete student.'
      showToast(typeof msg === 'string' ? msg : 'Failed to delete student', 'error')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="app-container">
      <Navbar
        studentCount={students.length}
        onOpenAddModal={handleOpenAddModal}
      />

      <main className="main-content">
        {error && (
          <div className="error-banner">
            <AlertCircle size={20} className="error-icon" />
            <div className="error-content">
              <strong>Connection Notice:</strong> {error}
              <p style={{ marginTop: '0.25rem', fontSize: '0.85rem', color: '#64748b' }}>
                Ensure your Spring Boot backend is running on <code>http://localhost:8080</code>.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={fetchStudents}
              style={{ marginLeft: 'auto' }}
            >
              <RefreshCw size={14} /> Retry
            </button>
          </div>
        )}

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          courseFilter={courseFilter}
          setCourseFilter={setCourseFilter}
          courses={courses}
          onRefresh={fetchStudents}
          isLoading={isLoading}
        />

        <StudentTable
          students={filteredStudents}
          isLoading={isLoading}
          onEdit={handleOpenEditModal}
          onDelete={handleOpenDeleteModal}
          onOpenAddModal={handleOpenAddModal}
        />
      </main>

      {/* Add / Edit Modal */}
      <StudentModal
        isOpen={isModalOpen}
        mode={modalMode}
        initialData={selectedStudent}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        student={studentToDelete}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
      />

      {/* Floating Notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  )
}
