import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common'
import { SigninDto } from '../dto/signin.dto'
import { AuthService } from '../services/auth.service'

@Controller('/auth/signin')
export class SigninController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signin(@Body() body: SigninDto) {
    const session = await this.authService.createSession(body)

    if (!session) {
      throw new UnauthorizedException()
    }

    const jwt = this.authService.generateJwt(session)

    return {
      accessToken: jwt,
      expiresAt: session.expires,
    }
  }
}
