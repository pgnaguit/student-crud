import React from 'react'
import { GraduationCap, UserPlus } from 'lucide-react'

export default function Navbar({ studentCount, onOpenAddModal }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="navbar-icon-wrapper">
            <GraduationCap className="navbar-icon" size={28} />
          </div>
          <div>
            <h1 className="navbar-title">Student Registry</h1>
            <p className="navbar-subtitle">Full-Stack Spring Boot & React CRUD</p>
          </div>
        </div>

        <div className="navbar-actions">
          <div className="student-badge">
            <span className="badge-dot"></span>
            <span>{studentCount} {studentCount === 1 ? 'Student' : 'Students'}</span>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onOpenAddModal}
          >
            <UserPlus size={18} />
            <span>Add Student</span>
          </button>
        </div>
      </div>
    </header>
  )
}
