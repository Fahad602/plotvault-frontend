# 🚀 Quick Setup Guide - Queen Hills Dashboard

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd backend
```

### 2. Create Environment File
Create a file named `.env` in the backend directory with this content:
```
# Database Configuration
DATABASE_URL=queen-hills.db

# JWT Configuration
JWT_SECRET=queen-hills-super-secret-jwt-key-2024
JWT_REFRESH_SECRET=queen-hills-super-secret-refresh-key-2024

# Application Configuration
NODE_ENV=development
PORT=3001
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Database Setup
```bash
# Run migrations
npm run db:migrate

# Create initial users
npx ts-node src/database/seeds/create-users.ts
```

### 5. Start Backend Server
```bash
npm run start:dev
```

## Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Create Environment File
Create a file named `.env.local` in the frontend directory with this content:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Frontend Server
```bash
npm run dev
```

## 🎯 Login Credentials

Once everything is set up, you can login with these credentials:

| Role | Email | Password |
|------|-------|----------|
| **Super Admin** | admin@queenhills.com | admin123 |
| **Accountant** | accountant@queenhills.com | accountant123 |
| **Sales Agent** | sales@queenhills.com | sales123 |

## 🌐 Access Points

- **Marketing Site**: http://localhost:3000
- **Dashboard**: http://localhost:3000/dashboard
- **Backend API**: http://localhost:3001

## 🔧 Troubleshooting

### If you get "Cannot find module" errors:
1. Make sure all dependencies are installed: `npm install`
2. Check that the `.env` files are created correctly
3. Restart both frontend and backend servers

### If login doesn't work:
1. Make sure the backend is running on port 3001
2. Check that the users were created successfully
3. Verify the JWT_SECRET is set in the backend .env file

### If database errors occur:
1. Delete the `queen-hills.db` file and run `npm run db:migrate` again
2. Run the user creation script again: `npx ts-node src/database/seeds/create-users.ts` 