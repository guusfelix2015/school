import * as z from "zod"
import { CompleteSession, RelatedSessionModel } from "./index"

export const UserModel = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
  emailVerifiedAt: z.date().nullish(),
  password: z.string(),
  createdAt: z.date(),
  upatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  session: CompleteSession[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  session: RelatedSessionModel.array(),
}))
