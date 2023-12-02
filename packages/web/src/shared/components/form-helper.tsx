import { classNames } from '@/shared/utils'

type Props = JSX.IntrinsicElements['div'] & {
  children: React.ReactNode
}

export const FormHelper = ({ children, ...props }: Props) => {
  return (
    <div
      className={classNames('mt-2 flex items-center text-sm text-gray-400', props.className)}
      {...props}
    >
      {children}
    </div>
  )
}
