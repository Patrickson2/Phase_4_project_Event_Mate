# EventMate - Event Management App

Full-stack event management application with React + FastAPI.

## Project Setup and Issues Resolved

This project encountered several setup and configuration issues during development. Below is a summary of the problems faced and solutions implemented.

### Backend Setup Issues

- **Virtual Environment**: Initially attempted to install packages system-wide, which failed due to externally managed environment. Solution: Created Python virtual environment using `python3 -m venv venv`.
- **Missing Environment Configuration**: Backend required `.env` file with database URL and secret key. Solution: Created `backend/.env` with SQLite database configuration.
- **Port Conflicts**: Default port 8000 was in use. Solution: Configured backend to run on port 8001.
- **CORS Configuration**: Frontend requests were blocked by CORS policy. Solution: Updated CORS middleware to allow requests from `http://localhost:5178` with credentials.

### Frontend Setup Issues

- **API Connection**: Frontend was configured to connect to wrong backend port. Solution: Updated API base URL from `http://localhost:8000` to `http://localhost:8001`.
- **Layout Problems**: Footer was not sticking to bottom of page. Solution: Added flexbox styling to ensure proper layout structure.

### Database Issues

- **Empty Database**: Initial database was empty, preventing user registration. Solution: Recreated database and populated with seed data including test users and sample events.

### File Organization

- **Unnecessary Files**: Project contained multiple documentation files not needed for production. Solution: Removed setup guides and workflow documents, keeping only essential README.

## Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- Git

### Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python seed_data.py  # Populate database with sample data
./venv/bin/uvicorn app.main:app --reload --port 8001
```

→ Backend API: http://localhost:8001
→ API Documentation: http://localhost:8001/docs

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

→ Frontend App: http://localhost:5178

## Features

- JWT Authentication
- Create/Join Events
- Leave Reviews
- Custom Black & Grey CSS

## Test in Postman

**Sample Login Credentials:**

- Email: `john@example.com` | Password: `pass123`
- Email: `jane@example.com` | Password: `pass123`
- Email: `mike@example.com` | Password: `pass123`

**Register:**

```
POST http://localhost:8001/auth/register
{"name": "John", "email": "john@test.com", "password": "pass123"}
```

**Login:**

```
POST http://localhost:8001/auth/login
{"email": "john@test.com", "password": "pass123"}
```

**Create Event (use token):**

```
POST http://localhost:8001/events
Authorization: Bearer YOUR_TOKEN
{
  "title": "Tech Meetup",
  "description": "Great event",
  "location": "SF",
  "datetime": "2024-12-31T18:00:00"
}
```

## Structure

```
EventMate/
├── backend/
│   ├── app/
│   │   ├── models/      # User, Event, Participation, Review
│   │   ├── routers/     # API endpoints
│   │   ├── schemas/     # Pydantic models
│   │   ├── utils/       # Auth helpers
│   │   ├── config.py
│   │   ├── database.py
│   │   └── main.py
│   ├── .env
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/  # Navbar, Footer, ProtectedRoute
    │   ├── context/     # AuthContext
    │   ├── pages/       # All pages
    │   ├── services/    # API calls
    │   ├── styles/      # Custom CSS
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── package.json
```

## Routes

- `/` - Home
- `/login` - Login
- `/register` - Register
- `/forgot-password` - Reset password
- `/events` - Browse events
- `/events/:id` - Event details (Protected)
- `/dashboard` - Dashboard (Protected)
- `/my-events` - My events (Protected)
- `/profile` - Profile (Protected)

## API Endpoints

- `POST /auth/register` - Register
- `POST /auth/login` - Login
- `GET /auth/me` - Get user (Protected)
- `GET /events` - Get all events
- `POST /events` - Create event (Protected)
- `GET /events/{id}` - Get event
- `PATCH /events/{id}` - Update event (Protected)
- `DELETE /events/{id}` - Delete event (Protected)
- `POST /participation` - Join event (Protected)
- `PATCH /participation/{id}` - Update participation (Protected)
- `POST /reviews` - Create review (Protected)
- `GET /reviews/{event_id}` - Get reviews
- `DELETE /reviews/{id}` - Delete review (Protected)
