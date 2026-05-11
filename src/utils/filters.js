export const filters = [
  { id: 'none', name: 'None', css: 'none', category: 'basic' },
  { id: 'vintage', name: 'Vintage', css: 'sepia(0.4) contrast(1.15) brightness(0.96) saturate(1.2)', category: 'aesthetic' },
  { id: 'y2k', name: 'Y2K', css: 'saturate(1.5) hue-rotate(-10deg) brightness(1.1) contrast(1.1)', category: 'aesthetic' },
  { id: 'vhs', name: 'VHS', css: 'saturate(1.4) contrast(1.15) brightness(1.03) sepia(0.08)', category: 'cinematic' },
  { id: 'noir', name: 'Noir', css: 'grayscale(1) contrast(1.3) brightness(0.9)', category: 'basic' },
  { id: 'retro', name: 'Retro', css: 'sepia(0.25) contrast(1.15) brightness(1.03) saturate(0.85)', category: 'aesthetic' },
  { id: 'cyberpunk', name: 'Cyber', css: 'saturate(1.6) hue-rotate(200deg) contrast(1.15) brightness(1.05)', category: 'cinematic' },
  { id: 'neon', name: 'Neon', css: 'brightness(1.12) saturate(1.6) contrast(1.15)', category: 'cinematic' },
  { id: 'anime', name: 'Anime', css: 'brightness(1.1) saturate(1.4) contrast(1.08)', category: 'aesthetic' },
  { id: 'warm', name: 'Warm', css: 'sepia(0.2) saturate(1.4) brightness(1.08)', category: 'aesthetic' },
  { id: 'dreamy', name: 'Dreamy', css: 'brightness(1.1) saturate(0.85) contrast(0.95)', category: 'aesthetic' },
  { id: 'film', name: 'Film', css: 'contrast(1.15) brightness(1.03) saturate(0.85) sepia(0.1)', category: 'aesthetic' },
  { id: 'golden', name: 'Golden', css: 'sepia(0.2) saturate(1.5) brightness(1.1)', category: 'aesthetic' },
  { id: 'moody', name: 'Moody', css: 'contrast(1.25) brightness(0.9) saturate(0.8)', category: 'cinematic' },
  { id: 'sunset', name: 'Sunset', css: 'saturate(1.5) sepia(0.15) hue-rotate(-12deg)', category: 'aesthetic' },
]

export const getFilterCSS = (filterId, intensity = 100) => {
  const filter = filters.find(f => f.id === filterId)
  if (!filter || filter.id === 'none') return 'none'
  return filter.css
}

export const getFilterPreview = (filterId) => {
  const filter = filters.find(f => f.id === filterId)
  return filter?.css || 'none'
}