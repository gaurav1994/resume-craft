export type Resume = {
  id: number
  title: string
  role: string
  updated: string
  summary: string
  fullName: string
  email: string
  phone: string
  location: string
}

export const resumesStorageKey = 'resumecraft-resumes'

export const defaultResumes: Resume[] = [
  { id: 1, title: 'Frontend Developer Resume', role: 'Software Engineering', updated: 'Updated today', summary: 'Frontend developer focused on building accessible, thoughtful digital products.', fullName: 'Gourav Singh', email: 'gourav@example.com', phone: '+91 80769 26462', location: 'Pune, Maharashtra' },
  { id: 2, title: 'Product Designer Resume', role: 'Design & Creative', updated: 'Updated 4 days ago', summary: 'Product designer who turns complex workflows into clear, useful experiences.', fullName: 'Gourav Singh', email: 'gourav@example.com', phone: '+91 80769 26462', location: 'Pune, Maharashtra' },
  { id: 3, title: 'General Resume', role: 'Open to opportunities', updated: 'Updated 2 weeks ago', summary: 'A flexible resume for new opportunities and meaningful collaborations.', fullName: 'Gourav Singh', email: 'gourav@example.com', phone: '+91 80769 26462', location: 'Pune, Maharashtra' },
]

export function getResumes(): Resume[] {
  const stored = window.localStorage.getItem(resumesStorageKey)
  if (!stored) return defaultResumes

  try {
    return JSON.parse(stored) as Resume[]
  } catch {
    return defaultResumes
  }
}

export function saveResumes(resumes: Resume[]) {
  window.localStorage.setItem(resumesStorageKey, JSON.stringify(resumes))
}
