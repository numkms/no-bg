# No Background - Remove Image Backgrounds

A Next.js application for removing backgrounds from images using AI technology.

## Features

- Remove backgrounds from images
- Support for multiple languages
- Drag and drop interface
- Real-time processing
- Responsive design

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Project Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - React components (including MainApp)
- `src/hooks/` - Custom React hooks
- `src/i18n/` - Internationalization configuration
- `locales/` - Translation files

## Migration Notes

This project was migrated from Vite + React to Next.js with App Router. The main application logic was moved from `src/apps/App.jsx` to `src/components/MainApp.jsx` to follow Next.js best practices.

## Technologies Used

- Next.js 15 with App Router
- React 19
- Tailwind CSS
- react-i18next for internationalization
- @imgly/background-removal for AI background removal

## Troubleshooting

If you encounter issues with Tailwind CSS, make sure you have `@tailwindcss/postcss` installed and your PostCSS configuration is correct.
