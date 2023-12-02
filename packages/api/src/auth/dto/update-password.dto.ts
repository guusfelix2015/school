import z from 'zod'

export const updatePasswordDto = z
  .object({
    password: z.string().min(6),
    passwordConfirmation: z.string(),
  })
  .superRefine(({ passwordConfirmation, password }, ctx) => {
    if (passwordConfirmation !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password confirmation does not match password',
        path: ['passwordConfirmation'],
      })
    }
  })

export type UpdatePasswordDto = z.infer<typeof updatePasswordDto>
