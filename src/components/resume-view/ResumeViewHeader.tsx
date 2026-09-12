import { ArrowLeft, CalendarDays, ChevronDown, Download, FilePenLine } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Resume } from '../../pages/resumes/resumeStore'
import { downloadResumePdf } from '../../services/resumeService'
import styles from './ResumeViewHeader.module.css'

type ResumeViewHeaderProps = Readonly<{ resume: Resume }>

type PdfTemplate = {
  id: string
  name: string
  color: string
}

const pdfTemplates: PdfTemplate[] = [
  { id: 'orange', name: 'Orange', color: '#d97964' },
  { id: 'green', name: 'Green', color: '#658b69' },
  { id: 'red', name: 'Red', color: '#b6524b' },
  { id: 'purple', name: 'Purple', color: '#7657d8' },
  { id: 'black', name: 'Black', color: '#18232b' },
  { id: 'teal', name: 'Teal', color: '#3e8a8b' },
]

function ResumeViewHeader({ resume }: ResumeViewHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('orange')

  const handleDownload = async (template: string) => {
    setSelectedTemplate(template)
    setMenuOpen(false)

    try {
      await downloadResumePdf(resume.id, template)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.titleArea}>
        <Link className={styles.backLink} to="/resumes"><ArrowLeft size={14} /> Back to my resumes</Link>
        <p className={styles.kicker}>Resume preview</p>
        <h1 className={styles.title}>{resume.title}</h1>
        <p className={styles.updated}><CalendarDays size={13} /> {resume.updated}</p>
      </div>

      <div className={styles.actions}>
        <div className={styles.pdfMenu}>
          <button className={styles.pdfButton} onClick={() => setMenuOpen((open) => !open)}>
            <Download size={14} /> Download PDF <ChevronDown className={`${styles.chevron} ${menuOpen ? styles.chevronOpen : ''}`} size={14} />
          </button>
          {menuOpen && (
            <div className={styles.dropdown}>
              <p className={styles.dropdownTitle}>Choose color template</p>
              <div className={styles.templateGrid}>
                {pdfTemplates.map((template) => (
                  <button className={`${styles.templateOption} ${selectedTemplate === template.id ? styles.templateOptionActive : ''}`.trim()} key={template.id} onClick={() => handleDownload(template.id)}>
                    <span className={styles.templateSwatchWrap}>
                      <span className={styles.templateSwatch} style={{ backgroundColor: template.color }}></span>
                    </span>
                    <span className={styles.templateName}>{template.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link className={styles.editLink} to={`/resumes/${resume.id}/edit`}><FilePenLine size={14} /> Edit resume</Link>
      </div>
    </header>
  )
}

export default ResumeViewHeader
