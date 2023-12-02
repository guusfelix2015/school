import { ReactNode } from 'react'
import { Dialog } from '@headlessui/react'
import { classNames } from '@/shared/utils'

type WrapperSize = 'small' | 'medium' | 'large'

export const ModalOverlay = () => {
  return <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
}

export const ModalWrapper = ({
  children,
  size = 'medium',
  className,
}: {
  children: ReactNode
  size?: WrapperSize
  className?: string
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4">
      <Dialog.Panel
        className={classNames(
          'm-4 mx-auto w-full rounded bg-white shadow-2xl',
          size === 'large'
            ? 'max-w-[90vw] sm:max-w-[90vw]'
            : size === 'medium'
            ? 'max-w-[90vw] sm:max-w-[60vw]'
            : 'max-w-[90vw] lg:max-w-[35vw]',
          className,
        )}
      >
        {children}
      </Dialog.Panel>
    </div>
  )
}
