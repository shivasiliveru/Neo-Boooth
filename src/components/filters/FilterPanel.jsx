import { motion } from 'framer-motion'
import { filters } from '../../utils/filters'

function FilterPanel({ selectedFilter, onSelectFilter, intensity, onIntensityChange, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-0 left-0 right-0 z-40 glass border-t border-pink-100 p-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-orbitron font-semibold text-lg text-gray-700">Filters</h3>
          <button onClick={onClose} className="p-2 hover:bg-pink-50 rounded-lg">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <label className="text-gray-500 text-sm mb-2 block">Intensity: {intensity}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={intensity}
            onChange={(e) => onIntensityChange(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => onSelectFilter(filter.id)}
              className={`
                flex-shrink-0 px-4 py-2 rounded-full font-exo text-sm transition-all
                ${selectedFilter === filter.id
                  ? 'pink-gradient text-white'
                  : 'glass text-gray-600 hover:bg-pink-50'
                }
              `}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default FilterPanel