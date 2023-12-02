import { Switch as BaseSwitch } from '@headlessui/react'
import { classNames } from '@/shared/utils'

interface Props {
  checked: boolean
  disabled?: boolean
  onChange?: (enabled: boolean) => void
}

export const Switch = ({ checked, onChange, disabled }: Props) => {
  return (
    <BaseSwitch
      checked={checked}
      onChange={(data) => !disabled && onChange?.(data)}
      className={classNames(
        'relative inline-flex h-6 w-11 items-center rounded-full',
        checked ? 'bg-brand' : 'bg-gray-200',
        disabled ? 'cursor-default' : 'cursor-pointer',
      )}
    >
      <span
        className={classNames(
          'inline-block h-4 w-4 transform rounded-full bg-white transition',
          checked ? 'translate-x-6' : 'translate-x-1',
        )}
      />
    </BaseSwitch>
  )
}
