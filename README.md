# 🚀 Tour App - DevOps Practice Project

A **DevOps learning project** featuring a full-stack tour booking application with **comprehensive CI/CD pipelines**, **containerization**, **orchestration**, and **multi-environment deployments**. Perfect for practicing modern DevOps tools and practices!

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-blue)](https://kubernetes.io)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-brightgreen)](https://github.com/features/actions)
[![Node.js](https://img.shields.io/badge/Node.js-v20-green)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791)](https://www.postgresql.org)

---

## 🎯 DevOps Learning Objectives

This project demonstrates:

- 🐳 **Container Management** - Docker & Docker Compose multi-container orchestration
- 🔄 **CI/CD Pipelines** - GitHub Actions, GitLab CI, Jenkins automation
- ☸️ **Kubernetes Deployment** - K8s manifests, helm charts, scaling
- 📦 **Infrastructure as Code** - Terraform, Docker Compose, Kubernetes YAML
- 🔐 **Security & Secrets** - Environment management, credential handling
- 📊 **Monitoring & Logging** - Prometheus, Grafana, ELK stack integration
- 🚀 **Multi-Environment Deployments** - Dev, staging, production
- 🔧 **Configuration Management** - Environment-specific configs
- 📈 **Load Balancing** - Nginx, reverse proxy, traffic routing
- 🔍 **Database Management** - PostgreSQL backup, migration, optimization
- 🚢 **Blue-Green Deployment** - Zero-downtime updates
- 🛡️ **SSL/TLS** - HTTPS, certificate management

---

## ✨ Application Features

- 🔐 **User Authentication** - Session-based auth with PostgreSQL store
- 🎫 **Tour Management** - Booking system with database persistence
- 🎨 **Modern UI** - React frontend with responsive design
- 📱 **API-First** - RESTful backend with TypeScript validation

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

## � CI/CD Pipelines

This project includes multiple CI/CD implementations for DevOps practice:

### GitHub Actions Pipeline

**File**: `.github/workflows/ci-cd.yml`

Features:
- ✅ Build and push Docker images
- ✅ Run automated tests
- ✅ Security scanning
- ✅ Deploy to multiple environments
- ✅ Database migrations

```yaml
# Triggers on push to main/develop
# Tests on all PRs
# Auto-deploys to staging on develop
# Manual deploy to production
```

### GitLab CI Pipeline

**File**: `.gitlab-ci.yml`

Stages:
- `build` - Build Docker images
- `test` - Run unit/integration tests
- `security` - Scan for vulnerabilities
- `deploy_staging` - Deploy to staging
- `deploy_prod` - Manual production deploy

### Jenkins Pipeline

**File**: `Jenkinsfile`

Declarative pipeline with:
- Docker agent
- Parallel test execution
- Artifact archiving
- Deploy approval stage

---

## 🐳 Docker & Container Orchestration

### Docker Compose (Development)

```bash
docker compose up -d --build
```

Services:
- Frontend (Nginx)
- Backend (Express.js)
- PostgreSQL database
- Network bridge

### Kubernetes (Production)

**Files**: `k8s/` directory

Includes:
- Deployment manifests
- Service definitions
- ConfigMap & Secrets
- Ingress configuration
- StatefulSet for database
- PersistentVolumes

Deploy to K8s:
```bash
kubectl apply -f k8s/

# Or using Helm
helm install tour-app ./helm-chart
```

---

## 🚀 Deployment Options

### 1. Docker Compose (Development/Staging)
```bash
docker compose -f docker-compose.prod.yml up -d
```

### 2. Kubernetes (Production)
```bash
# Apply manifests
kubectl apply -f k8s/

# Scale replicas
kubectl scale deployment tour-app-backend --replicas=3

# Check status
kubectl get deployments
kubectl logs -f deployment/tour-app-backend
```

### 3. AWS (ECS/Fargate)
**Files**: `deploy/aws/`
- Task definitions
- CloudFormation templates
- ELB configuration

### 4. Google Cloud (GKE)
**Files**: `deploy/gcp/`
- GKE cluster config
- Cloud SQL proxy
- Cloud Storage setup

### 5. Azure (AKS)
**Files**: `deploy/azure/`
- AKS manifests
- Azure Database for PostgreSQL
- Application Gateway setup

### 6. DigitalOcean
**Files**: `deploy/digitalocean/`
- DOKS manifests
- App Platform config

---

## 📊 Monitoring & Observability

### Prometheus Monitoring

**Files**: `monitoring/prometheus.yml`

Metrics collected:
- Application metrics (requests, latency)
- Container metrics (CPU, memory)
- Database metrics (connections, queries)

### Grafana Dashboards

**Files**: `monitoring/grafana/dashboards/`

Pre-built dashboards:
- Application performance
- Infrastructure metrics
- Database performance
- Error rates

### ELK Stack (Logging)

**Files**: `logging/`

Setup:
- Elasticsearch for log storage
- Logstash for log processing
- Kibana for visualization

### Application Logging

- Winston logger in backend
- Structured JSON logs
- Log aggregation ready

---

## 🔐 Security & Secrets Management

### Environment Secrets

```bash
# Using GitHub Secrets
- DATABASE_URL
- SESSION_SECRET
- API_KEYS
```

### Secret Management Tools

- **Sealed Secrets** - Kubernetes secret encryption
- **HashiCorp Vault** - Centralized secrets
- **AWS Secrets Manager** - AWS native
- **GitHub Secrets** - Built-in for Actions

### SSL/TLS Configuration

- Let's Encrypt automation
- Certificate renewal
- HTTPS enforcement

---

## 📝 Infrastructure as Code

### Docker Compose

```bash
# Development
docker compose up -d

# Production
docker compose -f docker-compose.prod.yml up -d
```

### Kubernetes Manifests

```bash
# Apply all manifests
kubectl apply -f k8s/

# Or individual resources
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
```

### Helm Charts

```bash
# Install
helm install tour-app ./helm-chart

# Upgrade
helm upgrade tour-app ./helm-chart

# Rollback
helm rollback tour-app
```

### Terraform (AWS/GCP/Azure)

**Files**: `terraform/`

```bash
terraform init
terraform plan
terraform apply
```

Manages:
- Compute instances
- Networks
- Databases
- Load balancers
- CDN

---

## 🧪 Testing & Quality Assurance

### Automated Tests in CI/CD

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Code coverage
npm run coverage

# Security scan
npm run security-check

# Lint check
npm run lint
```

### Test Coverage Requirements

- Minimum 80% coverage for PR merge
- Automated code quality checks
- Dependency vulnerability scanning

---

## 📈 Performance & Scalability

### Load Testing

```bash
# Using k6
k6 run performance-tests/load-test.js

# Using Apache Bench
ab -n 10000 -c 100 http://localhost/api/tours
```

### Auto-Scaling

**Kubernetes HPA**:
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: tour-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: tour-app-backend
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

---

## 🔄 GitOps Workflow

### Continuous Deployment

1. Push to main branch
2. GitHub Actions triggers
3. Tests run automatically
4. Docker image built & pushed
5. K8s manifests updated
6. ArgoCD detects changes
7. Auto-deploy to cluster

### Manual Approval (Production)

1. Create PR
2. Reviews required
3. Tests must pass
4. Deploy approval needed
5. ArgoCD syncs changes

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
