import { ArrowLeft, CalendarDays, FilePenLine } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Resume } from '../../pages/resumes/resumeStore'

type ResumeViewHeaderProps = Readonly<{ resume: Resume }>

function ResumeViewHeader({ resume }: ResumeViewHeaderProps) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-5 border-b border-[#dfe5e0] pb-7">
      <div>
        <Link className="mb-7 inline-flex items-center gap-2 text-xs font-bold text-[#71807a] transition hover:text-[#d97964]" to="/resumes"><ArrowLeft size={14} /> Back to my resumes</Link>
        <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[1.8px] text-[#d97964]">Resume preview</p>
        <h1 className="m-0  text-4xl font-bold tracking-tight text-[#d97964] sm:text-5xl">{resume.title}</h1>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-[#87918d]"><CalendarDays size={13} /> {resume.updated}</p>
      </div>
      <Link className="inline-flex items-center gap-2 rounded-lg bg-[#18232b] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#2c414a]" to={`/resumes/${resume.id}/edit`}><FilePenLine size={14} /> Edit resume</Link>
    </header>
  )
}

export default ResumeViewHeader
