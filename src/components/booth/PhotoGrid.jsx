import { motion, AnimatePresence } from 'framer-motion'

function PhotoGrid({ photos, onRetake }) {
  if (photos.length === 0) {
    return (
      <div className="glass rounded-2xl p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-soft flex items-center justify-center">
          <svg className="w-8 h-8 text-pink-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-gray-400 font-exo">No photos yet</p>
        <p className="text-gray-300 text-sm font-exo mt-1">Capture your first photo!</p>
      </div>
    )
  }

  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-orbitron font-semibold text-gray-700">Captured Photos</h3>
        <span className="text-xs text-gray-400">{photos.length} photos</span>
      </div>
      
      <div className="photo-grid-scroll">
        <AnimatePresence>
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative flex-shrink-0"
            >
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-[235px] h-[235px] object-cover rounded-xl border-2 border-pink-light"
              />
              <div className="absolute -top-2 -left-2 w-6 h-6 pink-gradient rounded-full flex items-center justify-center text-white text-xs font-bold">
                {index + 1}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {photos.length > 0 && (
        <div className="mt-3 pt-3 border-t border-pink-100">
          <p className="text-xs text-gray-400 text-center">
            {photos.length < 4 ? `Need ${4 - photos.length} more photo(s)` : 'Ready to generate strip!'}
          </p>
        </div>
      )}
    </div>
  )
}

export default PhotoGrid