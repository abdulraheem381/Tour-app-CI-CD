# Contributing to Tour App

Thank you for your interest in contributing to Tour App! We welcome contributions from the community. This document provides guidelines and instructions for contributing.

## 📋 Code of Conduct

Please be respectful and constructive in all interactions with other contributors and maintainers.

## 🐛 Reporting Bugs

Found a bug? Please report it by creating a GitHub Issue with:

1. **Title**: Clear, descriptive title
2. **Description**: What is the bug?
3. **Steps to Reproduce**: How to reproduce the issue
4. **Expected Behavior**: What should happen
5. **Actual Behavior**: What actually happens
6. **Environment**: 
   - OS (Windows/Mac/Linux)
   - Node.js version
   - Docker version

Example:
```
Title: Registration fails with duplicate username error

Steps:
1. Navigate to /register
2. Enter username "testuser"
3. Click submit
4. Error: "This username already exists" (but it's new)
```

## 💡 Suggesting Features

Have a feature idea? Create an issue with:

1. **Title**: Feature name
2. **Description**: What problem does it solve?
3. **Proposed Solution**: How should it work?
4. **Alternatives**: Any alternatives considered?

## 🔧 Development Setup

### Prerequisites
- Node.js v20+
- Docker & Docker Compose
- Git

### Local Setup

1. **Fork and clone the repository**
```bash
git clone https://github.com/your-username/tour-app.git
cd tour-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment**
```bash
echo "DATABASE_URL=postgres://postgres:postgres@localhost:5432/tours" > .env
echo "SESSION_SECRET=dev-secret-key" >> .env
```

4. **Start with Docker**
```bash
docker compose up -d --build
```

5. **Start development**
```bash
npm run dev
```

## 📝 Making Changes

### Branch Naming
```
feature/feature-name       # New features
bugfix/bug-description     # Bug fixes
docs/documentation-update  # Documentation
test/test-description      # Tests
refactor/refactor-area     # Refactoring
```

### Commit Messages
Write clear, concise commit messages:

```
✨ feat: Add tour ratings system

- Allow users to rate tours (1-5 stars)
- Display average rating on tour cards
- Store ratings in database

Fixes #123
```

**Format:**
```
[type] [scope]: [subject]

[body]

[footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style (no logic change)
- `refactor` - Code refactoring
- `perf` - Performance improvement
- `test` - Test addition/update
- `chore` - Build, dependencies, etc.

### Code Style

**TypeScript/JavaScript:**
```typescript
// Use clear variable names
const userEmail = "user@example.com";

// Use arrow functions
const getUserById = (id: number) => { /* ... */ };

// Use proper types
interface User {
  id: number;
  username: string;
  email: string;
}

// Use async/await
const fetchTours = async () => {
  try {
    const response = await fetch("/api/tours");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch tours:", error);
  }
};
```

**React Components:**
```typescript
// Use functional components with hooks
import React from "react";

interface TourCardProps {
  tour: Tour;
  onBook: (tourId: number) => void;
}

export const TourCard: React.FC<TourCardProps> = ({ tour, onBook }) => {
  return (
    <div className="card">
      {/* Component JSX */}
    </div>
  );
};
```

**CSS/Tailwind:**
```tsx
// Use Tailwind classes
<div className="flex gap-4 p-6 bg-white rounded-lg shadow-md">
  {/* Content */}
</div>
```

## 🧪 Testing

### Running Tests
```bash
npm run test
```

### Writing Tests
Create test files alongside components:
```
src/
  components/
    TourCard.tsx
    TourCard.test.tsx
```

### Test Example
```typescript
import { render, screen } from "@testing-library/react";
import { TourCard } from "./TourCard";

describe("TourCard", () => {
  it("renders tour information", () => {
    const tour = { id: 1, title: "Paris Tour", price: 100 };
    render(<TourCard tour={tour} onBook={() => {}} />);
    expect(screen.getByText("Paris Tour")).toBeInTheDocument();
  });
});
```

## 📤 Submitting a Pull Request

1. **Push to your fork**
```bash
git push origin feature/feature-name
```

2. **Create Pull Request on GitHub**
   - Go to https://github.com/tour-app/tour-app
   - Click "New Pull Request"
   - Select your branch
   - Fill in PR template

3. **PR Description Template**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #issue-number

## Testing
How was this tested?

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No new warnings generated
```

## 🔍 Review Process

1. Maintainers will review your PR
2. Feedback may be requested
3. Address feedback in new commits
4. Re-request review
5. Once approved, PR will be merged

## 📚 Documentation

When adding features, update relevant documentation:

- **README.md** - Update features or setup instructions
- **Code comments** - Document complex logic
- **API docs** - Update endpoint documentation
- **Architecture** - Update system design if needed

## 🚀 Performance Guidelines

- Minimize bundle size
- Optimize database queries
- Use React.memo for expensive components
- Implement pagination for large lists
- Cache API responses appropriately

## 🔒 Security Considerations

- Never commit secrets or credentials
- Validate all user inputs
- Use parameterized SQL queries (Drizzle ORM handles this)
- Sanitize HTML output
- Use HTTPS in production
- Keep dependencies updated

## 📦 Project Structure

```
tour-app/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom hooks
│   │   └── lib/         # Utilities
│   └── Dockerfile
├── server/              # Express backend
│   ├── routes.ts        # API routes
│   ├── auth.ts          # Authentication
│   ├── db.ts            # Database setup
│   ├── storage.ts       # Data access
│   └── Dockerfile
├── shared/              # Shared code
│   ├── schema.ts        # Zod schemas
│   └── routes.ts        # Route definitions
└── script/              # Build scripts
```

## 🎯 Priority Areas

We're especially interested in contributions to:

1. **Payment Integration** - Stripe/PayPal
2. **Email Notifications** - Booking confirmations
3. **Admin Panel** - Tour management
4. **User Reviews** - Rating system
5. **Real-time Updates** - WebSocket notifications
6. **Tests** - Unit and integration tests
7. **Performance** - Optimization

## ❓ Questions?

- Open an issue with your question
- Join our community discussions
- Check existing documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Tour App! 🎉
