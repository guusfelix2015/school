import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { SignupDto } from '../dto/signup.dto'
import { AuthService } from '../services/auth.service'

@Controller('/auth/signup')
export class SignupController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() body: SignupDto) {
    await this.authService.createUser(body)
  }


}
