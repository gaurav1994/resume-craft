import { appConfig } from '../../config/env'

export type ContactInformation = {
  firstName: string
  lastName: string
  email: string
  phone: string
  website: string
  address: string
}

export type ResumeSummary = {
  headline: string
  profSummary: string
}

export type Experience = {
  company: string
  designation: string
  date: string
  details: string
}

export type Project = {
  projectTitle: string
  url: string
  date: string
  details: string
}

export type Education = {
  institute: string
  degree: string
  date: string
  details: string
}

export type Resume = {
  id: number
  title: string
  contactInformation: ContactInformation
  summary: ResumeSummary
  experience: Experience[]
  projects: Project[]
  education: Education[]
  skills: string[]
  currentRole: string
  updated: string
}

export const resumesStorageKey = `resumecraft-resumes-${appConfig.environment}`

export const defaultResumes: Resume[] = [
  {
    id: 1, title: 'Senior Java Backend Resume', currentRole: 'Software Engineering', updated: 'Updated today',
    contactInformation: { firstName: 'Gaurav', lastName: 'Singh', email: 'gkgarry911@gmail.com', phone: '8076926462', website: '', address: 'Pune, Maharashtra' },
    summary: { headline: 'Senior Java Backend Engineer', profSummary: 'Backend engineer building reliable financial services with Java, Spring Boot, microservices, AWS, and Kafka.' },
    experience: [
      { company: 'Capgemini India Pvt. Ltd', designation: 'Java Backend Developer', date: 'Jan 2025 to July 2026', details: 'Designed scalable backend services using Java 17, Spring Boot, JPA, and REST APIs for enterprise financial applications.' },
      { company: 'Coforge Pvt. Ltd.', designation: 'Senior Software Engineer', date: 'June 2023 to Dec 2024', details: 'Built event-driven services and improved API reliability across banking workflows.' },
    ],
    projects: [{ projectTitle: 'Banking Payments Platform', url: 'https://example.com/payments', date: 'Jan 2025 to July 2026', details: 'Designed scalable backend services using Java 17, Spring Boot, JPA, and REST APIs.' }],
    education: [{ institute: 'University of Pune', degree: 'Bachelor of Computer Applications', date: '2019 to 2022', details: 'Focused on software engineering and distributed systems.' }],
    skills: ['Java', 'Spring Boot', 'AWS', 'Kafka', 'Microservices'],
  },
  {
    id: 2, title: 'Product Designer Resume', currentRole: 'Design & Creative', updated: 'Updated 4 days ago',
    contactInformation: { firstName: 'Gaurav', lastName: 'Singh', email: 'gourav@example.com', phone: '+91 80769 26462', website: 'gourav.design', address: 'Pune, Maharashtra'  },
    summary: { headline: 'Product Designer', profSummary: 'Product designer turning complex workflows into clear, useful experiences through research, systems thinking, and prototyping.' },
    experience: [
      { company: 'Northstar Labs', designation: 'Product Designer', date: 'Mar 2024 to Present', details: 'Led end-to-end design for a collaborative analytics platform used by distributed teams.' },
      { company: 'Studio Current', designation: 'UX Designer', date: 'Aug 2021 to Feb 2024', details: 'Created accessible interfaces and reusable patterns for B2B products.' },
    ],
    projects: [{ projectTitle: 'Analytics Workspace', url: 'https://example.com/analytics', date: 'Mar 2024 to Present', details: 'Led end-to-end design for a collaborative analytics platform.' }],
    education: [{ institute: 'National Institute of Design', degree: 'Diploma in Interaction Design', date: '2018 to 2021', details: 'Studied research, interaction design, and visual communication.' }],
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Accessibility'],
  },
  {
    id: 3, title: 'General Resume', currentRole: 'Open to opportunities', updated: 'Updated 2 weeks ago',
    contactInformation: { firstName: 'Gaurav', lastName: 'Singh', email: 'gourav@example.com', phone: '+91 80769 26462', website: '', address: 'Pune, Maharashtra' },
    summary: { headline: 'Software Professional', profSummary: 'Adaptable software professional who enjoys solving meaningful problems and collaborating across disciplines.' },
    experience: [
      { company: 'Independent Projects', designation: 'Software Developer', date: '2022 to Present', details: 'Delivered focused web and service projects from discovery through release.' },
    ],
    projects: [{ projectTitle: 'ResumeCraft', url: 'https://example.com/resumecraft', date: '2022 to Present', details: 'Delivered a focused resume builder from discovery through release.' }],
    education: [{ institute: 'Open Learning Institute', degree: 'Certificate in Web Development', date: '2021 to 2022', details: 'Built a foundation in modern web development.' }],
    skills: ['TypeScript', 'React', 'Node.js', 'CSS', 'Problem Solving'],
  },
  {
    id: 4, title: 'Engineering Lead Resume', currentRole: 'Engineering Leadership', updated: 'Updated last month',
    contactInformation: { firstName: 'Gaurav', lastName: 'Singh', email: 'gourav@example.com', phone: '+91 80769 26462', website: '', address: 'Bengaluru, India' },
    summary: { headline: 'Engineering Lead', profSummary: 'Technical leader helping teams ship dependable platforms while creating a culture of clarity, ownership, and learning.' },
    experience: [
      { company: 'Atlas Systems', designation: 'Engineering Lead', date: '2021 to Present', details: 'Guided a team through platform modernization, delivery planning, and technical strategy.' },
      { company: 'Brightworks', designation: 'Software Engineer', date: '2017 to 2021', details: 'Developed high-volume services and mentored engineers across multiple product teams.' },
    ],
    projects: [{ projectTitle: 'Platform Modernization', url: '', date: '2021 to Present', details: 'Guided a team through platform modernization and technical strategy.' }],
    education: [{ institute: 'Institute of Technology', degree: 'Bachelor of Engineering', date: '2013 to 2017', details: 'Studied computer science and software architecture.' }],
    skills: ['Leadership', 'System Design', 'Java', 'Cloud Architecture', 'Mentoring'],
  },
]

export function getResumes(): Resume[] {
  const stored = window.localStorage.getItem(resumesStorageKey)
  if (!stored) return defaultResumes

  try {
    const parsed = JSON.parse(stored) as Partial<Resume>[]
    return parsed.map((resume) => ({
      ...defaultResumes[0],
      ...resume,
      currentRole: resume.currentRole ?? '',
      contactInformation: { ...defaultResumes[0].contactInformation, ...resume.contactInformation },
      summary: { ...defaultResumes[0].summary, ...resume.summary },
      skills: resume.skills ?? [],
      education: resume.education ?? [],
      experience: (resume.experience ?? []).map((item) => normalizeExperience(item)),
      projects: (resume.projects ?? []).map((item) => normalizeProject(item)),
    }))
  } catch {
    return defaultResumes
  }
}

function normalizeExperience(item: unknown): Experience {
  if (!item || typeof item !== 'object') return { company: '', designation: '', date: '', details: '' }

  const record = item as Record<string, unknown>
  return {
    company: typeof record.company === 'string' ? record.company : '',
    designation: typeof record.designation === 'string' ? record.designation : '',
    date: typeof record.date === 'string' ? record.date : '',
    details: typeof record.details === 'string' ? record.details : '',
  }
}

function normalizeProject(item: unknown): Project {
  if (!item || typeof item !== 'object') return { projectTitle: '', url: '', date: '', details: '' }
  const record = item as Record<string, unknown>
  return {
    projectTitle: typeof record.projectTitle === 'string' ? record.projectTitle : '',
    url: typeof record.url === 'string' ? record.url : '',
    date: typeof record.date === 'string' ? record.date : '',
    details: typeof record.details === 'string' ? record.details : '',
  }
}

export function saveResumes(resumes: Resume[]) {
  window.localStorage.setItem(resumesStorageKey, JSON.stringify(resumes))
}
