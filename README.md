# Yusuf Portfolio - Windows XP Theme

Personal portfolio website for Yusuf Farhan, showcasing achievements in AI and technology.

## 🚀 Live Demo
Your Railway deployment URL will appear here

## 📦 GitHub Repository
https://github.com/Yusuffarhan13/yusuf-portfolio

## 🛤️ Railway Deployment Instructions

### Method 1: Deploy from GitHub (Recommended)

1. **Go to Railway**
   - Visit [Railway.app](https://railway.app)
   - Sign in with your GitHub account

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose the `yusuf-portfolio` repository
   - Railway will automatically detect it as a Next.js app

3. **Configure Environment (Optional)**
   - No environment variables needed for basic deployment
   - Railway will automatically configure the build and start commands

4. **Deploy**
   - Click "Deploy"
   - Railway will build and deploy your app
   - You'll get a URL like `yusuf-portfolio.up.railway.app`

### Method 2: Deploy via Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project in this directory
railway init

# Deploy
railway up

# Get your deployment URL
railway open
```

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - React components
- `/src/data` - Profile data and content
- `/src/styles` - Global CSS and styling
- `/public` - Static assets

## 🎨 Features

- Windows XP themed design
- Responsive layout
- Smooth animations with Framer Motion
- Terminal-style interface elements
- Matrix rain background effect
- Interactive project showcase
- Achievement timeline

## 🚦 Deployment Status

The project is configured with:
- `railway.json` for Railway deployment settings
- Optimized Next.js production build
- Automatic HTTPS and custom domain support (configurable in Railway)

## 📝 Updating Content

To update your portfolio content, edit the file:
```
src/data/profile.ts
```

## 🔄 Continuous Deployment

Any push to the `master` branch will automatically trigger a new deployment on Railway if you've connected the GitHub repository.

## 🆘 Troubleshooting

If deployment fails:
1. Check Railway build logs
2. Ensure all dependencies are in `package.json`
3. Verify Node version compatibility (Railway uses Node 18 by default)
4. Check for any hardcoded localhost URLs

## 📄 License

Private repository - All rights reserved

---
Built with Next.js 14 and deployed on Railway