# TIME Magazine Replica - replit.md

## Overview

This is a full-stack React application that replicates the Time.com website experience. The application serves as a high-performance, content-driven news website showcasing 50 sample articles across various categories with client-side routing, search functionality, and responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Bundler**: Vite for fast development and optimized builds
- **Routing**: Wouter for client-side routing (lightweight React Router alternative)
- **State Management**: TanStack React Query for server state management
- **UI Framework**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom TIME-branded color scheme
- **Build Tool**: ESBuild for backend bundling

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (configured but not actively used)
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: PostgreSQL-based sessions with connect-pg-simple
- **Development**: Hot reload with Vite middleware integration

### Data Management
- **Primary Data Source**: Static JSON file (`client/src/data/articles.json`) containing 50 articles
- **Schema Validation**: Zod schemas for type safety
- **Database Schema**: Drizzle schema defined but application primarily uses static data
- **Query Caching**: TanStack React Query with infinite stale time for static content

## Key Components

### Core Pages
1. **Home Page** (`/`) - Featured carousel, category filters, paginated article grid
2. **Category Pages** (`/category/:name`) - Filtered articles by category with pagination
3. **Article Detail Pages** (`/article/:slug`) - Full article display with metadata
4. **404 Page** - Custom not found page

### UI Components
- **ArticleCard** - Reusable article preview component
- **FeaturedCarousel** - Auto-rotating featured articles slider
- **CategoryFilter** - Category selection buttons
- **SearchOverlay** - Full-screen search interface
- **Header/Footer** - Site navigation and branding

### Data Structure
```typescript
Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  date: string
  category: string
  imageUrl: string
  readTime: string
  featured: boolean
}
```

## Data Flow

### Article Loading
1. Static JSON data imported at build time
2. React Query manages caching and provides consistent API
3. Custom hooks (`useArticles`, `useArticleBySlug`, etc.) abstract data access
4. No backend API calls - all data served from static import

### Search Functionality
1. Client-side text search over article titles, excerpts, and authors
2. Real-time filtering as user types
3. Search overlay with keyboard navigation support

### Navigation Flow
1. Wouter handles client-side routing
2. SEO metadata updated dynamically per page
3. Responsive navigation with mobile menu support

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **class-variance-authority**: Component variant management

### Development Tools
- **TypeScript**: Type safety across the stack
- **Vite**: Development server and build tool
- **ESLint/Prettier**: Code quality and formatting
- **PostCSS**: CSS processing

### Backend Dependencies
- **Express**: Web server framework
- **Drizzle ORM**: Database toolkit (configured for future use)
- **Zod**: Schema validation
- **Connect-pg-simple**: PostgreSQL session store

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: ESBuild bundles Express server to `dist/index.js`
3. **Assets**: Static files served from build output

### Environment Configuration
- **Development**: `npm run dev` - Vite dev server with Express backend
- **Production**: `npm run build && npm start` - Optimized builds with static serving
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable

### Replit Deployment
- Single command deployment: `npm run dev` for development
- Production build: `npm run build` followed by `npm start`
- Static asset serving handled by Express in production
- Database migrations: `npm run db:push` (when needed)

### Performance Optimizations
- **Static Data**: Articles served from JSON import (no database queries)
- **Image Optimization**: Lazy loading with `loading="lazy"`
- **Code Splitting**: Vite handles automatic code splitting
- **Caching**: React Query caches with infinite stale time for static content
- **SEO**: Dynamic meta tags and structured data

The architecture prioritizes development speed and deployment simplicity while maintaining the visual fidelity and user experience of the original Time.com website.