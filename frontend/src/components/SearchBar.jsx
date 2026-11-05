import React from 'react'
import { Search, X, RotateCcw } from 'lucide-react'

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  courseFilter,
  setCourseFilter,
  courses,
  onRefresh,
  isLoading,
}) {
  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Search by name, course, section, or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => setSearchTerm('')}
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="filter-controls">
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="course-select"
        >
          <option value="">All Courses</option>
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={onRefresh}
          className="btn btn-secondary btn-icon-only"
          title="Refresh List"
          disabled={isLoading}
        >
          <RotateCcw size={18} className={isLoading ? 'spin' : ''} />
        </button>
      </div>
    </div>
  )
}
