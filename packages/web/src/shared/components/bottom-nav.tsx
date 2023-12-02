import React from 'react'
import { type IconType } from 'react-icons'
import { BiCalendar, BiCog } from 'react-icons/bi'
import { Link } from 'react-router-dom'

interface BottomNavbarButtonProps {
  to: string
  icon: IconType
  children: React.ReactNode
}

export const BottomNavbarButton = ({ to, icon: Icon, children }: BottomNavbarButtonProps) => {
  return (
    <Link
      to={to}
      className="relative my-2 min-w-0 flex-[1_0_65px] overflow-hidden rounded-md py-2 px-1 text-center text-xs font-medium text-neutral-400 hover:bg-gray-200 hover:text-gray-700 focus:z-10 sm:text-sm"
    >
      <Icon className="mx-auto mb-1 block h-5 w-5 flex-shrink-0 text-center text-inherit" />
      <span className="block truncate">{children}</span>
    </Link>
  )
}

export const BottomNavbar = () => {
  return (
    <nav className="bottom-nav fixed bottom-0 z-30 -mx-4 flex w-full gap-2 overflow-x-auto border border-t border-gray-200 bg-gray-50 bg-opacity-40 px-1 shadow backdrop-blur-md md:hidden">
      <BottomNavbarButton to="/home" icon={BiCalendar}>
        Matriculas
      </BottomNavbarButton>
      <BottomNavbarButton icon={BiCog} to="/settings">
        Configurações
      </BottomNavbarButton>
    </nav>
  )
}
