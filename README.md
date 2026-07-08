# Employee Leave Management System

A production-ready Employee Leave Management System built with Next.js, Express, Prisma, and PostgreSQL.

## Features

- **Authentication & Authorization**: Secure JWT-based auth with Role-Based Access Control (Admin, Manager, Employee).
- **Employee Dashboard**: View leave balances, apply for leaves, view history.
- **Manager Dashboard**: Review team requests, approve/reject workflow.
- **Admin Dashboard**: User management, Leave policies management, global reports, and analytics.
- **Premium UI**: Glassmorphism, Tailwind CSS, animations with Framer Motion, and charts using Recharts.

## Architecture

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, TanStack Query, React Hook Form, Zod.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL.

## Folder Structure

```
leave-management-system/
├── backend/            # Express REST API
│   ├── prisma/         # Database schema & seed script
│   ├── src/
│   │   ├── controllers/# Route handlers
│   │   ├── middlewares/# Auth, Error, Rate Limiter
│   │   ├── routes/     # Express routes
│   │   ├── utils/      # Logger, JWT config
│   │   └── app.ts      # App configuration
├── frontend/           # Next.js Application
│   ├── src/
│   │   ├── app/        # App router pages
│   │   ├── components/ # Reusable UI components
│   │   └── lib/        # API client, Auth Context
└── README.md
```

## Installation & Setup

1. **Install dependencies**:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

2. **Database Setup**:
   - Provide a valid PostgreSQL URL in `backend/.env`.
   - Run migrations and seed the database:
     ```bash
     cd backend
     npx prisma db push
     npm run prisma:seed
     ```

3. **Environment Variables**:
   - `backend/.env`: `DATABASE_URL`, `JWT_SECRET`, `PORT`
   - `frontend/.env.local`: `NEXT_PUBLIC_API_URL`

4. **Run Development Servers**:
   ```bash
   # Terminal 1 (Backend)
   cd backend && npm run dev

   # Terminal 2 (Frontend)
   cd frontend && npm run dev
   ```

## Testing

Run tests using Jest:
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

## Deployment

- **Backend**: Can be deployed to Render or Railway. Set environment variables.
- **Frontend**: Deploy directly to Vercel. Connect GitHub repo, set `NEXT_PUBLIC_API_URL`.
- **Database**: Use Neon or Railway Postgres.

## Future Improvements
- Email Notifications integration.
- Advanced CSV/Excel Exports for reporting.
- Audit Log dashboard UI.
