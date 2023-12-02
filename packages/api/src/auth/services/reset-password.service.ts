import { isNil } from 'lodash'
import { type ResetPasswordRequest } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { getNow, hash } from '@/shared/utils'
import { PrismaService } from '@/prisma'
import { updatePasswordDto, type UpdatePasswordDto } from '../dto/update-password.dto'
import {
  createResetPasswordDto,
  type CreateResetPasswordDto,
} from '../dto/create-reset-password.dto'

@Injectable()
export class ResetPasswordService {
  constructor(private readonly prismaService: PrismaService) {}

  getById(id: string) {
    const now = getNow().toDate()
    return this.prismaService.resetPasswordRequest.findFirst({
      where: {
        id,
        resettedAt: null,
        expiresAt: { gte: now },
      },
    })
  }

  create(data: CreateResetPasswordDto) {
    const payload = createResetPasswordDto.parse(data)
    const expiresAt = this.getExpiresAt()
    return this.prismaService.resetPasswordRequest.create({ data: { ...payload, expiresAt } })
  }

  async userExists(email: string): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({ where: { email } })
    return !isNil(user)
  }

  async resetPassword({
    id,
    email,
    data,
  }: {
    id: string
    email: string
    data: UpdatePasswordDto
  }): Promise<ResetPasswordRequest | undefined> {
    const payload = updatePasswordDto.parse(data)
    const now = getNow().toDate()
    const user = await this.prismaService.user.findUnique({ where: { email } })
    if (!user) return
    const hashedPassword = await hash(payload.password)
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    })
    return this.prismaService.resetPasswordRequest.update({
      where: { id },
      data: { resettedAt: now },
    })
  }

  private getExpiresAt(): Date {
    return getNow().add(3, 'hour').toDate()
  }
}
