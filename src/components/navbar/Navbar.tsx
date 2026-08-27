import { FileText, LayoutDashboard, Mail, Menu, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

type NavItem = {
  label: string
  href: string
  icon: typeof FileText
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: LayoutDashboard },
  { label: 'My resumes', href: '/resumes', icon: FileText },
  { label: 'Templates', href: '/templates', icon: Sparkles },
  { label: 'Contact us', href: '/contact', icon: Mail },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className={styles.shell}>
      <nav className={styles.navbar} aria-label="Main navigation">
        <Link className={styles.brand} to="/" aria-label="ResumeCraft home">
          <span className={styles.brandMark}>RC</span>
          <span className={styles.brandName}>ResumeCraft</span>
        </Link>

        <div id="main-navigation-links" className={`${styles.links} ${isMenuOpen ? styles.open : ''}`}>
          {navItems.map(({ label, href, icon: Icon }) => (
            <NavLink
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
              to={href}
              key={label}
              onClick={() => setIsMenuOpen(false)}
            >
              <Icon size={17} strokeWidth={1.9} aria-hidden="true" />
              {label}
            </NavLink>
          ))}
          <Link className={`${styles.link} ${styles.mobileAction}`} to="/create" onClick={() => setIsMenuOpen(false)}>
            <Sparkles size={17} strokeWidth={1.9} aria-hidden="true" />
            Create resume
          </Link>
        </div>

        <div className={styles.actions}>
          <Link className={styles.createButton} to="/create">
            <Sparkles size={17} strokeWidth={2} aria-hidden="true" />
            Create resume
          </Link>
          <button
            className={styles.menuButton}
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="main-navigation-links"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
