# QuickNotes - Full Stack Note Taking Application

QuickNotes is a modern note-taking application inspired by Google Keep, built with React, TypeScript, Django, and PostgreSQL.

## Features

- 🔐 Secure user authentication with JWT
- 📝 Create, read, update, and delete notes
- 📌 Pin important notes to the top
- 🎨 Customize note colors with a color picker
- 🔍 Instant search through notes
- 🌈 Beautiful UI with Shadcn components
- 📱 Fully responsive design
- ⚡ Fast and optimized with Vite
- 🎭 Type-safe development with TypeScript

## Tech Stack

### Frontend
- React 18 with TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- Shadcn UI components for beautiful UI elements
- Vite for fast development and build
- Axios for API requests
- Sonner Toast for notifications

### Backend
- Django 5.0+ with Django REST Framework
- PostgreSQL database (can be configured for any SQL Database)
- JWT authentication with PyJWT
- Django CORS headers for cross-origin requests
- Python-dotenv for environment management

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.8+)
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kc_globed_assignment
```

2. Frontend setup:
```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory with:
```env
VITE_API_URL=http://localhost:8000
```

3. Backend setup:
```bash
cd backend
python -m venv venv
.\venv\Scripts\activate    # On Windows
source venv/bin/activate  # On Unix/macOS
pip install -r requirements.txt
```

Create a `.env` file in the backend directory with:
```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

4. Database setup:
```bash
python manage.py migrate
```

### Running the Application

1. Start the backend server:
```bash
cd backend
python manage.py runserver
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   └── ui/        # Shadcn UI components
│   │   ├── context/       # React context providers
│   │   ├── lib/           # Utility functions and configs
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── store/         # Redux store configuration
│   │   │   └── slices/    # Redux slices
│   │   ├── styles/        # CSS and animation styles
│   │   └── types/         # TypeScript type definitions
│   ├── components.json     # Shadcn UI configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   └── vite.config.ts      # Vite configuration
└── backend/                # Django backend
    ├── config/            # Project configuration
    │   └── middleware/    # Custom middleware (JWT)
    ├── note/             # Notes application
    │   ├── migrations/   # Database migrations
    │   ├── models.py     # Data models
    │   ├── serializers.py # API serializers
    │   ├── urls.py       # URL routing
    │   └── views.py      # API views
    ├── manage.py         # Django management script
    └── requirements.txt  # Python dependencies
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/refresh-token` - Refresh JWT token

### Notes
- `GET /api/notes/` - List all user notes
- `POST /api/notes/` - Create a new note
- `GET /api/notes/{id}/` - Get a specific note
- `PUT /api/notes/{id}/` - Update a note
- `DELETE /api/notes/{id}/` - Delete a note
- `POST /api/notes/{id}/share` - Share a note with other users
- `GET /api/notes/search?q={query}` - Search notes

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.