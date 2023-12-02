export const PRODUCTION = import.meta.env.PROD

export const API_URL = PRODUCTION ? 'https://api.school.com' : 'http://localhost:3000/graphql'

export const BASE_URL = PRODUCTION ? 'https://school.com' : 'http://localhost:4000'
