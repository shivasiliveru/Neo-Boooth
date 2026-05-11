# NeoBooth - Futuristic Photo Booth

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the settings (Vite + React)
5. Click "Deploy"

### Option 2: Deploy via CLI
```bash
npm i -g vercel
vercel
```

### Option 3: Deploy manually
1. Build the project: `npm run build`
2. Upload the `dist` folder to Vercel

## Features
- 🎥 Live webcam capture
- 🎨 15+ aesthetic filters
- 📸 2/3/4 photo strips
- ✨ Customizable borders & frames
- 💬 Custom text with colors & fonts
- 📱 Mobile responsive
- 🔒 100% private - photos never leave your device

## Tech Stack
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Three.js (for 3D effects)
- Canvas API (for image processing)

## Development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```

The app runs entirely in the browser - no backend required!