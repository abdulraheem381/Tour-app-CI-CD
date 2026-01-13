# 🌍 Tour App

A modern full-stack tour booking application built with **Express.js**, **React**, **PostgreSQL**, and **Docker**. Book exciting tours from around the world with ease!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v20-green)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791)](https://www.postgresql.org)

---

## ✨ Features

- 🔐 **User Authentication** - Secure registration and login with session-based authentication
- 🎫 **Tour Browsing** - Browse and view detailed information about available tours
- 📅 **Tour Booking** - Book tours and manage your reservations
- 👤 **User Profiles** - Manage your account and booking history
- 🎨 **Modern UI** - Beautiful, responsive interface built with React and Tailwind CSS
- 🔒 **Password Security** - Scrypt-based password hashing with cryptographic salt
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices

---

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for fast build and development
- TanStack React Query for data fetching and caching
- Tailwind CSS + Radix UI for styling
- React Hook Form for form management

**Backend:**
- Express.js with TypeScript
- Passport.js for authentication
- Drizzle ORM for database management
- PostgreSQL for data persistence
- Express-session with PostgreSQL store

**Infrastructure:**
- Docker & Docker Compose for containerization
- Nginx Alpine for reverse proxy
- PostgreSQL 15 Alpine database

### Project Structure

```
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility libraries
│   │   └── index.css      # Global styles
│   ├── Dockerfile         # Frontend container
│   └── nginx.conf         # Nginx proxy config
├── server/                # Express Backend
│   ├── index.ts           # Main server entry
│   ├── routes.ts          # API route definitions
│   ├── auth.ts            # Authentication setup
│   ├── db.ts              # Database connection
│   ├── storage.ts         # Data access layer
│   └── Dockerfile         # Backend container
├── shared/                # Shared types and schemas
│   ├── schema.ts          # Zod validation schemas
│   └── routes.ts          # Route definitions
├── script/                # Build scripts
├── docker-compose.yml     # Docker compose configuration
└── package.json           # Dependencies
```

---

## 🚀 Quick Start

### Prerequisites

- Docker & Docker Compose
- Node.js v20+ (for local development)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tour-app.git
   cd tour-app
   ```

2. **Set up environment variables**
   ```bash
   # Create a .env file in the root directory
   echo "DATABASE_URL=postgres://postgres:postgres@postgres:5432/tours" > .env
   echo "SESSION_SECRET=your-super-secret-session-key" >> .env
   ```

3. **Start with Docker Compose**
   ```bash
   docker compose up -d --build
   ```

4. **Access the application**
   - Frontend: `http://localhost`
   - Backend API: `http://localhost/api`
   - Database: `localhost:5432`

### Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up database**
   ```bash
   npm run db:push
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

---

## 📝 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create a new user account |
| POST | `/api/auth/login` | Authenticate user and start session |
| POST | `/api/auth/logout` | End user session |
| GET | `/api/user` | Get current authenticated user |

### Tours

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tours` | List all available tours |
| GET | `/api/tours/:id` | Get tour details |

### Bookings

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/bookings` | Create a new booking |
| GET | `/api/bookings` | Get user's bookings |
| DELETE | `/api/bookings/:id` | Cancel a booking |

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgres://postgres:postgres@postgres:5432/tours

# Session
SESSION_SECRET=change-this-to-a-random-secure-string

# Server
NODE_ENV=production
PORT=5000

# Frontend
VITE_API_URL=http://localhost/api
```

---

## 🐳 Docker Setup

### Using Docker Compose (Recommended)

```bash
# Build and start all services
docker compose up -d --build

# View logs
docker compose logs -f backend

# Stop services
docker compose down

# Clean up (remove volumes)
docker compose down -v
```

### Services

1. **Frontend** (Nginx on port 80)
   - Serves React SPA
   - Proxies `/api` requests to backend

2. **Backend** (Express on port 5000)
   - REST API server
   - Session management

3. **Database** (PostgreSQL on port 5432)
   - Data persistence
   - Session store

---

## 🔐 Authentication Flow

1. User registers with username, email, and password
2. Password is hashed using scrypt with cryptographic salt
3. User is created in database
4. Session is established via express-session
5. Session data stored in PostgreSQL
6. Session cookie sent to client (HttpOnly, Secure)
7. Subsequent requests include session cookie for authentication

---

## 🧪 Testing

### Test User Credentials (Pre-seeded)

```
Username: johndoe
Password: SecurePass123
Email: john@example.com
```

### API Testing with cURL

```bash
# Register a new user
curl -X POST http://localhost/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"Test@1234","email":"test@example.com"}'

# Login
curl -X POST http://localhost/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"johndoe","password":"SecurePass123"}' \
  -c cookies.txt

# Get tours
curl -X GET http://localhost/api/tours

# Get current user (with session)
curl -X GET http://localhost/api/user \
  -b cookies.txt
```

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'USER',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tours Table
```sql
CREATE TABLE tours (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration INT,
  destination VARCHAR(255),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Bookings Table
```sql
CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id),
  tour_id INT NOT NULL REFERENCES tours(id),
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  travel_date DATE,
  status VARCHAR(50) DEFAULT 'CONFIRMED'
);
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in docker-compose.yml or kill existing process
netstat -ano | findstr :80
taskkill /PID <PID> /F
```

### Database Connection Error
```bash
# Verify PostgreSQL is running
docker compose logs postgres

# Reset database
docker compose down -v
docker compose up -d --build
```

### Session Issues
- Clear browser cookies: DevTools → Application → Cookies → Clear
- Ensure `credentials: "include"` in fetch requests
- Check session table exists: `\dt session` in psql

### Build Issues
```bash
# Clean Docker build cache
docker system prune -a
docker compose up -d --build
```

---

## 📦 Project Dependencies

### Key Dependencies
- `express` - Web framework
- `passport` - Authentication middleware
- `drizzle-orm` - Database ORM
- `pg` - PostgreSQL client
- `express-session` - Session management
- `zod` - Schema validation
- `react` - UI library
- `react-query` - Data fetching
- `tailwindcss` - CSS framework
- `vite` - Build tool

See `package.json` for complete dependency list.

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

Built with ❤️ as a modern full-stack web application.

---

## 📞 Support

For support, email support@tourapp.dev or open an issue on GitHub.

---

## 🗺️ Roadmap

- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Advanced tour filters
- [ ] User reviews and ratings
- [ ] Tour guide profiles
- [ ] Booking management dashboard
- [ ] Admin panel for tour management
- [ ] Real-time notifications

---

**Happy touring! 🧳✈️**
