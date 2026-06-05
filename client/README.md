# Pro-Tasker Client

A modern, responsive React-based frontend for the Pro-Tasker project and task management application.

## Features

✨ **Component-Based Architecture** - Small, reusable functional components for maintainability and scalability

🎯 **State Management** - Local component state with `useState` and global state with Context API for authentication

🚀 **Client-Side Routing** - Single Page Application (SPA) experience using React Router with distinct pages for login, registration, dashboard, and project management

🔐 **API Integration** - Secure API communication with JWT authentication included in all requests

⚡ **User Experience** - Clear loading and error states for better user feedback

📱 **Responsive Design** - Fully responsive and mobile-first approach supporting desktop, tablet, and mobile devices

## Project Structure

```
client/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Auth/              # Login and Registration components
│   │   ├── Dashboard/         # Dashboard component
│   │   ├── Layout/            # Layout components (Navbar)
│   │   ├── Projects/          # Project management components
│   │   └── Pages/             # General pages (NotFound)
│   ├── context/
│   │   └── AuthContext.js     # Authentication context
│   ├── hooks/
│   │   └── useAuth.js         # Custom hook for using auth context
│   ├── services/
│   │   └── api.js             # API service with interceptors
│   ├── App.js                 # Main app component with routing
│   ├── index.js               # React entry point
│   └── index.css              # Global styles
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js 14+ and npm/yarn installed
- Backend API running on `http://localhost:3000`

### Step 1: Install Dependencies

```bash
cd client
npm install
```

### Step 2: Configure Environment

Create a `.env` file in the client directory:

```
REACT_APP_API_URL=http://localhost:3000/api
```

Or copy from the example:
```bash
cp .env.example .env
```

### Step 3: Start Development Server

```bash
npm start
```

The application will open at `http://localhost:3000`

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App (one-way operation)

## Key Components

### AuthContext
Manages global authentication state including login, registration, logout, and token management.

```javascript
const { user, isAuthenticated, login, register, logout } = useAuth();
```

### API Service
Axios instance with interceptors for:
- Adding JWT token to request headers
- Handling 401 responses (redirecting to login)
- Centralized error handling

### ProtectedRoute
HOC that wraps protected routes and redirects unauthenticated users to login.

### Components

**Authentication**
- `Login` - User login form
- `Register` - User registration form

**Dashboard**
- `Dashboard` - Shows recent projects and task statistics

**Projects**
- `ProjectList` - Lists all projects with search functionality
- `ProjectForm` - Create and edit projects
- `ProjectDetail` - View project details and manage tasks

**Layout**
- `Navbar` - Navigation bar with user menu (responsive mobile menu)

## Styling

Global styles are defined in `src/index.css` with:
- Responsive grid system
- Button utilities
- Form styling
- Card components
- Loading spinners
- Alert messages
- Flexbox utilities
- Mobile-first responsive design

## API Endpoints Used

The application integrates with the following backend endpoints:

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /projects` - List all projects
- `GET /projects/:id` - Get project details
- `POST /projects` - Create new project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project
- `GET /tasks?projectId=:id` - Get project tasks
- `POST /tasks` - Create task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## Mobile Responsiveness

The UI is designed mobile-first and includes:
- Responsive grid layouts
- Mobile-optimized navigation
- Touch-friendly button sizes
- Responsive typography
- Flexible forms

Breakpoints:
- Mobile: < 480px
- Tablet: 480px - 768px
- Desktop: > 768px

## State Management Flow

```
App
├── AuthProvider (Context)
│   ├── user
│   ├── isAuthenticated
│   ├── login()
│   ├── register()
│   └── logout()
└── ProtectedRoute
    └── Dashboard/Projects
        ├── Local state (useState)
        └── API calls via axios
```

## Error Handling

The application provides comprehensive error handling:
- API errors display in alert messages
- 401 responses trigger automatic logout
- Form validation with user feedback
- Network error handling

## Security

- JWT tokens stored in localStorage
- Tokens automatically added to API requests
- Protected routes prevent unauthorized access
- Token refreshed on page reload if valid

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Task filtering and sorting
- User profile management
- Project sharing and collaboration
- Real-time updates with WebSocket
- Dark mode theme
- Advanced project templates
- Task notifications
- Export functionality

## License

ISC

## Support

For issues or questions, please refer to the main Pro-Tasker repository.
