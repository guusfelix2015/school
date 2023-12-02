import { createParamDecorator, type ExecutionContext } from '@nestjs/common'

export const UserAgent = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest()
  return request.headers?.['user-agent']
})
