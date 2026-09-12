import { appConfig, backendApi } from '../config/env'
import type { Resume } from '../pages/resumes/resumeStore'
import { ApiError, BACKEND_UNAVAILABLE_MESSAGE } from './apiError'

const safeString = (value: unknown, fallback = '') => typeof value === 'string' ? value : fallback
const safeNumber = (value: unknown, fallback = 0) => typeof value === 'number' ? value : fallback

const normalizeResume = (payload: unknown): Resume | undefined => {
  if (!payload || typeof payload !== 'object') {
    return undefined
  }

  const record = payload as Record<string, unknown>
  const contactInformation = record.contactInformation && typeof record.contactInformation === 'object'
    ? record.contactInformation as Record<string, unknown>
    : {}

  const summary = record.summary && typeof record.summary === 'object'
    ? record.summary as Record<string, unknown>
    : {}

  const experience = Array.isArray(record.experience)
    ? record.experience.map((item) => ({
        company: safeString((item as Record<string, unknown>)?.company),
        designation: safeString((item as Record<string, unknown>)?.designation),
        date: safeString((item as Record<string, unknown>)?.date),
        details: safeString((item as Record<string, unknown>)?.details),
      }))
    : []

  const projects = Array.isArray(record.projects)
    ? record.projects.map((item) => ({
        projectTitle: safeString((item as Record<string, unknown>)?.projectTitle),
        url: safeString((item as Record<string, unknown>)?.url),
        date: safeString((item as Record<string, unknown>)?.date),
        details: safeString((item as Record<string, unknown>)?.details),
      }))
    : []

  const education = Array.isArray(record.education)
    ? record.education.map((item) => ({
        institute: safeString((item as Record<string, unknown>)?.institute),
        degree: safeString((item as Record<string, unknown>)?.degree),
        date: safeString((item as Record<string, unknown>)?.date),
        details: safeString((item as Record<string, unknown>)?.details),
      }))
    : []

  const skills = Array.isArray(record.skills)
    ? record.skills.map((item) => safeString(item))
    : []

  return {
    id: safeNumber(record.id, Number(record.id ?? 0)),
    title: safeString(record.title),
    contactInformation: {
      firstName: safeString(contactInformation.firstName),
      lastName: safeString(contactInformation.lastName),
      email: safeString(contactInformation.email),
      phone: safeString(contactInformation.phone),
      website: safeString(contactInformation.website),
      address: safeString(contactInformation.address),
    },
    summary: {
      headline: safeString(summary.headline),
      profSummary: safeString(summary.profSummary),
    },
    experience,
    projects,
    education,
    skills,
    currentRole: safeString(record.currentRole),
    updated: safeString(record.updated),
  }
}

const normalizeResumePayload = (payload: unknown): Resume[] => {
  if (Array.isArray(payload)) {
    return payload.map((item) => normalizeResume(item)).filter((item): item is Resume => Boolean(item))
  }

  if (payload && typeof payload === 'object' && Array.isArray((payload as { resumes?: unknown[] }).resumes)) {
    return ((payload as { resumes: unknown[] }).resumes)
      .map((item: unknown) => normalizeResume(item))
      .filter((item): item is Resume => Boolean(item))
  }

  return []
}

export async function fetchResumes(): Promise<Resume[]> {
  if (!appConfig.apiBaseUrl) {
    throw new ApiError(BACKEND_UNAVAILABLE_MESSAGE)
  }

  try {
    const response = await fetch(backendApi.resumesUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throwApiError(response.status)
    }

    const payload = await response.json()
    const parsed = normalizeResumePayload(payload)
    return parsed
  } catch (error) {
    throw getApiError(error)
  }
}

export async function fetchResumeById(id: number | string): Promise<Resume | undefined> {
  if (!appConfig.apiBaseUrl) {
    throw new ApiError(BACKEND_UNAVAILABLE_MESSAGE)
  }

  try {
    const response = await fetch(`${backendApi.resumesUrl}/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throwApiError(response.status)
    }

    const payload = await response.json()
    return normalizeResume(payload)
  } catch (error) {
    throw getApiError(error)
  }
}

export async function createResume(resume: Resume): Promise<Resume | undefined> {
  if (!appConfig.apiBaseUrl) {
    throw new ApiError(BACKEND_UNAVAILABLE_MESSAGE)
  }

  try {
    const response = await fetch(backendApi.resumesUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(resume),
    })

    if (!response.ok) {
      throwApiError(response.status)
    }

    const payload = await response.json()
    return normalizeResume(payload) ?? resume
  } catch (error) {
    throw getApiError(error)
  }
}

export async function updateResume(resume: Resume): Promise<Resume | undefined> {
  if (!appConfig.apiBaseUrl) {
    throw new ApiError(BACKEND_UNAVAILABLE_MESSAGE)
  }

  try {
    const response = await fetch(`${backendApi.resumesUrl}/${resume.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(resume),
    })

    if (!response.ok) {
      throwApiError(response.status)
    }

    const payload = await response.json()
    return normalizeResume(payload) ?? resume
  } catch (error) {
    throw getApiError(error)
  }
}

export async function deleteResume(id: number | string): Promise<boolean> {
  if (!appConfig.apiBaseUrl) {
    throw new ApiError(BACKEND_UNAVAILABLE_MESSAGE)
  }

  try {
    const response = await fetch(`${backendApi.resumesUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throwApiError(response.status)
    }

    return true
  } catch (error) {
    throw getApiError(error)
  }
}

function throwApiError(status?: number): never {
  throw new ApiError(BACKEND_UNAVAILABLE_MESSAGE, status)
}

function getApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error
  }

  if (error instanceof Error) {
    return new ApiError(error.message || BACKEND_UNAVAILABLE_MESSAGE)
  }

  return new ApiError(BACKEND_UNAVAILABLE_MESSAGE)
}

