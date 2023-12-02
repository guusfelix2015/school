import { atom, selector } from 'recoil'
import { type User } from '@prisma/client'
import { getAccessToken, removeAccessToken } from '../auth'

interface AuthState {
  user?: User
}

export const authState = atom<AuthState>({
  key: 'auth',
  default: { user: undefined },
  effects: [
    ({ onSet }) => {
      onSet((value, oldValue, reset) => {
        if (reset) {
          removeAccessToken()
        }
      })
    },
  ],
})

export const isAuthenticatedState = selector({
  key: 'auth/isAuthenticated',
  get: () => {
    const accessToken = getAccessToken()
    return !!accessToken
  },
})
