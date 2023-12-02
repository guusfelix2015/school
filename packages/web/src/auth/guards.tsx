import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useRecoilValue } from 'recoil'
import { isAuthenticatedState } from '@/store'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const navigate = useNavigate()
  const isAuthenticated = useRecoilValue(isAuthenticatedState)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin')
    }
  }, [isAuthenticated])

  return (
    <>
      <Helmet>
        <link rel="icon" href=""></link>
      </Helmet>
      {children}
    </>
  )
}

export function RequireNotAuth({ children }: { children: JSX.Element }) {
  const isAuthenticated = useRecoilValue(isAuthenticatedState)
  if (isAuthenticated) return <Navigate to="/" replace />
  return children
}
