# Vercel Deployment Guide

This guide will help you deploy your Queen Hills Murree application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Vercel CLI** (optional): `npm i -g vercel`

## Deployment Strategy

Since you have both frontend (Next.js) and backend (NestJS), you'll need to deploy them separately:

### Option 1: Separate Deployments (Recommended)
- **Frontend**: Deploy to Vercel
- **Backend**: Deploy to Vercel as API routes or use Railway/Render

### Option 2: Combined Deployment
- Deploy frontend to Vercel
- Use Vercel's serverless functions for API

## Step 1: Deploy Frontend

### Method A: Vercel Dashboard

1. **Connect Repository**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend` folder as root directory

2. **Configure Build Settings**:
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-api.vercel.app/api/v1
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete

### Method B: Vercel CLI

```bash
# Navigate to frontend directory
cd frontend

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name: queen-hills-frontend
# - Directory: ./
# - Override settings? No
```

## Step 2: Deploy Backend

### Option A: Vercel API Routes (Recommended for MVP)

1. **Create API Routes**:
   ```bash
   # In your backend directory
   mkdir -p api/v1
   ```

2. **Move API Logic**:
   - Convert your NestJS controllers to Vercel API routes
   - Each controller becomes a separate API route file

3. **Deploy Backend**:
   ```bash
   cd backend
   vercel
   ```

### Option B: Separate Backend Deployment

For a full NestJS backend, consider these alternatives:

1. **Railway**: Great for Node.js apps
2. **Render**: Free tier available
3. **Heroku**: Paid but reliable
4. **DigitalOcean App Platform**: Good performance

## Step 3: Configure Environment Variables

### Frontend Environment Variables (Vercel Dashboard)

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api/v1
```

### Backend Environment Variables

```
NODE_ENV=production
DATABASE_URL=your-database-url
JWT_SECRET=your-jwt-secret
FRONTEND_URL=https://your-frontend-url.vercel.app
```

## Step 4: Database Setup

### Option A: Vercel Postgres (Recommended)

1. **Add Vercel Postgres**:
   - Go to your Vercel project
   - Navigate to "Storage"
   - Add "Postgres" database

2. **Update Environment Variables**:
   ```
   DATABASE_URL=postgresql://username:password@host:port/database
   ```

### Option B: External Database

- **Supabase**: Free tier, great for development
- **PlanetScale**: MySQL-compatible
- **Railway Postgres**: Simple setup

## Step 5: Custom Domain (Optional)

1. **Add Domain**:
   - Go to project settings
   - Navigate to "Domains"
   - Add your custom domain

2. **Configure DNS**:
   - Add CNAME record pointing to your Vercel deployment

## Step 6: Production Optimizations

### Frontend Optimizations

1. **Image Optimization**:
   ```javascript
   // next.config.js
   images: {
     domains: ['your-domain.com'],
     formats: ['image/webp', 'image/avif'],
   }
   ```

2. **Performance Monitoring**:
   - Enable Vercel Analytics
   - Add performance monitoring

### Backend Optimizations

1. **Caching**:
   - Implement Redis caching
   - Use Vercel's edge caching

2. **Security**:
   - Enable CORS
   - Add rate limiting
   - Implement proper authentication

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

2. **API Connection Issues**:
   - Verify environment variables
   - Check CORS configuration
   - Ensure API endpoints are accessible

3. **Database Connection**:
   - Verify database URL format
   - Check network access
   - Ensure database is running

### Debug Commands

```bash
# Check build locally
npm run build

# Test API locally
npm run start:dev

# Check environment variables
vercel env ls
```

## Monitoring and Maintenance

1. **Vercel Analytics**:
   - Enable in project settings
   - Monitor performance metrics

2. **Error Tracking**:
   - Consider Sentry integration
   - Monitor API errors

3. **Updates**:
   - Regular dependency updates
   - Security patches
   - Performance optimizations

## Cost Considerations

### Vercel Pricing
- **Hobby Plan**: Free (100GB bandwidth, 100GB-hours build time)
- **Pro Plan**: $20/month (1TB bandwidth, 6000GB-hours build time)

### Database Costs
- **Vercel Postgres**: $20/month for 1GB
- **Supabase**: Free tier available
- **Railway**: $5/month for basic plan

## Next Steps

1. **Deploy Frontend**: Follow Step 1
2. **Set Up Database**: Choose and configure database
3. **Deploy Backend**: Follow Step 2
4. **Configure Domain**: Set up custom domain
5. **Monitor**: Enable analytics and error tracking

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **NestJS Deployment**: [docs.nestjs.com](https://docs.nestjs.com)

---

**Note**: This guide assumes you're deploying the frontend to Vercel. For the backend, consider using a platform better suited for Node.js applications like Railway or Render for better performance and features.
