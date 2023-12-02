import { get } from 'lodash' // TODO: implement this without lodash
import { type FieldErrors, type FieldValues } from 'react-hook-form'
import { classNames } from '@/shared/utils'

type Props = JSX.IntrinsicElements['div'] & {
  fieldName: string
  errors: FieldErrors<FieldValues>
  Icon?: React.ElementType
}

export const FormError = ({ Icon, fieldName, errors, ...props }: Props) => {
  if (!get(errors, fieldName)) return null

  const error = get(errors, fieldName)
  if (Array.isArray(error)) return null

  return (
    <div
      {...props}
      className={classNames('mt-2 flex items-center gap-2 text-sm text-red-700', props.className)}
    >
      {Icon && <Icon />}
      <span>{String(get(errors, `${fieldName}.message`))}</span>
    </div>
  )
}
