# Tour Package Web Application

A complete DevOps practice project featuring a full-stack React + Node.js application.

## Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Shadcn UI
- **Backend:** Node.js, Express, Passport.js (Session Auth)
- **Database:** PostgreSQL (with Drizzle ORM)
- **DevOps:** Docker, Docker Compose

## Features

- **Authentication:** Register and Login securely.
- **Tours:** Browse available tour packages with details.
- **Protected Routes:** User-specific features.
- **Seeding:** Automatic data seeding on startup.

## Local Development

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Setup Database:**
   Ensure you have a PostgreSQL database. In Replit, use the database tool to provision one.
   Push schema:
   ```bash
   npm run db:push
   ```

3. **Run Application:**
   ```bash
   npm run dev
   ```

## Docker Deployment

To run the application using Docker Compose:

1. **Build and Start:**
   ```bash
   docker-compose up --build
   ```

2. **Access:**
   - Frontend: http://localhost:80
   - Backend: http://localhost:5000
   - Database: localhost:5432

## API Endpoints

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Log in
- `POST /api/auth/logout` - Log out
- `GET /api/user` - Get current user
- `GET /api/tours` - List all tours
- `GET /api/tours/:id` - Get tour details

## Health Check
- Backend health check can be added at `/health` (implemented in `server/routes.ts` or `index.ts` if needed).

