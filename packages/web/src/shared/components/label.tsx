import { classNames } from '../utils'

export const Label = (props: JSX.IntrinsicElements['label']) => {
  return (
    <label
      {...props}
      className={classNames(
        'text-gray-700" mb-2 block text-sm font-medium leading-none',
        props.className,
      )}
    >
      {props.children}
    </label>
  )
}
