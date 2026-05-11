import { motion } from 'framer-motion'

function CaptureButton({ onCapture, disabled, isCountingDown }) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onCapture}
      disabled={disabled || isCountingDown}
      className={`
        relative w-20 h-20 rounded-full flex items-center justify-center
        ${disabled || isCountingDown
          ? 'opacity-50 cursor-not-allowed'
          : 'cursor-pointer pink-box group'
        }
      `}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-primary to-coral opacity-20" />
      <div className="w-16 h-16 rounded-full bg-white border-4 border-pink-200 group-hover:border-pink-primary transition-colors flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-pink-100 group-hover:bg-pink-primary transition-colors" />
      </div>

      {!disabled && !isCountingDown && (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full border-2 border-pink-primary/50"
        />
      )}
    </motion.button>
  )
}

export default CaptureButton