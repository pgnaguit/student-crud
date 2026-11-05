import React from 'react'
import { Edit2, Trash2, UserX, Inbox } from 'lucide-react'

export default function StudentTable({
  students,
  isLoading,
  onEdit,
  onDelete,
  onOpenAddModal,
}) {
  if (isLoading) {
    return (
      <div className="table-card">
        <div className="table-state-box">
          <div className="spinner"></div>
          <p>Loading students from database...</p>
        </div>
      </div>
    )
  }

  if (students.length === 0) {
    return (
      <div className="table-card">
        <div className="table-state-box">
          <Inbox size={48} className="empty-icon" />
          <h3>No Students Found</h3>
          <p>There are no student records matching your query or registry is empty.</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onOpenAddModal}
            style={{ marginTop: '1rem' }}
          >
            Add New Student
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="table-card">
      <div className="table-responsive">
        <table className="student-table">
          <thead>
            <tr>
              <th style={{ width: '80px' }}>ID</th>
              <th>Student Name</th>
              <th>Course</th>
              <th>Section</th>
              <th style={{ width: '140px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const fullName = `${student.firstname || ''} ${student.lastname || ''}`.trim()
              const initials = `${student.firstname?.[0] || ''}${student.lastname?.[0] || ''}`.toUpperCase()

              return (
                <tr key={student.id}>
                  <td className="student-id">#{student.id}</td>
                  <td>
                    <div className="student-info-cell">
                      <div className="avatar">{initials || '?'}</div>
                      <div>
                        <div className="student-name">{fullName || 'Unnamed'}</div>
                        <div className="student-subtext">
                          {student.firstname} | {student.lastname}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-course">
                      {student.course || 'N/A'}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-section">
                      {student.section || 'N/A'}
                    </span>
                  </td>
                  <td>
                    <div className="actions-cell">
                      <button
                        type="button"
                        className="btn-action btn-action-edit"
                        title="Edit Student"
                        onClick={() => onEdit(student)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        type="button"
                        className="btn-action btn-action-delete"
                        title="Delete Student"
                        onClick={() => onDelete(student)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        Showing <strong>{students.length}</strong> {students.length === 1 ? 'record' : 'records'}
      </div>
    </div>
  )
}
