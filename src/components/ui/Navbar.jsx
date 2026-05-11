import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Navbar({ onStartBooth, showLogo, onBack }) {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-pink-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            {onBack && (
              <button className="p-2 hover:bg-pink-50 rounded-lg transition-colors mr-2">
                <svg className="w-5 h-5 text-rose" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl pink-gradient flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              {showLogo && (
                <span className="font-orbitron font-bold text-lg text-gray-700">NeoBooth</span>
              )}
            </div>
          </Link>

          {!showLogo && (
            <div className="flex items-center space-x-4">
              <button
                onClick={onStartBooth}
                className="px-6 py-2.5 pink-button rounded-full font-orbitron font-semibold text-sm"
              >
                Start Booth
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar