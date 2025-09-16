# Deploy TIME Replica to Vercel

This guide provides step-by-step instructions to deploy your TIME Magazine replica website to Vercel.

## Prerequisites

- Vercel account (sign up at [vercel.com](https://vercel.com))
- Vercel CLI installed globally: `npm install -g vercel`
- Your project code ready (already set up in this Replit)

## Option 1: Deploy via Vercel CLI (Recommended)

### Step 1: Login to Vercel
```bash
vercel login
```
Follow the prompts to authenticate with your Vercel account.

### Step 2: Deploy from Replit
Run this command in your Replit terminal:
```bash
vercel --prod
```

The CLI will:
- Detect your project automatically  
- Ask you to link to an existing project or create a new one
- Build and deploy your application
- Provide you with deployment URLs

### Step 3: Configure Environment Variables (if needed)
If your app requires any environment variables:
```bash
vercel env add
```

## Option 2: Deploy via GitHub Integration

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. In your Replit terminal, run:
```bash
git init
git add .
git commit -m "Initial commit - TIME replica website"
git branch -M main
git remote add origin https://github.com/yourusername/time-replica.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the framework settings
5. Click "Deploy"

## Project Configuration

Your project is already configured with:

### ✅ vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/index.ts",
      "use": "@vercel/node"
    },
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/public"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/server/index.ts"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/public/$1"
    }
  ]
}
```

### ✅ Build Configuration
- Frontend: React app built with Vite to `dist/public`
- Backend: Express server compiled with esbuild
- Static assets: Served from the build output

## Vercel Settings

### Build Settings
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Install Command**: `npm ci`

### Environment Variables
If you add any APIs or external services later, you can set environment variables in:
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Or via CLI: `vercel env add VARIABLE_NAME`

## Domain Configuration

### Custom Domain (Optional)
1. In Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Configure DNS settings as instructed by Vercel

### Default Domain
Vercel provides a default domain: `your-project-name.vercel.app`

## Post-Deployment Checklist

### ✅ Test Core Features
- [ ] Homepage loads with featured carousel
- [ ] Navigation works (Politics, Technology, etc.)
- [ ] Individual articles open correctly  
- [ ] Search functionality works
- [ ] Mobile responsiveness
- [ ] Category filtering

### ✅ Performance Optimization
- [ ] Images load properly with lazy loading
- [ ] Page speed is acceptable (test with PageSpeed Insights)
- [ ] All assets are properly cached

### ✅ SEO Verification
- [ ] Meta tags are working
- [ ] OpenGraph tags for social sharing
- [ ] Structured data is valid

## Troubleshooting

### Common Issues & Solutions

**Build fails with "Module not found"**
- Ensure all dependencies are in `package.json`
- Check import paths are correct

**Static files not loading**
- Verify `vercel.json` routes configuration
- Check build output directory structure

**API routes not working**
- Ensure server routes start with `/api/`
- Check `vercel.json` routes configuration

**Large bundle size warning**
- Implement code splitting if needed
- Optimize images and assets

### Getting Help
- Check Vercel logs: `vercel logs [deployment-url]`
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Community: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

## Monitoring & Analytics

### Vercel Analytics (Optional)
Add analytics to track page views and performance:
1. Enable in Vercel Dashboard → Your Project → Analytics
2. Add the Vercel Analytics package if needed

### Performance Monitoring
- Use Vercel's built-in performance monitoring
- Set up alerts for deployment failures
- Monitor Core Web Vitals

## Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch triggers automatic deployment
- Pull requests create preview deployments
- Rollback to previous deployments easily

## Cost Considerations

### Vercel Free Tier Includes:
- 100GB bandwidth per month
- 100 GB-hours execution time
- Unlimited personal projects
- Custom domains

### Paid Plans:
- Pro: $20/month per team member
- Enterprise: Custom pricing

Your TIME replica website should fit comfortably within the free tier limits.

---

## Quick Deploy Commands

```bash
# One-time setup
npm install -g vercel
vercel login

# Deploy to production
vercel --prod

# Deploy preview (staging)
vercel

# Check deployment status
vercel ls
```

Your TIME Magazine replica will be live at your Vercel URL within minutes! 🚀