import z from 'zod'

export const updatePasswordDto = z.object({
  password: z.string().min(6).max(255),
  passwordConfirmation: z.string().min(6).max(255),
})

export type UpdatePasswordDto = z.infer<typeof updatePasswordDto>
