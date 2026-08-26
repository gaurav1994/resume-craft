import { ArrowRight, FileText, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import styles from './DashboardPage.module.css'

function DashboardPage() {
  return (
    <main className="app-content">
      <p className="eyebrow">Your career, beautifully arranged</p>
      <h1 className={styles.heading}>Build a resume<br />that feels like you.</h1>
      <p className={styles.intro}>Create a polished resume with thoughtful templates and simple, focused tools.</p>
      <div className="mt-9 flex flex-wrap gap-3">
        <Link className="inline-flex items-center gap-2 rounded-lg bg-[#2f273d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#51409a]" to="/create">
          <Sparkles size={17} aria-hidden="true" />
          Create resume
        </Link>
        <Link className="inline-flex items-center gap-2 rounded-lg border border-[#e8e4ef] bg-white px-5 py-3 text-sm font-bold text-[#51409a] transition hover:bg-[#f2effb]" to="/resumes">
          <FileText size={17} aria-hidden="true" />
          View my resumes
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </main>
  )
}

export default DashboardPage
