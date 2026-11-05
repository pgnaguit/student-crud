import React, { useState, useEffect } from 'react'
import { X, User, BookOpen, Layers } from 'lucide-react'

export default function StudentModal({
  isOpen,
  mode, // 'add' | 'edit'
  initialData,
  onClose,
  onSubmit,
  isSubmitting,
}) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    course: '',
    section: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        firstname: initialData.firstname || '',
        lastname: initialData.lastname || '',
        course: initialData.course || '',
        section: initialData.section || '',
      })
    } else {
      setFormData({
        firstname: '',
        lastname: '',
        course: '',
        section: '',
      })
    }
    setErrors({})
  }, [initialData, mode, isOpen])

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required'
    if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required'
    if (!formData.course.trim()) newErrors.course = 'Course is required'
    if (!formData.section.trim()) newErrors.section = 'Section is required'
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    onSubmit({
      firstname: formData.firstname.trim(),
      lastname: formData.lastname.trim(),
      course: formData.course.trim(),
      section: formData.section.trim(),
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {mode === 'edit' ? `Edit Student (#${initialData?.id})` : 'Add New Student'}
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstname" className="form-label">
                  First Name <span className="required-star">*</span>
                </label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    className={`form-input ${errors.firstname ? 'input-error' : ''}`}
                    placeholder="e.g. John"
                    value={formData.firstname}
                    onChange={handleChange}
                    autoFocus
                  />
                </div>
                {errors.firstname && (
                  <span className="error-message">{errors.firstname}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastname" className="form-label">
                  Last Name <span className="required-star">*</span>
                </label>
                <div className="input-with-icon">
                  <User size={16} className="input-icon" />
                  <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    className={`form-input ${errors.lastname ? 'input-error' : ''}`}
                    placeholder="e.g. Doe"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </div>
                {errors.lastname && (
                  <span className="error-message">{errors.lastname}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="course" className="form-label">
                  Course / Program <span className="required-star">*</span>
                </label>
                <div className="input-with-icon">
                  <BookOpen size={16} className="input-icon" />
                  <input
                    id="course"
                    name="course"
                    type="text"
                    className={`form-input ${errors.course ? 'input-error' : ''}`}
                    placeholder="e.g. BSIT, BSCS, BSIS"
                    value={formData.course}
                    onChange={handleChange}
                  />
                </div>
                {errors.course && (
                  <span className="error-message">{errors.course}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="section" className="form-label">
                  Section <span className="required-star">*</span>
                </label>
                <div className="input-with-icon">
                  <Layers size={16} className="input-icon" />
                  <input
                    id="section"
                    name="section"
                    type="text"
                    className={`form-input ${errors.section ? 'input-error' : ''}`}
                    placeholder="e.g. 3A, 4B"
                    value={formData.section}
                    onChange={handleChange}
                  />
                </div>
                {errors.section && (
                  <span className="error-message">{errors.section}</span>
                )}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Saving...</span>
              ) : mode === 'edit' ? (
                'Save Changes'
              ) : (
                'Create Student'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
