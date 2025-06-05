# QuickNotes - Full Stack Note Taking Application

QuickNotes is a modern note-taking application inspired by Google Keep, built with React, TypeScript, Django, and PostgreSQL.

## Features

- 🔐 User authentication (login/register)
- 📝 Create, read, update, and delete notes
- 📌 Pin important notes
- 🎨 Customize note colors
- 🔍 Search through notes
- 🔄 Real-time updates
- 📱 Responsive design

## Tech Stack

### Frontend
- React with TypeScript
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Shadcn UI components
- Vite for build tooling

### Backend
- Django REST Framework
- PostgreSQL database
- JWT authentication
- CORS support

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.8+)
- PostgreSQL

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
cp .env.example .env
# Update .env with your configuration
```

3. Backend setup:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Update .env with your configuration
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
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── store/         # Redux store
│   │   ├── types/         # TypeScript types
│   │   └── styles/        # CSS styles
│   └── ...
└── backend/               # Django backend
    ├── config/           # Project configuration
    ├── note/            # Notes app
    └── ...
```

## API Endpoints

- `POST /api/login` - User login
- `POST /api/register` - User registration
- `GET /api/refreshLogin` - Refresh user session
- `GET /api/notes` - List all notes
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.