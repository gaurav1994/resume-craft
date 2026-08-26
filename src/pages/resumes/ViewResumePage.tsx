import { ArrowLeft, BriefcaseBusiness, GraduationCap, Sparkles } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import ResumeContactBlock from '../../components/resume-view/ResumeContactBlock'
import ResumeViewHeader from '../../components/resume-view/ResumeViewHeader'
import ResumeViewSection from '../../components/resume-view/ResumeViewSection'
import styles from './ViewResumePage.module.css'
import { getResumes } from './resumeStore'

function ViewResumePage() {
  const { resumeId } = useParams()
  const resume = getResumes().find((item) => item.id === Number(resumeId))

  if (!resume) {
    return (
      <main className={styles.page}>
        <div className="mx-auto max-w-225">
          <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[1.8px] text-[#d97964]">ResumeCraft</p>
          <h1 className="font-serif text-5xl font-bold text-[#18232b]">Resume not found</h1>
          <Link className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#18232b] px-5 py-3 text-sm font-bold text-white" to="/resumes"><ArrowLeft size={16} /> Back to resumes</Link>
        </div>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <article className={styles.canvas}>
        <ResumeViewHeader resume={resume} />
        <div className={styles.identity}>
          <h2>{resume.fullName || 'Your Name'}</h2>
          <p>{resume.role || 'Professional title'}</p>
        </div>
        <ResumeContactBlock resume={resume} />
        <div>
          <ResumeViewSection title="Profile">
            <p className="max-w-170 text-[15px] leading-7 text-[#66756f]">{resume.summary.profSummary || 'Add a professional summary to introduce your experience and the value you bring.'}</p>
          </ResumeViewSection>
          <ResumeViewSection title="Experience">
            <div className="space-y-5">{resume.experience.length > 0 ? resume.experience.map((item) => <div className="flex gap-4" key={`${item.company}-${item.date}`}><BriefcaseBusiness className="mt-1 shrink-0 text-[#d97964]" size={18} /><div><h3 className="m-0 text-sm font-extrabold text-[#18232b]">{item.designation}</h3><p className="mt-1 text-xs font-bold text-[#d97964]">{item.company} · {item.date}</p><p className="mt-2 text-sm leading-6 text-[#71807a]">{item.details}</p></div></div>) : <p className="text-sm leading-6 text-[#71807a]">Add your most relevant experience from the builder to complete this section.</p>}</div>
          </ResumeViewSection>
          <ResumeViewSection title="Education">
            <div className="flex gap-4"><GraduationCap className="mt-1 shrink-0 text-[#d97964]" size={18} /><div><h3 className="m-0 text-sm font-extrabold text-[#18232b]">Education and learning</h3><p className="mt-2 text-sm leading-6 text-[#71807a]">Highlight the education, certifications, and learning that support your story.</p></div></div>
          </ResumeViewSection>
          <ResumeViewSection title="Skills">
            <div className="flex flex-wrap gap-2"><span className="inline-flex items-center gap-1.5 rounded-full bg-[#fbe8e2] px-3 py-1.5 text-xs font-bold text-[#a95747]"><Sparkles size={12} /> Add your skills</span><span className="rounded-full border border-dashed border-[#cbd8d1] px-3 py-1.5 text-xs text-[#87938e]">More to come</span></div>
          </ResumeViewSection>
        </div>
      </article>
    </main>
  )
}

export default ViewResumePage
