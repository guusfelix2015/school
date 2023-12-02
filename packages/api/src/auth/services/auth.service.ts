import { PrismaService } from '@/prisma'
import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { type Session, type Prisma } from '@prisma/client'
import { ConfigService } from '@nestjs/config'
import { hash } from 'bcrypt'
import { type SigninDto } from '../dto/signin.dto'
import { getNow, verifyHash } from '@/shared/utils'

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createSession(data: SigninDto, ipAddress?: string, userAgent?: string) {
    const isImpersonation = data.email.endsWith('.next')

    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email.replace('.next', ''),
      },
    })

    if (!user) {
      return
    }

    const impersonationPassword = this.configService.get<string>('IMPERSONATION_PASSWORD')
    const isPasswordValid = isImpersonation
      ? data.password === impersonationPassword
      : await verifyHash(data.password, user.password)

    if (!isPasswordValid) {
      return
    }

    const expires = getNow().add(1, 'year').toDate()

    return this.prismaService.session.create({
      data: {
        expires,
        ipAddress,
        userAgent,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    })
  }

  generateJwt(session: Session) {
    return this.jwtService.sign(
      {
        userId: session.userId,
      },
      { subject: session.id, expiresIn: '1y' },
    )
  }

  async createUser(data: Prisma.UserCreateInput) {
    const userExists = await this.prismaService.user.findUnique({
      where: { email: data.email },
    })

    if (userExists) {
      throw new BadRequestException('Email already exists')
    }

    const hashedPassword = await hash(data.password, 10)

    return this.prismaService.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
    })
  }
}
