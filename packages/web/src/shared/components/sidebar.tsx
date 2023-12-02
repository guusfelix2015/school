import { SidebarButton } from './sidebar-button'
import { FaWpforms } from 'react-icons/fa'
import { BiCog } from 'react-icons/bi'

export const Sidebar = () => {
  return (
    <aside className="desktop-transparent hidden w-12 flex-col border-r border-gray-100 bg-gray-50 md:flex lg:w-64 lg:flex-shrink-0 lg:px-4">
      <div className="flex h-0 flex-1 flex-col overflow-y-auto pt-3 pb-4 lg:pt-5">
        <div className="mb-4 flex justify-center lg:mb-2 lg:justify-start">
          <img src="/logo.svg" className="w-8 lg:w-10" />
        </div>
        <nav className="flex flex-1 flex-col space-y-1.5 md:px-2 lg:mt-5 lg:px-0">
          <SidebarButton icon={FaWpforms} to="/home">
            Matriculas
          </SidebarButton>
          <SidebarButton icon={BiCog} to="/settings">
            Configurações
          </SidebarButton>
        </nav>
      </div>
    </aside>
  )
}
