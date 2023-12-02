import z from 'zod'

export const createResetPasswordDto = z.object({
  email: z.string().email(),
})

export type CreateResetPasswordDto = z.infer<typeof createResetPasswordDto>
