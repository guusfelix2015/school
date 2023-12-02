import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormError, Input, Label, showToast } from '@/shared/components'
import { api } from '@/api'

const schema = z.object({
  email: z.string().email(),
})

type FormSchema = z.infer<typeof schema>

export const RecoverPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  const onSubmit = handleSubmit(async (data: FormSchema) => {
    try {
      await api.post('/reset-password', data)

      showToast({
        message: 'Um e-mail foi enviado para você com as instruções para redefinir sua senha.',
        type: 'success',
      })
      reset()
    } catch (error: any) {
      showToast({ message: error.message, type: 'error' })
    }
  })

  function renderForm() {
    return (
      <>
        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <Label htmlFor="email">Endereço de e-mail</Label>
            <Input
              {...register('email', { required: true })}
              type="email"
              id="email"
              placeholder={'Digite seu endereço de e-mail' ?? ''}
            />
            <FormError errors={errors} fieldName="email" />
          </div>
          <Button
            type="submit"
            className="w-full justify-center"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Recuperar conta
          </Button>
        </form>
      </>
    )
  }

  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-[25rem] max-w-full p-4 sm:p-0">
        <div className="mb-8">
          <img src="/logo.svg" className="mx-auto w-10" />
        </div>
        <div className="border-1 rounded-lg border-gray-200 bg-white px-4 py-10 shadow-md sm:px-10">
          <h4 className="mb-8 text-center text-lg font-semibold leading-none text-gray-700">
            Recuperar minha conta
          </h4>
          <span className="mb-4 block text-sm leading-normal text-gray-700">
            Digite o endereço de e-mail utilizado em sua conta para receber um link de recuperação
            de senha.
          </span>
          {renderForm()}
        </div>
        <div className="mt-4">
          <Button to="/signin" className="w-full justify-center" color="minimal">
            Acessar minha conta
          </Button>
        </div>
      </div>
    </div>
  )
}
