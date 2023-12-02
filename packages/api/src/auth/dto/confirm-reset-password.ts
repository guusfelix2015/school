import { IsNotEmpty, IsString } from 'class-validator'

export class ConfirmResetPasswordInput {
  @IsString()
  @IsNotEmpty()
  token: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  passwordConfirmation: string
}
