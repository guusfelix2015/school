import z from 'zod'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, FormError, Input, Label, showToast } from '@/shared/components'
import { api } from '@/api'

const schema = z.object({
  password: z.string().min(6),
  passwordConfirmation: z.string().min(6),
})

type FormSchema = z.infer<typeof schema>

export const ResetPasswordPage = () => {
  const { token } = useParams()
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
      const response = await api.post('/reset-password/confirm', {
        ...data,
        token,
      })

      if (response.status === 200) {
        showToast({
          message: 'Sua senha foi atualizada com sucesso! Faça login para continuar.',
          type: 'success',
        })
        reset()
      } else {
        showToast({ message: 'Erro ao atualizar a senha', type: 'error' })
      }
    } catch (error) {
      const errorMessage =
        'Token de redefinição de senha expirou. Por favor, solicite um novo token e tente novamente.'
      showToast({ message: errorMessage, type: 'error' })
    }
  })

  function renderForm() {
    return (
      <>
        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <Label htmlFor="password">Nova senha</Label>
            <Input
              {...register('password', { required: true })}
              type="password"
              id="password"
              placeholder={'Escolha uma nova senha' ?? ''}
            />
            <FormError errors={errors} fieldName="password" />
          </div>
          <div className="mb-6">
            <Label htmlFor="password">Confirme sua senha</Label>
            <Input
              {...register('passwordConfirmation', { required: true })}
              type="password"
              id="passwordConfirmation"
              placeholder={'Confirme sua nova senha' ?? ''}
            />
            <FormError errors={errors} fieldName="passwordConfirmation" />
          </div>
          <Button
            type="submit"
            className="w-full justify-center"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Alterar senha
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
            Criar nova senha
          </h4>
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
