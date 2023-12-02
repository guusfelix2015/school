import { Menu } from '@headlessui/react'
import { BiUser, BiChevronDown } from 'react-icons/bi'

import { Link } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE } from 'recoil'
import { isAuthenticatedState } from '@/store'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { logoutUser } from '@/store/user'

export const Header = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)
  const refreshIsAuthenticatedState = useRecoilRefresher_UNSTABLE(isAuthenticatedState)
  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    dispatch(logoutUser())
    setTimeout(() => {
      refreshIsAuthenticatedState()
    })
  }

  return (
    <>
      <header className="flex justify-end border-b p-4 lg:px-12">
        <div className="relative inline-flex">
          <Menu>
            <Menu.Button
              type="button"
              className="flex h-[36px] items-center truncate rounded-full border bg-white py-1.5 pl-5 pr-4 text-sm text-gray-800 transition hover:bg-gray-50 sm:gap-2"
            >
              <BiUser className="text-lg" />
              <span className="hidden font-medium sm:block">{user?.name}</span>
              <BiChevronDown className="text-lg" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  to="/account/profile"
                >
                  Meu perfil
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  to="/account/password"
                >
                  Senha & segurança
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  to="/settings"
                >
                  Configurações
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  to="/home"
                >
                  Matriculas
                </Link>
              </Menu.Item>

              <div className="my-1 border-t"></div>
              <Menu.Item>
                <a
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  href="#"
                  onClick={handleLogout}
                >
                  Sair
                </a>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </header>
    </>
  )
}
