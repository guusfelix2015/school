import z from 'zod'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button, FormError, Input, Label, Layout, showToast } from '@/shared/components'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { updateUser } from '@/store/user'

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email().min(1),
})

type FormSchema = z.infer<typeof schema>

export const AccountProfilePage = () => {
  const user = useAppSelector((state) => state.user.user)
  const dispatch = useAppDispatch()
  const [error, setError] = useState<string>()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (!user) return
    setValue('name', user.name)
    setValue('email', user.email)
  }, [user])

  async function submit(data: FormSchema) {
    setError('')
    const { meta } = await dispatch(updateUser(data))
    if (meta.requestStatus === 'rejected') return
    showToast({ message: 'Perfil atualizado com sucesso!' })
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
            <Label htmlFor="name">Nome completo</Label>
            <Input {...register('name')} />
            <FormError errors={errors} fieldName="name" />
          </div>
          <div className="mb-6">
            <Label htmlFor="email">Endereço de e-mail</Label>
            <Input type="email" {...register('email')} />
            <FormError errors={errors} fieldName="email" />
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
