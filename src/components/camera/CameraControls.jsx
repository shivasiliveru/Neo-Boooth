import { motion } from 'framer-motion'
import CaptureButton from '../captureButton/CaptureButton'

function CameraControls({ layout, setLayout, onCapture, canCapture, isCountingDown, onToggleFilters, showFilters, progress, cameraOn, onCameraToggle, facingMode, onFlipCamera }) {
  const layouts = [
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4"
    >
      <div className="w-full max-w-md">
        <div className="h-1.5 bg-pink-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full pink-gradient"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
        <button
          onClick={onCameraToggle}
          className={`
            p-3 sm:p-4 rounded-full transition-all
            ${cameraOn 
              ? 'glass text-rose hover:bg-pink-50' 
              : 'pink-gradient text-white pink-box'
            }
          `}
          title={cameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
        >
          {cameraOn ? (
            <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          ) : (
            <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          )}
        </button>

        <button
          onClick={onFlipCamera}
          className="lg:hidden p-3 sm:p-4 rounded-full glass text-gray-500 hover:text-rose hover:bg-pink-50 transition-all"
          title="Flip Camera"
        >
          <svg className="w-5 sm:w-6 h-5 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        <div className="flex items-center gap-1 sm:gap-2 glass rounded-full p-1.5 sm:p-2">
          {layouts.map((l) => (
            <button
              key={l.value}
              onClick={() => setLayout(l.value)}
              className={`
                px-4 py-2 rounded-full font-orbitron text-sm transition-all
                ${layout === l.value
                  ? 'pink-gradient text-white'
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              {l.label}
            </button>
          ))}
        </div>

        <CaptureButton onCapture={onCapture} disabled={!canCapture} isCountingDown={isCountingDown} />

        <button
          onClick={onToggleFilters}
          className={`
            p-4 rounded-full glass transition-all
            ${showFilters ? 'pink-box text-rose' : 'hover:bg-pink-50 text-gray-500'}
          `}
          title="Filters"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <p className="text-gray-400 text-sm font-exo">
        {!cameraOn 
          ? 'Turn on camera to capture' 
          : canCapture 
            ? 'Click to capture' 
            : isCountingDown 
              ? 'Get ready...' 
              : 'All photos captured'
        }
      </p>
    </motion.div>
  )
}

export default CameraControls