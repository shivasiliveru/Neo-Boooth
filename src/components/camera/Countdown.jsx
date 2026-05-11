import { motion, AnimatePresence } from 'framer-motion'

function Countdown({ number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/30 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={number}
          initial={{ scale: 2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[120px] font-orbitron font-bold text-white drop-shadow-lg"
        >
          {number}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Countdown