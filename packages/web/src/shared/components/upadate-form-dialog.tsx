import z from 'zod'
import { Dialog } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Label, Input, Button, FormError, ModalWrapper, ModalOverlay } from '@/shared/components'

const schema = z.object({
  name: z
    .string({ required_error: 'Informe o nome do formulário' })
    .min(1, 'Informe o nome do formulário')
    .max(100),
})

type FormSchema = z.infer<typeof schema>

interface Props {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: FormSchema) => Promise<void>
}

export const UpdateFormDialog = ({ isOpen, onClose, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {},
  })

  const handleClose = () => {
    reset()
    onClose()
  }

  const submit = (data: FormSchema) => {
    reset()
    onSubmit(data)
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <ModalOverlay />
      <ModalWrapper size="small">
        <div className="p-4">
          <Dialog.Title className="mb-6 text-xl font-semibold">Editar formulário</Dialog.Title>
          <form onSubmit={handleSubmit(submit)}>
            <div className="mb-4">
              <Label htmlFor="name">
                Nome
                <span className="text-red-700"> *</span>
              </Label>
              <Input {...register('name')} id="name" placeholder={'Nome do formulário'} />
              <FormError errors={errors} fieldName="name" />
            </div>
            <Button type="submit" className="w-full justify-center">
              Salvar
            </Button>
          </form>
        </div>
      </ModalWrapper>
    </Dialog>
  )
}
