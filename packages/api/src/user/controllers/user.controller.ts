import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common'
import { UserService } from '../services/user.service'
import { AuthContext, JwtAuthGuard } from '@/shared/auth'
import { RequestAuth } from '@/shared/decorators'
import { UpdateUserDto } from '../dto/update-user.dto'
import { UpdatePasswordDto } from '../dto/update-password.dto'

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getMe(@RequestAuth() auth: AuthContext) {
    const user = await this.userService.getById(auth.userId)
    if (!user) throw new UnauthorizedException()
    const { password, ...userData } = user
    return userData
  }

  @Patch('/me')
  @UseGuards(JwtAuthGuard)
  async updateMe(@RequestAuth() auth: AuthContext, @Body() updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      const existingUser = await this.userService.getUserByEmail(updateUserDto.email)
      if (existingUser && existingUser.id !== auth.userId) {
        throw new ConflictException()
      }
    }
    const updatedUser = await this.userService.updateUser(auth.userId, updateUserDto)
    const { password, ...userData } = updatedUser
    return userData
  }

  @Patch('/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async updatePassword(@RequestAuth() auth: AuthContext, @Body() data: UpdatePasswordDto) {
    const { password, passwordConfirmation } = data
    await this.userService.updatePassword({
      id: auth.userId,
      data: { password, passwordConfirmation },
    })
  }
}
