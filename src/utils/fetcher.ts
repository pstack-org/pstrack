import { ZodError } from 'zod'

export type ApiResponse<T> = {
  status: number
  success?: boolean
  data?: T
  error?: string
  message?: string
}

export const fetcher = async <T, B = unknown>(
  url: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: B
): Promise<ApiResponse<T>> => {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(url, config)

  if (!response.ok) {
    const errorData = await response.json()

    if (errorData.error && errorData.error.includes('ZodError')) {
      throw new ZodError(JSON.parse(errorData.error))
    }

    throw new Error(errorData.error || 'Something went wrong')
  }

  return response.json()
}
