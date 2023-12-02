import { type IconType } from 'react-icons'

interface Props {
  title: string
  message?: string
  icon?: IconType
  actions?: React.ReactNode
}

export const EmptyPlaceholder = ({ title, message, icon: Icon, actions }: Props) => {
  return (
    <div className="my-10 flex h-full w-full flex-col items-center justify-center">
      {Icon && (
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-gray-200">
          <Icon className="inline-block h-10 w-10" />
        </div>
      )}
      <h3 className="mt-6 text-xl font-medium">{title}</h3>
      {message && (
        <p className="mt-3 mb-8 text-center text-sm font-normal leading-6 text-gray-700">
          {message}
        </p>
      )}
      {actions}
    </div>
  )
}
