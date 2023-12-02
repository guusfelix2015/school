import { getNow, parseDate } from '@/shared/utils'

export interface AccessTokenContext {
  accessToken: string
  expiresAt: string
}

export const AUTH_KEY = 'school-token'

export const saveAccessToken = (context: AccessTokenContext) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(context))
}

export const removeAccessToken = () => {
  localStorage.removeItem(AUTH_KEY)
}

export const getAccessToken = (): string | undefined => {
  const credentials = localStorage.getItem(AUTH_KEY)
  if (!credentials) return
  const { accessToken, expiresAt } = JSON.parse(credentials) as AccessTokenContext
  if (isExpired(new Date(expiresAt))) return
  return accessToken
}

export const isExpired = (expiresAt: Date): boolean => {
  const now = getNow()
  const expires = parseDate(expiresAt)
  return now.isAfter(expires)
}
