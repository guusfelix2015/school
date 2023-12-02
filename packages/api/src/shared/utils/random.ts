import { nanoid } from 'nanoid'

export function generateRandomString(size?: number): string {
  return nanoid(size)
}
