import { forwardRef } from 'react'
import { classNames } from '@/shared/utils'

type InputProps = JSX.IntrinsicElements['input']

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  return (
    <input
      {...props}
      ref={ref}
      className={classNames(
        'block h-9 w-full rounded-md border border-gray-300 py-2 px-3 text-sm placeholder:text-gray-400 hover:border-gray-400 focus:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-700 focus:ring-offset-1',
        props.className,
      )}
    />
  )
})
