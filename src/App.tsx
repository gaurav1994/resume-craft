import './App.css'
import Navbar from './components/navbar/Navbar'
import { LayoutTemplate, Sparkles } from 'lucide-react'
import { Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/dashboard/DashboardPage'
import PlaceholderPage from './components/placeholder/PlaceholderPage'
import MyResumesPage from './pages/resumes/MyResumesPage'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/resumes" element={<MyResumesPage />} />
        <Route path="/templates" element={<PlaceholderPage icon={LayoutTemplate} title="Templates" description="Explore a growing collection of thoughtful resume templates for every kind of career story." />} />
        <Route path="/create" element={<PlaceholderPage icon={Sparkles} title="Create a resume" description="Start with a focused, beautifully structured resume built around your experience." />} />
        <Route path="*" element={<DashboardPage />} />
      </Routes>
    </div>
  )
}

export default App
