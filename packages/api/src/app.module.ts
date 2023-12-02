import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtAuthGuard, JwtStrategy } from '@/shared/auth'
import { PrismaModule } from '@/prisma'
import { AuthModule } from '@/auth'
import { ZodValidationPipe } from 'nestjs-zod'
import { APP_PIPE } from '@nestjs/core'
import { UserModule } from './user'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,

    UserModule,
  ],
  providers: [
    JwtAuthGuard,
    JwtStrategy,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
