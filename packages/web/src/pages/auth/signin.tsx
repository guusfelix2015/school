import z from 'zod'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRecoilRefresher_UNSTABLE } from 'recoil'
import { Button, FormError, Input, Label } from '@/shared/components'

import { saveAccessToken } from '@/auth'
import { isAuthenticatedState } from '@/store'
import { api } from '@/api'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type FormSchema = z.infer<typeof schema>

export const SigninPage = () => {
  const [error, setError] = useState<string>()
  const refreshIsAuthenticatedState = useRecoilRefresher_UNSTABLE(isAuthenticatedState)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchema>({ resolver: zodResolver(schema) })

  const onSubmit = handleSubmit(async (data: FormSchema) => {
    try {
      setError(undefined)
      const response = await api.post('/auth/signin', data)
      const { accessToken, expiresAt } = response.data
      saveAccessToken({ accessToken, expiresAt })
      refreshIsAuthenticatedState()
      navigate('/home')
    } catch (error: any) {
      error.response.status === 401
        ? setError('E-mail ou senha incorretos')
        : setError('Ocorreu um erro um erro ao fazer login')
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
          <div className="relative">
            <div className="mb-6">
              <Label htmlFor="password">Senha</Label>
              <Input
                {...register('password', { required: true })}
                type="password"
                id="password"
                placeholder={'Digite sua senha' ?? ''}
              />
              <FormError errors={errors} fieldName="password" />
            </div>
            <Link
              to="/recover"
              className="absolute right-0 -top-px text-xs font-medium text-gray-600"
            >
              Esqueci minha senha
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full justify-center"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            Entrar
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
            Acessar minha conta
          </h4>
          {error && (
            <div className="mb-8 rounded-lg bg-red-200 p-3 text-sm text-red-900">{error}</div>
          )}
          {renderForm()}
        </div>
        {/* <div className="mt-4">
          <Button to="/signup" className="w-full justify-center" color="minimal">
            Criar uma conta
          </Button>
        </div> */}
      </div>
    </div>
  )
}
