import { classNames } from '../utils'

interface Tab {
  name: string
  label: string
}

interface Props {
  tabs: Tab[]
  currentTab: string
  onChange: (tab: string) => void
  className?: string
  tabClassName?: string
}

export const Tabs = ({ tabs, currentTab, onChange, className, tabClassName }: Props) => {
  function changeTab(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, tabName: string) {
    event.preventDefault()
    onChange(tabName)
  }

  return (
    <ul
      className={classNames(
        'flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500',
        className,
      )}
    >
      {tabs.map((tab) => (
        <li key={tab.name}>
          <a
            href="#"
            onClick={(event) => {
              changeTab(event, tab.name)
            }}
            className={classNames(
              'inline-block rounded-t-lg px-4 py-3 ',
              currentTab === tab.name
                ? 'bg-gray-100 text-gray-900'
                : 'hover:bg-gray-50 hover:text-gray-600',
              tabClassName,
            )}
          >
            {tab.label}
          </a>
        </li>
      ))}
    </ul>
  )
}
