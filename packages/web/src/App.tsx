import { Toaster } from 'react-hot-toast'
import { useRecoilValue } from 'recoil'
import { useEffect } from 'react'
import { AuthProvider } from '@/auth'
import { Routes } from './routes'
import { isAuthenticatedState } from './store'
import { useAppDispatch } from './hooks'
import { getUser } from './store/user'

export const App = () => {
  const isAuthenticated = useRecoilValue(isAuthenticatedState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isAuthenticated) return
    async function run() {
      await Promise.all([dispatch(getUser())])
    }
    run()
  }, [isAuthenticated])

  return (
    <AuthProvider>
      <Routes />
      <Toaster />
    </AuthProvider>
  )
}
