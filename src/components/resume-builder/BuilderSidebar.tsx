import { BriefcaseBusiness, FileText, FolderKanban, GraduationCap, Sparkles, UserRound } from 'lucide-react'
import styles from './BuilderSidebar.module.css'

type BuilderSidebarProps = Readonly<{ activeSection: string; onSelect: (section: string) => void }>

const sections = [
  { label: 'Basics', icon: UserRound },
  { label: 'Summary', icon: FileText },
  { label: 'Experience', icon: BriefcaseBusiness },
  { label: 'Projects', icon: FolderKanban },
  { label: 'Education', icon: GraduationCap },
  { label: 'Skills', icon: Sparkles },
]

function BuilderSidebar({ activeSection, onSelect }: BuilderSidebarProps) {
  return (
    <aside className={styles.rail} aria-label="Resume sections">
      <p className={styles.kicker}>Build your story</p>
      {sections.map(({ label, icon: Icon }, index) => (
        <button className={`${styles.item} ${activeSection === label ? styles.active : ''}`} type="button" key={label} onClick={() => onSelect(label)}>
          <span className={styles.number}>{index + 1}</span>
          <Icon size={16} aria-hidden="true" />
          {label}
        </button>
      ))}
      <div className={styles.progress} />
      <p className={styles.tip}>A clear resume is a guided conversation about the work you do best.</p>
    </aside>
  )
}

export default BuilderSidebar
