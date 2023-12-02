import { Module } from '@nestjs/common'
import { AuthService } from './services/auth.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { SignupController } from './controllers/signup.controller'
import { SigninController } from './controllers/signin.controller'
import { ResetPasswordService } from './services/reset-password.service'
import { ResetPasswordController } from './controllers/reset-password.controller'

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [SigninController, SignupController, ResetPasswordController],
  providers: [AuthService, ResetPasswordService],
})
export class AuthModule {}
