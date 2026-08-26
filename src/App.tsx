import './App.css'
import Navbar from './components/navbar/Navbar'
import { LayoutTemplate } from 'lucide-react'
import { Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/dashboard/DashboardPage'
import PlaceholderPage from './components/placeholder/PlaceholderPage'
import MyResumesPage from './pages/resumes/MyResumesPage'
import ResumeBuilderPage from './pages/resume-builder/ResumeBuilderPage'
import ViewResumePage from './pages/resumes/ViewResumePage'


function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/resumes" element={<MyResumesPage />} />
        <Route path="/resumes/:resumeId/edit" element={<ResumeBuilderPage mode='edit' />} />
        <Route path="/resumes/:resumeId/view" element={<ViewResumePage />} />
        <Route path="/templates" element={<PlaceholderPage icon={LayoutTemplate} title="Templates" description="Explore a growing collection of thoughtful resume templates for every kind of career story." />} />
        <Route path="/create" element={<ResumeBuilderPage mode='create' />} />
        <Route path="*" element={<DashboardPage />} />
      </Routes>
    </div>
  )
}

export default App
