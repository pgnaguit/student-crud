# Student CRUD Frontend (Vite + React)

A modern, responsive React frontend for the Student CRUD Spring Boot API.

## Features
- **Full CRUD Capabilities:**
  - View all students with live search and course filtering
  - Add new students with field validation (`firstname`, `lastname`, `course`, `section`)
  - Edit existing student details (`PUT /naguit/students/{id}`)
  - Delete students with confirmation dialog (`DELETE /naguit/students/{id}`)
- **Backend API Integration:**
  - Configured with Vite dev-server proxy targeting `http://localhost:8080/naguit/students`
  - Fallback error notification with retry button if Spring Boot backend is down
  - Toast feedback for operations (Created, Updated, Deleted)

## Getting Started

### 1. Ensure Backend is Running
Run the Spring Boot application (by default on port `8080`):
```powershell
cd ..\student
.\mvnw.cmd spring-boot:run
```

### 2. Run the Vite Frontend
From this `frontend` directory:
```powershell
npm run dev
```
Open your browser at `http://localhost:5173`.
