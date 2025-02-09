import * as React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import Navbar from './components/Navigation/Navbar'
import GraphsPage from './Pages/ChartsPage'

const App: React.FunctionComponent = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/graphs" element={<GraphsPage />} />
      </Routes>
    </Router>
  )
}

export default App
