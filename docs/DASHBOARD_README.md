# Queen Hills Murree - Management Dashboard

## Overview

This is a comprehensive management dashboard for Queen Hills Murree housing society. The system provides complete property and plot management capabilities with integrated accounting and finance features.

## Features

### 🏠 Plot Management
- Complete plot inventory with unique numbering
- Plot status tracking (Available, Reserved, Sold, Transferred)
- Geographic coordinates and size specifications
- Phase and block organization
- Interactive map view

### 👥 Customer Management
- Customer database with CNIC verification
- Lead management and qualification
- Document management (CNIC scans, forms)
- Customer activity tracking
- Investment history

### 📅 Booking System
- Plot booking with down payment tracking
- Installment schedule management
- Payment status monitoring
- Automated reminders
- Booking confirmation workflow

### 💰 Finance & Accounting
- Double-entry bookkeeping system
- Chart of accounts (IFRS-compliant)
- Journal entries and ledger management
- Bank reconciliation
- Tax management (VAT, Withholding Tax)
- Financial reporting and analytics

### 📊 Dashboard Analytics
- Real-time business metrics
- Sales performance tracking
- Revenue and expense analysis
- Cash flow monitoring
- Overdue payment alerts

### 🔐 User Management
- Role-based access control (RBAC)
- User authentication and authorization
- Activity logging and audit trail
- Secure data protection

## Technology Stack

### Frontend
- **Next.js 14** with React 18
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Hook Form** for form handling

### Backend
- **NestJS** with TypeScript
- **TypeORM** for database management
- **SQLite** (development) / **PostgreSQL** (production)
- **JWT** authentication
- **Class-validator** for validation

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd housing_society
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. **Environment Setup**
```bash
# Frontend environment
cd frontend
cp .env.example .env.local
# Edit .env.local with your API URL

# Backend environment
cd ../backend
cp .env.example .env
# Edit .env with your database and JWT settings
```

4. **Database Setup**
```bash
cd backend
npm run db:migrate
npm run db:seed
```

5. **Start Development Servers**
```bash
# Start backend (from backend directory)
npm run start:dev

# Start frontend (from frontend directory)
npm run dev
```

## Access Points

- **Marketing Site**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard
- **API Documentation**: http://localhost:3001/api/docs

## User Roles

| Role | Permissions | Access Level |
|------|-------------|--------------|
| Super Admin | Full system access | All modules |
| Accountant | Financial operations | Finance, Reports |
| Sales Agent | Customer management | CRM, Plot booking |
| Investor | Portfolio view | Investment reports |
| Buyer | Personal account | Booking history |
| Auditor | Read-only access | All modules (read) |

## Key Features for Housing Societies

### Plot Management
- **Unique Plot Numbers**: Each plot gets a unique identifier (e.g., A-001, B-002)
- **Size Specifications**: Support for Marla/Kanal with square meter equivalents
- **Status Tracking**: Real-time status updates (Available → Reserved → Sold → Transferred)
- **Geographic Data**: GPS coordinates for mapping and location services

### Financial Management
- **Installment Tracking**: Automated payment schedules with due dates
- **Late Fee Calculation**: Configurable late fee rules
- **Payment Reminders**: SMS/Email notifications for overdue payments
- **Revenue Recognition**: Proper accounting for plot sales and installments

### Customer Relationship Management
- **Lead Pipeline**: From initial inquiry to final sale
- **Document Management**: Secure storage of CNIC, agreements, receipts
- **Communication History**: Track all customer interactions
- **Investment Tracking**: Monitor customer payment history

### Reporting & Analytics
- **Sales Reports**: Track plot sales by phase, size, and time period
- **Financial Reports**: Profit & Loss, Balance Sheet, Cash Flow
- **Customer Reports**: Lead conversion rates, customer demographics
- **Inventory Reports**: Plot availability and aging analysis

## Production Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
npm run start
```

### Backend Deployment
```bash
cd backend
npm run build
npm run start:prod
```

### Environment Variables

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=https://api.queenhills.com
```

**Backend (.env)**
```
NODE_ENV=production
DATABASE_URL=postgresql://user:password@localhost:5432/queenhills
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
```

## Support

For technical support or feature requests, please contact the development team.

---

**Queen Hills Murree** - Your Complete Housing Society Management Solution 