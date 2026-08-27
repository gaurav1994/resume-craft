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

export type Resume = {
  id: number
  title: string
  contactInformation: ContactInformation
  summary: ResumeSummary
  experience: Experience[]
  currentRole: string
  updated: string
  fullName: string
  role: string
  email: string
  phone: string
  location: string
}

export const resumesStorageKey = `resumecraft-resumes-${appConfig.environment}`

export const defaultResumes: Resume[] = [
  {
    id: 1, title: 'Senior Java Backend Resume', currentRole: 'Software Engineering', role: 'Software Engineering', updated: 'Updated today',
    fullName: 'Gaurav Singh', email: 'gkgarry911@gmail.com', phone: '8076926462', location: 'Pune, Maharashtra',
    contactInformation: { firstName: 'Gaurav', lastName: 'Singh', email: 'gkgarry911@gmail.com', phone: '8076926462', website: '', address: 'Pune, Maharashtra' },
    summary: { headline: 'Senior Java Backend Engineer', profSummary: 'Backend engineer building reliable financial services with Java, Spring Boot, microservices, AWS, and Kafka.' },
    experience: [
      { company: 'Capgemini India Pvt. Ltd', designation: 'Java Backend Developer', date: 'Jan 2025 to July 2026', details: 'Designed scalable backend services using Java 17, Spring Boot, JPA, and REST APIs for enterprise financial applications.' },
      { company: 'Coforge Pvt. Ltd.', designation: 'Senior Software Engineer', date: 'June 2023 to Dec 2024', details: 'Built event-driven services and improved API reliability across banking workflows.' },
    ],
  },
  {
    id: 2, title: 'Product Designer Resume', currentRole: 'Design & Creative', role: 'Design & Creative', updated: 'Updated 4 days ago',
    fullName: 'Gaurav Singh', email: 'gourav@example.com', phone: '+91 80769 26462', location: 'Pune, Maharashtra',
    contactInformation: { firstName: 'Gaurav', lastName: 'Singh', email: 'gourav@example.com', phone: '+91 80769 26462', website: 'gourav.design', address: 'Pune, Maharashtra'  },
    summary: { headline: 'Product Designer', profSummary: 'Product designer turning complex workflows into clear, useful experiences through research, systems thinking, and prototyping.' },
    experience: [
      { company: 'Northstar Labs', designation: 'Product Designer', date: 'Mar 2024 to Present', details: 'Led end-to-end design for a collaborative analytics platform used by distributed teams.' },
      { company: 'Studio Current', designation: 'UX Designer', date: 'Aug 2021 to Feb 2024', details: 'Created accessible interfaces and reusable patterns for B2B products.' },
    ],
  },
  {
    id: 3, title: 'General Resume', currentRole: 'Open to opportunities', role: 'Open to opportunities', updated: 'Updated 2 weeks ago',
    fullName: 'Gaurav Singh', email: 'gourav@example.com', phone: '+91 80769 26462', location: 'Pune, Maharashtra',
    contactInformation: { firstName: 'Gaurav', lastName: 'Singh', email: 'gourav@example.com', phone: '+91 80769 26462', website: '', address: 'Pune, Maharashtra' },
    summary: { headline: 'Software Professional', profSummary: 'Adaptable software professional who enjoys solving meaningful problems and collaborating across disciplines.' },
    experience: [
      { company: 'Independent Projects', designation: 'Software Developer', date: '2022 to Present', details: 'Delivered focused web and service projects from discovery through release.' },
    ],
  },
  {
    id: 4, title: 'Engineering Lead Resume', currentRole: 'Engineering Leadership', role: 'Engineering Leadership', updated: 'Updated last month',
    fullName: 'Gaurav Singh', email: 'gourav@example.com', phone: '+91 80769 26462', location: 'Bengaluru, India',
    contactInformation: { firstName: 'Gaurav', lastName: 'Singh', email: 'gourav@example.com', phone: '+91 80769 26462', website: '', address: 'Bengaluru, India' },
    summary: { headline: 'Engineering Lead', profSummary: 'Technical leader helping teams ship dependable platforms while creating a culture of clarity, ownership, and learning.' },
    experience: [
      { company: 'Atlas Systems', designation: 'Engineering Lead', date: '2021 to Present', details: 'Guided a team of engineers through platform modernization, delivery planning, and technical strategy.' },
      { company: 'Brightworks', designation: 'Software Engineer', date: '2017 to 2021', details: 'Developed high-volume services and mentored engineers across multiple product teams.' },
    ],
  },
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
