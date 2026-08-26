import { Mail, MapPin, Phone } from 'lucide-react'
import type { Resume } from '../../pages/resumes/resumeStore'

type ResumeContactBlockProps = Readonly<{ resume: Resume }>

function ResumeContactBlock({ resume }: ResumeContactBlockProps) {
  const contacts = [
    { value: resume.email, icon: Mail },
    { value: resume.phone, icon: Phone },
    { value: resume.location, icon: MapPin },
  ]

  return (
    <div className="mt-7 grid gap-3 border-y border-[#dfe5e0] py-5 sm:grid-cols-3">
      {contacts.map(({ value, icon: Icon }) => (
        <div className="flex items-center gap-2 text-sm text-[#66756f]" key={value}><Icon size={15} className="shrink-0 text-[#d97964]" /> <span className="truncate">{value}</span></div>
      ))}
    </div>
  )
}

export default ResumeContactBlock
