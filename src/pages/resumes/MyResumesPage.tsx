import { CalendarDays, Eye, FileText, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './MyResumesPage.module.css'
import { getResumes, type Resume } from './resumeStore'

function ResumePreview() {
  return (
    <div className={styles.preview} aria-hidden="true">
      <div className={styles.paper}>
        <h3>Gourav Singh</h3>
        <p>Frontend developer</p>
        <span /><span /><span /><span />
        <div className="mt-5 h-1 w-1/3 bg-[#d9d4e4]" />
        <span /><span /><span />
      </div>
    </div>
  )
}

function MyResumesPage() {
  const [query, setQuery] = useState('')
  const [resumes] = useState<Resume[]>(() => getResumes())
  const visibleResumes = resumes.filter((resume) => `${resume.title} ${resume.role}`.toLowerCase().includes(query.toLowerCase()))

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <p className="eyebrow">Your career workspace</p>
            <h1 className={styles.heading}>My resumes</h1>
            <p className={styles.description}>Keep every version of your career story in one calm, organized place.</p>
          </div>
          <Link className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#2f273d] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#51409a]" to="/create">
            <Plus size={17} aria-hidden="true" /> Create resume
          </Link>
        </header>

        <div className={styles.toolbar}>
          <label className={styles.search}>
            <Search className={styles.searchIcon} size={16} aria-hidden="true" />
            <span className="sr-only">Search resumes</span>
            <input type="search" placeholder="Search resumes" value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <span className={styles.count}>{visibleResumes.length} {visibleResumes.length === 1 ? 'resume' : 'resumes'}</span>
        </div>

        {visibleResumes.length > 0 ? (
          <div className={styles.grid}>
            {visibleResumes.map((resume) => (
              <article className={styles.card} key={resume.id}>
                <ResumePreview />
                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{resume.title}</h2>
                  <p className={styles.meta}>{resume.role}</p>
                  <p className={`${styles.meta} flex items-center gap-1`}><CalendarDays size={12} aria-hidden="true" /> {resume.updated}</p>
                  <div className={styles.actions}>
                    <Link className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-[#2f273d] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#51409a]" to={`/resumes/${resume.id}/edit`}><Pencil size={13} aria-hidden="true" /> Edit</Link>
                    <Link className="inline-flex items-center justify-center rounded-md border border-[#e4e0eb] bg-white px-3 py-2 text-[#7657d8] transition hover:bg-[#f2effb]" to={`/resumes/${resume.id}/view`} aria-label={`View ${resume.title}`}><Eye size={15} aria-hidden="true" /></Link>
                    <button className="inline-flex items-center justify-center rounded-md border border-[#e4e0eb] bg-white px-3 py-2 text-[#a87883] transition hover:bg-[#fff3f4]" type="button" aria-label={`Delete ${resume.title}`}><Trash2 size={15} aria-hidden="true" /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-dashed border-[#d8d1e5] bg-white/70 px-6 py-16 text-center">
            <FileText className="mx-auto text-[#7657d8]" size={28} aria-hidden="true" />
            <h2 className="mt-4 text-lg font-bold text-[#2f273d]">No resumes found</h2>
            <p className="mt-2 text-sm text-[#777184]">Try another search or create a new resume.</p>
          </div>
        )}
      </div>
    </main>
  )
}

export default MyResumesPage
