# CityMatch AI - Frontend

This is the Next.js frontend for the CityMatch AI application.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Structure

- `app/` - Next.js App Router pages
- `components/` - React components
  - `CitySelector.tsx` - Dependent dropdown menus
  - `NeighborhoodCard.tsx` - Individual neighborhood display
  - `MatchDisplay.tsx` - Carousel for viewing matches
- `types/` - TypeScript type definitions
- `lib/` - Utility functions

## 🎨 Key Features

- **Real-time Streaming** - Watch as AI finds neighborhood matches
- **Responsive Design** - Works on desktop and mobile
- **Beautiful Animations** - Smooth transitions with Framer Motion
- **Type Safety** - Full TypeScript implementation

## 🔧 Configuration

The frontend expects the backend API to be running on `http://localhost:8000`.

To change this, update the API URLs in `app/page.tsx`.

## 📚 Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide Icons

## 🎓 For Students

Explore the code to learn:
- How to build modern React applications
- TypeScript best practices
- Streaming data handling
- Component composition
- Responsive design patterns

See the main [README](../README.md) for full project documentation.
