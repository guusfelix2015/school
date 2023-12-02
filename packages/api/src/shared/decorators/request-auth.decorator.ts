import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import { type AuthContext } from '../auth/jwt.strategy'

export const RequestAuth = createParamDecorator(
  (data: unknown, context: ExecutionContext): AuthContext => {
    const request = context.switchToHttp().getRequest()
    return request.user as AuthContext
  },
)
