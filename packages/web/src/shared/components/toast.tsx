import toast, { type ToasterProps } from 'react-hot-toast'
import { BiX } from 'react-icons/bi'
import { classNames } from '../utils'

type ToastType = 'success' | 'error'

interface ToastProps {
  type?: ToastType
  className?: string
  message: string
  dismiss: () => void
}

type ShowToastProps = Omit<ToastProps, 'dismiss'> & ToasterProps & { duration?: number }

export function showToast({ type, message, duration, ...toasterProps }: ShowToastProps) {
  return toast.custom(
    ({ id, visible }) => (
      <Toast
        type={type}
        message={message}
        className={visible ? 'animate-enter' : 'animate-leave'}
        dismiss={() => {
          toast.dismiss(id)
        }}
      />
    ),
    { position: 'top-right', duration: duration ?? 3000, ...toasterProps },
  )
}

export const Toast = ({ message, className, type = 'success', dismiss }: ToastProps) => {
  function renderIcon() {
    if (type === 'success') {
      return (
        <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500">
          <svg
            aria-hidden="true"
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
      )
    }
    return (
      <div className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
    )
  }

  return (
    <div
      className={classNames(
        'mb-4 flex w-full max-w-xs items-center rounded-lg bg-white p-4 text-gray-500 shadow-md',
        className,
      )}
      role="alert"
    >
      {renderIcon()}
      <div className="ml-3 break-words text-sm font-normal [word-break:break-word]">{message}</div>
      <button
        type="button"
        className="-mx-1.5 -my-1.5 ml-auto inline-flex h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300"
        aria-label="Fechar"
        onClick={dismiss}
      >
        <BiX className="!text-xl" />
      </button>
    </div>
  )
}
