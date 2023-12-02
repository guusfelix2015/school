import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { RequireAuth, RequireNotAuth } from './auth/guards'
import { HomePage, SigninPage } from './pages'
import { SignupPage } from './pages/auth/signup'
import { RecoverPage } from './pages/auth/recover'
import { ResetPasswordPage } from './pages/auth/reset-password'
import { AccountProfilePage } from './pages/account/profile'
import { AccountPasswordPage } from './pages/account/password'
import { SettingsPage } from './pages/settings'

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: '/home',
      element: (
        <RequireAuth>
          <HomePage />
        </RequireAuth>
      ),
    },
    {
      path: '/settings',
      element: (
        <RequireAuth>
          <SettingsPage />
        </RequireAuth>
      ),
    },
    {
      path: '/signin',
      element: (
        <RequireNotAuth>
          <SigninPage />
        </RequireNotAuth>
      ),
    },
    {
      path: '/internal-signup',
      element: (
        <RequireNotAuth>
          <SignupPage />
        </RequireNotAuth>
      ),
    },

    {
      path: '/recover',
      element: (
        <RequireNotAuth>
          <RecoverPage />
        </RequireNotAuth>
      ),
    },
    {
      path: '/reset-password/:token',
      element: (
        <RequireNotAuth>
          <ResetPasswordPage />
        </RequireNotAuth>
      ),
    },
    {
      path: '/account',
      children: [
        {
          path: 'profile',
          element: (
            <RequireAuth>
              <AccountProfilePage />
            </RequireAuth>
          ),
        },
        {
          path: 'password',
          element: (
            <RequireAuth>
              <AccountPasswordPage />
            </RequireAuth>
          ),
        },
      ],
    },

    {
      path: '*',
      element: <Navigate to="/home" replace />,
    },
  ])

  return <RouterProvider router={router} />
}
