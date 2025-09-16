# TIME Magazine Replica Website

A modern, responsive replica of TIME.com built with React 18, TypeScript, and Vite. Features 50 sample articles, search functionality, and a complete editorial layout.

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```
Visit `http://localhost:5000` to view the site.

### Production Build
```bash
npm run build
npm start
```

## 📦 Deploy to Vercel

### Option 1: One-Command Deployment
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to your Vercel account
vercel login

# Deploy to production
vercel --prod
```

### Option 2: Using the Deployment Script
```bash
node deploy-to-vercel.js
```

### Option 3: GitHub Integration
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Automatic deployments on every push

📖 **Detailed deployment guide:** See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

## ✨ Features

- **Homepage**: Featured article carousel with latest news grid
- **Category Pages**: Filtered articles by Politics, Technology, Business, etc.
- **Article Pages**: Full-text articles with rich formatting
- **Search**: Real-time article search functionality
- **Responsive Design**: Mobile-first responsive layout
- **SEO Optimized**: Meta tags, OpenGraph, and structured data
- **Performance**: Lazy loading, code splitting, optimized images

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI
- **Routing**: Wouter (lightweight React Router)
- **State**: TanStack React Query
- **Backend**: Express.js, TypeScript
- **Data**: Static JSON with 50 sample articles
- **Build**: ESBuild, PostCSS

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utilities and configurations
│   │   └── data/          # Static article data
├── server/                # Express backend
├── shared/                # Shared TypeScript schemas
├── vercel.json           # Vercel deployment config
└── VERCEL_DEPLOYMENT.md  # Detailed deployment guide
```

## 🎨 Key Components

- **FeaturedCarousel**: Auto-rotating featured articles
- **ArticleCard**: Reusable article preview component
- **SearchOverlay**: Full-screen search interface
- **CategoryFilter**: Category selection and filtering
- **Header/Footer**: Site navigation and branding

## 📊 Sample Data

The site includes 50 sample articles across 7 categories:
- Politics
- Technology  
- Business
- Health
- Entertainment
- Science
- World

Articles include realistic content, author information, publication dates, and high-quality images.

## 🔧 Configuration

### Vercel Settings
- **Build Command**: `npm run build`
- **Output Directory**: `dist/public`
- **Node.js Version**: 18.x

### Environment Variables
Currently no external APIs required. The application uses static JSON data for articles.

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Touch-friendly navigation
- Optimized images for all screen sizes

## ⚡ Performance Features

- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Images and components load on demand
- **Caching**: React Query caches article data
- **Optimized Bundle**: Tree shaking and minification
- **CDN**: Font loading optimization

## 🔍 SEO Features

- Dynamic meta tags per page
- OpenGraph tags for social sharing
- Structured data markup
- Semantic HTML structure
- Clean, SEO-friendly URLs

## 🚦 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 15+
- Edge 90+

## 📄 License

MIT License - feel free to use this project as a template for your own news websites.

## 🤝 Contributing

This is a demo project, but feel free to fork and enhance it with additional features like:
- User authentication
- Comment system
- Newsletter signup
- Social sharing
- Real-time updates
- Content management system

---

Built with ❤️ using modern web technologies