# HRMS Lite

A lightweight Human Resource Management System for managing employees and their attendance.

## Features

- **Employee Management**: Add, view, and delete employees
- **Attendance Tracking**: Mark daily attendance and view records

## Tech Stack

- **Frontend**: React.js
- **Backend**: FastAPI (Python)
- **Database**: SQLite

## Setup Instructions

### Prerequisites

- Node.js and npm
- Python 3.8+

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows: `venv\Scripts\activate`
   - On macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Run the backend server:
   ```
   uvicorn main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## Usage

1. Open the application in your browser (usually at http://localhost:3000)
2. Use the navigation to switch between Employee and Attendance management
3. Add employees, mark attendance, and view records

## Deployment

- Frontend: Deploy to Vercel or Netlify
- Backend: Deploy to Render or Railway

## Assumptions

- Single admin user, no authentication required
- Data is stored locally in SQLite database
- No advanced HR features like payroll or leave management

## Limitations

- No user authentication
- Basic UI without advanced styling
- SQLite database (not suitable for production scaling)
