import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from '@/prisma'

export interface JwtPayload {
  workspaceId: string
  userId: number
  iat: number
  exp: number
  sub: string
}

export interface AuthContext {
  workspaceId: string
  userId: number
  sessionId: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    })
  }

  async validate(payload: JwtPayload): Promise<AuthContext> {
    const session = await this.prismaService.session.findFirst({
      where: { id: payload.sub, isRevoked: false, expires: { gte: new Date() } },
    })
    if (!session) throw new UnauthorizedException()
    return { workspaceId: payload.workspaceId, userId: payload.userId, sessionId: payload.sub }
  }
}
