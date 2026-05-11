import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Photobooth from './pages/Photobooth'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booth" element={<Photobooth />} />
      </Routes>
    </Router>
  )
}

export default App