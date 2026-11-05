import React from 'react'
import { AlertTriangle, X } from 'lucide-react'

export default function DeleteConfirmModal({
  isOpen,
  student,
  onClose,
  onConfirm,
  isDeleting,
}) {
  if (!isOpen || !student) return null

  const fullName = `${student.firstname || ''} ${student.lastname || ''}`.trim()

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog modal-dialog-sm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-with-icon danger-text">
            <AlertTriangle size={22} />
            <span>Confirm Deletion</span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p>
            Are you sure you want to delete student <strong>"{fullName}"</strong> (ID: #{student.id})?
          </p>
          <p className="danger-subtext">
            This action cannot be undone and will permanently remove the record from the database.
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete Student'}
          </button>
        </div>
      </div>
    </div>
  )
}
