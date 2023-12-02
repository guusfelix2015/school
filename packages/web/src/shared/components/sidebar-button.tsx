import React from 'react'
import { Button } from './button'

interface Props {
  to: string
  icon: React.ElementType
  children: React.ReactNode
}

export const SidebarButton = ({ to, icon, children }: Props) => {
  return (
    <Button
      color="minimal"
      className="!min-lg:p-0 w-full justify-center !py-2.5 !font-medium !text-gray-800 hover:bg-gray-100 sm:px-0 lg:justify-start lg:px-4"
      activeClassName="[&>div]:!bg-gray-200 [&>div]:!text-gray-900 [&>div]:hover:opacity-80"
      StartIcon={icon}
      iconClassName="stroke-0 h-5 w-5 lg:mr-2 mr-0 ml-1.5 lg:ml-0"
      to={to}
    >
      <span className="hidden w-full lg:flex">{children}</span>
    </Button>
  )
}
