export const BACKEND_UNAVAILABLE_MESSAGE = 'Backend not available at this moment.'

export class ApiError extends Error {
  public readonly status?: number

  constructor(message = BACKEND_UNAVAILABLE_MESSAGE, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export function normalizeApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error
  }

  if (error instanceof Error) {
    return new ApiError(error.message || BACKEND_UNAVAILABLE_MESSAGE)
  }

  return new ApiError(BACKEND_UNAVAILABLE_MESSAGE)
}

export function getApiErrorMessage(error: unknown): string {
  return normalizeApiError(error).message
}
