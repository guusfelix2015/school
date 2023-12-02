import { type PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { type User } from '@prisma/client'
import { api } from '@/api'
import { type AxiosError } from 'axios'
import { showToast } from '@/shared/components'
import { removeAccessToken } from '@/auth'

export interface State {
  user?: User
}

export const getUser = createAsyncThunk('user/getUser', async (payload, { dispatch }) => {
  const { data } = await api.get<User>('/users/me')
  dispatch(userActions.setUser(data))
})

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (payload: Partial<User>, { dispatch }) => {
    try {
      const { data } = await api.patch<User>('/users/me', payload)
      dispatch(userActions.setUser(data))
    } catch (error) {
      const axiosError = error as AxiosError
      if (axiosError.isAxiosError) {
        let message = 'Houve um erro ao atualizar os dados, tente novamente.'
        if (axiosError.response?.status === 409) {
          message = 'Este endereço de e-mail já está sendo utilizado por outra conta.'
        }
        showToast({ message, type: 'error' })
      }
      throw error
    }
  },
)

export const logoutUser = createAsyncThunk('user/logoutUser', async (payload, { dispatch }) => {
  removeAccessToken()
  dispatch(userActions.setUser(undefined))
})

const initialState: State = {
  user: undefined,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload
    },
  },
})

export const userReducer = userSlice.reducer

export const userActions = userSlice.actions
