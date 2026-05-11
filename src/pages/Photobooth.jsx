import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import CameraView from '../components/camera/CameraView'
import Countdown from '../components/camera/Countdown'
import PhotoGrid from '../components/booth/PhotoGrid'
import StripPreview from '../components/booth/StripPreview'
import FilterPanel from '../components/filters/FilterPanel'
import CameraControls from '../components/camera/CameraControls'
import { filters } from '../utils/filters'
import { generateStrip, downloadImage } from '../utils/canvas'
import Navbar from '../components/ui/Navbar'

function Photobooth() {
  const navigate = useNavigate()
  const [photos, setPhotos] = useState([])
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [layout, setLayout] = useState(4)
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [countdownNumber, setCountdownNumber] = useState(3)
  const [showFlash, setShowFlash] = useState(false)
  const [showStrip, setShowStrip] = useState(false)
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('none')
  const [filterIntensity, setFilterIntensity] = useState(100)
  const [cameraOn, setCameraOn] = useState(true)
  const [facingMode, setFacingMode] = useState('user')
  const [stripConfig, setStripConfig] = useState({
    borderColor: '#ffffff',
    borderStyle: 'polaroid',
    showDate: true,
    showStickers: false,
    spacing: 10,
    customText: '',
    textColor: '#ff8fa3',
    textFont: 'Arial',
    placedStickers: []
  })
  const [generatedStrip, setGeneratedStrip] = useState(null)
  const cameraRef = useRef(null)

  const totalPhotos = layout
  const currentFilter = filters.find(f => f.id === selectedFilter)

  const handleCameraToggle = () => {
    setCameraOn(!cameraOn)
  }

  const handleCapture = useCallback(async () => {
    if (isCountingDown || currentPhotoIndex >= totalPhotos || !cameraOn) return

    setIsCountingDown(true)

    for (let i = 3; i >= 1; i--) {
      setCountdownNumber(i)
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    setShowFlash(true)
    setTimeout(() => setShowFlash(false), 300)

    const canvas = cameraRef.current?.getCanvas()
    if (canvas && canvas.width > 0 && canvas.height > 0) {
      const captureCanvas = document.createElement('canvas')
      captureCanvas.width = 400
      captureCanvas.height = 400
      const ctx = captureCanvas.getContext('2d')
      
      const minDim = Math.min(canvas.width, canvas.height)
      const sx = (canvas.width - minDim) / 2
      const sy = (canvas.height - minDim) / 2
      
      ctx.drawImage(canvas, sx, sy, minDim, minDim, 0, 0, 400, 400)
      
      const dataUrl = captureCanvas.toDataURL('image/jpeg', 1.0)
      setPhotos(prev => [...prev, dataUrl])
      setCurrentPhotoIndex(prev => prev + 1)
    }

    setIsCountingDown(false)
  }, [isCountingDown, currentPhotoIndex, totalPhotos, cameraOn])

  const handleRetake = () => {
    setPhotos([])
    setCurrentPhotoIndex(0)
    setGeneratedStrip(null)
    setShowStrip(false)
  }

  const handleGenerateStrip = async () => {
    if (photos.length === 0) return
    const strip = await generateStrip(photos, {
      ...stripConfig,
      layout,
      filter: selectedFilter,
      filterIntensity,
      customText: stripConfig.customText
    })
    setGeneratedStrip(strip)
    setShowStrip(true)
  }

  const handleDownload = () => {
    if (!generatedStrip) return
    downloadImage(generatedStrip, `neobooth-strip-${Date.now()}.png`)
    setTimeout(() => {
      setCameraOn(false)
    }, 1000)
  }

  const handleNewSession = () => {
    handleRetake()
    setTimeout(() => {
      setCameraOn(false)
    }, 500)
  }

  const handleBackToCapture = () => {
    setShowStrip(false)
    setCameraOn(true)
  }

  const progress = (currentPhotoIndex / totalPhotos) * 100
  const canCapture = currentPhotoIndex < totalPhotos && !isCountingDown && cameraOn

  return (
    <div className="min-h-screen gradient-bg relative">
      <Navbar showLogo onBack={() => { setCameraOn(false); navigate('/') }} />

      <div className="pt-20 pb-8 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold gradient-text-pink">
            Capture Your Moment
          </h1>
          <p className="text-gray-500 mt-2 font-exo">
            {currentPhotoIndex} of {totalPhotos} photos captured
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="lg:col-span-2 order-1">
            <div className="relative aspect-[4/3] sm:aspect-video max-w-xl mx-auto">
              <CameraView
                key={selectedFilter + facingMode}
                ref={cameraRef}
                filter={currentFilter?.css || 'none'}
                filterIntensity={filterIntensity}
                cameraOn={cameraOn}
                facingMode={facingMode}
              />

              {showFlash && (
                <div className="absolute inset-0 bg-white camera-flash z-20" />
              )}

              <AnimatePresence>
                {isCountingDown && (
                  <Countdown number={countdownNumber} key={countdownNumber} />
                )}
              </AnimatePresence>

              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
                <motion.div
                  className="h-full pink-gradient"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {selectedFilter !== 'none' && cameraOn && !isCountingDown && (
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 px-2 sm:px-3 py-1 glass rounded-full">
                  <span className="text-xs font-exo text-gray-600">
                    <span className="hidden sm:inline">Filter: </span><span className="text-rose font-semibold">{currentFilter?.name}</span>
                  </span>
                </div>
              )}

              <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4">
                <div className="flex gap-2 overflow-x-auto py-2 px-1 glass rounded-xl">
                  {filters.slice(0, 8).map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFilter(f.id)}
                      className={`
                        flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-exo transition-all
                        ${selectedFilter === f.id 
                          ? 'pink-gradient text-white' 
                          : 'bg-white/50 text-gray-600 hover:bg-pink-100'
                        }
                      `}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <CameraControls
                layout={layout}
                setLayout={setLayout}
                onCapture={handleCapture}
                canCapture={canCapture}
                isCountingDown={isCountingDown}
                onToggleFilters={() => setShowFilterPanel(!showFilterPanel)}
                showFilters={showFilterPanel}
                progress={progress}
                cameraOn={cameraOn}
                onCameraToggle={handleCameraToggle}
                facingMode={facingMode}
                onFlipCamera={() => setFacingMode(facingMode === 'user' ? 'environment' : 'user')}
              />
            </div>
          </div>

          <div className="lg:col-span-1 order-2 space-y-4">
            <PhotoGrid photos={photos} onRetake={handleRetake} />

            {photos.length > 0 && !showStrip && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <button
                  onClick={handleGenerateStrip}
                  className="w-full py-4 pink-button rounded-2xl font-orbitron font-bold text-lg"
                >
                  Generate Strip
                </button>
                <button
                  onClick={handleRetake}
                  className="w-full py-3 px-6 glass rounded-xl font-exo text-gray-600 hover:text-rose transition-colors"
                >
                  Retake All
                </button>
              </motion.div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showFilterPanel && (
            <FilterPanel
              selectedFilter={selectedFilter}
              onSelectFilter={setSelectedFilter}
              intensity={filterIntensity}
              onIntensityChange={setFilterIntensity}
              onClose={() => setShowFilterPanel(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showStrip && generatedStrip && (
            <StripPreview
              stripImage={generatedStrip}
              onDownload={handleDownload}
              onEdit={handleBackToCapture}
              onNewSession={handleNewSession}
              onCustomize={async (config) => {
                setStripConfig(config)
                await new Promise(r => setTimeout(r, 50))
                if (photos.length > 0) {
                  const strip = await generateStrip(photos, {
                    ...config,
                    layout,
                    filter: selectedFilter,
                    filterIntensity
                  })
                  setGeneratedStrip(strip)
                }
              }}
              currentConfig={stripConfig}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Photobooth