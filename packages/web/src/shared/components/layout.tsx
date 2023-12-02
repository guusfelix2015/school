import { classNames } from '../utils'
import { BottomNavbar } from './bottom-nav'
import { Header } from './header'
import { Sidebar } from './sidebar'

interface Props {
  children: React.ReactNode
  mainClassName?: string
}

export const Layout = ({ children, mainClassName }: Props) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex w-0 flex-1 flex-col overflow-hidden">
        <Header />
        <main
          className={classNames(
            'h-full w-full overflow-y-auto px-4 pt-6 pb-8 lg:px-12',
            mainClassName,
          )}
        >
          <div className="mx-auto mb-16 w-full max-w-[70rem] lg:mb-0">{children}</div>
          <BottomNavbar />
        </main>
      </div>
    </div>
  )
}
