import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/ui/Navbar'
import Hero from '../components/ui/Hero'
import Features from '../components/ui/Features'
import Footer from '../components/ui/Footer'
import LoadingScreen from '../components/ui/LoadingScreen'

function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  const handleStartBooth = () => {
    navigate('/booth')
  }

  return (
    <AnimatePresence>
      {isLoading ? (
        <LoadingScreen key="loader" />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen gradient-bg"
        >
          <Navbar onStartBooth={handleStartBooth} />
          <Hero onStartBooth={handleStartBooth} />
          <Features />
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Home