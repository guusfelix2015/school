import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateResetPasswordInput {
  @IsEmail()
  @IsNotEmpty()
  email: string
}
