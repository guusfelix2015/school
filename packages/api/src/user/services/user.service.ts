import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma'
import { updateUserDto, type UpdateUserDto } from '../dto/update-user.dto'
import { updatePasswordDto, type UpdatePasswordDto } from '../dto/update-password.dto'
import { hash } from '@/shared/utils'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  getById(id: number) {
    return this.prismaService.user.findUnique({
      where: { id },
    })
  }

  getUserByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    })
  }

  async updateUser(id: number, data: UpdateUserDto) {
    const payload = updateUserDto.parse(data)
    return this.prismaService.user.update({ where: { id }, data: payload })
  }

  async updatePassword({ id, data }: { id: number; data: UpdatePasswordDto }) {
    const payload = updatePasswordDto.parse(data)
    const hashedPassword = await hash(payload.password)
    return this.prismaService.user.update({ where: { id }, data: { password: hashedPassword } })
  }
}
