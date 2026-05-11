import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import { stickers, frameStyles, borderColors, textColors, textFonts } from '../../data/stickers'

function StripPreview({ stripImage, onDownload, onEdit, onNewSession, onCustomize, currentConfig }) {
  const [showCustomizer, setShowCustomizer] = useState(false)
  const [placedStickers, setPlacedStickers] = useState([])
  const [draggedSticker, setDraggedSticker] = useState(null)
  const imageRef = useRef(null)
  const imageRectRef = useRef(null)

  const handleConfigChange = (key, value) => {
    onCustomize({ ...currentConfig, [key]: value, placedStickers })
  }

  const handleDragStart = (emoji, e) => {
    setDraggedSticker(emoji)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDrop = (e) => {
    e.preventDefault()
    if (!draggedSticker || !imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    const newSticker = {
      id: Date.now(),
      emoji: draggedSticker,
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    }

    const updatedStickers = [...placedStickers, newSticker]
    setPlacedStickers(updatedStickers)
    handleConfigChange('placedStickers', updatedStickers)
    setDraggedSticker(null)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const removeSticker = (id) => {
    const updatedStickers = placedStickers.filter(s => s.id !== id)
    setPlacedStickers(updatedStickers)
    handleConfigChange('placedStickers', updatedStickers)
  }

  const clearAllStickers = () => {
    setPlacedStickers([])
    handleConfigChange('placedStickers', [])
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="max-w-lg w-full my-8"
      >
        <div className="text-center mb-4">
          <h2 className="text-2xl font-orbitron font-bold gradient-text-pink mb-1">
            Your Photo Strip
          </h2>
          <p className="text-gray-400 font-exo text-sm">Drag stickers onto image or customize!</p>
        </div>

        <div 
          className="glass rounded-2xl p-4 mb-4 max-h-[50vh] overflow-y-auto relative"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="relative">
            <img
              ref={imageRef}
              src={stripImage}
              alt="Generated strip"
              className="max-w-[235px] w-full h-auto rounded-lg"
              draggable={false}
            />
            
            {placedStickers.map((sticker) => (
              <div
                key={sticker.id}
                className="absolute cursor-move text-4xl transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                style={{ left: `${sticker.x}%`, top: `${sticker.y}%` }}
                onClick={() => removeSticker(sticker.id)}
                title="Click to remove"
              >
                {sticker.emoji}
              </div>
            ))}
          </div>

          {placedStickers.length > 0 && (
            <div className="mt-3 flex justify-center">
              <button
                onClick={clearAllStickers}
                className="text-xs text-gray-500 hover:text-rose"
              >
                Clear all stickers
              </button>
            </div>
          )}
        </div>

        {!showCustomizer ? (
          <div className="space-y-3">
            <div className="mb-4">
              <p className="text-xs text-gray-400 mb-2 text-center">Drag stickers onto image:</p>
              <div className="flex gap-2 flex-wrap justify-center">
                {stickers.slice(0, 10).map((sticker) => (
                  <div
                    key={sticker.id}
                    draggable
                    onDragStart={(e) => handleDragStart(sticker.emoji, e)}
                    className="text-3xl p-2 hover:bg-pink-50 rounded-lg cursor-grab active:cursor-grabbing transition-colors"
                  >
                    {sticker.emoji}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onDownload}
              className="w-full py-4 pink-button rounded-2xl font-orbitron font-bold text-lg flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Strip
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowCustomizer(true)}
                className="py-3 glass rounded-xl font-exo text-gray-600 hover:bg-pink-50 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                Customize
              </button>
              <button
                onClick={onNewSession}
                className="py-3 glass rounded-xl font-exo text-gray-600 hover:bg-pink-50 transition-colors"
              >
                New Session
              </button>
            </div>

            <button
              onClick={onEdit}
              className="w-full py-3 text-gray-400 hover:text-rose transition-colors font-exo"
            >
              ← Back to Capture
            </button>
          </div>
        ) : (
          <div className="space-y-4 glass rounded-2xl p-4 max-h-[60vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-orbitron font-semibold text-gray-700">Customize Strip</h3>
              <button 
                onClick={() => setShowCustomizer(false)}
                className="text-gray-400 hover:text-rose"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div>
              <label className="text-gray-500 text-sm mb-2 block">Frame Style</label>
              <div className="flex gap-2 flex-wrap">
                {frameStyles.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => handleConfigChange('borderStyle', style.id)}
                    className={`
                      px-3 py-2 rounded-lg font-exo text-sm
                      ${currentConfig.borderStyle === style.id
                        ? 'pink-gradient text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-pink-50'
                      }
                    `}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-gray-500 text-sm mb-2 block">Border Color</label>
              <div className="flex gap-2 flex-wrap">
                {borderColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => handleConfigChange('borderColor', color.value)}
                    className={`
                      w-8 h-8 rounded-full border-2 transition-all
                      ${currentConfig.borderColor === color.value ? 'border-rose scale-110' : 'border-gray-200'}
                    `}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-gray-500 text-sm">Show Date</label>
              <button
                onClick={() => handleConfigChange('showDate', !currentConfig.showDate)}
                className={`
                  w-12 h-6 rounded-full transition-colors relative
                  ${currentConfig.showDate ? 'bg-pink-primary' : 'bg-gray-300'}
                `}
              >
                <div className={`
                  absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform
                  ${currentConfig.showDate ? 'left-7' : 'left-1'}
                `} />
              </button>
            </div>

            <div>
              <label className="text-gray-500 text-sm mb-2 block">Custom Text</label>
              <input
                type="text"
                placeholder="Enter your text..."
                value={currentConfig.customText || ''}
                onChange={(e) => handleConfigChange('customText', e.target.value)}
                maxLength={30}
                className="w-full px-4 py-3 glass rounded-xl font-exo text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-primary"
              />
            </div>

            <div>
              <label className="text-gray-500 text-sm mb-2 block">Text Color</label>
              <div className="flex gap-2 flex-wrap">
                {textColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => handleConfigChange('textColor', color.value)}
                    className={`
                      w-8 h-8 rounded-full border-2 transition-all
                      ${currentConfig.textColor === color.value ? 'border-rose scale-110' : 'border-gray-200'}
                    `}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-gray-500 text-sm mb-2 block">Text Font</label>
              <div className="flex gap-2 flex-wrap">
                {textFonts.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => handleConfigChange('textFont', font.id)}
                    className={`
                      px-3 py-2 rounded-lg font-exo text-sm
                      ${currentConfig.textFont === font.id
                        ? 'pink-gradient text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-pink-50'
                      }
                    `}
                    style={{ fontFamily: font.id }}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={onDownload}
                className="flex-1 py-3 pink-button rounded-xl font-orbitron font-semibold flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
              <button
                onClick={onNewSession}
                className="flex-1 py-3 glass rounded-xl font-exo text-gray-600 hover:bg-pink-50"
              >
                New
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default StripPreview