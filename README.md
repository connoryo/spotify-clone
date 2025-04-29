# Spotify Clone

A full-stack Spotify clone with music playback, user authentication, and playlist management.

Key Features:

- Music playback with play/pause, skip, and volume controls
- User authentication with Supabase Auth
- Playlist creation and management
- Search functionality for songs and artists
- Responsive design with TailwindCSS
- Dark mode support
- Real-time updates using Supabase subscriptions
- Stripe integration for premium features

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Supabase (Authentication, Database, Storage)
- TailwindCSS for styling
- Zustand for state management
- Stripe for payments

## Getting Started

### Clone the repo

```bash
git clone git@github.com:connoryo/discord-clone.git
```

### Install dependencies

```bash
npm install
```

### Setup .env file

Create a `.env.local` file in the root directory with the following variables:

```env
SUPABASE_PASSWORD=your_postgres_db_password
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### Setup Supabase

1. Create a new Supabase project
2. Import the database schema from `database.sql`
3. Set up storage buckets for song and image uploads (`songs` and `images`)
4. Configure authentication settings

### Start the app

```bash
npm run dev
```

## Project Structure

- `app/` - Next.js app router pages and layouts
- `components/` - Reusable UI components
- `actions/` - Server actions for data fetching and mutations
- `hooks/` - Custom React hooks
- `providers/` - Context providers and global state management
- `public/` - Static assets
- `types/` - TypeScript type definitions

## Features

### Authentication
- User sign up and login with Supabase Auth
- Protected routes and API endpoints
- Session management

### Music Player
- Play/pause functionality
- Skip forward/backward
- Volume control
- Progress bar
- Current song display

### Playlists
- Create and manage playlists
- Add/remove songs from playlists
- Playlist sharing (coming soon)

### Search
- Search songs by title
- Search songs by artist
- Real-time search results

## Deployment

The application can be deployed to Vercel or any other platform that supports Next.js applications. Make sure to set up all environment variables in your deployment platform.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request