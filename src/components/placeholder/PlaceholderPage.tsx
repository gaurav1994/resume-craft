import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import styles from './PlaceholderPage.module.css'

type PlaceholderPageProps = Readonly<{
  icon: LucideIcon
  title: string
  description: string
}>

function PlaceholderPage({ icon: Icon, title, description }: PlaceholderPageProps) {
  return (
    <main className="app-content">
      <div className="grid size-14 place-items-center rounded-2xl bg-[#f2effb] text-[#7657d8]">
        <Icon size={25} aria-hidden="true" />
      </div>
      <p className="eyebrow mt-8">ResumeCraft</p>
      <h1 className={styles.heading}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <Link className="mt-8 inline-flex rounded-lg bg-[#2f273d] px-5 py-3 text-sm font-bold text-white hover:bg-[#51409a]" to="/">
        Back to dashboard
      </Link>
    </main>
  )
}

export default PlaceholderPage
