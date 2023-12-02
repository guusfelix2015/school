import { Body, Controller, HttpCode, HttpStatus, NotFoundException, Post } from '@nestjs/common'
import { ResetPasswordService } from '../services/reset-password.service'
import { ConfirmResetPasswordInput } from '../dto/confirm-reset-password'

@Controller('/reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @Post('/confirm')
  @HttpCode(HttpStatus.OK)
  async confirmResetPassword(@Body() data: ConfirmResetPasswordInput) {
    const { token, password, passwordConfirmation } = data
    const request = await this.resetPasswordService.getById(token)
    if (!request) throw new NotFoundException()
    await this.resetPasswordService.resetPassword({
      id: request.id,
      email: request.email,
      data: { password, passwordConfirmation },
    })
    return { success: true }
  }
}
