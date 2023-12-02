import { createParamDecorator, type ExecutionContext } from '@nestjs/common'

export const IPAddress = createParamDecorator((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest()
  return request?.ip
})
