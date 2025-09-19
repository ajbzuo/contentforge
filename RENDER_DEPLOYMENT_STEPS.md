# Deploy to Render.com - Step by Step Guide

## Prerequisites
- Your TIME replica code (already ready in this Replit)
- GitHub account
- Render.com account (free)

## Step 1: Push Your Code to GitHub

### 1.1 Initialize Git Repository
```bash
git init
git add .
git commit -m "TIME replica website ready for deployment"
```

### 1.2 Create GitHub Repository
1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name it: `time-replica` (or any name you prefer)
4. Keep it public (required for free hosting)
5. Don't initialize with README (you already have files)
6. Click "Create repository"

### 1.3 Push to GitHub
```bash
# Replace 'yourusername' with your actual GitHub username
git remote add origin https://github.com/yourusername/time-replica.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy on Render.com

### 2.1 Sign Up for Render
1. Go to [render.com](https://render.com)
2. Click "Get Started for Free"
3. Sign up with your GitHub account (recommended)
4. Authorize Render to access your repositories

### 2.2 Create New Web Service
1. Click "New +" button (top right)
2. Select "Web Service"
3. Connect your GitHub repository:
   - Find your `time-replica` repository
   - Click "Connect"

### 2.3 Configure Service Settings
Fill in these exact settings:

**Basic Settings:**
- **Name**: `time-replica` (or your preferred name)
- **Environment**: `Node`
- **Region**: `Ohio (US East)` (or closest to you)
- **Branch**: `main`

**Build & Deploy Settings:**
- **Root Directory**: (leave blank)
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

**Plan:**
- **Plan Type**: `Free`
- **Instance Type**: `Free - 512 MB RAM, 0.1 CPU`

### 2.4 Environment Variables (Optional)
Under "Environment Variables" section:
- **NODE_ENV**: `production`
- **PORT**: (leave blank - Render sets this automatically)

### 2.5 Deploy
1. Click "Create Web Service"
2. Render will start building your application
3. Watch the build logs in real-time
4. Build process takes 2-5 minutes

## Step 3: Access Your Live Website

### 3.1 Get Your URL
Once deployed, your website will be available at:
```
https://your-service-name.onrender.com
```

### 3.2 Test Your Website
Visit your URL and verify:
- Homepage loads with featured carousel
- Navigation works (Politics, Technology, etc.)
- Individual articles open correctly
- Search functionality works
- Mobile responsiveness

## Step 4: Automatic Deployments

From now on:
- Every time you push to your GitHub repository
- Render automatically rebuilds and deploys your site
- No manual intervention needed

## Troubleshooting

### Build Fails
Check build logs for errors. Common issues:
- **Node version**: Render uses Node 18 by default (perfect for your app)
- **Dependencies**: Make sure all packages are in `package.json`

### App Won't Start
- Verify your start command is `npm start`
- Check that your Express server uses `process.env.PORT`

### Static Files Not Loading
Your app is already configured correctly:
- Express serves static files from `dist/public`
- Build process creates the correct structure

## What You Get with Render Free Tier

- **512 MB RAM**
- **Free HTTPS SSL certificate**
- **Free subdomain**: `yourapp.onrender.com`
- **Custom domain support** (you can add your own domain later)
- **Automatic deployments** from GitHub
- **750 hours per month** (effectively unlimited for personal use)
- **Sleeps after 15 minutes** of inactivity (wakes up in ~30 seconds)

## Custom Domain (Optional)

To add your own domain later:
1. Go to your service dashboard on Render
2. Click "Settings" tab
3. Scroll to "Custom Domain"
4. Add your domain and follow DNS instructions

## Summary of Commands

```bash
# 1. Prepare code for GitHub
git init
git add .
git commit -m "TIME replica website ready for deployment"

# 2. Push to GitHub (replace with your username)
git remote add origin https://github.com/yourusername/time-replica.git
git branch -M main
git push -u origin main

# 3. Deploy on Render.com
# - Go to render.com
# - Connect GitHub repo
# - Build: npm install && npm run build
# - Start: npm start
# - Plan: Free
```

Your TIME replica website will be live and accessible worldwide within 5 minutes!