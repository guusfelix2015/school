import React, { forwardRef } from 'react'
import { type IconType } from 'react-icons'
import { type LinkProps, NavLink } from 'react-router-dom'
import { classNames } from '@/shared/utils'

export interface ButtonBaseProps {
  color?: keyof typeof variantClassName
  size?: 'base' | 'lg' | 'icon' | 'sm'
  loading?: boolean
  disabled?: boolean
  active?: boolean
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  StartIcon?: IconType | React.ElementType
  EndIcon?: IconType | React.ElementType
  iconClassName?: string
  activeClassName?: string
}

export type ButtonProps = ButtonBaseProps &
  Partial<LinkProps> &
  (
    | Omit<JSX.IntrinsicElements['a'], 'href' | 'onClick' | 'ref'>
    | (Omit<JSX.IntrinsicElements['button'], 'onClick' | 'ref'> & { href?: never })
  )

const variantClassName = {
  primary:
    'border-0 text-white bg-brand hover:bg-yellow-600 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-yellow-800',
  secondary: 'border border-gray-200 text-gray-900 bg-white hover:bg-gray-100',
  minimal:
    '!text-gray-700 bg-transparent hover:bg-gray-100 focus:outline-none focus:ring-offset-1 focus:bg-gray-100 focus:ring-brand-900 dark:text-darkgray-900 hover:dark:text-gray-50',
  destructive:
    'text-gray-900 focus:text-red-700 bg-transparent hover:bg-red-100 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:bg-red-100 focus:ring-red-700',
}

const variantDisabledClassName = {
  primary: 'border-0 text-white bg-brand hover:inherit bg-opacity-70',
  secondary: 'border border-gray-200 text-grey-700 bg-white opacity-70',
  minimal: 'text-gray-400 bg-transparent',
  destructive: 'text-red-700 bg-transparent opacity-70',
}

const variantActiveClassName = {
  primary: 'border-0 text-white bg-brand hover:inherit',
  secondary: 'border border-gray-300 text-grey-900 bg-gray-200',
  minimal: 'text-gray-400 bg-transparent',
  destructive: 'text-red-700 bg-transparent',
}

export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  function Button(props: ButtonProps, forwardedRef) {
    const {
      loading = false,
      active = false,
      color = 'primary',
      size = 'base',
      type = 'button',
      StartIcon,
      EndIcon,
      iconClassName,
      activeClassName,
      ...passThroughProps
    } = props
    const disabled = props.disabled ?? loading
    const isLink = typeof props.to !== 'undefined'
    const elementType = isLink ? 'div' : 'button'
    const element = React.createElement(
      elementType,
      {
        ...passThroughProps,
        disabled,
        type: !isLink ? type : undefined,
        ref: forwardedRef,
        className: classNames(
          'inline-flex items-center text-sm font-semibold relative rounded-md',
          size === 'base' && 'h-9 px-4 py-2.5',
          size === 'lg' && 'h-[36px] px-4 py-2.5',
          size === 'sm' && 'h-[30px] px-2 py-2 text-[12px]',
          size === 'icon' && 'flex justify-center min-h-[36px] min-w-[36px]',
          disabled
            ? variantDisabledClassName[color]
            : active
            ? variantActiveClassName[color]
            : variantClassName[color],
          loading ? 'cursor-wait' : disabled ? 'cursor-not-allowed' : '',
          props.className,
        ),
        onClick: disabled
          ? (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
              e.preventDefault()
            }
          : props.onClick,
      },
      <>
        {StartIcon && (
          <StartIcon
            className={classNames(
              'inline-flex',
              size === 'icon' ? 'h-4 w-4' : 'mr-2 h-4 w-4',
              iconClassName,
            )}
          />
        )}
        {loading && (
          <div className="absolute top-1/2 left-0.5 -translate-x-0.5 -translate-y-1/2 transform">
            <svg
              className={classNames(
                'mx-4 h-5 w-5 animate-spin',
                color === 'primary' ? 'text-white dark:text-black' : 'text-black',
              )}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
        {props.children}
        {EndIcon && (
          <EndIcon
            className={classNames('-mr-1 inline h-5 w-5 ltr:ml-2 rtl:mr-2', iconClassName)}
          />
        )}
      </>,
    )

    return props.to ? (
      <NavLink
        to={props.to}
        className={({ isActive }) => (isActive ? activeClassName : undefined)}
        target={props.target}
      >
        {element}
      </NavLink>
    ) : (
      element
    )
  },
)
