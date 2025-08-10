# Nuggetroid Arcade
THE BEST WEB ARCADE EVER

A React-based game arcade application with automatic game discovery and GitHub Pages deployment.

## Features

- **Auto-Discovery System**: Add new games by simply creating folders in `src/games/`
- **Modern Tech Stack**: React 19+ with Vite, Tailwind CSS, and React Router
- **Automatic Deployment**: GitHub Actions workflow for seamless Pages deployment
- **Responsive Design**: Works on desktop and mobile devices

## Development

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run lint   # Run ESLint
```

## Adding New Games

1. Create a folder under `src/games/` with a kebab-case name
2. Add a `.jsx` file with the same name as the folder
3. Export a default React component
4. The game will automatically appear in the arcade menu
