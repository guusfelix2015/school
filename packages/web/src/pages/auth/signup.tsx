import z from 'zod'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button, FormError, Input, Label } from '@/shared/components'
import { api } from '@/api'

export const signupDto = z.object({
  name: z
    .string({ required_error: 'Informe um nome válido' })
    .min(3, 'Seu nome deve conter no mínimo 3 caracteres'),
  email: z
    .string({ required_error: 'Não é possível criar um usuário com esse email' })
    .email('Informe um endereço de e-mail válido'),
  password: z
    .string({ required_error: 'Escolha uma senha' })
    .min(6, 'Sua senha deve conter no mínimo 6 caracteres'),
})

type FormSchema = z.infer<typeof signupDto>

export const SignupPage = () => {
  const [error, setError] = useState<string>()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({ resolver: zodResolver(signupDto) })

  const onSubmit = handleSubmit(async (data: FormSchema) => {
    try {
      setError('')
      await api.post('/auth/signup', data)
      navigate('/signin')
    } catch (error: any) {
      error.response.data.message === 'Email already exists'
        ? setError('Esse e-mail já está em uso')
        : setError('Ocorreu um erro ao criar sua conta')
    }
  })

  function renderForm() {
    return (
      <>
        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              {...register('name')}
              type="name"
              id="name"
              placeholder={'Digite seu nome completo' ?? ''}
            />
            <FormError errors={errors} fieldName="name" />
          </div>
          <div className="mb-6">
            <Label htmlFor="email">Endereço de e-mail</Label>
            <Input
              {...register('email')}
              type="email"
              id="email"
              placeholder={'Digite seu endereço de e-mail' ?? ''}
            />
            <FormError errors={errors} fieldName="email" />
          </div>
          <div className="mb-6">
            <Label htmlFor="password" className="mb-0">
              Escolha uma senha
            </Label>
            <div className="mb-2 leading-none">
              <span className="text-xs text-gray-500">
                Sua senha deve conter no mínimo 6 caracteres.
              </span>
            </div>
            <Input
              {...register('password')}
              type="password"
              id="password"
              placeholder={'Escolha uma senha' ?? ''}
            />
            <FormError errors={errors} fieldName="password" />
          </div>
          <Button
            type="submit"
            className="w-full justify-center"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Criar conta
          </Button>
          <div className="mt-4 px-4 text-center leading-none"></div>
        </form>
      </>
    )
  }

  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-[25rem] max-w-full p-4 sm:p-0">
        <div className="mb-8">Logo</div>
        <div className="border-1 rounded-lg border-gray-200 bg-white px-4 py-10 shadow-md sm:px-10">
          <h4 className="mb-8 text-center text-lg font-semibold leading-none text-gray-700">
            Criar nova conta
          </h4>
          {error && (
            <div className="mb-8 rounded-lg bg-red-200 p-3 text-sm text-red-900">{error}</div>
          )}
          {renderForm()}
        </div>
        <div className="mt-4">
          <Button to="/signin" className="w-full justify-center" color="minimal">
            Já tenho uma conta
          </Button>
        </div>
      </div>
    </div>
  )
}
