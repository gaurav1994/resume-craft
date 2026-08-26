import { FileText, LayoutDashboard, Menu, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import './Navbar.css'

type NavItem = {
  label: string
  href: string
  icon: typeof FileText
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '#dashboard', icon: LayoutDashboard },
  { label: 'My resumes', href: '#resumes', icon: FileText },
  { label: 'Templates', href: '#templates', icon: Sparkles },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(true)

  return (
    <header className="navbar-shell">
      <nav className="navbar" aria-label="Main navigation">
        <a className="navbar-brand" href="#dashboard" aria-label="ResumeCraft home">
          <span className="brand-mark">RC</span>
          <span className="brand-name">ResumeCraft</span>
        </a>

        <div id="main-navigation-links" className={`navbar-links ${isMenuOpen ? 'is-open' : ''}`}>
          {navItems.map(({ label, href, icon: Icon }, index) => (
            <a
              className={`navbar-link ${index === 0 ? 'is-active' : ''}`}
              href={href}
              key={label}
              onClick={() => setIsMenuOpen(false)}
            >
              <Icon size={17} strokeWidth={1.9} aria-hidden="true" />
              {label}
            </a>
          ))}
          <a className="navbar-link navbar-link-mobile-action" href="#create" onClick={() => setIsMenuOpen(false)}>
            <Sparkles size={17} strokeWidth={1.9} aria-hidden="true" />
            Create resume
          </a>
        </div>

        <div className="navbar-actions">
          <a className="create-button" href="#create">
            <Sparkles size={17} strokeWidth={2} aria-hidden="true" />
            Create resume
          </a>
          <button
            className="menu-button"
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
