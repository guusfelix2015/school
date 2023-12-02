import { BiCopy } from 'react-icons/bi'
import { classNames } from '../utils'
import { Button } from './button'
import { showToast } from './toast'

interface Props {
  url: string
  className?: string
}

export const ShareableUrl = ({ url, className }: Props) => {
  function open() {
    window.open(url, '_blank')
  }

  async function copyToClipboard() {
    await navigator.clipboard.writeText(url)
    const message = 'Link copiado com sucesso!'
    showToast({ message, type: 'success' })
  }

  return (
    <div
      className={classNames(
        'flex w-full items-center justify-between gap-1 rounded-md bg-gray-200 text-sm font-medium text-gray-900',
        className,
      )}
    >
      <span className="cursor-pointer truncate p-1 pl-2" role="button" onClick={open}>
        {url}
      </span>
      <Button
        className="m-1 ml-0"
        size="icon"
        StartIcon={BiCopy}
        onClick={copyToClipboard}
      ></Button>
    </div>
  )
}
