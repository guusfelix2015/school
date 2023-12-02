import { getAccessToken } from '@/auth'
import axios from 'axios'

export const PRODUCTION = import.meta.env.PROD

export const API_URL = PRODUCTION ? 'https://api.school.com' : 'http://localhost:3000'

export const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken()
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)
