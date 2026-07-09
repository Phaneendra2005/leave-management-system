# LeaveSync - Leave Management System

A modern, full-stack Leave Management System built with React, Node.js, Express, Prisma, PostgreSQL (Neon), and deployed on Vercel & Render.

---

## Live Demo

### Frontend
https://leave-management-system-rho-three.vercel.app

### Backend API
https://leave-management-system-xdn0.onrender.com

---

## Features

### Authentication

- JWT Authentication
- Role Based Access Control
- Protected Routes
- Secure Password Hashing (bcrypt)

---

### Employee

- Login
- Dashboard
- Apply Leave
- Leave History
- Leave Balance
- CSV Export

---

### Manager

- Dashboard
- Review Team Requests
- Approve Leave
- Reject Leave
- Add Comments
- Export CSV

---

### Admin

- Dashboard
- User Management
- Leave Type Management
- Global Leave Requests
- Reports & Analytics
- Leave Calendar
- CSV Export

---

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- React Router
- Axios
- React Hook Form

### Backend

- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT
- bcrypt
- Multer

### Database

- PostgreSQL
- Neon

### Deployment

- Vercel
- Render

---

## Architecture

Frontend (React)

↓

Express REST API

↓

Prisma ORM

↓

PostgreSQL (Neon)

---

# Project Structure

```
leave-management-system

frontend/

backend/

prisma/

README.md
```

---

# Installation

## Clone

```bash
git clone https://github.com/Phaneendra2005/leave-management-system.git
```

```
cd leave-management-system
```

---

## Backend

```
cd backend

npm install

cp .env.example .env
```

```
DATABASE_URL=

JWT_SECRET=

PORT=5000
```

```
npx prisma generate

npx prisma db push

npm run dev
```

---

## Frontend

```
cd frontend

npm install

npm run dev
```

---

# Demo Accounts

## Admin

Email

```
admin@company.com
```

Password

```
admin123
```

---

## Manager

Email

```
manager@company.com
```

Password

```
manager123
```

---

## Employee

Email

```
employee@company.com
```

Password

```
employee123
```

---

# Screenshots

## Login

![](screenshots/login.png)

---

## Employee Dashboard

![](screenshots/employee-dashboard.png)

---

## Apply Leave

![](screenshots/employee-apply-leave.png)

---

## Leave History

![](screenshots/employee-history.png)

---

## Manager Dashboard

![](screenshots/manager-dashboard.png)

---

## Team Leave Requests

![](screenshots/manager-team-requests.png)

---

## Admin Dashboard

![](screenshots/admin-dashboard.png)

---

## User Management

![](screenshots/user-management.png)

---

## Leave Types

![](screenshots/leave-types.png)

---

## All Leave Requests

![](screenshots/all-requests.png)

---

## Request Details

![](screenshots/request-details.png)

---

## Reports

### Leave Summary

![](screenshots/reports-summary.png)

### Leave Balances

![](screenshots/reports-balances.png)

### Leave Calendar

![](screenshots/reports-calendar.png)

---

# API Features

Authentication

- POST /api/auth/login
- GET /api/auth/me

Users

- CRUD Users

Leave Types

- CRUD Leave Types

Leave Requests

- Apply Leave
- Approve Leave
- Reject Leave
- Leave History

Reports

- Summary
- Calendar
- Leave Balance
- CSV Export

---

# Security

- JWT Authentication
- Password Hashing (bcrypt)
- Role Based Authorization
- Input Validation (Zod)
- Protected API Routes
- Prisma ORM

---

# Deployment

Frontend

Vercel

Backend

Render

Database

Neon PostgreSQL

---

# Future Improvements

- Email Notifications
- Multi-Level Approval
- Public Holidays
- Attendance Integration
- Mobile Responsive Improvements
- Docker Support
- CI/CD Pipeline

---

# Author

**Phaneendra Kanduri**

LinkedIn

https://www.linkedin.com/in/phaneendra-kanduri/

GitHub

https://github.com/Phaneendra2005

---

## License

MIT License