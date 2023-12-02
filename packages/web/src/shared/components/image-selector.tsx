import { useEffect, useRef, useState } from 'react'
import { BiCamera } from 'react-icons/bi'
import { Button } from './button'
import { api } from '@/api'

interface Props {
  currentLogo?: string
  onRemove: () => Promise<void>
  onUpload: (url: string) => Promise<void>
}

export const ImageSelector = ({ currentLogo, onRemove, onUpload }: Props) => {
  const [file, setFile] = useState<File>()
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function getPresignedUrl(fileName: string) {
    const response = await api.post('/files', { name: fileName })
    const { presignedUrl, cdnUrl } = response.data
    await finishUpload({
      presignedUrl,
      cdnUrl,
    })
  }

  async function remove() {
    const message = 'Você tem certeza que deseja remover esta imagem?'
    if (!confirm(message)) return
    await onRemove()
  }

  function initUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) {
      setFile(undefined)
      return
    }
    const [file] = event.target.files
    setFile(file)
  }

  async function finishUpload({ presignedUrl, cdnUrl }: { presignedUrl: string; cdnUrl: string }) {
    if (!file) return
    setIsUploading(true)
    try {
      await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type, 'x-amz-acl': 'public-read' },
      })
      await onUpload(cdnUrl)
      setIsUploading(false)
      setFile(undefined)
    } catch (error) {
      console.log(error)
      setIsUploading(false)
    }
  }

  useEffect(() => {
    if (!file) return
    getPresignedUrl(file.name)
  }, [file])

  return (
    <div className="flex items-center gap-2">
      {currentLogo ? (
        <>
          <div className="h-[64px] w-[64px] rounded-md border  p-1">
            <div
              className="h-full w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${currentLogo})`,
              }}
            ></div>
          </div>
          <Button
            size="sm"
            color="secondary"
            onClick={remove}
            disabled={isUploading}
            loading={isUploading}
          >
            Remover
          </Button>
        </>
      ) : (
        <>
          <div className="h-[64px] w-[64px] rounded-md border p-1">
            <div className="flex h-full w-full items-center justify-center bg-gray-100">
              <BiCamera className="h-[24px] w-[24px] text-2xl text-gray-400" />
            </div>
          </div>
          <Button
            size="sm"
            color="secondary"
            disabled={isUploading}
            loading={isUploading}
            onClick={() => {
              inputRef.current?.click()
            }}
          >
            Selecionar imagem
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={initUpload}
          />
        </>
      )}
    </div>
  )
}
