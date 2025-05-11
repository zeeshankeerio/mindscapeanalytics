# Vercel Deployment Guide for Mindscape

This guide provides step-by-step instructions for deploying the Mindscape application to Vercel.

## Prerequisites

Before deploying to Vercel, make sure you have:

1. A Vercel account
2. PostgreSQL database accessible from the internet (Vercel database, Supabase, Neon, etc.)
3. Access to the GitHub repository

## Required Environment Variables

Set the following environment variables in the Vercel dashboard:

- `DATABASE_URL`: Your PostgreSQL connection string (format: `postgresql://username:password@host:port/database?schema=public`)
- `NEXTAUTH_SECRET`: A secure random string for NextAuth tokens (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL`: Your production URL (e.g., `https://your-domain.vercel.app`)
- `PRISMA_GENERATE_DATAPROXY`: Set to "true"

## Deployment Steps

1. **Connect Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import your GitHub repository

2. **Configure Project**:
   - Framework Preset: "Next.js"
   - Root Directory: Leave empty (or set to your project's root directory if necessary)
   - Build Command: npm install --force && npx prisma generate && npm run build
   - Output Directory: .next
   - Install Command: npm install --force

3. **Set Environment Variables**:
   - Add all the required environment variables listed above
   - Make sure to set `NODE_ENV=production` for production deployments

4. **Deploy**:
   - Click "Deploy"
   - Wait for the build and deployment to complete

## Database Migrations

The deployment process automatically runs Prisma migrations via the build command. To manually apply migrations:

1. Install Vercel CLI: `npm install -g vercel`
2. Login: `vercel login`
3. Run: `vercel env pull` to get environment variables
4. Apply migrations: `npx prisma migrate deploy`

## Common Issues and Solutions

### Build Failures

**Issue**: Build fails with Prisma errors
**Solution**: 
- Make sure the `DATABASE_URL` is correct and accessible from Vercel
- Run `npx prisma migrate deploy` locally to test the connection

**Issue**: Error about shadowDatabaseUrl being the same as url
**Solution**: 
- The schema has been updated to remove the shadowDatabaseUrl
- If you need to perform migrations during deployment, set up a separate `SHADOW_DATABASE_URL` environment variable and update the schema to use it

**Issue**: Memory limit exceeded during build
**Solution**: 
- Increase memory limit in Vercel Project Settings
- Optimize the build process by removing unnecessary dependencies

### Runtime Errors

**Issue**: Database connection errors
**Solution**:
- Ensure your database allows connections from Vercel's IP ranges
- Add SSL parameters to your connection string if required
- Use connection pooling for better performance

**Issue**: Missing environment variables
**Solution**:
- Double check that all required environment variables are properly set
- Verify they are accessible at runtime with console logging (temporarily)

### Performance Optimization

1. **Edge Caching**:
   - Leverage Vercel's Edge Network by setting appropriate cache headers
   - The vercel.json configuration already includes optimal caching for static assets

2. **Database Performance**:
   - Use connection pooling for better database performance
   - Consider adding database indexes for frequently accessed fields

3. **Image Optimization**:
   - Use Next.js Image optimization for better performance
   - The project is already configured with image optimization settings

## Monitoring and Logs

- Access logs via Vercel Dashboard → Your Project → Logs
- Set up monitoring with Vercel Analytics to track performance metrics
- Consider integrating with error tracking services like Sentry

## Rolling Back Deployments

If a deployment causes issues:
1. Go to Vercel Dashboard → Your Project → Deployments
2. Find the last working deployment
3. Click the three dots (⋯) and select "Promote to Production"

## Local Testing

To test the exact build process locally before deployment:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Pull environment variables
vercel env pull

# Build locally
npm run build

# Test the build
npm start
```

Remember that the Prisma database needs to be accessible from your local machine for this test to work properly.

## Support

If you encounter any issues with Vercel deployment, please:

1. Check the Vercel deployment logs
2. Review the Function logs for runtime errors
3. Verify your environment variables are set correctly
4. Try a clean deployment after fixing any identified issues 