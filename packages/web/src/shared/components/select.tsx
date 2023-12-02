import ReactSelect, {
  components,
  type GroupBase,
  type InputProps,
  type OptionProps,
  type Props,
  type SingleValueProps,
} from 'react-select'
import { type IconType } from 'react-icons'
import { classNames } from '../utils'

export type SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Props<Option, IsMulti, Group> & { icons?: boolean }

export interface GenericOption {
  label: string
  value: string | number
  icon?: IconType
}

const InputComponent = <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({
  inputClassName,
  ...props
}: InputProps<Option, IsMulti, Group>) => {
  return (
    <components.Input
      inputClassName={classNames('focus:ring-0 focus:ring-offset-0', inputClassName)}
      {...props}
    />
  )
}

export function Select<
  Option extends GenericOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ className, ...props }: SelectProps<Option, IsMulti, Group>) {
  return (
    <ReactSelect
      theme={(theme) => ({
        ...theme,
        borderRadius: 8,
        colors: {
          ...theme.colors,
          primary: '#6b7280',
          primary25: '#f3f4f6',
        },
      })}
      components={{
        ...components,
        IndicatorSeparator: () => null,
        Input: InputComponent,
        Option: ({ data, ...props }: OptionProps<Option, IsMulti, Group>) => {
          return (
            <components.Option {...props} data={data}>
              <div className={'flex items-center gap-2'}>
                {data.icon && <data.icon className="text-md h-[16px] w-[16px]" />}
                <span className="flex-1">{data.label}</span>
              </div>
            </components.Option>
          )
        },
        SingleValue: ({ data, ...props }: SingleValueProps<Option, IsMulti, Group>) => {
          return (
            <components.SingleValue {...props} data={data}>
              <div className="flex items-center gap-2">
                {data.icon && <data.icon className="text-md h-[16px] w-[16px]" />}
                <span className="flex-1">{data.label}</span>
              </div>
            </components.SingleValue>
          )
        },
      }}
      className={className}
      placeholder={props.placeholder ?? 'Selecione uma opção' ?? ''}
      noOptionsMessage={props.noOptionsMessage ?? (() => 'Nenhuma opção encontrada' ?? '')}
      {...props}
    />
  )
}
