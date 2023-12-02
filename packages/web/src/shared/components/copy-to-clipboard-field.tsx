import { BiCopy } from 'react-icons/bi'
import { Button } from './button'
import { Input } from './input'
import { showToast } from './toast'
import { classNames } from '../utils'

interface Props {
  text: string
  inputClassName?: string
}

export const CopyToClipboardField = ({ text, inputClassName }: Props) => {
  async function copyToClipboard() {
    await navigator.clipboard.writeText(text)
    const message = 'ID copiado com sucesso!'
    showToast({ message, type: 'success' })
  }

  return (
    <div className="flex items-center">
      <Input
        value={text}
        readOnly
        className={classNames('-mr-px cursor-default rounded-r-none', inputClassName)}
      />
      <Button
        className="m-1 ml-0 rounded-l-none"
        size="icon"
        StartIcon={BiCopy}
        onClick={copyToClipboard}
      ></Button>
    </div>
  )
}
