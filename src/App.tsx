import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-content">
        <p className="eyebrow">Your career, beautifully arranged</p>
        <h1>Build a resume<br />that feels like you.</h1>
        <p className="app-intro">Create a polished resume with thoughtful templates and simple, focused tools.</p>
      </main>
    </div>
  )
}

export default App
