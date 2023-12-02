import z from 'zod'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button, FormError, FormHelper, Input, Label, Layout, showToast } from '@/shared/components'
import { api } from '@/api'

const schema = z
  .object({
    password: z
      .string({ required_error: 'Escolha uma nova senha' })
      .min(6, 'Sua senha deve conter no mínimo 6 caracteres'),
    passwordConfirmation: z.string({ required_error: 'Confirme sua nova senha' }),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'A confirmação de senha está incorreta',
        path: ['passwordConfirmation'],
      })
    }
  })

type FormSchema = z.infer<typeof schema>

export const AccountPasswordPage = () => {
  const [error, setError] = useState<string>()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  async function submit(data: FormSchema) {
    setError('')
    try {
      await api.patch('/users/password', data)
      showToast({ message: 'Senha atualizada com sucesso!' })
      reset()
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <Layout>
      <div className="mb-6 flex items-center justify-between gap-2">
        <h2 className="text-2xl font-semibold text-gray-800">Configurações</h2>
      </div>

      <div className="my-6">
        <form onSubmit={handleSubmit(submit)}>
          {error && (
            <div className="mb-6 rounded-lg bg-red-200 p-3 text-sm text-red-900">{error}</div>
          )}
          <div className="mb-6">
            <Label htmlFor="password">Nova senha</Label>
            <Input type="password" {...register('password')} />
            <FormHelper>Sua senha deve conter no mínimo 6 caracteres.</FormHelper>
            <FormError errors={errors} fieldName="password" />
          </div>
          <div className="mb-6">
            <Label htmlFor="passwordConfirmation">Confirme sua nova senha</Label>
            <Input type="password" {...register('passwordConfirmation')} />
            <FormError errors={errors} fieldName="passwordConfirmation" />
          </div>
          <div>
            <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
