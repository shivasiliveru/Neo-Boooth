# NeoBooth - Futuristic Photo Booth Web Application

## 1. Project Overview

**Project Name:** NeoBooth
**Type:** Interactive Web Application (Photo Booth)
**Core Functionality:** A premium, cinematic, futuristic photobooth experience that captures photos via webcam, applies real-time filters, and generates aesthetic downloadable photo strips - all processed entirely in-browser with zero server interaction.
**Target Users:** Social media enthusiasts, content creators, party-goers, and anyone seeking a premium digital photo experience.

---

## 2. UI/UX Specification

### 2.1 Layout Structure

#### Landing Page Sections:
- **Navbar** - Fixed glassmorphic navigation with logo and CTA buttons
- **Hero Section** - Full viewport with 3D scene, animated text, floating CTAs
- **Features Grid** - Showcase of key capabilities with 3D cards
- **Footer** - Minimal with privacy notice and social links

#### Photo Booth Page Sections:
- **Camera Preview** - Central large viewport showing live webcam feed
- **Control Panel** - Bottom floating glassmorphic controls
- **Filter Sidebar** - Slide-in panel with filter options
- **Strip Preview Modal** - Full-screen overlay showing generated strips

#### Responsive Breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### 2.2 Visual Design

#### Color Palette:
```
--bg-void: #050508
--bg-deep: #0a0a0f
--glass-dark: rgba(15, 15, 25, 0.7)
--glass-light: rgba(255, 255, 255, 0.08)
--neon-cyan: #00f5ff
--neon-pink: #ff00aa
--neon-purple: #a855f7
--neon-blue: #3b82f6
--neon-green: #00ff88
--accent-white: #ffffff
--text-muted: rgba(255, 255, 255, 0.6)
--text-bright: #ffffff
```

#### Typography:
- **Primary Font:** "Orbitron" (futuristic headings)
- **Secondary Font:** "Exo 2" (body text, UI elements)
- **Display Font:** "Syncopate" (hero text, large statements)

#### Spacing System:
- Base unit: 4px
- Small: 8px (2 units)
- Medium: 16px (4 units)
- Large: 24px (6 units)
- XLarge: 32px (8 units)
- XXLarge: 48px (12 units)

#### Visual Effects:
- Glassmorphism with backdrop-blur: 20px
- Neon glow shadows: 0 0 30px rgba(0, 245, 255, 0.5)
- Floating animation: translateY oscillating ±10px
- Gradient borders: linear-gradient with neon colors
- Scanline overlay on camera preview
- Particle background with floating dots
- Holographic shimmer effect on cards

### 2.3 Components

#### Navbar
- Glassmorphic background
- Logo with neon glow
- "Start Booth" CTA button
- Minimal, auto-hide on scroll down

#### Hero Section
- 3D rotating camera model (Three.js)
- Floating holographic rings
- Particle system background
- Animated gradient text
- Dual CTA buttons with hover glow

#### Camera Component
- Live video feed from webcam
- Animated camera frame with neon border
- Countdown overlay (3-2-1) with flash effect
- Capture animation (scale + flash)
- Mirror mode toggle

#### Filter Panel
- Horizontal scrollable filter thumbnails
- Real-time preview on video
- Filter intensity slider
- Category tabs (Basic, Aesthetic, Cinematic)

#### Strip Generator
- Canvas-based strip creation
- 2, 3, or 4 photo layouts
- Polaroid-style borders
- Custom border colors (preset palette)
- Date overlay toggle
- Sticker overlay system
- Download as PNG

#### 3D Elements
- Floating glass cards with tilt effect
- Holographic spheres
- Animated rings
- Particle field
- Grid floor with glow

---

## 3. Functionality Specification

### 3.1 Core Features

#### Webcam Access
- Request camera permission on page load
- Support front/back camera on mobile
- Handle permission denied gracefully
- Mirror video feed by default

#### Photo Capture Sequence
- User clicks "Capture" button
- 3-second countdown with animated numbers
- Flash effect on capture
- Shutter sound (optional, can be toggled)
- Automatically advance to next photo
- Support 2, 3, or 4 photo sequences
- Show preview of each captured photo

#### Filter System
- Real-time CSS filter application
- 12+ filter presets:
  1. None (original)
  2. Vintage (sepia + contrast)
  3. Y2K (high saturation + pink tint)
  4. VHS (scanlines + color shift)
  5. Noir (grayscale + contrast)
  6. Retro Film (grain + warm)
  7. Cyberpunk (neon + purple)
  8. Neon Glow (bright + bloom)
  9. Anime (bright + soft)
  10. Warm Aesthetic (orange tint)
  11. Dreamy (blur + pastel)
  12. Film Grain (noise overlay)

#### Strip Generation
- Canvas-based rendering
- Layouts: 2-vertical, 3-vertical, 4-vertical
- Border styles:
  - None
  - Thin white
  - Polaroid (thick white bottom)
  - Neon colored
- Date stamp in corner
- Adjustable spacing between photos

#### Download System
- Generate high-quality PNG
- Auto-download on button click
- Share to social media (native share API)
- Clear all and start over

### 3.2 User Interactions

#### Landing Page:
- Mouse parallax on 3D scene
- Hover effects on all interactive elements
- Smooth scroll to features section
- Click "Start Booth" → navigate to booth

#### Photo Booth:
- Grant camera permission
- Select layout (2/3/4 photos)
- Choose filter (optional)
- Click capture → countdown → photo
- Repeat for all photos in sequence
- Review strip
- Retake or proceed
- Customize strip (borders, stickers, date)
- Download or share

### 3.3 Edge Cases
- Camera not available: Show error with instructions
- Permission denied: Show permission request guide
- Mobile rotation: Adapt camera view
- Low light: Show brightness warning
- Multiple captures: Queue system
- Browser compatibility: Fallback messages

---

## 4. Technical Specification

### 4.1 Tech Stack
- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion + GSAP
- **3D:** Three.js + React Three Fiber + @react-three/drei
- **State:** React useState + useContext
- **Camera:** WebRTC getUserMedia API
- **Canvas:** HTML5 Canvas API for strip generation

### 4.2 File Structure
```
src/
├── components/
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── GlassCard.jsx
│   │   ├── NeonText.jsx
│   │   └── LoadingSpinner.jsx
│   ├── camera/
│   │   ├── CameraView.jsx
│   │   ├── CaptureButton.jsx
│   │   ├── Countdown.jsx
│   │   └── CameraFrame.jsx
│   ├── filters/
│   │   ├── FilterPanel.jsx
│   │   └── FilterPreview.jsx
│   ├── booth/
│   │   ├── PhotoStrip.jsx
│   │   ├── StripCustomizer.jsx
│   │   └── StickerOverlay.jsx
│   └── three/
│       ├── Scene.jsx
│       ├── FloatingCard.jsx
│       ├── Particles.jsx
│       └── HolographicRing.jsx
├── pages/
│   ├── Home.jsx
│   └── Photobooth.jsx
├── hooks/
│   ├── useCamera.js
│   └── useSound.js
├── utils/
│   ├── filters.js
│   ├── canvas.js
│   └── download.js
├── data/
│   └── stickers.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## 5. Acceptance Criteria

### Visual Checkpoints:
- [ ] Landing page loads with 3D animated scene
- [ ] Navbar is glassmorphic and visible
- [ ] Hero text animates on load
- [ ] Camera preview shows live feed
- [ ] Countdown animates 3-2-1 with flash
- [ ] Captured photos display in grid
- [ ] Filter changes apply in real-time
- [ ] Strip generates with correct layout
- [ ] Download produces valid PNG file
- [ ] Mobile layout is fully functional

### Functional Checkpoints:
- [ ] Camera permission request works
- [ ] Multiple photos can be captured in sequence
- [ ] All 12 filters apply correctly
- [ ] Strip layouts (2/3/4) work
- [ ] Border customization works
- [ ] Date overlay toggles on/off
- [ ] Download triggers file save
- [ ] Responsive on mobile/tablet/desktop
- [ ] Animations are smooth (60fps)
- [ ] Privacy notice visible

### Performance Targets:
- Initial load: < 3 seconds
- Camera start: < 1 second
- Filter apply: < 100ms
- Strip generate: < 500ms
- Download: < 1 second

---

## 6. Privacy Notice

Display prominent notice: "Your photos never leave your device."

All processing happens locally in the browser. No data is sent to any server. Photos exist only in memory and are downloaded directly to user's device.