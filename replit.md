# 심리테스트 애플리케이션

## Overview

This is a Korean psychological testing application built with React and Express. The app allows users to take various personality tests (like "에겐남/테토남 테스트" - extrovert/introvert test) and view their results with sharing capabilities. The application features a modern UI using shadcn/ui components with Korean localization.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for home, test-taking, and results
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack React Query for server state, React hooks for local state
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Server**: Express.js with TypeScript
- **API Design**: RESTful API structure with `/api` prefix for all endpoints
- **Data Storage**: In-memory storage implementation with interface for future database integration
- **Session Management**: Express sessions with PostgreSQL session store setup
- **Development Setup**: Hot reload with Vite dev server integration

### Component Structure
- **Pages**: Home (test listing), Test (quiz interface), Result (test outcomes), NotFound
- **UI Components**: Complete shadcn/ui component set including dialogs, forms, buttons, cards
- **Custom Hooks**: Mobile detection, sharing functionality, toast notifications
- **Test Data**: Structured test definitions with questions, options, and result calculations

### Database Schema
- **Users Table**: Basic user structure with id, username, and password fields
- **ORM**: Drizzle ORM configured for PostgreSQL with Zod schema validation
- **Migrations**: Drizzle Kit for database migrations and schema management

### Key Features
- **Responsive Design**: Mobile-first approach with responsive layouts
- **Test Engine**: Question-answer flow with progress tracking and result calculation
- **Social Sharing**: Native sharing API with clipboard fallback
- **Session Persistence**: Test answers stored in sessionStorage
- **Korean Localization**: Full Korean language support throughout the interface

## External Dependencies

### Database
- **PostgreSQL**: Primary database with Neon serverless provider
- **Drizzle ORM**: Type-safe database operations with automatic migrations
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### UI/UX Libraries
- **Radix UI**: Accessible component primitives for all interactive elements
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Lucide React**: Icon library for consistent iconography
- **shadcn/ui**: Pre-built component library with consistent design system

### Development Tools
- **Vite**: Fast build tool with HMR and optimized bundling
- **TypeScript**: Type safety across frontend and backend
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

### Runtime Dependencies
- **TanStack React Query**: Server state management and caching
- **Wouter**: Lightweight client-side routing
- **React Hook Form**: Performant form handling with validation
- **date-fns**: Date manipulation utilities
- **nanoid**: Unique ID generation

### Authentication & Security
- **Express Sessions**: Session-based authentication setup
- **Zod**: Runtime type validation for forms and API inputs
- **CORS**: Cross-origin resource sharing configuration