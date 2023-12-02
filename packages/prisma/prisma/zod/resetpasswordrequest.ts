import * as z from "zod"

export const ResetPasswordRequestModel = z.object({
  id: z.string(),
  email: z.string(),
  expiresAt: z.date(),
  resettedAt: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
