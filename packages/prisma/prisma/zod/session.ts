import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const SessionModel = z.object({
  id: z.string(),
  userId: z.number().int(),
  expires: z.date(),
  isRevoked: z.boolean(),
  userAgent: z.string().nullish(),
  ipAddress: z.string().nullish(),
  metadata: jsonSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteSession extends z.infer<typeof SessionModel> {
  user: CompleteUser
}

/**
 * RelatedSessionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSessionModel: z.ZodSchema<CompleteSession> = z.lazy(() => SessionModel.extend({
  user: RelatedUserModel,
}))
