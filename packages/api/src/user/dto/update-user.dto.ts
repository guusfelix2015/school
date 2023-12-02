import z from 'zod'

export const updateUserDto = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
})

export type UpdateUserDto = z.infer<typeof updateUserDto>
