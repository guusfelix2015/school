import { forwardRef } from 'react'
import { classNames } from '@/shared/utils'

type TextareaProps = JSX.IntrinsicElements['textarea']

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Input(props, ref) {
  return (
    <textarea
      {...props}
      ref={ref}
      className={classNames(
        'min-h-15 block w-full rounded-md border border-gray-300 py-2 px-3 text-sm placeholder:text-gray-400 hover:border-gray-400 focus:border-neutral-300 focus:outline-none focus:ring-1 focus:ring-neutral-700 focus:ring-offset-1',
        props.className,
      )}
    ></textarea>
  )
})
