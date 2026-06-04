# TaskMaster Capstone API Plan

This project reuses the TaskMaster backend idea as the starting point for a capstone task-management system. The original TaskMaster scope handled basic task tracking; this capstone expands it into a project-based productivity API with users, projects, assignment, filtering, and future collaboration features.

## Current Setup

- Runtime: Node.js
- Database: MongoDB when `MONGODB_URI` is available
- Local fallback: in-memory data so the server can run without MongoDB during early development
- Entry point: `server.js`

## Scripts

```bash
npm start
npm run dev
npm test
```

`npm test` currently runs a Node syntax check on `server.js`.

## Environment Variables

| Name | Default | Purpose |
| --- | --- | --- |
| `PORT` | `3000` | API server port |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017` | MongoDB connection string |
| `DB_NAME` | `taskmaster_capstone` | MongoDB database name |

## Data Models

### User

```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "member",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

### Project

```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "ownerId": "string",
  "memberIds": ["string"],
  "status": "active",
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

### Task

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "status": "todo",
  "priority": "medium",
  "dueDate": "ISO date or null",
  "projectId": "string or null",
  "ownerId": "string or null",
  "assigneeId": "string or null",
  "tags": ["string"],
  "createdAt": "ISO date",
  "updatedAt": "ISO date"
}
```

## Implemented API Endpoints

Base URL for local development:

```text
http://localhost:3000
```

### Health

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Confirms the API is running and reports whether it is using MongoDB or memory storage. |

### Authentication

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Creates a user account. Requires `name`, `email`, and `password`. |
| `POST` | `/api/auth/login` | Logs in an existing user. Requires `email` and `password`. |

The starter API returns the user id as a simple development token. The production capstone version should replace this with signed JWT authentication.

### Projects

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/projects` | Lists all projects. |
| `POST` | `/api/projects` | Creates a project. Requires `name`. |
| `PATCH` | `/api/projects/:id` | Updates part of a project. |
| `PUT` | `/api/projects/:id` | Replaces editable project fields. |
| `DELETE` | `/api/projects/:id` | Deletes a project. |

### Tasks

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/tasks` | Lists tasks. Supports `status`, `priority`, and `projectId` query filters. |
| `GET` | `/api/tasks/:id` | Gets one task by id. |
| `POST` | `/api/tasks` | Creates a task. Requires `title`. |
| `PATCH` | `/api/tasks/:id` | Updates part of a task, such as status or priority. |
| `PUT` | `/api/tasks/:id` | Replaces editable task fields. |
| `DELETE` | `/api/tasks/:id` | Deletes a task. |

Example task request:

```json
{
  "title": "Build capstone API plan",
  "description": "Document endpoints in README.md",
  "status": "todo",
  "priority": "high",
  "dueDate": "2026-06-10",
  "tags": ["capstone", "backend"]
}
```

## Planned Capstone Features

These features extend the original TaskMaster idea into a fuller capstone project.

| Feature | Purpose | Planned Endpoint Design |
| --- | --- | --- |
| JWT sessions | Protect user-specific project and task data. | `POST /api/auth/logout`, `GET /api/auth/me` |
| User-owned dashboards | Show each user their assigned tasks, overdue work, and project activity. | `GET /api/dashboard` |
| Team membership | Invite users to projects and manage roles. | `POST /api/projects/:id/members`, `DELETE /api/projects/:id/members/:userId` |
| Comments | Allow discussion on tasks. | `GET /api/tasks/:id/comments`, `POST /api/tasks/:id/comments`, `DELETE /api/comments/:id` |
| Task history | Track status, priority, and assignee changes. | `GET /api/tasks/:id/activity` |
| File links | Attach reference links or uploaded files to tasks. | `POST /api/tasks/:id/attachments`, `DELETE /api/attachments/:id` |
| Notifications | Alert users about assignments and upcoming due dates. | `GET /api/notifications`, `PATCH /api/notifications/:id/read` |
| Search | Search task titles, descriptions, projects, and tags. | `GET /api/search?q=term` |
| Analytics | Summarize completion rates and workload by project. | `GET /api/reports/project/:id`, `GET /api/reports/user/:id` |

## API Design Notes

- All endpoints return JSON.
- Successful create requests return `201`.
- Validation errors return `400`.
- Missing records return `404`.
- Duplicate accounts return `409`.
- Protected future endpoints should require an `Authorization: Bearer <token>` header.
- Current development endpoints also accept `X-User-Id` to associate created tasks or projects with a user.

## Next Development Steps

1. Replace the development token with signed JWT authentication.
2. Split `server.js` into routes, controllers, and data-access modules.
3. Add request validation for allowed task statuses and priorities.
4. Add automated endpoint tests.
5. Connect the frontend capstone UI to the documented API.
